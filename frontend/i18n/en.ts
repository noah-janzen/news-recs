export const en = {
  common: {
    registrationHeaderTitle: 'Sign up',
    DateInput: {
      dayPlaceholder: 'Day',
      monthPlaceholder: 'Month',
      yearPlaceholder: 'Year',
    },
    GenderInput: {
      maleLabel: 'male',
      femaleLabel: 'female',
      diversLabel: 'divers',
    },
    ExpiryContainer: {
      nextLabel: 'Next',
    },
    PasswordValidContainer: {
      headline: 'Your password must have the following:',
      numberOfCharacters: '8 to 20 characters',
      differentCharacters: 'Letters, numbers and special characters',
    },
    timeInterval: {
      pre: '',
      post: ' ago',
      minute: 'minute',
      minutes: 'minutes',
      hour: 'hour',
      hours: 'hours',
      day: 'day',
      days: 'days',
    },
    RatingModal: {
      title: 'Do you find the message you read interesting?',
      ratingItemLabels: {
        binary: {
          notInteresting: 'No! 🥱',
          interesting: 'Yes! 🤩',
        },
        range: {
          leftLabel: 'Not interesting',
          rightLabel: 'Interesting',
        },
        text: {
          placeholder: 'Your feedback…',
          buttonLabel: 'Send Feedback',
        },
      },
      skipButtonLabel: 'Skip',
    },
    survey: {
      title: 'User Survey',
      backButtonLabel: 'Back',
      nextButtonLabel: 'Next',
      submitButtonLabel: 'Submit',
    },
  },
  WelcomeScreen: {
    welcomeTitle: 'Welcome to NewsRecs',
    signUpButtonLabel: 'Sign up',
    signInButtonLabel: 'Sign in',
    introText: {
      newsRecsRecommendsNews:
        'NewsRecs recommends you news based on artificial intelligence.',
      newsRecsTracksUsageData:
        'The app collects usage data as part of the research. We want to use it to compare the performance of different algorithms.',
      supportResearch: 'Support research and receive relevant news.',
    },
  },
  RegistrationLanguageScreen: {
    nextLabel: 'Next',
    inputLabel: 'Language',
    inputValues: {
      DE: 'German 🇩🇪',
      EN: 'English 🇬🇧',
    },
    errorLabel: 'Select a language',
  },
  RegistrationPersonalDataScreen: {
    nextLabel: 'Next',
    dateOfBirthInput: {
      label: 'Date of birth',
      errorLabel:
        'Enter a valid date of birth. You must be at least 18 years old.',
    },
    sexInput: {
      label: 'Sex',
      errorLabel: 'Select a gender',
    },
  },
  RegistrationCredentialsScreen: {
    nextLabel: 'Sign up',
    emailInput: {
      label: 'Email',
      errorLabel: 'Enter a valid email address',
    },
    passwordInput: {
      label: 'Password',
      errorLabel: 'The password must meet all requirements',
    },
  },
  ConfirmAccountScreen: {
    headerTitle: 'Confirm account',
    nextLabel: 'Confirm account',
    successAlert: {
      title: 'Account confirmed',
      description: 'You have confirmed your account.',
    },
    errorAlert: {
      title: 'Error',
      TOKEN_INVALID: 'Your entered token is not valid.',
    },
    renewConfirmationTokenSuccessAlert: {
      title: 'New code',
      description: 'You have been sent a new confirmation code by email.',
    },
    confirmationSuccessfulContainer: {
      title: 'Sign up successful',
      description: 'You have received an email with a confirmation code.',
    },
    tokenInput: {
      label: 'Confirmation code',
      errorLabel: 'Enter a valid code',
    },
    sendNewCodeButtonLabel: 'Send new confirmation code',
  },
  LoginScreen: {
    headerTitle: 'Sign in',
    nextLabel: 'Sign in',
    errorAlert: {
      title: 'Error',
      USERNAME_OR_PASSWORD_INVALID:
        'The email or password you entered is not valid.',
      NETWORK_ERROR: 'A network error occured. Please try again later.',
    },
    emailInput: {
      label: 'Email',
      errorLabel: 'Enter a valid email address',
    },
    passwordInput: {
      label: 'Password',
      errorLabel:
        'Please enter a password with a minimum of 8 and a maximum of 20 characters.',
    },
    forgotPasswordButtonLabel: 'Forgot password',
  },
  ForgotPasswordScreen: {
    headerTitle: 'Forgot password',
    nextLabel: 'Forgot password',
    successAlert: {
      title: 'Code sent',
      description:
        'You have received a code to change your password by e-mail.',
    },
    errorAlert: {
      title: 'Error',
    },
    emailInput: {
      label: 'Email',
      errorLabel: 'Enter a valid email address',
    },
  },
  ChangePasswordScreen: {
    headerTitle: 'Change password',
    nextLabel: 'Change password',
    successAlert: {
      title: 'Changed password',
      description: 'You have successfully changed the password',
    },
    errorAlert: {
      title: 'Error',
      CHANGE_PASSWORD_TOKEN_INVALID: 'The entered code is invalid',
    },
    codeInput: {
      label: 'Code',
      errorLabel: 'Enter a valid code',
    },
    passwordInput: {
      label: 'New password',
      errorLabel: 'The password must meet all requirements',
    },
  },
  AccountScreen: {
    headerTitle: 'Account',
    logoutButtonLabel: 'Sign out',
    inputs: {
      dateOfBirth: {
        label: 'Date of birth',
        errorLabel:
          'Enter a valid date of birth. You must be at least 18 years old.',
      },
      sex: {
        label: 'Sex',
        errorLabel: 'Select a gender',
      },
      email: {
        label: 'Email',
        errorLabel: 'Enter a valid email address',
      },
    },
    saveChangesButtonLabel: 'Save changes',
    successAlert: {
      title: 'Account updated',
      description: 'You have successfully updated your account data.',
    },
    errorAlert: {
      title: 'Error',
      EMAIL_ALREADY_REGISTERED:
        'The email address entered is already in use by another account.',
    },
  },
  NewsFeedScreen: {
    headerTitle: 'Newsfeed',
  },
}
