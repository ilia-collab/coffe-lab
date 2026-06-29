/* ===================================================================
   COFFEE LAB — ტექნიკა (Equipment catalogue)
   A new page (like „სრული მენიუ") that lists every piece of equipment,
   GROUPED by brand. Each product shows a photo + name; click → a detail
   panel opens with the full info and an image gallery (all photos).

   Source of truth: ტექნიკა.json (generated from the ტექნიკა PDF) +
   technika_images/. Data is INLINED below so the app stays offline /
   no-backend (no fetch needed). Self-registering IIFE, double-load guard.
   Load AFTER app.js (and, ideally, after product-menu.js).
=================================================================== */
(function () {
  if (typeof window !== 'undefined') {
    if (window.__CL_TECHNIKA__) return;            // guard against double-load
    window.__CL_TECHNIKA__ = true;
  }
  if (typeof SECTIONS === 'undefined' || typeof CUSTOM === 'undefined') {
    console.warn('ტექნიკა.js: main app script must load first — nothing registered.');
    return;
  }

  /* ---------- category colour + label ---------- */
  Object.assign(CAT_COLOR, { technika: '#8FB7C9' });
  Object.assign(CAT_LABEL, { technika: 'ტექნიკა' });

  /* ---------- data (inlined from ტექნიკა.json) ---------- */
  const BRANDS = [
  {
    "name": "Huskee",
    "desc": "Huskee — ინოვაციური და ეკოლოგიურად სუფთა ყავის ჭიქები, დამზადებული ყავის მარცვლის გადამუშავებული ქერქისგან. ეს უნიკალური მასალა დიდხანს ინარჩუნებს სასმელის ტემპერატურას, გამძლეა და პრაქტიკული ყოველდღიური გამოყენებისთვის.\nმსუბუქი, თანამედროვე და მინიმალისტური დიზაინი კომფორტულია როგორც ხელში დასაჭერად, ისე ბარისა და კაფის ყოველდღიურ მუშაობაში."
  },
  {
    "name": "Hario",
    "desc": "Hario — იაპონური წარმოშობის უმაღლესი ხარისხის და ინოვაციური აღჭურვილობა ყავის მოსამზადებლად; აღიარებულია როგორც პროფესიონალი, ისე მოყვარული ბარისტების მიერ. ბრენდი აერთიანებს დახვეწილ დიზაინს, მაღალ ფუნქციონალსა და გამძლე მასალებს.\nHario სპეციალიზდება სითბოგამძლე ბოროსილიკატური მინის წარმოებაში — ეს მინა მდგრადია სითბოსა და ქიმიური ზემოქმედების მიმართ, დაცულია ბზარებისა და ტემპერატურის მკვეთრი ცვლილებებისგან, ამავე დროს კი გამჭვირვალე, მსუბუქი და ეკოლოგიურად სუფთაა.\nთავდაპირველად ეს მინა ლაბორატორიულ და სამედიცინო ჭურჭელში გამოიყენებოდა, სადაც სიზუსტე და უსაფრთხოება გადამწყვეტია; მოგვიანებით კი ფართოდ დაინერგა ყავისა და ჩაის აქსესუარებში, სადაც მინის სისუფთავე და სითბოს კონტროლი მნიშვნელოვან როლს ასრულებს."
  },
  {
    "name": "AeroPress",
    "desc": "AeroPress — გლობალურად აღიარებული ამერიკული ბრენდი, რომელიც ყავის მომზადების ინოვაციურ მეთოდს გვთავაზობს. მისი უნიკალური დიზაინი და მარტივი გამოყენება ყავის მოყვარულებს საშუალებას აძლევს, სწრაფად მოამზადონ სუფთა და არომატული ყავა; პროდუქცია აერთიანებს ხარისხს, კომფორტსა და ექსპერიმენტირების შესაძლებლობას.\nAeroPress 2005 წელს ალან ადლერმა შექმნა — ის უკმაყოფილო იყო ტრადიციული მეთოდებით მომზადებული ყავით და სურდა უფრო სუფთა, დაბალმჟავიანი სასმელი, რომელიც სწრაფად მზადდება."
  },
  {
    "name": "Fellow",
    "desc": "Fellow — ინოვაცია, დიზაინი და სრულყოფილი ყავის მომზადება ერთ ბრენდში. Fellow ქმნის თანამედროვე, ესთეტიკურად მიმზიდველ და ფუნქციურ მოწყობილობებს, რომლებიც ყავის მომზადებას ახალ დონეზე აჰყავს.\nეს ამერიკული ბრენდია, დაარსებული სან-ფრანცისკოში, კალიფორნიაში; პროდუქციის წარმოება ხდება ჩინეთში. Fellow სპეციალიზდება პრემიუმ კლასის ყავის მოწყობილობებსა და აქსესუარებში."
  },
  {
    "name": "Timemore",
    "desc": "Timemore — ჩინური ბრენდი, რომელიც დახვეწილ დიზაინსა და ინოვაციურ ფუნქციებს სთავაზობს ყავის მოყვარულებს. ის ქმნის პრემიუმ ხარისხის ყავის აქსესუარებს, რომლებიც აერთიანებს ესთეტიკას, პრაქტიკულობასა და სიზუსტეს — იქნება ეს ხელის საფქვავები, სასწორები თუ სხვა მოწყობილობები."
  },
  {
    "name": "Mahlkönig",
    "desc": "Mahlkönig — გერმანული ბრენდი, ყავის პროფესიონალური საფქვავების ერთ-ერთი მსოფლიო ლიდერი. გამოირჩევა მაღალი სიზუსტის დაფქვით, გამძლე მასალებითა და სტაბილური, განმეორებადი შედეგით — როგორც პროფესიონალური, ისე სახლის გამოყენებისთვის."
  },
  {
    "name": "Barista Hustle",
    "desc": "Barista Hustle — ინოვაცია, სიზუსტე და პროფესიონალური სტანდარტები ყავის სამყაროში. ბრენდი ქმნის მაღალხარისხიან აქსესუარებს, რომლებიც ბარისტებსა და ყავის ენთუზიასტებს სრულყოფილი ექსტრაქციის მიღწევაში ეხმარება და საშუალებას აძლევს, გააუმჯობესონ უნარები და მიაღწიონ იდეალურ შედეგს თითოეულ ჭიქაში."
  },
  {
    "name": "NextLevel",
    "desc": "NextLevel — ბრენდი, რომელიც ყავის მომზადებაში ინოვაციურ მიდგომას ნერგავს. მისი ცნობილი მოწყობილობა Next Level Pulsar მომხმარებელს ექსტრაქციაზე სრულ კონტროლს — წყლის ნაკადის, კონტაქტის დროისა და პროცესის ზუსტ მართვას — სთავაზობს, რათა ყავის თითოეული ნოტი უკეთ გამოვლინდეს და შედეგი დაბალანსებული იყოს."
  },
  {
    "name": "IVYKIN",
    "desc": "IVYKIN — თანამედროვე ჩინური ბრენდი, დაარსებული 2020 წელს, რომელიც პროფესიონალური ყავის აქსესუარების წარმოებაში სპეციალიზდება. მისი მიზანია ფუნქციური, გამძლე და ესთეტიკური ხელსაწყოების შექმნა როგორც პროფესიონალი ბარისტებისთვის, ისე ყავის მოყვარულებისთვის.\nბრენდის პრიორიტეტებია მაღალი ხარისხი, ინოვაციური დიზაინი და პრაქტიკულობა. პროდუქცია აერთიანებს მინიმალისტურ ვიზუალს, გამძლე მასალებსა და ეფექტურ ფუნქციონალს, რაც უზრუნველყოფს კომფორტულ და საიმედო გამოყენებას — კაფეებში, ბარებსა და სახლის პირობებშიც."
  }
];
  const PRODUCTS = [
  {
    "id": "huskee-cups-plates",
    "brand": "Huskee",
    "name": "Huskee Cups, Plates & Lids (8oz / 6oz)",
    "desc": "ხელმისაწვდომი ვარიანტები:\nHuskee 8oz — Black / Natural\nHuskee 6oz — Black / Natural\nHuskee Plate — Black / Natural\nHuskee Lids — Black",
    "images": [
      "technika_images/huskee-cups-plates_1.png",
      "technika_images/huskee-cups-plates_2.png",
      "technika_images/huskee-cups-plates_3.png",
      "technika_images/huskee-cups-plates_4.png",
      "technika_images/huskee-cups-plates_5.png",
      "technika_images/huskee-cups-plates_6.png"
    ],
    "youtube": []
  },
  {
    "id": "hario-stainless-server-600",
    "brand": "Hario",
    "name": "Hario Stainless Server 600ml",
    "desc": "Hario Stainless Server (600 მლ) — უჟანგავი ფოლადის სერვერი თერმოფუნქციით, რომელიც ინარჩუნებს სასმელის ტემპერატურას.",
    "images": [
      "technika_images/hario-stainless-server-600.png"
    ],
    "youtube": []
  },
  {
    "id": "aeropress-original-go",
    "brand": "AeroPress",
    "name": "AeroPress & AeroPress Go",
    "desc": "AeroPress და AeroPress Go.\nორივეს შეძენისას თან მოყვება ფილტრები, კოვზი და მოსარევი.\nAeroPress Go მეტად კომფორტულია სატარებლად — აქვს ჭიქა და თავსახური.",
    "images": [
      "technika_images/aeropress-original-go_1.png",
      "technika_images/aeropress-original-go_2.png"
    ],
    "youtube": [
      "https://www.youtube.com/watch?v=97VYBfxn2KI",
      "https://www.youtube.com/watch?v=f2XFwB8uCUY"
    ]
  },
  {
    "id": "aeropress-clear",
    "brand": "AeroPress",
    "name": "AeroPress Clear / Clear Blue",
    "desc": "AeroPress Clear და AeroPress Clear Blue.\nშეძენისას თან მოყვება ფილტრები, კოვზი და მოსარევი.",
    "images": [
      "technika_images/aeropress-clear_1.jpeg",
      "technika_images/aeropress-clear_2.jpeg"
    ],
    "youtube": [
      "https://www.youtube.com/watch?v=97VYBfxn2KI"
    ]
  },
  {
    "id": "aeropress-paper-filters",
    "brand": "AeroPress",
    "name": "AeroPress Paper Filters (350 pcs)",
    "desc": "ერთჯერადი ქაღალდის ფილტრები AeroPress-ისთვის. ერთ შეფუთვაში — 350 ცალი.",
    "images": [
      "technika_images/aeropress-paper-filters.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-prismo",
    "brand": "Fellow",
    "name": "Fellow Prismo (AeroPress attachment)",
    "desc": "Fellow Prismo — აეროპრესისთვის განკუთვნილი ინოვაციური დანამატი, რომელიც საშუალებას გაძლევთ, მოამზადოთ უფრო ინტენსიური, მდიდარი და ესპრესო-სტილის ყავა.\nPrismo აღჭურვილია სპეციალური წნევის სარქველით, რომელიც წყალს არ ატარებს მანამ, სანამ დაწოლას არ დაიწყებთ — ეს უზრუნველყოფს წნევის დაგროვებას და ექსტრაქციის უკეთ კონტროლს. სარქველის ცენტრალური ნარინჯისფერი დეტალი დაწოლისას ავტომატურად იხსნება და უფრო კონცენტრირებულ ყავას ქმნის.\nკომპლექტში შემავალი მრავალჯერადი უჟანგავი ფოლადის ფილტრი ატარებს ყავის ბუნებრივ ზეთებს, რის შედეგადაც სასმელი უფრო ინტენსიური გემოსა და სქელი ტექსტურისაა — ქაღალდის ფილტრით მომზადებული ყავისგან განსხვავებით.\nიდეალურია მათთვის, ვისაც სურს: ძლიერი და კონცენტრირებული ყავა, ესპრესო-სტილის შედეგი აეროპრესით და ეკოლოგიური, მრავალჯერადი ფილტრის გამოყენება.",
    "images": [
      "technika_images/fellow-prismo_1.png",
      "technika_images/fellow-prismo_2.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-aiden-brewer",
    "brand": "Fellow",
    "name": "Fellow Aiden Brewer – Black",
    "desc": "Fellow AIDEN Brewer — ახალი თაობის ავტომატური ყავის აპარატი, შექმნილი Specialty კლასის ყავის მარტივად და სტაბილური ხარისხით მოსამზადებლად.\nმისი მთავარი უპირატესობა ის არის, რომ მომხმარებელს ბარისტის გამოცდილება არ სჭირდება — აპარატი თავად აკონტროლებს ყველა მნიშვნელოვან პარამეტრს, რათა ყავა ყოველ ჯერზე ერთნაირად გემრიელი გამოვიდეს.\nროგორ მუშაობს: წინასწარ დაპროგრამებული მოხარშვის რეჟიმები, წყლის ტემპერატურის ავტომატური კონტროლი და ყავის სწორი ექსტრაქცია — შედეგი ფინჯნიდან ფინჯნამდე სტაბილურია.\n☕ ამზადებს მაღალხარისხიან, არომატულ ყავას\n🤖 მუშაობს ავტომატურად, მინიმალური ჩარევით\n🎯 შედეგი სტაბილურია, შეცდომის რისკი მინიმალური\n🖤 თანამედროვე, მინიმალისტური დიზაინი\n🏠 შესაფერისია სახლისთვის, ოფისისა და კაფისთვის",
    "images": [
      "technika_images/fellow-aiden-brewer.jpeg"
    ],
    "youtube": [
      "https://www.youtube.com/watch?v=lUFTOeT9fcE"
    ]
  },
  {
    "id": "fellow-stagg-ekg-kettle",
    "brand": "Fellow",
    "name": "Fellow Stagg EKG Electric Kettle",
    "desc": "Fellow Stagg EKG — ელექტრო ჩაიდანი.\nუპირატესობები:\n• ტემპერატურის რეგულირება — შეგვიძლია კონკრეტულ ტემპერატურაზე დაყენება და გაცხელება\n• ინარჩუნებს ტემპერატურას 60 წუთის განმავლობაში\n• აქვს გუსნეკი (gooseneck) წვერი, რაც წყლის დასხმის კონტროლს უზრუნველყოფს\nფილტრის ყავის მომზადებისას წყლის დასხმის კონტროლი მნიშვნელოვანია, რადგან ის გავლენას ახდენს ექსტრაქციაზე და საბოლოოდ ყავის გემოს განსაზღვრავს:\n• სწორი გაჯერება — წყლის თანაბარი დასხმით ყავა სწორად იხსნება და მიიღება უფრო დაბალანსებული არომატი.\n• თანაბარი ექსტრაქცია — თანაბარი და ნელი დასხმა ყველა ნაწილაკის ერთგვაროვან გახსნას უზრუნველყოფს და თავიდან აგვაცილებს გადაჭარბებულ სიმწარეს ან წყლიანობას.\n• სასურველი გემო და სხეული — სწორი ტექნიკა იძლევა სრულფასოვან, არომატულ და დაბალანსებულ სასმელს.",
    "images": [
      "technika_images/fellow-stagg-ekg-kettle_1.png",
      "technika_images/fellow-stagg-ekg-kettle_2.png",
      "technika_images/fellow-stagg-ekg-kettle_3.png"
    ],
    "youtube": [
      "https://www.youtube.com/watch?v=cgmAi6zGTKs"
    ]
  },
  {
    "id": "fellow-corvo-ekg-kettle",
    "brand": "Fellow",
    "name": "Fellow Corvo EKG Electric Kettle",
    "desc": "Fellow Corvo EKG — ელექტრო ჩაიდანი.\nუპირატესობები:\n• ტემპერატურის რეგულირება — შეგვიძლია კონკრეტულ ტემპერატურაზე დაყენება და გაცხელება\n• ინარჩუნებს ტემპერატურას 60 წუთის განმავლობაში\nამ მოდელს გუსნეკი (gooseneck) წვერი არ აქვს, ამიტომ ფილტრის ყავებისთვის მას არ ვურჩევთ.",
    "images": [
      "technika_images/fellow-corvo-ekg-kettle.png"
    ],
    "youtube": [
      "https://www.youtube.com/watch?v=R2kQdrtYydY"
    ]
  },
  {
    "id": "fellow-atmos-glass-07",
    "brand": "Fellow",
    "name": "Fellow Atmos Canister – Glass, 0.7L",
    "desc": "Fellow Atmos Canister — მინის, 0.7 ლ.\nვაკუუმური კონტეინერი, რომელიც დიდხანს ინახავს და ინარჩუნებს ყავის მარცვლების სისუფთავესა და არომატს.\nძირითადი მახასიათებლები:\n• მოცულობა: 0.7 ლ\n• მინის კორპუსი\n• ვაკუუმური ჩამკეტის სისტემა\n• იდეალურია ყავის მარცვლებისთვის\n• BPA-free",
    "images": [
      "technika_images/fellow-atmos-glass-07_1.jpeg",
      "technika_images/fellow-atmos-glass-07_2.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "fellow-atmos-matte-07",
    "brand": "Fellow",
    "name": "Fellow Atmos Canister – Matte Black, 0.7L",
    "desc": "ვაკუუმური ქილა, რომელიც ინარჩუნებს ყავის, ჩაის ან სხვა მშრალი პროდუქტების არომატს.\nსპეციფიკაციები:\n• ფერი: Matte Black\n• ტევადობა: 0.7 ლ\n• ფუნქცია: ვაკუუმური დახურვა არომატის დასაცავად",
    "images": [
      "technika_images/fellow-atmos-matte-07_1.png",
      "technika_images/fellow-atmos-matte-07_2.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "fellow-carafes",
    "brand": "Fellow",
    "name": "Fellow Mighty Small & Stagg Carafes",
    "desc": "ხელმისაწვდომი ვარიანტები:\n• Fellow Mighty Small Carafe (Smoked Glass)\n• Fellow Mighty Small Carafe (Clear)\n• Fellow Stagg Double-Walled Carafe",
    "images": [
      "technika_images/fellow-carafes_1.png",
      "technika_images/fellow-carafes_2.png",
      "technika_images/fellow-carafes_3.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-eddy-pitcher-12oz",
    "brand": "Fellow",
    "name": "Fellow Eddy Milk Pitcher 12oz",
    "desc": "Fellow Eddy Milk Pitcher (12 oz) — რძის სასხმელი ჯაგი, რომელიც გამოირჩევა სასხმელი წვერის განსაკუთრებული დიზაინით, რაც ლატე-არტისთვის ზუსტ კონტროლს იძლევა.\nერგონომიული სახელური და პრემიუმ ფოლადი კომფორტსა და გამძლეობას უზრუნველყოფს, შიდა საზომი ნიშნულები და ოპტიმიზებული ფორმა კი იდეალურ რძის ტექსტურას ქმნის.",
    "images": [
      "technika_images/fellow-eddy-pitcher-12oz.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-opus-grinder",
    "brand": "Fellow",
    "name": "Fellow Opus Conical Burr Grinder",
    "desc": "Fellow Opus Conical Burr Grinder — მრავალფუნქციური, პრემიუმ ხარისხის საფქვავი, რომელიც უზრუნველყოფს ზუსტ დაფქვას როგორც ესპრესოსთვის, ისე pour-over-ის, ფრენჩ პრესისა და ცივი ყავისთვის.\n• 6 ძირითადი + 41 მიკროკონფიგურაცია — დაფქვის სრული კონტროლი ნებისმიერი მეთოდისთვის\n• კონუსური დისკოები (Conical Burrs) — არომატის მაქსიმალური გაშლა და თანაბარი დაფქვა\n• ტურბო ძრავი და დაბალი ხმაურის სისტემა — სწრაფი და მშვიდი დაფქვა\n• სტილური და კომპაქტური დიზაინი — იდეალურია სახლისთვის, პროფესიონალური ხარისხით",
    "images": [
      "technika_images/fellow-opus-grinder_1.png"
    ],
    "youtube": []
  },
  {
    "id": "rocky-lowball-tumbler-10oz",
    "brand": "Fellow",
    "name": "Rocky Lowball Tumbler – Matte Black, 10oz",
    "desc": "Rocky Lowball Tumbler — Matte Black, 10 oz / 295 მლ (REXMB10).\nელეგანტური, შავი ზედაპირის ჭიქა, დამზადებული ორმაგი კედლის კონსტრუქციით, რომელიც ინარჩუნებს სასმელის ტემპერატურას.\nსპეციფიკაციები:\n• ფერი: Matte Black\n• მოცულობა: 10 oz / 295 მლ\n• მასალა: ორმაგი კედლის უჟანგავი ფოლადი",
    "images": [
      "technika_images/rocky-lowball-tumbler-10oz.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-carter-wide-mug",
    "brand": "Fellow",
    "name": "Fellow Carter Wide Mug",
    "desc": "Carter Wide Mug — დახვეწილი, მინიმალისტური ზედაპირის ჭიქა. ორმაგი კედელი ხელს უწყობს სასმელის ტემპერატურის შენარჩუნებას.\nსპეციფიკაციები:\n• ფერი: Matte White, Stone Blue, Black\n• მოცულობა: 12 oz / 354 მლ\n• მასალა: ორმაგი კედლის უჟანგავი ფოლადი",
    "images": [
      "technika_images/fellow-carter-wide-mug_1.png",
      "technika_images/fellow-carter-wide-mug_2.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-carter-slide-12oz",
    "brand": "Fellow",
    "name": "Fellow Carter Slide Cup 12oz – Hazy Blue",
    "desc": "Fellow Carter Slide — სამოგზაურო ჭიქა, 12 oz / 354 მლ.\nთანამედროვე ჭიქა დამამშვიდებელი Hazy Blue ფერით და პრაქტიკული, ყოველდღიური გამოყენებისთვის განკუთვნილი სლაიდ-სახურავით.\nძირითადი მახასიათებლები:\n• მოცულობა: 12 oz (354 მლ)\n• მასალა: უჟანგავი ფოლადი, კერამიკული საფარით დაფარული შიდა ნაწილი\n• ფერი: Hazy Blue\n• სლაიდ-სახურავი\n• ორმაგი კედლის ვაკუუმური იზოლაცია\n• BPA-ს გარეშე",
    "images": [
      "technika_images/fellow-carter-slide-12oz_1.jpeg",
      "technika_images/fellow-carter-slide-12oz_2.jpeg",
      "technika_images/fellow-carter-slide-12oz_3.jpeg",
      "technika_images/fellow-carter-slide-12oz_4.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "fellow-carter-lids",
    "brand": "Fellow",
    "name": "Fellow Carter Lids (Move / Slide / Cold + Straw)",
    "desc": "Move / Slide / Cold Lid + Straw — ჭიქის მრავალფუნქციური სახურავები სხვადასხვა საჭიროებისთვის:\n• Slide Lid (ცხელი სასმელებისთვის): უსაფრთხო სლაიდ-სისტემა, რომელიც საშუალებას გაძლევთ, მარტივად მიირთვათ ცხელი სასმელი, იცავს წვეთებისგან და ინარჩუნებს ტემპერატურას.\n• Cold Lid + Straw (ცივი სასმელებისთვის): იდეალურია ყინულიანი და გრილი სასმელებისთვის — საწრუპი მარტივ და მოსახერხებელ მირთმევას უზრუნველყოფს.\nორმაგი კედლის უჟანგავი ფოლადი ხანგრძლივად ინარჩუნებს სასმელის ტემპერატურას, ხოლო ელეგანტური Matte Black ფერი ხაზს უსვამს ჭიქის დიზაინს.\nსპეციფიკაციები:\n• მოცულობა: 16 oz / 473 მლ\n• მასალა: ორმაგი კედლის უჟანგავი ფოლადი\n• სახურავები: Slide Lid + Cold Lid + Straw\n• ფერი: Matte Black",
    "images": [
      "technika_images/fellow-carter-lids_1.png",
      "technika_images/fellow-carter-lids_2.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-carter-move-16oz",
    "brand": "Fellow",
    "name": "Fellow Carter Move Mug 16oz – Smoke Green",
    "desc": "Fellow Carter Move Mug — 3-in-1 სახურავით, Smoke Green, 16 oz.\nმრავალფუნქციური თერმოჭიქა ცხელი და ცივი სასმელებისთვის.\nძირითადი მახასიათებლები:\n• მოცულობა: 473 მლ (16 oz)\n• 3 სახურავი: Regular / Carry / Cold + Straw\n• კერამიკული შიდა საფარი\n• ვაკუუმური იზოლაცია\n• BPA-free",
    "images": [
      "technika_images/fellow-carter-move-16oz.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "fellow-carter-3in1-16oz",
    "brand": "Fellow",
    "name": "Fellow Carter 3-in-1 16oz – Matte White",
    "desc": "Carter 3-in-1 Lid System — უნიკალური სახურავის სისტემა, რომელიც საშუალებას გაძლევთ, მარტივად გადაერთოთ სხვადასხვა რეჟიმზე: დალევა მოძრაობაში, ტარება ან ცივი სასმელი საწრუპით.\nსპეციფიკაციები:\n• ფერი: Matte White\n• მოცულობა: 16 oz / 473 მლ\n• სახურავი: 3-in-1 (Move, Carry, Cold Lid + Straw)\n• მასალა: ორმაგი კედლის უჟანგავი ფოლადი",
    "images": [
      "technika_images/fellow-carter-3in1-16oz.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-stagg-dripper-x",
    "brand": "Fellow",
    "name": "Fellow Stagg [X] Pour-Over Dripper",
    "desc": "Stagg [X] Pour-Over Dripper — პროფესიონალურ დონეზე მოსახარშად შექმნილი დრიპერი, რომელიც წყლის თანაბარ განაწილებას უზრუნველყოფს ყავაზე; ასე მიიღებთ დახვეწილ გემოსა და არომატს თქვენს ფინჯანში.\nსპეციფიკაციები:\n• მოდელი: Stagg X\n• მასალა: უჟანგავი ფოლადი / სურსათისთვის უსაფრთხო მასალები\n• გამოყენება: Pour-Over ყავის მომზადება",
    "images": [
      "technika_images/fellow-stagg-dripper-x.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-stagg-x-filters",
    "brand": "Fellow",
    "name": "Fellow Stagg X Filters (45 pcs)",
    "desc": "Stagg [X] Filters — დამატებითი ფილტრები Stagg X დრიპერისთვის, რომლებიც დაგეხმარებათ, მიიღოთ სუფთა, არომატული ყავა.\nსპეციფიკაციები:\n• მოდელი: Stagg X Filters\n• რაოდენობა: 45 ცალი\n• გამოყენება: Pour-Over ყავის ფილტრაცია",
    "images": [
      "technika_images/fellow-stagg-x-filters.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-clara-french-press",
    "brand": "Fellow",
    "name": "Fellow Clara French Press",
    "desc": "Fellow Clara — ფრენჩ პრესი, რომელიც კლასიკურ გამოცდილებას ცვლის. მისი ვაკუუმ-იზოლირებული კედლები ინარჩუნებს ოპტიმალურ ტემპერატურას, რათა ყოველი მომდევნო ფინჯანი ისეთივე არომატული და ცხელი იყოს, როგორც პირველი. გაუმჯობესებული ფილტრი კი უზრუნველყოფს სუფთა და ნაზ გემოს, ნალექის გარეშე.\n• მარტივი გამოყენება — შეავსეთ ნიშნულამდე, ჩაწიეთ და მოურიეთ\n• მარტივი გასაწმენდი — არაწებოვანი შიდა საფარი\n• ელეგანტური და გამძლე დიზაინი",
    "images": [
      "technika_images/fellow-clara-french-press_1.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-tally-pro-scale",
    "brand": "Fellow",
    "name": "Fellow Tally Pro Scale – Studio Edition",
    "desc": "Tally Pro Scale — Studio Edition. საზომი სასწორი ჩაშენებული ტაიმერით.\n• ზუსტობა: 0,1 გ\n• მაქსიმალური წონა: 2,500 გ\nსასწორზე შეგიძლიათ დააყენოთ ყავის მომზადების „რეცეპტი“, რაც დაგეხმარებათ, გააკონტროლოთ ყავისა და წყლის სწორი თანაფარდობა.",
    "images": [
      "technika_images/fellow-tally-pro-scale_1.png",
      "technika_images/fellow-tally-pro-scale_2.png"
    ],
    "youtube": [
      "https://www.youtube.com/watch?v=4uEuj28L74A"
    ]
  },
  {
    "id": "timemore-v60-glass-dripper",
    "brand": "Timemore",
    "name": "Timemore Glass Coffee Dripper (V60)",
    "desc": "Timemore Glass Coffee Dripper (V60) — მინის დრიპერი ფილტრის ყავის მოსამზადებლად; გამოიყენება Timemore-ის ფილტრებთან ერთად.\nთუ მომხმარებელმა დრიპერის ზომა არ იცის, ვთავაზობთ 02 ზომის ფილტრს.\nთუ ფილტრი დრიპერზე დიდია, მისი გადაკეცვა შესაძლებელია; თუ ფილტრი დრიპერზე პატარაა, დიდია ალბათობა, რომ ის დაზიანდეს.",
    "images": [
      "technika_images/timemore-v60-glass-dripper_1.png",
      "technika_images/timemore-v60-glass-dripper_2.png"
    ],
    "youtube": []
  },
  {
    "id": "timemore-coffee-server-600",
    "brand": "Timemore",
    "name": "Timemore Coffee Server – Transparent Black 600ml",
    "desc": "Timemore Coffee Server (Transparent Black) — ყავის სერვერი მომზადებული ყავის ჩამოსასხმელად. მოცულობა: 600 მლ.",
    "images": [
      "technika_images/timemore-coffee-server-600_1.jpeg",
      "technika_images/timemore-coffee-server-600_2.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "timemore-fish-pure-kettle",
    "brand": "Timemore",
    "name": "Timemore Fish Pure Pour-over Kettle 700ml",
    "desc": "Timemore Fish Pure — Pour-over ჩაიდანი.\n• არ აქვს ცალკე სადგამი — გამოსაყენებლად ვურჩევთ ინდუქციურ ან გაზის ქურას\n• გუსნეკი (gooseneck) წვერი წყლის თანაბარ დასხმას უზრუნველყოფს\n• დამზადებულია უჟანგავი ფოლადისგან, ინარჩუნებს ტემპერატურას\n• ტევადობა: 700 მლ",
    "images": [
      "technika_images/timemore-fish-pure-kettle_1.png",
      "technika_images/timemore-fish-pure-kettle_2.png"
    ],
    "youtube": []
  },
  {
    "id": "timemore-fish-pro-kettle",
    "brand": "Timemore",
    "name": "Timemore Fish Pro Electric Pour-over Kettle 900ml",
    "desc": "Timemore Fish Pro — ელექტრო Pour-over ჩაიდანი, 900 მლ, შავი.\n• გუსნეკი (gooseneck) წვერი წყლის თანაბარ დასხმას უზრუნველყოფს\n• დამზადებულია უჟანგავი ფოლადისგან, ინარჩუნებს ტემპერატურას\n• აქვს ელექტრო სადგამი, რომელიც ტემპერატურას აჩვენებს",
    "images": [
      "technika_images/timemore-fish-pro-kettle.png"
    ],
    "youtube": []
  },
  {
    "id": "timemore-scale-2000g",
    "brand": "Timemore",
    "name": "Timemore Coffee Scale (2000g)",
    "desc": "Timemore Coffee Scale (ტაიმერით) — ზუსტი ყავის სასწორი.\n• მაქსიმალური წონა: 2000 გრამი; ზუსტობა: 0,1 გრამი\n• იდეალურია ესპრესოსა და ფილტრის ყავისთვის\n• ზომავს წყლის დასხმის სიჩქარესაც, რაც ხელს უწყობს ყავის პროფესიონალურ მომზადებას\n• დროის ათვლა ავტომატურად იწყება, როცა სასწორი წყლის დასხმას გრძნობს",
    "images": [
      "technika_images/timemore-scale-2000g.png"
    ],
    "youtube": []
  },
  {
    "id": "timemore-u-french-press",
    "brand": "Timemore",
    "name": "Timemore U French Press 450ml",
    "desc": "Timemore U French Press — ფრენჩ პრესი/სერვერი.\n• მოცულობა: 450 მლ\n• სიმაღლე: 18 სმ",
    "images": [
      "technika_images/timemore-u-french-press.png"
    ],
    "youtube": []
  },
  {
    "id": "timemore-s3-esp-grinder",
    "brand": "Timemore",
    "name": "Timemore Hand Grinder S3 ESP – Matt Black",
    "desc": "Timemore Hand Grinder S3 ESP — Matt Black.\nპრემიუმ კლასის ხელის საფქვავი თანამედროვე დიზაინითა და ინოვაციური ტექნოლოგიით. აღჭურვილია S2C 890 ტიპის ფოლადის ბურბებით (42 მმ დიამეტრი), რომლებიც სწრაფ, თანაბარ და ეფექტურ დაფქვას უზრუნველყოფს — განსაკუთრებით ესპრესოსა და ფილტრის ყავისთვის.\nმახასიათებლები:\n• ბურბი: ფოლადის S2C 890 ტიპი, 42 მმ\n• რეგულირება: გარე stepless სისტემა, სიზუსტე 0.015 მმ\n• მასალა: მყარი ალუმინის შენადნობი, უჟანგავი ფოლადი\n• სახელური: მაგნიტური, მარტივი დასამაგრებლად და მოსახსნელად\n• მოცულობა: 25 გრამი | წონა: 798 გრამი\n• დამატებით: სილიკონის ბაზა სტაბილურობისთვის\nგარე stepless სისტემა ხელის საფქვავებში ერთ-ერთ ყველაზე ზუსტად რეგულირებად მექანიზმად ითვლება — იდეალურია მათთვის, ვისაც სხვადასხვა მეთოდისთვის (ესპრესო, ფილტრის ყავა და სხვ.) მაღალი სიზუსტის დაფქვა სურს.",
    "images": [
      "technika_images/timemore-s3-esp-grinder.jpeg"
    ],
    "youtube": [
      "https://www.youtube.com/watch?v=hLQFtg40Luw"
    ]
  },
  {
    "id": "timemore-c3s-max-grinder",
    "brand": "Timemore",
    "name": "Timemore Hand Grinder C3S Max – Black",
    "desc": "Timemore C3S Max — Black. პრემიუმ კლასის ხელის საფქვავი სწრაფი, თანაბარი და ზუსტი დაფქვისთვის.\n• განახლებული S2C ბურბები (38 მმ) — ერთგვაროვანი დაფქვა როგორც ესპრესოსთვის, ისე ალტერნატიული მეთოდებისთვის (pour-over, AeroPress, Chemex, French Press)\n• C3S Max ვერსია — გაზრდილი მოცულობა ერთდროულად რამდენიმე ჭიქისთვის\n• ზუსტი საფეხურებიანი რეგულირება (კლიკებით) — 36 პოზიცია\n• მყარი და მსუბუქი ალუმინის კორპუსი, ტექსტურირებული ზედაპირი — სტაბილურობისა და კომფორტისთვის\n• მოხსნადი, ბრუნვადი ალუმინის სახელური — მარტივი გამოსაყენებლად და გასაწმენდად\n• მოცულობა: 30 გრამი | წონა: 585 გრამი\n✅ იდეალურია სახლში, ოფისსა თუ პროფესიონალურ გამოყენებაში.",
    "images": [
      "technika_images/timemore-c3s-max-grinder.jpeg"
    ],
    "youtube": [
      "https://www.youtube.com/watch?v=ZXpixbqhyGE"
    ]
  },
  {
    "id": "timemore-c3s-pro-grinder",
    "brand": "Timemore",
    "name": "Timemore Hand Grinder C3S Pro – Black",
    "desc": "Timemore C3S Pro — Black. კომპაქტური და გამძლე ხელის საფქვავი, შექმნილი მაღალი ხარისხის მასალებით.\n• S2C (Spike-to-Cut) ტიპის ფოლადის ბურბები (38 მმ) — თანაბარი, სწრაფი და სუფთა დაფქვა\n• საფეხურებიანი რეგულირების სისტემა (კლიკებით) — ზუსტად მოირგებთ საფქვავს სხვადასხვა მეთოდისთვის: ესპრესო, pour-over, ფრენჩ პრესი და სხვა\n• მთლიანი კორპუსი ალუმინის შენადნობისგან — სიმტკიცე, სიმსუბუქე და ელეგანტური დიზაინი\nტექნიკური მახასიათებლები:\n• ბურბი: ფოლადის S2C ტიპი, 38 მმ\n• რეგულირება: საფეხურებიანი (კლიკებით)\n• მასალა: ალუმინი + უჟანგავი ფოლადი\n• მოცულობა: 25 გრამი\n• წონა: ~530 გრამი\n• ზომები: სიმაღლე ~16 სმ, დიამეტრი ~5 სმ\n✅ იდეალური არჩევანი სახლისთვისაც და მოგზაურობისთვისაც.",
    "images": [
      "technika_images/timemore-c3s-pro-grinder.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "timemore-s3-grinder-olive",
    "brand": "Timemore",
    "name": "Timemore Hand Grinder S3 – Olive Green",
    "desc": "Timemore S3 — Olive Green. პრემიუმ კლასის ხელის საფქვავი, რომელიც აერთიანებს გამორჩეულ დიზაინსა და უმაღლესი დონის ფუნქციონალს. წარმოდგენილია ელეგანტურ ზეთისხილისფერ (Olive Green) ფერში, მყარი მეტალის კორპუსით, რაც მას გამძლესა და სტაბილურს ხდის.\n• S2C 890 ტიპის ფოლადის ბურბები (42 მმ) — თანაბარი და ეფექტური დაფქვა, იდეალური როგორც ესპრესოსთვის, ისე ალტერნატიული მეთოდებისთვის\n• გარე stepless რეგულირების სისტემა — ზუსტად დაარეგულირებთ საფქვავს სასურველი დაფქვის სტილისთვის\nტექნიკური მახასიათებლები:\n• ბურბი: S2C 890 ფოლადი, 42 მმ\n• რეგულირება: გარე stepless სისტემა, სიზუსტე 0.015 მმ\n• კორპუსი: ალუმინის შენადნობი\n• სახელური: მაგნიტური სამაგრით\n• მოცულობა: 25 გრამი\n• წონა: ~798 გრამი\n• ქვედა ნაწილი: სილიკონის ბაზა სტაბილურობისთვის\n✅ იდეალური არჩევანი პროფესიონალებისა და ყავის მოყვარულებისთვის.",
    "images": [
      "technika_images/timemore-s3-grinder-olive.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "mahlkonig-x64-sd",
    "brand": "Mahlkönig",
    "name": "Mahlkönig X64 SD Grinder",
    "desc": "Mahlkönig X64 SD — პროფესიონალური ხარისხის საფქვავი სახლისთვის.\nX64 SD პრემიუმ კლასის საფქვავია, შექმნილი მათთვის, ვისაც სახლში ბარისტას დონის სიზუსტე და მაქსიმალურად სუფთა ყავის არომატი სურს. ის იდეალურად აერთიანებს პროფესიულ ტექნოლოგიასა და სახლის გამოყენებისთვის საჭირო კომფორტს.\nსაფქვავი აღჭურვილია 64 მმ ბრტყელი ფოლადის ბურბებით, რომლებიც თანაბარ და სტაბილურ დაფქვას უზრუნველყოფს ყავის ყველა მეთოდისთვის — ესპრესო, Pour-Over, AeroPress, French Press და Cold Brew.\nრატომ გამოირჩევა X64 SD?\n☕ Zero Retention დიზაინი — დაფქული ყავა საფქვავში არ რჩება\n🎯 ყოველთვის სუფთა და ახალი დაფქვა\n⚙️ მაღალი სიზუსტე დაფქვის რეგულირებაში\n🔄 მარტივი გადართვა დაფქვის სხვადასხვა ზომას შორის\n🖤 პრემიუმ ხარისხის დიზაინი და მასალები\nშედეგი: მაქსიმალურად სუფთა გემო, სტაბილური ექსტრაქცია, მდიდარი არომატი ყოველ ფინჯანში და განმეორებადი შედეგი ყოველდღიურ გამოყენებაში.\nძირითადი პარამეტრები:\n• ბურბები: 64 მმ ბრტყელი (Flat Burrs), მაღალი ხარისხის ფოლადი\n• დაფქვის სისტემა: Single Dose + Zero Retention (ნულოვანი დარჩენა)\n• დაფქვის რეგულირება: Stepless — შეუზღუდავი, მიკრონული სიზუსტე\n• დაფქვის დიაპაზონი: ესპრესოდან ძალიან მსხვილ დაფქვამდე (Cold Brew)\n• დაფქვის სიჩქარე: 2.5–6 გ/წმ დაფქვის ზომის მიხედვით\n• მოტორი: 200W ძლიერი და ჩუმი ძრავა\n• ძაბვა: 220–240V / 50–60Hz\n• ზომები (სიგანე × სიმაღლე × სიღრმე): 14.3 × 24.9 × 25.3 სმ\n• წონა: 4.8 კგ\n• კომპლექტაცია: დოზირების ჭიქა, Bellow სისტემა, Anti-Popcorning თავსახური, Hopper Extension\n• ფერი: შავი",
    "images": [
      "technika_images/mahlkonig-x64-sd_1.jpeg",
      "technika_images/mahlkonig-x64-sd_2.jpeg"
    ],
    "youtube": [
      "https://www.youtube.com/watch?v=hnzAWfpK4kE"
    ]
  },
  {
    "id": "barista-hustle-autocomb",
    "brand": "Barista Hustle",
    "name": "Barista Hustle AutoComb (WDT tool)",
    "desc": "Barista Hustle AutoComb — ხელით მომუშავე WDT (Weiss Distribution Technique) ხელსაწყო, რომელიც ესპრესოს მომზადებამდე დაფქული ყავის თანაბარ განაწილებას ემსახურება პორტაფილტრში.\nმისი მთავარი დანიშნულებაა ყავის გროვების დაშლა და არხების (channeling) თავიდან აცილება, რაც ცუდი ესპრესოს ერთ-ერთი ყველაზე ხშირი მიზეზია.\nროგორ მუშაობს:\n• ხელსაწყოს აქვს 12 ულტრათხელი ნემსი\n• ბრუნვისას ნემსები სწრაფად ტრიალებს\n• დაფქული ყავა თანაბრად ნაწილდება მთელ პორტაფილტრში\n• შედეგად წყალი თანაბრად გადის და არა ერთ წერტილში\n👉 ეს ნიშნავს უკეთეს ექსტრაქციას და უფრო გემრიელ ესპრესოს.\n☕ აუმჯობესებს ესპრესოს გემოს\n🎯 ამცირებს შეცდომის რისკს\n🔁 უზრუნველყოფს ერთნაირ შედეგს ყოველ ჯერზე\n⏱ ზოგავს დროს — უფრო სწრაფია, ვიდრე ჩვეულებრივი WDT\n✋ არ საჭიროებს ელექტროენერგიას",
    "images": [
      "technika_images/barista-hustle-autocomb.jpeg"
    ],
    "youtube": [
      "https://www.youtube.com/watch?v=G1wedNJ7h7A"
    ]
  },
  {
    "id": "barista-hustle-comb",
    "brand": "Barista Hustle",
    "name": "Barista Hustle Comb (WDT tool)",
    "desc": "Barista Hustle Comb — Weiss-ის ხელის გამანაწილებელი (WDT) ხელსაწყო, რომელსაც აქვს რბილი სილიკონის სახელური და გამძლე უჟანგავი ფოლადის ნემსები. ეს ხელსაწყო ესპრესოს მომზადებისას მნიშვნელოვანია, რათა დაფქული ყავა თანაბრად და ერთგვაროვნად გავანაწილოთ.",
    "images": [
      "technika_images/barista-hustle-comb.jpeg"
    ],
    "youtube": [
      "https://www.youtube.com/watch?v=G1wedNJ7h7A"
    ]
  },
  {
    "id": "nextlevel-pulsar",
    "brand": "NextLevel",
    "name": "NextLevel Pulsar Brewer",
    "desc": "NextLevel Pulsar — ინოვაციური ყავის მოსამზადებელი მოწყობილობა, შექმნილი მათთვის, ვისაც ყავის ექსტრაქციაზე სრული კონტროლი და მაქსიმალურად სუფთა, მდიდარი არომატი სურს.\nPulsar აერთიანებს უნიკალურ დიზაინსა და თანამედროვე ტექნოლოგიას, რაც მომხმარებელს საშუალებას აძლევს, ზუსტად მართოს წყლის ნაკადი, კონტაქტის დრო და ექსტრაქციის პროცესი. ის აღჭურვილია ნაკადის კონტროლის სარქველით (Flow Control Valve), რომლითაც წყლის მოძრაობას სრულად აკონტროლებთ — შეგიძლიათ ნაკადის შეჩერება, ნელა გაშვება ან სრულად გახსნა.\nრა გამოარჩევს Pulsar-ს?\n☕ თანაბარი ექსტრაქცია — წყალი ერთგვაროვნად ნაწილდება\n💧 ნაკადის სრული კონტროლი — სარქველის მეშვეობით\n🫖 არ საჭიროებს სპეციალურ ჩაიდანს (gooseneck kettle)\n🔬 სპეციალური ფილტრი უზრუნველყოფს სტაბილურ ჩამოსხმას\n🎯 მარტივი გამოყენება პროფესიონალებისა და ენთუზიასტებისთვის\nროგორ მუშაობს:\n1. ყავა და წყალი თავსდება მოწყობილობაში\n2. სარქველი ინარჩუნებს წყალს საჭირო დროით\n3. მომხმარებელი თავად წყვეტს ექსტრაქციის დაწყებას\n4. ნაკადის რეგულირებით იცვლება ყავის ინტენსიურობა\n5. შედეგი — სუფთა, მდიდარი და დაბალანსებული გემო\nPulsar განსაკუთრებით კარგად ავლენს Specialty ყავის არომატულ პროფილს, ნათელ და სუფთა გემოს, დაბალანსებულ მჟავიანობასა და კონტროლირებად ინტენსიურობას.",
    "images": [
      "technika_images/nextlevel-pulsar_1.png",
      "technika_images/nextlevel-pulsar_2.jpeg",
      "technika_images/nextlevel-pulsar_3.jpeg"
    ],
    "youtube": [
      "https://www.youtube.com/watch?v=3GN-MtJZ_Tk"
    ]
  },
  {
    "id": "ivykin-basic-scale",
    "brand": "IVYKIN",
    "name": "IVYKIN Basic Coffee Scale 3kg / 400mAh",
    "desc": "IVYKIN Basic Coffee Scale — 3 კგ / 400mAh. მოდელი: VK2111002.\nკომპაქტური და ზუსტი ყავის სასწორი, შექმნილი ყავის მომზადების პროცესზე სრული კონტროლისთვის — იდეალური არჩევანი როგორც პროფესიონალი ბარისტებისთვის, ისე სახლის პირობებში.\nსასწორი აღჭურვილია ზუსტი წონის გაზომვის სისტემითა და ჩაშენებული ტაიმერით, რაც საშუალებას გაძლევთ, ერთდროულად აკონტროლოთ ყავის დოზაც და ექსტრაქციის დროც — იქნება ეს ესპრესო თუ ფილტრის ყავა.\n⚖️ მაღალი სიზუსტე წონის გაზომვაში\n⏱ ჩაშენებული ტაიმერი\n🔋 400 mAh აკუმულატორი\n🔌 USB დატენვა\n🖤 მინიმალისტური შავი დიზაინი\n🏠 პროფესიული და სახლის გამოყენებისთვის",
    "images": [
      "technika_images/ivykin-basic-scale.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "ivykin-pro-scale",
    "brand": "IVYKIN",
    "name": "IVYKIN Pro Coffee Scale 3kg / 1200mAh",
    "desc": "IVYKIN Pro Coffee Scale — 3 კგ / 1200mAh. მოდელი: MS-R30A.\nპრემიუმ კლასის ციფრული სასწორი მაღალი სიზუსტით, ტაიმერითა და დიდი ეკრანით; მუშაობს აკუმულატორზე.\nსპეციფიკაცია:\n• ზომა: 160 × 115 × 24.3 მმ\n• მაქსიმალური წონა: 3 კგ\n• ზუსტობა: 0.1 გ\n• აკუმულატორი: 1200 mAh\n• დატენვა: USB\n• განუყოფელი ელემენტი (Unremoveable Battery)",
    "images": [
      "technika_images/ivykin-pro-scale.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "ivykin-cleaning-brush",
    "brand": "IVYKIN",
    "name": "IVYKIN Cleaning Brush",
    "desc": "IVYKIN Cleaning Brush — საწმენდი ფუნჯი. მოდელი: D000567.\nორფუნქციური ხელსაწყო ყავის აპარატისა და ფილტრის გასაწმენდად: ფუნჯი და ჩაშენებული დოზირების კოვზი.\n• სახელური: შავი პლასტმასი\n• ფუნჯი: გამჭვირვალე\n• სიგრძე: 22 სმ\n• კოვზის მოცულობა: 3 გ",
    "images": [
      "technika_images/ivykin-cleaning-brush.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "ivykin-plastic-dripper",
    "brand": "IVYKIN",
    "name": "IVYKIN Plastic Dripper – Transparent (V60 style)",
    "desc": "IVYKIN Plastic Dripper — გამჭვირვალე. მოდელი: D000237.\nგამჭვირვალე და მდგრადი ყავის დრიპერი pour-over ტექნიკისთვის.\n• ზომა: 101\n• მასალა: პლასტმასი\n• იდეალურია V60-სტილის მოსამზადებლად",
    "images": [
      "technika_images/ivykin-plastic-dripper.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "ivykin-tamping-mat",
    "brand": "IVYKIN",
    "name": "IVYKIN Silicone Tamping Mat",
    "desc": "IVYKIN Tamping Mat — სილიკონის თამპერის ხალიჩა. მოდელი: VK2203151.\nმყარი და ფუნქციური ბაზა თამპერისთვის — ბარისტას აუცილებელი ხელსაწყო, რომელიც იცავს ზედაპირს თამპერის გამოყენებისას დაზიანებისგან.\n• მასალა: სილიკონი\n• ფერი: შავი\n• ზომა: 21 × 15 სმ\n• მდგრადია წყლისა და მაღალი ტემპერატურის მიმართ",
    "images": [
      "technika_images/ivykin-tamping-mat.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "ivykin-wooden-kettle-700",
    "brand": "IVYKIN",
    "name": "IVYKIN Wooden-handle Coffee Kettle 700ml",
    "desc": "IVYKIN — ხის სახელურიანი ყავის ჩაიდანი, 700 მლ. მოდელი: VK2202181.\nმახასიათებლები:\n• მოცულობა: 700 მლ\n• მასალა: უჟანგავი ფოლადი 304\n• შავი საფარი შიგნიდან და გარედან\n• ხის სახელური თერმული იზოლაციით",
    "images": [
      "technika_images/ivykin-wooden-kettle-700.jpeg"
    ],
    "youtube": []
  }
];

  const IMG_BASE = 'technika_images/';
  const BRAND_ORDER = BRANDS.map(b => b.name);
  const BRAND_DESC = {}; BRANDS.forEach(b => { BRAND_DESC[b.name] = b.desc || ''; });
  // image paths in the JSON already start with "technika_images/"
  const imgsOf = p => (p.images || []);

  /* ---------- inject the page-specific CSS once ---------- */
  (function injectCSS() {
    if (document.getElementById('tech-css')) return;
    const st = document.createElement('style');
    st.id = 'tech-css';
    st.textContent = `
.tech-card{padding:0;overflow:hidden}
.tech-thumb-wrap{position:relative;width:100%;aspect-ratio:4/3;background:#fff;display:flex;align-items:center;justify-content:center;border-bottom:1px solid var(--border)}
.tech-thumb{max-width:100%;max-height:100%;object-fit:contain;padding:10px}
.tech-card .pm-item-top{margin-top:12px;padding:0 15px}
.tech-card .pm-sub{padding:0 15px}
.tech-card .pm-open{padding:0 15px 14px}
.tech-count{position:absolute;top:8px;right:8px;background:rgba(8,5,3,.72);color:#fff;font-size:.62rem;padding:3px 7px;border-radius:6px;font-family:var(--mono)}
.tech-brand-desc{font-size:.86rem;color:var(--muted);line-height:1.55;margin:-2px 0 16px;white-space:pre-line;max-width:760px}
.tech-modal{max-width:660px}
.tech-gallery{margin:14px 0}
.tech-main{width:100%;background:#fff;border:1px solid var(--border);border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;min-height:240px;max-height:380px;overflow:hidden}
.tech-main img{max-width:100%;max-height:380px;object-fit:contain;padding:14px}
.tech-thumbs{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.tech-thumb-btn{width:62px;height:62px;background:#fff;border:1px solid var(--border);border-radius:8px;padding:3px;cursor:pointer;flex:none}
.tech-thumb-btn.active{border-color:var(--crema);box-shadow:0 0 0 2px rgba(212,165,116,.35)}
.tech-thumb-btn img{width:100%;height:100%;object-fit:contain}
.tech-yt{display:inline-block;font-family:var(--mono);font-size:.74rem;color:var(--crema);border:1px solid var(--border-strong);border-radius:7px;padding:5px 11px;text-decoration:none;margin:0 6px 6px 0}
.tech-yt:hover{background:rgba(212,165,116,.12)}
`;
    document.head.appendChild(st);
  })();

  /* =================================================================
     GRID
  ================================================================= */
  function renderCard(p) {
    const i = PRODUCTS.indexOf(p);
    const imgs = imgsOf(p);
    const cover = imgs.length ? imgs[0] : '';
    return `<button class="pm-item tech-card" data-i="${i}">
      <div class="tech-thumb-wrap">
        ${cover ? `<img class="tech-thumb" src="${esc(cover)}" alt="${esc(p.name)}" loading="lazy">` : ''}
        ${imgs.length > 1 ? `<span class="tech-count">${imgs.length} 📷</span>` : ''}
      </div>
      <div class="pm-item-top"><span class="pm-name">${esc(p.name)}</span></div>
      <span class="pm-sub">${esc(p.brand)}</span>
      <span class="pm-open">დააჭირე დეტალებისთვის →</span>
    </button>`;
  }

  function renderPage(sec) {
    const groups = BRAND_ORDER.filter(b => PRODUCTS.some(p => p.brand === b));
    return sectionHeader(sec) + `
      <div class="note study-hide" style="margin-bottom:18px">ტექნიკის კატალოგი — დაჯგუფებული ბრენდების მიხედვით. ნებისმიერ პროდუქტზე დაჭერით გაიხსნება დეტალები და ფოტოები.</div>
      ${groups.map(b => {
        const items = PRODUCTS.filter(p => p.brand === b);
        return `<div class="pm-group">
          <div class="pm-group-h">${esc(b)}<span class="pm-count mono">${items.length}</span></div>
          ${BRAND_DESC[b] ? `<div class="tech-brand-desc study-hide">${esc(BRAND_DESC[b])}</div>` : ''}
          <div class="pm-grid tech-grid">${items.map(renderCard).join('')}</div>
        </div>`;
      }).join('')}`;
  }

  function bindPage() {
    $$('.tech-card').forEach(b => b.onclick = () => openProduct(PRODUCTS[parseInt(b.dataset.i)]));
  }

  CUSTOM.technika = function (s) {
    $('#view').innerHTML = renderPage(s);
    bindPage();
  };

  /* =================================================================
     DETAIL MODAL (with image gallery)
  ================================================================= */
  let escHandler = null;
  function closeModal() {
    const m = document.getElementById('techModal');
    if (m) m.remove();
    if (escHandler) { document.removeEventListener('keydown', escHandler); escHandler = null; }
  }
  function openProduct(p) {
    if (!p) return;
    closeModal();
    const color = CAT_COLOR.technika;
    const imgs = imgsOf(p);
    const yt = (p.youtube || []).filter(Boolean);

    const gallery = imgs.length ? `
      <div class="tech-gallery">
        <div class="tech-main"><img id="techMainImg" src="${esc(imgs[0])}" alt="${esc(p.name)}"></div>
        ${imgs.length > 1 ? `<div class="tech-thumbs">${imgs.map((im, idx) =>
          `<button class="tech-thumb-btn${idx === 0 ? ' active' : ''}" data-src="${esc(im)}"><img src="${esc(im)}" alt=""></button>`
        ).join('')}</div>` : ''}
      </div>` : '';

    const m = document.createElement('div');
    m.className = 'modal-scrim';
    m.id = 'techModal';
    m.innerHTML = `<div class="modal tech-modal" role="dialog" aria-modal="true">
      <button class="modal-close" aria-label="დახურვა">×</button>
      <div class="modal-eyebrow" style="color:${color}"><span class="modal-dot" style="background:${color}"></span>${esc(p.brand)}</div>
      <h2>${esc(p.name)}</h2>
      ${gallery}
      ${p.desc ? `<div class="modal-row"><span class="ml">აღწერა</span><span style="white-space:pre-line">${esc(p.desc)}</span></div>` : ''}
      ${yt.length ? `<div class="modal-row"><span class="ml">ვიდეო</span>${yt.map(u => `<a class="tech-yt" href="${esc(u)}" target="_blank" rel="noopener">▶ YouTube</a>`).join('')}</div>` : ''}
    </div>`;
    document.body.appendChild(m);

    m.querySelector('.modal-close').onclick = closeModal;
    m.onclick = e => { if (e.target === m) closeModal(); };

    const main = m.querySelector('#techMainImg');
    m.querySelectorAll('.tech-thumb-btn').forEach(btn => btn.onclick = () => {
      if (main) main.src = btn.dataset.src;
      m.querySelectorAll('.tech-thumb-btn').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
    });

    escHandler = e => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', escHandler);
  }

  /* =================================================================
     REGISTER the new page (its own „ტექნიკა" nav group, after სრული მენიუ)
  ================================================================= */
  const TECH_SECTION = {
    id: 'technika', title: 'ტექნიკა', ico: '⚙️', cat: 'technika', group: 'ტექნიკა', custom: 'technika',
    lead: 'ყავის აპარატურის კატალოგი — ბრენდები, პროდუქტები და ფოტოები. დააჭირე პროდუქტს დეტალებისა და ფოტოებისთვის.'
  };
  let at = SECTIONS.findIndex(s => s.id === 'productmenu');
  at = (at < 0) ? SECTIONS.length : at + 1;
  SECTIONS.splice(at, 0, TECH_SECTION);

  if (typeof CONTENT !== 'undefined') CONTENT.push(TECH_SECTION);
  if (typeof SEARCH_INDEX !== 'undefined') {
    SEARCH_INDEX.push({
      id: TECH_SECTION.id, title: TECH_SECTION.title, cat: TECH_SECTION.cat,
      text: (TECH_SECTION.title + ' ' + TECH_SECTION.lead + ' ' +
        PRODUCTS.map(p => p.name + ' ' + p.brand + ' ' + (p.desc || '')).join(' '))
        .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
    });
  }

  if (typeof buildNav === 'function') buildNav();
  if (typeof updateProgressUI === 'function') updateProgressUI();
  if (typeof state !== 'undefined' && state.current === 'dashboard' && CUSTOM.dashboard) CUSTOM.dashboard();

  console.log('menu-technika.js · ' + PRODUCTS.length + ' products in ' + BRANDS.length + ' brands registered.');
})();
