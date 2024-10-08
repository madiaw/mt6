import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ArticleList() {
  const articles = useLiveQuery(() => db.articles.toArray());

  return (
    <div>
      <h1>Liste des articles</h1>
      <Link to="/add-article" className="btn btn-primary mb-3">Ajouter un article</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Quantité</th>
            <th>Dernière révision</th>
            <th>Période de révision (jours)</th>
          </tr>
        </thead>
        <tbody>
          {articles?.map(article => (
            <tr key={article.id}>
              <td>{article.nom}</td>
              <td>{article.description}</td>
              <td>{article.quantite}</td>
              <td>{article.dateDerniereRevision ? new Date(article.dateDerniereRevision).toLocaleDateString() : 'Jamais'}</td>
              <td>{article.periodeRevision}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ArticleList;