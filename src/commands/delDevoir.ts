import type { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { dataBase } from "..";

export const data = new SlashCommandBuilder()
  .setName("supprimerdevoir")
  .setDescription("supprimer un devoir avec son identifiannt")
  .setDefaultMemberPermissions(null)
  .addNumberOption((opt) => opt.setName("id").setDescription("identifiant du devoir").setMinValue(1));

export async function execute(interaction: CommandInteraction) {
  let devoirId = interaction.options.get("id")?.value;
  if (typeof devoirId != "number") return;

  let result = dataBase.query("SELECT id FROM Devoirs WHERE ID=?").all(devoirId);
  if (result.length > 0) {
    dataBase.query("DELETE FROM Devoirs WHERE id=?").all(devoirId);
    await interaction.reply(`Le devoir avec l'identifiant \`${devoirId}\` a bien été supprimé.`);
  } else {
    await interaction.reply({ content: `Le devoir avec l'identifiant \`${devoirId}\` n'existe pas.`, ephemeral: true });
  }
}
