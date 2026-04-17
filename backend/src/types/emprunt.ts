// backend/src/types/emprunt.ts
export interface Emprunt {
  id: number;
  livre_id: number;
  adherent_id: number;
  date_emprunt: Date;
  date_retour_prevue: Date;
  date_retour_effective: Date | null;
}

// Interface enrichie avec les données des JOINs SQL
export interface EmpruntAvecDetails extends Emprunt {
  titre_livre: string;
  nom_adherent: string;
  en_retard: boolean;
}

export interface CreateEmpruntDto {
  livre_id: number;
  adherent_id: number;
}
