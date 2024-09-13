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
import { days } from "./types.ts";
import { handleDateAutoComplete } from "./autocomplete.ts";

export const { TOKEN, DB_NAME } = Bun.env;

if (!(TOKEN && DB_NAME)) throw new Error(".env is not set correctly");

export const db = sqlite.open(DB_NAME);

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

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    handleChatInputCommand(interaction);
  }

  if (interaction.isAutocomplete()) {
    handleDateAutoComplete(interaction); // no need to handle different commands bc autocomplete is only on dates
  }
});

client.login(TOKEN);
