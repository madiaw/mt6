from django import forms
from .models import Article, Mouvement

class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['nom', 'description', 'quantite', 'periode_revision']

class MouvementForm(forms.ModelForm):
    class Meta:
        model = Mouvement
        fields = ['article', 'type', 'quantite']