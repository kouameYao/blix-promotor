export type Tarification = {
  id: string;
  libelle: string;
  description: string | null;
  prix: number;
  qteTotale: number;
  qteRestante: number;
};

export type Categorie = {
  id: string;
  libelle: string;
  description: string;
  active: boolean;
};
export type TEvent = {
  id: string;
  code: string;
  slug: string | null;
  dateheureDebut: string;
  dateheureFin: string;
  ville: string;
  adresse: string;
  sousTitre: string | null;
  description: string;
  statut: string;
  datePublicationPrevue: string | null;
  datePublicationEffective: string | null;
  portee: string;
  lienPortee: string | null;
  typeLieuEnum: string;
  lienLieu: string | null;
  infoline: string | null;
  imagePrincipale: string | null;
  createdAt: string;
  tarifications: Tarification[];
  categorie: Categorie;
};
