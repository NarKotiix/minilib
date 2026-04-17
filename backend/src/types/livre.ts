// backend/src/types/livre.ts
/**
 * Représente un livre dans le catalogue MiniLib.
 * Correspond à la table livres dans PostgreSQL.
 */
export interface Livre {
  id: number;
  isbn: string;
  titre: string;
  auteur: string;
  annee: number;
  genre: string;
  disponible: boolean;
}

/**
 * Données pour créer un livre — sans id (SERIAL PostgreSQL) ni disponible (true par défaut).
 */
export interface CreateLivreDto {
  isbn: string;
  titre: string;
  auteur: string;
  annee?: number;
  genre?: string;
}

/** Filtres optionnels pour la liste des livres. */
export interface FiltresLivre {
  genre?: string;
  disponible?: boolean;
  recherche?: string;
}
