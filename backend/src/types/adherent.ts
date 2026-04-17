// backend/src/types/adherent.ts
export interface Adherent {
  id: number;
  numero_adherent: string;
  nom: string;
  prenom: string;
  email: string;
  actif: boolean;
  created_at: Date;
}

export interface CreateAdherentDto {
  nom: string;
  prenom: string;
  email: string;
}
