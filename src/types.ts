export type Matiere =
  | "Mathématiques"
  | "Informatique"
  | "S.I."
  | "Physique"
  | "Français"
  | "Anglais";

export const days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

export class Devoir {
  date: string;
  matiere: Matiere;
  content: string;

  constructor(date: string, matiere: Matiere, content: string) {
    this.date = date;
    this.matiere = matiere;
    this.content = content;
  }
}
