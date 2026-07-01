# TimeTravel Agency — Voyages Temporels de Luxe

Une application web moderne, immersive et responsive développée dans le cadre du projet final **TimeTravel Agency** (Ynov Campus - M1 IA). Ce portail haut de gamme permet aux clients d'explorer des époques historiques, d'obtenir une recommandation d'époque personnalisée via un quiz interactif, d'interagir avec un concierge IA en temps réel et de réserver leur vol temporel en toute sécurité.

---

## 👨‍💻 Auteur & Crédits
* **Développeur Principal** : Nazir ZATO ALI (M1 IA - Ynov Campus)
* **Co-développeur IA** : Antigravity (Google DeepMind)
* **Hébergement & API** : Mistral AI API (`mistral-small-latest`), hébergé sur Vercel.

---

## 🛠️ Stack Technique & Technologies Utilisées

* **Framework & Build** : [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) (Rendu ultra-rapide, HMR et bundle optimisé).
* **Styling (CSS)** : [Tailwind CSS v4](https://tailwindcss.com/) (Thème sombre de luxe personnalisé, classes de verre avec flou d'arrière-plan *glassmorphic*, et animations fluides).
* **Icônes** : [Lucide React](https://lucide.dev/) (Icônes vectorielles modernes).
* **Intelligence Artificielle** : [API Mistral AI](https://mistral.ai/) (Modèle `mistral-small` connecté en direct ou avec un système de secours local intelligent).
* **Compression Média** : [FFmpeg](https://ffmpeg.org/) (Utilisé via python `imageio-ffmpeg` pour compresser la vidéo d'accueil de **48.5 Mo** à **4.2 Mo** en encodage H.264 compatible tous navigateurs).

---

## 🌟 Fonctionnalités Implémentées

1. **Page d'Accueil Cinématique (Hero)** :
   * Arrière-plan vidéo HD (teaser compressé en boucle) avec des dégradés noirs et dorés pour une ambiance de luxe.
   * Pas d'éléments superposés gênants et boutons de navigation totalement cliquables (grâce à l'exclusion d'interception d'événements sur la vidéo en arrière-plan).
2. **Galerie d'Époques Interactive** :
   * Fiches détaillées pour nos 3 destinations : **Paris 1889 (La Belle Époque)**, **Le Crétacé (-65M d'années)**, et **Florence 1504 (La Renaissance)**.
   * **Lecture vidéo automatique au survol de la carte** (sans aucun bouton de lecture/pause apparent sur l'image) pour une interface vivante et moderne.
   * Modales d'informations détaillées listant les tarifs et les activités phares de chaque expédition.
3. **Quiz Temporel de Recommandation** :
   * Questionnaire animé de 4 questions (calculant les préférences entre nature sauvage, art/architecture ou progrès technologique).
   * Recommande automatiquement l'époque idéale avec un résumé de l'expédition et la possibilité de pré-remplir la réservation en un clic.
4. **Bureau de Réservations (Formulaire Intelligent)** :
   * **Calendrier interactif sur-mesure** : Un sélecteur de dates en grille mensuelle personnalisé.
   * **Contraintes dynamiques** : Le calendrier restreint le choix aux dates autorisées (ex: mai-octobre 1889 pour Paris) ou convertit automatiquement les dates sélectionnées en années préhistoriques pour le Crétacé (ex: *"14 juillet, 65 000 000 BC"*).
   * Calculateur de prix en direct selon la classe de voyage (Cápsula Standard, Chrono-Suite Executive, Royal Emperor) et le nombre de passagers.
   * Génération de billet d'embarquement virtuel.
5. **Concierge IA en Temps Réel (Chatbot)** :
   * Widget de chat flottant élégant en bas à droite de l'écran.
   * Support multilingue : Répond de manière fluide dans la langue choisie par l'utilisateur (Français, Anglais ou Espagnol).
   * **Liaison `.env` sécurisée** : Si une clé API Mistral est présente dans le fichier `.env`, le chatbot utilise le modèle d'inférence en direct avec un prompt système incarnant le concierge temporel de luxe. Sinon, un chatbot simulé prend le relais.
6. **Support Multilingue Global** :
   * Changement de langue à la volée depuis la barre de navigation (Français, Anglais, Espagnol). Tous les textes du site, des modales, du quiz et du chatbot s'adaptent instantanément.

---

## 🔒 Sécurité des Clés API
La clé de l'API Mistral est configurée de manière sécurisée :
* Elle est chargée côté client via la variable d'environnement `VITE_MISTRAL_API_KEY`.
* Le fichier `.env` contenant votre clé privée est exclu des commits Git via le fichier `.gitignore` afin d'éviter toute fuite accidentelle sur les dépôts publics.

---

## 🚀 Installation & Exécution Locale

### Prérequis
* [Node.js](https://nodejs.org/) (v18 ou supérieur)
* [npm](https://www.npmjs.com/)

### Procédure
1. **Téléchargez et décompressez le projet** (ou clonez-le).
2. **Installez les dépendances** :
   ```bash
   npm install
   ```
3. **Configurez la clé API** :
   Créez un fichier `.env` à la racine du projet et ajoutez votre clé Mistral AI :
   ```env
   VITE_MISTRAL_API_KEY=votre_cle_api_ici
   ```
4. **Lancez le serveur de développement local** :
   ```bash
   npm run dev
   ```
   *L'application sera accessible sur `http://localhost:5173/`.*
5. **Construisez le projet pour la production** :
   ```bash
   npm run build
   ```

---

## 📦 Fichiers livrés
* Code source complet (React / Tailwind CSS v4)
* Configuration de routage Vercel (`vercel.json`)
* Configuration Git (`.gitignore` excluant `.env` et les modules système)
* Documentation complète (`README.md`)
