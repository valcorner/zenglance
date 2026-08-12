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
      search: { en: 'Search users…', fr: 'Rechercher…', de: 'Suchen…', it: 'Cerca…', es: 'Buscar…', ar: '\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646…' },
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
      cancel: { en: 'Cancel', fr: 'Annuler', de: 'Abbrechen', it: 'Annulla', es: 'Annulla', ar: '\u0625\u0644\u063A\u0627\u0621' },
      loadMore: { en: 'Load More', fr: 'Charger plus', de: 'Mehr laden', it: 'Carica altro', es: 'Cargar más', ar: '\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0632\u064A\u062F' },
      followers: { en: 'Followers', fr: 'Abonn\u00E9s', de: 'Follower', it: 'Follower', es: 'Seguidores', ar: '\u0627\u0644\u062C\u0645\u064A\u0639' },
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
      privacyS6Body:   { en: 'If you have questions about this Privacy Policy, please contact us through the platform\'s support channels.', fr: 'Si vous avez des questions sur cette politique de confidentialit\u00E9, veuillez nous contacter via les canaux de support de la plateforme.', de: 'Bei Fragen zu dieser Datenschutzrichtlinie kontaktieren Sie uns bitte \u00FCber die Support-Kan\u00E4le der Plattform.', it: 'Per domande su questa informativa sulla privacy, contattaci tramite i canali di supporto della piattaforma.', es: 'Si tienes preguntas sobre esta pol\u00EDtica de privacidad, cont\u00E1ctanos a trav\u00E9s de los canales de soporte de la plataforma.', ar: '\u0625\u0630\u0627 \u0643\u0627\u0646\u062A \u0644\u062F\u064A\u0643 \u0623\u0633\u0626\u0644\u0629 \u062D\u0648\u0644 \u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629 \u0647\u0630\u0647\u060C \u064A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0639\u0628\u0631 \u0642\u0646\u0648\u0627\u062A \u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0645\u0646\u0635\u0629.' },

      // ── Terms of Service ────────────────────────────────────────────────────
      termsTitle:      { en: 'Terms of Service', fr: "Conditions d'utilisation", de: 'Nutzungsbedingungen', it: 'Termini di servizio', es: 'T\u00E9rminos de servicio', ar: '\u0634\u0631\u0648\u0637 \u0627\u0644\u062E\u062F\u0645\u0629' },
      termsIntro:      { en: 'These Terms of Service govern your use of the Video platform. By accessing or using our services, you agree to be bound by these terms.', fr: "Ces conditions d'utilisation r\u00E9gissent votre utilisation de la plateforme Video. En acc\u00E9dant ou en utilisant nos services, vous acceptez d'\u00EAtre li\u00E9 par ces conditions.", de: 'Diese Nutzungsbedingungen regeln Ihre Nutzung der Video-Plattform. Durch den Zugriff auf oder die Nutzung unserer Dienste erkl\u00E4ren Sie sich mit diesen Bedingungen einverstanden.', it: 'Questi Termini di servizio regolano l\'utilizzo della piattaforma Video. Accedendo o utilizzando i nostri servizi, accetti di essere vincolato da questi termini.', es: 'Estos T\u00E9rminos de servicio rigen tu uso de la plataforma Video. Al acceder o usar nuestros servicios, aceptas estar sujeto a estos t\u00E9rminos.', ar: '\u062A\u062D\u0643\u0645 \u0634\u0631\u0648\u0637 \u0627\u0644\u062E\u062F\u0645\u0629 \u0647\u0630\u0647 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0643 \u0644\u0645\u0646\u0635\u0629 Video. \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u062E\u062F\u0645\u0627\u062A\u0646\u0627 \u0623\u0648 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647\u0627\u060C \u062A\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 \u0627\u0644\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0648\u0637.' },
      termsS1Title:    { en: '1. Account Registration', fr: "1. Inscription au compte", de: '1. Kontoregistrierung', it: '1. Registrazione dell\'account', es: '1. Registro de cuenta', ar: '1. \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0628' },
      termsS1Body:     { en: 'You must provide accurate and complete information when registering. You are responsible for maintaining the security of your account and for all activities that occur under your account. You must be at least 13 years old to use this service.', fr: 'Vous devez fournir des informations exactes et compl\u00E8tes lors de l\'inscription. Vous \u00EAtes responsable du maintien de la s\u00E9curit\u00E9 de votre compte et de toutes les activit\u00E9s qui s\'y d\u00E9roulent. Vous devez avoir au moins 13 ans pour utiliser ce service.', de: 'Sie m\u00FCssen bei der Registrierung korrekte und vollst\u00E4ndige Angaben machen. Sie sind f\u00FCr die Sicherheit Ihres Kontos und alle Aktivit\u00E4ten darunter verantwortlich. Sie m\u00FCssen mindestens 13 Jahre alt sein, um diesen Dienst zu nutzen.', it: 'Devi fornire informazioni accurate e complete durante la registrazione. Sei responsabile della sicurezza del tuo account e di tutte le attivit\u00E0 che vi si svolgono. Devi avere almeno 13 anni per utilizzare questo servizio.', es: 'Debes proporcionar informaci\u00F3n precisa y completa al registrarte. Eres responsable de mantener la seguridad de tu cuenta y de todas las actividades que ocurran en ella. Debes tener al menos 13 a\u00F1os para usar este servicio.', ar: '\u064A\u062C\u0628 \u062A\u0642\u062F\u064A\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u062F\u0642\u064A\u0642\u0629 \u0648\u0643\u0627\u0645\u0644\u0629 \u0639\u0646\u062F \u0627\u0644\u062A\u0633\u062C\u064A\u0644. \u0623\u0646\u062A \u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u0623\u0645\u0646 \u062D\u0633\u0627\u0628\u0643 \u0648\u0639\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u062A\u064A \u062A\u062D\u062F\u062B \u062A\u062D\u062A\u0647. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0628\u0639\u0645\u0631 13 \u0639\u0627\u0645\u064B\u0627 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0647\u0630\u0647 \u0627\u0644\u062E\u062F\u0645\u0629.' },
      termsS2Title:    { en: '2. User Content', fr: '2. Contenu utilisateur', de: '2. Nutzerinhalte', it: '2. Contenuti degli utenti', es: '2. Contenido del usuario', ar: '2. \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645' },
      termsS2Body:     { en: 'You retain ownership of content you upload but grant Video a non-exclusive, royalty-free license to host, display, and distribute it. You must not upload content that infringes intellectual property rights or is illegal, harmful, or offensive.', fr: 'Vous conservez la propri\u00E9t\u00E9 du contenu que vous t\u00E9l\u00E9chargez mais accordez \u00E0 Video une licence non exclusive et gratuite pour l\'h\u00E9berger, l\'afficher et le distribuer. Vous ne devez pas t\u00E9l\u00E9charger de contenu portant atteinte aux droits de propri\u00E9t\u00E9 intellectuelle ou ill\u00E9gal, nuisible ou offensant.', de: 'Sie behalten das Eigentum an hochgeladenen Inhalten, r\u00E4umen Video aber eine nicht-exklusive, lizenzgeb\u00FChrenfreie Lizenz zum Hosten, Anzeigen und Verbreiten ein. Sie d\u00FCrfen keine Inhalte hochladen, die geistiges Eigentum verletzen oder illegal, sch\u00E4dlich oder anst\u00F6\u00DFig sind.', it: 'Mantieni la propriet\u00E0 dei contenuti che carichi ma concedi a Video una licenza non esclusiva e gratuita per ospitarli, visualizzarli e distribuirli. Non devi caricare contenuti che violano i diritti di propriet\u00E0 intellettuale o che sono illegali, dannosi o offensivi.', es: 'Mantienes la propiedad del contenido que subes pero otorgas a Video una licencia no exclusiva y gratuita para alojarlo, mostrarlo y distribuirlo. No debes subir contenido que infrinja derechos de propiedad intelectual o que sea ilegal, da\u00F1ino u ofensivo.', ar: '\u062A\u062D\u062A\u0641\u0638 \u0628\u0645\u0644\u0643\u064A\u0629 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0630\u064A \u062A\u0631\u0641\u0639\u0647 \u0644\u0643\u0646\u0643 \u062A\u0645\u0646\u062D Video \u0631\u062E\u0635\u0629 \u063A\u064A\u0631 \u062D\u0635\u0631\u064A\u0629 \u0648\u0645\u062C\u0627\u0646\u064A\u0629 \u0644\u0627\u0633\u062A\u0636\u0627\u0641\u062A\u0647 \u0648\u0639\u0631\u0636\u0647 \u0648\u062A\u0648\u0632\u064A\u0639\u0647. \u064A\u062C\u0628 \u0639\u062F\u0645 \u0631\u0641\u0639 \u0645\u062D\u062A\u0648\u0649 \u064A\u0646\u062A\u0647\u0643 \u062D\u0642\u0648\u0642 \u0627\u0644\u0645\u0644\u0643\u064A\u0629 \u0627\u0644\u0641\u0643\u0631\u064A\u0629 \u0623\u0648 \u063A\u064A\u0631 \u0642\u0627\u0646\u0648\u0646\u064A \u0623\u0648 \u0636\u0627\u0631 \u0623\u0648 \u0645\u0633\u064A\u0621.' },
      termsS3Title:    { en: '3. Acceptable Use', fr: '3. Utilisation acceptable', de: '3. Zul\u00E4ssige Nutzung', it: '3. Uso accettabile', es: '3. Uso aceptable', ar: '3. \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u0642\u0628\u0648\u0644' },
      termsS3Body:     { en: 'You agree not to misuse the platform, including attempting unauthorized access, spreading malware, harassing other users, manipulating metrics, or interfering with normal operations. Violations may result in account suspension.', fr: 'Vous acceptez de ne pas faire un mauvais usage de la plateforme, y compris les tentatives d\'acc\u00E8s non autoris\u00E9, la diffusion de logiciels malveillants, le harc\u00E8lement d\'autres utilisateurs, la manipulation de m\u00E9triques ou l\'interf\u00E9rence avec les op\u00E9rations normales. Les violations peuvent entra\u00EEner la suspension du compte.', de: 'Sie stimmen zu, die Plattform nicht zu missbrauchen, einschlie\u00DFlich unbefugtem Zugriff, Verbreitung von Malware, Bel\u00E4stigung anderer Nutzer, Manipulation von Metriken oder Beeintr\u00E4chtigung des Normalbetriebs. Verst\u00F6\u00DFe k\u00F6nnen zur Kontosperrung f\u00FChren.', it: 'Accetti di non usare in modo improprio la piattaforma, inclusi tentativi di accesso non autorizzato, diffusione di malware, molestie ad altri utenti, manipolazione di metriche o interferenza con le normali operazioni. Le violazioni possono comportare la sospensione dell\'account.', es: 'Aceptas no usar indebidamente la plataforma, incluidos intentos de acceso no autorizado, propagaci\u00F3n de malware, acoso a otros usuarios, manipulaci\u00F3n de m\u00E9tricas o interferencia con las operaciones normales. Las violaciones pueden resultar en la suspensi\u00F3n de la cuenta.', ar: '\u062A\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 \u0639\u062F\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u0646\u0635\u0629 \u0628\u0637\u0631\u064A\u0642\u0629 \u063A\u064A\u0631 \u0644\u0627\u0626\u0642\u0629\u060C \u0628\u0645\u0627 \u0641\u064A \u0630\u0644\u0643 \u0645\u062D\u0627\u0648\u0644\u0627\u062A \u0627\u0644\u0648\u0635\u0648\u0644 \u063A\u064A\u0631 \u0627\u0644\u0645\u0635\u0631\u062D \u0628\u0647\u060C \u0648\u0646\u0634\u0631 \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0636\u0627\u0631\u0629\u060C \u0648\u0645\u0644\u0627\u062D\u0642\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0627\u0644\u0622\u062E\u0631\u064A\u0646\u060C \u0648\u0627\u0644\u062A\u0644\u0627\u0639\u0628 \u0628\u0627\u0644\u0645\u0642\u0627\u064A\u064A\u0633\u060C \u0623\u0648 \u0627\u0644\u062A\u062F\u062E\u0644 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0639\u064A\u0629. \u0642\u062F \u062A\u0624\u062F\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0625\u0644\u0649 \u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062D\u0633\u0627\u0628.' },
      termsS4Title:    { en: '4. Service Availability', fr: '4. Disponibilit\u00E9 du service', de: '4. Dienstverf\u00FCgbarkeit', it: '4. Disponibilit\u00E0 del servizio', es: '4. Disponibilidad del servicio', ar: '4. \u062A\u0648\u0627\u0641\u0631 \u0627\u0644\u062E\u062F\u0645\u0629' },
      termsS4Body:     { en: 'We strive to maintain high availability but do not guarantee uninterrupted service. We may modify, suspend, or discontinue features at any time. We are not liable for any damages arising from service interruptions.', fr: 'Nous nous effor\u00E7ons de maintenir une haute disponibilit\u00E9 mais ne garantissons pas un service ininterrompu. Nous pouvons modifier, suspendre ou interrompre des fonctionnalit\u00E9s \u00E0 tout moment. Nous ne sommes pas responsables des dommages r\u00E9sultant d\'interruptions de service.', de: 'Wir bem\u00FChen uns um hohe Verf\u00FCgbarkeit, garantieren aber keinen ununterbrochenen Dienst. Wir k\u00F6nnen Funktionen jederzeit \u00E4ndern, aussetzen oder einstellen. Wir haften nicht f\u00FCr Sch\u00E4den aus Dienstunterbrechungen.', it: 'Ci sforziamo di mantenere un\'alta disponibilit\u00E0 ma non garantiamo un servizio ininterrotto. Possiamo modificare, sospendere o interrompere funzionalit\u00E0 in qualsiasi momento. Non siamo responsabili per danni derivanti da interruzioni del servizio.', es: 'Nos esforzamos por mantener una alta disponibilidad pero no garantizamos un servicio ininterrumpido. Podemos modificar, suspender o discontinuar funciones en cualquier momento. No somos responsables de los da\u00F1os derivados de interrupciones del servicio.', ar: '\u0646\u0633\u0639\u0649 \u0644\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u062A\u0648\u0627\u0641\u0631 \u0639\u0627\u0644 \u0644\u0643\u0646\u0646\u0627 \u0644\u0627 \u0646\u0636\u0645\u0646 \u062E\u062F\u0645\u0629 \u063A\u064A\u0631 \u0645\u0642\u0637\u0648\u0639\u0629. \u064A\u0645\u0643\u0646\u0646\u0627 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u064A\u0632\u0627\u062A \u0623\u0648 \u0625\u064A\u0642\u0627\u0641\u0647\u0627 \u0623\u0648 \u0625\u064A\u0642\u0627\u0641\u0647\u0627 \u0641\u064A \u0623\u064A \u0648\u0642\u062A. \u0644\u0627 \u0646\u062A\u062D\u0645\u0644 \u0645\u0633\u0624\u0648\u0644\u064A\u0629 \u0623\u064A \u0623\u0636\u0631\u0627\u0631 \u0646\u0627\u062A\u062C\u0629 \u0639\u0646 \u0627\u0646\u0642\u0637\u0627\u0639 \u0627\u0644\u062E\u062F\u0645\u0629.' },
      termsS5Title:    { en: '5. Limitation of Liability', fr: '5. Limitation de responsabilit\u00E9', de: '5. Haftungsbeschr\u00E4nkung', it: '5. Limitazione di responsabilit\u00E0', es: '5. Limitaci\u00F3n de responsabilidad', ar: '5. \u062D\u062F \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0629' },
      termsS5Body:     { en: 'Video is provided "as is" without warranties of any kind. We are not liable for indirect, incidental, or consequential damages arising from the use or inability to use our services.', fr: 'Video est fourni \u00AB\u00A0tel quel\u00A0\u00BB sans aucune garantie. Nous ne sommes pas responsables des dommages indirects, accessoires ou cons\u00E9cutifs r\u00E9sultant de l\'utilisation ou de l\'impossibilit\u00E9 d\'utiliser nos services.', de: 'Video wird \u00ABwie besehen\u00BB ohne Gew\u00E4hrleistung bereitgestellt. Wir haften nicht f\u00FCr indirekte, beil\u00E4ufige oder Folgesch\u00E4den aus der Nutzung oder Nichtnutzung unserer Dienste.', it: 'Video \u00E8 fornito "cos\u00EC com\'\u00E8" senza garanzie di alcun tipo. Non siamo responsabili per danni indiretti, incidentali o consequenziali derivanti dall\'uso o dall\'impossibilit\u00E0 di usare i nostri servizi.', es: 'Video se proporciona "tal cual" sin garant\u00EDas de ning\u00FAn tipo. No somos responsables de da\u00F1os indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de usar nuestros servicios.', ar: '\u064A\u064F\u0642\u062F\u0645 Video "\u0643\u0645\u0627 \u0647\u064A" \u062F\u0648\u0646 \u0623\u064A \u0636\u0645\u0627\u0646\u0627\u062A. \u0644\u0627 \u0646\u062A\u062D\u0645\u0644 \u0645\u0633\u0624\u0648\u0644\u064A\u0629 \u0627\u0644\u0623\u0636\u0631\u0627\u0631 \u063A\u064A\u0631 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0629 \u0623\u0648 \u0627\u0644\u0639\u0631\u0636\u064A\u0629 \u0623\u0648 \u0627\u0644\u062A\u0628\u0627\u0639\u064A\u0629 \u0627\u0644\u0646\u0627\u062A\u062C\u0629 \u0639\u0646 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062E\u062F\u0645\u0627\u062A\u0646\u0627 \u0623\u0648 \u0639\u062F\u0645 \u0627\u0644\u0627\u0633\u062A\u0637\u0627\u0639\u0629.' },
      termsS6Title:    { en: '6. Changes to Terms', fr: '6. Modification des conditions', de: '6. \u00C4nderung der Bedingungen', it: '6. Modifiche ai termini', es: '6. Cambios en los t\u00E9rminos', ar: '6. \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u0634\u0631\u0648\u0637' },
      termsS6Body:     { en: 'We may update these Terms from time to time. Continued use of the platform after changes constitutes acceptance of the revised Terms. We will indicate the last update date below.', fr: 'Nous pouvons mettre \u00E0 jour ces conditions de temps en temps. L\'utilisation continue de la plateforme apr\u00E8s les modifications constitue l\'acceptation des conditions r\u00E9vis\u00E9es. Nous indiquerons la date de derni\u00E8re mise \u00E0 jour ci-dessous.', de: 'Wir k\u00F6nnen diese Bedingungen von Zeit zu Zeit aktualisieren. Die fortgesetzte Nutzung der Plattform nach \u00C4nderungen gilt als Zustimmung zu den revidierten Bedingungen. Wir geben das Datum der letzten Aktualisierung unten an.', it: 'Potremmo aggiornare questi Termini di tanto in tanto. L\'uso continuato della piattaforma dopo le modifiche costituisce accettazione dei Termini rivisti. Indicheremo la data dell\'ultimo aggiornamento di seguito.', es: 'Podemos actualizar estos T\u00E9rminos de vez en cuando. El uso continuado de la plataforma despu\u00E9s de los cambios constituye la aceptaci\u00F3n de los T\u00E9rminos revisados. Indicaremos la fecha de la \u00FAltima actualizaci\u00F3n a continuaci\u00F3n.', ar: '\u0642\u062F \u0646\u0642\u0648\u0645 \u0628\u062A\u062D\u062F\u064A\u062B \u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0648\u0637 \u0645\u0646 \u062D\u064A\u0646 \u0644\u0622\u062E\u0631. \u0627\u0633\u062A\u0645\u0631\u0627\u0631 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u0646\u0635\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u064A\u0639\u062F \u0642\u0628\u0648\u0644\u064B\u0627 \u0644\u0644\u0634\u0631\u0648\u0637 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629. \u0633\u0646\u0634\u064A\u0631 \u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B \u0623\u062F\u0646\u0627\u0647.' },

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
      cookieS5Body:    { en: 'We may update this Cookie Policy periodically. Changes are effective immediately upon posting. Please review this page regularly to stay informed.', fr: 'Nous pouvons mettre \u00E0 jour cette politique des cookies p\u00E9riodiquement. Les modifications entrent en vigueur d\u00E8s leur publication. Veuillez consulter r\u00E9guli\u00E8rement cette page pour rester inform\u00E9.', de: 'Wir k\u00F6nnen diese Cookie-Richtlinie regelm\u00E4\u00DFig aktualisieren. \u00C4nderungen treten sofort nach Ver\u00F6ffentlichung in Kraft. Bitte \u00FCberpr\u00FCfen Sie diese Seite regelm\u00E4\u00DFig.', it: 'Potremmo aggiornare periodicamente questa politica dei cookie. Le modifiche sono efficaci immediatamente dopo la pubblicazione. Consulta regolarmente questa pagina per rimanere informato.', es: 'Podemos actualizar esta pol\u00EDtica de cookies peri\u00F3dicamente. Los cambios son efectivos inmediatamente despu\u00E9s de su publicaci\u00F3n. Revisa esta p\u00E1gina regularmente para mantenerte informado.', ar: '\u0642\u062F \u0646\u0642\u0648\u0645 \u0628\u062A\u062D\u062F\u064A\u062B \u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u0643\u0648\u0643\u064A\u0632 \u0647\u0630\u0647 \u0645\u0646 \u062D\u064A\u0646 \u0644\u0622\u062E\u0631. \u062A\u062F\u062E\u0644 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u062D\u064A\u0632 \u0627\u0644\u0646\u0641\u0627\u0630 \u0645\u0628\u0627\u0634\u0631\u0629 \u0628\u0639\u062F \u0646\u0634\u0631\u0647\u0627. \u064A\u0641\u0636\u0644 \u0645\u0631\u0627\u062C\u0639\u0629 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u0628\u0627\u0646\u062A\u0638\u0627\u0645.' },
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
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = t(el.dataset.i18nTitle);
    });
    const titleEl = document.querySelector('title');
    if (titleEl) titleEl.textContent = t('meta.title');
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
    init,
  };
  window.t = t;

  // ── Boot ─────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    setLang(getLang());
    buildLanguageSelector();
  });
})();
