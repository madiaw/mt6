import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import db from '../db';
import { useNavigate } from 'react-router-dom';

function AddArticle() {
  const [article, setArticle] = useState({ nom: '', description: '', quantite: 0, periodeRevision: 30 });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db.articles.add(article);
    navigate('/articles');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Ajouter un article</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" name="nom" value={article.nom} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={article.description} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantité</Form.Label>
          <Form.Control type="number" name="quantite" value={article.quantite} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Période de révision (jours)</Form.Label>
          <Form.Control type="number" name="periodeRevision" value={article.periodeRevision} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">Ajouter</Button>
      </Form>
    </div>
  );
}

export default AddArticle;