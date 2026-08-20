export interface Projet {
    idProjet: number;
    nom: string;
    description: string;
    objectif: number;
    date_debut: string;
    date_fin: string;
    image?: string;
    statut: 'en_cours' | 'termine' | 'en_attente';
}

export interface Don {
    idDon: number;
    type_don: 'especes' | 'nature';
    montant?: number;
    description?: string;
    valeur_estimee?: number;
    date_don: string;
    idDonateur: number;
    idProjet: number;
    idBesoin?: number;
}

export interface Donateur {
    idDonateur: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    date_inscription: string;
}

export interface Benevole {
    idBenevole: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    date_inscription: string;
}
export interface ImageProjet {  // ← RENOMMÉ
    idImage: number;
    url: string;
    titre: string;
    idProjet: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface Besoin {
    idBesoin: number;
    description: string;
    quantite: number;
    unite: string;
    valeur_estimee: number;
    idProjet: number;
}