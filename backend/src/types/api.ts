// backend/src/types/api.ts
// Type générique pour uniformiser toutes les réponses de l'API
export interface ApiResponse<T> {
  data: T;
  total?: number; // pour les listes
  message?: string;
}

export interface ApiError {
  erreur: string;
  champs?: string[]; // champs manquants pour les 400
}

// Usage dans un controller :
// res.json({ data: livres, total: livres.length })
// res.status(400).json({ erreur: 'Champs manquants', champs: ['isbn'] })
