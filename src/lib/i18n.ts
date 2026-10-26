import { Locale, TranslationDictionary } from '@/types/i18n';

export const dictionaries: Record<Locale, TranslationDictionary> = {
  en: {
    meta: {
      siteName: 'Velmora',
      tagline: 'One Partner. Multiple Procurement Needs.',
      description:
        'Velmora simplifies multi-category enterprise procurement across industrial supplies, electrical systems, certified safety gear, and corporate facility consumables under one dependable partner.',
    },
    nav: {
      home: 'Overview',
      products: 'Catalog',
      services: 'Procurement Services',
      about: 'About Velmora',
      contact: 'Contact & Inquiries',
      requestQuote: 'Request a Quote',
      rfqItemsCount: 'RFQ Items',
      demoNotice: 'Portfolio Demonstration Website',
    },
    footer: {
      brandBio:
        'Velmora is a structured general trading and procurement brand designed to consolidate diverse B2B operational requirements into a single transparent supply pipeline.',
      quickLinks: 'Navigation',
      categories: 'Procurement Categories',
      compliance: 'Governance & Privacy',
      privacyPolicy: 'Privacy Policy',
      termsOfUse: 'Terms of Use',
      rightsReserved: 'All rights reserved.',
      demoDisclaimer:
        'Demonstration Project: Velmora is an unbranded portfolio showcase. Product listings, specifications, and contact lines are demonstration assets and do not constitute live commercial inventory or operational corporate facilities.',
      procurementOffice: 'Procurement Coordination Desk (Demo)',
    },
    home: {
      heroTag: 'Enterprise Procurement & General Trading',
      heroHeadline: 'One Partner. Multiple Procurement Needs.',
      heroSubtitle:
        'Consolidate industrial components, electrical infrastructure, industrial safety equipment, and corporate facility supplies through a single dependable procurement partner.',
      ctaQuote: 'Build an RFQ',
      ctaCatalog: 'Browse Verified Catalog',
      badgeVerified: 'Bespoke Sourcing Available',
      stats: {
        categories: '4 Core Categories',
        categoriesSub: 'From MRO valves to facility consumables',
        fulfillment: 'Zero-Catalog Lock-in',
        fulfillmentSub: 'Custom line-item sourcing on demand',
        consolidation: 'Unified Quotation',
        consolidationSub: 'One invoice, consolidated freight logistics',
      },
      categorySectionTitle: 'Structured Procurement Categories',
      categorySectionSubtitle:
        'Explore core industrial and facility categories. Every catalog line is available for itemized RFQ quotations with project-specific tolerances and delivery staging.',
      positioningTitle: 'Why Consolidate Through Velmora?',
      positioningSubtitle:
        'Managing dozens of disparate vendors creates administrative drag, inconsistent delivery schedules, and compliance exposure. Velmora unifies your supply chain.',
      positioningBullets: [
        {
          title: 'Single Vendor of Record',
          desc: 'Eliminate paperwork overhead by transacting with one vetted supplier for mechanical, electrical, safety, and office line items.',
        },
        {
          title: 'Transparent Technical Due Diligence',
          desc: 'Material test certificates, datasheets, and batch traceability reviewed prior to dispatch to eliminate site delivery rejections.',
        },
        {
          title: 'Flexible Incoterms & Staged Staging',
          desc: 'Coordinate warehouse-to-site deliveries with milestone-based shipping schedules tailored to your project construction phases.',
        },
        {
          title: 'Dedicated Account Procurement Officer',
          desc: 'Direct communication with dedicated coordinators who understand your bill of materials and technical tolerances.',
        },
      ],
      processTitle: 'The Procurement Lifecycle',
      processSubtitle:
        'A systematic, transparent four-step workflow from RFQ receipt to confirmed site arrival.',
      processSteps: [
        {
          number: '01',
          title: 'RFQ Submission & Specification Intake',
          desc: 'Submit your bill of materials, required quantities, target brands or generic specifications, and timeline requirements via our digital RFQ engine.',
        },
        {
          number: '02',
          title: 'Technical Sourcing & Commercial Proposal',
          desc: 'Our sourcing team assesses mill-direct allocations, verifies dimensional drawings, and delivers a transparent itemized quotation with lead times.',
        },
        {
          number: '03',
          title: 'Pre-Shipment Verification & Consignment',
          desc: 'Quality inspection protocols verify dimensional conformity, packaging integrity, and documentation compliance before logistics handover.',
        },
        {
          number: '04',
          title: 'Staged Delivery & Handover Documentation',
          desc: 'Consolidated freight arrival at your designated warehouse or job site, accompanied by all delivery orders and compliance records.',
        },
      ],
      customSourcingTitle: 'Require Non-Standard or Specialized Line Items?',
      customSourcingSubtitle:
        'Our sourcing reach extends beyond the standard catalog. If your project demands custom alloys, non-standard voltages, or bespoke fabrication, add custom sourcing entries directly into your RFQ.',
      customSourcingCta: 'Add Custom Items to RFQ',
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle:
        'Clear answers regarding our commercial model, quotation process, and operational scope.',
      faqs: [
        {
          q: 'Does Velmora maintain public consumer retail pricing?',
          a: 'No. Velmora operates strictly as a B2B general trading and procurement partner. Pricing depends on volume thresholds, delivery incoterms, current commodity indices, and staged delivery schedules. All prices are provided formally via itemized RFQ.',
        },
        {
          q: 'Can we submit items not present in your digital catalog?',
          a: 'Yes. Our digital catalog showcases representative generic lines. You can utilize the "Custom Sourcing" feature within the RFQ builder to request any industrial grade component, spare part, or bulk material.',
        },
        {
          q: 'How are RFQ requests handled after submission?',
          a: 'Upon submission, a unique reference number (e.g. VEL-2026-XXXXX) is generated. You will receive an immediate acknowledgment via your preferred channel (Email or WhatsApp). A procurement specialist reviews specifications and returns a formal commercial proposal within 24 to 48 business hours.',
        },
        {
          q: 'What is the commercial status of this website?',
          a: 'Velmora is currently presented as an architectural portfolio demonstration. All catalog products, contact channels, and transaction flows are mock assets illustrating enterprise web design, stateful RFQ workflows, and data hygiene.',
        },
      ],
      ctaSectionTitle: 'Ready to Consolidate Your Project Procurement?',
      ctaSectionSubtitle:
        'Assemble your bill of materials or custom sourcing specifications in minutes. Our procurement desk will review your technical parameters.',
    },
    products: {
      title: 'Procurement Catalog',
      subtitle:
        'Standardized, unbranded enterprise supplies engineered for high-duty cycles and industrial reliability. Request quotes for individual items or full container allotments.',
      searchPlaceholder: 'Search catalog by component name, specification, or category...',
      filterAll: 'All Categories',
      noResults: 'No components match your search filter criteria.',
      viewDetails: 'Review Specifications',
      addToRfq: 'Add to RFQ',
      addedToRfq: 'Added to RFQ',
      specifications: 'Technical Specifications',
      recommendedUse: 'Engineered Applications',
      unitLabel: 'Standard Quoting Unit',
      b2bNoticeTitle: 'B2B Quotation Protocol',
      b2bNoticeDesc:
        'Catalog items are unpriced publicly. Exact per-unit pricing, volume breaks, and freight tariffs are calculated based on your total RFQ volume and project destination.',
      backToCatalog: 'Return to Full Catalog',
    },
    services: {
      title: 'Procurement Services & Capabilities',
      subtitle:
        'From single-source consolidation to site-level technical verification, discover how Velmora structures procurement for industrial and commercial operations.',
      introTitle: 'Systematic Supply Chain Rationalization',
      introDesc:
        'Modern procurement is burdened by excessive vendor onboarding, fragmented invoice management, and delayed site deliveries. Velmora acts as a unified commercial layer, orchestrating factory allocations and logistics so your engineering teams focus on execution.',
      pillars: [
        {
          id: 'consolidation',
          tag: '01 / SOURCING',
          title: 'Consolidated General Trading',
          desc: 'Aggregate diverse procurement packages—from heavy mechanical MRO to safety gear and facility paper—into a single purchase order and single invoicing vendor.',
          features: [
            'Vendor rationalization to cut administrative accounting costs',
            'Cross-category bundling for improved logistics freight rates',
            'Unified commercial credit terms across multiple factory sources',
          ],
        },
        {
          id: 'custom',
          tag: '02 / BESPOKE',
          title: 'Technical Custom Sourcing',
          desc: 'When standard catalog items do not match exact plant specifications, our technical desk scouts qualified manufacturers capable of meeting specific tolerances and standards.',
          features: [
            'Direct factory sourcing for discontinued or legacy plant spares',
            'Bespoke dimensional and metallurgy compliance verification',
            'Drawing review and sample inspection prior to production runs',
          ],
        },
        {
          id: 'quality',
          tag: '03 / AUDIT',
          title: 'Quality Verification & Documentation',
          desc: 'Mitigate risk before materials arrive on site. We audit packaging integrity, material test reports (MTR), and conformity documentation before release.',
          features: [
            'Pre-shipment dimensional and visual inspection',
            'Compilation of mill certificates, MSDS, and user manuals',
            'Export-grade protective crating and moisture barrier packaging',
          ],
        },
        {
          id: 'logistics',
          tag: '04 / LOGISTICS',
          title: 'Staged Delivery & Job-Site Logistics',
          desc: 'Synchronize deliveries with your project milestones. We manage intermediate buffer warehousing and dispatch shipments based on contractor construction schedules.',
          features: [
            'Buffer storage for coordinated multi-container releases',
            'Flexible Incoterms (Ex-Works, FOB, CIF, DDP/Franco job site)',
            'Real-time transit milestones and electronic delivery receipts',
          ],
        },
      ],
      slaTitle: 'Our Operating Benchmarks',
      slaDesc:
        'We believe transparent commitments create dependable partnerships. Every request is handled under defined turnaround windows.',
      readyTitle: 'Have a Project Bill of Materials?',
      readySubtitle:
        'Upload your bill of materials or select catalog items to receive a comprehensive itemized commercial quote.',
      readyCta: 'Launch RFQ Builder',
    },
    about: {
      title: 'About Velmora',
      subtitle:
        'Built on the principle that multi-category corporate procurement should be transparent, accountable, and free from administrative friction.',
      storyTitle: 'The Procurement Partner Vision',
      storyP1:
        'Velmora was conceived as an answer to a persistent challenge across industrial, construction, and facility management sectors: the fragmentation of basic supply chains. Operating teams frequently manage hundreds of minor vendor relationships, resulting in duplicate administrative overhead, disparate freight charges, and unreliable quality checks.',
      storyP2:
        'By establishing a structured general trading architecture, Velmora acts as a trusted procurement intermediary. We pair rigorous supplier vetting with modern digital workflows, enabling companies to source mechanical parts, electrical conduits, safety gear, and corporate office items through a single point of accountability.',
      storyP3:
        'We reject opaque broker practices. Our objective is straightforward: clear technical data, verified specifications, honest delivery lead times, and respectful partnership with project procurement managers.',
      principlesTitle: 'Core Operating Principles',
      principles: [
        {
          title: 'Rigorous Specification Integrity',
          desc: 'We never substitute materials without explicit written client consent. What is quoted and verified on technical datasheets is what arrives at your facility.',
        },
        {
          title: 'Radical Administrative Simplicity',
          desc: 'Consolidating four procurement categories under one vendor of record cuts finance and accounting cycles by up to 60%, freeing up your team.',
        },
        {
          title: 'Pragmatic & Realistic Timelines',
          desc: 'We do not promise unrealistic delivery windows. We provide verifiable factory lead times and transparent transit milestones.',
        },
        {
          title: 'Ethical Data Stewardship',
          desc: 'Client bill of materials, engineering specs, and organizational contact data are held strictly confidential and never marketed to third parties.',
        },
      ],
      demoDisclosureTitle: 'Portfolio Demonstration Transparency',
      demoDisclosureDesc:
        'Velmora is a conceptual enterprise web design and full-stack software development demonstration created to showcase professional UI/UX standards, modern Next.js App Router architecture, and functional B2B RFQ engineering.',
      demoPoints: [
        'Velmora is not currently operating as a commercial enterprise or legally registered general trading entity.',
        'Catalog products and technical imagery are mock representative items designed to demonstrate data structures.',
        'No real commercial contracts, payment gateways, or live product shipments are conducted via this platform.',
        'Contact details, telephone numbers, and email endpoints are simulated staging assets.',
      ],
    },
    contact: {
      title: 'Contact & Inquiries',
      subtitle:
        'Connect with our procurement coordination desk. For quotation requests, we recommend utilizing the dedicated RFQ builder for expedited processing.',
      directTitle: 'Direct Coordination Channels',
      channels: [
        {
          name: 'Procurement Desk Email',
          value: 'procurement@velmora-demo.com',
          note: 'For formal RFQ documents, tenders, and vendor registrations',
          actionText: 'Compose Email',
          href: 'mailto:procurement@velmora-demo.com',
        },
        {
          name: 'Direct WhatsApp Line',
          value: '+62 812-0000-DEMO',
          note: 'Simulated demo messaging line for rapid turnaround inquiries',
          actionText: 'Message via WhatsApp',
          href: 'https://wa.me/6281200000000?text=Hello%20Velmora%20Procurement%20Desk',
        },
        {
          name: 'Corporate Desk',
          value: 'inquiries@velmora-demo.com',
          note: 'For institutional partnerships and vendor onboarding',
          actionText: 'Inquire',
          href: 'mailto:inquiries@velmora-demo.com',
        },
      ],
      officeTitle: 'Procurement Liaison Office (Demo)',
      officeAddress:
        'Menara B2B Nusantara, Level 18, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan, DKI Jakarta 12190 (Demo Representative Address)',
      officeHours: 'Monday – Friday: 08:30 – 17:30 WIB | Saturday & Sunday: Closed',
      rfqJumpTitle: 'Need a Formal Quotation?',
      rfqJumpDesc:
        'Using the interactive RFQ engine ensures your line items, specifications, and attachments are logged with a tracked reference number.',
      rfqJumpCta: 'Proceed to RFQ Builder',
    },
    rfq: {
      pageTitle: 'Request for Quotation (RFQ)',
      pageSubtitle:
        'Review your selected catalog items, configure custom sourcing requirements, and submit your procurement parameters for formal commercial quotation.',
      cartEmptyTitle: 'Your RFQ list is currently empty',
      cartEmptyDesc:
        'You have not added any catalog components yet. You can browse our catalog or add custom sourcing requirements below.',
      cartEmptyBrowse: 'Explore Product Catalog',
      itemListTitle: 'Requested Line Items',
      customItemTitle: 'Custom Sourcing Requirements',
      customItemDesc:
        'Do you need specialized alloys, specific brands, non-catalog dimensions, or factory machinery? Add custom line items to this quotation request.',
      addCustomItemBtn: '+ Add Custom Sourcing Item',
      tableColProduct: 'Component / Requirement',
      tableColQty: 'Quantity',
      tableColUnit: 'Unit',
      tableColSpecs: 'Tolerances & Special Notes',
      tableColAction: 'Remove',
      formContactTitle: 'Company & Contact Details',
      companyName: 'Company / Organization Name',
      companyNamePlaceholder: 'e.g. PT Konstruksi Mandiri Utama',
      contactName: 'Procurement Contact Person',
      contactNamePlaceholder: 'e.g. Sarah Adiwijaya (Procurement Manager)',
      email: 'Corporate Email Address',
      emailPlaceholder: 'e.g. s.adiwijaya@konstruksimandiri.co.id',
      phone: 'Phone / WhatsApp Number',
      phonePlaceholder: 'e.g. +62 812 3456 7890',
      channel: 'Preferred Follow-up Channel',
      channelEmail: 'Email Official Quotation (PDF)',
      channelWhatsapp: 'WhatsApp Fast Track Notification',
      deliveryDestination: 'Project Delivery Destination / Port',
      deliveryPlaceholder: 'e.g. Cikarang Industrial Estate, West Java / Port of Tanjung Priok',
      timeline: 'Target Delivery Timeline / Need Date',
      timelinePlaceholder: 'e.g. Q4 2026 / Within 4-6 weeks from PO confirmation',
      notes: 'General Project Notes / Instructions',
      notesPlaceholder: 'Detail any specific packaging requirements, incoterm preferences, or test certificates needed...',
      attachments: 'Project Specification Document or BOM (Optional)',
      attachmentsHint: 'PDF, Word (.docx), Excel (.xlsx), or Images. Max file size: 10MB.',
      privacyConsent:
        'I consent to the collection and processing of my contact and company details solely for the evaluation, fulfillment, and communication regarding this Request for Quotation in accordance with the',
      privacyConsentLink: 'Velmora Privacy Policy',
      submitBtn: 'Submit Request for Quotation',
      submittingBtn: 'Processing Secure Submission...',
      retryBtn: 'Retry Submission',
      disclaimer:
        'Notice: This submission represents a formal Request for Quotation (RFQ) and does not constitute a finalized sales transaction, binding purchase order, or immediate credit debit. Commercial terms, availability, and delivery schedules will be detailed in the official quotation.',
      customModal: {
        title: 'Add Custom Sourcing Requirement',
        nameLabel: 'Item / Material Description',
        categoryLabel: 'Category Classification',
        qtyLabel: 'Required Quantity',
        unitLabel: 'Unit of Measure',
        specsLabel: 'Exact Specifications, Tolerances, or Brand Preferences',
        submitBtn: 'Add Line Item',
        cancelBtn: 'Cancel',
      },
    },
    success: {
      title: 'Quotation Request Received',
      subtitle:
        'Your procurement requirements have been recorded and assigned a secure reference tracking number.',
      refLabel: 'Reference Tracking Number',
      statusLabel: 'Current Status',
      statusPending: 'Under Engineering Review',
      summaryTitle: 'Request Summary',
      contactSummary: 'Contact & Destination Details',
      itemsSummary: 'Itemized Bill of Materials',
      nextStepsTitle: 'What Happens Next?',
      steps: [
        {
          title: 'Automated Acknowledgment',
          desc: 'A copy of your submission has been forwarded to your email address and logged in our procurement queue.',
        },
        {
          title: 'Technical Feasibility Review',
          desc: 'Our sourcing team evaluates technical tolerances, batch availability, and mill logistics.',
        },
        {
          title: 'Commercial Proposal Issuance',
          desc: 'You will receive an itemized commercial proposal complete with unit pricing, payment milestones, and estimated delivery dates within 24 to 48 business hours.',
        },
      ],
      disclaimer:
        'Reminder: An RFQ is an exploratory quotation request, not a commercial invoice. No payment is required until a formal Sales Contract is reviewed and executed by both parties.',
      btnHome: 'Return to Homepage',
      btnCatalog: 'Browse Additional Items',
      printBtn: 'Print / Save Confirmation',
    },
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Effective Date: October 2026',
      intro:
        'Velmora ("we", "our", or "the Platform") is committed to safeguarding the privacy and security of enterprise visitors, procurement officers, and business partners. This Privacy Policy outlines our data collection, handling, and retention practices in compliance with the Indonesian Personal Data Protection Law (Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi / UU PDP) and global B2B privacy standards.',
      sections: [
        {
          title: '1. Scope and Portfolio Demonstration Context',
          content:
            'Velmora operates as an architectural demonstration and portfolio project. While fully functional technical mechanisms (including database storage, serverless processing, and secure file handling) are implemented, all data submitted through this platform is treated strictly for testing, demonstration, and evaluation purposes.',
        },
        {
          title: '2. Personal & Business Data We Collect',
          content:
            'We collect data strictly necessary to respond to and fulfill Requests for Quotation (RFQ) and customer support inquiries. We do not engage in covert device tracking or third-party behavioral profiling.',
          bullets: [
            'Contact Details: Name, job title, corporate email address, and business phone or WhatsApp number.',
            'Corporate Identification: Company name, registered business entity name, delivery destination, and postal code.',
            'Procurement Data: Bill of materials, component specifications, required quantities, target timelines, and project notes.',
            'Uploaded Documentation: Engineering drawings, specification sheets, or RFQ spreadsheets uploaded voluntarily by the user.',
            'Technical Metadata: Anonymized IP hash and timestamp solely for serverless rate-limiting and anti-spam protection.',
          ],
        },
        {
          title: '3. Legal Basis and Purpose of Processing',
          content:
            'In accordance with Article 20 of UU PDP, we process personal and corporate data exclusively based on your explicit consent and for pre-contractual steps requested by you (evaluating and preparing a commercial quotation). Data is used solely for:',
          bullets: [
            'Generating and tracking your unique RFQ reference number.',
            'Transmitting confirmation receipts and itemized commercial proposals.',
            'Clarifying engineering tolerances or delivery feasibility.',
            'Preventing bot attacks, duplicate submissions, and platform abuse.',
          ],
        },
        {
          title: '4. Data Retention Policy (12 Months)',
          content:
            'RFQ records, including line items and associated metadata, are retained for a maximum duration of 12 (twelve) months from the date of submission to facilitate quotation validity checks and follow-up commercial audits. Following this period, records are permanently deleted or irreversibly anonymized.',
        },
        {
          title: '5. Storage, Security, and Cloud Architecture',
          content:
            'Submitted RFQ data is stored in Supabase PostgreSQL databases with Row Level Security (RLS) policies enabled. Client-facing visitors cannot query or inspect submissions made by other parties. Uploaded files are stored in private storage buckets without public read URLs. Server-side inputs are sanitized and validated against rigid schemas.',
        },
        {
          title: '6. No Third-Party Marketing Trackers or Selling of Data',
          content:
            'Velmora does not sell, lease, or monetize your contact or procurement data. We do not use third-party behavioral advertising pixels (such as Meta Pixel or Google Ads trackers). Data is processed solely by essential technical service providers (database hosting and transactional email transport) under confidentiality obligations.',
        },
        {
          title: '7. Your Rights Under Indonesian Law (UU PDP)',
          content:
            'As a data subject under Indonesian law, you possess the right to: (a) request confirmation of your data in our system, (b) obtain a copy of your submitted information, (c) rectify inaccurate records, (d) withdraw consent, and (e) request permanent deletion of your RFQ submission and attachments before the 12-month retention period expires.',
        },
        {
          title: '8. Privacy Contact & Deletion Requests',
          content:
            'To exercise your rights or request immediate deletion of any submitted RFQ record, contact our designated privacy desk at privacy@velmora-demo.com with your RFQ reference number.',
        },
      ],
    },
    terms: {
      title: 'Terms of Use',
      lastUpdated: 'Effective Date: October 2026',
      intro:
        'These Terms of Use govern your access to and interaction with the Velmora digital procurement platform. By accessing this website or utilizing the Request for Quotation (RFQ) features, you agree to comply with the terms set forth herein.',
      sections: [
        {
          title: '1. Nature of the Platform & Demonstration Status',
          content:
            'Velmora is an unbranded portfolio showcase designed to demonstrate modern B2B procurement interfaces and full-stack software development. The catalog, corporate identities, and product descriptions represent conceptual demonstration material and do not constitute real-time stock inventory or binding commercial offers.',
        },
        {
          title: '2. Request for Quotation (RFQ) Protocol',
          content:
            'Submitting an RFQ through Velmora constitutes a preliminary inquiry and does NOT form a legally binding contract, sales agreement, or purchase order. All commercial terms—including unit pricing, shipping tariffs, tax duties, payment milestones, and lead times—are subject to formal review, confirmation, and explicit mutual agreement via formal contract.',
        },
        {
          title: '3. Technical Specifications & Tolerances',
          content:
            'While specifications listed in the digital catalog are based on real-world industrial benchmarks, actual physical components may vary depending on mill allocations and international standards. Buyers are responsible for confirming engineering compatibility and requirements before issuing purchase orders.',
        },
        {
          title: '4. Permitted Use & Prohibited Conduct',
          content:
            'You agree to use this platform solely for legitimate business evaluation. You must not: (a) submit fraudulent or malicious RFQ inquiries, (b) upload files containing malicious code or unauthorized trade secrets, (c) attempt to circumvent rate limits or security mechanisms, or (d) scrape catalog data using automated robots without prior written authorization.',
        },
        {
          title: '5. Limitation of Liability',
          content:
            'To the maximum extent permitted by applicable law, Velmora and its developers shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this platform, reliance on demonstration catalog data, or temporary service interruptions.',
        },
        {
          title: '6. Governing Law & Jurisdiction',
          content:
            'These Terms of Use shall be interpreted and governed in accordance with the laws of the Republic of Indonesia. Any disputes arising in connection with the platform shall be submitted to the competent courts of Jakarta, Indonesia.',
        },
      ],
    },
  },
  id: {
    meta: {
      siteName: 'Velmora',
      tagline: 'Satu Mitra. Beragam Kebutuhan Pengadaan.',
      description:
        'Velmora menyederhanakan pengadaan multi-kategori B2B untuk kebutuhan pasokan industri, sistem elektrikal, alat pelindung diri (APD), dan perlengkapan fasilitas operasional dalam satu kemitraan terpercaya.',
    },
    nav: {
      home: 'Beranda',
      products: 'Katalog',
      services: 'Layanan Pengadaan',
      about: 'Tentang Velmora',
      contact: 'Kontak & Kanal',
      requestQuote: 'Minta Penawaran',
      rfqItemsCount: 'Item RFQ',
      demoNotice: 'Website Demonstrasi Portofolio',
    },
    footer: {
      brandBio:
        'Velmora adalah brand perdagangan umum dan pengadaan terstruktur untuk mengonsolidasikan berbagai kebutuhan operasional B2B ke dalam satu jalur pasokan yang transparan dan terukur.',
      quickLinks: 'Navigasi',
      categories: 'Kategori Pengadaan',
      compliance: 'Kepatuhan & Privasi',
      privacyPolicy: 'Kebijakan Privasi',
      termsOfUse: 'Syarat & Ketentuan',
      rightsReserved: 'Hak cipta dilindungi undang-undang.',
      demoDisclaimer:
        'Proyek Demonstrasi: Velmora adalah karya portofolio tanpa merek resmi. Daftar produk, spesifikasi teknis, dan kanal kontak adalah materi demonstrasi serta bukan inventaris komersial aktif atau kantor fisik operasional.',
      procurementOffice: 'Meja Koordinasi Pengadaan (Demo)',
    },
    home: {
      heroTag: 'Pengadaan Terintegrasi & Perdagangan Umum B2B',
      heroHeadline: 'Satu Mitra. Beragam Kebutuhan Pengadaan.',
      heroSubtitle:
        'Satukan pengadaan komponen industri, infrastruktur elektrikal, keselamatan kerja bersertifikasi, dan perlengkapan fasilitas kantor melalui satu mitra pengadaan yang andal.',
      ctaQuote: 'Susun Permintaan RFQ',
      ctaCatalog: 'Jelajahi Katalog Lengkap',
      badgeVerified: 'Layanan Custom Sourcing Tersedia',
      stats: {
        categories: '4 Kategori Utama',
        categoriesSub: 'Dari katup industri MRO hingga kertas arsip',
        fulfillment: 'Tanpa Keterikatan Katalog',
        fulfillmentSub: 'Pencarian sumber khusus sesuai spesifikasi',
        consolidation: 'Penawaran Terpadu',
        consolidationSub: 'Satu faktur pembayaran, logistik konsolidasi',
      },
      categorySectionTitle: 'Kategori Pengadaan Terstruktur',
      categorySectionSubtitle:
        'Jelajahi kategori pasokan inti kami. Setiap produk siap diajukan dalam daftar penawaran harga (RFQ) dengan toleransi teknis dan jadwal pengiriman bertahap.',
      positioningTitle: 'Mengapa Konsolidasi Lewat Velmora?',
      positioningSubtitle:
        'Mengelola puluhan vendor terpisah memicu beban administrasi tinggi, jadwal pengiriman tidak sinkron, dan risiko ketidaksesuaian mutu. Velmora menyatukannya untuk Anda.',
      positioningBullets: [
        {
          title: 'Satu Rekanan Resmi (Single Vendor)',
          desc: 'Pangkas beban administrasi keuangan dengan bertransaksi pada satu rekanan resmi untuk kebutuhan mekanikal, elektrikal, safety, dan fasilitas.',
        },
        {
          title: 'Verifikasi Teknis Transparan',
          desc: 'Sertifikat uji pabrik (MTR), lembar data, dan ketertelusuran nomor batch diperiksa sebelum pengiriman guna menghindari penolakan di lokasi proyek.',
        },
        {
          title: 'Ketentuan Incoterms & Pengiriman Bertahap',
          desc: 'Koordinasi pengiriman gudang ke lokasi proyek dengan jadwal pengiriman berbasis pencapaian konstruksi atau kebutuhan operasional Anda.',
        },
        {
          title: 'Petugas Pengadaan Khusus (Account Officer)',
          desc: 'Komunikasi langsung dengan koordinator pengadaan yang memahami daftar kebutuhan material (BOM) dan toleransi teknis proyek Anda.',
        },
      ],
      processTitle: 'Alur Proses Pengadaan',
      processSubtitle:
        'Empat langkah kerja sistematis dan transparan, mulai dari penerimaan RFQ hingga barang tiba di lokasi Anda.',
      processSteps: [
        {
          number: '01',
          title: 'Pengajuan RFQ & Penerimaan Spesifikasi',
          desc: 'Kirimkan daftar kebutuhan barang, estimasi volume, standar teknis khusus, dan target jadwal pengiriman melalui sistem RFQ digital kami.',
        },
        {
          number: '02',
          title: 'Pencarian Sumber Teknis & Penawaran Komersial',
          desc: 'Tim pengadaan kami mengecek ketersediaan alokasi pabrik, memeriksa gambar dimensi teknis, dan menerbitkan penawaran harga terperinci.',
        },
        {
          number: '03',
          title: 'Pemeriksaan Mutu & Penyiapan Pengiriman',
          desc: 'Pemeriksaan pra-pengiriman memverifikasi kesesuaian fisik, keutuhan kemasan, dan kelengkapan dokumen kepatuhan sebelum serah terima logistik.',
        },
        {
          number: '04',
          title: 'Pengiriman Bertahap & Berita Acara',
          desc: 'Barang dikirim secara konsolidasi ke gudang atau lokasi proyek Anda, lengkap dengan surat jalan resmi dan dokumen kepatuhan pendukung.',
        },
      ],
      customSourcingTitle: 'Membutuhkan Komponen Khusus di Luar Katalog?',
      customSourcingSubtitle:
        'Jangkauan pencarian kami melampaui produk standar. Jika proyek Anda membutuhkan paduan logam khusus, voltase non-standar, atau fabrikasi spesifik, masukkan kebutuhan custom sourcing langsung ke dalam formulir RFQ Anda.',
      customSourcingCta: 'Tambah Kebutuhan Custom ke RFQ',
      faqTitle: 'Pertanyaan yang Sering Diajukan',
      faqSubtitle:
        'Informasi jelas mengenai mekanisme komersial, proses penawaran harga, dan batasan operasional kami.',
      faqs: [
        {
          q: 'Apakah Velmora menampilkan harga eceran publik?',
          a: 'Tidak. Velmora murni melayani pengadaan B2B dan perdagangan umum korporat. Harga bergantung pada kuantitas pemesanan, ketentuan pengiriman (Incoterms), fluktuasi komoditas, dan jadwal pengiriman. Seluruh harga diterbitkan secara resmi melalui dokumen penawaran (RFQ).',
        },
        {
          q: 'Bisakah kami mengajukan barang yang tidak ada di katalog?',
          a: 'Bisa. Katalog digital kami menampilkan produk generik representatif. Anda dapat memanfaatkan fitur "Custom Sourcing" di formulir RFQ untuk meminta pengadaan komponen industri, suku cadang mesin, atau material khusus lainnya.',
        },
        {
          q: 'Bagaimana alur setelah formulir RFQ dikirim?',
          a: 'Setelah dikirim, nomor referensi unik (contoh: VEL-2026-XXXXX) akan dibuat otomatis oleh server. Anda menerima konfirmasi langsung via kanal pilihan (Email atau WhatsApp). Tim spesialis pengadaan kami akan meninjau parameter teknis dan mengirimkan penawaran komersial resmi dalam 24–48 jam kerja.',
        },
        {
          q: 'Apa status operasional dari website ini?',
          a: 'Velmora saat ini dihadirkan sebagai demonstrasi portofolio desain dan rekayasa perangkat lunak. Semua produk katalog, nomor kontak, dan alur transaksi adalah aset simulasi untuk mendemonstrasikan standar UI/UX profesional dan sistem RFQ fungsional.',
        },
      ],
      ctaSectionTitle: 'Siap Mengonsolidasikan Pengadaan Proyek Anda?',
      ctaSectionSubtitle:
        'Susun daftar kebutuhan material Anda sekarang. Meja pengadaan kami siap menganalisis parameter teknis dan memberikan penawaran terbaik.',
    },
    products: {
      title: 'Katalog Pengadaan',
      subtitle:
        'Komponen dan pasokan industri generik tanpa merek, dirancang untuk siklus pemakaian tinggi dan keandalan pabrik. Minta penawaran harga per unit atau skala kontainer.',
      searchPlaceholder: 'Cari komponen berdasarkan nama, spesifikasi, atau kategori...',
      filterAll: 'Semua Kategori',
      noResults: 'Tidak ada produk yang sesuai dengan kriteria pencarian Anda.',
      viewDetails: 'Lihat Spesifikasi',
      addToRfq: 'Tambah ke RFQ',
      addedToRfq: 'Ditambahkan ke RFQ',
      specifications: 'Spesifikasi Teknis',
      recommendedUse: 'Aplikasi Rekayasa',
      unitLabel: 'Satuan Penawaran Standar',
      b2bNoticeTitle: 'Ketentuan Penawaran B2B',
      b2bNoticeDesc:
        'Katalog ini tidak mencantumkan harga publik. Harga per unit, potongan kuantitas, dan tarif pengiriman dihitung secara spesifik berdasarkan total volume RFQ dan lokasi proyek Anda.',
      backToCatalog: 'Kembali ke Katalog Lengkap',
    },
    services: {
      title: 'Layanan & Kapabilitas Pengadaan',
      subtitle:
        'Mulai dari konsolidasi multi-vendor hingga verifikasi teknis di lapangan, pelajari bagaimana Velmora menstrukturkan pengadaan untuk fasilitas industri dan komersial.',
      introTitle: 'Rasionalisasi Rantai Pasok Terstruktur',
      introDesc:
        'Pengadaan modern kerap terhambat oleh proses verifikasi vendor baru yang berbelit, administrasi faktur terpecah-pecah, dan keterlambatan tiba di lokasi proyek. Velmora hadir sebagai entitas komersial tunggal yang mengoordinasikan alokasi pabrik dan logistik agar tim teknis Anda dapat fokus pada penyelesaian proyek.',
      pillars: [
        {
          id: 'consolidation',
          tag: '01 / SOURCING',
          title: 'Konsolidasi Perdagangan Umum',
          desc: 'Satukan berbagai paket pengadaan—dari peralatan mekanikal berat hingga alat pelindung diri dan kertas kantor—dalam satu pesanan pembelian (PO) dan satu faktur tagihan.',
          features: [
            'Rasionalisasi vendor untuk memangkas biaya administrasi akuntansi',
            'Penggabungan lintas kategori untuk menghemat biaya angkut logistik',
            'Ketentuan pembayaran komersial terpadu lintas sumber pabrikan',
          ],
        },
        {
          id: 'custom',
          tag: '02 / BESPOKE',
          title: 'Pengadaan Khusus (Custom Sourcing)',
          desc: 'Saat produk katalog standar tidak sesuai dengan toleransi mesin Anda, meja teknis kami mencari produsen terverifikasi yang mampu memproduksi sesuai gambar teknik.',
          features: [
            'Pencarian langsung ke pabrik untuk suku cadang mesin lama (legacy)',
            'Pemeriksaan kepatuhan dimensi teknis dan metalurgi khusus',
            'Pemeriksaan gambar teknik dan sampel sebelum produksi massal',
          ],
        },
        {
          id: 'quality',
          tag: '03 / AUDIT',
          title: 'Verifikasi Mutu & Dokumentasi',
          desc: 'Cegah risiko penolakan sebelum barang tiba di proyek. Kami mengaudit keutuhan kemasan, sertifikat uji material (MTR), dan dokumen kepatuhan sebelum barang diberangkatkan.',
          features: [
            'Inspeksi visual dan pengukuran dimensi pra-pengiriman',
            'Kompilasi sertifikat pabrik, MSDS, dan buku panduan teknis',
            'Pengemasan peti kayu standar ekspor dengan pelindung kelembapan',
          ],
        },
        {
          id: 'logistics',
          tag: '04 / LOGISTICS',
          title: 'Pengiriman Bertahap & Logistik Lapangan',
          desc: 'Sinkronisasikan pengiriman dengan jadwal konstruksi Anda. Kami menyediakan fasilitas penyimpanan penyangga (buffer storage) dan mengirimkan material sesuai tahapan kerja lapangan.',
          features: [
            'Penyimpanan penyangga untuk pengiriman kontainer terkoordinasi',
            'Pilihan Incoterms fleksibel (Ex-Works, FOB, CIF, DDP/Franco proyek)',
            'Pelacakan status pengiriman dan bukti tanda terima elektronik',
          ],
        },
      ],
      slaTitle: 'Standar Layanan Operasional',
      slaDesc:
        'Kami percaya komitmen yang transparan melahirkan kemitraan yang dapat diandalkan. Setiap permintaan ditangani dalam rentang waktu yang pasti.',
      readyTitle: 'Memiliki Daftar Kebutuhan Material (BOM)?',
      readySubtitle:
        'Unggah daftar kebutuhan atau pilih produk katalog untuk menerima penawaran harga komersial terperinci.',
      readyCta: 'Buka Formulir RFQ',
    },
    about: {
      title: 'Tentang Velmora',
      subtitle:
        'Dibangun atas prinsip bahwa pengadaan multi-kategori B2B harus transparan, dapat dipertanggungjawabkan, dan bebas dari kerumitan administrasi.',
      storyTitle: 'Visi Kemitraan Pengadaan Terpadu',
      storyP1:
        'Velmora didesain sebagai solusi atas masalah yang terus dialami sektor industri, konstruksi, dan fasilitas komersial: rantai pasok dasar yang terpecah-belah. Tim operasional sering kali harus mengelola ratusan vendor kecil sekaligus, yang memicu duplikasi pekerjaan administrasi, biaya kirim terpisah-pisah, dan pengawasan mutu yang tidak seragam.',
      storyP2:
        'Melalui arsitektur perdagangan umum yang terstruktur, Velmora berperan sebagai perantara pengadaan yang tepercaya. Kami memadukan verifikasi ketat terhadap mitra pabrik dengan alur kerja digital modern, memungkinkan perusahaan memesan komponen mekanikal, jalur elektrikal, APD, dan kebutuhan kantor melalui satu pintu tanggung jawab.',
      storyP3:
        'Kami menolak praktik perantara yang tidak transparan. Fokus kami jelas: data teknis yang akurat, spesifikasi terverifikasi, estimasi waktu kirim yang jujur, dan hubungan kemitraan profesional dengan para manajer pengadaan.',
      principlesTitle: 'Prinsip Dasar Operasional',
      principles: [
        {
          title: 'Kepatuhan Spesifikasi Mutlak',
          desc: 'Kami tidak pernah mengganti merek atau spesifikasi material tanpa persetujuan tertulis dari klien. Apa yang tertera pada lembar penawaran adalah apa yang tiba di gudang Anda.',
        },
        {
          title: 'Penyederhanaan Administrasi Nyata',
          desc: 'Mengonsolidasikan empat kategori pengadaan di bawah satu rekanan memangkas siklus administrasi keuangan hingga 60%, memberikan efisiensi bagi tim Anda.',
        },
        {
          title: 'Jadwal yang Pragmatis dan Realistis',
          desc: 'Kami tidak memberikan janji waktu kirim yang tidak realistis. Kami menyampaikan waktu produksi pabrik yang sebenarnya dan jadwal logistik yang terukur.',
        },
        {
          title: 'Kerahasiaan Data Klien Terjaga',
          desc: 'Daftar kebutuhan material (BOM), gambar teknik, dan informasi kontak perusahaan Anda dijaga kerahasiaannya dan tidak pernah diperjualbelikan kepada pihak ketiga.',
        },
      ],
      demoDisclosureTitle: 'Keterbukaan Status Demonstrasi Portofolio',
      demoDisclosureDesc:
        'Velmora merupakan proyek demonstrasi desain web korporat dan rekayasa full-stack yang dibuat untuk menunjukkan standar UI/UX profesional, arsitektur Next.js App Router, dan sistem pengolahan RFQ fungsional.',
      demoPoints: [
        'Velmora saat ini tidak beroperasi sebagai badan usaha komersial aktif atau entitas perdagangan terdaftar.',
        'Katalog produk dan foto teknis merupakan materi peraga untuk mendemonstrasikan struktur data pengadaan.',
        'Tidak ada kontrak jual-beli komersial riil, gerbang pembayaran, atau pengiriman barang fisik melalui situs ini.',
        'Informasi kontak, nomor telepon, dan alamat email adalah aset simulasi lingkungan staging.',
      ],
    },
    contact: {
      title: 'Kontak & Kanal Komunikasi',
      subtitle:
        'Hubungi meja koordinasi pengadaan kami. Untuk permintaan penawaran harga, kami menyarankan menggunakan formulir RFQ agar terdata dengan nomor pelacakan resmi.',
      directTitle: 'Kanal Koordinasi Langsung',
      channels: [
        {
          name: 'Email Meja Pengadaan',
          value: 'procurement@velmora-demo.com',
          note: 'Untuk dokumen RFQ resmi, undangan tender, dan pendaftaran vendor',
          actionText: 'Kirim Email',
          href: 'mailto:procurement@velmora-demo.com',
        },
        {
          name: 'WhatsApp Jalur Cepat',
          value: '+62 812-0000-DEMO',
          note: 'Jalur simulasi demo untuk koordinasi cepat seputar spesifikasi',
          actionText: 'Kirim Pesan WhatsApp',
          href: 'https://wa.me/6281200000000?text=Halo%20Meja%20Pengadaan%20Velmora',
        },
        {
          name: 'Meja Korporat',
          value: 'inquiries@velmora-demo.com',
          note: 'Untuk kemitraan institusi dan pendaftaran mitra pabrik',
          actionText: 'Kirim Pertanyaan',
          href: 'mailto:inquiries@velmora-demo.com',
        },
      ],
      officeTitle: 'Kantor Koordinasi Pengadaan (Demo)',
      officeAddress:
        'Menara B2B Nusantara, Lantai 18, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan, DKI Jakarta 12190 (Alamat Representasi Demo)',
      officeHours: 'Senin – Jumat: 08:30 – 17:30 WIB | Sabtu & Minggu: Libur',
      rfqJumpTitle: 'Memerlukan Penawaran Resmi?',
      rfqJumpDesc:
        'Menggunakan sistem RFQ interaktif memastikan daftar barang, spesifikasi teknis, dan dokumen lampiran Anda tercatat dengan nomor referensi unik.',
      rfqJumpCta: 'Menuju Formulir RFQ',
    },
    rfq: {
      pageTitle: 'Permintaan Penawaran Harga (RFQ)',
      pageSubtitle:
        'Tinjau produk katalog yang dipilih, tambahkan kebutuhan pengadaan khusus (custom sourcing), dan kirimkan parameter teknis Anda untuk mendapatkan penawaran komersial resmi.',
      cartEmptyTitle: 'Daftar RFQ Anda masih kosong',
      cartEmptyDesc:
        'Anda belum menambahkan produk katalog apa pun. Anda dapat menjelajahi katalog atau menambahkan kebutuhan custom sourcing di bawah ini.',
      cartEmptyBrowse: 'Jelajahi Katalog Produk',
      itemListTitle: 'Daftar Item yang Diminta',
      customItemTitle: 'Kebutuhan Pengadaan Khusus (Custom Sourcing)',
      customItemDesc:
        'Membutuhkan material dengan spesifikasi khusus, merek tertentu, ukuran non-standar, atau suku cadang pabrik? Tambahkan langsung ke dalam permintaan penawaran ini.',
      addCustomItemBtn: '+ Tambah Item Custom Sourcing',
      tableColProduct: 'Komponen / Kebutuhan',
      tableColQty: 'Jumlah',
      tableColUnit: 'Satuan',
      tableColSpecs: 'Toleransi & Catatan Khusus',
      tableColAction: 'Hapus',
      formContactTitle: 'Identitas Perusahaan & Kontak',
      companyName: 'Nama Perusahaan / Instansi',
      companyNamePlaceholder: 'contoh: PT Konstruksi Mandiri Utama',
      contactName: 'Nama Lengkap PIC Pengadaan',
      contactNamePlaceholder: 'contoh: Sarah Adiwijaya (Manager Pengadaan)',
      email: 'Alamat Email Korporat',
      emailPlaceholder: 'contoh: s.adiwijaya@konstruksimandiri.co.id',
      phone: 'Nomor Telepon / WhatsApp',
      phonePlaceholder: 'contoh: +62 812 3456 7890',
      channel: 'Pilihan Kanal Tindak Lanjut',
      channelEmail: 'Kirim Dokumen Penawaran Resmi via Email (PDF)',
      channelWhatsapp: 'Pemberitahuan Cepat via WhatsApp',
      deliveryDestination: 'Lokasi Pengiriman Proyek / Pelabuhan Tujuan',
      deliveryPlaceholder: 'contoh: Kawasan Industri Cikarang, Jawa Barat / Pelabuhan Tanjung Priok',
      timeline: 'Target Jadwal Kebutuhan / Tiba di Lokasi',
      timelinePlaceholder: 'contoh: Triwulan IV 2026 / Maksimal 4-6 minggu setelah PO',
      notes: 'Catatan Tambahan / Instruksi Khusus',
      notesPlaceholder: 'Tuliskan kebutuhan kemasan peti kayu khusus, ketentuan Incoterms, atau sertifikat uji yang diwajibkan...',
      attachments: 'Dokumen Spesifikasi Teknis atau BOM (Opsional)',
      attachmentsHint: 'Format PDF, Word (.docx), Excel (.xlsx), atau Gambar. Ukuran maksimal: 10MB.',
      privacyConsent:
        'Saya menyetujui pengumpulan dan pemrosesan data kontak serta profil perusahaan saya semata-mata untuk keperluan evaluasi, penyusunan penawaran, dan komunikasi pengadaan ini sesuai dengan',
      privacyConsentLink: 'Kebijakan Privasi Velmora',
      submitBtn: 'Kirim Permintaan Penawaran (RFQ)',
      submittingBtn: 'Memproses Pengiriman Aman...',
      retryBtn: 'Coba Kirim Ulang',
      disclaimer:
        'Pemberitahuan: Pengiriman ini merupakan Permintaan Penawaran Harga (RFQ) dan BUKAN merupakan transaksi jual-beli final, pesanan pembelian mengikat, atau penagihan langsung. Harga resmi, ketersediaan, dan jadwal pengiriman akan disampaikan dalam surat penawaran komersial resmi.',
      customModal: {
        title: 'Tambah Kebutuhan Pengadaan Khusus',
        nameLabel: 'Nama Komponen / Deskripsi Barang',
        categoryLabel: 'Klasifikasi Kategori',
        qtyLabel: 'Jumlah Kebutuhan',
        unitLabel: 'Satuan Ukuran',
        specsLabel: 'Spesifikasi Teknis, Toleransi, atau Merek Acuan',
        submitBtn: 'Tambahkan ke Daftar',
        cancelBtn: 'Batal',
      },
    },
    success: {
      title: 'Permintaan Penawaran Berhasil Dikirim',
      subtitle:
        'Data kebutuhan pengadaan Anda telah berhasil tersimpan dan mendapatkan nomor referensi pelacakan yang aman.',
      refLabel: 'Nomor Referensi Pelacakan',
      statusLabel: 'Status Permintaan',
      statusPending: 'Sedang Ditinjau Tim Teknis',
      summaryTitle: 'Ringkasan Permintaan',
      contactSummary: 'Data Perusahaan & Tujuan Pengiriman',
      itemsSummary: 'Daftar Kebutuhan Material',
      nextStepsTitle: 'Tahapan Selanjutnya',
      steps: [
        {
          title: 'Konfirmasi Otomatis',
          desc: 'Salinan tanda terima permintaan Anda telah diteruskan ke alamat email Anda dan dicatat pada sistem antrean pengadaan kami.',
        },
        {
          title: 'Kajian Kelayakan Teknis',
          desc: 'Tim pengadaan kami menganalisis toleransi teknis, ketersediaan stok pabrik, dan estimasi waktu produksi.',
        },
        {
          title: 'Penerbitan Surat Penawaran Resmi',
          desc: 'Anda akan menerima penawaran harga komersial terperinci beserta rincian biaya pengiriman dan jadwal serah terima dalam 24–48 jam kerja.',
        },
      ],
      disclaimer:
        'Pengingat: Dokumen RFQ ini adalah permintaan penawaran harga awal, bukan faktur tagihan komersial. Tidak ada pembayaran yang dilakukan sampai Kontrak Jual-Beli resmi ditandatangani oleh kedua belah pihak.',
      btnHome: 'Kembali ke Beranda',
      btnCatalog: 'Lihat Produk Lainnya',
      printBtn: 'Cetak / Simpan Bukti Pengajuan',
    },
    privacy: {
      title: 'Kebijakan Privasi',
      lastUpdated: 'Tanggal Berlaku: Oktober 2026',
      intro:
        'Velmora ("kami", "milik kami", atau "Platform") berkomitmen penuh melindungi privasi dan keamanan data para pengelola pengadaan, perwakilan korporat, dan mitra bisnis. Kebijakan Privasi ini menerangkan tata cara pengumpulan, pemrosesan, dan penyimpanan data pribadi serta data korporat sesuai Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) dan standar perlindungan data B2B internasional.',
      sections: [
        {
          title: '1. Ruang Lingkup dan Status Portofolio Demonstrasi',
          content:
            'Velmora merupakan proyek demonstrasi portofolio rekayasa perangkat lunak dan desain web B2B. Kendati seluruh fitur teknis (termasuk penyimpanan basis data, serverless API, dan manajemen berkas aman) berfungsi penuh, seluruh data yang dimasukkan ke dalam platform ini ditujukan semata-mata untuk evaluasi teknis, pengujian fungsionalitas, dan demonstrasi profesional.',
        },
        {
          title: '2. Data Pribadi & Bisnis yang Dikumpulkan',
          content:
            'Kami mengumpulkan informasi yang terbatas pada kebutuhan pemrosesan Permintaan Penawaran Harga (RFQ) dan layanan komunikasi pengadaan B2B. Kami tidak mengumpulkan data perangkat tersembunyi atau profil perilaku pihak ketiga.',
          bullets: [
            'Data Kontak: Nama narahubung (PIC), jabatan, alamat email korporat, serta nomor telepon atau WhatsApp bisnis.',
            'Identitas Perusahaan: Nama badan usaha / perusahaan, alamat tujuan pengiriman, dan kode pos lokasi proyek.',
            'Data Pengadaan: Daftar kebutuhan material (BOM), spesifikasi teknis, jumlah kuantitas, target jadwal, dan instruksi logistik.',
            'Dokumen Lampiran: Berkas gambar teknik, lembar spesifikasi (datasheet), atau dokumen pendukung yang diunggah sukarela oleh pengguna.',
            'Metadata Teknis: Hash alamat IP yang dienkripsi dan penanda waktu semata-mata untuk keperluan pembatasan frekuensi akses (rate limiting) dan pencegahan bot.',
          ],
        },
        {
          title: '3. Dasar Hukum dan Tujuan Pemrosesan Data',
          content:
            'Berdasarkan Pasal 20 UU PDP, pemrosesan data dilakukan atas dasar persetujuan eksplisit Anda serta dalam rangka memenuhi langkah pra-kontraktual (evaluasi dan penyusunan dokumen penawaran harga). Data digunakan hanya untuk:',
          bullets: [
            'Menerbitkan dan melacak nomor referensi RFQ unik Anda.',
            'Mengirimkan bukti tanda terima dan surat penawaran komersial resmi.',
            'Melakukan klarifikasi toleransi teknis dan jadwal produksi.',
            'Mencegah serangan bot, pengiriman ganda, dan penyalahgunaan sistem.',
          ],
        },
        {
          title: '4. Kebijakan Retensi Data (Maksimal 12 Bulan)',
          content:
            'Catatan RFQ, termasuk rincian item kebutuhan dan metadata lampiran, disimpan untuk jangka waktu maksimal 12 (dua belas) bulan terhitung sejak tanggal pengajuan. Hal ini bertujuan untuk memudahkan peninjauan ulang masa berlaku penawaran harga. Setelah periode 12 bulan berakhir, data akan dihapus secara permanen atau dianonimkan.',
        },
        {
          title: '5. Keamanan Penyimpanan dan Arsitektur Cloud',
          content:
            'Data RFQ disimpan dalam basis data Supabase PostgreSQL dengan kebijakan keamanan Row Level Security (RLS) aktif. Pengunjung luar tidak dapat membaca atau mencari data yang diajukan oleh perusahaan lain. Berkas lampiran disimpan dalam media penyimpanan privat tanpa tautan publik. Validasi ketat dilakukan di sisi server untuk mencegah serangan injeksi dan file berbahaya.',
        },
        {
          title: '6. Tidak Ada Pelacak Pemasaran Pihak Ketiga',
          content:
            'Velmora tidak menjual, menyewakan, atau memperdagangkan data kontak maupun data pengadaan Anda kepada pihak ketiga. Kami tidak menyematkan piksel pelacak iklan perilaku (seperti Meta Pixel atau pelacak Google Ads). Data hanya diproses oleh penyedia infrastruktur teknis esensial di bawah perjanjian kerahasiaan yang ketat.',
        },
        {
          title: '7. Hak-Hak Anda Berdasarkan UU PDP Indonesia',
          content:
            'Sebagai subjek data di bawah UU No. 27 Tahun 2022, Anda berhak untuk: (a) mendapatkan konfirmasi atas data yang tersimpan, (b) memperoleh salinan data Anda, (c) memperbarui data yang tidak akurat, (d) menarik persetujuan, dan (e) mengajukan permohonan penghapusan permanen atas catatan RFQ Anda sebelum masa retensi 12 bulan berakhir.',
        },
        {
          title: '8. Kontak Permohonan Privasi & Penghapusan Data',
          content:
            'Untuk menggunakan hak Anda atau mengajukan penghapusan catatan data RFQ, silakan hubungi meja privasi kami melalui email di privacy@velmora-demo.com dengan menyertakan nomor referensi RFQ Anda.',
        },
      ],
    },
    terms: {
      title: 'Syarat & Ketentuan Penggunaan',
      lastUpdated: 'Tanggal Berlaku: Oktober 2026',
      intro:
        'Syarat & Ketentuan ini mengatur hak akses dan interaksi Anda pada platform pengadaan digital Velmora. Dengan mengakses situs ini atau menggunakan fitur Permintaan Penawaran Harga (RFQ), Anda menyatakan setuju untuk terikat oleh ketentuan di bawah ini.',
      sections: [
        {
          title: '1. Sifat Platform & Status Portofolio Demonstrasi',
          content:
            'Velmora merupakan showcase portofolio B2B yang dirancang untuk memperlihatkan standar antarmuka pengadaan profesional dan arsitektur web modern. Katalog, identitas perusahaan, dan deskripsi produk merupakan materi peraga demonstratif serta tidak mencerminkan stok inventaris fisik langsung atau penawaran komersial yang mengikat secara sepihak.',
        },
        {
          title: '2. Ketentuan Permintaan Penawaran Harga (RFQ)',
          content:
            'Pengajuan formulir RFQ melalui situs Velmora merupakan permohonan penjajakan penawaran harga dan BUKAN merupakan kontrak jual-beli yang berkekuatan hukum tetap atau pesanan pembelian (PO) mengikat. Seluruh aspek komersial—termasuk harga satuan, ongkos kirim, pajak pertambahan nilai, termin pembayaran, dan waktu serah terima—wajib dituangkan dan disepakati bersama dalam Kontrak Jual-Beli resmi.',
        },
        {
          title: '3. Spesifikasi Teknis & Toleransi Fabrikasi',
          content:
            'Meskipun data spesifikasi yang ditampilkan dalam katalog mengacu pada standar industri riil, karakteristik fisik barang dapat berbeda tergantung standar pabrikan yang ditunjuk. Pembeli bertanggung jawab penuh untuk mengonfirmasi kesesuaian teknis dan dimensi mekanikal sebelum menandatangani persetujuan pengadaan.',
        },
        {
          title: '4. Penggunaan yang Diperbolehkan & Larangan',
          content:
            'Anda setuju untuk menggunakan platform ini hanya untuk evaluasi bisnis yang sah. Anda dilarang: (a) mengirimkan data RFQ palsu atau rekayasa jahat, (b) mengunggah berkas yang mengandung kode berbahaya atau rahasia dagang pihak lain secara tidak sah, (c) berupaya menembus batas akses atau sistem keamanan server, atau (d) melakukan scraping otomatis tanpa izin tertulis.',
        },
        {
          title: '5. Batasan Tanggung Jawab',
          content:
            'Sepanjang diizinkan oleh hukum yang berlaku, Velmora beserta para pengembangnya tidak bertanggung jawab atas kerugian langsung, tidak langsung, atau insidental yang timbul akibat penggunaan situs ini, ketergantungan pada informasi demonstrasi katalog, atau gangguan teknis sementara.',
        },
        {
          title: '6. Hukum yang Mengatur & Yurisdiksi',
          content:
            'Syarat & Ketentuan Penggunaan ini diatur dan ditafsirkan berdasarkan hukum Negara Republik Indonesia. Segala perselisihan yang timbul sehubungan dengan platform ini akan diselesaikan melalui yurisdiksi pengadilan yang berwenang di Jakarta, Indonesia.',
        },
      ],
    },
  },
};
