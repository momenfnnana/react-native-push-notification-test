const en = {
  labelForm: {
    name: 'Username',
    mobile: 'mobile number',
    username: 'username',
    Address: 'address',
    phonenumber: 'phone number',
    password: 'password',
    email: 'E-mail',
    newPasswordInput: 'new password',
    OldPasswordInput: 'Old password',
    confirmNewPassword: 'confirm New Password',
    confirmPasswordInput: 'Reset new password',
    fullName: 'Full Name',
    location: 'Location',
    whatsapp: 'Whatsapp',
    sendMessage: 'Send Message',
    'card-number': 'Card Number',
    'review-reason': 'Review Reason',
    'vehicle-brand': 'Vehicle brand',
    'vehicle-color': 'Vehicle color',
    CarNumber: 'Vehicle Number',
  },

  common: {
    ok: 'OK!',
    setting: 'Settings',
    or: 'Or',
    openLocation:
      'Please enable Allow access to your current location to be able to send your location.',
    cancel: 'Cancel',
    back: 'Back',
    logOut: 'Log Out',
    appName: 'Adel trading group',
    appDescription: 'Adel trading group',
    edit: 'edit',
    arabic: 'العربية',
    english: 'English',
    'select-language': 'Select language',
    submit: 'confirm',
    clientNo: 'Customer No.',
    costAndFees: 'Cost & commission',
    orderNo: 'Packages.',
    orderStatus: 'status',
    moreDetails: 'see more',
    shipmentNo: 'shipment number',
    shipmentVolume: 'shipment volume',
    boxsNumber: 'boxs number',
    onMap: 'On Map',
    customerAddress: 'Delivery Location',
    travelCost: 'Trip Cost',
    paidAmount: 'Given Cost',
    total: 'Total Cost',
    travelDistance: '{{travelDistance}}km',
    incomplete: 'incomplete',
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: 'Your app, almost ready for launch!',
    exciting: '(ohh, this is exciting!)',
    letsGo: "Let's go!", // @demo remove-current-line
  },
  errorScreen: {
    title: 'Something went wrong!',
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: 'RESET APP',
    traceTitle: 'Error from %{name} stack', // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: 'So empty... so sad',
      content:
        'No data found yet. Try clicking the button to refresh or reload the app.',
      button: "Let's try this again",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: 'Invalid email address.',
  },
  loginScreen: {
    welcome: 'welcome back!',
    description: 'Please login to continue…',
    signIn: 'Sign In',
    foget: 'Forgot your password?',
    remmberMe: 'remember me',
  },
  forgetPasswordScreen: {
    title: 'Forgot your password?',
    description:
      'Please enter your mobile number. A text message will be sent with the code to recover your password.',
    submitBtn: 'Confirm ',
  },
  resetPasswordScreen: {
    title: 'Create a new password',
    description: 'The new password must be different from the previous one.',
    submitBtn: 'Confirm',
  },
  changePasswordScreen: {
    title: 'Change password',
  },
  verficationScreen: {
    title: 'Validation code',
    description:
      'Enter the verification code sent to you via the entered email',
    submitBtn: 'Confirm',
    resendBtn: 'Resend',
  },
  demoNavigator: {
    homeTap: 'My Trips',
    toplist: 'Best Captains',
    profileTab: 'Profile',
  },
  demoCommunityScreen: {
    title: 'Connect with the community',
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: 'Join us on Slack',
    joinUsOnSlack:
      'Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.',
    joinSlackLink: 'Join the Slack Community',
    makeIgniteEvenBetterTitle: 'Make Ignite even better',
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: 'Contribute to Ignite',
    theLatestInReactNativeTitle: 'The latest in React Native',
    theLatestInReactNative:
      "We're here to keep you current on all React Native has to offer.",
    reactNativeRadioLink: 'React Native Radio',
    reactNativeNewsletterLink: 'React Native Newsletter',
    reactNativeLiveLink: 'React Native Live',
    chainReactConferenceLink: 'Chain React Conference',
    hireUsTitle: 'Hire Infinite Red for your next project',
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: 'Send us a message',
  },
  demoShowroomScreen: {
    jumpStart: 'Components to jump start your project!',
    lorem2Sentences:
      'Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.',
    demoHeaderTxExample: 'Yay',
    demoViaTxProp: 'Via `tx` Prop',
    demoViaSpecifiedTxProp: 'Via `{{prop}}Tx` Prop',
  },
  demoDebugScreen: {
    howTo: 'HOW TO',
    title: 'Debug',
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: 'Send to Reactotron',
    reportBugs: 'Report Bugs',
    demoList: 'Demo List',
    demoPodcastList: 'Demo Podcast List',
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
  demoPodcastListScreen: {
    title: 'React Native Radio episodes',
    onlyFavorites: 'Only Show Favorites',
    favoriteButton: 'Favorite',
    unfavoriteButton: 'Unfavorite',
    accessibility: {
      cardHint:
        'Double tap to listen to the episode. Double tap and hold to {{action}} this episode.',
      switch: 'Switch on to only show favorites',
      favoriteAction: 'Toggle Favorite',
      favoriteIcon: 'Episode not favorited',
      unfavoriteIcon: 'Episode favorited',
      publishLabel: 'Published {{date}}',
      durationLabel:
        'Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds',
    },
    noFavoritesEmptyState: {
      heading: 'This looks a bit empty',
      content:
        'No favorites have been added yet. Tap the heart on an episode to add it to your favorites!',
    },
  },
  emptyPage: {
    newTrips: 'No new trips',
    deliverd: 'No orders deliverd',
    topCaptians: 'No Captians',
  },
  homeScreen: {
    title: 'My Trips',
    delivered: 'Delivered',
    newTrip: 'New Trips',
    searchPlaceholder: 'Search For A Trip',
    newTripCard: {
      title: 'New Trip',
      receipt: 'Receipt Point',
      delivery: 'Delivery Point',
      acceptBtn: 'Accept Order',
      rejectBtn: 'Reject Order',
    },
  },
  CaptainListScreen: {
    title: 'Top Captains List',
    tripCount: '{{tripCount}} trip',
  },
  orderScreen: {
    title: 'Orders',
    searchPlaceholder: 'look for an order',
  },
  orderDetailsScreen: {
    title: 'orders',
    orderDetails: 'Order Details',
    reviewOrder: 'Review Order',
    restaurantName: 'Restaurant Name',
    restaurantPhoneNumber: 'restaurant Phone',
    customerName: 'Customer Name',
    customerAddress: 'Customer Location',
    customerMobileNumber: 'Customer Phone',
    restaurantMapLocation: 'On Map',
    travelCost: 'Travel Cost',
    paidAmount: 'Paid Amount From Customer',
    total: 'Total',
    paymentType: 'Payment Type',
    restaurantAddress: 'Restaurant Address',
    startTrip: 'Start trip',
    reachStartPoint: 'Reach start point',
    reachEndPoint: 'React End point',
    endTrip: 'End trip',
  },
  profileScreen: {
    title: 'Profile',
    name: 'Name',
    email: 'Email',
    location: 'Location',
    mobile: 'Phone Number',
    orders: 'Orders',
    logout: 'Logout',
    'total-orders': 'Total orders',
    balance: 'Balance',
    'last-charge-status': 'Last charge status',
    language: 'Language',
    'about-us': 'About us',
    'call-us': 'Call us',
    'contact-us': 'Contact us',
    'delete-account': 'Delete account',
    'edit-profile': 'Edit profile',
    'upload-image': 'Upload image',
    vehicleType: 'Vehicle Type',
    modalHeading: 'Car Details',
    'change-car-type': 'Change car type',
  },
  contactUs: {
    title: 'Contact us',
    'you-can-find-us': 'You can find us',
    'callUs-into': 'Call us into {{number}}',
  },
  aboutUs: {
    title: 'About us',
  },
  scanQr: {
    title: 'Scan QR',
    scan: 'Scan',
    'qr-scanned': 'The code has been scanned successfully',
    'check-order': 'you can checkout more details in order page',
    'see-orders': 'see all orders',
    'scan-new-order': 'scan new order',
    'qr-scanned-error': 'We could not find your request',
    'scan-again': 'Scan again',
    'return-to-orders': 'Back to requests',
  },
  changeVehicleScreen: {
    title: 'Change Vehicle',
  },
  validation: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    min: 'Please enter a value greater than or equal to {{min}}',
    max: 'Please enter a value less than or equal to {{max}}',
    minLength: 'Please enter at least {{minLength}} characters',
    maxLength: 'Please enter no more than {{maxLength}} characters',
    pattern: 'Please match the requested format',
    numeric: 'Please enter a valid number',
    alpha: 'Please enter only letters',
    alphaNumeric: 'Please enter only letters and numbers',
    url: 'Please enter a valid URL',
    lowercase: 'Please enter at least one lowercase characters',
    uppercase: 'Please enter at least one uppercase characters',
    special: 'Please enter at least one special characters',
    'password-must-match': 'Passwords must match',
  },
  or: 'Or',
  errorMessages: {
    defult: 'Something Went Error',
    unAuth: 'session expaired',
  },
  // @demo remove-block-end
};

export default en;
export type Translations = typeof en;
