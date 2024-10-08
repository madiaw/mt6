from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('articles/', views.liste_articles, name='liste_articles'),
    path('articles/ajouter/', views.ajouter_article, name='ajouter_article'),
    path('mouvement/', views.mouvement_stock, name='mouvement_stock'),
    path('alertes/', views.alertes, name='alertes'),
    path('alertes/traiter/<int:alerte_id>/', views.traiter_alerte, name='traiter_alerte'),
]