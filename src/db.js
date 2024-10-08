import Dexie from 'dexie';

const db = new Dexie('StockArmyDB');
db.version(1).stores({
  articles: '++id, nom, description, quantite, dateDerniereRevision, periodeRevision',
  mouvements: '++id, articleId, type, quantite, date',
  alertes: '++id, articleId, dateAlerte, traitee'
});

export default db;