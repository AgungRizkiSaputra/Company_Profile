export type Locale = 'en' | 'id';

export interface TranslationDictionary {
  meta: {
    siteName: string;
    tagline: string;
    description: string;
  };
  nav: {
    home: string;
    products: string;
    services: string;
    about: string;
    contact: string;
    requestQuote: string;
    rfqItemsCount: string;
    demoNotice: string;
  };
  footer: {
    brandBio: string;
    quickLinks: string;
    categories: string;
    compliance: string;
    privacyPolicy: string;
    termsOfUse: string;
    rightsReserved: string;
    demoDisclaimer: string;
    procurementOffice: string;
  };
  home: {
    heroTag: string;
    heroHeadline: string;
    heroSubtitle: string;
    ctaQuote: string;
    ctaCatalog: string;
    badgeVerified: string;
    stats: {
      categories: string;
      categoriesSub: string;
      fulfillment: string;
      fulfillmentSub: string;
      consolidation: string;
      consolidationSub: string;
    };
    categorySectionTitle: string;
    categorySectionSubtitle: string;
    positioningTitle: string;
    positioningSubtitle: string;
    positioningBullets: {
      title: string;
      desc: string;
    }[];
    processTitle: string;
    processSubtitle: string;
    processSteps: {
      number: string;
      title: string;
      desc: string;
    }[];
    customSourcingTitle: string;
    customSourcingSubtitle: string;
    customSourcingCta: string;
    faqTitle: string;
    faqSubtitle: string;
    faqs: {
      q: string;
      a: string;
    }[];
    ctaSectionTitle: string;
    ctaSectionSubtitle: string;
  };
  products: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterAll: string;
    noResults: string;
    viewDetails: string;
    addToRfq: string;
    addedToRfq: string;
    specifications: string;
    recommendedUse: string;
    unitLabel: string;
    b2bNoticeTitle: string;
    b2bNoticeDesc: string;
    backToCatalog: string;
  };
  services: {
    title: string;
    subtitle: string;
    introTitle: string;
    introDesc: string;
    pillars: {
      id: string;
      title: string;
      tag: string;
      desc: string;
      features: string[];
    }[];
    slaTitle: string;
    slaDesc: string;
    readyTitle: string;
    readySubtitle: string;
    readyCta: string;
  };
  about: {
    title: string;
    subtitle: string;
    storyTitle: string;
    storyP1: string;
    storyP2: string;
    storyP3: string;
    principlesTitle: string;
    principles: {
      title: string;
      desc: string;
    }[];
    demoDisclosureTitle: string;
    demoDisclosureDesc: string;
    demoPoints: string[];
  };
  contact: {
    title: string;
    subtitle: string;
    directTitle: string;
    channels: {
      name: string;
      value: string;
      note: string;
      actionText: string;
      href: string;
    }[];
    officeTitle: string;
    officeAddress: string;
    officeHours: string;
    rfqJumpTitle: string;
    rfqJumpDesc: string;
    rfqJumpCta: string;
  };
  rfq: {
    pageTitle: string;
    pageSubtitle: string;
    cartEmptyTitle: string;
    cartEmptyDesc: string;
    cartEmptyBrowse: string;
    itemListTitle: string;
    customItemTitle: string;
    customItemDesc: string;
    addCustomItemBtn: string;
    tableColProduct: string;
    tableColQty: string;
    tableColUnit: string;
    tableColSpecs: string;
    tableColAction: string;
    formContactTitle: string;
    companyName: string;
    companyNamePlaceholder: string;
    contactName: string;
    contactNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    channel: string;
    channelEmail: string;
    channelWhatsapp: string;
    deliveryDestination: string;
    deliveryPlaceholder: string;
    timeline: string;
    timelinePlaceholder: string;
    notes: string;
    notesPlaceholder: string;
    attachments: string;
    attachmentsHint: string;
    privacyConsent: string;
    privacyConsentLink: string;
    submitBtn: string;
    submittingBtn: string;
    retryBtn: string;
    disclaimer: string;
    customModal: {
      title: string;
      nameLabel: string;
      categoryLabel: string;
      qtyLabel: string;
      unitLabel: string;
      specsLabel: string;
      submitBtn: string;
      cancelBtn: string;
    };
  };
  success: {
    title: string;
    subtitle: string;
    refLabel: string;
    statusLabel: string;
    statusPending: string;
    summaryTitle: string;
    contactSummary: string;
    itemsSummary: string;
    nextStepsTitle: string;
    steps: {
      title: string;
      desc: string;
    }[];
    disclaimer: string;
    btnHome: string;
    btnCatalog: string;
    printBtn: string;
  };
  privacy: {
    title: string;
    lastUpdated: string;
    intro: string;
    sections: {
      title: string;
      content: string;
      bullets?: string[];
    }[];
  };
  terms: {
    title: string;
    lastUpdated: string;
    intro: string;
    sections: {
      title: string;
      content: string;
      bullets?: string[];
    }[];
  };
}
