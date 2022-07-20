export const de = {
  common: {
    registrationHeaderTitle: 'Registrieren',
    DateInput: {
      dayPlaceholder: 'Tag',
      monthPlaceholder: 'Monat',
      yearPlaceholder: 'Jahr',
    },
    GenderInput: {
      maleLabel: 'männlich',
      femaleLabel: 'weiblich',
      diversLabel: 'divers',
    },
    ExpiryContainer: {
      nextLabel: 'Weiter',
    },
    PasswordValidContainer: {
      headline: 'Dein Passwort muss Folgendes haben:',
      numberOfCharacters: '8 bis 20 Zeichen',
      differentCharacters: 'Buchstaben, Ziffern und Sonderzeichen',
    },
    timeInterval: {
      pre: 'vor ',
      post: '',
      minute: 'Minute',
      minutes: 'Minuten',
      hour: 'Stunde',
      hours: 'Stunden',
      day: 'Tag',
      days: 'Tagen',
    },
    RatingModal: {
      title: 'Findest Du die gelesene Nachricht interessant?',
      ratingItemLabels: {
        no: 'Nein! 🥱',
        neutral: 'Neutral 😶',
        yes: 'Ja! 🤩',
      },
      skipButtonLabel: 'Überspringen',
    },
  },
  WelcomeScreen: {
    welcomeTitle: 'Willkommen bei NewsRecs',
    signUpButtonLabel: 'Registrieren',
    signInButtonLabel: 'Anmelden',
    introText: {
      newsRecsRecommendsNews:
        'NewsRecs empfielt Dir Nachrichten auf Basis von Künstlicher Intelligenz',
      newsRecsTracksUsageData:
        'Die App sammelt im Rahmen der Forschung Nutzungsdaten. Damit wollen wir die Leistungsfähigkeit verschiedener Algorithmen vergleichen.',
      supportResearch:
        'Unterstütze die Forschung und erhalte relevante Nachrichten.',
    },
  },
  RegistrationLanguageScreen: {
    nextLabel: 'Weiter',
    inputLabel: 'Sprache',
    inputValues: {
      DE: 'Deutsch 🇩🇪',
      EN: 'Englisch 🇬🇧',
    },
    errorLabel: 'Wähle eine Sprache aus',
  },

  RegistrationPersonalDataScreen: {
    nextLabel: 'Weiter',
    dateOfBirthInput: {
      label: 'Geburtsdatum',
      errorLabel:
        'Gib ein gültiges Geburtsdatum ein. Du musst mindest 18 Jahre alt sein.',
    },
    sexInput: {
      label: 'Geschlecht',
      errorLabel: 'Gib ein Geschlecht an',
    },
  },
  RegistrationCredentialsScreen: {
    nextLabel: 'Registrieren',
    emailInput: {
      label: 'E-Mail',
      errorLabel: 'Gib eine gültige E-Mail-Adresse ein',
    },
    passwordInput: {
      label: 'Passwort',
      errorLabel: 'Das Passwort muss alle Anforderungen erfüllen',
    },
  },
  ConfirmAccountScreen: {
    headerTitle: 'Konto bestätigen',
    nextLabel: 'Konto bestätigen',
    successAlert: {
      title: 'Konto bestätigt',
      description: 'Du hast Dein Konto bestätigt.',
    },
    errorAlert: {
      title: 'Fehler',
      TOKEN_INVALID: 'Der eingegebene Code ist falsch.',
    },
    renewConfirmationTokenSuccessAlert: {
      title: 'Neuer Code',
      description: 'Dir wurde ein neuer Bestätigungscode per E-Mail gesendet.',
    },
    confirmationSuccessfulContainer: {
      title: 'Registrierung erfolgreich',
      description: 'Du hast eine E-Mail mit einem Bestätigungscode erhalten.',
    },
    tokenInput: {
      label: 'Bestätigungscode',
      errorLabel: 'Gib einen gültigen Code ein',
    },
    sendNewCodeButtonLabel: 'Neuen Bestätigungscode senden',
  },
  LoginScreen: {
    headerTitle: 'Anmelden',
    nextLabel: 'Anmelden',
    errorAlert: {
      title: 'Fehler',
      USERNAME_OR_PASSWORD_INVALID:
        'Die E-Mail-Adresse oder das Passwort ist ungültig.',
    },
    emailInput: {
      label: 'E-Mail',
      errorLabel: 'Gib eine gültige E-Mail-Adresse ein',
    },
    passwordInput: {
      label: 'Passwort',
      errorLabel:
        'Gib ein Passwort mit mindestens 8 und maximal 20 Zeichen ein',
    },
    forgotPasswordButtonLabel: 'Passwort vergessen',
  },
  ForgotPasswordScreen: {
    headerTitle: 'Passwort vergessen',
    nextLabel: 'Passwort vergessen',
    successAlert: {
      title: 'Code gesendet',
      description:
        'Du hast per E-Mail einen Code zur Änderung deines Passworts erhalten.',
    },
    errorAlert: {
      title: 'Fehler',
    },
    emailInput: {
      label: 'E-Mail',
      errorLabel: 'Gib eine gültige E-Mail-Adresse ein',
    },
  },
  ChangePasswordScreen: {
    headerTitle: 'Passwort ändern',
    nextLabel: 'Passwort ändern',
    successAlert: {
      title: 'Passwort ändern',
      description: 'Du hast das Passwort erfolgreich geändert.',
    },
    errorAlert: {
      title: 'Fehler',
      CHANGE_PASSWORD_TOKEN_INVALID: 'Der eingegebene Code ist falsch.',
    },
    codeInput: {
      label: 'Code',
      errorLabel: 'Gib einen gültigen Code ein',
    },
    passwordInput: {
      label: 'Neues Passwort',
      errorLabel: 'Das Passwort muss alle Anforderungen erfüllen',
    },
  },
  AccountScreen: {
    logoutButtonLabel: 'Abmelden',
    headerTitle: 'Account',
  },
  NewsFeedScreen: {
    headerTitle: 'Newsfeed',
  },
}
