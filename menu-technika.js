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
    "desc": "Huskee — ინოვაციური და ეკოლოგიურად სუფთა ყავის ჭიქებია, რომლებიც დამზადებულია\nყავის მარცვლის გადამუშავებული ქერქისგან. ეს უნიკალური მასალა უზრუნველყოფს\nსასმელის ტემპერატურის ხანგრძლივად შენარჩუნებას, არის გამძლე და ყოველდღიური\nგამოყენებისთვის პრაქტიკული.\nHuskee-ს ჭიქები გამოირჩევა მსუბუქი, თანამედროვე და მინიმალისტური დიზაინით, რომელიც\nკომფორტულია როგორც ხელში დასაჭერად, ისე ბარისა და კაფის ყოველდღიურ სამუშაოში\nგამოსაყენებლად."
  },
  {
    "name": "Hario",
    "desc": ",\nHario — იაპონიიდან წარმოშობილი უმაღლესი ხარისხის და ინოვაციური\nაღჭურვილობა ყავის მოსამზადებლად. ბრენდი აღიარებულია როგორც\nპროფესიონალი, ასევე მოყვარული ბარისტების არჩევანი.\nდახვეწილი დიზაინისა და მაღალი ფუნქციონალის შერწყმით, Hario-ს პროდუქცია\nაერთიანებს გამძლე მასალებსა და სრულყოფილ შესრულებას.\nHARIO სპეციალიზდება სითბოგამძლე ბოროსილიკატური მინის წარმოებაში —\nსპეციალური მინა, რომელიც მდგრადია სითბოსა და ქიმიური ზემოქმედების მიმართ,\nდაცულია ბზარებისა და ტემპერატურის მკვეთრი ცვლილებებისგან. ეს მინა\nგამჭვირვალე, მსუბუქი და ეკოლოგიურად სუფთაა.\n.\nთავდაპირველად იგი გამოიყენებოდა ლაბორატორიულ და სამედიცინო ჭურჭელში,\n სადაც სიზუსტე და უსაფრთხოება კრიტიკულად მნიშვნელოვანია,\nხოლო მოგვიანებით ფართოდ დაინერგა ყავისა და ჩაის აქსესუარებში — \nიქ, სადაც მინის სისუფთავე და სითბოს კონტროლი გადამწყვეტ როლს ასრულებს."
  },
  {
    "name": "AeroPress",
    "desc": "Aeropress – გლობალურად აღიარებული ბრენდი, რომელიც\nყავის მომზადების ინოვაციურ მეთოდს გვთავაზობს. მისი\nუნიკალური დიზაინი და მარტივი გამოყენება საშუალებას\nაძლევს ყავის მოყვარულებს, მოამზადონ არომატული ყავა.\nAeropress-ის პროდუქცია აერთიანებს ხარისხს, კომფორტს\nდა ექსპერიმენტირების შესაძლებლობას, რაც მას\nგანსაკუთრებულად მიმზიდველს ხდის ყავის\nენთუზიასტებისთვის.\nAEROPRESS არის ამერიკული ბრენდი\nყავის მომზადების ინოვაცია – ადლერმაAEROPRESS 2005\nწელს შექმნა, რადგან უკმაყოფილო იყო ტრადიციული\nმეთოდებით მომზადებული ყავით – სურდა უფრო სუფთა\nდა დაბალმჟავიანი სასმელი\nმზადდებოდა\n, რომელიც სწრაფად\n."
  },
  {
    "name": "Fellow",
    "desc": "Fellow – ინოვაცია, დიზაინი და სრულყოფილი ყავის\nმომზადება ერთ ბრენდში. Fellow ქმნის თანამედროვე,\nესთეტიკურად მიმზიდველ და ფუნქციურ მოწყობილობებს,\nრომლებსაც ყავის მომზადება ახალ დონეზე აჰყავს \n.\nFELLOW არის ამერიკული ბრენდი, რომელიც დაარსდა\nსან-ფრანცისკოში, კალიფორნიაში, ხოლო მისი\nპროდუქციის წარმოება ხდება ჩინეთში\nსპეციალიზირებულია პრემიუმ კლასის ყავის\nმოწყობილობებსა და აქსესუარებში\n. იგი\nყავის მოსამზადებელ პროდუქტებში."
  },
  {
    "name": "Timemore",
    "desc": "Timemore არის ჩინური ბრენდი - დახვეწილი დიზაინი და\nინოვაციური ფუნქციები ყავის მოყვარულებისთვის\nქმნის პრემიუმ ხარისხის ყავის აქსესუარებს\n. ბრენდი\n, რომლებიც\nაერთიანებს ესთეტიკას, პრაქტიკულობას და სიზუსტეს.\nიქნება ეს ხელის გრინდერები\nმოწყობილობები\n, სასწორები თუ სხვა\n."
  },
  {
    "name": "Mahlkönig",
    "desc": "Mahlkönig X64 SD — პროფესიონალური ხარისხისახლში\nMahlkönig X64 SD არის პრემიუმ კლასის საფქვავი, შექმნილი\nმათთვის, ვისაც სახლში სურს მიიღოს ბარისტას დონის\nსიზუსტე და მაქსიმალურად სუფთა ყავის არომატი. ის\nიდეალურად აერთიანებს პროფესიულ ტექნოლოგიასა და\nსახლის გამოყენებისთვის საჭირო კომფორტს.\nსაფქვავი აღჭურვილია 64 მმ ბრტყელი ფოლადის ბურბებით,\nრომლებიც უზრუნველყოფს თანაბარ და სტაბილურ დაფქვას\nყავის ყველა მომზადების მეთოდისთვის — ესპრესო, Pour-\nOver, AeroPress, French Press და Cold Brew.\nრატომ გამოირჩევა X64 SD?\n☕ Zero Retention დიზაინი — დაფქული ყავა არ რჩება\nსაფქვავში\n🎯 ყოველთვის სუფთა და ახალი დაფქვა\n⚙️ მაღალი სიზუსტე დაფქვის რეგულირებაში\n🔄 მარტივი გადართვა სხვადასხვა დაფქვის ზომებს შორის\n🖤 პრემიუმ ხარისხის დიზაინი და მასალები\nროგორია შედეგი?\nX64 SD უზრუნველყოფს:\nმაქსიმალურად სუფთა გემოს\nსტაბილურ ექსტრაქციას\nმდიდარ არომატს ყოველ ფინჯანში\nგანმეორებად შედეგს ყოველდღიურ გამოყენებაში"
  },
  {
    "name": "Barista Hustle",
    "desc": "Barista Hustle – ინოვაცია, სიზუსტე და პროფესიონალური\nსტანდარტები ყავის სამყაროში. ბრენდი ქმნის\nმაღალხარისხიან აქსესუარებს, რომლებიც ეხმარება\nბარისტებს და ყავის ენთუზიასტებს სრულყოფილი\nექსტრაქციის მიღწევაში. Barista Hustle გაძლევთ\nშესაძლებლობას, გააუმჯობესოთ თქვენი უნარები და\nმიაღწიოთ იდეალურ შედეგს თითოეულ ჭიქაში."
  },
  {
    "name": "NextLevel",
    "desc": "NextLevel Pulsar — ინოვაციური მიდგომა ყავის მომზადებაში\nNextLevel Pulsar არის თანამედროვე და\nინოვაციური ყავის მოსამზადებელი მოწყობილობა, \nრომელიც შექმნილია მათთვის, \nვისაც სურს ყავის ექსტრაქციაზე სრული კონტროლი\n და მაქსიმალურად სუფთა, მდიდარი არომატის მიღება.\nPulsar აერთიანებს უნიკალურ დიზაინს და თანამედროვე ტექნოლოგიას,\nრაც მომხმარებელს საშუალებას აძლევს ზუსტად მართოს წყლის ნაკადი, \nკონტაქტის დრო და ექსტრაქციის პროცესი. ეს ქმნის პირობებს,\nსადაც ყავის თითოეული ნოტი უკეთ იშლება \nდა შედეგი უფრო დაბალანსებული და გამოხატულია."
  },
  {
    "name": "IVYKIN",
    "desc": "IVKYN არის თანამედროვე ჩინური ბრენდი,\n რომელიც დაარსდა 2020 წელს და \nსპეციალიზდება პროფესიონალური ყავის აქსესუარების წარმოებაში.\n ბრენდის მიზანია შექმნას ფუნქციური, გამძლე და ესთეტიკური ხელსაწყოები,\n რომლებიც პასუხობს როგორც პროფესიონალი ბარისტების,\n ასევე ყავის მოყვარულების საჭიროებებს.\nIVKYN-ის მთავარი პრიორიტეტებია მაღალი ხარისხი,\n ინოვაციური დიზაინი და პრაქტიკულობა. \nბრენდის პროდუქცია აერთიანებს მინიმალისტურ ვიზუალს, \nგამძლე მასალებსა და ეფექტურ ფუნქციონალს,\n რაც უზრუნველყოფს კომფორტულ და\n საიმედო გამოყენებას ყოველდღიურ პრაქტიკაში.\nIVKYN-ის აქსესუარები იდეალურია როგორც პროფესიონალური გარემოსთვის\n — კაფეებსა და ბარებში, \nასევე სახლის პირობებში ყავის მომზადების რიტუალისთვის, \nსადაც ხარისხი და დეტალებზე ყურადღება გადამწყვეტია.\nIVKYN – პროფესიონალი ბრენდი ბარისტებისთვის და\nყავის მოყვარულებისთვის"
  }
];
  const PRODUCTS = [
  {
    "id": "huskee-cups-plates",
    "brand": "Huskee",
    "name": "Huskee Cups, Plates & Lids (8oz / 6oz)",
    "desc": "Huskee 8oz Black\nHuskee 8oz Natural\nHuskee 6oz Black\nHuskee 6oz Natural\nHuskee plate black\nHuskee plate Natural\nHuskee Lids Black",
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
    "desc": "HARIO STAINLESS SERVER 600ML\nსერვერი\nაქვს თერმო ფუნქცია და ინარჩუნებს ტემპერატურას",
    "images": [
      "technika_images/hario-stainless-server-600.png"
    ],
    "youtube": []
  },
  {
    "id": "aeropress-original-go",
    "brand": "AeroPress",
    "name": "AeroPress & AeroPress Go",
    "desc": "Aeropress\n \nAeropress Go\n \n, \nშეძენისას მიყვებაფილტრები, კოვზი და\nმოსარევი\nშეძენისას მიყვებაფილტრებიკოვზი და მოსარევი\nმეტად კომორტულია სატარებლად, აქვს ჭიქა და\nთავსახური",
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
    "desc": "AeroPress\nAeropress Clear\nAeropress Clear Blue\nშეძენისას მიყვება ფილტრები, კოვზი და\n მოსარევი",
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
    "desc": "ერთჯერადი ქაღალდის\nფილტრები\nშეფუთვაში არის 350\nცალი",
    "images": [
      "technika_images/aeropress-paper-filters.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-prismo",
    "brand": "Fellow",
    "name": "Fellow Prismo (AeroPress attachment)",
    "desc": ".\n.\nFellow Prismo არის აეროპრესისთვის განკუთვნილი\nინოვაციური დანამატი, რომელიც საშუალებას\nგაძლევთ მოამზადოთ უფრო ინტენსიური, მდიდარი\nდა ესპრესო-სტილის ყავა.\nPrismo აღჭურვილია სპეციალური წნევის\nსარქველით, რომელიც წყალს არ ატარებს მანამ,\nსანამ დაწოლას არ დაიწყებთ. ეს უზრუნველყოფს\nწნევის დაგროვებას და ექსტრაქციის უკეთ\nკონტროლს. სარქველის ცენტრალური\nნარინჯისფერი დეტალი ავტომატურად იხსნება\nდაწოლისას და ქმნის უფრო კონცენტრირებულ\nყავას.\nკომპლექტში შემავალი მრავალჯერადი უჟანგავი\nფოლადის ფილტრი ატარებს ყავის ბუნებრივ\nზეთებს, რის შედეგადაც სასმელი უფრო\nინტენსიური გემოსა და სქელი ტექსტურის ხდება —\nგანსხვავებით ქაღალდის ფილტრით მომზადებული\nყავისგან.\nFellow Prismo იდეალურია მათთვის, ვისაც სურს:\nძლიერი და კონცენტრირებული ყავა\nესპრესო-სტილის შედეგი აეროპრესით\nეკოლოგიური და მრავალჯერადი ფილტრის\nგამოყენება",
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
    "desc": "Fellow AIDEN Brewer – Black\nFellow AIDEN Brewer არის ახალი თაობის ავტომატური ყავის\nაპარატი, რომელიც სპეციალურად შექმნილია სპეციალური კლასის\n(Specialty) ყავის მარტივად და სტაბილური ხარისხით\nმოსამზადებლად.\nმისი მთავარი უპირატესობა ისაა, რომ მომხმარებელს არ სჭირდება\nბარისტის გამოცდილება — აპარატი თავად აკონტროლებს ყველა\nმნიშვნელოვან პარამეტრს, რათა ყავა ყოველ ჯერზე ერთნაირად\nგემრიელი გამოვიდეს.\nროგორ მუშაობს:\nაპარატს აქვს წინასწარ დაპროგრამებული მოხარშვის რეჟიმები\nთავად აკონტროლებს წყლის ტემპერატურას\nუზრუნველყოფს ყავის სწორ ექსტრაქციას\nშედეგი ყოველთვის სტაბილურია — ფინჯნიდან ფინჯნამდე\nეს ნიშნავს, რომ:\n ერთხელ დააყენებთ და შემდეგ ყავა ყოველთვის ერთნაირი\nხარისხის იქნება\nრატომ არის AIDEN კარგი არჩევანი?\n☕ ამზადებს მაღალხარისხიან, არომატულ ყავას\n🤖 მუშაობს ავტომატურად — მინიმალური ჩარევით\n🎯 შედეგი სტაბილურია, შეცდომის რისკი მინიმალურია\n🖤 დიზაინი თანამედროვე და მინიმალისტურია\n🏠 შესაფერისია როგორც სახლისთვის, ასევე ოფისისა და\nკაფისთვის",
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
    "desc": "Fellow-ს ელექტრო ჩაიდანი\nუპირატესობები\nტემპერატურის საზომი - შეგვიძლია კონკრეტულ\nტემპერატურაზე დავაყენოთ და გავაცხელოთ\nინარჩუნებს ტემპერატურას 60 წუთის განმავლობაში\nაქვს გუსქნექი, რაც განაპირობებს წყლის დასხმის\nკონტროლს\n Fellow stagg EKG\n Fellow stagg EKG\n Fellow stagg EKG\nფილტრის ყავის მომზადებისას წყლის დასხმის კონტროლი\nმნიშვნელოვანია, რადგან ის გავლენას ახდენს ექსტრაქციაზე, რაც\nსაბოლოოდ ყავის გემოს განსაზღვრავს.\n სწორი გაჯერება – წყლის თანაბარი დასხმით ყავა სწორად იხსნება\nდა მიიღება უფრო დაბალანსებული არომატი.\n თანაბარი ექსტრაქცია – თანაბარი და ნელი დასხმა\nუზრუნველყოფს ყველა ყავის ნაწილაკის ერთგვაროვან გახსნას,\nრაც თავიდან აცილებს გადაჭარბებულ სიმწარეს ან წყლიანობას.\n სასურველი გემო და სხეული – სწორი ტექნიკა იძლევა\nსრულფასოვან, არომატულ და დაბალანსებულ სასმელს.",
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
    "desc": "Fellow-ს ელექტრო ჩაიდანი\nუპირატესობები\nტემპერატურის საზომი, შეგვიძლია\nკონკრეტულ ტემპერატურაზე დავაყენოთ და\nგავაცხელოთ\nინარჩუნებს ტემპერატურას 60 წუთის\nგანმავლობაში\nამ კონკრეტულ მოდელს არ აქვს გუსნექი,\nამიტომ ფილტრის ყავებისთვის არ ვუწევთ\nრეკომენდაციას\nFellow Corvo EKG",
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
    "desc": "Fellow Atmos Canister – Glass, 0.7L\nმოკლე აღწერა\nვაკუუმურიკონტეინერი, რომელიც დიდხანს\nინახავს და ინარჩუნებს ყავის მარცვლების\nსისუფთავესა და არომატს.\nძირითადი მახასიათებლები\nმოცულობა: 0.7 ლ\nმინისკორპუსი\nვაკუუმურიჩამკეტისისტემა\nიდეალურიაყავისმარცვლებისთვის\nBPA-free",
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
    "desc": "ვაკუუმური ქილა ინარჩუნებს ყავის,\nჩაის ან სხვა მშრალი პროდუქტების\nარომატს.\nსპეციფიკაციები:\nფერი: Matte Black\nტევადობა: 0.7L\nფუნქცია: ვაკუუმური დახურვა\nარომატის დასაცავად",
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
    "desc": "FELLOW MIGHTY SMALL\nCARAFE (SMOKED GLASS)\nFELLOW MIGHTY SMALL\nCARAFE (CLEAR)\nFELLOW STAGG DOUBLE\nWALLED CARAFE",
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
    "desc": "Fellow-ის pitcher გამოირჩევა\nგანსაკუთრებული ცხვირის დიზაინით, რაც\nლატე არტისთვის ზუსტ კონტროლს იძლევა.\nერგონომიული სახელური და პრემიუმ\nფოლადი კომფორტსა და გამძლეობას\nუზრუნველყოფს. შიდა საზომი ნიშნულები\nდა ოპტიმიზებული ფორმა კი იდეალური\nრძის ტექსტურას ქმნის\nEddy milk Pitchers\n12 Oz",
    "images": [
      "technika_images/fellow-eddy-pitcher-12oz.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-opus-grinder",
    "brand": "Fellow",
    "name": "Fellow Opus Conical Burr Grinder",
    "desc": "Opus Conical Burr Grinder არის\nმრავალფუნქციური, პრემიუმ ხარისხის\nსაფქვავი, რომელიც უზრუნველყოფს ზუსტ\nდაფქვას როგორც ესპრესოებისთვის, ასევე\npour-over, ფრენჩ პრესისა და ცივი ყავისთვის.\n 6 ძირითადი + 41 მიკროკონფიგურაცია –\nიძლევა დაფქვის სრულ კონტროლს\nნებისმიერი მეთოდისთვის.\n ბროლის ფორმის კონუსური დისკოები\n(Conical Burrs) – არომატის მაქსიმალური\nგაშლა და თანაბარი დაფქვა.\n ტურბო ძრავი და დაბალი ხმაურის სისტემა –\nსწრაფი და მშვიდი დაფქვა.\n სტილური და კომპაქტური დიზაინი –\nიდეალურია სახლისთვის, პროფესიონალური\nხარისხით.",
    "images": [
      "technika_images/fellow-opus-grinder_1.png",
      "technika_images/fellow-opus-grinder_2.png",
      "technika_images/fellow-opus-grinder_3.png",
      "technika_images/fellow-opus-grinder_4.png",
      "technika_images/fellow-opus-grinder_5.png"
    ],
    "youtube": []
  },
  {
    "id": "rocky-lowball-tumbler-10oz",
    "brand": "Fellow",
    "name": "Rocky Lowball Tumbler – Matte Black, 10oz",
    "desc": "Rocky Lowball Tumblers Matte Black, 10 oz\n/ 295ml(REXMB10)\n,\nელეგანტურიშავი ზედაპირისჭიქა\nდამზადებულია ორმაგი კედლის\nკონსტრუქციით,რომელიც ინარჩუნებს\nსასმელისტემპერატურას.\nსპეციფიკაციები:\nფერი: Matte Black\nმოცულობა: 10 oz / 295 ml\nმასალა: ორმაგი კედლის უჟანგავი\nფოლადი",
    "images": [
      "technika_images/rocky-lowball-tumbler-10oz.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-carter-wide-mug",
    "brand": "Fellow",
    "name": "Fellow Carter Wide Mug",
    "desc": "Carter Wide Mug\nჭიქის ზედაპირი დახვეწილი და\nმინიმალისტურია. ორმაგი კედელი\nხელს უწყობს სასმელის ტემპერატურის\nშენარჩუნებას.\nსპეციფიკაციები:\nფერი: Matte White, Stone Blue, Black\nმოცულობა: 12 oz / 354 ml\nმასალა: ორმაგი კედლის უჟანგავი\nფოლადი",
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
    "desc": "Fellow Carter-ის სლაიდ-ფინჯანი – 12oz\n/ 354 მლ\nთანამედროვე სამოგზაურო ჭიქა\nდამამშვიდებელი Hazy Blue ფერით და\nპრაქტიკული, ყოველდღიური\nგამოყენებისთვის განკუთვნილი\nსლაიდ-სახურავით.\nძირითადი მახასიათებლები\n• მოცულობა: 12 oz (354 მლ)\n• მასალა: უჟანგავი ფოლადი,\nკერამიკული საფარით დაფარული\nშიდა ნაწილი\n• ფერი: Hazy Blue\n• სლაიდ-სახურავი\n• ორმაგი კედლის ვაკუუმური\nიზოლაცია\n• BPA-ს გარეშე",
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
    "desc": "Move, Slide, Cold Lid + Straw – მრავალფუნქციური ჭიქა\nსახურავები სხვადასხვა საჭიროებისთვის:\nSlide Lid (ცხელი სასმელებისთვის): უსაფრთხო სლაიდ-სისტემა, \nრომელიც საშუალებას გაძლევთ მარტივად მიირთვათ ცხელი სასმელი, \nდაიცვას წვეთებისგან და შენარჩუნდეს სასმელის ტემპერატურა.\nCold Lid + Straw (ცივი სასმელებისთვის): იდეალურია ყინულიან სასმელებსა \nდა გრილ ნაყინიან სასმელებზე, საწრუპის საშუალებით მარტივი\n და მოსახერხებელი სასმელის მიღება.\nგამძლეობა და ფუნქციონალობა:\nორმაგი კედლის უჟანგავი ფოლადი ინარჩუნებს სასმელის ტემპერატურას\n ხანგრძლივი დროის განმავლობაში.\nმონაწილეების ხარისხი უზრუნველყოფს უსაფრთხო გამოყენებას,\n გამძლეობას და კომფორტულ მომსახურებას ყოველდღიურ\n ან მოგზაურობის პირობებში.\nელეგანტური Matte Black ფერი ხაზს უსვამს ჭიქის დიზაინსა და პრესტიჟს.\nსპეციფიკაციები:\nმოცულობა: 16 oz / 473 ml\nმასალა: ორმაგი კედლის უჟანგავი ფოლადი\nსახურავები: Slide Lid + Cold Lid + Straw\nფერი: Matte Black\n✅ Move ჭიქა – იდეალური არჩევანი მათთვის, ვინც მოხერხებულობას,\n სიმძლავრეს და თანამედროვე დიზაინს ერთიანად ეძებს.",
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
    "desc": "Fellow Carter Move Mug – 3-in-1 Lid,\nSmoke Green, 16oz\nმოკლე აღწერა\nმრავალფუნქციურითერმოჭიქა 3-in-\n1 სახურავით —\nცხელიდაცივისასმელებისთვის.\nძირითადი მახასიათებლები\nმოცულობა: 473 მლ (16oz)\n3 სახურავი: Regular / Carry / Cold +\nStraw\nკერამიკულიშიდასაფარი\nვაკუუმურიიზოლაცია\nBPA-free",
    "images": [
      "technika_images/fellow-carter-move-16oz.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "fellow-carter-3in1-16oz",
    "brand": "Fellow",
    "name": "Fellow Carter 3-in-1 16oz – Matte White",
    "desc": "Carter 3-in-1 Lid System\n 3-1-\nუნიკალური \nშისახურავისსისტემა\nსაშუალებას გაძლევთადვილად\nგადაერთოთ სხვადასხვა რეჟიმზე:\nდალევამოძრაობაში, ტარება ან ცივი\nსასმელი საწრუპით.\nსპეციფიკაციები:\nფერი: Matte White\nმოცულობა: 16 oz / 473 ml\nსახურავი: 3-1-ში (Move, Carry, Cold Lid +\nStraw)\nმასალა: ორმაგი კედლის უჟანგავი\nფოლადი",
    "images": [
      "technika_images/fellow-carter-3in1-16oz.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-stagg-dripper-x",
    "brand": "Fellow",
    "name": "Fellow Stagg [X] Pour-Over Dripper",
    "desc": "Stagg Pour-Over Dripper\nპროფესიონალურდონეზე მოსახარშად\n \nშექმნილი დრიპერი, რომელიც\nუზრუნველყოფს წყლის თანაბარ\nგანაწილებას ყავაზე. ასე მიიღებთ\nდახვეწილ გემოსა და არომატს თქვენს\nფინჯანში.\nსპეციფიკაციები:\nმოდელი: Stagg X\nმასალა: უჟანგავი ფოლადი/\nსურსათისთვის უსაფრთხო მასალები\nგამოყენება: Pour-Over ყავის მომზადება",
    "images": [
      "technika_images/fellow-stagg-dripper-x.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-stagg-x-filters",
    "brand": "Fellow",
    "name": "Fellow Stagg X Filters (45 pcs)",
    "desc": "Stagg XFilters (packof45)(1135)\nStaggX Dripper-\n, \nდამატებითი ფილტრები\nისთვისრაც დაგეხმარებათ მიიღოთ\nსუფთა, არომატული ყავა დღეში\nრამდენჯერმეც კი.\nსპეციფიკაციები:\nმოდელი: Stagg X Filters\nრაოდენობა: 45 ცალი\nგამოყენება:Pour-Over ყავის\nფილტრაცია",
    "images": [
      "technika_images/fellow-stagg-x-filters.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-clara-french-press",
    "brand": "Fellow",
    "name": "Fellow Clara French Press",
    "desc": "წარმოგიდგენთ Fellow Clara-ს, რომელიც\nცვლის კლასიკური ფრენჩ პრესის\nგამოცდილებას! მისი ვაკუუმ-\nიზოლირებული კედლები ინარჩუნებს\nოპტიმალურ ტემპერატურას, რომ\nყოველი მომდევნო ფინჯანი ისეთივე\nარომატული და ცხელი იყოს, როგორც\nპირველი. გაუმჯობესებული ფილტრი კი\nუზრუნველყოფს სუფთა და ნაზ გემოს,\nყოველგვარი ნალექის გარეშე.\n მარტივი გამოყენება\nშეავსე ნიშნულებამდე ,\n– უბრალოდ \nჩაწიე და მოურიე \n მარტივი გასაწმენდი – არაწებოვანი\nშიდა საფარი\n ელეგანტური და გამძლე დიზაინი",
    "images": [
      "technika_images/fellow-clara-french-press_1.png",
      "technika_images/fellow-clara-french-press_2.png"
    ],
    "youtube": []
  },
  {
    "id": "fellow-tally-pro-scale",
    "brand": "Fellow",
    "name": "Fellow Tally Pro Scale – Studio Edition",
    "desc": "TALLY\nSCALE PRO\nSTUDIO\nEDITION\n: 0,1\nაქვსტაიმერიმინიმალურიწონა \nგ\nმაქსიმალურიწონა:2,500 გ\nსასწორზე შეგიძლიათ დააყენოთ\nყავის მომზადების „რეცეპტი“, რაც\nდაგეხმარებათ იმაში, რომ\nგააკონტროლოთ ყავის და წყლის\nსწორი თანაფარდობა.",
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
    "desc": "TIMEMORE Glass Coffee Dripper\n ,\nv60 -\nდრიპერი გამოიყენება\nისდასამზადებლად\nTIMEMORE FILTER\n \nთუ მომხმარებელმაარიცის დრიპერისზომა \n02 ზომა ფილტრს ., აუცილებლად\nვთავაზობთ \nთუ ფილტრი დიდია დრიპერზე გადაკეცვა შესაძლებელია , თუ\nფილტრი დრიპერზე პატარაა დიდია შანსი ფილტრი დაზიანდეს .",
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
    "desc": "Timemore Coffee Server\nTransparent Black | 600 ml\n\"Coffee Server Transparent | 600 ml\"",
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
    "desc": "არ აქვს სადგამი და რეკომენდაციას ვუწევთ ინდუქციური გაზისთვის\nისევ და ისევ უპირატესობაში გვაქვს გუსნექი, რომელიც წყლის თანაბარი დასხმის საშუალებას\nგვაძლევს\nდამზადებულია უჟანგავი ფოლადისგან\nინარჩუნებს ტემპერატურას\nტევადობა 700 მლ\nTimemore Fish Pure Pour-over Kettle\nTimemore Fish Pure Pour-over Kettle",
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
    "desc": "აქვს გუსქნექი, რაც უზრუნველყოფს წყლის\nთანაბარ დასხმას\nდამზადებულია უჟანგავი ფოლადისგან\nინარჩუნებს ტემპერატურას\nაქვს ელექტრო სადგამი, აჩვენებს\nტემპერატურას\nTimemore Fish Pro Electric Pour Over\nKettle 900ml | Black",
    "images": [
      "technika_images/timemore-fish-pro-kettle.png"
    ],
    "youtube": []
  },
  {
    "id": "timemore-scale-2000g",
    "brand": "Timemore",
    "name": "Timemore Coffee Scale (2000g)",
    "desc": "მაქსიმალური წონაა \nზუსტად გაზომოს \n2000 გრამი და შეუძლია\n0,1 გრამიც. იდეალურია\nესპრესოსთვის და ფილტრის ყავისთვის\nეს სასწორი ზომავს ასევე წყლის დასხმის\nსიჩქარეს, რომელიც უზრუნველყოფს\n პროფესიონალურად ყავის მომზადებას,ასევე\nდროის ათვლა ავტომატურად იწყება, როცა\nსასწორი გრძნობს წყლის დასხმას.\nსასწორი გრძნობს წყლის დასხმას\nTimemore Coffee Scale with Timer",
    "images": [
      "technika_images/timemore-scale-2000g.png"
    ],
    "youtube": []
  },
  {
    "id": "timemore-u-french-press",
    "brand": "Timemore",
    "name": "Timemore U French Press 450ml",
    "desc": "ფრენჩ პრესის სერვერი\n450 მლ\n18 სმ\nTimemore U French Press",
    "images": [
      "technika_images/timemore-u-french-press.png"
    ],
    "youtube": []
  },
  {
    "id": "timemore-s3-esp-grinder",
    "brand": "Timemore",
    "name": "Timemore Hand Grinder S3 ESP – Matt Black",
    "desc": "Timemore Hand Grinder S3 ESP –\nMatt Black\nTimemore Hand Grinder S3 ESP – Matt Black\nპრემიუმ კლასის ხელის საფქვავი,\n თანამედროვე დიზაინით და ინოვაციური ტექნოლოგიით.\n აღჭურვილია S2C 890 ტიპის ფოლადის ბურბებით (42 მმ დიამეტრით)\nრომლებიც უზრუნველყოფენ სწრაფ, თანაბარ და ეფექტურ დაფქვას,\n განსაკუთრებით ესპრესო და ფილტრის ყავისთვის.\nმახასიათებლები:\nბურბი: ფოლადის S2C 890 ტიპი, 42 მმ, სწრაფი და თანაბარი დაფქვისთვის\nრეგულირება: გარე სტეპლეის სისტემა, სიზუსტე 0.015 მმ\nმასალა: მყარი ალუმინის შენადნობი, უჟანგავი ფოლადი\nსახელური: მაგნიტური, მარტივი დასამაგრებლად და მოსახსნელად\nმოცულობა: 25 გრამი\nწონა: 798 გრამი\nდამატებით: სილიკონის რეზინის ბაზა სტაბილურობისთვის\nმახასიათებლების უპირატესობა:\nგარე საფქვავის სისტემა ითვლება ერთ-ერთ ყველაზე ზუსტად\n რეგულირებად მექანიზმად ხელის საფქვავებში\nიდეალურია მათთვის, ვისაც სურს მაღალი სიზუსტის \nდაფქვა სხვადასხვა მეთოდებისთვის (ესპრესო, ფილტრის ყავა და სხვ.)\nგამორჩეულია როგორც დიზაინით, ისე ფუნქციონალით",
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
    "desc": "Timemore Hand Grinder C3S Max – Black\nTimemore C3S Max – ხელის საფქვავი\nპრემიუმ კლასის ხელის საფქვავი სწრაფი, თანაბარი და\nზუსტი დაფქვისთვის.\nგანახლებული S2C ბურბები (38 მმ) – უზრუნველყოფს\nერთგვაროვან დაფქვას, როგორც ესპრესოსთვის, ისე\nალტერნატიული მეთოდებისთვის (pour-over, AeroPress,\nChemex, French Press).\nC3S Max ვერსია – გაზრდილი მოცულობა ერთდროულად\nრამდენიმე ჭიქისთვის.\nზუსტი რეგულირება სტეპლეით – 36 პოზიცია, იდეალური\nდაფქვის ზომის დასაყენებლად.\nმყარი და მსუბუქი ალუმინის კორპუსი, ტექსტურიანი\nზედაპირი – სტაბილურობისა და კომფორტისთვის.\nმოხსნადი, ბრუნვადი ალუმინის სახელური – მარტივი\nგამოსაყენებლად და გასაწმენდად.\nმოცულობა: 30 გრამი | წონა: 585 გრამი\n✅ იდეალურია სახლში, ოფისში ან პროფესიონალურ\nგამოყენებაში – ხარისხიანი ყავის მოყვარულთათვის და\nბარისტებისთვის.",
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
    "desc": "Timemore Hand Grinder C3S Pro-Black\nკომპაქტური ხელის საფქვავი – მაღალი ხარისხის მასალებით\nკომპაქტური და გამძლე ხელის საფქვავი, შექმნილი მაღალი\nხარისხის მასალებით.\nაღჭურვილია S2C (Spike-to-Cut) ტიპის ფოლადის ბურბებით – 38\nმმ დიამეტრი, რომლებიც უზრუნველყოფენ თანაბარ, სწრაფ და\nსუფთა დაფქვას.\nსტეპლეის რეგულირების სისტემა (კლიკებით) საშუალებას\nგაძლევთ ზუსტად მოირგოთ საფქვავი ყავის სხვადასხვა\nმოსამზადებელი მეთოდისთვის: ესპრესო, პურ-ოვერი, ფრენჩ\nპრესი და სხვა.\nმთლიანი კორპუსი დამზადებულია ალუმინის შენადნობისგან,\nრაც უზრუნველყოფს სიმტკიცეს, სიმსუბუქეს და ელეგანტურ\nდიზაინს.\nტექნიკური მახასიათებლები:\nბურბი: ფოლადის S2C ტიპი, 38 მმ\nრეგულირება: სტეპლეის სისტემა (კლიკებით)\nმასალა: ალუმინი + უჟანგავი ფოლადი\nმოცულობა: 25 გრამი\nწონა: დაახლოებით 530 გრამი\nზომები: სიმაღლე ~16 სმ, დიამეტრი ~5 სმ\n✅ იდეალური არჩევანი როგორც სახლისთვის, ასევე\nმოგზაურობისთვის – სტაბილური, კომპაქტური და\nმაღალპროფესიული შედეგით.",
    "images": [
      "technika_images/timemore-c3s-pro-grinder.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "timemore-s3-grinder-olive",
    "brand": "Timemore",
    "name": "Timemore Hand Grinder S3 – Olive Green",
    "desc": "Timemore Hand Grinder S3 – Olive\nGreen\nTimemore S3 – პრემიუმ ხელის საფქვავი\nTimemore S3 არის პრემიუმ კლასის ხელის საფქვავი, რომელიც\nაერთიანებს გამორჩეულ დიზაინს და უმაღლესი დონის\nფუნქციონალს.\n მოდელი წარმოდგენილია ელეგანტურ ზეთისხილის მწვანე (Olive\nGreen) ფერში და გამოირჩევა მყარი მეტალის კორპუსით, რაც მას\nგამძლესა და სტაბილურს ხდის.\nაღჭურვილია S2C 890 ტიპის ფოლადის ბურბებით (42 მმ),\nრომლებიც უზრუნველყოფენ თანაბარ და ეფექტურ დაფქვას –\nიდეალურია როგორც ესპრესო, ისე ალტერნატიული\nმეთოდებისთვის.\n ბურბების სიზუსტე და გარე სტეპლეის რეგულირების სისტემა\nსაშუალებას გაძლევთ ზუსტად დაარეგულიროთ საფქვავი თქვენი\nსასურველი ფქვის სტილისთვის.\nტექნიკური მახასიათებლები:\nბურბი: S2C 890 ფოლადი, 42 მმ დიამეტრი\nფქვის რეგულირება: გარე სტეპლეის სისტემა, სიზუსტე 0.015 მმ\nკორპუსი: ალუმინის შენადნობი\nსახელური: მაგნიტური სამაგრით, მარტივი დასამაგრებლად და\nმოსახსნელად\nმოცულობა: 25 გრამი\nწონა: დაახლოებით 798 გრამი\nქვედა ნაწილი: სილიკონის ბაზა სტაბილურობისთვის\n✅ იდეალური არჩევანი პროფესიონალებისა და ყავის\nმოყვარულებისთვის, ვისაც სურს ზუსტი, თანაბარი და\nხარისხიანი დაფქვა.",
    "images": [
      "technika_images/timemore-s3-grinder-olive.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "mahlkonig-x64-sd",
    "brand": "Mahlkönig",
    "name": "Mahlkönig X64 SD Grinder",
    "desc": "Mahlkönig X64 SD — პროფესიონალური ხარისხისახლში\nMahlkönig X64 SD არის პრემიუმ კლასის საფქვავი, შექმნილი\nმათთვის, ვისაც სახლში სურს მიიღოს ბარისტას დონის\nსიზუსტე და მაქსიმალურად სუფთა ყავის არომატი. ის\nიდეალურად აერთიანებს პროფესიულ ტექნოლოგიასა და\nსახლის გამოყენებისთვის საჭირო კომფორტს.\nსაფქვავი აღჭურვილია 64 მმ ბრტყელი ფოლადის ბურბებით,\nრომლებიც უზრუნველყოფს თანაბარ და სტაბილურ დაფქვას\nყავის ყველა მომზადების მეთოდისთვის — ესპრესო, Pour-\nOver, AeroPress, French Press და Cold Brew.\nრატომ გამოირჩევა X64 SD?\n☕ Zero Retention დიზაინი — დაფქული ყავა არ რჩება\nსაფქვავში\n🎯 ყოველთვის სუფთა და ახალი დაფქვა\n⚙️ მაღალი სიზუსტე დაფქვის რეგულირებაში\n🔄 მარტივი გადართვა სხვადასხვა დაფქვის ზომებს შორის\n🖤 პრემიუმ ხარისხის დიზაინი და მასალები\nროგორია შედეგი?\nX64 SD უზრუნველყოფს:\nმაქსიმალურად სუფთა გემოს\nსტაბილურ ექსტრაქციას\nმდიდარ არომატს ყოველ ფინჯანში\nგანმეორებად შედეგს ყოველდღიურ გამოყენებაში\nძირითადი პარამეტრები\nბურბები: 64 მმ ბრტყელი (Flat Burrs), მაღალი\nხარისხის სპეციალური ფოლადი\nდაფქვის სისტემა: Single Dose + Zero Retention\n(ნულოვანი დარჩენა)\nდაფქვის რეგულირება: Stepless – შეუზღუდავი,\nმიკრონული სიზუსტის კონტროლი\nდაფქვის დიაპაზონი: ესპრესოდან ძალიან\nმსხვილ დაფქვამდე (Cold Brew).\nდაფქვის სიჩქარე: 2.5 – 6 გ/წმ დაფქვის ზომის\nმიხედვით\nელექტრონიკა და სიმძლავრე\nმოტორი: 200W ძლიერი და ჩუმი ძრავა\nძაბვა: 220–240V / 50–60Hz\nზომები და წონა\nზომები (სიგანე × სიმაღლე × სიღრმე): 14.3 ×\n24.9 × 25.3 სმ\nწონა: 4.8 კგ\nკომპლექტაცია\nდოზირების ჭიქა (Dosing Cup)\nჩანასახების ამომყვანი Bellow სისტემა\nAnti-Popcorning თავსახური\nHopper Extension\nფერი - შავი",
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
    "desc": "Barista Hustle AutoComb \nBarista Hustle AutoComb არის ხელით მომუშავე \nWDT (Weiss Distribution Technique) ხელსაწყო, \nრომელიც გამოიყენება დაფქული ყავის თანაბრად განაწილებისთვის,\n პორტაფილტერში ესპრესოს მომზადებამდე.\nმისი მთავარი დანიშნულებაა კომბების დაშლა და არხების\n (channeling) თავიდან აცილება, რაც ერთ-ერთი ყველაზე ხშირი \nმიზეზია ცუდი ესპრესოს მიღებისას.\nროგორ მუშაობს მარტივად:\nხელსაწყოს აქვს 12 ულტრა თხელი ნემსი\nბრუნვისას ნემსები სწრაფად ტრიალებს\nდაფქული ყავა ნაწილდება თანაბრად მთელ პორტაფილტერში\nშედეგად წყალი გადის თანაბრად და არა ერთ წერტილში\n👉 ეს ნიშნავს უკეთეს ექსტრაქციას და უფრო გემრიელ ესპრესოს\nრატომ არის AutoComb მნიშვნელოვანი?\n☕ აუმჯობესებს ესპრესოს გემოს\n🎯 ამცირებს შეცდომის რისკს მომზადებისას\n🔁 უზრუნველყოფს ერთნაირ შედეგს ყოველ ჯერზე\n⏱ ზოგავს დროს — უფრო სწრაფია, ვიდრე ჩვეულებრივი WDT\n✋ არ საჭიროებს ელექტროენერგიას",
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
    "desc": "BARISTA HUSTLE COMB\nComb, არის Weiss ხელის\n \nგამანაწილებელი ხელსაწყო,\nრომელსაც აქვს რბილი,\nსილიკონის სახელური, 25\nმორგებული და 30 გამძლე უჟანგავი\nფოლადის ნემსი, რაც ძალიან\nმნიშვნელოვანია ესპრესოს\nმომზადების პროცესში, რათა\nდაფქული ყავა თანაბრად და\nერთგვაროვნად გავანაწილოთ.",
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
    "desc": "NextLevel Pulsar — ინოვაციური მიდგომა ყავის მომზადებაში\nNextLevel Pulsar არის თანამედროვე და\nინოვაციური ყავის მოსამზადებელი მოწყობილობა, \nრომელიც შექმნილია მათთვის, \nვისაც სურს ყავის ექსტრაქციაზე სრული კონტროლი\n და მაქსიმალურად სუფთა, მდიდარი არომატის მიღება.\nPulsar აერთიანებს უნიკალურ დიზაინს და თანამედროვე ტექნოლოგიას,\nრაც მომხმარებელს საშუალებას აძლევს ზუსტად მართოს წყლის ნაკადი, \nკონტაქტის დრო და ექსტრაქციის პროცესი. ეს ქმნის პირობებს,\nსადაც ყავის თითოეული ნოტი უკეთ იშლება \nდა შედეგი უფრო დაბალანსებული და გამოხატულია.\n.\nPulsar აღჭურვილია ნაკადის კონტროლის სარქველით (Flow Control Valve), \nრომელიც მომხმარებელს საშუალებას აძლევს სრულად აკონტროლოს წყლის მოძრაობა ყავაში.\nშესაძლებელია წყლის ნაკადის შეჩერება, \nნელა გაშვება ან სრულად გახსნა — \nეს ყველაფერი უზრუნველყოფს ექსტრაქციის ზუსტ მართვას და უკეთეს გემოს.\nრა გამოარჩევს Pulsar-ს?\n☕ თანაბარი ექსტრაქცია — წყალი ნაწილდება ერთგვაროვნად\n💧 ნაკადის სრული კონტროლი — სარქველის მეშვეობით\n🫖 არ საჭიროებს სპეციალურ ჩაიდანს (gooseneck kettle)\n🔬 სპეციალური ფილტრი უზრუნველყოფს სტაბილურ ჩამოსხმას\n🎯 მარტივი გამოყენება პროფესიონალებისა და ენთუზიასტებისთვის\nროგორ მუშაობს Pulsar მარტივად:\n1.ყავა და წყალი თავსდება მოწყობილობაში\n2.სარქველი ინარჩუნებს წყალს საჭირო დროით\n3.მომხმარებელი თავად წყვეტს ექსტრაქციის დაწყებას\n4.ნაკადის რეგულირებით იცვლება ყავის ინტენსიურობა\n5.შედეგი — სუფთა, მდიდარი და დაბალანსებული გემო\n👉 მეტი კონტროლი = უკეთესი არომატი\nყავის გემო Pulsar-ით\nPulsar განსაკუთრებით კარგად ავლენს:\nSpecialty ყავის არომატულ პროფილს\nნათელ და სუფთა გემოს\nდაბალანსებულ მჟავიანობას\nკონტროლირებად სიმკვრივეს (ინტენსიურობას)",
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
    "desc": "IVYKIN Basic Coffee Scale 3kg / 400mAh\nმოდელი: VK2111002\nIVYKIN Basic Coffee Scale არის კომპაქტური და ზუსტი ყავის სასწორი,\nრომელიც შექმნილია ყავის მომზადების პროცესზე სრული კონტროლის \nუზრუნველსაყოფად. იგი იდეალური არჩევანია\nროგორც პროფესიონალი ბარისტებისთვის, \nასევე სახლის პირობებში ყავის მოყვარულებისთვის.\nსასწორი აღჭურვილია ზუსტი წონის გაზომვის სისტემით\nდა ინტეგრირებული ტაიმერით,\nრაც საშუალებას გაძლევთ ერთდროულად აკონტროლოთ\nროგორც ყავის დოზა,\nასევე ექსტრაქციის დრო — იქნება ეს ესპრესო თუ ფილტრის ყავა.\nროგორ გამოიყენება მარტივად:\nაჩვენებს ყავისა და წყლის ზუსტ წონას\nტაიმერი გეხმარებათ ექსტრაქციის დროის კონტროლში\nკომპაქტური ზომა მარტივს ხდის ყოველდღიურ გამოყენებას\nშესაფერისია ესპრესო აპარატებთან და ფილტრის მეთოდებთან\nრატომ არის კარგი არჩევანი?\n⚖️ მაღალი სიზუსტე წონის გაზომვაში\n⏱ ჩაშენებული ტაიმერი\n🔋 400 mAh აკუმულატორი\n🔌 USB დატენვა\n🖤 მინიმალისტური შავი დიზაინი\n🏠 პროფესიული და სახლის გამოყენებისთვის",
    "images": [
      "technika_images/ivykin-basic-scale.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "ivykin-pro-scale",
    "brand": "IVYKIN",
    "name": "IVYKIN Pro Coffee Scale 3kg / 1200mAh",
    "desc": "IVYKIN Pro Coffee Scale 3kg / 1200mAh\n ციფრულისასწორი MS-R30A\n აკუმულატორით,\nმაღალისიზუსტე პრემიუმ კლასის\nსასწორი ტაიმერით და დიდი\nეკრანით\nსპეციფიკაცია\nზომა \nმმ\nწონა: მაქს \nკგ მინიმუმ \nგ\nზუსტობა \nგ\nაკუმულატორი \nმასთ\n დატენვა\nგანუყოფ ელიელემენტი\n \n.\n:\n: 160 x 115 x 24\n.3\n, \n0.3\n:0.1\n:1200 \n/\nUSB\n(Unremoveable Battery)",
    "images": [
      "technika_images/ivykin-pro-scale.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "ivykin-cleaning-brush",
    "brand": "IVYKIN",
    "name": "IVYKIN Cleaning Brush",
    "desc": "IVYKIN Cleaning brush\nსაწმენდი ფუნჯი - D000567\nყავის\nაპარატისადაფილტრისგასაწმენდა\nდ ორფუნქციური ხელსაწყო: ფუნჯი\nდა ჩაშენებული დოზირების კოვზი.\nსახელური: შავიპლასტმასი\nფუნჯი: გამჭვირვალე\nსიგრძე: 22 სმ\nკოვზისმოცულობა: 3 გ",
    "images": [
      "technika_images/ivykin-cleaning-brush.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "ivykin-plastic-dripper",
    "brand": "IVYKIN",
    "name": "IVYKIN Plastic Dripper – Transparent (V60 style)",
    "desc": "IVYKIN Plastic Dripper l transparent\nდრიპ ფილტრი D000237 –\nგამჭვირვალე და მედეგი ყავისფილტრი\npour-over ტექნიკისთვის.\nზომა: 101\nმასალა: პლასტმასი\nიდეალურია V60\nსტილისმოსამ ზადებლად",
    "images": [
      "technika_images/ivykin-plastic-dripper.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "ivykin-tamping-mat",
    "brand": "IVYKIN",
    "name": "IVYKIN Silicone Tamping Mat",
    "desc": "IVYKIN Silicone material tamping mat\nთამპერის მატ VK2203151 –\nმყარი და ფუნქციური ბაზა თამპერისთვის ბარისტას\nაუცილებელიხელსაწყო.\nიცავსზედაპირსდაზიანებისგანთამპერისგამოყენებისას.\nმახასიათებლები:\nმასალა: სილიკონი\nფერი: შავი\nზომა: 21 x 15 სმ\nმდგრადიაწყლისადამაღალიტემპერატურისმიმართ",
    "images": [
      "technika_images/ivykin-tamping-mat.jpeg"
    ],
    "youtube": []
  },
  {
    "id": "ivykin-wooden-kettle-700",
    "brand": "IVYKIN",
    "name": "IVYKIN Wooden-handle Coffee Kettle 700ml",
    "desc": "IVYKIN Wooden handle Coffee kettle 700ml\nყავის ჩაიდანი VK2202181\nმახასიათებლები:\nმოც ულობა: 700 მლ\nმასალა: უჟანგავიფოლადი 304\nშავი საფარი შიგნიდან და გარედან \nხისსახელური –\nთერმულიიზოლაციით",
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
