// ZenGlance i18n — 6 languages, RTL for Arabic, no Chinese in source
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
        en: 'ZenGlance \u2014 Multi-modal Content Platform',
        fr: 'ZenGlance \u2014 Plateforme Multi-modalit\u00E9',
        de: 'ZenGlance \u2014 Multilaterale Content-Plattform',
        it: 'ZenGlance \u2014 Piattaforma Contenuti Multi-modale',
        es: 'ZenGlance \u2014 Plataforma de Contenidos Multi-modal',
        ar: 'ZenGlance \u2014 \u0645\u0646\u0635\u0629 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u062A\u0639\u062F\u062F \u0627\u0644\u0648\u0633\u0627\u0626\u0637',
      },
      titleShorts: {
        en: 'Shorts \u2014 ZenGlance',
        fr: 'Shorts \u2014 ZenGlance',
        de: 'Shorts \u2014 ZenGlance',
        it: 'Shorts \u2014 ZenGlance',
        es: 'Shorts \u2014 ZenGlance',
        ar: '\u0634\u0631\u0648\u0637 \u2014 ZenGlance',
      },
      titleWatch: {
        en: 'Watch \u2014 ZenGlance',
        fr: 'Regarder \u2014 ZenGlance',
        de: 'Ansehen \u2014 ZenGlance',
        it: 'Guarda \u2014 ZenGlance',
        es: 'Ver \u2014 ZenGlance',
        ar: '\u0634\u0627\u062A \u2014 ZenGlance',
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

    player: {
      season: { en: 'Season', fr: 'Saison', de: 'Staffel', it: 'Stagione', es: 'Temporada', ar: '\u0645\u0648\u0633\u0645' },
      episodes: { en: 'Episodes', fr: '\u00C9pisodes', de: 'Folgen', it: 'Episodi', es: 'Episodios', ar: '\u0623\u062D\u0648\u0627\u0644' },
      rating: { en: 'Rating', fr: 'Note', de: 'Bewertung', it: 'Valutazione', es: 'Clasificaci\u00F3n', ar: '\u062A\u0635\u0646\u064A\u0641' },
      status: { ongoing: { en: 'Ongoing', fr: 'En cours', de: 'L\u00E4uft', it: 'In corso', es: 'En curso', ar: '\u0645\u0633\u062A\u0645\u0631' }, completed: { en: 'Completed', fr: 'Termin\u00E9', de: 'Beendet', it: 'Completato', es: 'Completado', ar: '\u0645\u062A\u0645' }, hiatus: { en: 'Hiatus', fr: 'Pause', de: 'Pause', it: 'Pausa', es: 'Pausa', ar: '\u0645\u0639\u0644\u0642' } },
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

  let currentLang = 'en';
  const _langChangeCallbacks = [];

  // ── Core functions ────────────────────────────────────────────────────────
  function getLang() {
    const stored = localStorage.getItem('zenglance_lang');
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
    localStorage.setItem('zenglance_lang', lang);
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
  window.i18n = {
    t, setLang, getLang, currentLang: () => currentLang, categoryNames, LANGUAGES,
    onLangChange: (fn) => _langChangeCallbacks.push(fn),
  };
  window.t = t;

  // ── Boot ─────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    setLang(getLang());
    buildLanguageSelector();
  });
})();
