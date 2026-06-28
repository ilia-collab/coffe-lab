/* ===================================================================
   COFFEE LAB — Bar Menu module · PART 4: COCKTAILS
   Source of truth: ბარი-მენიუ PDF (pages 20–22, column-de-interleaved).
   All content Georgian. NOTE: the menu writes liquid amounts as „მგ"
   but means „მლ" (ml) — corrected here and flagged in-app. Where the
   menu omits amounts/ingredients, none are invented.

   Load AFTER the main app script and the earlier menu modules.
   Auto-registers into the same "მენიუ" group; non-destructive.
=================================================================== */
(function () {
  if (typeof window !== 'undefined') {
    if (window.__CL_MENU_COCKTAILS__) return;     // guard against double-load
    window.__CL_MENU_COCKTAILS__ = true;
  }
  if (typeof SECTIONS === 'undefined') {
    console.warn('menu-cocktails.js: main app script must load first — nothing registered.');
    return;
  }

  /* ---------- category colour + label ---------- */
  Object.assign(CAT_COLOR, { menu_cocktail: '#A85751' });
  Object.assign(CAT_LABEL, { menu_cocktail: 'კოქტეილები' });

  /* =================================================================
     SECTIONS
  ================================================================= */
  const COCKTAIL_SECTIONS = [

    /* ---- COFFEE COCKTAILS ---- */
    { id: 'menu_cocktail_coffee', title: 'ყავის კოქტეილები', ico: '🍸', cat: 'menu_cocktail', group: 'მენიუ',
      lead: 'ესპრესოზე დაფუძნებული კოქტეილები — Drunk Amerikano, Almond Coffee, Coffee Gin Tonic.',
      blocks: [
        { type: 'note', text: '<b>ერთეულის შესახებ:</b> მენიუში სითხის რაოდენობები მითითებულია „მგ"-ით, თუმცა იგულისხმება „მლ" (მილილიტრი).' },

        { type: 'h', text: 'Drunk Amerikano' },
        { type: 'prose', items: ['ინგრედიენტები: რომი, ყავის ლიქიორი, სიროფი, ესპრესო, ცხელი წყალი, ნაღები.'] },
        { type: 'steps', items: [
          'ცივის ჭიქაში ვასხამთ რომს, ყავის ლიქიორს, სიროფსა და ესპრესოს.',
          'ვამატებთ ცხელ წყალს და ვურევთ კოვზით.',
          'ნაღებს ვაშეიქერებთ (ან ხელის სათქვეფით ამოგვყავს).',
          'ნაღებს ზემოდან ვასხამთ კოვზის მეშვეობით ისე, რომ ბაზას ქაფივით დაედოს.',
          'ვუშვებთ საწრუპის გარეშე.'
        ] },

        { type: 'h', text: 'Almond Coffee' },
        { type: 'prose', items: ['ინგრედიენტები: 30 მლ არაყი, 20 მლ კალუა, 10 მლ ნუშის ლიქიორი, შავების ესპრესო, 35 მლ ნაღები.'] },
        { type: 'steps', items: [
          'წინასწარ ვამზადებთ შავების ესპრესოს.',
          'შეიქერში ვასხამთ 30 მლ არაყს, 20 მლ კალუას და 10 მლ ნუშის ლიქიორს.',
          'ვამატებთ ესპრესოსა და ყინულს და ძლიერად ვაშეიქებთ.',
          'უყინულოდ გადმოგვაქვს ცივის ჭიქაში.',
          'ვამატებთ 35 მლ ნაღებს და კარგად ვურევთ.',
          'ვდებთ საწრუპს და ვუშვებთ.'
        ] },

        { type: 'h', text: 'Coffee Gin Tonic' },
        { type: 'prose', items: ['ინგრედიენტები: შავების ესპრესო, 100 მლ ტონიკი, 50 მლ ჯინი, ლიმონის სლაისი.'] },
        { type: 'steps', items: [
          'წინასწარ ვამზადებთ შავების ესპრესოს (პიტჩერში).',
          'ცივის ჭიქას ვავსებთ ყინულით.',
          'ვუმატებთ 100 მლ ტონიკს, 50 მლ ჯინსა და ლიმონის სლაისს.',
          'ვდებთ საწრუპს.',
          'წინასწარ გამზადებულ ესპრესოს ვასხამთ ყინულზე და ვუშვებთ.'
        ] },

        { type: 'summary', text: '<b>დასამახსოვრებელი:</b> Drunk Amerikano — რომი + ყავის ლიქიორი + ესპრესო + ცხელი წყალი, ნაღები ზემოდან ქაფივით. Almond Coffee — 30 არაყი / 20 კალუა / 10 ნუშის ლიქიორი + ესპრესო, შეიქი, 35 ნაღები. Coffee Gin Tonic — 100 ტონიკი + 50 ჯინი + ლიმონი, ესპრესო ბოლოს ყინულზე.' }
      ]
    },

    /* ---- MATCHA & CLASSIC COCKTAILS ---- */
    { id: 'menu_cocktail_classic', title: 'მაჩა & კლასიკური კოქტეილები', ico: '🥃', cat: 'menu_cocktail', group: 'მენიუ',
      lead: 'Matcha Cocktail, The Magnificent Seven და Godfather.',
      blocks: [
        { type: 'h', text: 'Matcha Cocktail' },
        { type: 'prose', items: ['ინგრედიენტები: მატჩა, ფორთოხლის წვენი (წინასწარ წვრილ საცერში გადაწურული). დანარჩენი ინგრედიენტები/რაოდენობები მენიუში დეტალურად არ არის მითითებული.'] },
        { type: 'steps', items: [
          'წინასწარ ვამზადებთ მატჩას.',
          'შეიქერის პატარა ნაწილში ვასხამთ ყველა ინგრედიენტს (ფორთოხალი წინასწარ გადავწუროთ წვრილ საცერში).',
          'დიდ შეიქერს ნახევრამდე ვავსებთ ყინულით, ვამაგრებთ პატარა ნაწილს და ვაშეიქებთ.',
          'ორმაგი სტრეინერითა და საცერით გადაგვაქვს ჭიქაში.',
          'ვდებთ საწრუპს და ვუშვებთ.'
        ] },

        { type: 'h', text: 'The Magnificent Seven' },
        { type: 'prose', items: ['სერვირება: ფორთოხლის ჩიფსი და პიტნა. მზადდება შეიქით; ინგრედიენტების ზუსტი ჩამონათვალი მენიუში დაკონკრეტებული არ არის.'] },
        { type: 'steps', items: [
          'წინასწარ ვაგრილებთ ჭიქას.',
          'შეიქერის პატარა ნაწილში ვასხამთ ყველა ინგრედიენტს.',
          'დიდ ნაწილში ნახევრამდე ვყრით ყინულს, ვამაგრებთ პატარა ნაწილს და ვაშეიქებთ.',
          'ვათავისუფლებთ ჭიქას და ორმაგი სტრეინერითა და საცერით გადაგვაქვს ჭიქაში.',
          'სერვირებისთვის ვიყენებთ ფორთოხლის ჩიფსსა და პიტნას.'
        ] },

        { type: 'h', text: 'Godfather' },
        { type: 'prose', items: ['ინგრედიენტები: 35 მლ ნუშის ლიქიორი (ამარეტო), 35 მლ ვისკი. სერვირება: ფორთოხლის კანის სპირალი.'] },
        { type: 'steps', items: [
          'შეიქერის დიდ ნაწილში ვყრით ყინულს, ვასხამთ 35 მლ ნუშის ლიქიორსა და 35 მლ ვისკის.',
          'დიდი კოვზით ნელ-ნელა ვურევთ.',
          'ცივის ჭიქაში ვაგდებთ ყინულის დიდ კუბს.',
          'სტრეინერით გადაგვაქვს სითხე ჭიქაში.',
          'ფორთოხალს ვათლით კანს, ვაჭრით გვერდებს, სპირალის ფორმას ვაძლევთ და ჭიქას ვამშვენებთ.'
        ] },

        { type: 'summary', text: '<b>დასამახსოვრებელი:</b> Matcha Cocktail — მატჩა + გადაწურული ფორთოხალი, შეიქი, ორმაგი სტრეინერი/საცერი. Magnificent Seven — შეიქი; გარნირი — ფორთოხლის ჩიფსი + პიტნა. Godfather — 35 ნუშის ლიქიორი + 35 ვისკი, ნელი მორევა, დიდი ყინულის კუბი, ფორთოხლის სპირალი.' }
      ]
    }
  ];

  /* =================================================================
     QUESTIONS — {cat, q, opts:[4], a, ex}
  ================================================================= */
  const COCKTAIL_QUESTIONS = [
    { cat: 'menu_cocktail', q: 'Drunk Amerikano-ში რომელი ალკოჰოლია მთავარი?', opts: ['ვისკი', 'რომი', 'ჯინი', 'არაყი'], a: 1, ex: 'Drunk Amerikano — რომი + ყავის ლიქიორი + ესპრესო.' },
    { cat: 'menu_cocktail', q: 'Drunk Amerikano-ში ნაღები სად ემატება?', opts: ['ბაზაში ერევა', 'ზემოდან, ქაფივით', 'საერთოდ არ ემატება', 'ყინულში'], a: 1, ex: 'ნაღებს ვაშეიქერებთ და ზემოდან ვასხამთ ისე, რომ ბაზას ქაფივით დაედოს.' },
    { cat: 'menu_cocktail', q: 'Godfather-ის ინგრედიენტებია?', opts: ['რომი და ესპრესო', '35 მლ ნუშის ლიქიორი + 35 მლ ვისკი', 'ჯინი და ტონიკი', 'კალუა და არაყი'], a: 1, ex: 'Godfather — 35-35 მლ ნუშის ლიქიორი და ვისკი.' },
    { cat: 'menu_cocktail', q: 'Godfather-ში რამდენი ვისკი და ნუშის ლიქიორი ემატება?', opts: ['25-25 მლ', '35-35 მლ', '50-50 მლ', '100-100 მლ'], a: 1, ex: 'თითო 35 მლ — ნუშის ლიქიორი და ვისკი.' },
    { cat: 'menu_cocktail', q: 'Godfather როგორ მზადდება (შერევა)?', opts: ['ძლიერი შეიქით', 'დიდი კოვზით ნელ-ნელა მორევით', 'ბლენდერით', 'საერთოდ არ ირევა'], a: 1, ex: 'Spirit-forward კოქტეილია — ნელ-ნელა, კოვზით ირევა, არ იშეიქება.' },
    { cat: 'menu_cocktail', q: 'Godfather-ის გარნირი?', opts: ['პიტნა', 'ფორთოხლის კანის სპირალი', 'ლიმონი', 'ჩერი'], a: 1, ex: 'ფორთოხლის კანს სპირალის ფორმას ვაძლევთ.' },
    { cat: 'menu_cocktail', q: 'Almond Coffee-ში რომელი ლიქიორებია?', opts: ['ჯინი/ტონიკი', 'კალუა და ნუშის ლიქიორი (+ არაყი)', 'რომი/სიროფი', 'ვისკი/ვერმუტი'], a: 1, ex: 'Almond Coffee — არაყი, კალუა, ნუშის ლიქიორი.' },
    { cat: 'menu_cocktail', q: 'Almond Coffee — არაყის რაოდენობა?', opts: ['10 მლ', '20 მლ', '30 მლ', '50 მლ'], a: 2, ex: 'არაყი — 30 მლ.' },
    { cat: 'menu_cocktail', q: 'Almond Coffee — კალუას რაოდენობა?', opts: ['10 მლ', '20 მლ', '30 მლ', '35 მლ'], a: 1, ex: 'კალუა — 20 მლ.' },
    { cat: 'menu_cocktail', q: 'Almond Coffee — რამდენი ნაღები ემატება ბოლოს?', opts: ['10 მლ', '20 მლ', '35 მლ', '50 მლ'], a: 2, ex: 'ბოლოს ემატება 35 მლ ნაღები.' },
    { cat: 'menu_cocktail', q: 'Coffee Gin Tonic — ჯინისა და ტონიკის რაოდენობა?', opts: ['50 მლ ჯინი / 100 მლ ტონიკი', '100 მლ ჯინი / 50 მლ ტონიკი', '35 მლ / 35 მლ', '50 მლ / 50 მლ'], a: 0, ex: '100 მლ ტონიკი და 50 მლ ჯინი.' },
    { cat: 'menu_cocktail', q: 'Coffee Gin Tonic — ესპრესო რა ეტაპზე ემატება?', opts: ['პირველი', 'ბოლოს, ყინულზე', 'ტონიკამდე', 'საერთოდ არ ემატება'], a: 1, ex: 'წინასწარ გამზადებულ ესპრესოს ბოლოს ვასხამთ ყინულზე.' },
    { cat: 'menu_cocktail', q: 'Matcha Cocktail-ში ფორთოხალს რას ვუკეთებთ შეიქამდე?', opts: ['ვწურავთ წვრილ საცერში', 'ვჭრით ნაჭრებად', 'ვაცხელებთ', 'ვაყინავთ'], a: 0, ex: 'ფორთოხალი წინასწარ უნდა გადავწუროთ წვრილ საცერში.' },
    { cat: 'menu_cocktail', q: 'The Magnificent Seven-ის სერვირება/გარნირი?', opts: ['ლიმონი', 'ფორთოხლის ჩიფსი და პიტნა', 'ჩერი', 'დარიჩინი'], a: 1, ex: 'სერვირებისთვის — ფორთოხლის ჩიფსი და პიტნა.' },
    { cat: 'menu_cocktail', q: 'რომელი კოქტეილები მზადდება ესპრესოთი?', opts: ['Godfather და Matcha Cocktail', 'Drunk Amerikano, Almond Coffee, Coffee Gin Tonic', 'მხოლოდ Godfather', 'არცერთი'], a: 1, ex: 'ესპრესოზე დაფუძნებულია Drunk Amerikano, Almond Coffee და Coffee Gin Tonic.' }
  ];

  /* =================================================================
     FLASHCARDS — {cat, q, a}
  ================================================================= */
  const COCKTAIL_FLASHCARDS = [
    { cat: 'menu_cocktail', q: 'Drunk Amerikano?', a: 'რომი + ყავის ლიქიორი + სიროფი + ესპრესო + ცხელი წყალი; ნაღები ზემოდან ქაფივით; საწრუპის გარეშე.' },
    { cat: 'menu_cocktail', q: 'Almond Coffee?', a: '30 მლ არაყი + 20 მლ კალუა + 10 მლ ნუშის ლიქიორი + შავების ესპრესო, შეიქი, 35 მლ ნაღები.' },
    { cat: 'menu_cocktail', q: 'Coffee Gin Tonic?', a: 'შავების ესპრესო + 100 მლ ტონიკი + 50 მლ ჯინი + ლიმონი; ესპრესო ბოლოს ყინულზე.' },
    { cat: 'menu_cocktail', q: 'Godfather?', a: '35 მლ ნუშის ლიქიორი + 35 მლ ვისკი; დიდი კოვზით ნელი მორევა; დიდი ყინულის კუბი; ფორთოხლის სპირალი.' },
    { cat: 'menu_cocktail', q: 'The Magnificent Seven?', a: 'მზადდება შეიქით; გარნირი — ფორთოხლის ჩიფსი + პიტნა.' },
    { cat: 'menu_cocktail', q: 'Matcha Cocktail?', a: 'მატჩა + წვრილ საცერში გადაწურული ფორთოხალი; შეიქი; ორმაგი სტრეინერი/საცერი.' },
    { cat: 'menu_cocktail', q: 'რომელია ესპრესოს კოქტეილები?', a: 'Drunk Amerikano, Almond Coffee, Coffee Gin Tonic.' },
    { cat: 'menu_cocktail', q: 'მგ vs მლ კოქტეილებში?', a: 'მენიუში სითხის რაოდენობა „მგ"-ით წერია, მაგრამ იგულისხმება „მლ".' }
  ];

  /* =================================================================
     REGISTER (non-destructive) — joins the existing "მენიუ" group
  ================================================================= */
  let at = SECTIONS.findIndex(s => s.id === 'numbers');
  if (at < 0) at = SECTIONS.length;
  SECTIONS.splice(at, 0, ...COCKTAIL_SECTIONS);

  if (typeof CONTENT !== 'undefined') CONTENT.push(...COCKTAIL_SECTIONS);
  if (typeof SEARCH_INDEX !== 'undefined' && typeof blockText === 'function') {
    COCKTAIL_SECTIONS.forEach(s => {
      SEARCH_INDEX.push({
        id: s.id, title: s.title, cat: s.cat,
        text: (s.title + ' ' + (s.lead || '') + ' ' + blockText(s.blocks))
          .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
      });
    });
  }

  if (typeof QUESTIONS !== 'undefined') QUESTIONS.push(...COCKTAIL_QUESTIONS);
  if (typeof FLASHCARDS !== 'undefined') FLASHCARDS.push(...COCKTAIL_FLASHCARDS);

  if (typeof buildNav === 'function') buildNav();
  if (typeof updateProgressUI === 'function') updateProgressUI();
  if (typeof state !== 'undefined' && state.current === 'dashboard' && typeof CUSTOM !== 'undefined' && CUSTOM.dashboard) CUSTOM.dashboard();

  console.log('menu-cocktails.js · Part 4 (cocktails): ' + COCKTAIL_SECTIONS.length + ' sections, ' +
    COCKTAIL_QUESTIONS.length + ' questions, ' + COCKTAIL_FLASHCARDS.length + ' flashcards registered.');
})();