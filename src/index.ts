// Discord imports
import { Client, Collection, GatewayIntentBits } from "discord.js";
import sqlite from "bun:sqlite";
// module augmentations imports
import "./client-augmentation.d.ts";

// Local imports
import { LoadSlashCommands } from "./loaders/loadSlashCommands";
import { fetchSlashCommands } from "./loaders/fetchSlashCommands.ts";

export const { TOKEN, DB_NAME } = Bun.env;

export const dataBase = sqlite.open("DB_NAME", { create: false });

if (!(TOKEN && DB_NAME)) throw new Error(".env is not set correctly");

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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

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
});

client.login(TOKEN);
