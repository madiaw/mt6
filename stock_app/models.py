from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField()
    quantite = models.IntegerField()
    date_ajout = models.DateTimeField(auto_now_add=True)
    date_derniere_revision = models.DateTimeField(null=True, blank=True)
    periode_revision = models.IntegerField(help_text="Période de révision en jours")

    def __str__(self):
        return self.nom

class Alerte(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    date_alerte = models.DateTimeField()
    traitee = models.BooleanField(default=False)

    def __str__(self):
        return f"Alerte pour {self.article.nom}"

class Mouvement(models.Model):
    TYPES = (
        ('E', 'Entrée'),
        ('S', 'Sortie'),
    )
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    type = models.CharField(max_length=1, choices=TYPES)
    quantite = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    utilisateur = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.get_type_display()} de {self.article.nom}"