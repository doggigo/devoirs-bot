import {
  CommandInteraction,
  GuildMember,
  SlashCommandBuilder,
  SlashCommandUserOption,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("commande")
  .setDescription("test")
  .setDefaultMemberPermissions(null)
  .setDMPermission(false)


export async function execute(interaction: CommandInteraction) {
}
