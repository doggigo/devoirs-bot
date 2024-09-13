// Discord imports
import {
  AutocompleteInteraction,
  Client,
  Collection,
  CommandInteraction,
  GatewayIntentBits,
  type Interaction,
} from "discord.js";
import sqlite from "bun:sqlite";
// module augmentations imports
import "./client-augmentation.d.ts";

// Local imports
import { LoadSlashCommands } from "./loaders/loadSlashCommands";
import { fetchSlashCommands } from "./loaders/fetchSlashCommands.ts";

export const { TOKEN, DB_NAME } = Bun.env;

if (!(TOKEN && DB_NAME)) throw new Error(".env is not set correctly");

export const dataBase = sqlite.open(DB_NAME);

const intents: GatewayIntentBits[] = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
];

export const client = new Client({
  intents: intents,
});
client.commands = new Collection();

client.once("ready", async () => {
  console.log(`Connecté en tant que ${client.user?.id}`);
  await fetchSlashCommands();
  await LoadSlashCommands();
});

const handleChatInputCommand = async (interaction: CommandInteraction) => {
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`il est debile ${interaction.user.globalName} ca existe pas la commande ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    await interaction.followUp({
      content: "EUH Y A UN PROBLEME AVEC TA COMMANDE DSL",
      ephemeral: true,
    });
  }
};

const toSqliteDate = (date: Date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

const generateDefaultDates = () => {
  let dateNow = new Date(Date.now());
  let nextDates: Date[] = [];

  for (let i = 0; i <= 30; i++) {
    let newDate = new Date(dateNow);
    newDate.setDate(dateNow.getDate() + i);
    nextDates.push(newDate);
  }

  return nextDates.map((i) => {
    return {
      name: i.toLocaleDateString(),
      value: toSqliteDate(i),
    };
  });
};

const handleDateAutoComplete = async (interaction: AutocompleteInteraction) => {
  const focusedValue = interaction.options.getFocused();

  const defaultResults = generateDefaultDates();
  interaction.respond(defaultResults);
};

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    handleChatInputCommand(interaction);
  }

  if (interaction.isAutocomplete()) {
    handleDateAutoComplete(interaction); // no need to handle different commands bc autocomplete is only on dates
  }
});

client.login(TOKEN);
