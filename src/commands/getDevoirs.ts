import { SlashCommandBuilder, type CommandInteraction } from "discord.js";
import { DBConnection } from "..";
import { getDevoirs } from "../db";

export const data = new SlashCommandBuilder()
  .setName("ajouterdevoir")
  .setDescription("Ajouter un devoir")
  .setDefaultMemberPermissions(null);

export async function execute(interaction: CommandInteraction) {
  let devoirs = await getDevoirs(DBConnection);
  devoirs? await interaction.reply(devoirs as string) : null;
}