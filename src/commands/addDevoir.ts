import { CommandInteraction, SlashCommandBuilder } from "discord.js";
// import { getDevoirs } from "../db";

export const data = new SlashCommandBuilder()
  .setName("ajouterdevoir")
  .setDescription("ajouter un devoir")
  .setDefaultMemberPermissions(null)
  .addStringOption((option) =>
    option
      .setName("matiere")
      .setDescription("Matière du devoir")
      .setChoices(
        { name: "Maths", value: "maths" },
        { name: "Physique", value: "physique" },
        { name: "Informatique", value: "informatique" },
        { name: "SI", value: "si" },
        { name: "Anglais", value: "anglais" },
        { name: "Francais", value: "francais" },
        { name: "Autre", value: "autre" }
      )
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("date")
      .setDescription("Date limite de rendu du devoir")
      .setRequired(true)
      .setAutocomplete(true)
  )
  .addStringOption((option) =>
    option
      .setName("contenu")
      .setDescription("Contenu du devoir")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  let matiere = interaction.options.get('matiere')?.value as string;
  await interaction.reply(matiere);
}
