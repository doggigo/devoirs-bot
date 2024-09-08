import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ajouterdevoir")
  .setDescription("Ajouter un devoir")
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
