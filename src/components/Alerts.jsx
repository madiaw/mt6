import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db';
import { Table, Button } from 'react-bootstrap';

function Alerts() {
  const alertes = useLiveQuery(() => db.alertes.where('traitee').equals(0).toArray());
  const articles = useLiveQuery(() => db.articles.toArray());

  const handleTreated = async (alerteId) => {
    const alerte = await db.alertes.get(alerteId);
    if (alerte) {
      alerte.traitee = true;
      await db.alertes.put(alerte);
      const article = await db.articles.get(alerte.articleId);
      if (article) {
        article.dateDerniereRevision = new Date();
        await db.articles.put(article);
      }
    }
  };

  return (
    <div>
      <h1>Alertes de révision</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Article</th>
            <th>Date d'alerte</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {alertes?.map(alerte => (
            <tr key={alerte.id}>
              <td>{articles?.find(a => a.id === alerte.articleId)?.nom}</td>
              <td>{new Date(alerte.dateAlerte).toLocaleDateString()}</td>
              <td>
                <Button variant="warning" onClick={() => handleTreated(alerte.id)}>Traiter</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Alerts;