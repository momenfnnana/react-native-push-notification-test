import {Translations} from './en';

const ar: Translations = {
  labelForm: {
    name: 'اسم مستخدم ',
    email: 'البريد الالكتروني',
    mobile: 'رقم الجوال',
    password: 'كلمة المرور',
    Address: 'العنوان',
    newPasswordInput: 'كلمة مرور جديدة',
    confirmPasswordInput: 'كلمة المرور الجديدة مرة اخرى',
    OldPasswordInput: 'كلمة المرور السابقة',
    confirmNewPassword: 'كلمة المرور الجديدة مرة اخرى',
    fullName: 'الاسم كامل',
    location: 'الموقع',
    whatsapp: 'الواتساب',
    sendMessage: 'ارسل لنا رسالة',
    'card-number': 'رقم البطاقة',
    phonenumber: 'رقم الجوال',
    username: 'اسم مستخدم ',
    'review-reason': 'سبب المراجعة',
    'vehicle-brand': 'ماركة المركبة',
    'vehicle-color': 'لون المركبة',
    CarNumber: 'رقم المركبة',
  },
  common: {
    ok: 'نعم',
    setting: 'الإعدادات',
    or: 'أو',
    openLocation:
      'من فضلك قم بتفعيل السماح للوصول الى موقعك الحالي لامكانية ارسال موقعك',
    cancel: 'حذف',
    back: 'خلف',
    logOut: 'تسجيل الخروج',
    appName: 'مجموعة عادل التجارية',
    appDescription: 'للتجارة والشحن والتصدير',
    edit: 'تعديل',
    arabic: 'العربية',
    english: 'English',
    'select-language': 'اختار اللغة',
    submit: 'ارسال',
    clientNo: 'رقم العميل',
    costAndFees: 'التكلفة والعمولة',
    orderNo: 'عدد الطرود',
    orderStatus: 'الحالة',
    moreDetails: 'مشاهدة المزيد',
    shipmentNo: 'رقم الشحنة',
    shipmentVolume: 'حجم الشحنة',
    boxsNumber: 'عدد الصناديق',
    onMap: 'على الخريطة',
    customerAddress: 'موقع التسليم',
    travelCost: 'تكلفة الرحله',
    paidAmount: 'المبلغ المحصل',
    total: 'الاجمالي المطلوب',
    travelDistance: '{{travelDistance}}كم',
    incomplete: 'غير مكتمل',
    updateLocationMsg:
      ' تم تحديث الموقع الحالي. \n longitude: {{longitude}}, latitude: {{latitude}}',
  },
  welcomeScreen: {
    postscript:
      'ربما لا يكون هذا هو الشكل الذي يبدو عليه تطبيقك مالم يمنحك المصمم هذه الشاشات وشحنها في هذه الحالة',
    readyForLaunch: 'تطبيقك تقريبا جاهز للتشغيل',
    exciting: 'اوه هذا مثير',
    letsGo: 'لنذهب', // @demo remove-current-line
  },
  errorScreen: {
    title: 'هناك خطأ ما',
    friendlySubtitle:
      "هذه هي الشاشة التي سيشاهدها المستخدمون في عملية الانتاج عند حدوث خطأ. سترغب في تخصيص هذه الرسالة ( الموجودة في 'ts.en/i18n/app') وربما التخطيط ايضاً ('app/screens/ErrorScreen'). إذا كنت تريد إزالة هذا بالكامل، تحقق من 'app/app.tsp' من اجل عنصر <ErrorBoundary>.",
    reset: 'اعادة تعيين التطبيق',
    traceTitle: 'خطأ من مجموعة %{name}', // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: 'فارغة جداً....حزين',
      content:
        'لا توجد بيانات حتى الآن. حاول النقر فوق الزر لتحديث التطبيق او اعادة تحميله.',
      button: 'لنحاول هذا مرّة أخرى',
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: 'عنوان البريد الالكتروني غير صالح',
  },
  loginScreen: {
    welcome: 'اهلا بك مجدداً !',
    description: 'يرجى تسجيل الدخول للمتابعة…',
    signIn: 'تسجيل الدخول',
    foget: 'نسيت كلمة المرور؟',
    remmberMe: 'تذكرني',
  },
  forgetPasswordScreen: {
    title: 'نسيت كلمة المرور؟',
    description:
      'الرجاء ادخال رقم الجوال , سيتم ارسال رسالة نصية بالرمز لاستعادة كلمة المرور',
    submitBtn: 'تأكيد ',
  },
  resetPasswordScreen: {
    title: 'تغيير كلمة المرور',
    description: 'الرجاء ادخال كلمة مرور جديدة',
    submitBtn: 'تأكيد',
  },
  changePasswordScreen: {
    title: 'تغيير كلمة المرور',
  },
  verficationScreen: {
    title: 'رمز التأكيد',
    description: 'الرجاء ادخال رمز التأكيد المرسل الى الرقم المدخل سابقاً',
    submitBtn: 'تأكيد',
    resendBtn: 'اعادة ارسال الرمز؟ ',
  },
  demoNavigator: {
    homeTap: 'رحلاتي',
    toplist: 'قائمة النخبة',
    profileTab: 'الملف الشخصي',
  },
  demoCommunityScreen: {
    title: 'تواصل مع المجتمع',
    tagLine:
      'قم بالتوصيل لمنتدى Infinite Red الذي يضم تفاعل المهندسين المحلّيين ورفع مستوى تطوير تطبيقك معنا',
    joinUsOnSlackTitle: 'انضم الينا على Slack',
    joinUsOnSlack:
      'هل ترغب في وجود مكان للتواصل مع مهندسي React Native حول العالم؟ الانضمام الى المحادثة في سلاك المجتمع الاحمر اللانهائي! مجتمعناالمتنامي هو مساحةآمنة لطرح الاسئلة والتعلم من الآخرين وتنمية شبكتك.',
    joinSlackLink: 'انضم الي مجتمع Slack',
    makeIgniteEvenBetterTitle: 'اجعل Ignite افضل',
    makeIgniteEvenBetter:
      'هل لديك فكرة لجعل Ignite افضل؟ نحن سعداء لسماع ذلك! نحن نبحث دائماً عن الآخرين الذين يرغبون في مساعدتنا في بناء افضل الادوات المحلية التفاعلية المتوفرة هناك. انضم الينا عبر GitHub للانضمام الينا في بناء مستقبل Ignite',
    contributeToIgniteLink: 'ساهم في Ignite',
    theLatestInReactNativeTitle: 'الاحدث في React Native',
    theLatestInReactNative:
      'نخن هنا لنبقيك محدثاً على جميع React Native التي تعرضها',
    reactNativeRadioLink: 'راديو React Native',
    reactNativeNewsletterLink: 'نشرة اخبار React Native',
    reactNativeLiveLink: 'مباشر React Native',
    chainReactConferenceLink: 'مؤتمر Chain React',
    hireUsTitle: 'قم بتوظيف Infinite Red لمشروعك القادم',
    hireUs:
      'سواء كان الامر يتعلّق بتشغيل مشروع كامل او اعداد الفرق بسرعة من خلال التدريب العلمي لدينا، يمكن ان يساعد Infinite Red اللامتناهي في اي مشروع محلي يتفاعل معه.',
    hireUsLink: 'ارسل لنا رسالة',
  },
  demoShowroomScreen: {
    jumpStart: 'مكونات او عناصر لبدء مشروعك',
    lorem2Sentences:
      'عامل الناس بأخلاقك لا بأخلاقهم. عامل الناس بأخلاقك لا بأخلاقهم. عامل الناس بأخلاقك لا بأخلاقهم',
    demoHeaderTxExample: 'ياي',
    demoViaTxProp: 'عبر `tx` Prop',
    demoViaSpecifiedTxProp: 'Prop `{{prop}}Tx` عبر',
  },
  demoDebugScreen: {
    howTo: 'كيف',
    title: 'التصحيح',
    tagLine:
      'مبروك، لديك نموذج اصلي متقدم للغاية للتفاعل هنا. الاستفادة من هذه النمذجة',
    reactotron: 'Reactotron ارسل إلى',
    reportBugs: 'الابلاغ عن اخطاء',
    demoList: 'قائمة تجريبية',
    demoPodcastList: 'قائمة البودكاست التجريبي',
    androidReactotronHint:
      'اذا لم ينجح ذللك، فتأكد من تشغيل تطبيق الحاسوب الخاص Reactotron، وقم بتشغيل عكس adb tcp:9090 \ntcp:9090 من جهازك الطرفي ، واعد تحميل التطبيق',
    iosReactotronHint:
      'اذا لم ينجح ذلك، فتأكد من تشغيل تطبيق الحاسوب الخاص ب Reactotron وأعد تحميل التطبيق',
    macosReactotronHint:
      'اذا لم ينجح ذلك، فتأكد من تشغيل الحاسوب ب Reactotron وأعد تحميل التطبيق',
    webReactotronHint:
      'اذا لم ينجح ذلك، فتأكد من تشغيل الحاسوب ب Reactotron وأعد تحميل التطبيق',
    windowsReactotronHint:
      'اذا لم ينجح ذلك، فتأكد من تشغيل الحاسوب ب Reactotron وأعد تحميل التطبيق',
  },
  demoPodcastListScreen: {
    title: 'حلقات إذاعية React Native',
    onlyFavorites: 'المفضلة فقط',
    favoriteButton: 'المفضل',
    unfavoriteButton: 'غير مفضل',
    accessibility: {
      cardHint:
        'انقر مرّتين للاستماع على الحلقة. انقر مرّتين وانتظر لتفعيل {{action}} هذه الحلقة.',
      switch: 'قم بالتبديل لاظهار المفضّلة فقط.',
      favoriteAction: 'تبديل المفضلة',
      favoriteIcon: 'الحلقة الغير مفضّلة',
      unfavoriteIcon: 'الحلقة المفضّلة',
      publishLabel: 'نشرت {{date}}',
      durationLabel:
        'المدّة: {{hours}} ساعات {{minutes}} دقائق {{seconds}} ثواني',
    },
    noFavoritesEmptyState: {
      heading: 'هذا يبدو فارغاً بعض الشيء.',
      content:
        'لم تتم اضافة اي مفضلات حتى الان. اضغط على القلب في إحدى الحلقات لإضافته الى المفضلة.',
    },
  },
  emptyPage: {
    newTrips: 'لا يوجد رحلات جديدة',
    deliverd: 'لا يوجد طلبات تم توصيلها',
    topCaptians: 'لا يوجد كابتن هنا',
  },
  homeScreen: {
    title: 'نظرة عامة',
    delivered: 'تم توصيلها',
    newTrip: 'رحلات جديدة',
    searchPlaceholder: 'ابحث عن رحلة',
    newTripCard: {
      title: 'رحلة جديدة',
      receipt: 'نقطة الاستلام',
      delivery: 'نقطة التسليم',
      acceptBtn: 'قبول الطلب',
      rejectBtn: 'رفض الطلب',
    },
  },
  CaptainListScreen: {
    title: 'قائمة النخبة',
    tripCount: '{{tripCount}} رحلة',
  },
  orderScreen: {
    title: 'الطلبات',
    searchPlaceholder: 'ابحث عن طلب',
  },
  orderDetailsScreen: {
    title: 'الطلبات',
    orderDetails: 'تفاصيل الطلب',
    reviewOrder: 'طلب مراجعة',
    restaurantName: 'اسم المطعم :',
    restaurantPhoneNumber: '  رقم المطعم  :',
    customerName: ' اسم الزبون :',
    customerAddress: ' موقع الزبون :',
    customerMobileNumber: '  رقم الزبون :',
    restaurantMapLocation: 'على الخريطة',
    travelCost: 'تكلفة الرحله',
    paidAmount: '  المبلغ المحصل من العميل :',
    total: '  الاجمالي :',
    paymentType: '  وسيلة الدفع :',
    restaurantAddress: 'عنوان المطعم',
    startTrip: 'ابدء الرحلة',
    reachStartPoint: 'وصول الى نقطة الانطلاق',
    reachEndPoint: 'وصول الى نقطة التسليم',
    endTrip: 'انهاء الرحلة',
  },
  profileScreen: {
    title: 'الملف الشخصي',
    name: 'الاسم',
    email: 'البريد الالكتروني',
    location: 'العنوان',
    mobile: 'رقم الجوال',
    orders: 'الطلبات',
    logout: 'تسجيل الخروج',
    'total-orders': 'مجموع الطلبات',
    balance: 'الرصيد',
    'last-charge-status': 'حالة اخر شحنة',
    language: 'اللغة',
    'about-us': 'من نحن',
    'call-us': 'اتصل بنا',
    'contact-us': 'تواصل معنا',
    'delete-account': 'حذف الحساب',
    'edit-profile': 'تعديل البيانات الشخصية',
    'upload-image': 'رفع صورة',
    vehicleType: 'نوع المركبة',
    modalHeading: 'تفاصيل السيارة',
    'change-car-type': 'تغيير نوع المركبة',
  },
  contactUs: {
    title: 'تواصل معنا',
    'you-can-find-us': 'او يمكنك ايجادنا',
    'callUs-into': 'اتصل بنا على {{number}}',
  },
  aboutUs: {
    title: 'من نحن',
  },
  scanQr: {
    title: 'مسح الكود',
    scan: 'مسح',
    'qr-scanned': 'تم مسح الكود الخاص بالطلب بنجاح',
    'check-order': 'يمكنك مشاهدة المزيد من التفاصيل في صفحة الطلب',
    'see-orders': 'مشاهدة الطلبات',
    'scan-new-order': 'مسح طلب جديد',
    'qr-scanned-error': 'لم نتمكن من ايجاد الطلب الخاص بك',
    'scan-again': 'اعد المسح مرة اخرى',
    'return-to-orders': 'العودة للطلبات',
  },
  changeVehicleScreen: {
    title: 'تغيير نوع المركبة',
  },
  validation: {
    required: 'هذا الحقل مطلوب',
    email: 'الرجاء ادخال ايميل صحيح',
    min: 'الرجاء إدخال قيمة أكبر من أو تساوي {{min}}',
    max: 'الرجاء إدخال قيمة أقل من أو تساوي {{max}}',
    minLength: 'الرجاء ادخال على الاقل {{minLength}} حرف',
    maxLength: 'الرجاء ادخال على الاكثر {{maxLength}} حرف',
    pattern: 'يرجى تطابق الشكل المطلوب',
    numeric: 'من فضلك أدخل رقما صالحا',
    alpha: 'الرجاء إدخال الأحرف فقط',
    alphaNumeric: 'الرجاء إدخال الحروف والأرقام فقط',
    url: 'أدخل رابط صحيح من فضلك',
    lowercase: 'الرجاء إدخال حرف صغير واحد على الأقل',
    uppercase: 'الرجاء إدخال حرف كبير واحد على الأقل',
    special: 'الرجاء إدخال حرف خاص واحد على الأقل',
    'password-must-match': 'يجب أن تتطابق كلمات المرور',
  },
  or: 'او',
  errorMessages: {
    defult: 'حدث خطأ ما',
    unAuth: 'انتهت الجلسة',
  },
  // @demo remove-block-end
};

export default ar;
