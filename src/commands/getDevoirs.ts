import { EmbedBuilder, SlashCommandBuilder, type CommandInteraction } from "discord.js";
import { db } from "..";
import { isDevoirTable, type DevoirTable } from "../types";
import { capitalize } from "../utils/utils";

export const data = new SlashCommandBuilder()
  .setName("devoirs")
  .setDescription("avoir les devoirs")
  .setDefaultMemberPermissions(null);

const translateDate = (d: string) => `${d.substring(8, 10)}/${d.substring(5, 7)}/${d.substring(0, 4)}`;

export async function execute(interaction: CommandInteraction) {
  let devoirs: any[] | null = db.query("SELECT * FROM Devoirs WHERE DATE(date_rendu) >= DATE('now') ORDER BY date_rendu ASC;").all();

  devoirs = devoirs.every((d) => isDevoirTable(d)) ? (devoirs as DevoirTable[]) : null;
  if (!devoirs) return;

  const embed = new EmbedBuilder().setTitle("Devoirs").setColor("#00b0f4");

  for (let devoir of devoirs) {
    embed.addFields({
      name: `ID : ${devoir["id"]}`,
      value: `**${capitalize(devoir["matiere"] as string)} - ${translateDate(devoir["date_rendu"])}** \n**Contenu :** ${devoir["contenu"]} \n\n`,
      inline: false,
    });
  }

  if (devoirs.length == 0)
    embed.addFields({
      name: `Il n'y a actuellement aucun devoir.`,
      value: `effectuer la commande "/ajouterdevoir" pour ajouter des devoirs`,
      inline: false,
    });

  await interaction.reply({ content: "", embeds: [embed] });
}
