# Application de gestion de stock pour l'armée

Cette application Django permet de gérer les stocks de l'armée, avec un tableau de bord, des alertes de révision et une gestion des utilisateurs.

## Installation locale avec Visual Studio Code

1. Assurez-vous d'avoir Python 3.8+ installé sur votre système.

2. Clonez ce dépôt ou téléchargez les fichiers dans un dossier local.

3. Ouvrez le dossier du projet dans Visual Studio Code.

4. Ouvrez un terminal dans VS Code (Terminal -> New Terminal).

5. Créez un environnement virtuel :
   ```
   python -m venv venv
   ```

6. Activez l'environnement virtuel :
   - Sur Windows : `venv\Scripts\activate`
   - Sur macOS/Linux : `source venv/bin/activate`

7. Installez les dépendances :
   ```
   pip install -r requirements.txt
   ```

8. Effectuez les migrations de la base de données :
   ```
   python manage.py migrate
   ```

9. Créez un superutilisateur :
   ```
   python manage.py createsuperuser
   ```

10. Lancez le serveur de développement :
    ```
    python manage.py runserver
    ```

11. Ouvrez votre navigateur et accédez à `http://127.0.0.1:8000/` pour voir l'application en action.

## Fonctionnalités

- Tableau de bord
- Gestion des stocks
- Alertes de révision des matériaux
- Authentification des utilisateurs
- Interface en français

## Utilisation

1. Connectez-vous avec votre compte superutilisateur ou créez un nouveau compte utilisateur.
2. Explorez les différentes sections de l'application : tableau de bord, gestion des stocks, alertes.
3. Ajoutez, modifiez ou supprimez des articles dans le stock.
4. Configurez les alertes de révision pour les matériaux.
5. Gérez les utilisateurs et leurs permissions dans l'interface d'administration.