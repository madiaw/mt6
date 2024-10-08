import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import db from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';

function StockMovement() {
  const [movement, setMovement] = useState({ articleId: '', type: 'E', quantite: 0 });
  const navigate = useNavigate();
  const articles = useLiveQuery(() => db.articles.toArray());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const article = await db.articles.get(parseInt(movement.articleId));
    if (article) {
      if (movement.type === 'E') {
        article.quantite += parseInt(movement.quantite);
      } else {
        article.quantite -= parseInt(movement.quantite);
      }
      await db.articles.put(article);
      await db.mouvements.add({
        ...movement,
        articleId: parseInt(movement.articleId),
        date: new Date()
      });
      navigate('/articles');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovement(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Mouvement de stock</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Article</Form.Label>
          <Form.Select name="articleId" value={movement.articleId} onChange={handleChange} required>
            <option value="">Sélectionnez un article</option>
            {articles?.map(article => (
              <option key={article.id} value={article.id}>{article.nom}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type de mouvement</Form.Label>
          <Form.Select name="type" value={movement.type} onChange={handleChange} required>
            <option value="E">Entrée</option>
            <option value="S">Sortie</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantité</Form.Label>
          <Form.Control type="number" name="quantite" value={movement.quantite} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">Enregistrer</Button>
      </Form>
    </div>
  );
}

export default StockMovement;