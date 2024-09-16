export type Matiere = "Mathématiques" | "Informatique" | "S.I." | "Physique" | "Français" | "Anglais";

export const days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

export interface DevoirTable {
  id: number;
  matiere: string;
  date_rendu: string;
  contenu: string;
}

export function isDevoirTable(obj: unknown): obj is DevoirTable {

  if (typeof obj === "object" && obj !== null) {
    const devoir = obj as DevoirTable;

    return (
      typeof devoir.id === "number" &&
      typeof devoir.matiere === "string" &&
      typeof devoir.date_rendu === "string" &&
      typeof devoir.contenu === "string"
    );
  }
  return false;
}