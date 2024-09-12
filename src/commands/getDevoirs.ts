import { SlashCommandBuilder, type CommandInteraction } from "discord.js";
// import { getDevoirs } from "../db";

export const data = new SlashCommandBuilder()
  .setName("ajouterdevoir")
  .setDescription("Ajouter un devoir")
  .setDefaultMemberPermissions(null);

export async function execute(interaction: CommandInteraction) {
  await interaction.reply('hi');
  //let devoirs = await getDevoirs(DBConnection);
  // devoirs? await interaction.reply(devoirs as string) : null;
}