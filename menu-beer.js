/* ===================================================================
   COFFEE LAB — Bar Menu module · PART 5: CRAFT BEER
   Source of truth: ბარი-მენიუ PDF (pages 23–25, column-de-interleaved).
   All content Georgian. NOTE: the menu labels volume as „მილიგრამი — 330 გ",
   but means 330 მლ (standard beer volume) — corrected and flagged in-app.
   No brand names are present in the source; beers are labelled by style.

   Load AFTER the main app script and the earlier menu modules.
   Auto-registers into the same "მენიუ" group; non-destructive.
=================================================================== */
(function () {
  if (typeof window !== 'undefined') {
    if (window.__CL_MENU_BEER__) return;      // guard against double-load
    window.__CL_MENU_BEER__ = true;
  }
  if (typeof SECTIONS === 'undefined') {
    console.warn('menu-beer.js: main app script must load first — nothing registered.');
    return;
  }

  /* ---------- category colour + label ---------- */
  Object.assign(CAT_COLOR, { menu_beer: '#C99A2E' });
  Object.assign(CAT_LABEL, { menu_beer: 'ლუდი' });

  /* =================================================================
     SECTION
  ================================================================= */
  const BEER_SECTIONS = [
    { id: 'menu_beer', title: 'კრაფტ ლუდი', ico: '🍺', cat: 'menu_beer', group: 'მენიუ',
      lead: 'ხელნაკეთი ლუდი — შესავალი და მენიუს ოთხი ლუდი.',
      blocks: [
        { type: 'h', text: 'რა არის კრაფტ ლუდი?' },
        { type: 'facts', items: [
          '„კრაფტ ლუდი" ნიშნავს ხელნაკეთობასა და ოსტატობას; მას, როგორც წესი, ამზადებენ მცირე ან საშუალო ზომის ლუდსახარშები.',
          'ისინი დიდ ყურადღებას აქცევენ გემოს, არომატსა და ხარისხს — უფრო მეტად, ვიდრე მასობრივ წარმოებასა და კომერციულ მოგებას.',
          'გამოირჩევა უნიკალური არომატებითა და ინგრედიენტებით, რაც მას კომერციული ლუდისგან განასხვავებს.',
          'მწარმოებლები ხშირად იყენებენ ნატურალურ ინგრედიენტებსა და ტრადიციულ ხარშვის მეთოდებს; უმეტესად ადგილობრივი ლუდსახარშები ამზადებენ.'
        ] },

        { type: 'h', text: 'მენიუს ლუდები' },
        { type: 'table', head: ['ლუდი (სტილი)', 'ალკოჰოლი', 'მოცულობა'], rows: [
          ['West Coast IPA — ტროპიკული ხილის გემო, წიწვოვანი სიმწარე, დიდხანს გამყოლი სიმშრალე', '6.0%', '330 მლ'],
          ['Double IPA (ორმაგი იპა) — ორმაგი მშრალი გასვიანება; ალაოს სიტკბოსა და სვიის არომატის ბალანსი', '9.0%', '330 მლ'],
          ['ერთი ალაო / ერთი სვია იპა — მშრალი, საშუალო მსუბუქი, ციტრუსისა და წიწვის ნოტებით', '6.0%', '330 მლ'],
          ['American Pale Ale — ღია ფერის ელი, Idaho7® სვიით', '6.0%', '330 მლ']
        ] },
        { type: 'numbers', items: [
          { val: '330 მლ', label: 'მოცულობა (ყველა)' },
          { val: '42.9', label: 'კალ/100მლ (ყველა)' },
          { val: '9.0%', label: 'ყველაზე ძლიერი (DIPA)' }
        ] },
        { type: 'note', text: '<b>ყველა ლუდის საერთო:</b> შემადგენლობა — წყალი, ქერი ალაო, სვია, საფუარი; ენერგეტიკული ღირებულება — 42.9 კალ/100 მლ; შეიძლება შეიცავდეს ბუნებრივ ნალექს.' },
        { type: 'note', text: '<b>ერთეულის შესახებ:</b> მენიუში მოცულობა მითითებულია როგორც „მილიგრამი — 330 გ", თუმცა იგულისხმება 330 მლ — ლუდის სტანდარტული მოცულობა.' },

        { type: 'summary', text: '<b>დასამახსოვრებელი:</b> 4 ლუდი — 3 იპა (West Coast 6%, Double/ორმაგი 9%, ერთი ალაო/ერთი სვია 6%) + American Pale Ale (Idaho7®, 6%). ყველა 330 მლ, 42.9 კალ/100მლ; შემადგენლობა — წყალი, ქერი ალაო, სვია, საფუარი. ყველაზე ძლიერი — Double IPA (9.0%).' }
      ]
    }
  ];

  /* =================================================================
     QUESTIONS — {cat, q, opts:[4], a, ex}
  ================================================================= */
  const BEER_QUESTIONS = [
    { cat: 'menu_beer', q: 'რას ნიშნავს „კრაფტ ლუდი"?', opts: ['მასობრივ წარმოებას', 'ხელნაკეთობასა და ოსტატობას', 'იაფ ლუდს', 'უალკოჰოლო ლუდს'], a: 1, ex: '„კრაფტ ლუდი" გულისხმობს ხელნაკეთობასა და ოსტატობას.' },
    { cat: 'menu_beer', q: 'ვინ ამზადებს კრაფტ ლუდს ჩვეულებრივ?', opts: ['დიდი კორპორაციები', 'მცირე ან საშუალო ლუდსახარშები', 'მხოლოდ სახლში', 'ფაბრიკები'], a: 1, ex: 'როგორც წესი — მცირე ან საშუალო ზომის (ხშირად ადგილობრივი) ლუდსახარშები.' },
    { cat: 'menu_beer', q: 'რა ანსხვავებს კრაფტ ლუდს კომერციულისგან?', opts: ['ფასი', 'უნიკალური არომატები და ინგრედიენტები', 'ბოთლის ფერი', 'რეკლამა'], a: 1, ex: 'უნიკალური არომატები და ინგრედიენტები; აქცენტი ხარისხზე, არა მასობრივ წარმოებაზე.' },
    { cat: 'menu_beer', q: 'რომელია მენიუს ყველაზე ძლიერი ლუდი?', opts: ['West Coast IPA', 'Double IPA (ორმაგი იპა)', 'American Pale Ale', 'ერთი ალაოს იპა'], a: 1, ex: 'Double IPA — 9.0%, მენიუში ყველაზე მაღალი.' },
    { cat: 'menu_beer', q: 'Double IPA-ს ალკოჰოლის შემცველობა?', opts: ['4.5%', '6.0%', '9.0%', '12%'], a: 2, ex: 'ორმაგი იპა — 9.0%.' },
    { cat: 'menu_beer', q: 'West Coast IPA-ს ალკოჰოლის შემცველობა?', opts: ['6.0%', '9.0%', '3.0%', '7.5%'], a: 0, ex: 'West Coast IPA — 6.0%.' },
    { cat: 'menu_beer', q: 'რამდენი მლ-ია მენიუს ლუდების მოცულობა?', opts: ['250 მლ', '330 მლ', '500 მლ', '750 მლ'], a: 1, ex: 'ყველა ლუდი — 330 მლ.' },
    { cat: 'menu_beer', q: 'ლუდების ენერგეტიკული ღირებულება?', opts: ['20 კალ/100მლ', '42.9 კალ/100მლ', '100 კალ/100მლ', '330 კალ'], a: 1, ex: 'ყველა ლუდი — 42.9 კალ/100 მლ.' },
    { cat: 'menu_beer', q: 'რა შედის ყველა ლუდის შემადგენლობაში?', opts: ['წყალი, ქერი ალაო, სვია, საფუარი', 'ვაშლი, შაქარი', 'ყურძენი, საფუარი', 'ხორბალი, თაფლი'], a: 0, ex: 'წყალი, ქერი ალაო, სვია, საფუარი.' },
    { cat: 'menu_beer', q: 'ორმაგი იპა (Double IPA) როგორი ლუდია?', opts: ['მსუბუქი ლაგერი', 'ორმაგი მშრალი გასვიანების, ალაოს სიტკბოსა და სვიის ბალანსით', 'უსვიო', 'ხილის სიდრი'], a: 1, ex: 'ორმაგი მშრალი გასვიანება; ალაოს სიტკბოსა და სვიის არომატის საუკეთესო ბალანსი.' },
    { cat: 'menu_beer', q: 'ამერიკული ღია ფერის ელი რომელი სვიითაა გასვიანებული?', opts: ['Idaho7®', 'Cascade', 'Citra', 'Saaz'], a: 0, ex: 'American Pale Ale — Idaho7®-ის უნიკალური სვიით.' },
    { cat: 'menu_beer', q: 'რომელ ლუდს ახასიათებს „ერთი ალაო და ერთი სვია"?', opts: ['Double IPA', 'ერთი ალაო / ერთი სვია იპა', 'West Coast IPA', 'American Pale Ale'], a: 1, ex: 'მზადდება ერთი სახეობის ალაოსა და ერთი სახეობის სვიაზე.' },
    { cat: 'menu_beer', q: '„შეიძლება შეიცავდეს ბუნებრივ ნალექს" — ვის ეხება?', opts: ['მხოლოდ Double IPA', 'ყველა ლუდს', 'არცერთს', 'მხოლოდ ელს'], a: 1, ex: 'ეს შენიშვნა ოთხივე ლუდს ეხება.' }
  ];

  /* =================================================================
     FLASHCARDS — {cat, q, a}
  ================================================================= */
  const BEER_FLASHCARDS = [
    { cat: 'menu_beer', q: 'კრაფტ ლუდი = ?', a: 'ხელნაკეთობა/ოსტატობა; მცირე/საშუალო (ხშირად ადგილობრივი) ლუდსახარშები; უნიკალური არომატი/ინგრედიენტი; ნატურალური, ტრადიციული ხარშვა.' },
    { cat: 'menu_beer', q: 'მენიუს 4 ლუდი?', a: 'West Coast IPA (6%), Double IPA (9%), ერთი ალაო/ერთი სვია იპა (6%), American Pale Ale / Idaho7® (6%).' },
    { cat: 'menu_beer', q: 'ყველაზე ძლიერი ლუდი?', a: 'Double IPA (ორმაგი იპა) — 9.0%.' },
    { cat: 'menu_beer', q: 'ლუდების საერთო შემადგენლობა?', a: 'წყალი, ქერი ალაო, სვია, საფუარი.' },
    { cat: 'menu_beer', q: 'ლუდების მოცულობა/ენერგია?', a: '330 მლ; 42.9 კალ/100 მლ; შეიძლება შეიცავდეს ბუნებრივ ნალექს.' },
    { cat: 'menu_beer', q: 'Double IPA?', a: 'ორმაგი მშრალი გასვიანება; ალაოს სიტკბო + სვიის არომატის ბალანსი; 9%.' },
    { cat: 'menu_beer', q: 'American Pale Ale?', a: 'ღია ფერის ელი; Idaho7® სვია; 6%.' }
  ];

  /* =================================================================
     REGISTER (non-destructive) — joins the existing "მენიუ" group
  ================================================================= */
  let at = SECTIONS.findIndex(s => s.id === 'numbers');
  if (at < 0) at = SECTIONS.length;
  SECTIONS.splice(at, 0, ...BEER_SECTIONS);

  if (typeof CONTENT !== 'undefined') CONTENT.push(...BEER_SECTIONS);
  if (typeof SEARCH_INDEX !== 'undefined' && typeof blockText === 'function') {
    BEER_SECTIONS.forEach(s => {
      SEARCH_INDEX.push({
        id: s.id, title: s.title, cat: s.cat,
        text: (s.title + ' ' + (s.lead || '') + ' ' + blockText(s.blocks))
          .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
      });
    });
  }

  if (typeof QUESTIONS !== 'undefined') QUESTIONS.push(...BEER_QUESTIONS);
  if (typeof FLASHCARDS !== 'undefined') FLASHCARDS.push(...BEER_FLASHCARDS);

  if (typeof buildNav === 'function') buildNav();
  if (typeof updateProgressUI === 'function') updateProgressUI();
  if (typeof state !== 'undefined' && state.current === 'dashboard' && typeof CUSTOM !== 'undefined' && CUSTOM.dashboard) CUSTOM.dashboard();

  console.log('menu-beer.js · Part 5 (craft beer): ' + BEER_SECTIONS.length + ' section, ' +
    BEER_QUESTIONS.length + ' questions, ' + BEER_FLASHCARDS.length + ' flashcards registered.');
})();