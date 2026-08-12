// Video i18n — 6 languages, RTL for Arabic, no Chinese in source
(function () {
  const LANGUAGES = {
    en: { label: 'English', flag: 'GB', rtl: false },
    fr: { label: 'Fran\u00E7ais', flag: 'FR', rtl: false },
    de: { label: 'Deutsch', flag: 'DE', rtl: false },
    it: { label: 'Italiano', flag: 'IT', rtl: false },
    es: { label: 'Espa\u00F1ol', flag: 'ES', rtl: false },
    ar: { label: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629', flag: 'SA', rtl: true },
  };
  const LANG_LIST = Object.keys(LANGUAGES);

  // ── Translation data ──────────────────────────────────────────────────────
  const TRANSLATIONS = {
    meta: {
      title: {
        en: 'Video \u2014 Multi-modal Content Platform',
        fr: 'Video \u2014 Plateforme Multi-modalit\u00E9',
        de: 'Video \u2014 Multilaterale Content-Plattform',
        it: 'Video \u2014 Piattaforma Contenuti Multi-modale',
        es: 'Video \u2014 Plataforma de Contenidos Multi-modal',
        ar: 'Video \u2014 \u0645\u0646\u0635\u0629 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u062A\u0639\u062F\u062F \u0627\u0644\u0648\u0633\u0627\u0626\u0637',
      },
      titleShorts: {
        en: 'Shorts \u2014 Video',
        fr: 'Shorts \u2014 Video',
        de: 'Shorts \u2014 Video',
        it: 'Shorts \u2014 Video',
        es: 'Shorts \u2014 Video',
        ar: '\u0634\u0631\u0648\u0637 \u2014 Video',
      },
      titleWatch: {
        en: 'Watch \u2014 Video',
        fr: 'Regarder \u2014 Video',
        de: 'Ansehen \u2014 Video',
        it: 'Guarda \u2014 Video',
        es: 'Ver \u2014 Video',
        ar: '\u0634\u0627\u062A \u2014 Video',
      },
      search: {
        en: 'Search content...',
        fr: 'Rechercher du contenu...',
        de: 'Inhalt suchen...',
        it: 'Cerca contenuto...',
        es: 'Buscar contenido...',
        ar: '\u0627\u0644\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0645\u062D\u062A\u0648\u0649...',
      },
      upload: {
        en: 'Upload',
        fr: 'T\u00E9l\u00E9charger',
        de: 'Hochladen',
        it: 'Carica',
        es: 'Subir',
        ar: '\u062A\u0631\u0627\u0642',
      },
      uploadBtn: {
        en: 'Upload content',
        fr: 'T\u00E9l\u00E9charger du contenu',
        de: 'Inhalt hochladen',
        it: 'Carica contenuto',
        es: 'Subir contenido',
        ar: '\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u062D\u062A\u0648\u0649',
      },
      notLoggedIn: {
        en: 'Not logged in',
        fr: 'Non connect\u00E9',
        de: 'Nicht angemeldet',
        it: 'Non connesso',
        es: 'No conectado',
        ar: '\u063A\u064A\u0631 \u0645\u062A\u0635\u0644',
      },
      loginToUpload: {
        en: 'Log in to upload',
        fr: 'Connectez-vous pour t\u00E9l\u00E9charger',
        de: 'Anmelden zum Hochladen',
        it: 'Accedi per caricare',
        es: 'Inicia sesi\u00F3n para subir',
        ar: '\u0633\u062C\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u062A\u0631\u0627\u0642',
      },
      uploadDisabled: {
        en: 'Free users cannot upload',
        fr: 'Les utilisateurs gratuits ne peuvent pas t\u00E9l\u00E9charger',
        de: 'Kostenlose Nutzer k\u00F6nnen nicht hochladen',
        it: 'Gli utenti free non possono caricare',
        es: 'Los usuarios gratuitos no pueden subir',
        ar: '\u0645\u0633\u062A\u062E\u062F\u0645\u0648 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u0645\u062C\u0627\u0646\u064A \u063A\u064A\u0631 \u0645\u0645\u0643\u0646\u0647\u0645 \u0627\u0644\u062A\u0631\u0627\u0642',
      },
      login: {
        en: 'Log in',
        fr: 'Se connecter',
        de: 'Anmelden',
        it: 'Accedi',
        es: 'Iniciar sesi\u00F3n',
        ar: '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644',
      },
      logout: {
        en: 'Log out',
        fr: 'D\u00E9connexion',
        de: 'Abmelden',
        it: 'Esci',
        es: 'Cerrar sesi\u00F3n',
        ar: '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C',
      },
      profile: {
        en: 'Profile',
        fr: 'Profil',
        de: 'Profil',
        it: 'Profilo',
        es: 'Perfil',
        ar: '\u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0634\u062E\u0635\u064A',
      },
      prev: { en: 'Prev', fr: 'Préc.', de: 'Zurück', it: 'Prec', es: 'Ant.', ar: '\u0627\u0644\u0633\u0627\u0628\u0642' },
      next: { en: 'Next', fr: 'Suiv.', de: 'Weiter', it: 'Succ', es: 'Sig.', ar: '\u0627\u0644\u062A\u0627\u0644\u064A' },
      back: { en: 'Back', fr: 'Retour', de: 'Zurück', it: 'Indietro', es: 'Atrás', ar: '\u0639\u0648\u062F\u0629' },
      searchUsers: { en: 'Search users…', fr: 'Rechercher…', de: 'Suchen…', it: 'Cerca…', es: 'Buscar…', ar: '\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646…' },
      categories: {
        en: 'Categories',
        fr: 'Cat\u00E9gories',
        de: 'Kategorien',
        it: 'Categorie',
        es: 'Categor\u00EDas',
        ar: '\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A',
      },
      collections: {
        en: 'Collections',
        fr: 'Collections',
        de: 'Sammlungen',
        it: 'Collezioni',
        es: 'Colecciones',
        ar: '\u0645\u062c\u0645\u0648\u0639\u0627\u062a',
      },
      noVideo: {
        en: 'No video found',
        fr: 'Aucune vid\u00E9o trouv\u00E9e',
        de: 'Kein Video gefunden',
        it: 'Nessun video trovato',
        es: 'Ning\u00FAn video encontrado',
        ar: '\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0641\u064A\u062F\u064A\u0648',
      },
    },

    menu: {
      home: {
        en: 'Home',
        fr: 'Accueil',
        de: 'Startseite',
        it: 'Home',
        es: 'Inicio',
        ar: '\u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629',
      },
      shorts: {
        en: 'Shorts',
        fr: 'Shorts',
        de: 'Shorts',
        it: 'Shorts',
        es: 'Shorts',
        ar: '\u0634\u0631\u0648\u0637',
      },
      explorer: {
        en: 'Explore',
        fr: 'Explorer',
        de: 'Entdecken',
        it: 'Esplora',
        es: 'Explorar',
        ar: '\u0627\u0633\u062a\u0643\u0634\u0627\u0641',
      },
      short_drama: {
        en: 'Short Dramas',
        fr: 'Court-m\u00E9trages',
        de: 'Kurzfilme',
        it: 'Cortometraggi',
        es: 'Cortometrajes',
        ar: '\u0623\u0641\u0644\u0627\u0645 \u0642\u0635\u064A\u0631\u0629',
      },
      tv_series: {
        en: 'TV Series',
        fr: 'S\u00E9ries TV',
        de: 'TV-Serien',
        it: 'Serie TV',
        es: 'Series de TV',
        ar: '\u0645\u0633\u0644\u0633\u0644\u0627\u062A \u062A\u0644\u0641\u0632\u064A\u0648\u0632\u064A\u0629',
      },
      movie: {
        en: 'Movies',
        fr: 'Films',
        de: 'Filme',
        it: 'Film',
        es: 'Pel\u00EDculas',
        ar: '\u0623\u0641\u0644\u0627\u0645',
      },
      ugc_long_video: {
        en: 'UGC Videos',
        fr: 'Vid\u00E9os UGC',
        de: 'UGC-Videos',
        it: 'Video UGC',
        es: 'Videos UGC',
        ar: '\u0641\u064A\u062F\u064A\u0648\u0647\u0627\u062A \u0645\u0646 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646',
      },
      short_video: {
        en: 'Short Videos',
        fr: 'Courtes vid\u00E9os',
        de: 'Kurzvideos',
        it: 'Video brevi',
        es: 'Videos cortos',
        ar: '\u0641\u064A\u062F\u064A\u0648\u0647\u0627\u062A \u0642\u0635\u064A\u0631\u0629',
      },
    },

    modal: {
      uploadTitle: {
        en: 'Upload Content',
        fr: 'T\u00E9l\u00E9charger du contenu',
        de: 'Inhalt hochladen',
        it: 'Carica Contenuto',
        es: 'Subir Contenido',
        ar: '\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u062D\u062A\u0648\u0649',
      },
      contentType: {
        en: 'Content Type',
        fr: 'Type de contenu',
        de: 'Inhaltstyp',
        it: 'Tipo di contenuto',
        es: 'Tipo de contenido',
        ar: '\u0646\u0648\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649',
      },
      selectType: {
        en: 'Select type...',
        fr: 'S\u00E9lectionnez un type...',
        de: 'Typ ausw\u00E4hlen...',
        it: 'Seleziona tipo...',
        es: 'Seleccionar tipo...',
        ar: '\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639...',
      },
      title: {
        en: 'Title',
        fr: 'Titre',
        de: 'Titel',
        it: 'Titolo',
        es: 'T\u00EDtulo',
        ar: '\u0627\u0644\u0639\u0646\u0648\u0627\u0646',
      },
      titleRequired: {
        en: 'Title',
        fr: 'Titre',
        de: 'Titel',
        it: 'Titolo',
        es: 'T\u00EDtulo',
        ar: '\u0627\u0644\u0639\u0646\u0648\u0627\u0646',
      },
      description: {
        en: 'Description',
        fr: 'Description',
        de: 'Beschreibung',
        it: 'Descrizione',
        es: 'Descripci\u00F3n',
        ar: '\u0627\u0644\u0648\u0635\u0641',
      },
      titlePlaceholder: {
        en: 'Enter title...',
        fr: 'Entrez un titre...',
        de: 'Titel eingeben...',
        it: 'Inserisci titolo...',
        es: 'Ingrese t\u00EDtulo...',
        ar: '\u0623\u062F\u062E\u0644 \u0627\u0644\u0639\u0646\u0648\u0627\u0646...',
      },
      descriptionPlaceholder: {
        en: 'Enter description...',
        fr: 'Entrez une description...',
        de: 'Beschreibung eingeben...',
        it: 'Inserisci descrizione...',
        es: 'Ingrese descripci\u00F3n...',
        ar: '\u0623\u062F\u062E\u0644 \u0627\u0644\u0648\u0635\u0641...',
      },
      accessType: {
        en: 'Access Type',
        fr: 'Type d\'acc\u00E8s',
        de: 'Zugriffstyp',
        it: 'Tipo di accesso',
        es: 'Tipo de acceso',
        ar: '\u0646\u0648\u0639 \u0627\u0644\u0648\u0635\u0648\u0644',
      },
      selectFile: {
        en: 'Select File',
        fr: 'S\u00E9lectionner un fichier',
        de: 'Datei ausw\u00E4hlen',
        it: 'Seleziona File',
        es: 'Seleccionar Archivo',
        ar: '\u0627\u062E\u062A\u0631 \u0645\u0644\u0641\u0627',
      },
      dropHint: {
        en: 'Drag & drop a file here, or click to select',
        fr: 'Glissez-d\u00E9posez un fichier ici, ou cliquez pour s\u00E9lectionner',
        de: 'Datei hierher ziehen oder klicken',
        it: 'Trascina un file qui o clicca per selezionare',
        es: 'Arrastra un archivo aqu\u00ED o haz clic para seleccionar',
        ar: '\u0627\u0633\u062D\u0628 \u0648\u0627\u0633\u0642\u0637 \u0645\u0644\u0641\u0627 \u0647\u0646\u0627\u060C \u0623\u0648 \u0627\u0636\u063A\u0637 \u0644\u0627\u062E\u062A\u064A\u0627\u0631',
      },
      fileFormatHint: {
        en: 'Supports video / audio / document formats',
        fr: 'Prend en charge les formats vid\u00E9o / audio / document',
        de: 'Unterstützt Video-/Audio-/Dokumentformate',
        it: 'Supporta formati video / audio / documento',
        es: 'Soporta formatos de video / audio / documento',
        ar: '\u064A\u062F\u0639\u0645 \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0641\u064A\u062F\u064A\u0648 / \u0627\u0644\u0635\u0648\u062A / \u0627\u0644\u0645\u062D\u062A\u0648\u0649',
      },
      videoUrl: {
        en: 'Valcorner CDN URL',
        fr: 'URL CDN Valcorner',
        de: 'Valcorner CDN-URL',
        it: 'URL CDN Valcorner',
        es: 'URL CDN Valcorner',
        ar: '\u0631\u0627\u0628\u0637 CDN Valcorner',
      },
      videoUrlPlaceholder: {
        en: 'https://cdn.valcorner.qzz.io/video/{type}/{id}/{file}',
        fr: 'https://cdn.valcorner.qzz.io/video/{type}/{id}/{file}',
        de: 'https://cdn.valcorner.qzz.io/video/{type}/{id}/{file}',
        it: 'https://cdn.valcorner.qzz.io/video/{type}/{id}/{file}',
        es: 'https://cdn.valcorner.qzz.io/video/{type}/{id}/{file}',
        ar: 'https://cdn.valcorner.qzz.io/video/{type}/{id}/{file}',
      },
      submit: {
        en: 'Start Upload',
        fr: 'D\u00E9marrer le t\u00E9l\u00E9chargement',
        de: 'Hochladen starten',
        it: 'Inizia Caricamento',
        es: 'Comenzar Subida',
        ar: '\u0627\u0628\u062F\u0623 \u0627\u0644\u062A\u0631\u0627\u0642',
      },
      uploading: {
        en: 'Uploading...',
        fr: 'T\u00E9l\u00E9chargement...',
        de: 'Hochladen...',
        it: 'Caricamento...',
        es: 'Subiendo...',
        ar: '\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0631\u0627\u0642...',
      },
    },

    status: {
      loginFirst: {
        en: 'Please log in first',
        fr: 'Veuillez vous connecter d\'abord',
        de: 'Bitte zuerst anmelden',
        it: 'Effettua prima il login',
        es: 'Inicia sesi\u00F3n primero',
        ar: '\u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0623\u0648\u0644\u0627',
      },
      freeCannotUpload: {
        en: 'Free users cannot upload content',
        fr: 'Les utilisateurs gratuits ne peuvent pas t\u00E9l\u00E9charger de contenu',
        de: 'Kostenlose Nutzer k\u00F6nnen keine Inhalte hochladen',
        it: 'Gli utenti free non possono caricare contenuti',
        es: 'Los usuarios gratuitos no pueden subir contenido',
        ar: '\u0645\u0633\u062A\u062E\u062F\u0645\u0648 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u0645\u062C\u0627\u0646\u064A \u063A\u064A\u0631 \u0645\u0645\u0643\u0646\u0647\u0645 \u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u062D\u062A\u0648\u0649',
      },
      selectFile: {
        en: 'Please select a file',
        fr: 'Veuillez s\u00E9lectionner un fichier',
        de: 'Bitte w\u00E4hlen Sie eine Datei',
        it: 'Seleziona un file',
        es: 'Seleccione un archivo',
        ar: '\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u0631 \u0645\u0644\u0641\u0627',
      },
      permissionDenied: {
        en: 'Your role cannot upload this type of content',
        fr: 'Votre r\u00F4le ne peut pas t\u00E9l\u00E9charger ce type de contenu',
        de: 'Ihre Rolle kann diesen Inhaltstyp nicht hochladen',
        it: 'Il tuo ruolo non pu\u00F2 caricare questo tipo di contenuto',
        es: 'Tu rol no puede subir este tipo de contenido',
        ar: '\u0648\u0636\u0639\u0643 \u0644\u0627 \u064A\u0648\u0627\u0641\u0642\u0647 \u0639\u0644\u0649 \u062A\u0631\u0627\u0642 \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639',
      },
      uploadSuccess: {
        en: 'Upload successful!',
        fr: 'T\u00E9l\u00E9chargement r\u00E9ussi !',
        de: 'Upload erfolgreich!',
        it: 'Caricamento riuscito!',
        es: '\u00A1Subida exitosa!',
        ar: '\u062A\u0645 \u0627\u0644\u062A\u0631\u0627\u0642 \u0628\u0646\u062C\u0627\u062D!',
      },
      uploadFailed: {
        en: 'Upload failed, please try again',
        fr: 'Le t\u00E9l\u00E9chargement a \u00E9chou\u00E9, veuillez r\u00E9essayer',
        de: 'Upload fehlgeschlagen, bitte erneut versuchen',
        it: 'Caricamento fallito, riprova',
        es: 'Error al subir, intenta de nuevo',
        ar: '\u0641\u0634\u0644 \u0627\u0644\u062A\u0631\u0627\u0642\u060C \u0623\u0639\u062F \u0645\u062D\u0627\u0648\u0644\u0629',
      },
      uploadUrlFailed: {
        en: 'Failed to get upload URL',
        fr: '\u00C9chec de l\'obtention de l\'URL de t\u00E9l\u00E9chargement',
        de: 'Upload-URL konnte nicht abgerufen werden',
        it: 'Impossibile ottenere l\'URL di caricamento',
        es: 'Error al obtener la URL de subida',
        ar: '\u0641\u0634\u0644 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0631\u0627\u0642',
      },
      uploadCompleteFailed: {
        en: 'Failed to complete upload',
        fr: '\u00C9chec de la finalisation du t\u00E9l\u00E9chargement',
        de: 'Upload-Vervollst\u00E4ndigung fehlgeschlagen',
        it: 'Impossibile completare il caricamento',
        es: 'Error al completar la subida',
        ar: '\u0641\u0634\u0644 \u062A\u0645\u0627\u0645 \u0627\u0644\u062A\u0631\u0627\u0642',
      },
      loadFailed: {
        en: 'Load failed, please refresh',
        fr: '\u00C9chec du chargement, veuillez actualiser',
        de: 'Laden fehlgeschlagen, bitte neu laden',
        it: 'Caricamento fallito, aggiorna',
        es: 'Error al cargar, actualice',
        ar: '\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u060C \u0623\u0639\u062F \u062A\u062C\u062F\u064A\u062F',
      },
      notFound: {
        en: 'No results found',
        fr: 'Aucun résultat trouvé',
        de: 'Keine Ergebnisse gefunden',
        it: 'Nessun risultato trovato',
        es: 'No se encontraron resultados',
        ar: '\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0646\u062A\u0627\u0626\u062C',
      },
      noData: {
        en: 'No data available',
        fr: 'Aucune donnée',
        de: 'Keine Daten',
        it: 'Nessun dato',
        es: 'Sin datos',
        ar: '\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A',
      },
      searchHint: {
        en: 'Try other keywords or categories',
        fr: 'Essayez d\'autres mots-cl\u00E9s ou cat\u00E9gories',
        de: 'Andere Begriffe oder Kategorien versuchen',
        it: 'Prova con altre parole chiave o categorie',
        es: 'Prueba con otras palabras clave o categor\u00EDas',
        ar: '\u062C\u0631\u0628 \u0643\u0644\u0645\u0627\u062A \u0645\u0641\u062A\u0627\u062D\u064A\u0629 \u0623\u0648 \u0641\u0626\u0627\u062A \u0623\u062E\u0631\u0649',
      },
      empty: {
        en: 'No content yet',
        fr: 'Aucun contenu pour le moment',
        de: 'Noch kein Inhalt',
        it: 'Nessun contenuto ancora',
        es: 'Sin contenido a\u00FAn',
        ar: '\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u062D\u062A\u0648\u0649 \u0628\u0639\u062F',
      },
      emptyHint: {
        en: 'Be the first to upload',
        fr: 'Soyez le premier \u00E0 t\u00E9l\u00E9charger',
        de: 'Sei der Erste, der hochl\u00E4dt',
        it: 'Sii il primo a caricare',
        es: 'S\u00E9 el primero en subir',
        ar: '\u0643\u0646 \u0623\u0648\u0644 \u0645\u0627 \u064A\u062A\u0631\u0627\u0642',
      },
      error: {
        en: 'An error occurred',
        fr: 'Une erreur s\'est produite',
        de: 'Ein Fehler ist aufgetreten',
        it: 'Si \u00E8 verificato un errore',
        es: 'Ocurri\u00F3 un error',
        ar: '\u062D\u062F\u062B \u062E\u0637\u0623',
      },
      loading: {
        en: 'Loading...',
        fr: 'Chargement...',
        de: 'Laden...',
        it: 'Caricamento...',
        es: 'Cargando...',
        ar: '\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...',
      },
      loadFailedTitle: {
        en: 'Load failed',
        fr: '\u00C9chec du chargement',
        de: 'Laden fehlgeschlagen',
        it: 'Caricamento fallito',
        es: 'Error al cargar',
        ar: '\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0645\u064A\u0644',
      },
      browserNotSupported: {
        en: 'Your browser does not support video playback',
        fr: 'Votre navigateur ne supporte pas la lecture vid\u00E9o',
        de: 'Ihr Browser unterst\u00FCtzt keine Video-Wiedergabe',
        it: 'Il tuo browser non supporta la riproduzione video',
        es: 'Tu navegador no soporta reproducci\u00F3n de video',
        ar: '\u0645\u062A\u0635\u0641\u062D \u0627\u0644\u0623\u0645 \u0644\u0627 \u064A\u062F\u0639\u0645 \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0641\u064A\u062F\u064A\u0648',
      },
      noPreview: {
        en: 'No preview available',
        fr: 'Aper\u00E7u non disponible',
        de: 'Keine Vorschau verf\u00FCgbar',
        it: 'Nessuna anteprima disponibile',
        es: 'Vista previa no disponible',
        ar: '\u0644\u0627 \u062A\u062C\u0648\u064A\u062F \u0645\u0639\u0627\u064A\u0646\u0629',
      },
      copied: {
        en: 'Copied to clipboard',
        fr: 'Copi\u00E9 dans le presse-papiers',
        de: 'In Zwischenablage kopiert',
        it: 'Copiato negli appunti',
        es: 'Copiado al portapapeles',
        ar: '\u062A\u0645 \u0627\u0644\u0646\u0633\u062E \u0625\u0644\u0649 \u0627\u0644\u0645\u0644\u062D\u0642',
      },
      downloadFile: {
        en: 'Download file',
        fr: 'T\u00E9l\u00E9charger le fichier',
        de: 'Datei herunterladen',
        it: 'Scarica file',
        es: 'Descargar archivo',
        ar: '\u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0645\u0644\u0641',
      },
      loadMore: {
        en: 'Load more',
        fr: 'Charger plus',
        de: 'Mehr laden',
        it: 'Carica altro',
        es: 'Cargar m\u00E1s',
        ar: '\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0632\u064A\u062F',
      },
      backToList: {
        en: 'Back to list',
        fr: 'Retour \u00E0 la liste',
        de: 'Zurück zur Liste',
        it: 'Torna alla lista',
        es: 'Volver a la lista',
        ar: '\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0642\u0627\u0626\u0645\u0629',
      },
      fileUploadFailed: {
        en: 'Failed to upload file',
        fr: '\u00C9chec du t\u00E9l\u00E9chargement du fichier',
        de: 'Datei-Upload fehlgeschlagen',
        it: 'Caricamento file fallito',
        es: 'Error al subir el archivo',
        ar: '\u0641\u0634\u0644 \u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u0644\u0641',
      },
    },

    player: {
      unknownTitle: {
        en: 'Unknown title',
        fr: 'Titre inconnu',
        de: 'Unbekannter Titel',
        it: 'Titolo sconosciuto',
        es: 'T\u00EDtulo desconocido',
        ar: '\u0639\u0646\u0648\u0627\u0646 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641',
      },
      loadingTitle: {
        en: 'Loading...',
        fr: 'Chargement...',
        de: 'Laden...',
        it: 'Caricamento...',
        es: 'Cargando...',
        ar: '\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...',
      },
      views: {
        en: 'views',
        fr: 'vues',
        de: 'Aufrufe',
        it: 'visualizzazioni',
        es: 'vistas',
        ar: '\u0645\u0634\u0627\u0647\u062F\u0627\u062A',
      },
      videos: {
        en: 'videos',
        fr: 'vid\u00E9os',
        de: 'Videos',
        it: 'video',
        es: 'videos',
        ar: '\u0641\u064A\u062F\u064A\u0648\u0647\u0627\u062A',
      },
      unknownCreator: {
        en: 'Unknown Creator',
        fr: 'Cr\u00E9ateur inconnu',
        de: 'Unbekannter Ersteller',
        it: 'Creatore sconosciuto',
        es: 'Creador desconocido',
        ar: '\u0645\u062E\u0644\u0642 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641',
      },
      creator: {
        en: 'Creator',
        fr: 'Cr\u00E9ateur',
        de: 'Ersteller',
        it: 'Creatore',
        es: 'Creador',
        ar: '\u0627\u0644\u0645\u062E\u0644\u0642',
      },
      download: {
        en: 'Download file',
        fr: 'T\u00E9l\u00E9charger',
        de: 'Herunterladen',
        it: 'Scarica',
        es: 'Descargar',
        ar: '\u062A\u0646\u0632\u064A\u0644',
      },
      noPreview: {
        en: 'No preview available',
        fr: 'Aper\u00E7u non disponible',
        de: 'Keine Vorschau verf\u00FCgbar',
        it: 'Nessuna anteprima disponibile',
        es: 'Vista previa no disponible',
        ar: '\u0644\u0627 \u062A\u062C\u0648\u064A\u062F \u0645\u0639\u0627\u064A\u0646\u0629',
      },
      season: { en: 'Season', fr: 'Saison', de: 'Staffel', it: 'Stagione', es: 'Temporada', ar: '\u0645\u0648\u0633\u0645' },
      episodes: { en: 'Episodes', fr: '\u00C9pisodes', de: 'Folgen', it: 'Episodi', es: 'Episodios', ar: '\u0623\u062D\u0648\u0627\u0644' },
      rating: { en: 'Rating', fr: 'Note', de: 'Bewertung', it: 'Valutazione', es: 'Clasificaci\u00F3n', ar: '\u062A\u0635\u0646\u064A\u0641' },
      status: { ongoing: { en: 'Ongoing', fr: 'En cours', de: 'L\u00E4uft', it: 'In corso', es: 'En curso', ar: '\u0645\u0633\u062A\u0645\u0631' }, completed: { en: 'Completed', fr: 'Termin\u00E9', de: 'Beendet', it: 'Completato', es: 'Completado', ar: '\u0645\u062A\u0645' }, hiatus: { en: 'Hiatus', fr: 'Pause', de: 'Pause', it: 'Pausa', es: 'Pausa', ar: '\u0645\u0639\u0644\u0642' } },
    },

    timeAgo: {
      justNow:      { en: 'just now',      fr: '\u00E0 l\'instant',        de: 'gerade eben',      it: 'proprio ora',      es: 'ahora mismo',       ar: '\u0627\u0644\u0622\u0646' },
      minutesAgo:   { en: '{{n}} min ago', fr: 'il y a {{n}} min',       de: 'vor {{n}} Min',    it: '{{n}} min fa',     es: 'hace {{n}} min',    ar: '\u0645\u0646\u0630 {{n}} \u062F\u0642' },
      hoursAgo:     { en: '{{n}}h ago',    fr: 'il y a {{n}}h',          de: 'vor {{n}}h',       it: '{{n}}h fa',        es: 'hace {{n}}h',       ar: '\u0645\u0646\u0630 {{n}} \u0633\u0627\u0639\u0629' },
      daysAgo:      { en: '{{n}}d ago',    fr: 'il y a {{n}}j',          de: 'vor {{n}}d',       it: '{{n}}g fa',        es: 'hace {{n}}d',       ar: '\u0645\u0646\u0630 {{n}} \u064A\u0648\u0645' },
      monthsAgo:    { en: '{{n}}mo ago',   fr: 'il y a {{n}}ms',         de: 'vor {{n}}Mon',     it: '{{n}}m fa',        es: 'hace {{n}}m',       ar: '\u0645\u0646\u0630 {{n}} \u0634\u0647\u0631' },
      yearsAgo:     { en: '{{n}}y ago',    fr: 'il y a {{n}}ans',        de: 'vor {{n}}J',       it: '{{n}}a fa',        es: 'hace {{n}}a',       ar: '\u0645\u0646\u0630 {{n}} \u0639\u0627\u0645' },
    },

    formatViews: {
      thousands:   { en: '{{n}}K', fr: '{{n}}K', de: '{{n}}K', it: '{{n}}K', es: '{{n}}K', ar: '{{n}}أ' },
      tenThousands:{ en: '{{n}}K', fr: '{{n}}K', de: '{{n}}K', it: '{{n}}K', es: '{{n}}K', ar: '{{n}}أ' },
      millions:    { en: '{{n}}M', fr: '{{n}}M', de: '{{n}}M', it: '{{n}}M', es: '{{n}}M', ar: '{{n}}م' },
    },

    interactions: {
      like:  { en: 'Like',  fr: 'J\'aime', de: 'Gef\u00E4llt mir', it: 'Mi piace', es: 'Me gusta', ar: '\u0623\u062D\u0628' },
      unlike:{ en: 'Liked', fr: 'Aim\u00E9', de: 'Gef\u00E4llt',   it: 'Mi piace', es: 'Me gusta', ar: '\u064A\u0639\u062C\u0628' },
      likes: { en: 'Like',  fr: 'J\'aime', de: 'Gef\u00E4llt mir', it: 'Mi piace', es: 'Me gusta', ar: '\u0623\u062D\u0628' },
      save:  { en: 'Save',  fr: 'Enregistrer', de: 'Speichern',  it: 'Salva', es: 'Guardar', ar: '\u062D\u0641\u0638' },
      saved: { en: 'Saved', fr: 'Enregistr\u00E9', de: 'Gespeichert', it: 'Salvato', es: 'Guardado', ar: '\u062A\u0645 \u062D\u0641\u0638\u0647' },
      saves: { en: 'Save',  fr: 'Enregistrer', de: 'Speichern',  it: 'Salva', es: 'Guardar', ar: '\u062D\u0641\u0638' },
      share: { en: 'Share',  fr: 'Partager',   de: 'Teilen',     it: 'Condividi', es: 'Compartir', ar: '\u0645\u0634\u0627\u0631\u0643\u0629' },
      follow:{ en: 'Follow', fr: 'Suivre',    de: 'Folgen',     it: 'Segui',   es: 'Seguir',  ar: '\u062A\u0628\u0639' },
      followed:{ en: 'Following', fr: 'Abonn\u00E9', de: 'Folge', it: 'Seguito', es: 'Siguiendo', ar: '\u062A\u0628\u0639' },
      comments: { en: 'Comments', fr: 'Commentaires', de: 'Kommentare', it: 'Commenti', es: 'Comentarios', ar: '\u062A\u0639\u0644\u064A\u0642\u0627\u062A' },
      addComment: { en: 'Add a comment...', fr: 'Ajouter un commentaire...', de: 'Kommentar hinzufügen...', it: 'Aggiungi un commento...', es: 'A\u00F1adir comentario...', ar: '\u0623\u0636\u0641 \u062A\u0639\u0644\u064A\u0642\u0627\u064B...' },
      post: { en: 'Post', fr: 'Publier', de: 'Senden', it: 'Pubblica', es: 'Publicar', ar: '\u0646\u0634\u0631' },
      replies: { en: 'Replies', fr: 'R\u00E9ponses', de: 'Antworten', it: 'Risposte', es: 'Respuestas', ar: '\u0627\u0644\u0623\u062C\u0648\u0628\u0629' },
      cancel: { en: 'Cancel', fr: 'Annuler', de: 'Abbrechen', it: 'Annulla', es: 'Cancelar', ar: '\u0625\u0644\u063A\u0627\u0621' },
      loadMore: { en: 'Load More', fr: 'Charger plus', de: 'Mehr laden', it: 'Carica altro', es: 'Cargar más', ar: '\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0632\u064A\u062F' },
      followers: { en: 'Followers', fr: 'Abonn\u00E9s', de: 'Follower', it: 'Follower', es: 'Seguidores', ar: '\u0627\u0644\u062C\u0645\u064A\u0639' },
      auditing: { en: 'Auditing…', fr: 'Vérification…', de: 'Prüfung…', it: 'Verifica…', es: 'Revisando…', ar: '\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u062D\u0635…' },
      commentRejected: { en: 'Your comment was rejected by content safety audit.', fr: 'Votre commentaire a été rejeté par le filtre de sécurité.', de: 'Ihr Kommentar wurde vom Sicherheitsfilter abgelehnt.', it: 'Il tuo commento è stato respinto dal filtro di sicurezza.', es: 'Tu comentario fue rechazado por el filtro de seguridad.', ar: '\u062A\u0645 \u0631\u0641\u0636 \u062A\u0639\u0644\u064A\u0642\u0643 \u0645\u0646 \u0642\u0628\u0644 \u0641\u062D\u0635 \u0627\u0644\u0623\u0645\u0627\u0646.' },
      commentFailed: { en: 'Failed to post comment.', fr: 'Échec de la publication.', de: 'Senden fehlgeschlagen.', it: 'Pubblicazione non riuscita.', es: 'Error al publicar.', ar: '\u0641\u0634\u0644 \u0646\u0634\u0631 \u0627\u0644\u062A\u0639\u0644\u064A\u0642.' },
    },

    collection: {
      myCollection: { en: 'My Collection', fr: 'Ma Collection', de: 'Meine Sammlung', it: 'La Mia Raccolta', es: 'Mi Colecci\u00F3n', ar: '\u0645\u062C\u0645\u0648\u0639\u062A\u064A' },
      newCollection: { en: 'New Collection', fr: 'Nouvelle Collection', de: 'Neue Sammlung', it: 'Nuova Raccolta', es: 'Nueva Colecci\u00F3n', ar: '\u0645\u062C\u0645\u0648\u0639\u0629 \u062C\u062F\u064A\u062F\u0629' },
      collectionName: { en: 'Collection Name', fr: 'Nom de la Collection', de: 'Sammlungsname', it: 'Nome Raccolta', es: 'Nombre Colecci\u00F3n', ar: '\u0627\u0633\u0645 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629' },
      enterCollectionName: { en: 'Enter collection name...', fr: 'Entrez le nom...', de: 'Namen eingeben...', it: 'Inserisci nome...', es: 'Nombre...', ar: '\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629...' },
      deleteCollection: { en: 'Delete Collection', fr: 'Supprimer', de: 'L\u00F6schen', it: 'Elimina', es: 'Eliminar', ar: '\u062D\u0630\u0641 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629' },
      confirmDelete: { en: 'Delete this collection?', fr: 'Supprimer ?', de: 'L\u00F6schen?', it: 'Eliminare?', es: '\u00BFEliminar?', ar: '\u062D\u0630\u0641 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629\u061F' },
      addToCollection: { en: 'Add to Collection', fr: 'Ajouter', de: 'Hinzuf\u00FCgen', it: 'Aggiungi', es: 'A\u00F1adir', ar: '\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629' },
      removeFromCollection: { en: 'Remove from Collection', fr: 'Retirer', de: 'Entfernen', it: 'Rimuovi', es: 'Eliminar', ar: '\u0625\u0632\u0627\u0644\u0629' },
      noCollections: { en: 'No collections yet', fr: 'Aucune collection', de: 'Noch keine Sammlungen', it: 'Nessuna raccolta', es: 'Sin colecciones', ar: '\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062C\u0645\u0648\u0639\u0627\u062A' },
      noItems: { en: 'This collection is empty', fr: 'Collection vide', de: 'Leer', it: 'Vuota', es: 'Vac\u00EDa', ar: '\u0647\u0630\u0647 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629 \u0641\u0627\u0631\u063A\u0629' },
      editName: { en: 'Edit Name', fr: 'Modifier le nom', de: 'Namen bearbeiten', it: 'Modifica Nome', es: 'Editar Nombre', ar: '\u062A\u062D\u0631\u064A\u0631 \u0627\u0644\u0627\u0633\u0645' },
      loading: { en: 'Loading...', fr: 'Chargement...', de: 'Laden...', it: 'Caricamento...', es: 'Cargando...', ar: '\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...' },
    },

    ads: {
      sponsored: { en: 'Sponsored', fr: 'Publipostage', de: 'Gesponsert', it: 'Sponsorizzato', es: 'Patrocinado', ar: '\u0631\u0639\u0627\u064A\u0629' },
      learnMore: { en: 'Learn More', fr: 'En savoir plus', de: 'Mehr erfahren', it: 'Scopri di pi\u00F9', es: 'Saber m\u00E1s', ar: '\u0627\u0644\u0645\u0632\u064A\u062F \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A' },
    },

    profile: {
      pageTitle:     { en: 'User Profile', fr: 'Profil Utilisateur', de: 'Benutzerprofil', it: 'Profilo Utente', es: 'Perfil de Usuario', ar: '\u0645\u0644\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645' },
      pageTitleShort:{ en: 'Profile', fr: 'Profil', de: 'Profil', it: 'Profilo', es: 'Perfil', ar: '\u0627\u0644\u0645\u0648\u0636\u0648\u0639' },
      notFound:      { en: 'User not found', fr: 'Utilisateur introuvable', de: 'Benutzer nicht gefunden', it: 'Utente non trovato', es: 'Usuario no encontrado', ar: '\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F' },
      loginRequired: { en: 'Please login to view this profile.', fr: 'Connectez-vous pour voir ce profil.', de: 'Bitte anmelden.', it: 'Effettua l\'accesso.', es: 'Inicia sesión.', ar: '\u0633\u062C\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0639\u0631\u0636 \u0647\u0630\u0627 \u0627\u0644\u0645\u0644\u0641.' },
      noContent:     { en: 'No content yet', fr: 'Pas encore de contenu', de: 'Noch kein Inhalt', it: 'Nessun contenuto', es: 'Sin contenido', ar: '\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u062D\u062A\u0648\u0649' },
      noHistory:     { en: 'No watch history yet', fr: 'Pas d\'historique', de: 'Noch kein Verlauf', it: 'Nessuna cronologia', es: 'Sin historial', ar: '\u0644\u0627 \u064A\u0648\u062C\u062F \u0633\u062C\u0644' },
      loadFailed:    { en: 'Failed to load', fr: 'Échec du chargement', de: 'Laden fehlgeschlagen', it: 'Caricamento fallito', es: 'Error al cargar', ar: '\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0645\u064A\u0644' },
      contentTab:    { en: 'Content', fr: 'Contenu', de: 'Inhalt', it: 'Contenuto', es: 'Contenido', ar: '\u0627\u0644\u0645\u062D\u062A\u0648\u0649' },
      historyTab:    { en: 'History', fr: 'Historique', de: 'Verlauf', it: 'Cronologia', es: 'Historial', ar: '\u0627\u0644\u0633\u062C\u0644' },
      followers:     { en: 'Followers', fr: 'Abonnés', de: 'Follower', it: 'Follower', es: 'Seguidores', ar: '\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0648\u0646' },
      following:     { en: 'Following', fr: 'Abonnements', de: 'Folge ich', it: 'Seguiti', es: 'Siguiendo', ar: '\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629' },
      joined:        { en: 'Joined', fr: 'Inscrit', de: 'Beigetreten', it: 'Iscritto', es: 'Se unió', ar: '\u0627\u0646\u0636\u0645' },
      follow:        { en: 'Follow', fr: 'Suivre', de: 'Folgen', it: 'Segui', es: 'Seguir', ar: '\u062A\u0628\u0639' },
      followed:      { en: 'Following', fr: 'Abonné', de: 'Folge ich', it: 'Seguito', es: 'Siguiendo', ar: '\u064A\u062A\u0628\u0639' },
      editBio:       { en: 'Edit bio', fr: 'Modifier bio', de: 'Bio bearbeiten', it: 'Modifica bio', es: 'Editar bio', ar: '\u062A\u062D\u0631\u064A\u0631 \u0627\u0644\u0646\u0628\u0630\u0629' },
      saveBio:       { en: 'Save', fr: 'Enregistrer', de: 'Speichern', it: 'Salva', es: 'Guardar', ar: '\u062D\u0641\u0638' },
      cancelBio:     { en: 'Cancel', fr: 'Annuler', de: 'Abbrechen', it: 'Annulla', es: 'Cancelar', ar: '\u0625\u0644\u063A\u0627\u0621' },
      bioSaved:      { en: 'Bio saved!', fr: 'Bio enregistrée !', de: 'Bio gespeichert!', it: 'Bio salvata!', es: '¡Bio guardada!', ar: '\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0646\u0628\u0630\u0629!' },
    },

    legal: {
      // ── Shared ──────────────────────────────────────────────────────────────
      footerRights:    { en: 'All rights reserved.', fr: 'Tous droits r\u00E9serv\u00E9s.', de: 'Alle Rechte vorbehalten.', it: 'Tutti i diritti riservati.', es: 'Todos los derechos reservados.', ar: '\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629.' },
      footerPrivacy:   { en: 'Privacy Policy', fr: 'Politique de confidentialit\u00E9', de: 'Datenschutzrichtlinie', it: 'Informativa sulla privacy', es: 'Pol\u00EDtica de privacidad', ar: '\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629' },
      footerTerms:     { en: 'Terms of Service', fr: "Conditions d'utilisation", de: 'Nutzungsbedingungen', it: 'Termini di servizio', es: 'T\u00E9rminos de servicio', ar: '\u0634\u0631\u0648\u0637 \u0627\u0644\u062E\u062F\u0645\u0629' },
      footerCookie:    { en: 'Cookie Policy', fr: 'Politique des cookies', de: 'Cookie-Richtlinie', it: 'Politica dei cookie', es: 'Pol\u00EDtica de cookies', ar: '\u0633\u064A\u0627\u0633\u0629 \u0643\u0648\u0643\u064A\u0632' },
      updatedLabel:    { en: 'Last updated: {date}', fr: 'Derni\u00E8re mise \u00E0 jour : {date}', de: 'Zuletzt aktualisiert: {date}', it: 'Ultimo aggiornamento: {date}', es: '\u00DAltima actualizaci\u00F3n: {date}', ar: '\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B: {date}' },
      backHome:        { en: 'Back to Home', fr: "Retour \u00E0 l'accueil", de: 'Zur\u00FCck zur Startseite', it: 'Torna alla home', es: 'Volver al inicio', ar: '\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0631\u0626\u064A\u0633\u064A\u0629' },

      // ── Privacy Policy ──────────────────────────────────────────────────────
      privacyTitle:    { en: 'Privacy Policy', fr: 'Politique de confidentialit\u00E9', de: 'Datenschutzrichtlinie', it: 'Informativa sulla privacy', es: 'Pol\u00EDtica de privacidad', ar: '\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629' },
      privacyIntro:    { en: 'This Privacy Policy explains how Video ("we", "us", or "our") collects, uses, and protects your personal information when you use our platform.', fr: "Cette politique de confidentialit\u00E9 explique comment Video (\u00AB\u00A0nous\u00A0\u00BB) collecte, utilise et prot\u00E8ge vos donn\u00E9es personnelles lorsque vous utilisez notre plateforme.", de: 'Diese Datenschutzrichtlinie erkl\u00E4rt, wie Video (\u00ABwir\u00BB) Ihre pers\u00F6nlichen Daten erhebt, nutzt und sch\u00FCtzt, wenn Sie unsere Plattform verwenden.', it: 'Questa informativa sulla privacy spiega come Video ("noi") raccoglie, utilizza e protegge i tuoi dati personali quando utilizzi la nostra piattaforma.', es: 'Esta pol\u00EDtica de privacidad explica c\u00F3mo Video ("nosotros") recopila, utiliza y protege tu informaci\u00F3n personal cuando usas nuestra plataforma.', ar: '\u062A\u0648\u0636\u062D \u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629 \u0643\u064A\u0641 \u064A\u062C\u0645\u0639 Video ("\u0646\u062D\u0646") \u0628\u064A\u0627\u0646\u0627\u062A\u0643 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0648\u064A\u0633\u062A\u062E\u062F\u0645\u0647\u0627 \u0648\u064A\u062D\u0645\u064A\u0647\u0627 \u0639\u0646\u062F \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0643 \u0644\u0645\u0646\u0635\u062A\u0646\u0627.' },
      privacyS1Title:  { en: '1. Information We Collect', fr: '1. Informations que nous collectons', de: '1. Informationen, die wir erheben', it: '1. Informazioni che raccogliamo', es: '1. Informaci\u00F3n que recopilamos', ar: '1. \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062A\u064A \u0646\u062C\u0645\u0639\u0647\u0627' },
      privacyS1Body:   { en: 'We collect information you provide directly, such as your name, email, and profile picture when you register via OAuth. We also automatically collect usage data including watch history, preferences, and device information.', fr: "Nous collectons les informations que vous fournissez directement, telles que votre nom, votre e-mail et votre photo de profil lors de votre inscription via OAuth. Nous collectons \u00E9galement automatiquement des donn\u00E9es d'utilisation, y compris l'historique de visionnage, les pr\u00E9f\u00E9rences et les informations sur l'appareil.", de: 'Wir erheben Informationen, die Sie direkt bereitstellen, wie Name, E-Mail und Profilbild bei der Registrierung \u00FCber OAuth. Wir erfassen automatisch auch Nutzungsdaten wie Wiedergabeverlauf, Einstellungen und Ger\u00E4teinformationen.', it: 'Raccogliamo le informazioni che fornisci direttamente, come nome, email e foto del profilo quando ti registri tramite OAuth. Raccogliamo anche automaticamente dati di utilizzo inclusi cronologia di visualizzazione, preferenze e informazioni sul dispositivo.', es: 'Recopilamos la informaci\u00F3n que proporcionas directamente, como tu nombre, correo electr\u00F3nico y foto de perfil al registrarte v\u00EDa OAuth. Tambi\u00E9n recopilamos autom\u00E1ticamente datos de uso, incluidos el historial de visualizaci\u00F3n, las preferencias y la informaci\u00F3n del dispositivo.', ar: '\u0646\u062C\u0645\u0639 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0642\u062F\u0645\u0647\u0627 \u0645\u0628\u0627\u0634\u0631\u0629\u060C \u0645\u062B\u0644 \u0627\u0633\u0645\u0643 \u0648\u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0648\u0635\u0648\u0631\u0629 \u0645\u0644\u0641\u0643 \u0627\u0644\u0634\u062E\u0635\u064A \u0639\u0646\u062F \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0639\u0628\u0631 OAuth. \u0643\u0645\u0627 \u0646\u062C\u0645\u0639 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0628\u0645\u0627 \u0641\u064A \u0630\u0644\u0643 \u0633\u062C\u0644 \u0627\u0644\u0645\u0634\u0627\u0647\u062F\u0629 \u0648\u0627\u0644\u062A\u0641\u0636\u064A\u0644\u0627\u062A \u0648\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632.' },
      privacyS2Title:  { en: '2. How We Use Your Information', fr: "2. Comment nous utilisons vos informations", de: '2. Wie wir Ihre Informationen verwenden', it: '2. Come utilizziamo le tue informazioni', es: '2. C\u00F3mo usamos tu informaci\u00F3n', ar: '2. \u0643\u064A\u0641 \u0646\u0633\u062A\u062E\u062F\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A\u0643' },
      privacyS2Body:   { en: 'Your information is used to provide and improve our services, personalize content recommendations, communicate with you about updates, ensure platform security, and comply with legal obligations.', fr: 'Vos informations sont utilis\u00E9es pour fournir et am\u00E9liorer nos services, personnaliser les recommandations de contenu, communiquer avec vous sur les mises \u00E0 jour, assurer la s\u00E9curit\u00E9 de la plateforme et respecter les obligations l\u00E9gales.', de: 'Ihre Informationen werden verwendet, um unsere Dienste bereitzustellen und zu verbessern, Inhaltsempfehlungen zu personalisieren, Sie \u00FCber Updates zu informieren, die Plattformsicherheit zu gew\u00E4hrleisten und gesetzliche Pflichten zu erf\u00FCllen.', it: 'Le tue informazioni vengono utilizzate per fornire e migliorare i nostri servizi, personalizzare le raccomandazioni dei contenuti, comunicarti gli aggiornamenti, garantire la sicurezza della piattaforma e rispettare gli obblighi di legge.', es: 'Tu informaci\u00F3n se utiliza para proporcionar y mejorar nuestros servicios, personalizar las recomendaciones de contenido, comunicarte actualizaciones, garantizar la seguridad de la plataforma y cumplir con las obligaciones legales.', ar: '\u0646\u0633\u062A\u062E\u062F\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A\u0643 \u0644\u062A\u0642\u062F\u064A\u0645 \u062E\u062F\u0645\u0627\u062A\u0646\u0627 \u0648\u062A\u062D\u0633\u064A\u0646\u0647\u0627\u060C \u0648\u062A\u062E\u0635\u064A\u0635 \u062A\u0648\u0635\u064A\u0627\u062A \u0627\u0644\u0645\u062D\u062A\u0648\u0649\u060C \u0648\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0628\u0634\u0623\u0646 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A\u060C \u0648\u0636\u0645\u0627\u0646 \u0623\u0645\u0646 \u0627\u0644\u0645\u0646\u0635\u0629\u060C \u0648\u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0644\u0648\u0627\u062C\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629.' },
      privacyS3Title:  { en: '3. Data Storage and Security', fr: '3. Stockage et s\u00E9curit\u00E9 des donn\u00E9es', de: '3. Datenspeicherung und -sicherheit', it: '3. Archiviazione e sicurezza dei dati', es: '3. Almacenamiento y seguridad de datos', ar: '3. \u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0623\u0645\u0646\u0647\u0627' },
      privacyS3Body:   { en: 'Your data is stored on secure Cloudflare infrastructure with industry-standard encryption. Sessions are managed server-side using hashed tokens. We retain your data for as long as your account is active or as needed to provide services.', fr: 'Vos donn\u00E9es sont stock\u00E9es sur l\'infrastructure s\u00E9curis\u00E9e de Cloudflare avec un chiffrement standard. Les sessions sont g\u00E9r\u00E9es c\u00F4t\u00E9 serveur \u00E0 l\'aide de jetons hach\u00E9s. Nous conservons vos donn\u00E9es tant que votre compte est actif ou selon les besoins du service.', de: 'Ihre Daten werden auf sicherer Cloudflare-Infrastruktur mit branchen\u00FCblicher Verschl\u00FCsselung gespeichert. Sessions werden serverseitig mit gehashten Tokens verwaltet. Wir speichern Ihre Daten, solange Ihr Konto aktiv ist oder zur Dienstbereitstellung erforderlich.', it: 'I tuoi dati sono archiviati su infrastruttura Cloudflare sicura con crittografia standard. Le sessioni sono gestite lato server utilizzando token hash. Conserviamo i tuoi dati finch\u00E9 il tuo account \u00E8 attivo o secondo le necessit\u00E0 del servizio.', es: 'Tus datos se almacenan en la infraestructura segura de Cloudflare con cifrado est\u00E1ndar. Las sesiones se gestionan en el servidor mediante tokens hash. Conservamos tus datos mientras tu cuenta est\u00E9 activa o seg\u00FAn sea necesario para proporcionar los servicios.', ar: '\u062A\u064F\u062E\u0632\u0646 \u0628\u064A\u0627\u0646\u0627\u062A\u0643 \u0639\u0644\u0649 \u0628\u0646\u064A\u0629 \u062A\u0628\u062A\u064A\u0629 \u0622\u0645\u0646\u0629 \u0645\u0646 Cloudflare \u0645\u0639 \u062A\u0634\u0641\u064A\u0631 \u0642\u064A\u0627\u0633\u064A. \u062A\u064F\u062F\u0627\u0631 \u0627\u0644\u062C\u0644\u0633\u0627\u062A \u0639\u0644\u0649 \u062C\u0627\u0646\u0628 \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0631\u0645\u0648\u0632 \u0645\u062C\u062A\u0632\u0623\u0629. \u0646\u062D\u062A\u0641\u0638 \u0628\u0628\u064A\u0627\u0646\u0627\u062A\u0643 \u0637\u0627\u0644\u0645\u0627 \u0628\u0642\u064A \u062D\u0633\u0627\u0628\u0643 \u0646\u0634\u0637\u064B\u0627 \u0623\u0648 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u062A\u0642\u062F\u064A\u0645 \u0627\u0644\u062E\u062F\u0645\u0627\u062A.' },
      privacyS4Title:  { en: '4. Third-Party Services', fr: '4. Services tiers', de: '4. Drittanbieter-Dienste', it: '4. Servizi di terze parti', es: '4. Servicios de terceros', ar: '4. \u062E\u062F\u0645\u0627\u062A \u0623\u0637\u0631\u0627\u0641 \u062B\u0627\u0644\u062B\u0629' },
      privacyS4Body:   { en: 'We use Valcorner for OAuth authentication and Cloudflare for hosting and content delivery. These providers process minimal data necessary to deliver their services and operate under their own privacy policies.', fr: 'Nous utilisons Valcorner pour l\'authentification OAuth et Cloudflare pour l\'h\u00E9bergement et la diffusion de contenu. Ces prestataires traitent le minimum de donn\u00E9es n\u00E9cessaires \u00E0 leurs services et disposent de leur propre politique de confidentialit\u00E9.', de: 'Wir nutzen Valcorner f\u00FCr die OAuth-Authentifizierung und Cloudflare f\u00FCr Hosting und Content Delivery. Diese Anbieter verarbeiten nur die minimal n\u00F6tigen Daten und haben eigene Datenschutzrichtlinien.', it: 'Utilizziamo Valcorner per l\'autenticazione OAuth e Cloudflare per hosting e distribuzione dei contenuti. Questi provider elaborano i dati minimi necessari per i loro servizi e operano con proprie informative sulla privacy.', es: 'Utilizamos Valcorner para la autenticaci\u00F3n OAuth y Cloudflare para alojamiento y distribuci\u00F3n de contenido. Estos proveedores procesan los datos m\u00EDnimos necesarios para sus servicios y operan bajo sus propias pol\u00EDticas de privacidad.', ar: '\u0646\u0633\u062A\u062E\u062F\u0645 Valcorner \u0644\u0645\u0635\u0627\u062F\u0642\u0629 OAuth \u0648 Cloudflare \u0644\u0644\u0627\u0633\u062A\u0636\u0627\u0641\u0629 \u0648\u062A\u0642\u062F\u064A\u0645 \u0627\u0644\u0645\u062D\u062A\u0648\u0649. \u0647\u0624\u0644\u0627\u0621 \u064A\u0639\u0627\u0644\u062C\u0648\u0646 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 \u0645\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0644\u0627\u0632\u0645\u0629 \u0644\u062E\u062F\u0645\u0627\u062A\u0647\u0645 \u0648\u064A\u0639\u0645\u0644\u0648\u0646 \u0628\u0646\u0627\u0621\u064B\u0627 \u0639\u0644\u0649 \u0633\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0647\u0645.' },
      privacyS5Title:  { en: '5. Your Rights', fr: '5. Vos droits', de: '5. Ihre Rechte', it: '5. I tuoi diritti', es: '5. Tus derechos', ar: '5. \u062D\u0642\u0648\u0642\u0643' },
      privacyS5Body:   { en: 'You have the right to access, correct, or delete your personal data. You may also object to certain processing or request data portability. To exercise these rights, contact us through the platform.', fr: 'Vous avez le droit d\'acc\u00E9der, de corriger ou de supprimer vos donn\u00E9es personnelles. Vous pouvez \u00E9galement vous opposer \u00E0 certains traitements ou demander la portabilit\u00E9 des donn\u00E9es. Pour exercer ces droits, contactez-nous via la plateforme.', de: 'Sie haben das Recht, auf Ihre pers\u00F6nlichen Daten zuzugreifen, diese zu korrigieren oder zu l\u00F6schen. Sie k\u00F6nnen auch bestimmter Verarbeitung widersprechen oder Daten\u00FCbertragbarkeit beantragen. Kontaktieren Sie uns \u00FCber die Plattform, um diese Rechte auszu\u00FCben.', it: 'Hai il diritto di accedere, correggere o eliminare i tuoi dati personali. Puoi anche opporti a determinati trattamenti o richiedere la portabilit\u00E0 dei dati. Per esercitare questi diritti, contattaci tramite la piattaforma.', es: 'Tienes derecho a acceder, corregir o eliminar tus datos personales. Tambi\u00E9n puedes oponerte a ciertos tratamientos o solicitar la portabilidad de datos. Para ejercer estos derechos, cont\u00E1ctanos a trav\u00E9s de la plataforma.', ar: '\u0644\u062F\u064A\u0643 \u062D\u0642 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A\u0643 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0648\u062A\u0635\u062D\u064A\u062D\u0647\u0627 \u0623\u0648 \u062D\u0630\u0641\u0647\u0627. \u0643\u0645\u0627 \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0627\u0639\u062A\u0631\u0627\u0636 \u0639\u0644\u0649 \u0645\u0639\u0627\u0644\u062C\u0627\u062A \u0645\u0639\u064A\u0646\u0629 \u0623\u0648 \u0637\u0644\u0628 \u0646\u0642\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A. \u0644\u0645\u0645\u0627\u0631\u0633\u0629 \u0647\u0630\u0647 \u0627\u0644\u062D\u0642\u0648\u0642\u060C \u0627\u062A\u0635\u0644 \u0628\u0646\u0627 \u0639\u0628\u0631 \u0627\u0644\u0645\u0646\u0635\u0629.' },
      privacyS6Title:  { en: '6. Contact Us', fr: '6. Nous contacter', de: '6. Kontakt aufnehmen', it: '6. Contattaci', es: '6. Cont\u00E1ctanos', ar: '6. \u0627\u062A\u0635\u0644 \u0628\u0646\u0627' },
      privacyS6Body:   { en: 'If you have questions about this Privacy Policy, please contact our Data Protection Officer at privacy@video.example. For other support requests use the platform\u2019s support channels.', fr: "Si vous avez des questions sur cette politique, contactez notre DPO \u00E0 privacy@video.example. Pour les autres demandes, utilisez les canaux de support de la plateforme.", de: 'Bei Fragen wenden Sie sich an unseren Datenschutzbeauftragten unter privacy@video.example. Andere Anfragen \u00FCber die Support-Kan\u00E4le.', it: 'Per domande contatta il nostro responsabile della protezione dei dati a privacy@video.example. Per altre richieste usa i canali di supporto.', es: 'Si tienes preguntas, contacta a nuestro responsable de protecci\u00F3n de datos en privacy@video.example. Otras consultas por canales de soporte.', ar: '\u0625\u0630\u0627 \u0643\u0627\u0646\u062A \u0644\u062F\u064A\u0643 \u0623\u0633\u0626\u0644\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0645\u0633\u0624\u0648\u0644 \u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0639\u0644\u0649 privacy@video.example\u060C \u0648\u0644\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0623\u062E\u0631\u0649 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0642\u0646\u0648\u0627\u062A \u0627\u0644\u062F\u0639\u0645.' },
      privacyS7Title:  { en: '7. Legal Basis for Processing (GDPR / UK GDPR)', fr: '7. Base l\u00E9gale du traitement (RGPD / RGPD Royaume-Uni)', de: '7. Rechtsgrundlagen der Verarbeitung (DSGVO)', it: '7. Base giuridica del trattamento (GDPR)', es: '7. Base legal del tratamiento (RGPD)', ar: '7. \u0627\u0644\u0623\u0633\u0627\u0633 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0642\u0627\u0646\u0648\u0646 \u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u0627\u0645)' },
      privacyS7Body:   { en: 'When EU or UK data protection law applies, we process personal data under the following legal bases: (a) your explicit consent for optional features (e.g., analytics preferences); (b) performance of our contract with you to deliver the video platform; (c) compliance with a legal obligation (e.g., tax, accounting); (d) our legitimate interests (security, fraud prevention, service improvement) where such interests do not override your rights and freedoms. You may withdraw consent at any time via your account settings.', fr: "Lorsque le RGPD s'applique, nous traitons les donn\u00E9es sur les bases suivantes : (a) votre consentement explicite pour les options facultatives ; (b) l'ex\u00E9cution du contrat pour fournir la plateforme ; (c) le respect d'une obligation l\u00E9gale ; (d) nos int\u00E9r\u00EAts l\u00E9gitimes (s\u00E9curit\u00E9, antifraude, am\u00E9lioration) dans la mesure o\u00F9 ils ne pr\u00E9valent pas sur vos droits. Vous pouvez retirer votre consentement via les param\u00E8tres du compte.", de: 'Bei Geltung der DSGVO verarbeiten wir personenbezogene Daten auf folgenden Rechtsgrundlagen: (a) Ihre ausdr\u00FCckliche Einwilligung f\u00FCr optionale Funktionen; (b) Vertragserf\u00FCllung zur Bereitstellung der Plattform; (c) Erf\u00FCllung rechtlicher Verpflichtungen; (d) unsere berechtigten Interessen (Sicherheit, Betrugsschutz, Verbesserung), soweit diese Ihre Rechte nicht \u00FCberwiegen. Einwilligungen k\u00F6nnen Sie jederzeit in den Kontoeinstellungen widerrufen.', it: "Quando si applica il GDPR, trattiamo i dati sulle seguenti basi: (a) consenso esplicito per funzioni opzionali; (b) esecuzione del contratto per fornire la piattaforma; (c) adempimento di obbligo legale; (d) nostri legittimi interessi (sicurezza, antifrode, miglioramento) ove non prevalgano sui tuoi diritti. Puoi revocare il consenso dalle impostazioni account.", es: 'Cuando aplica el RGPD, procesamos datos con estas bases: (a) tu consentimiento expl\u00EDcito para funciones opcionales; (b) ejecuci\u00F3n del contrato para la plataforma; (c) cumplimiento de obligaci\u00F3n legal; (d) nuestros intereses leg\u00EDtimos (seguridad, antifraude, mejora) siempre que no prevalezcan sobre tus derechos. Puedes revocar el consentimiento en ajustes de cuenta.', ar: '\u0639\u0646\u062F \u0637\u0628\u064A\u0642 \u0642\u0627\u0646\u0648\u0646 \u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0648\u0631\u0648\u0628\u064A\u060C \u0646\u0639\u0627\u0644\u062C \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0627\u0644\u0623\u0633\u0627\u0633 \u0627\u0644\u062A\u0627\u0644\u064A\u0629: (\u0623) \u0645\u0648\u0627\u0641\u0642\u062A\u0643 \u0627\u0644\u0635\u0631\u064A\u062D \u0644\u0644\u0645\u064A\u0632\u0627\u062A \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0629\u061B (\u0628) \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0642\u062F \u0644\u062A\u0642\u062F\u064A\u0645 \u0627\u0644\u0645\u0646\u0635\u0629\u061B (\u062C) \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0627\u0644\u0648\u0627\u062C\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629\u061B (\u062F) \u0645\u0635\u0627\u0644\u062D\u0646\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u0629 (\u0627\u0644\u0623\u0645\u0646\u060C \u0645\u0643\u0627\u0641\u062D\u0629 \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0644\u060C \u0627\u0644\u062A\u062D\u0633\u064A\u0646) \u0645\u0627 \u0644\u0645 \u062A\u062A\u063A\u0644\u0628 \u0639\u0644\u0649 \u062D\u0642\u0648\u0642\u0643. \u064A\u0645\u0643\u0646\u0643 \u0633\u062D\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0641\u064A \u0623\u064A \u0648\u0642\u062A \u0639\u0628\u0631 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062D\u0633\u0627\u0628.' },
      privacyS8Title:  { en: '8. Cross-Border Data Transfers', fr: '8. Transferts internationaux de donn\u00E9es', de: '8. \u00DCbermittlungen in Drittl\u00E4nder', it: '8. Trasferimenti internazionali di dati', es: '8. Transferencias internacionales de datos', ar: '8. \u0627\u0644\u0646\u0642\u0644\u0627\u062A \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0639\u0628\u0631 \u0627\u0644\u062D\u062F\u0648\u062F' },
      privacyS8Body:   { en: 'Your personal data is hosted on Cloudflare\u2019s global infrastructure and may be transferred to and processed in countries outside your residence, including jurisdictions that may not have equivalent data protection laws. Where EU/EEA data is transferred outside the adequacy list, we rely on Standard Contractual Clauses (SCCs) or equivalent legal mechanisms, and maintain technical and organizational measures to protect your data.', fr: "Vos donn\u00E9es sont h\u00E9berg\u00E9es sur l'infrastructure Cloudflare et peuvent \u00EAtre transf\u00E9r\u00E9es dans des pays hors de votre r\u00E9sidence. Pour les donn\u00E9es EU/EEE hors de la liste d'ad\u00E9quation, nous utilisons les clauses contractuelles types (CCT) ou m\u00E9canismes juridiques \u00E9quivalents, accompagn\u00E9s de mesures techniques et organisationnelles.", de: 'Ihre Daten werden auf der weltweiten Infrastruktur von Cloudflare gehostet und k\u00F6nnen in L\u00E4nder \u00FCbertragen werden, die kein \u00E4quivalentes Datenschutzniveau haben. F\u00FCr Daten aus der EU/EWR, die in unad\u00E4quate Drittl\u00E4nder \u00FCbermittelt werden, setzen wir Standardvertragsklauseln (SVK) oder gleichwertige Mechanismen plus technische und organisatorische Ma\u00DFnahmen ein.', it: "I tuoi dati sono ospitati sull'infrastruttura Cloudflare e possono essere trasferiti in paesi extra UE/EEA. Per trasferimenti fuori dall'elenco di adeguatezza, usiamo Clausole Contrattuali Standard (SCC) o meccanismi equivalenti e manteniamo misure tecniche e organizzative di protezione.", es: 'Tus datos est\u00E1n alojados en la infraestructura global de Cloudflare y pueden transferirse a pa\u00EDses fuera de tu residencia. Para datos UE/EEE fuera de la lista de adecuaci\u00F3n, usamos Cl\u00E1usulas Contractuales Est\u00E1ndar (SCC) o mecanismos equivalentes junto con medidas t\u00E9cnicas y organizativas.', ar: '\u0628\u064A\u0627\u0646\u0627\u062A\u0643 \u0645\u064F\u0633\u062A\u0636\u0627\u0641\u0629 \u0639\u0644\u0649 \u0628\u0646\u064A\u0629 Cloudflare \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0648\u0642\u062F \u062A\u064F\u0646\u0642\u0644 \u0625\u0644\u0649 \u0628\u0644\u062F\u0627\u0646 \u062E\u0627\u0631\u062C \u0645\u0648\u0637\u0646\u0643. \u0644\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0648\u0631\u0648\u0628\u064A\u0629 \u0627\u0644\u0645\u0646\u0642\u0648\u0644\u0629 \u062E\u0627\u0631\u062C \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u062F\u0648\u0627\u0644\u060C \u0646\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0639\u0627\u0642\u062F\u064A\u0629 \u0627\u0644\u0645\u0639\u064A\u0627\u0631\u064A\u0629 (\u0628\u0646\u0648\u062F SCC) \u0623\u0648 \u0622\u0644\u064A\u0627\u062A \u0645\u0643\u0627\u0641\u0626\u0629 \u0645\u0639 \u062A\u062F\u0628\u064A\u0631 \u0645\u0642\u0627\u064A\u064A\u0633 \u062A\u0642\u0646\u064A\u0629 \u0648\u062A\u0646\u0638\u064A\u0645\u064A\u0629.' },
      privacyS9Title:  { en: '9. Breach Notification & Retention', fr: '9. Notification de violation et conservation', de: '9. Verletzungsbenachrichtigung und Aufbewahrung', it: '9. Notifica di violazione e conservazione', es: '9. Notificaci\u00F3n de incumplimiento y retenci\u00F3n', ar: '9. \u0625\u0634\u0639\u0627\u0631 \u0627\u0644\u0627\u0646\u062A\u0647\u0643 \u0648\u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638' },
      privacyS9Body:   { en: 'We implement administrative, technical, and physical safeguards to protect your data. In the event of a personal data breach that is likely to result in a high risk to your rights and freedoms, we will notify you and the relevant supervisory authority within the timeframes required by applicable law (typically 72 hours under the GDPR). We retain personal data only as long as necessary: account data persists while your account is active; session and security logs are retained for 12 months; watch history can be deleted on demand via your settings.', fr: 'Nous mettons en place des mesures administratives, techniques et physiques. En cas de violation susceptible de pr\u00E9senter un risque \u00E9lev\u00E9, nous vous notifierons ainsi qu\u2019\u00E0 l\u2019autorit\u00E9 de contr\u00F4le comp\u00E9tente dans les d\u00E9lais l\u00E9gaux (g\u00E9n\u00E9ralement 72 h sous RGPD). Nous conservons les donn\u00E9es uniquement le temps n\u00E9cessaire : donn\u00E9es de compte tant que le compte est actif ; journaux de s\u00E9curit\u00E9 12 mois ; historique de visualisation supprimable \u00E0 la demande.', de: 'Wir setzen administrative, technische und physische Schutzma\u00DFnahmen ein. Bei einer personenbezogenen Datenpanne mit hohem Risiko f\u00FCr Ihre Rechte benachrichtigen wir Sie und die zust\u00E4ndige Aufsichtsbeh\u00F6rde innerhalb der gesetzlichen Fristen (DSGVO: in der Regel 72 Stunden). Aufbewahrung: Kontodaten w\u00E4hrend der Kontolaufzeit; Sicherheits- und Session-Logs 12 Monate; Wiedergabeverlauf auf Anfrage l\u00F6schbar.', it: 'Applichiamo misure amministrative, tecniche e fisiche. In caso di violazione con rischio elevato per i tuoi diritti, ti notificheremo assieme all\u2019autorit\u00E0 competente entro i termini di legge (GDPR: di regola 72 ore). Conserviamo i dati solo il tempo necessario: dati account mentre \u00E8 attivo; log di sicurezza 12 mesi; cronologia visualizzazioni cancellabile su richiesta.', es: 'Aplicamos medidas administrativas, t\u00E9cnicas y f\u00EDsicas. En caso de brecha con riesgo elevado para tus derechos, te notificaremos a ti y a la autoridad competente en los plazos legales (RGPD: 72 h regla general). Retenci\u00F3n: datos de cuenta mientras est\u00E9 activo; logs de seguridad 12 meses; historial de visualizaci\u00F3n borrable a petici\u00F3n.', ar: '\u0646\u0637\u0628\u0642 \u0645\u0642\u0627\u064A\u064A\u0633 \u0625\u062F\u0627\u0631\u064A\u0629 \u0648\u062A\u0642\u0646\u064A\u0629 \u0648\u0645\u0627\u062F\u064A\u0629 \u0644\u062D\u0645\u0627\u064A\u0629 \u0628\u064A\u0627\u0646\u0627\u062A\u0643. \u0641\u064A \u062D\u0627\u0644\u0629 \u0627\u0646\u062A\u0647\u0643 \u0628\u064A\u0627\u0646\u0627\u062A \u0634\u062E\u0635\u064A\u0629 \u0645\u0639 \u0645\u062E\u0627\u0637\u0631 \u0639\u0627\u0644\u064A\u060C \u0633\u0646\u0642\u0648\u0645 \u0628\u0625\u0634\u0639\u0627\u0631\u0643 \u0648\u0627\u0644\u0633\u0644\u0637\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u062F\u0629 \u062E\u0644\u0627\u0644 \u0627\u0644\u0622\u062C\u0627\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A (\u0641\u064A \u0627\u0644\u0639\u0627\u062F\u0629 72 \u0633\u0627\u0639\u0629 \u062D\u0633\u0628 \u0642\u0627\u0646\u0648\u0646 GDPR). \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638: \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0633\u0627\u0628 \u0637\u0627\u0644\u0645\u0627 \u0643\u0627\u0646 \u0646\u0634\u0637\u0627\u064B\u060C \u0648\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0623\u0645\u0646 12 \u0634\u0647\u0631\u0627\u064B\u060C \u0648\u0633\u062C\u0644 \u0627\u0644\u0645\u0634\u0627\u0647\u062F\u0629 \u0642\u0627\u0628\u0644 \u0644\u0644\u062D\u0630\u0641 \u0639\u0646\u062F \u0627\u0644\u0637\u0644\u0628.' },
      privacyS10Title: { en: '10. Additional Rights (CCPA / LGPD / PDPA)', fr: '10. Droits suppl\u00E9mentaires (CCPA / LGPD / PDPA)', de: '10. Zus\u00E4tzliche Rechte (CCPA / LGPD / PDPA)', it: '10. Diritti aggiuntivi (CCPA / LGPD / PDPA)', es: '10. Derechos adicionales (CCPA / LGPD / PDPA)', ar: '10. \u062D\u0642\u0648\u0642 \u0625\u0636\u0627\u0641\u064A\u0629 (\u0643\u0627\u0644\u064A\u0641\u0648\u0631\u0646\u064A\u0627 / \u0627\u0644\u0628\u0631\u0627\u0632\u064A\u0644 / \u062A\u0627\u064A\u0644\u0646\u062F)' },
      privacyS10Body: { en: 'California (CCPA): You have the right to request disclosure of categories and specific pieces of personal data we collect, request deletion, opt out of "sales" or "sharing" for cross-context behavioral advertising (we do not sell or share personal data in the ordinary course), and not be discriminated against for exercising CCPA rights. Submit requests via privacy@video.example. Brazil (LGPD): You may request access, confirmation of processing, correction, anonymization, deletion of unnecessary or excessive data, and portability of your personal data. Thailand (PDPA) & similar regimes: You may request access, correction, and withdrawal of consent where consent is the legal basis. All requests will be verified for identity and answered within the timeframe required by applicable law.', fr: "Californie (CCPA) : droit de demander la divulgation des cat\u00E9gories et \u00E9l\u00E9ments, la suppression, le retrait de la \u00AB vente \u00BB ou du \u00AB partage \u00BB pour publicit\u00E9 comportementale (nous ne vendons ni ne partageons de donn\u00E9es dans le cours normal) et non-discrimination. Br\u00E9sil (LGPD) : acc\u00E8s, confirmation du traitement, correction, anonymisation, suppression des donn\u00E9es inutiles/excessives, portabilit\u00E9. Tha\u00EFlande (PDPA) & r\u00E9gimes similaires : acc\u00E8s, correction, r\u00E9vocation du consentement quand celui-ci est la base juridique. Les demandes sont v\u00E9rifi\u00E9es et trait\u00E9es dans les d\u00E9lais l\u00E9gaux.", de: 'Kalifornien (CCPA): Recht auf Auskunft \u00FCber Kategorien und konkrete Daten, L\u00F6schung, Opt-out aus "Verk\u00E4ufen"/"Sharing" f\u00FCr verhaltensbasierte Werbung (wir verkaufen/teilen keine personenbezogenen Daten im regul\u00E4ren Betrieb) und Nichtdiskriminierung. Brasilien (LGPD): Zugang, Best\u00E4tigung der Verarbeitung, Korrektur, Anonymisierung, L\u00F6schung unn\u00F6tiger/\u00FCberm\u00E4\u00DFiger Daten, Daten\u00FCbertragbarkeit. Thailand (PDPA) & vergleichbare Regelungen: Zugang, Korrektur, Widerruf der Einwilligung, sofern diese die Rechtsgrundlage bildet. Anfragen werden identit\u00E4tsgepr\u00FCft und fristgerecht beantwortet.', it: 'California (CCPA): diritto a informazioni su categorie e dati specifici, cancellazione, opt-out da "vendite" / "condivisioni" per pubblicit\u00E0 comportamentale (non vendiamo o condividiamo dati personali nel corso ordinario) e non discriminazione. Brasile (LGPD): accesso, conferma del trattamento, correzione, anonimizzazione, cancellazione di dati non necessari/eccessivi, portabilit\u00E0. Thailandia (PDPA) e regimi simili: accesso, correzione, revoca del consenso ove questo sia la base giuridica. Le richieste sono verificate ed evase nei tempi di legge.', es: 'California (CCPA): derecho a informaci\u00F3n de categor\u00EDas y datos concretos, supresi\u00F3n, exclusi\u00F3n de "ventas" / "compartici\u00F3n" para publicidad conductual cruzada (no vendemos ni compartimos datos personales en el curso ordinario) y no discriminaci\u00F3n. Brasil (LGPD): acceso, confirmaci\u00F3n del tratamiento, correcci\u00F3n, anonimizaci\u00F3n, supresi\u00F3n de datos innecesarios/excesivos, portabilidad. Tailandia (PDPA) y reg\u00EDmenes similares: acceso, correcci\u00F3n, revocaci\u00F3n del consentimiento cuando este es la base jur\u00EDdica. Las solicitudes se verifican y responden en los plazos legales.', ar: '\u0643\u0627\u0644\u064A\u0641\u0648\u0631\u0646\u064A\u0627 (CCPA): \u062D\u0642 \u0637\u0644\u0628 \u0639\u0631\u0636 \u0627\u0644\u0641\u0626\u0627\u062A \u0648\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0648\u0627\u0644\u062D\u0630\u0641 \u0648\u0627\u0644\u0627\u0646\u0633\u062D\u0627\u0628 \u0645\u0646 "\u0627\u0644\u0645\u0628\u064A\u0639\u0627\u062A" \u0623\u0648 "\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0629" \u0644\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0629 (\u0644\u0627 \u0646\u0628\u064A\u0639 \u0648\u0644\u0627 \u0646\u0634\u0627\u0631\u0643 \u0628\u064A\u0627\u0646\u0627\u062A \u0634\u062E\u0635\u064A\u0629 \u0641\u064A \u0627\u0644\u0645\u0645\u0627\u0631\u0633\u0629 \u0627\u0644\u0639\u0627\u062F\u064A\u0629) \u0648\u0627\u0644\u0627 \u062A\u0639\u0631\u0636 \u0644\u0644\u062A\u0645\u064A\u064A\u0632. \u0627\u0644\u0628\u0631\u0627\u0632\u064A\u0644 (LGPD): \u0627\u0644\u0648\u0635\u0648\u0644\u060C \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629\u060C \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u060C \u0625\u0638\u0647\u0627\u0631 \u0627\u0644\u0647\u0648\u064A\u0629\u060C \u062D\u0630\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0627\u0644\u0636\u0631\u0648\u0631\u064A\u0629/\u0627\u0644\u0645\u0641\u0631\u0637\u0629\u060C \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0644\u0646\u0642\u0644. \u062A\u0627\u064A\u0644\u0646\u062F (PDPA) \u0648\u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0645\u0645\u0627\u062B\u0644\u0629: \u0627\u0644\u0648\u0635\u0648\u0644\u060C \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u060C \u0648\u0633\u062D\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0646\u062F \u0643\u0648\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0647\u064A \u0627\u0644\u0623\u0633\u0627\u0633 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A. \u062A\u064F\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0647\u0648\u064A\u0629 \u0648\u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0641\u064A \u0627\u0644\u0622\u062C\u0627\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0642\u0628\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0646\u0627\u0641\u0630.' },

      // ── Terms of Service ────────────────────────────────────────────────────
      termsTitle:      { en: 'Terms of Service', fr: "Conditions d'utilisation", de: 'Nutzungsbedingungen', it: 'Termini di servizio', es: 'T\u00E9rminos de servicio', ar: '\u0634\u0631\u0648\u0637 \u0627\u0644\u062E\u062F\u0645\u0629' },
      termsIntro:      { en: 'These Terms of Service govern your use of the Video platform. By accessing or using our services, you agree to be bound by these terms.', fr: "Ces conditions d'utilisation r\u00E9gissent votre utilisation de la plateforme Video. En acc\u00E9dant ou en utilisant nos services, vous acceptez d'\u00EAtre li\u00E9 par ces conditions.", de: 'Diese Nutzungsbedingungen regeln Ihre Nutzung der Video-Plattform. Durch den Zugriff auf oder die Nutzung unserer Dienste erkl\u00E4ren Sie sich mit diesen Bedingungen einverstanden.', it: 'Questi Termini di servizio regolano l\'utilizzo della piattaforma Video. Accedendo o utilizzando i nostri servizi, accetti di essere vincolato da questi termini.', es: 'Estos T\u00E9rminos de servicio rigen tu uso de la plataforma Video. Al acceder o usar nuestros servicios, aceptas estar sujeto a estos t\u00E9rminos.', ar: '\u062A\u062D\u0643\u0645 \u0634\u0631\u0648\u0637 \u0627\u0644\u062E\u062F\u0645\u0629 \u0647\u0630\u0647 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0643 \u0644\u0645\u0646\u0635\u0629 Video. \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u062E\u062F\u0645\u0627\u062A\u0646\u0627 \u0623\u0648 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647\u0627\u060C \u062A\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 \u0627\u0644\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0648\u0637.' },
      termsS1Title:    { en: '1. Account Registration', fr: "1. Inscription au compte", de: '1. Kontoregistrierung', it: '1. Registrazione dell\'account', es: '1. Registro de cuenta', ar: '1. \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0628' },
      termsS1Body:     { en: 'You must provide accurate and complete information when registering. You are responsible for maintaining the security of your account and for all activities that occur under your account. You must be at least 14 years old to use this service.', fr: 'Vous devez fournir des informations exactes et compl\u00E8tes lors de l\'inscription. Vous \u00EAtes responsable du maintien de la s\u00E9curit\u00E9 de votre compte et de toutes les activit\u00E9s qui s\'y d\u00E9roulent. Vous devez avoir au moins 14 ans pour utiliser ce service.', de: 'Sie m\u00FCssen bei der Registrierung korrekte und vollst\u00E4ndige Angaben machen. Sie sind f\u00FCr die Sicherheit Ihres Kontos und alle Aktivit\u00E4ten darunter verantwortlich. Sie m\u00FCssen mindestens 14 Jahre alt sein, um diesen Dienst zu nutzen.', it: 'Devi fornire informazioni accurate e complete durante la registrazione. Sei responsabile della sicurezza del tuo account e di tutte le attivit\u00E0 che vi si svolgono. Devi avere almeno 14 anni per utilizzare questo servizio.', es: 'Debes proporcionar informaci\u00F3n precisa y completa al registrarte. Eres responsable de mantener la seguridad de tu cuenta y de todas las actividades que ocurran en ella. Debes tener al menos 14 a\u00F1os para usar este servicio.', ar: '\u064A\u062C\u0628 \u062A\u0642\u062F\u064A\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u062F\u0642\u064A\u0642\u0629 \u0648\u0643\u0627\u0645\u0644\u0629 \u0639\u0646\u062F \u0627\u0644\u062A\u0633\u062C\u064A\u0644. \u0623\u0646\u062A \u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u0623\u0645\u0646 \u062D\u0633\u0627\u0628\u0643 \u0648\u0639\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u062A\u064A \u062A\u062D\u062F\u062B \u062A\u062D\u062A\u0647. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0628\u0639\u0645\u0631 14 \u0639\u0627\u0645\u064B\u0627 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0647\u0630\u0647 \u0627\u0644\u062E\u062F\u0645\u0629.' },
      termsS2Title:    { en: '2. User Content', fr: '2. Contenu utilisateur', de: '2. Nutzerinhalte', it: '2. Contenuti degli utenti', es: '2. Contenido del usuario', ar: '2. \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645' },
      termsS2Body:     { en: 'You retain ownership of content you upload but grant Video a non-exclusive, royalty-free license to host, display, and distribute it. You must not upload content that infringes intellectual property rights or is illegal, harmful, or offensive.', fr: 'Vous conservez la propri\u00E9t\u00E9 du contenu que vous t\u00E9l\u00E9chargez mais accordez \u00E0 Video une licence non exclusive et gratuite pour l\'h\u00E9berger, l\'afficher et le distribuer. Vous ne devez pas t\u00E9l\u00E9charger de contenu portant atteinte aux droits de propri\u00E9t\u00E9 intellectuelle ou ill\u00E9gal, nuisible ou offensant.', de: 'Sie behalten das Eigentum an hochgeladenen Inhalten, r\u00E4umen Video aber eine nicht-exklusive, lizenzgeb\u00FChrenfreie Lizenz zum Hosten, Anzeigen und Verbreiten ein. Sie d\u00FCrfen keine Inhalte hochladen, die geistiges Eigentum verletzen oder illegal, sch\u00E4dlich oder anst\u00F6\u00DFig sind.', it: 'Mantieni la propriet\u00E0 dei contenuti che carichi ma concedi a Video una licenza non esclusiva e gratuita per ospitarli, visualizzarli e distribuirli. Non devi caricare contenuti che violano i diritti di propriet\u00E0 intellettuale o che sono illegali, dannosi o offensivi.', es: 'Mantienes la propiedad del contenido que subes pero otorgas a Video una licencia no exclusiva y gratuita para alojarlo, mostrarlo y distribuirlo. No debes subir contenido que infrinja derechos de propiedad intelectual o que sea ilegal, da\u00F1ino u ofensivo.', ar: '\u062A\u062D\u062A\u0641\u0638 \u0628\u0645\u0644\u0643\u064A\u0629 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0630\u064A \u062A\u0631\u0641\u0639\u0647 \u0644\u0643\u0646\u0643 \u062A\u0645\u0646\u062D Video \u0631\u062E\u0635\u0629 \u063A\u064A\u0631 \u062D\u0635\u0631\u064A\u0629 \u0648\u0645\u062C\u0627\u0646\u064A\u0629 \u0644\u0627\u0633\u062A\u0636\u0627\u0641\u062A\u0647 \u0648\u0639\u0631\u0636\u0647 \u0648\u062A\u0648\u0632\u064A\u0639\u0647. \u064A\u062C\u0628 \u0639\u062F\u0645 \u0631\u0641\u0639 \u0645\u062D\u062A\u0648\u0649 \u064A\u0646\u062A\u0647\u0643 \u062D\u0642\u0648\u0642 \u0627\u0644\u0645\u0644\u0643\u064A\u0629 \u0627\u0644\u0641\u0643\u0631\u064A\u0629 \u0623\u0648 \u063A\u064A\u0631 \u0642\u0627\u0646\u0648\u0646\u064A \u0623\u0648 \u0636\u0627\u0631 \u0623\u0648 \u0645\u0633\u064A\u0621.' },
      termsS3Title:    { en: '3. Acceptable Use', fr: '3. Utilisation acceptable', de: '3. Zul\u00E4ssige Nutzung', it: '3. Uso accettabile', es: '3. Uso aceptable', ar: '3. \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u0642\u0628\u0648\u0644' },
      termsS3Body:     { en: 'You agree not to misuse the platform, including attempting unauthorized access, spreading malware, harassing other users, manipulating metrics, or interfering with normal operations. Violations may result in account suspension.', fr: 'Vous acceptez de ne pas faire un mauvais usage de la plateforme, y compris les tentatives d\'acc\u00E8s non autoris\u00E9, la diffusion de logiciels malveillants, le harc\u00E8lement d\'autres utilisateurs, la manipulation de m\u00E9triques ou l\'interf\u00E9rence avec les op\u00E9rations normales. Les violations peuvent entra\u00EEner la suspension du compte.', de: 'Sie stimmen zu, die Plattform nicht zu missbrauchen, einschlie\u00DFlich unbefugtem Zugriff, Verbreitung von Malware, Bel\u00E4stigung anderer Nutzer, Manipulation von Metriken oder Beeintr\u00E4chtigung des Normalbetriebs. Verst\u00F6\u00DFe k\u00F6nnen zur Kontosperrung f\u00FChren.', it: 'Accetti di non usare in modo improprio la piattaforma, inclusi tentativi di accesso non autorizzato, diffusione di malware, molestie ad altri utenti, manipolazione di metriche o interferenza con le normali operazioni. Le violazioni possono comportare la sospensione dell\'account.', es: 'Aceptas no usar indebidamente la plataforma, incluidos intentos de acceso no autorizado, propagaci\u00F3n de malware, acoso a otros usuarios, manipulaci\u00F3n de m\u00E9tricas o interferencia con las operaciones normales. Las violaciones pueden resultar en la suspensi\u00F3n de la cuenta.', ar: '\u062A\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 \u0639\u062F\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u0646\u0635\u0629 \u0628\u0637\u0631\u064A\u0642\u0629 \u063A\u064A\u0631 \u0644\u0627\u0626\u0642\u0629\u060C \u0628\u0645\u0627 \u0641\u064A \u0630\u0644\u0643 \u0645\u062D\u0627\u0648\u0644\u0627\u062A \u0627\u0644\u0648\u0635\u0648\u0644 \u063A\u064A\u0631 \u0627\u0644\u0645\u0635\u0631\u062D \u0628\u0647\u060C \u0648\u0646\u0634\u0631 \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0636\u0627\u0631\u0629\u060C \u0648\u0645\u0644\u0627\u062D\u0642\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0627\u0644\u0622\u062E\u0631\u064A\u0646\u060C \u0648\u0627\u0644\u062A\u0644\u0627\u0639\u0628 \u0628\u0627\u0644\u0645\u0642\u0627\u064A\u064A\u0633\u060C \u0623\u0648 \u0627\u0644\u062A\u062F\u062E\u0644 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0639\u064A\u0629. \u0642\u062F \u062A\u0624\u062F\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0625\u0644\u0649 \u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062D\u0633\u0627\u0628.' },
      termsS4Title:    { en: '4. Service Availability', fr: '4. Disponibilit\u00E9 du service', de: '4. Dienstverf\u00FCgbarkeit', it: '4. Disponibilit\u00E0 del servizio', es: '4. Disponibilidad del servicio', ar: '4. \u062A\u0648\u0627\u0641\u0631 \u0627\u0644\u062E\u062F\u0645\u0629' },
      termsS4Body:     { en: 'We strive to maintain high availability but do not guarantee uninterrupted service. We may modify, suspend, or discontinue features at any time. We are not liable for any damages arising from service interruptions.', fr: 'Nous nous effor\u00E7ons de maintenir une haute disponibilit\u00E9 mais ne garantissons pas un service ininterrompu. Nous pouvons modifier, suspendre ou interrompre des fonctionnalit\u00E9s \u00E0 tout moment. Nous ne sommes pas responsables des dommages r\u00E9sultant d\'interruptions de service.', de: 'Wir bem\u00FChen uns um hohe Verf\u00FCgbarkeit, garantieren aber keinen ununterbrochenen Dienst. Wir k\u00F6nnen Funktionen jederzeit \u00E4ndern, aussetzen oder einstellen. Wir haften nicht f\u00FCr Sch\u00E4den aus Dienstunterbrechungen.', it: 'Ci sforziamo di mantenere un\'alta disponibilit\u00E0 ma non garantiamo un servizio ininterrotto. Possiamo modificare, sospendere o interrompere funzionalit\u00E0 in qualsiasi momento. Non siamo responsabili per danni derivanti da interruzioni del servizio.', es: 'Nos esforzamos por mantener una alta disponibilidad pero no garantizamos un servicio ininterrumpido. Podemos modificar, suspender o discontinuar funciones en cualquier momento. No somos responsables de los da\u00F1os derivados de interrupciones del servicio.', ar: '\u0646\u0633\u0639\u0649 \u0644\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u062A\u0648\u0627\u0641\u0631 \u0639\u0627\u0644 \u0644\u0643\u0646\u0646\u0627 \u0644\u0627 \u0646\u0636\u0645\u0646 \u062E\u062F\u0645\u0629 \u063A\u064A\u0631 \u0645\u0642\u0637\u0648\u0639\u0629. \u064A\u0645\u0643\u0646\u0646\u0627 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u064A\u0632\u0627\u062A \u0623\u0648 \u0625\u064A\u0642\u0627\u0641\u0647\u0627 \u0623\u0648 \u0625\u064A\u0642\u0627\u0641\u0647\u0627 \u0641\u064A \u0623\u064A \u0648\u0642\u062A. \u0644\u0627 \u0646\u062A\u062D\u0645\u0644 \u0645\u0633\u0624\u0648\u0644\u064A\u0629 \u0623\u064A \u0623\u0636\u0631\u0627\u0631 \u0646\u0627\u062A\u062C\u0629 \u0639\u0646 \u0627\u0646\u0642\u0637\u0627\u0639 \u0627\u0644\u062E\u062F\u0645\u0629.' },
      termsS5Title:    { en: '5. Limitation of Liability', fr: '5. Limitation de responsabilit\u00E9', de: '5. Haftungsbeschr\u00E4nkung', it: '5. Limitazione di responsabilit\u00E0', es: '5. Limitaci\u00F3n de responsabilidad', ar: '5. \u062D\u062F \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0629' },
      termsS5Body:     { en: 'Video is provided "as is" without warranties of any kind. We are not liable for indirect, incidental, or consequential damages arising from the use or inability to use our services.', fr: 'Video est fourni \u00AB\u00A0tel quel\u00A0\u00BB sans aucune garantie. Nous ne sommes pas responsables des dommages indirects, accessoires ou cons\u00E9cutifs r\u00E9sultant de l\'utilisation ou de l\'impossibilit\u00E9 d\'utiliser nos services.', de: 'Video wird \u00ABwie besehen\u00BB ohne Gew\u00E4hrleistung bereitgestellt. Wir haften nicht f\u00FCr indirekte, beil\u00E4ufige oder Folgesch\u00E4den aus der Nutzung oder Nichtnutzung unserer Dienste.', it: 'Video \u00E8 fornito "cos\u00EC com\'\u00E8" senza garanzie di alcun tipo. Non siamo responsabili per danni indiretti, incidentali o consequenziali derivanti dall\'uso o dall\'impossibilit\u00E0 di usare i nostri servizi.', es: 'Video se proporciona "tal cual" sin garant\u00EDas de ning\u00FAn tipo. No somos responsables de da\u00F1os indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de usar nuestros servicios.', ar: '\u064A\u064F\u0642\u062F\u0645 Video "\u0643\u0645\u0627 \u0647\u064A" \u062F\u0648\u0646 \u0623\u064A \u0636\u0645\u0627\u0646\u0627\u062A. \u0644\u0627 \u0646\u062A\u062D\u0645\u0644 \u0645\u0633\u0624\u0648\u0644\u064A\u0629 \u0627\u0644\u0623\u0636\u0631\u0627\u0631 \u063A\u064A\u0631 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0629 \u0623\u0648 \u0627\u0644\u0639\u0631\u0636\u064A\u0629 \u0623\u0648 \u0627\u0644\u062A\u0628\u0627\u0639\u064A\u0629 \u0627\u0644\u0646\u0627\u062A\u062C\u0629 \u0639\u0646 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062E\u062F\u0645\u0627\u062A\u0646\u0627 \u0623\u0648 \u0639\u062F\u0645 \u0627\u0644\u0627\u0633\u062A\u0637\u0627\u0639\u0629.' },
      termsS6Title:    { en: '6. Changes to Terms', fr: '6. Modification des conditions', de: '6. \u00C4nderung der Bedingungen', it: '6. Modifiche ai termini', es: '6. Cambios en los t\u00E9rminos', ar: '6. \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u0634\u0631\u0648\u0637' },
      termsS6Body:     { en: 'We may update these Terms from time to time. Material changes will be notified via the platform or to your registered email at least 30 days before they take effect. Continued use after the effective date constitutes acceptance of the revised Terms. We will indicate the last update date below.', fr: 'Nous pouvons mettre \u00E0 jour ces conditions de temps en temps. Les modifications importantes vous seront notifi\u00E9es via la plateforme ou par e-mail au moins 30 jours avant leur entr\u00E9e en vigueur. L\u2019utilisation continue apr\u00E8s la date d\u2019effet vaut acceptation.', de: 'Wir k\u00F6nnen diese Bedingungen aktualisieren. Wesentliche \u00C4nderungen werden \u00FCber die Plattform oder per E-Mail mindestens 30 Tage vor Inkrafttreten angek\u00FCndigt. Fortgesetzte Nutzung nach Inkrafttreten gilt als Zustimmung.', it: 'Potremmo aggiornare questi Termini. Modifiche sostanziali saranno notificate via piattaforma o email almeno 30 giorni prima dell\u2019entrata in vigore. L\u2019uso proseguito dopo tale data equivale ad accettazione.', es: 'Podemos actualizar estos T\u00E9rminos. Los cambios materiales se notificar\u00E1n por plataforma o email al menos 30 d\u00EDas antes de que surtan efecto. El uso continuado tras la entrada en vigor se considera aceptaci\u00F3n.', ar: '\u0642\u062F \u0646\u0642\u0648\u0645 \u0628\u062A\u062D\u062F\u064A\u062B \u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0648\u0637 \u0645\u0646 \u062D\u064A\u0646 \u0644\u0622\u062E\u0631. \u0633\u064A\u062A\u0645 \u0625\u0634\u0639\u0627\u0631 \u0628\u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0627\u0644\u062C\u0648\u0647\u0631\u064A\u0629 \u0639\u0628\u0631 \u0627\u0644\u0645\u0646\u0635\u0629 \u0623\u0648 \u0627\u0644\u0628\u0631\u064A\u062F \u0645\u0646\u0630 30 \u064A\u0648\u0645\u064B\u0627 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0642\u0628\u0644 \u0627\u0644\u062A\u0646\u0641\u064A\u0630. \u0627\u0633\u062A\u0645\u0631\u0627\u0631 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0628\u0639\u062F \u062F\u0644\u0643 \u064A\u0639\u062F \u0642\u0628\u0648\u0644\u0627\u064B.' },
      termsS7Title:    { en: '7. Intellectual Property & Copyright (DMCA)', fr: '7. Propri\u00E9t\u00E9 intellectuelle et droit d\u2019auteur (DMCA)', de: '7. Geistiges Eigentum & Urheberrecht (DMCA)', it: '7. Propriet\u00E0 intellettuale e diritto d\u2019autore (DMCA)', es: '7. Propiedad intelectual y derechos de autor (DMCA)', ar: '7. \u0627\u0644\u0645\u0644\u0643\u064A\u0629 \u0627\u0644\u0641\u0643\u0631\u064A\u0629 \u0648\u062D\u0642\u0648\u0642 \u0627\u0644\u0646\u0634\u0631 (DMCA)' },
      termsS7Body:     { en: 'All trademarks, logos, and platform content (other than user uploads) are the property of Video or its licensors. We respect copyright and respond to allegations of copyright infringement in accordance with the Digital Millennium Copyright Act (DMCA). If you believe your work has been copied in a way that constitutes infringement, submit a notice to dmca@video.example containing: (1) a physical or electronic signature of the copyright owner; (2) identification of the copyrighted work and the infringing material; (3) your contact information; (4) a statement of good faith belief that the use is not authorized; (5) a statement that the information is accurate, under penalty of perjury. Repeat infringers will have their accounts suspended or terminated.', fr: 'Toutes les marques, logos et contenus de la plateforme (hors contributions utilisateurs) appartiennent \u00E0 Video ou ses bailleurs de licence. Nous respectons le droit d\u2019auteur et r\u00E9pondons aux signalements conform\u00E9ment au DMCA. Pour un signalement, \u00E9crivez \u00E0 dmca@video.example avec les \u00E9l\u00E9ments requis (signature, identification de l\u2019\u0153uvre et du contenu pr\u00E9sum\u00E9 illicite, coordonn\u00E9es, d\u00E9claration de bonne foi, exactitude sous peine de parjure). Les contrevenants r\u00E9cidivistes seront suspendus.', de: 'Alle Marken, Logos und Plattforminhalte (au\u00DFer Nutzerbeitr\u00E4gen) sind Eigentum von Video oder Lizenzgebern. Wir beachten das Urheberrecht und bearbeiten Hinweise nach dem US-DMCA. Melden Sie Verst\u00F6\u00DFe an dmca@video.example mit den erforderlichen Elementen (Signatur, Identifikation des Werks und des Materials, Kontaktdaten, Erkl\u00E4rung guter Treue, Richtigkeit unter Eidstrafe). Wiederholte Verst\u00F6\u00DFe f\u00FChren zur Sperrung.', it: 'Marchi, loghi e contenuti della piattaforma (diversi dai contributi utente) sono di propriet\u00E0 di Video o dei suoi licenzianti. Rispettiamo il diritto d\u2019autore e rispondiamo alle segnalazioni secondo il DMCA. Segnala a dmca@video.example con: firma, identificazione dell\u2019opera e del materiale, contatti, dichiarazione di buona fede, esattezza sotto pena di spergiuro. I recidivi vedranno sospeso il proprio account.', es: 'Todas las marcas, logos y contenido de la plataforma (excepto lo subido por usuarios) son propiedad de Video o sus licenciantes. Cumplimos con el DMCA. Reporta infracciones a dmca@video.example incluyendo: firma, identificaci\u00F3n de la obra y material infractor, datos de contacto, declaraci\u00F3n de buena fe, exactitud bajo pena de perjurio. Los infractores repetidos ser\u00E1n suspendidos.', ar: '\u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0627\u0644\u062A\u062C\u0627\u0631\u064A\u0629 \u0648\u0627\u0644\u0634\u0639\u0627\u0631\u0627\u062A \u0648\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0646\u0635\u0629 (\u0628\u0627\u0633\u062A\u062B\u0646\u0627\u0621 \u0645\u0627 \u064A\u0631\u0641\u0639\u0647 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646) \u062A\u0628\u0639 \u0644\u0644\u0641\u0631\u064A\u0642 Video \u0623\u0648 \u0644\u0645\u0646\u062D\u0627\u0644\u064A. \u0646\u062D\u062A\u0631\u0645 \u062D\u0642\u0648\u0642 \u0627\u0644\u0646\u0634\u0631 \u0648\u0646\u062A\u062C\u064A\u0628 \u0644\u0644\u0628\u0644\u0627\u063A\u0627\u062A \u0628\u0645\u0648\u0627\u0641\u0642\u0629 \u0642\u0627\u0646\u0648\u0646 DMCA. \u0623\u0631\u0633\u0644 \u0627\u0644\u0628\u0644\u0627\u063A\u0627\u062A \u0625\u0644\u0649 dmca@video.example \u0645\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (\u062A\u0648\u0642\u064A\u0639\u060C \u062A\u0639\u0631\u064A\u0641 \u0627\u0644\u0639\u0645\u0644\u060C \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0648\u0627\u0635\u0644\u064A\u0629\u060C \u0625\u0642\u0631\u0627\u0631 \u0628\u0627\u0644\u0646\u064A\u0629 \u0627\u0644\u062D\u0633\u0646\u0629\u060C \u062F\u0642\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u062A\u062D\u062A \u0637\u0627\u0639\u0629 \u0627\u0644\u064A\u0645\u064A\u0646). \u0633\u064A\u062A\u0645 \u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u064A\u0646 \u0627\u0644\u0645\u0643\u0631\u0631\u064A\u0646.' },
      termsS8Title:    { en: '8. Governing Law & Dispute Resolution', fr: '8. Droit applicable et r\u00E9glement des litiges', de: '8. Anwendbares Recht & Streitbeilegung', it: '8. Diritto applicabile e risoluzione delle controversie', es: '8. Ley aplicable y resoluci\u00F3n de disputas', ar: '8. \u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0646\u0627\u0641\u0630 \u0648\u062A\u0633\u0648\u064A\u0629 \u0627\u0644\u0646\u0632\u0627\u0639\u0627\u062A' },
      termsS8Body:     { en: 'For users residing outside the European Economic Area (EEA), Switzerland, and the United Kingdom: these Terms are governed by the laws of the State of Delaware, United States, without regard to its conflict of laws rules. Any dispute arising out of or relating to these Terms will be resolved through binding individual arbitration before the American Arbitration Association (AAA) under its Consumer Arbitration Rules, with hearings conducted remotely. You and Video waive any right to participate in a class action, class arbitration, or representative action. For EEA/Switzerland/UK residents: this arbitration clause and class-action waiver do not apply. You may bring proceedings before your local courts or, for EU residents, submit disputes to an alternative dispute resolution (ADR) entity, and these Terms are governed by the law of the country in which you are habitually resident.', fr: 'Pour les utilisateurs hors EEE/Suisse/Royaume-Uni : droit de l\u2019\u00C9tat du Delaware, \u00C9tats-Unis. Tout litige sera soumis \u00E0 l\u2019arbitrage individuel contraignant de l\u2019AAA (Consumer Arbitration Rules) \u00E0 distance. Aucune action de groupe ni arbitrage collectif. Pour les r\u00E9sidents EEE/Suisse/Royaume-Uni : la clause d\u2019arbitrage et la renonciation aux recours collectifs ne s\u2019appliquent pas ; vous pouvez saisir vos juridictions locales ou un organisme de r\u00E9glement extrajudiciaire ; droit du pays de r\u00E9sidence habituelle.', de: 'F\u00FCr Nutzer au\u00DFerhalb von EWR/Schweiz/Gro\u00DFbritannien: Recht des Staates Delaware, USA. Streitigkeiten werden durch verbindliches Individualschiedsverfahren vor der AAA nach deren Consumer Arbitration Rules (Fernverhandlung) beigelegt. Verzicht auf Sammelklagen/Sammelschiedsverfahren. F\u00FCr EWR/CH/GB-Anwohner: Schiedsklausel und Verzicht auf Sammelklagen finden keine Anwendung; Sie k\u00F6nnen Ihre Gerichte oder eine ADR-Stelle anrufen; Recht des Staates Ihres gew\u00F6hnlichen Aufenthalts.', it: 'Per utenti al di fuori di SEE/Svizzera/Regno Unito: legge dello Stato del Delaware, USA. Ogni controversia \u00E8 devoluta ad arbitrato individuale vincolante presso l\u2019AAA secondo le Consumer Arbitration Rules in modalit\u00E0 remota. Nessuna azione collettiva o arbitrato collettivo. Per residenti SEE/Svizzera/RU: clausola arbitrale e rinuncia a azioni collettive non si applicano; puoi ricorrere alle tue autorit\u00E0 giurisdizionali locali o a un ente ADR; legge del paese di residenza abituale.', es: 'Para usuarios fuera del EEE, Suiza y Reino Unido: derecho del Estado de Delaware, EE. UU. Cualquier disputa se resolver\u00E1 por arbitraje individual vinculante ante la AAA conforme a sus Consumer Arbitration Rules, de forma remota. No se admiten acciones colectivas ni arbitrajes colectivos. Para residentes en EEE/Suiza/Reino Unido: la cl\u00E1usula arbitral y la renuncia a acciones colectivas no son de aplicaci\u00F3n; puedes acudir a tus juzgados locales o a un ente ADR; derecho del pa\u00EDs de residencia habitual.', ar: '\u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u062E\u0627\u0631\u062C \u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0627\u0642\u062A\u0635\u0627\u062F\u064A\u0629 \u0627\u0644\u0623\u0648\u0631\u0648\u0628\u064A\u0629/\u0633\u0648\u064A\u0633\u0631\u0627/\u0628\u0631\u064A\u0637\u0627\u0646\u064A\u0627: \u062D\u0643\u0645 \u0642\u0627\u0646\u0648\u0646 \u0648\u0644\u0627\u064A\u0629 \u062F\u064A\u0644\u0627\u0648\u064A\u0631\u060C \u0627\u0644\u0648\u0644\u0627\u064A\u0627\u062A \u0627\u0644\u0645\u062A\u062D\u062F\u0629. \u0623\u064A \u0646\u0632\u0627\u0639 \u064A\u062A\u0645 \u0627\u0644\u0628\u062A \u0641\u064A \u062E\u0637\u0629 \u062A\u062D\u0643\u064A\u0645 \u0641\u0631\u062F\u064A \u0645\u0644\u0632\u0645 \u0642\u0628\u0644 \u0627\u0644\u0644\u062C\u0646\u0629 AAA \u0628\u0645\u0648\u062C\u0628 \u0627\u0644\u0642\u0648\u0627\u0639\u062F Consumer Arbitration Rules \u0639\u0628\u0631 \u0627\u0644\u0628\u0639\u062F. \u0627\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0642 \u0641\u064A \u0627\u0644\u062F\u0639\u0648\u0649 \u0627\u0644\u062C\u0645\u0627\u0639\u064A\u0629. \u0644\u0642\u0637\u0627\u0646 \u0627\u0644\u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u0645\u0630\u0643\u0648\u0631\u0629: \u0644\u0627 \u064A\u0637\u0628\u0642 \u0628\u0646\u062F \u0627\u0644\u062A\u062D\u0643\u064A\u0645 \u0648\u0644\u0627 \u0627\u0646\u0633\u062D\u0627\u0628 \u0627\u0644\u062F\u0639\u0648\u0649 \u0627\u0644\u062C\u0645\u0627\u0639\u064A\u0629\u061B \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0645\u062D\u0627\u0643\u0645 \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0623\u0648 \u0647\u064A\u0626\u0629 ADR\u061B \u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0644\u062F\u0648\u0644\u0629 \u0627\u0644\u0625\u0642\u0627\u0645\u0629 \u0627\u0644\u0639\u0627\u062F\u064A\u0629.' },
      termsS9Title:    { en: '9. Age Requirements & Children\u2019s Privacy', fr: '9. \u00C2ge requis et confidentialit\u00E9 des enfants', de: '9. Altersvoraussetzung & Kinderschutz', it: '9. Requisiti di et\u00E0 e privacy dei minori', es: '9. Requisitos de edad y privacidad de menores', ar: '9. \u0634\u0631\u0648\u0637 \u0627\u0644\u0639\u0645\u0631 \u0648\u062E\u0635\u0648\u0635\u064A\u0629 \u0627\u0644\u0623\u0637\u0641\u0627\u0644' },
      termsS9Body:     { en: 'This platform is not directed at children under the age of 14. If you are under 14, do not use the platform or provide any personal information. For residents of the European Economic Area, the minimum age is 16 years old in accordance with the GDPR; if you are under 16, you may only use the platform with the express consent of your parent or legal guardian, which we may require to verify before enabling account access. If we learn that we have collected personal information from a child below the applicable age threshold without lawful guardian consent, we will promptly delete that information.', fr: "Cette plateforme ne s'adresse pas aux moins de 14 ans. Si vous avez moins de 14 ans, ne l'utilisez pas. Pour les r\u00E9sidents de l'EEE, l'\u00E2ge minimum est de 16 ans conform\u00E9ment au RGPD ; si vous avez moins de 16 ans, l'accueil n'est possible qu'avec le consentement expr\u00E8s de votre parent ou tuteur, que nous pouvons v\u00E9rifier. Toute information collect\u00E9e sans ce consentement sera supprim\u00E9e rapidement.", de: 'Diese Plattform ist nicht f\u00FCr Kinder unter 14 Jahren bestimmt. EWR-Anwohner m\u00FCssen mindestens 16 Jahre alt sein (DSGVO). Sind Sie j\u00FCnger, ist die Nutzung nur mit ausdr\u00FCcklicher Zustimmung Ihrer Eltern/gesetzlichen Vertreter m\u00F6glich, deren Vorliegen wir \u00FCberpr\u00FCfen d\u00FCrfen. Ohne rechtsm\u00E4\u00DFig eingeholte Zustimmung gel\u00F6schte wir die betroffenen Daten unverz\u00FCglich.', it: 'Questa piattaforma non \u00E8 rivolta a bambini sotto i 14 anni. Per i residenti nel SEE, l\u2019et\u00E0 minima \u00E8 16 anni ai sensi del GDPR; sotto i 16 anni \u00E8 richiesto il consenso esplicito di genitore o tutore legale, anche da verificare. Qualora raccogliessimo dati senza tale consenso, li elimineremo prontamente.', es: 'Esta plataforma no est\u00E1 dirigida a menores de 14 a\u00F1os. Para residentes del EEE la edad m\u00EDnima es 16 a\u00F1os por el RGPD; si tienes menos de 16, s\u00F3lo puedes usar la plataforma con el consentimiento expreso de tu progenitor o tutor legal, que podemos verificar. Si detectamos datos recopilados sin ese consentimiento, los eliminaremos de inmediato.', ar: '\u0647\u0630\u0647 \u0627\u0644\u0645\u0646\u0635\u0629 \u0644\u064A\u0633\u062A \u0645\u0648\u062C\u0647\u0629 \u0644\u0644\u0623\u0637\u0641\u0627\u0644 \u0627\u0644\u0623\u0642\u0644 \u0645\u0646 14 \u0639\u0627\u0645\u0627\u064B. \u0625\u0630\u0627 \u0643\u0646\u062A \u062A\u062D\u062A \u0633\u0646 14\u060C \u0644\u0627 \u062A\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0645\u0646\u0635\u0629. \u0641\u064A \u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0627\u0642\u062A\u0635\u0627\u062F\u064A\u0629 \u0627\u0644\u0623\u0648\u0631\u0648\u0628\u064A\u0629\u060C \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 16 \u0639\u0627\u0645\u0627\u064B \u062D\u0633\u0628 \u0642\u0627\u0646\u0648\u0646 GDPR. \u0625\u0630\u0627 \u0643\u0646\u062A \u062A\u062D\u062A \u0633\u0646 16\u060C \u064A\u062C\u0628 \u0648\u062C\u0648\u062F \u0645\u0648\u0627\u0641\u0642\u0629 \u0635\u0631\u064A\u062D\u0629 \u0645\u0646 \u0627\u0644\u0648\u0627\u0644\u062F \u0623\u0648 \u0627\u0644\u0648\u0635\u064A \u0627\u0644\u0634\u0631\u0639\u064A \u0648\u064A\u0645\u0643\u0646\u0646\u0627 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646\u0647. \u0625\u0630\u0627 \u062A\u0645 \u0639\u0634\u0648\u064A\u0629 \u062A\u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0642\u0627\u0635\u0631 \u062F\u0648\u0646 \u0645\u0648\u0627\u0641\u0642\u0629\u060C \u0633\u064A\u062A\u0645 \u062D\u0630\u0641\u0647\u0627 \u0641\u0648\u0631\u0627\u064B.' },
      termsS10Title:   { en: '10. Severability & Contact', fr: '10. Divisibilit\u00E9 et contact', de: '10. Salvatorische Klausel & Kontakt', it: '10. Severabilit\u00E0 e contatti', es: '10. Divisibilidad y contacto', ar: '10. \u0627\u0644\u0628\u0646\u062F \u0627\u0644\u0645\u0646\u0641\u0635\u0644 \u0648\u0627\u0644\u0627\u062A\u0635\u0627\u0644' },
      termsS10Body:    { en: 'If any provision of these Terms is held to be invalid or unenforceable by a court of competent jurisdiction, such provision will be restricted or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect. No waiver by Video of any term or breach will constitute a continuing waiver. For questions about these Terms, contact legal@video.example.', fr: "Si une disposition des pr\u00E9sentes conditions est jug\u00E9e invalide ou inapplicable, elle sera restreinte ou \u00E9limin\u00E9e dans la mesure minimale n\u00E9cessaire, les autres dispositions restant en vigueur. Aucune renonciation ne vaudra renonciation durable. Pour toute question : legal@video.example.", de: 'Sollte eine Bestimmung dieser Bedingungen unwirksam oder nicht durchsetzbar sein, wird sie auf das notwendige Minimum beschr\u00E4nkt oder entfernt; die \u00FCbrigen Bestimmungen bleiben in Kraft. Kein Verzicht gilt als fortlaufender Verzicht. Fragen: legal@video.example.', it: 'Se una disposizione di questi Termini \u00E8 ritenuta invalida o inapplicabile, sar\u00E0 limitata o eliminata nel minimo necessario e le restanti disposizioni rimarranno in vigore. Nessuna rinuncia varr\u00E0 come rinuncia continua. Per domande: legal@video.example.', es: 'Si alguna disposici\u00F3n de estos T\u00E9rminos se considera inv\u00E1lida o inaplicable, quedar\u00E1 limitada o eliminada en la medida m\u00EDnima necesaria; el resto de disposiciones seguir\u00E1n en pleno vigor. Ninguna renuncia se considerar\u00E1 renuncia continuada. Consultas: legal@video.example.', ar: '\u0625\u0630\u0627 \u062B\u062A \u0623\u064A \u0628\u0646\u062F \u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0648\u0637 \u0644\u0627\u0635\u062D\u064A\u064B\u0627 \u0623\u0648 \u063A\u064A\u0631 \u0642\u0627\u0628\u0644 \u0644\u0644\u062A\u0646\u0641\u064A\u0630\u060C \u0641\u0633\u064A\u062A\u0645 \u0627\u0644\u062D\u0635\u0648\u0631 \u0639\u0644\u064A\u0647 \u0623\u0648 \u0625\u0644\u063A\u0627\u0621\u0647 \u0628\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 \u0627\u0644\u0644\u0627\u0632\u0645\u060C \u0648\u062A\u0628\u0642\u0649 \u0627\u0644\u0623\u0628\u0642\u064A\u0629 \u0645\u0646 \u0627\u0644\u0623\u062D\u0643\u0627\u0645 \u0633\u0627\u0631\u064A\u0629 \u0643\u0627\u0645\u0644\u0629. \u0644\u0627 \u062A\u0639\u062F \u0623\u064A \u0627\u0646\u0633\u062D\u0627\u0628\u0629 \u0628\u0627\u0646\u0633\u062D\u0627\u0628 \u0645\u0633\u062A\u0645\u0631. \u0644\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631: legal@video.example.' },

      // ── Cookie Policy ────────────────────────────────────────────────────────
      cookieTitle:     { en: 'Cookie Policy', fr: 'Politique des cookies', de: 'Cookie-Richtlinie', it: 'Politica dei cookie', es: 'Pol\u00EDtica de cookies', ar: '\u0633\u064A\u0627\u0633\u0629 \u0643\u0648\u0643\u064A\u0632' },
      cookieIntro:     { en: 'This Cookie Policy explains how Video uses cookies and similar technologies to store and retrieve information on your device.', fr: 'Cette politique des cookies explique comment Video utilise les cookies et technologies similaires pour stocker et r\u00E9cup\u00E9rer des informations sur votre appareil.', de: 'Diese Cookie-Richtlinie erkl\u00E4rt, wie Video Cookies und \u00E4hnliche Technologien verwendet, um Informationen auf Ihrem Ger\u00E4t zu speichern und abzurufen.', it: 'Questa politica dei cookie spiega come Video utilizza cookie e tecnologie simili per memorizzare e recuperare informazioni sul tuo dispositivo.', es: 'Esta pol\u00EDtica de cookies explica c\u00F3mo Video utiliza cookies y tecnolog\u00EDas similares para almacenar y recuperar informaci\u00F3n en tu dispositivo.', ar: '\u062A\u0648\u0636\u062D \u0633\u064A\u0627\u0633\u0629 \u0643\u0648\u0643\u064A\u0632 \u0643\u064A\u0641 \u064A\u0633\u062A\u062E\u062F\u0645 Video \u0627\u0644\u0643\u0648\u0643\u064A\u0632 \u0648\u0627\u0644\u062A\u0642\u0646\u064A\u0627\u062A \u0627\u0644\u0645\u0645\u0627\u062B\u0644\u0629 \u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0648\u0627\u0633\u062A\u0631\u062C\u0627\u0639\u0647\u0627 \u0639\u0644\u0649 \u062C\u0647\u0627\u0632\u0643.' },
      cookieS1Title:   { en: '1. What Are Cookies', fr: '1. Qu\'est-ce qu\'un cookie', de: '1. Was sind Cookies', it: '1. Cosa sono i cookie', es: '1. Qu\u00E9 son las cookies', ar: '1. \u0645\u0627 \u0647\u064A \u0627\u0644\u0643\u0648\u0643\u064A\u0632' },
      cookieS1Body:    { en: 'Cookies are small text files placed on your device by websites you visit. They are widely used to make websites function efficiently and provide reporting information.', fr: 'Les cookies sont de petits fichiers texte plac\u00E9s sur votre appareil par les sites web que vous visitez. Ils sont largement utilis\u00E9s pour faire fonctionner les sites efficacement et fournir des informations statistiques.', de: 'Cookies sind kleine Textdateien, die von besuchten Websites auf Ihrem Ger\u00E4t abgelegt werden. Sie dienen dazu, Websites effizient zu betreiben und statistische Informationen bereitzustellen.', it: 'I cookie sono piccoli file di testo posizionati sul tuo dispositivo dai siti web che visiti. Sono ampiamente utilizzati per far funzionare i siti in modo efficiente e fornire informazioni statistiche.', es: 'Las cookies son peque\u00F1os archivos de texto colocados en tu dispositivo por los sitios web que visitas. Se usan ampliamente para que los sitios funcionen de manera eficiente y proporcionen informaci\u00F3n estad\u00EDstica.', ar: '\u0627\u0644\u0643\u0648\u0643\u064A\u0632 \u0647\u064A \u0645\u0644\u0641\u0627\u062A \u0646\u0635\u064A\u0629 \u0635\u063A\u064A\u0631\u0629 \u064A\u0636\u0639\u0647\u0627 \u0627\u0644\u0645\u0648\u0622\u0642\u0639 \u0627\u0644\u062A\u064A \u062A\u0632\u0648\u0631\u0647\u0627 \u0639\u0644\u0649 \u062C\u0647\u0627\u0632\u0643. \u062A\u064F\u0633\u062A\u062E\u062F\u0645 \u0628\u0634\u0643\u0644 \u0648\u0627\u0633\u0639 \u0644\u062C\u0639\u0644 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u062A\u0639\u0645\u0644 \u0628\u0643\u0641\u0627\u0621\u0629 \u0648\u062A\u0642\u062F\u064A\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0625\u062D\u0635\u0627\u0626\u064A\u0629.' },
      cookieS2Title:   { en: '2. Types of Cookies We Use', fr: '2. Types de cookies que nous utilisons', de: '2. Von uns verwendete Cookie-Typen', it: '2. Tipi di cookie che utilizziamo', es: '2. Tipos de cookies que usamos', ar: '2. \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0643\u0648\u0643\u064A\u0632 \u0627\u0644\u062A\u064A \u0646\u0633\u062A\u062E\u062F\u0645\u0647\u0627' },
      cookieS2Body:    { en: 'Essential cookies: Required for core functionality like authentication and session management. Preference cookies: Remember your language and theme settings. Analytics cookies: Help us understand how you use the platform to improve our services.', fr: 'Cookies essentiels : requis pour les fonctionnalit\u00E9s de base comme l\'authentification et la gestion de session. Cookies de pr\u00E9f\u00E9rence : m\u00E9morisent votre langue et vos param\u00E8tres de th\u00E8me. Cookies analytiques : nous aident \u00E0 comprendre comment vous utilisez la plateforme pour am\u00E9liorer nos services.', de: 'Essenzielle Cookies: Erforderlich f\u00FCr Kernfunktionen wie Authentifizierung und Session-Verwaltung. Pr\u00E4ferenz-Cookies: Speichern Sprache und Theme-Einstellungen. Analyse-Cookies: Helfen uns zu verstehen, wie Sie die Plattform nutzen, um unsere Dienste zu verbessern.', it: 'Cookie essenziali: necessari per funzionalit\u00E0 di base come autenticazione e gestione sessione. Cookie di preferenza: ricordano lingua e impostazioni tema. Cookie analitici: ci aiutano a capire come usi la piattaforma per migliorare i nostri servizi.', es: 'Cookies esenciales: necesarias para funciones b\u00E1sicas como autenticaci\u00F3n y gesti\u00F3n de sesiones. Cookies de preferencia: recuerdan tu idioma y configuraci\u00F3n de tema. Cookies anal\u00EDticas: nos ayudan a entender c\u00F3mo usas la plataforma para mejorar nuestros servicios.', ar: '\u0627\u0644\u0643\u0648\u0643\u064A\u0632 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629: \u0644\u0627\u0632\u0645\u0629 \u0644\u0644\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0645\u062B\u0644 \u0627\u0644\u0645\u0635\u0627\u062F\u0642\u0629 \u0648\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062C\u0644\u0633\u0627\u062A. \u0643\u0648\u0643\u064A\u0632 \u0627\u0644\u062A\u0641\u0636\u064A\u0644\u0627\u062A: \u062A\u062A\u0630\u0643\u0631 \u0644\u063A\u062A\u0643 \u0648\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0633\u0645\u0629. \u0627\u0644\u0643\u0648\u0643\u064A\u0632 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u064A\u0629: \u062A\u0633\u0627\u0639\u062F\u0646\u0627 \u0641\u064A \u0641\u0647\u0645 \u0643\u064A\u0641 \u062A\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0645\u0646\u0635\u0629 \u0644\u062A\u062D\u0633\u064A\u0646 \u062E\u062F\u0645\u0627\u062A\u0646\u0627.' },
      cookieS3Title:   { en: '3. Managing Cookies', fr: '3. Gestion des cookies', de: '3. Cookie-Verwaltung', it: '3. Gestione dei cookie', es: '3. Gesti\u00F3n de cookies', ar: '3. \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0643\u0648\u0643\u064A\u0632' },
      cookieS3Body:    { en: 'You can control and delete cookies through your browser settings. Note that disabling essential cookies may affect platform functionality. Most browsers allow you to refuse cookies while still letting you visit the site.', fr: 'Vous pouvez contr\u00F4ler et supprimer les cookies via les param\u00E8tres de votre navigateur. Notez que la d\u00E9sactivation des cookies essentiels peut affecter la fonctionnalit\u00E9 de la plateforme. La plupart des navigateurs vous permettent de refuser les cookies tout en visitant le site.', de: 'Sie k\u00F6nnen Cookies \u00FCber die Browsereinstellungen steuern und l\u00F6schen. Das Deaktivieren essenzieller Cookies kann die Plattformfunktionalit\u00E4t beeintr\u00E4chtigen. Die meisten Browser erlauben das Ablehnen von Cookies bei fortgesetztem Seitenbesuch.', it: 'Puoi controllare ed eliminare i cookie tramite le impostazioni del browser. Disabilitare i cookie essenziali pu\u00F2 influenzare la funzionalit\u00E0 della piattaforma. La maggior parte dei browser ti permette di rifiutare i cookie pur visitando il sito.', es: 'Puedes controlar y eliminar las cookies desde la configuraci\u00F3n de tu navegador. Ten en cuenta que desactivar cookies esenciales puede afectar la funcionalidad de la plataforma. La mayor\u00EDa de los navegadores permiten rechazar cookies y aun as\u00ED visitar el sitio.', ar: '\u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0633\u064A\u0637\u0631\u0629 \u0639\u0644\u0649 \u0627\u0644\u0643\u0648\u0643\u064A\u0632 \u0648\u062D\u0630\u0641\u0647\u0627 \u0639\u0628\u0631 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u062A\u0635\u0641\u062D. \u0644\u0627\u062D\u0638 \u0623\u0646 \u062A\u0639\u0637\u064A\u0644 \u0627\u0644\u0643\u0648\u0643\u064A\u0632 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0642\u062F \u064A\u0624\u062B\u0631 \u0639\u0644\u0649 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0646\u0635\u0629. \u062A\u0633\u0645\u062D \u0645\u0639\u0638\u0645 \u0627\u0644\u0645\u062A\u0635\u0641\u062D\u0627\u062A \u0628\u0631\u0641\u0636 \u0627\u0644\u0643\u0648\u0643\u064A\u0632 \u0645\u0639 \u0627\u0644\u0627\u0633\u062A\u0645\u0631\u0627\u0631 \u0641\u064A \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0642\u0639.' },
      cookieS4Title:   { en: '4. Third-Party Cookies', fr: '4. Cookies tiers', de: '4. Cookies von Drittanbietern', it: '4. Cookie di terze parti', es: '4. Cookies de terceros', ar: '4. \u0643\u0648\u0643\u064A\u0632 \u0623\u0637\u0631\u0627\u0641 \u062B\u0627\u0644\u062B\u0629' },
      cookieS4Body:    { en: 'We use Cloudflare for content delivery which may set its own cookies for security and performance. Our OAuth provider Valcorner may also set cookies during the authentication flow.', fr: 'Nous utilisons Cloudflare pour la diffusion de contenu qui peut d\u00E9finir ses propres cookies pour la s\u00E9curit\u00E9 et les performances. Notre fournisseur OAuth Valcorner peut \u00E9galement d\u00E9finir des cookies pendant le flux d\'authentification.', de: 'Wir nutzen Cloudflare f\u00FCr Content Delivery, das eigene Cookies f\u00FCr Sicherheit und Leistung setzen kann. Unser OAuth-Anbieter Valcorner kann w\u00E4hrend des Authentifizierungsablaufs ebenfalls Cookies setzen.', it: 'Utilizziamo Cloudflare per la distribuzione dei contenuti che potrebbe impostare cookie propri per sicurezza e prestazioni. Il nostro provider OAuth Valcorner potrebbe anch\'esso impostare cookie durante il flusso di autenticazione.', es: 'Usamos Cloudflare para la distribuci\u00F3n de contenido que puede establecer sus propias cookies para seguridad y rendimiento. Nuestro proveedor OAuth Valcorner tambi\u00E9n puede establecer cookies durante el flujo de autenticaci\u00F3n.', ar: '\u0646\u0633\u062A\u062E\u062F\u0645 Cloudflare \u0644\u062A\u0642\u062F\u064A\u0645 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0642\u062F \u064A\u0636\u0639 \u0643\u0648\u0643\u064A\u0632 \u062E\u0627\u0635\u0629 \u0628\u0647\u0627 \u0644\u0644\u0623\u0645\u0646 \u0648\u0627\u0644\u0623\u062F\u0627\u0621. \u0642\u062F \u064A\u0636\u0639 \u0645\u0642\u062F\u0645 OAuth \u0627\u0644\u062E\u0627\u0635 \u0628\u0646\u0627 Valcorner \u0623\u064A\u0636\u064B\u0627 \u0643\u0648\u0643\u064A\u0632 \u0623\u062B\u0646\u0627\u0621 \u0645\u0633\u0627\u0631 \u0627\u0644\u0645\u0635\u0627\u062F\u0642\u0629.' },
      cookieS5Title:   { en: '5. Updates to This Policy', fr: '5. Mises \u00E0 jour de cette politique', de: '5. Aktualisierungen dieser Richtlinie', it: '5. Aggiornamenti di questa politica', es: '5. Actualizaciones de esta pol\u00EDtica', ar: '5. \u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0647\u0630\u0647 \u0627\u0644\u0633\u064A\u0627\u0633\u0629' },
      cookieS5Body:    { en: 'We may update this Cookie Policy periodically. Changes are effective immediately upon posting. Where legally required, we will seek renewed consent for any material changes that affect the use of non-essential cookies.', fr: 'Nous pouvons mettre \u00E0 jour cette politique des cookies p\u00E9riodiquement. Les modifications entrent en vigueur d\u00E8s leur publication. Lorsque la loi l\u2019exige, nous demanderons un nouveau consentement pour tout changement important concernant les cookies non essentiels.', de: 'Wir k\u00F6nnen diese Cookie-Richtlinie regelm\u00E4\u00DFig aktualisieren. \u00C4nderungen treten sofort nach Ver\u00F6ffentlichung in Kraft. Wo rechtlich erforderlich, holen wir f\u00FCr wesentliche \u00C4nderungen, die nicht essentielle Cookies betreffen, eine neue Einwilligung ein.', it: 'Potremmo aggiornare periodicamente questa politica dei cookie. Le modifiche sono efficaci immediatamente dopo la pubblicazione. Dove obbligatorio per legge, chiederemo un nuovo consenso per modifiche sostanziali che incidano su cookie non essenziali.', es: 'Podemos actualizar esta pol\u00EDtica de cookies peri\u00F3dicamente. Los cambios son efectivos inmediatamente despu\u00E9s de su publicaci\u00F3n. Cuando la ley lo requiera, solicitaremos un nuevo consentimiento para cambios materiales que afecten al uso de cookies no esenciales.', ar: '\u0642\u062F \u0646\u0642\u0648\u0645 \u0628\u062A\u062D\u062F\u064A\u062B \u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u0643\u0648\u0643\u064A\u0632 \u0647\u0630\u0647 \u0645\u0646 \u062D\u064A\u0646 \u0644\u0622\u062E\u0631. \u062A\u062F\u062E\u0644 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u062D\u064A\u0632 \u0627\u0644\u0646\u0641\u0627\u0630 \u0645\u0628\u0627\u0634\u0631\u0629 \u0628\u0639\u062F \u0646\u0634\u0631\u0647\u0627. \u0639\u0646\u062F \u0627\u0644\u0627\u0644\u0632\u0627\u0645 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u060C \u0633\u0646\u0637\u0644\u0628 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0644\u0623\u064A \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0645\u0627\u062F\u064A\u0629 \u062A\u0624\u062B\u0631 \u0639\u0644\u0649 \u0627\u0644\u0643\u0648\u0643\u064A\u0632 \u063A\u064A\u0631 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629.' },
      cookieS6Title:   { en: '6. Cookie Registry & Consent', fr: '6. Registre des cookies et consentement', de: '6. Cookie-Verzeichnis & Einwilligung', it: '6. Registro dei cookie e consenso', es: '6. Registro de cookies y consentimiento', ar: '6. \u0633\u062C\u0644 \u0627\u0644\u0643\u0648\u0643\u064A\u0632 \u0648\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629' },
      cookieS6Body:    { en: 'The table below lists the cookies and similar local storage keys used on this platform. Essential items do not require consent and are always active. Your consent preferences are recorded locally in your browser. | Name / Key | Type | Purpose | Duration / Expiry | | \u2014 | \u2014 | \u2014 | \u2014 | | video_token (localStorage) | Essential | Stores your authenticated session token. | Deleted on sign out or by user. | | video_session (httpOnly Cookie, server-set) | Essential | Server-side session binding for authenticated requests. | Session / browser close. | | video_theme (localStorage) | Preference | Remembers your selected UI theme (light / dark / system). | Persistent until changed. | | video_lang (localStorage) | Preference | Remembers your selected user interface language. | Persistent until changed. | | video_pref_* (localStorage) | Preference | Remembers content filters and other personal settings. | Persistent until changed. | | video_agreedCookie (localStorage) | Essential | Records that you have accepted this Cookie Policy (bottom banner). | Persistent until cleared. | | Cloudflare \u2018__cf_bm\u2019 | Essential (third-party) | Bot management, security and performance by Cloudflare. | Controlled by Cloudflare (typically < 24 h). | | Cloudflare \u2018cf_clearance\u2019 | Essential (third-party) | Required to pass Cloudflare\u2019s challenge pages for DDoS protection. | Controlled by Cloudflare (typically < 1 h). | | Valcorner OAuth cookies | Essential (third-party) | Used only during Valcorner OAuth sign-in flow; no persistent tracking. | Session / OAuth flow close. | Where required by the ePrivacy Directive and applicable national law (e.g., EU, UK, Brazil LGPD, Indonesia PDP-Law, Thailand PDPA), you can exercise the right to withdraw or change your consent at any time by clearing browser storage for this site, which will cause the Cookie banner to reappear.', fr: 'Le tableau ci-dessous d\u00E9taille les cookies et cl\u00E9s de stockage local utilis\u00E9s. Les \u00E9l\u00E9ments essentiels sont toujours actifs. Vos pr\u00E9f\u00E9rences sont enregistr\u00E9es localement. | Nom / Cl\u00E9 | Type | Finalit\u00E9 | Dur\u00E9e | | \u2014 | \u2014 | \u2014 | \u2014 | | video_token | Essentiel | Jeton de session authentifi\u00E9. | Supprim\u00E9 \u00E0 la d\u00E9connexion. | | video_session | Essentiel | Session c\u00F4t\u00E9 serveur. | Fermeture du navigateur. | | video_theme | Pr\u00E9f\u00E9rence | Th\u00E8me d\u2019interface. | Persistant. | | video_lang | Pr\u00E9f\u00E9rence | Langue d\u2019interface. | Persistant. | | video_pref_* | Pr\u00E9f\u00E9rence | Filtres de contenu. | Persistant. | | video_agreedCookie | Essentiel | Consentement \u00E0 la pr\u00E9sente politique (banni\u00E8re). | Persistant. | | __cf_bm / cf_clearance | Essentiel (tiers) | S\u00E9curit\u00E9 Cloudflare. | G\u00E9r\u00E9 par Cloudflare. | | Cookies OAuth Valcorner | Essentiel (tiers) | Uniquement pendant le flux OAuth. | Session. | Vous pouvez \u00E0 tout moment retirer votre consentement en vidant le stockage local du navigateur.', de: 'Die folgende Liste listet alle Cookies und lokalen Schl\u00FCssel. Essenzielle Eintr\u00E4ge sind immer aktiv; Pr\u00E4ferenzen werden lokal gespeichert. | Name / Schl\u00FCssel | Typ | Zweck | Dauer | | \u2014 | \u2014 | \u2014 | \u2014 | | video_token | Essenziell | Authentifiziertes Session-Token. | Bei Abmeldung gel\u00F6scht. | | video_session | Essenziell | Serverseitige Session. | Browserende. | | video_theme | Pr\u00E4ferenz | UI-Theme. | Persistent. | | video_lang | Pr\u00E4ferenz | Sprache der Benutzeroberfl\u00E4che. | Persistent. | | video_pref_* | Pr\u00E4ferenz | Inhaltsfilter & Einstellungen. | Persistent. | | video_agreedCookie | Essenziell | Einwilligung (Banner). | Persistent. | | __cf_bm / cf_clearance | Essenziell (Drittanbieter) | Cloudflare-Sicherheit. | Verwaltet von Cloudflare. | | Valcorner OAuth-Cookies | Essenziell (Drittanbieter) | Nur w\u00E4hrend OAuth-Ablauf. | Sitzungsbezogen. | Widerruf ist jederzeit m\u00F6glich, indem Sie den lokalen Speicher leeren.', it: 'L\u2019elenco seguente dettaglia cookie e chiavi di memorizzazione locale usati. Gli elementi essenziali sono sempre attivi; le preferenze sono memorizzate nel browser. | Nome / Chiave | Tipo | Scopo | Durata | | \u2014 | \u2014 | \u2014 | \u2014 | | video_token | Essenziale | Token di sessione autenticata. | Cancellato al logout. | | video_session | Essenziale | Sessione lato server. | Chiusura browser. | | video_theme | Preferenza | Tema interfaccia. | Persistente. | | video_lang | Preferenza | Lingua interfaccia. | Persistente. | | video_pref_* | Preferenza | Filtri e preferenze. | Persistente. | | video_agreedCookie | Essenziale | Consenso alla presente politica (banner). | Persistente. | | __cf_bm / cf_clearance | Essenziale (terze parti) | Sicurezza Cloudflare. | Gestito da Cloudflare. | | Cookie OAuth Valcorner | Essenziale (terze parti) | Solo durante flusso OAuth. | Sessione. | \u00C8 possibile revocare il consenso in qualsiasi momento svuotando lo storage locale.', es: 'A continuaci\u00F3n se detallan las cookies y claves de almacenamiento local utilizadas. Los elementos esenciales siempre est\u00E1n activos. | Nombre / Clave | Tipo | Finalidad | Duraci\u00F3n | | \u2014 | \u2014 | \u2014 | \u2014 | | video_token | Esencial | Token de sesi\u00F3n autenticada. | Eliminado al cerrar sesi\u00F3n. | | video_session | Esencial | Sesi\u00F3n en servidor. | Cierre del navegador. | | video_theme | Preferencia | Tema visual. | Persistente. | | video_lang | Preferencia | Idioma de la interfaz. | Persistente. | | video_pref_* | Preferencia | Filtros de contenido. | Persistente. | | video_agreedCookie | Esencial | Consentimiento a esta pol\u00EDtica (banner). | Persistente. | | __cf_bm / cf_clearance | Esencial (tercero) | Seguridad Cloudflare. | Gestionado por Cloudflare. | | Cookies OAuth Valcorner | Esencial (tercero) | Solo durante flujo OAuth. | Sesi\u00F3n. | Puedes revocar el consentimiento borrando el almacenamiento local.', ar: '\u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u062A\u0627\u0644\u064A \u064A\u0633\u062C\u0644 \u0643\u0648\u0643\u064A\u0632 \u0648\u0645\u0641\u0627\u062A\u064A\u062D \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u062D\u0644\u064A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629: | \u0627\u0644\u0627\u0633\u0645 / \u0627\u0644\u0645\u0641\u062A\u0627\u062D | \u0627\u0644\u0646\u0648\u0639 | \u0627\u0644\u063A\u0631\u0636 | \u0645\u062F\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 | | \u2014 | \u2014 | \u2014 | \u2014 | | video_token | \u0623\u0633\u0627\u0633\u064A | \u0631\u0645\u0632 \u0627\u0644\u062C\u0644\u0633\u0629 \u0627\u0644\u0645\u0635\u062F\u0642 \u0628\u0647. | \u064A\u062A\u0645 \u062D\u0630\u0641\u0647 \u0639\u0646\u062F \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C. | | video_session | \u0623\u0633\u0627\u0633\u064A | \u062C\u0644\u0633\u0629 \u062C\u0627\u0646\u0628 \u0627\u0644\u062E\u0627\u062F\u0645. | \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u062A\u0635\u0641\u062D. | | video_theme | \u062A\u0641\u0636\u064A\u0644\u064A | \u0633\u0645\u0629 \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645. | \u062F\u0627\u0626\u0645 \u062D\u062A\u0649 \u0627\u0644\u062A\u063A\u064A\u064A\u0631. | | video_lang | \u062A\u0641\u0636\u064A\u0644\u064A | \u0644\u063A\u0629 \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645. | \u062F\u0627\u0626\u0645 \u062D\u062A\u0649 \u0627\u0644\u062A\u063A\u064A\u064A\u0631. | | video_pref_* | \u062A\u0641\u0636\u064A\u0644\u064A | \u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0648\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A. | \u062F\u0627\u0626\u0645 \u062D\u062A\u0649 \u0627\u0644\u062A\u063A\u064A\u064A\u0631. | | video_agreedCookie | \u0623\u0633\u0627\u0633\u064A | \u0633\u062C\u0644 \u0645\u0648\u0627\u0641\u0642\u062A\u0643 \u0628\u0647\u0630\u0647 \u0627\u0644\u0633\u064A\u0627\u0633\u0629 (\u0627\u0644\u0644\u0627\u0648\u062D\u0629 \u0627\u0644\u0633\u0641\u0644\u064A\u0629). | \u062F\u0627\u0626\u0645 \u062D\u062A\u0649 \u0627\u0644\u0645\u0633\u062D. | | __cf_bm / cf_clearance | \u0623\u0633\u0627\u0633\u064A (\u0637\u0631\u0641 \u062B\u0627\u0644\u062B) | \u0623\u0645\u0646 Cloudflare. | \u0645\u062F\u0627\u0631 \u0645\u0646 \u0642\u0628\u0644 Cloudflare. | | \u0643\u0648\u0643\u064A\u0632 Valcorner OAuth | \u0623\u0633\u0627\u0633\u064A (\u0637\u0631\u0641 \u062B\u0627\u0644\u062B) | \u0641\u0642\u0637 \u062E\u0644\u0627\u0644 \u0645\u0633\u0627\u0631 OAuth. | \u062C\u0644\u0633\u0629. | \u064A\u0645\u0643\u0646 \u0633\u062D\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0641\u064A \u0623\u064A \u0648\u0642\u062A \u0639\u0628\u0631 \u0645\u0633\u062D \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u062D\u0644\u064A.' },
    },

    consent: {
      bannerText:    { en: 'Please review and agree to our <a href="/terms.html" target="_blank">Terms of Service</a>, <a href="/privacy.html" target="_blank">Privacy Policy</a>, and <a href="/cookie.html" target="_blank">Cookie Policy</a>.', fr: 'Veuillez consulter et accepter nos <a href="/terms.html" target="_blank">Conditions d\'utilisation</a>, <a href="/privacy.html" target="_blank">Politique de confidentialit\u00E9</a> et <a href="/cookie.html" target="_blank">Politique Cookie</a>.', de: 'Bitte lesen und akzeptieren Sie unsere <a href="/terms.html" target="_blank">Nutzungsbedingungen</a>, <a href="/privacy.html" target="_blank">Datenschutzrichtlinie</a> und <a href="/cookie.html" target="_blank">Cookie-Richtlinie</a>.', it: 'Si prega di revisar e accettare i nostri <a href="/terms.html" target="_blank">Termini di Servizio</a>, <a href="/privacy.html" target="_blank">Informativa sulla Privacy</a> e <a href="/cookie.html" target="_blank">Informativa Cookie</a>.', es: 'Revise y acepte nuestros <a href="/terms.html" target="_blank">T\u00E9rminos de Servicio</a>, <a href="/privacy.html" target="_blank">Pol\u00EDtica de Privacidad</a> y <a href="/cookie.html" target="_blank">Pol\u00EDtica de Cookies</a>.', ar: '\u064A\u0631\u062C\u0649 \u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0642\u0628\u0648\u0644 <a href="/terms.html" target="_blank">\u0634\u0631\u0648\u0637 \u0627\u0644\u062E\u062F\u0645\u0629</a> و<a href="/privacy.html" target="_blank">\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629</a> و<a href="/cookie.html" target="_blank">\u0633\u064A\u0627\u0633\u0629 \u0643\u0648\u0643\u064A\u0632</a>.' },
      checkboxLabel: { en: 'I agree', fr: 'J\'accepte', de: 'Ich stimme zu', it: 'Accetto', es: 'Acepto', ar: '\u0623\u0648\u0627\u0641\u0642' },
      agreeBtn:      { en: 'Agree', fr: 'Accepter', de: 'Zustimmen', it: 'Accetta', es: 'Aceptar', ar: '\u0645\u0648\u0627\u0641\u0642\u0629' },
    },

    login: {
      signingIn:     { en: 'Signing in…', fr: 'Connexion…', de: 'Anmeldung…', it: 'Accesso in corso…', es: 'Iniciando sesión…', ar: '\u062C\u0627\u0631\u064A \u0627\u0644\u062F\u062E\u0648\u0644…' },
      failed:        { en: 'Login failed. Please try again.', fr: 'Échec de la connexion. Veuillez réessayer.', de: 'Anmeldung fehlgeschlagen. Bitte erneut versuchen.', it: 'Accesso non riuscito. Riprova.', es: 'Error al iniciar sesión. Inténtalo de nuevo.', ar: '\u0641\u0634\u0644 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.' },
      networkError:  { en: 'Network error. Please try again.', fr: 'Erreur réseau. Veuillez réessayer.', de: 'Netzwerkfehler. Bitte erneut versuchen.', it: 'Errore di rete. Riprova.', es: 'Error de red. Inténtalo de nuevo.', ar: '\u062E\u0637\u0623 \u0634\u0628\u0643\u0629\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.' },
    },

    loginAgreement: {
      title:         { en: 'Please review and accept', fr: 'Veuillez consulter et accepter', de: 'Bitte lesen und akzeptieren Sie', it: 'Si prega di leggere e accettare', es: 'Revise y acepte', ar: '\u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0644\u0642\u0628\u0648\u0644' },
      subtitle:      { en: 'To continue using our service, you must agree to the following:', fr: 'Pour continuer à utiliser notre service, vous devez accepter :', de: 'Um unseren Dienst weiterhin nutzen zu können, stimmen Sie bitte Folgendem zu:', it: 'Per continuare a utilizzare il nostro servizio, è necessario accettare:', es: 'Para seguir usando nuestro servicio, debe aceptar lo siguiente:', ar: '\u0644\u0627\u0633\u062A\u0645\u0631\u0627\u0631 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062E\u062F\u0645\u062A\u0646\u0627\u060C \u064A\u062C\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u062A\u0627\u0644\u064A:' },
      termsLabel:    { en: 'I have read and agree to the <a href="/terms.html" target="_blank">Terms of Service</a>', fr: 'J\'ai lu et j\'accepte les <a href="/terms.html" target="_blank">Conditions d\'utilisation</a>', de: 'Ich habe die <a href="/terms.html" target="_blank">Nutzungsbedingungen</a> gelesen und stimme ihnen zu', it: 'Ho letto e accetto i <a href="/terms.html" target="_blank">Termini di Servizio</a>', es: 'He leído y acepto los <a href="/terms.html" target="_blank">Términos de Servicio</a>', ar: '\u0644\u0642\u062F \u0642\u0631\u0623\u062A \u0648\u0623\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 <a href="/terms.html" target="_blank">\u0634\u0631\u0648\u0637 \u0627\u0644\u062E\u062F\u0645\u0629</a>' },
      privacyLabel:  { en: 'I have read and agree to the <a href="/privacy.html" target="_blank">Privacy Policy</a>', fr: 'J\'ai lu et j\'accepte la <a href="/privacy.html" target="_blank">Politique de confidentialité</a>', de: 'Ich habe die <a href="/privacy.html" target="_blank">Datenschutzrichtlinie</a> gelesen und stimme ihr zu', it: 'Ho letto e accetto la <a href="/privacy.html" target="_blank">Informativa sulla Privacy</a>', es: 'He leído y acepto la <a href="/privacy.html" target="_blank">Política de Privacidad</a>', ar: '\u0644\u0642\u062F \u0642\u0631\u0623\u062A \u0648\u0623\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 <a href="/privacy.html" target="_blank">\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629</a>' },
      cancel:        { en: 'Cancel', fr: 'Annuler', de: 'Abbrechen', it: 'Annulla', es: 'Cancelar', ar: '\u0625\u0644\u063A\u0627\u0621' },
      agree:         { en: 'Agree & Continue', fr: 'Accepter et continuer', de: 'Zustimmen & Weiter', it: 'Accetta e continua', es: 'Aceptar y continuar', ar: '\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0648\u0627\u0644\u0627\u0633\u062A\u0645\u0631\u0627\u0631' },
      submitting:    { en: 'Submitting…', fr: 'Envoi…', de: 'Wird gesendet…', it: 'Invio…', es: 'Enviando…', ar: '\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0631\u0633\u0627\u0644…' },
      submitError:   { en: 'Failed to record agreement. Please try again.', fr: 'Échec de l\'enregistrement. Veuillez réessayer.', de: 'Speichern fehlgeschlagen. Bitte erneut versuchen.', it: 'Salvataggio non riuscito. Riprova.', es: 'Error al registrar el acuerdo. Inténtalo de nuevo.', ar: '\u0641\u0634\u0644 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.' },
      networkError:  { en: 'Network error. Please try again.', fr: 'Erreur réseau. Veuillez réessayer.', de: 'Netzwerkfehler. Bitte erneut versuchen.', it: 'Errore di rete. Riprova.', es: 'Error de red. Inténtalo de nuevo.', ar: '\u062E\u0637\u0623 \u0634\u0628\u0643\u0629\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.' },
    },

    cookieBanner: {
      text:          { en: 'We use cookies to enhance your browsing experience. Please review and accept our <a href="/cookie.html" target="_blank">Cookie Policy</a>.', fr: 'Nous utilisons des cookies pour améliorer votre expérience. Veuillez consulter et accepter notre <a href="/cookie.html" target="_blank">Politique Cookie</a>.', de: 'Wir verwenden Cookies zur Verbesserung Ihres Erlebnisses. Bitte lesen und akzeptieren Sie unsere <a href="/cookie.html" target="_blank">Cookie-Richtlinie</a>.', it: 'Utilizziamo cookie per migliorare la tua esperienza. Si prega di leggere e accettare la nostra <a href="/cookie.html" target="_blank">Informativa Cookie</a>.', es: 'Usamos cookies para mejorar tu experiencia. Revisa y acepta nuestra <a href="/cookie.html" target="_blank">Política de Cookies</a>.', ar: '\u0646\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0643\u0648\u0643\u064A\u0632 \u0644\u062A\u062D\u0633\u064A\u0646 \u062A\u062C\u0631\u0628\u0629 \u0627\u0644\u062A\u0635\u0641\u062D. \u064A\u0631\u062C\u0649 \u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0642\u0628\u0648\u0644 <a href="/cookie.html" target="_blank">\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u0643\u0648\u0643\u064A\u0632</a>.' },
      agree:         { en: 'Accept Cookies', fr: 'Accepter les cookies', de: 'Cookies akzeptieren', it: 'Accetta cookie', es: 'Aceptar cookies', ar: '\u0642\u0628\u0648\u0644 \u0627\u0644\u0643\u0648\u0643\u064A\u0632' },
      submitting:    { en: 'Saving…', fr: 'Enregistrement…', de: 'Speichern…', it: 'Salvataggio…', es: 'Guardando…', ar: '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638…' },
    },

    settings: {
      // ── Page header ────────────────────────────────────────────────────────
      pageTitle:       { en: 'Settings', fr: 'Param\u00E8tres', de: 'Einstellungen', it: 'Impostazioni', es: 'Configuraci\u00F3n', ar: '\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A' },
      pageSubtitle:    { en: 'Manage your account and preferences', fr: 'G\u00E9rez votre compte et vos pr\u00E9f\u00E9rences', de: 'Verwalten Sie Ihr Konto und Ihre Einstellungen', it: 'Gestisci il tuo account e le tue preferenze', es: 'Gestiona tu cuenta y tus preferencias', ar: '\u0625\u062F\u0627\u0631\u0629 \u062D\u0633\u0627\u0628\u0643 \u0648\u062A\u0641\u0636\u064A\u0644\u0627\u062A\u0643' },
      loginRequired:   { en: 'Please log in to access settings', fr: 'Veuillez vous connecter pour acc\u00E9der aux param\u00E8tres', de: 'Bitte loggen Sie sich ein, um die Einstellungen zu \u00F6ffnen', it: 'Accedi per visualizzare le impostazioni', es: 'Inicia sesi\u00F3n para acceder a la configuraci\u00F3n', ar: '\u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A' },
      loginBtn:        { en: 'Log in', fr: 'Se connecter', de: 'Einloggen', it: 'Accedi', es: 'Iniciar sesi\u00F3n', ar: '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644' },
      saved:           { en: 'Saved!', fr: 'Enregistr\u00E9 !', de: 'Gespeichert!', it: 'Salvato!', es: '\u00A1Guardado!', ar: '\u062A\u0645 \u0627\u0644\u062D\u0641\u0638!' },
      saveError:       { en: 'Error saving', fr: 'Erreur lors de l\'enregistrement', de: 'Speicherfehler', it: 'Errore di salvataggio', es: 'Error al guardar', ar: '\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0641\u0638' },

      // ── Account section ────────────────────────────────────────────────────
      accountTitle:    { en: 'Account', fr: 'Compte', de: 'Konto', it: 'Account', es: 'Cuenta', ar: '\u0627\u0644\u062D\u0633\u0627\u0628' },
      accountName:     { en: 'Name', fr: 'Nom', de: 'Name', it: 'Nome', es: 'Nombre', ar: '\u0627\u0644\u0627\u0633\u0645' },
      accountEmail:    { en: 'Email', fr: 'E-mail', de: 'E-Mail', it: 'Email', es: 'Correo', ar: '\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A' },
      accountRole:     { en: 'Plan', fr: 'Forfait', de: 'Plan', it: 'Piano', es: 'Plan', ar: '\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C' },
      accountJoined:   { en: 'Joined', fr: 'Inscription', de: 'Beitritt', it: 'Iscritto il', es: 'Fecha de registro', ar: '\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u0636\u0645\u0627\u0645' },
      accountBio:      { en: 'Bio', fr: 'Biographie', de: 'Bio', it: 'Biografia', es: 'Biograf\u00EDa', ar: '\u0627\u0644\u0646\u0628\u0630\u0629 \u0627\u0644\u0630\u0627\u062A\u064A\u0629' },
      accountBioPh:    { en: 'Tell the world about yourself...', fr: 'Parlez de vous au monde...', de: 'Erz\u00E4hlen Sie der Welt von sich...', it: 'Racconta qualcosa di te...', es: 'Cu\u00E9ntale al mundo sobre ti...', ar: '\u0623\u062E\u0628\u0631 \u0627\u0644\u0639\u0627\u0644\u0645 \u062D\u0648\u0644 \u0646\u0641\u0633\u0643...' },
      accountSave:     { en: 'Save changes', fr: 'Enregistrer', de: '\u00C4nderungen speichern', it: 'Salva modifiche', es: 'Guardar cambios', ar: '\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A' },
      accountSaved:    { en: 'Profile saved', fr: 'Profil enregistr\u00E9', de: 'Profil gespeichert', it: 'Profilo salvato', es: 'Perfil guardado', ar: '\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A' },

      // ── Appearance section ─────────────────────────────────────────────────
      appearTitle:     { en: 'Appearance', fr: 'Apparence', de: 'Darstellung', it: 'Aspetto', es: 'Apariencia', ar: '\u0627\u0644\u0645\u0638\u0647\u0631' },
      themeTitle:      { en: 'Theme', fr: 'Th\u00E8me', de: 'Thema', it: 'Tema', es: 'Tema', ar: '\u0627\u0644\u0633\u0645\u0629' },
      themeAuto:       { en: 'Auto (system)', fr: 'Auto (syst\u00E8me)', de: 'Auto (System)', it: 'Auto (sistema)', es: 'Auto (sistema)', ar: '\u062A\u0644\u0642\u0627\u0626\u064A (\u0627\u0644\u0646\u0638\u0627\u0645)' },
      themeDark:       { en: 'Dark', fr: 'Sombre', de: 'Dunkel', it: 'Scuro', es: 'Oscuro', ar: '\u062F\u0627\u0643\u0646' },
      themeLight:      { en: 'Light', fr: 'Clair', de: 'Hell', it: 'Chiaro', es: 'Claro', ar: '\u0641\u0627\u062A\u062D' },

      // ── Language section ───────────────────────────────────────────────────
      langTitle:       { en: 'Language', fr: 'Langue', de: 'Sprache', it: 'Lingua', es: 'Idioma', ar: '\u0627\u0644\u0644\u063A\u0629' },
      langDesc:        { en: 'Preferred display language for the platform', fr: 'Langue d\'affichage pr\u00E9f\u00E9r\u00E9e de la plateforme', de: 'Bevorzugte Anzeigesprache der Plattform', it: 'Lingua di visualizzazione preferita della piattaforma', es: 'Idioma de visualizaci\u00F3n preferido de la plataforma', ar: '\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0645\u0641\u0636\u0644\u0629 \u0644\u0644\u0645\u0646\u0635\u0629' },

      // ── Notifications section ──────────────────────────────────────────────
      notifTitle:      { en: 'Notifications', fr: 'Notifications', de: 'Benachrichtigungen', it: 'Notifiche', es: 'Notificaciones', ar: '\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A' },
      notifEmail:      { en: 'Email notifications', fr: 'Notifications par e-mail', de: 'E-Mail-Benachrichtigungen', it: 'Notifiche via email', es: 'Notificaciones por correo', ar: '\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A' },
      notifEmailDesc:  { en: 'Receive updates about new content, replies, and features', fr: 'Recevez des mises \u00E0 jour sur les nouveaux contenus, r\u00E9ponses et fonctionnalit\u00E9s', de: 'Updates zu neuen Inhalten, Antworten und Funktionen erhalten', it: 'Ricevi aggiornamenti su nuovi contenuti, risposte e funzionalit\u00E0', es: 'Recibe actualizaciones de nuevos contenidos, respuestas y funciones', ar: '\u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u062D\u0648\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062C\u062F\u064A\u062F \u0648\u0627\u0644\u0631\u062F\u0648\u062F \u0648\u0627\u0644\u0645\u064A\u0632\u0627\u062A' },
      notifPush:       { en: 'Push notifications', fr: 'Notifications push', de: 'Push-Benachrichtigungen', it: 'Notifiche push', es: 'Notificaciones push', ar: '\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u062F\u0641\u0639' },
      notifPushDesc:   { en: 'Show browser notifications when the page is open', fr: 'Afficher les notifications du navigateur lorsque la page est ouverte', de: 'Browser-Benachrichtigungen bei ge\u00F6ffneter Seite anzeigen', it: 'Mostra notifiche del browser quando la pagina \u00E8 aperta', es: 'Mostrar notificaciones del navegador cuando la p\u00E1gina est\u00E1 abierta', ar: '\u0639\u0631\u0636 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0639\u0646\u062F \u0641\u062A\u062D \u0627\u0644\u0635\u0641\u062D\u0629' },
      notifNewVideo:   { en: 'New videos from followed users', fr: 'Nouvelles vid\u00E9os des utilisateurs suivis', de: 'Neue Videos von verfolgten Nutzern', it: 'Nuovi video dagli utenti seguiti', es: 'Videos nuevos de usuarios seguidos', ar: '\u0641\u064A\u062F\u064A\u0648\u0647\u0627\u062A \u062C\u062F\u064A\u062F\u0629 \u0645\u0646 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0627\u0644\u0630\u064A\u0646 \u062A\u062A\u0628\u0639\u0647\u0645' },
      notifNewVideoDesc:{en: 'Alerts when creators you follow upload new content', fr: 'Alertes quand vos cr\u00E9ateurs suivis publient du nouveau contenu', de: 'Benachrichtigungen, wenn verfolgte Ersteller neue Inhalte hochladen', it: 'Avvisi quando i creatori che segui caricano nuovi contenuti', es: 'Alertas cuando los creadores que sigues suben contenido nuevo', ar: '\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0639\u0646\u062F \u0631\u0641\u0639 \u0627\u0644\u0645\u0646\u0634\u0626\u064A\u0646 \u0627\u0644\u0630\u064A\u0646 \u062A\u062A\u0628\u0639\u0647\u0645 \u0645\u062D\u062A\u0648\u0649 \u062C\u062F\u064A\u062F' },

      // ── Privacy section ────────────────────────────────────────────────────
      privacyTitle:    { en: 'Privacy', fr: 'Confidentialit\u00E9', de: 'Datenschutz', it: 'Privacy', es: 'Privacidad', ar: '\u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629' },
      privacyPublic:   { en: 'Public profile', fr: 'Profil public', de: 'Gemeinsames \u00F6ffentliches Profil', it: 'Profilo pubblico', es: 'Perfil p\u00FAblico', ar: '\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A \u0627\u0644\u0639\u0627\u0645' },
      privacyPublicDesc:{en: 'Allow other users to find and view your profile', fr: 'Permettre aux autres utilisateurs de trouver et consulter votre profil', de: 'Anderen Nutzern erlauben, Ihr Profil zu finden und anzusehen', it: 'Permetti ad altri utenti di trovare e vedere il tuo profilo', es: 'Permitir a otros usuarios encontrar y ver tu perfil', ar: '\u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0627\u0644\u0622\u062E\u0631\u064A\u0646 \u0628\u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0644\u0641\u0643 \u0627\u0644\u0634\u062E\u0635\u064A \u0648\u0639\u0631\u0636\u0647' },
      privacyHistory:  { en: 'Save watch history', fr: 'Sauvegarder l\'historique', de: 'Wiedergabeverlauf speichern', it: 'Salva cronologia visualizzazioni', es: 'Guardar historial de reproducci\u00F3n', ar: '\u062D\u0641\u0638 \u0633\u062C\u0644 \u0627\u0644\u0645\u0634\u0627\u0647\u062F\u0629' },
      privacyHistoryDesc:{en: 'Store watch history for recommendations', fr: 'Stocker l\'historique pour des recommandations personnalis\u00E9es', de: 'Verlauf f\u00FCr Empfehlungen speichern', it: 'Memorizza la cronologia per i consigli', es: 'Almacenar historial para recomendaciones', ar: '\u062E\u0632\u0646 \u0633\u062C\u0644 \u0627\u0644\u0645\u0634\u0627\u0647\u062F\u0629 \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u062A\u0648\u0635\u064A\u0627\u062A \u0645\u062E\u0635\u0635\u0629' },
      privacyClearHistory:{en: 'Clear watch history', fr: 'Effacer l\'historique', de: 'Verlauf l\u00F6schen', it: 'Cancella cronologia', es: 'Borrar historial', ar: '\u0645\u0633\u062D \u0633\u062C\u0644 \u0627\u0644\u0645\u0634\u0627\u0647\u062F\u0629' },
      privacyLegal:    { en: 'Legal', fr: 'Mentions l\u00E9gales', de: 'Rechtliches', it: 'Note legali', es: 'Aspectos legales', ar: '\u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629' },
      privacyPolicy:   { en: 'Privacy Policy', fr: 'Politique de confidentialit\u00E9', de: 'Datenschutzrichtlinie', it: 'Informativa sulla privacy', es: 'Pol\u00EDtica de privacidad', ar: '\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629' },
      privacyTerms:    { en: 'Terms of Service', fr: "Conditions d'utilisation", de: 'Nutzungsbedingungen', it: 'Termini di servizio', es: 'T\u00E9rminos de servicio', ar: '\u0634\u0631\u0648\u0637 \u0627\u0644\u062E\u062F\u0645\u0629' },
      privacyCookie:   { en: 'Cookie Policy', fr: 'Politique des cookies', de: 'Cookie-Richtlinie', it: 'Politica dei cookie', es: 'Pol\u00EDtica de cookies', ar: '\u0633\u064A\u0627\u0633\u0629 \u0643\u0648\u0643\u064A\u0632' },

      // ── Danger zone ────────────────────────────────────────────────────────
      dangerTitle:     { en: 'Danger Zone', fr: 'Zone dangereuse', de: 'Gefahrenzone', it: 'Zona rischio', es: 'Zona de peligro', ar: '\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u062E\u0637\u0631' },
      dangerLogout:    { en: 'Log out from all devices', fr: 'D\u00E9connexion de tous les appareils', de: 'Von allen Ger\u00E4ten abmelden', it: 'Esci da tutti i dispositivi', es: 'Cerrar sesi\u00F3n en todos los dispositivos', ar: '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C \u0645\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u062C\u0647\u0632\u0629' },
      dangerLogoutBtn: { en: 'Log out everywhere', fr: 'D\u00E9connecter partout', de: 'Berall abmelden', it: 'Esci ovunque', es: 'Cerrar sesi\u00F3n en todos lados', ar: '\u0627\u0644\u062E\u0631\u0648\u062C \u0645\u0646 \u0641\u064A \u0643\u0644 \u0645\u0643\u0627\u0646' },
      dangerDelete:    { en: 'Delete account', fr: 'Supprimer le compte', de: 'Konto l\u00F6schen', it: 'Elimina account', es: 'Eliminar cuenta', ar: '\u062D\u0630\u0641 \u0627\u0644\u062D\u0633\u0627\u0628' },
      dangerDeleteBtn: { en: 'Delete my account', fr: 'Supprimer mon compte', de: 'Mein Konto l\u00F6schen', it: 'Elimina il mio account', es: 'Eliminar mi cuenta', ar: '\u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u064A' },
    },
  };

  // ── Category names ────────────────────────────────────────────────────────
  const categoryNames = {
    short_drama: { en: 'Short Dramas', fr: 'Court-m\u00E9trages', de: 'Kurzfilme', it: 'Cortometraggi', es: 'Cortos', ar: '\u0642\u0635\u064A\u0631\u0629' },
    tv_series:   { en: 'TV Series',   fr: 'S\u00E9ries TV',       de: 'TV-Serien',   it: 'Serie TV',    es: 'Series',      ar: '\u0633\u0644\u0633\u0644\u064A\u0627\u062A' },
    movie:       { en: 'Movies',      fr: 'Films',               de: 'Filme',       it: 'Film',        es: 'Pel\u00EDculas',ar: '\u0623\u0641\u0644\u0627\u0645' },
    ugc_long_video: { en: 'UGC',      fr: 'UGC',                de: 'UGC',         it: 'UGC',         es: 'UGC',         ar: '\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646' },
    short_video: { en: 'Short Videos', fr: 'Courtes vid\u00E9os', de: 'Kurzvideos',  it: 'Video brevi', es: 'Videos cortos', ar: '\u0641\u064A\u062F\u064A\u0648\u0647\u0627\u062A' },
  };
  TRANSLATIONS.category = categoryNames;

  TRANSLATIONS.admin = {
    pageTitle:      { en: 'Admin — Video', fr: 'Admin — Video', de: 'Admin — Video', it: 'Admin — Video', es: 'Admin — Video', ar: 'الإدارة — Video' },
    pageTitleShort: { en: 'Admin', fr: 'Admin', de: 'Admin', it: 'Admin', es: 'Admin', ar: 'الإدارة' },
    title:          { en: 'Admin — User Management', fr: 'Admin — Gestion des Utilisateurs', de: 'Admin — Benutzerverwaltung', it: 'Admin — Gestione Utenti', es: 'Admin — Gestión de Usuarios', ar: 'الإدارة — إدارة المستخدمين' },
    colAvatar:      { en: '', fr: '', de: '', it: '', es: '', ar: '' },
    colUser:        { en: 'User', fr: 'Utilisateur', de: 'Benutzer', it: 'Utente', es: 'Usuario', ar: 'المستخدم' },
    colRole:        { en: 'Role', fr: 'Rôle', de: 'Rolle', it: 'Ruolo', es: 'Rol', ar: 'الدور' },
    colJoined:      { en: 'Joined', fr: 'Inscrit', de: 'Beigetreten', it: 'Iscritto', es: 'Se unió', ar: 'انضم' },
    colUpdated:     { en: 'Updated', fr: 'Modifié', de: 'Aktualisiert', it: 'Aggiornato', es: 'Actualizado', ar: 'مُحدَّث' },
    colChangeRole:  { en: 'Change Role', fr: 'Changer le Rôle', de: 'Rolle ändern', it: 'Cambia Ruolo', es: 'Cambiar Rol', ar: 'تغيير الدور' },
    colTitle:       { en: 'Title' },
    colType:        { en: 'Type' },
    colStatus:      { en: 'Status' },
    colUploader:    { en: 'Uploader' },
    colDuration:    { en: 'Duration' },
    colSize:        { en: 'Size' },
    colCreated:     { en: 'Created' },
    colActions:     { en: 'Actions' },
    save:           { en: 'Save', fr: 'Enregistrer', de: 'Speichern', it: 'Salva', es: 'Guardar', ar: 'حفظ' },
    saving:         { en: 'Saving…', fr: 'Enregistrement…', de: 'Speichern…', it: 'Salvataggio…', es: 'Guardando…', ar: 'جارٍ الحفظ…' },
    saved:          { en: 'Saved', fr: 'Enregistré', de: 'Gespeichert', it: 'Salvato', es: 'Guardado', ar: 'تم الحفظ' },
    loading:        { en: 'Loading…', fr: 'Chargement…', de: 'Laden…', it: 'Caricamento…', es: 'Cargando…', ar: 'جارٍ التحميل…' },
    empty:          { en: 'No users found.', fr: 'Aucun utilisateur trouvé.', de: 'Keine Benutzer gefunden.', it: 'Nessun utente trovato.', es: 'Ningún usuario encontrado.', ar: 'لم يتم العثور على مستخدمين.' },
    error:          { en: 'Failed to load users', fr: 'Échec du chargement', de: 'Laden fehlgeschlagen', it: 'Caricamento fallito', es: 'Error al cargar', ar: 'فشل التحميل' },
    accessDenied:   { en: 'Access denied. Admins only.', fr: 'Accès refusé. Administrateurs uniquement.', de: 'Zugriff verweigert. Nur Admins.', it: 'Accesso negato. Solo amministratori.', es: 'Acceso denegado. Solo administradores.', ar: 'وصول مرفوض. للمسؤولين فقط.' },
    roleSaveFailed: { en: 'Failed to update role: {error}', fr: 'Échec de la mise à jour du rôle : {error}', de: 'Rollenaktualisierung fehlgeschlagen: {error}', it: 'Aggiornamento ruolo fallito: {error}', es: 'Error al actualizar el rol: {error}', ar: 'فشل تحديث الدور: {error}' },
    paginationInfo: { en: 'Page {page} / {total}  ({count} users)', fr: 'Page {page} / {total}  ({count} utilisateurs)', de: 'Seite {page} / {total}  ({count} Benutzer)', it: 'Pagina {page} / {total}  ({count} utenti)', es: 'Página {page} / {total}  ({count} usuarios)', ar: 'صفحة {page} / {total}  ({count} مستخدمين)' },
  };

  let currentLang = 'en';
  const _langChangeCallbacks = [];

  // ── Core functions ────────────────────────────────────────────────────────
  function getLang() {
    const stored = localStorage.getItem('video_lang');
    if (stored && LANGUAGES[stored]) return stored;
    const browser = (navigator.language || 'en').slice(0, 2);
    return LANGUAGES[browser] ? browser : 'en';
  }

  function t(key, params) {
    const parts = key.split('.');
    let obj = TRANSLATIONS;
    for (const p of parts) { obj = obj[p]; if (!obj) return key; }
    let str = obj[currentLang] || obj.en || key;
    if (params) {
      Object.keys(params).forEach(k => { str = str.replace(new RegExp('\\{\\{' + k + '\\}\\}', 'g'), params[k]); });
    }
    return str;
  }

  function setLang(lang) {
    if (!LANGUAGES[lang]) return;
    currentLang = lang;
    localStorage.setItem('video_lang', lang);
    const rtl = LANGUAGES[lang].rtl;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    applyTranslations();
    renderLanguageSelector();
    _langChangeCallbacks.forEach(fn => fn(lang));
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (key === 'consent.bannerText') {
        el.innerHTML = t(key);
      } else {
        el.textContent = t(key);
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = t(el.dataset.i18nTitle);
    });
    const titleEl = document.querySelector('title');
    if (titleEl && !titleEl.hasAttribute('data-i18n')) {
      titleEl.textContent = t('meta.title');
    }
  }

  // ── Language selector ─────────────────────────────────────────────────────
  function buildLanguageSelector() {
    const btn = document.getElementById('langBtn');
    const dropdown = document.getElementById('langDropdown');
    if (!btn || !dropdown) return;

    dropdown.addEventListener('click', (e) => e.stopPropagation());

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });

    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        setLang(opt.dataset.lang);
        dropdown.classList.remove('show');
      });
    });
  }

  function renderLanguageSelector() {
    const btn = document.getElementById('langBtn');
    if (!btn) return;
    const lang = LANGUAGES[currentLang];
    if (!lang) return;
    btn.innerHTML = `${lang.flag} ${lang.label}`;
    btn.title = 'Change language';
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === currentLang);
      const label = opt.dataset.langLabel || lang.label;
      const flag = opt.dataset.lang === currentLang ? lang.flag : LANGUAGES[opt.dataset.lang]?.flag || '';
      opt.innerHTML = `<span>${flag}</span> ${label}`;
    });
  }

  // ── Expose ────────────────────────────────────────────────────────────────
  function init() {
    setLang(getLang());
  }
  window.i18n = {
    t, setLang, getLang, currentLang: () => currentLang, categoryNames, LANGUAGES,
    onLangChange: (fn) => _langChangeCallbacks.push(fn),
    init, applyTranslations,
  };
  window.t = t;

  // ── Boot ─────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    setLang(getLang());
    buildLanguageSelector();
  });
})();
