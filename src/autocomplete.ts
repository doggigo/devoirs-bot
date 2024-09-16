import type { AutocompleteInteraction } from "discord.js";
import { days } from "./types";

const toSqliteDate = (date: Date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

const generateNextDates = (n: number) => {
  let dateNow = new Date(Date.now());
  let nextDates: Date[] = [];

  for (let i = 0; i <= n; i++) {
    let newDate = new Date(dateNow);
    newDate.setDate(dateNow.getDate() + i);
    nextDates.push(newDate);
  }
  return nextDates;
};

const generateDatesFromDay = (s: string) => {
  let days = generateNextDates(7).filter((day) => detectDay(s)?.includes(day.getDay()));
  let res: Date[] = [];
  for (let i = 0; i < 8; i++) {
    for (let day of days) {
      let newDay = new Date(day);
      newDay.setDate(day.getDate() + i * 7);
      res.push(newDay);
    }
  }
  let obj = generateDateAutocompleteObject(res);
  return obj;
};

const convertToReadableDate = (date: Date) => `${date.getDate()}/${date.getMonth().toString().padStart(2, "0")}/${date.getFullYear()}`;

const generateDateAutocompleteObject = (obj: Date[]) => {
  return obj.map((i) => {
    return {
      name: `${days[i.getDay()]} - ${convertToReadableDate(i)}`,
      value: toSqliteDate(i),
    };
  });
};

const generateDefaultDates = () => {
  let nextDates = generateNextDates(25);

  return generateDateAutocompleteObject(nextDates);
};

const detectDay = (s: string) => {
  if (!s) return null;

  let res: number[] = [];
  for (let i = 0; i < 7; i++) {
    if (days[i].startsWith(s)) res.push(i);
  }
  return res.length > 0 ? res : null;
};

export const handleDateAutoComplete = async (interaction: AutocompleteInteraction) => {
  const focusedValue = interaction.options.getFocused();

  let results;
  if (detectDay(focusedValue)) {
    results = generateDatesFromDay(focusedValue);
  } else {
    results = generateDefaultDates();
  }

  if (!results) return;

  interaction.respond(results.slice(0, 25));
};
