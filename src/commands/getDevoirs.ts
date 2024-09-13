import { EmbedBuilder, SlashCommandBuilder, type CommandInteraction } from "discord.js";
import sqlite from "bun:sqlite";
import { dataBase } from "..";
import { isDevoirTable, type DevoirTable } from "../types";

export const data = new SlashCommandBuilder()
  .setName("devoirs")
  .setDescription("avoir les devoirs")
  .setDefaultMemberPermissions(null);

const translateDate = (d: string) => `${d.substring(8, 10)}/${d.substring(5, 7)}/${d.substring(0, 4)}`;

export async function execute(interaction: CommandInteraction) {
  let devoirs: any[] | null = dataBase.query("SELECT * FROM Devoirs").all();

  devoirs = devoirs.every((d) => isDevoirTable(d)) ? (devoirs as DevoirTable[]) : null;
  if (!devoirs) return;

  const embed = new EmbedBuilder().setTitle("Devoirs").setColor("#00b0f4");

  for (let devoir of devoirs) {
    embed.addFields({
      name: `ID : ${devoir["id"]}`,
      value: `**${devoir["matiere"]} - ${translateDate(devoir["date_rendu"])}** \n**Contenu :** ${devoir["contenu"]} \n\n`,
      inline: false,
    });
  }

  await interaction.reply({ content: "hey", embeds: [embed] });
}
