import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ajouterDevoir")
  .setDescription("Ajouter un devoir")
  .setDefaultMemberPermissions(null)
  .addStringOption((option) =>
    option
      .setName("matière")
      .setDescription("Matière du devoir")
      .setChoices(
        { name: "Maths", value: "maths" },
        { name: "Physique", value: "physique" },
        { name: "Informatique", value: "informatique" },
        { name: "SI", value: "si" },
        { name: "Anglais", value: "anglais" },
        { name: "Français", value: "francais" },
        { name: "Autre", value: "autre" }
      )
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("date")
      .setDescription("Date limite de redu du devoir")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("contenu")
      .setDescription("Contenu du devoir")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
}
