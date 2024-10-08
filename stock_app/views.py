from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Article, Alerte, Mouvement
from .forms import ArticleForm, MouvementForm
from django.utils import timezone

@login_required
def dashboard(request):
    articles = Article.objects.all()
    alertes = Alerte.objects.filter(traitee=False)
    context = {
        'articles': articles,
        'alertes': alertes,
    }
    return render(request, 'stock_app/dashboard.html', context)

@login_required
def liste_articles(request):
    articles = Article.objects.all()
    return render(request, 'stock_app/liste_articles.html', {'articles': articles})

@login_required
def ajouter_article(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Article ajouté avec succès.')
            return redirect('liste_articles')
    else:
        form = ArticleForm()
    return render(request, 'stock_app/ajouter_article.html', {'form': form})

@login_required
def mouvement_stock(request):
    if request.method == 'POST':
        form = MouvementForm(request.POST)
        if form.is_valid():
            mouvement = form.save(commit=False)
            mouvement.utilisateur = request.user
            mouvement.save()
            
            article = mouvement.article
            if mouvement.type == 'E':
                article.quantite += mouvement.quantite
            else:
                article.quantite -= mouvement.quantite
            article.save()
            
            messages.success(request, 'Mouvement de stock enregistré avec succès.')
            return redirect('liste_articles')
    else:
        form = MouvementForm()
    return render(request, 'stock_app/mouvement_stock.html', {'form': form})

@login_required
def alertes(request):
    alertes = Alerte.objects.filter(traitee=False)
    return render(request, 'stock_app/alertes.html', {'alertes': alertes})

@login_required
def traiter_alerte(request, alerte_id):
    alerte = Alerte.objects.get(id=alerte_id)
    alerte.traitee = True
    alerte.save()
    
    article = alerte.article
    article.date_derniere_revision = timezone.now()
    article.save()
    
    messages.success(request, 'Alerte traitée avec succès.')
    return redirect('alertes')