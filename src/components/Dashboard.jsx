import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const DashboardWrapper = styled.div`
  .card {
    height: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .card-header {
    background-color: ${props => props.theme.primary};
    color: white;
  }
`;

function Dashboard() {
  const articles = useLiveQuery(() => db.articles.toArray());
  const alertes = useLiveQuery(() => db.alertes.where('traitee').equals(0).toArray());
  const mouvements = useLiveQuery(() => db.mouvements.toArray());

  const stockData = articles?.map(article => ({
    name: article.nom,
    quantite: article.quantite
  })) || [];

  const mouvementData = mouvements?.reduce((acc, mouvement) => {
    const date = new Date(mouvement.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { entrees: 0, sorties: 0 };
    }
    if (mouvement.type === 'E') {
      acc[date].entrees += mouvement.quantite;
    } else {
      acc[date].sorties += mouvement.quantite;
    }
    return acc;
  }, {});

  const mouvementChartData = Object.entries(mouvementData || {}).map(([date, data]) => ({
    date,
    entrees: data.entrees,
    sorties: data.sorties
  }));

  return (
    <DashboardWrapper>
      <h1 className="mb-4">Tableau de bord</h1>
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>Articles en stock</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantite" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>Mouvements de stock</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mouvementChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="entrees" fill="#82ca9d" />
                  <Bar dataKey="sorties" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>Alertes de révision</Card.Header>
            <ListGroup variant="flush">
              {alertes?.map(alerte => (
                <ListGroup.Item key={alerte.id}>
                  {articles?.find(a => a.id === alerte.articleId)?.nom} - {new Date(alerte.dateAlerte).toLocaleDateString()}
                </ListGroup.Item>
              ))}
              {alertes?.length === 0 && (
                <ListGroup.Item>Aucune alerte en cours</ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>Statistiques</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Nombre total d'articles : {articles?.length || 0}</ListGroup.Item>
              <ListGroup.Item>Nombre total de mouvements : {mouvements?.length || 0}</ListGroup.Item>
              <ListGroup.Item>Nombre d'alertes actives : {alertes?.length || 0}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </DashboardWrapper>
  );
}

export default Dashboard;