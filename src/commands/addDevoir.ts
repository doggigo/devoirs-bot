import {
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ajouterDevoir")
  .setDescription("Ajouter un devoir")
  .setDefaultMemberPermissions(null)
  
export async function execute(interaction: CommandInteraction) {
  
}
