/* ===================================================================
   COFFEE LAB — Bar Menu module · PART 3: JUICES & LEMONADES
   Source of truth: ბარი-მენიუ PDF (Fresh Pressed + Homemade Lemonade).
   All content Georgian; ingredients preserved verbatim.

   Load AFTER the main app script and the earlier menu modules:
     <script src="./menu.js"></script>
     <script src="./menu-tea.js"></script>
     <script src="./menu-juice.js"></script>
   Auto-registers into the same "მენიუ" group; non-destructive.
=================================================================== */
(function () {
  if (typeof window !== 'undefined') {
    if (window.__CL_MENU_JUICE__) return;     // guard against double-load
    window.__CL_MENU_JUICE__ = true;
  }
  if (typeof SECTIONS === 'undefined') {
    console.warn('menu-juice.js: main app script must load first — nothing registered.');
    return;
  }

  /* ---------- category colour + label ---------- */
  Object.assign(CAT_COLOR, { menu_juice: '#E8923A' });
  Object.assign(CAT_LABEL, { menu_juice: 'ფრეში & ლიმონათი' });

  /* =================================================================
     SECTION
  ================================================================= */
  const JUICE_SECTIONS = [
    { id: 'menu_juice', title: 'ფრეშები & ლიმონათები', ico: '🍋', cat: 'menu_juice', group: 'მენიუ',
      lead: 'ახლადგამოწურული ფრეშები და სახლის ლიმონათები.',
      blocks: [
        { type: 'h', text: 'ფრეში (Fresh Pressed)' },
        { type: 'prose', items: ['ფრეშები ახლადგამოწურული წვენებია. მენიუში გვაქვს: ფორთოხლის ფრეში, გრეიფრუტის ფრეში და შერეული.'] },

        { type: 'h', text: 'ლიმონათი (Homemade Lemonade)' },
        { type: 'prose', items: ['ოთხი სახლის ლიმონათი — ყველა მზადდება ლიმონის ფრეშის, შაქრის სიროფისა და საირმეს (მინერალური წყალი) ბაზაზე.'] },
        { type: 'table', head: ['ლიმონათი', 'შემადგენლობა'], rows: [
          ['მარაკუია', 'პიტნა, მარაკუია, ლიმონის ფრეში, შაქრის სიროფი, საირმე'],
          ['ჟოლო', 'ჟოლო, შაქრის სიროფი, ლიმონის ფრეში, საირმე'],
          ['პიტნა და ლიმონი', 'პიტნა, ლიმონის სლაისი, ლიმონის ფრეში, შაქრის სიროფი, საირმე'],
          ['მატჩა', 'მატჩა, ლიმონის სლაისი, ლიმონის ფრეში, შაქრის სიროფი, საირმე']
        ] },
        { type: 'note', text: '<b>საირმე</b> — ქართული მინერალური წყალი, ლიმონათების ბაზა. ლიმონის ფრეში და შაქრის სიროფი ოთხივე ლიმონათშია.' },

        { type: 'summary', text: '<b>დასამახსოვრებელი:</b> ფრეში — ფორთოხალი, გრეიფრუტი, შერეული (ახლადგამოწურული). ლიმონათები — მარაკუია, ჟოლო, „პიტნა და ლიმონი", მატჩა; საერთო ბაზა: ლიმონის ფრეში + შაქრის სიროფი + საირმე. პიტნა — მარაკუიასა და „პიტნა და ლიმონში".' }
      ]
    }
  ];

  /* =================================================================
     QUESTIONS — {cat, q, opts:[4], a, ex}
  ================================================================= */
  const JUICE_QUESTIONS = [
    { cat: 'menu_juice', q: '„ფრეში" რას ნიშნავს?', opts: ['დაკონსერვებული წვენი', 'ახლადგამოწურული წვენი', 'გაზიანი სასმელი', 'ცივი ჩაი'], a: 1, ex: 'ფრეში — ახლადგამოწურული წვენი.' },
    { cat: 'menu_juice', q: 'რომელი ფრეშებია მენიუში?', opts: ['ვაშლი, მსხალი', 'ფორთოხალი, გრეიფრუტი, შერეული', 'ლიმონი, კომში', 'ნესვი, საზამთრო'], a: 1, ex: 'მენიუში: ფორთოხლის, გრეიფრუტის და შერეული ფრეში.' },
    { cat: 'menu_juice', q: 'ლიმონათების საერთო ბაზა (გასაზავებელი წყალი)?', opts: ['ჩვეულებრივი წყალი', 'საირმე (მინერალური წყალი)', 'ტონიკი', 'რძე'], a: 1, ex: 'ყველა ლიმონათში გვხვდება საირმე — ქართული მინერალური წყალი.' },
    { cat: 'menu_juice', q: 'ლიმონის ფრეში რომელ ლიმონათებშია?', opts: ['მხოლოდ მატჩაში', 'ოთხივეში', 'მხოლოდ ჟოლოში', 'არცერთში'], a: 1, ex: 'ლიმონის ფრეში ოთხივე ლიმონათის შემადგენელია.' },
    { cat: 'menu_juice', q: 'შაქრის სიროფი რომელ ლიმონათებშია?', opts: ['მხოლოდ ჟოლოში', 'ოთხივეში', 'მხოლოდ მატჩაში', 'არცერთში'], a: 1, ex: 'შაქრის სიროფი ოთხივე ლიმონათშია.' },
    { cat: 'menu_juice', q: 'მარაკუიას ლიმონათი რას შეიცავს ლიმონის გარდა?', opts: ['ჟოლოს', 'პიტნასა და მარაკუიას', 'მატჩას', 'გრეიფრუტს'], a: 1, ex: 'მარაკუია: პიტნა, მარაკუია, ლიმონის ფრეში, შაქრის სიროფი, საირმე.' },
    { cat: 'menu_juice', q: 'ჟოლოს ლიმონათის შემადგენლობა?', opts: ['ჟოლო, შაქრის სიროფი, ლიმონის ფრეში, საირმე', 'მატჩა, ლიმონი, საირმე', 'პიტნა, მარაკუია, ლიმონი', 'მხოლოდ ჟოლო და წყალი'], a: 0, ex: 'ჟოლო: ჟოლო, შაქრის სიროფი, ლიმონის ფრეში, საირმე.' },
    { cat: 'menu_juice', q: 'რომელი ლიმონათი მზადდება მატჩით?', opts: ['ჟოლო', 'მატჩა', 'მარაკუია', 'პიტნა და ლიმონი'], a: 1, ex: 'მატჩას ლიმონათი: მატჩა, ლიმონის სლაისი, ლიმონის ფრეში, შაქრის სიროფი, საირმე.' },
    { cat: 'menu_juice', q: 'რომელ ლიმონათებში გვხვდება პიტნა?', opts: ['ჟოლო და მატჩა', 'მარაკუია და „პიტნა და ლიმონი"', 'ოთხივეში', 'არცერთში'], a: 1, ex: 'პიტნა — მარაკუიასა და „პიტნა და ლიმონი" ლიმონათებში.' },
    { cat: 'menu_juice', q: '„პიტნა და ლიმონი" ლიმონათში მთავარი არომატი?', opts: ['მატჩა', 'პიტნა და ლიმონი', 'ჟოლო', 'მარაკუია'], a: 1, ex: 'სახელის შესაბამისად — პიტნა და ლიმონი.' }
  ];

  /* =================================================================
     FLASHCARDS — {cat, q, a}
  ================================================================= */
  const JUICE_FLASHCARDS = [
    { cat: 'menu_juice', q: 'ფრეშები მენიუში?', a: 'ფორთოხალი, გრეიფრუტი, შერეული — ახლადგამოწურული.' },
    { cat: 'menu_juice', q: 'ლიმონათების საერთო ბაზა?', a: 'ლიმონის ფრეში + შაქრის სიროფი + საირმე (მინერალური წყალი).' },
    { cat: 'menu_juice', q: 'მარაკუიას ლიმონათი?', a: 'პიტნა, მარაკუია, ლიმონის ფრეში, შაქრის სიროფი, საირმე.' },
    { cat: 'menu_juice', q: 'ჟოლოს ლიმონათი?', a: 'ჟოლო, შაქრის სიროფი, ლიმონის ფრეში, საირმე.' },
    { cat: 'menu_juice', q: '„პიტნა და ლიმონი" ლიმონათი?', a: 'პიტნა, ლიმონის სლაისი, ლიმონის ფრეში, შაქრის სიროფი, საირმე.' },
    { cat: 'menu_juice', q: 'მატჩას ლიმონათი?', a: 'მატჩა, ლიმონის სლაისი, ლიმონის ფრეში, შაქრის სიროფი, საირმე.' }
  ];

  /* =================================================================
     REGISTER (non-destructive) — joins the existing "მენიუ" group
  ================================================================= */
  let at = SECTIONS.findIndex(s => s.id === 'numbers');
  if (at < 0) at = SECTIONS.length;
  SECTIONS.splice(at, 0, ...JUICE_SECTIONS);

  if (typeof CONTENT !== 'undefined') CONTENT.push(...JUICE_SECTIONS);
  if (typeof SEARCH_INDEX !== 'undefined' && typeof blockText === 'function') {
    JUICE_SECTIONS.forEach(s => {
      SEARCH_INDEX.push({
        id: s.id, title: s.title, cat: s.cat,
        text: (s.title + ' ' + (s.lead || '') + ' ' + blockText(s.blocks))
          .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
      });
    });
  }

  if (typeof QUESTIONS !== 'undefined') QUESTIONS.push(...JUICE_QUESTIONS);
  if (typeof FLASHCARDS !== 'undefined') FLASHCARDS.push(...JUICE_FLASHCARDS);

  if (typeof buildNav === 'function') buildNav();
  if (typeof updateProgressUI === 'function') updateProgressUI();
  if (typeof state !== 'undefined' && state.current === 'dashboard' && typeof CUSTOM !== 'undefined' && CUSTOM.dashboard) CUSTOM.dashboard();

  console.log('menu-juice.js · Part 3 (juices & lemonades): ' + JUICE_SECTIONS.length + ' section, ' +
    JUICE_QUESTIONS.length + ' questions, ' + JUICE_FLASHCARDS.length + ' flashcards registered.');
})();