/* ===================================================================
   COFFEE LAB — RECALL TRAINER ("გაშიფრე")
   A quiz-like self-test that works differently: a prompt/challenge is
   shown (e.g. „გაშიფრე CQI", „რას შეიცავს კაპუჩინო"), the learner thinks,
   reveals the answer, then self-grades (ვიცოდი / ვერ ვიცოდი).

   All prompts + answers derive ONLY from in-app content. Self-registering
   IIFE with a double-load guard, like the menu-*.js modules.
   Load AFTER app.js (and after the menu modules so every category exists).
=================================================================== */
(function () {
  if (typeof window !== 'undefined') {
    if (window.__CL_RECALL__) return;          // guard against double-load
    window.__CL_RECALL__ = true;
  }
  if (typeof SECTIONS === 'undefined' || typeof CUSTOM === 'undefined') {
    console.warn('recall.js: main app script must load first — nothing registered.');
    return;
  }

  /* =================================================================
     CHALLENGES — {cat, prompt, answer}  (cat reuses existing keys)
  ================================================================= */
  const RECALL = [
    /* --- გაშიფრე / decode --- */
    { cat: 'specialty', prompt: 'გაშიფრე CQI', answer: 'Coffee Quality Institute — Specialty ყავის ერთ-ერთი მთავარი შემფასებელი (SCA-სთან ერთად).' },
    { cat: 'specialty', prompt: 'რა არის SCA Specialty-ში?', answer: 'Specialty ყავის ერთ-ერთი მთავარი შემფასებელი ორგანიზაცია (CQI-სთან ერთად).' },
    { cat: 'processing', prompt: 'გაშიფრე GCE (Swiss Water)', answer: 'Green Coffee Extract — ნარევი, რომელიც შეიცავს ყველაფერს მწვანე ყავიდან კოფეინის გარდა; სწორედ ის „იწოვს" კოფეინს, ქიმიური გამხსნელის გარეშე.' },
    { cat: 'processing', prompt: 'რას ადგენს FDA უკოფეინო ყავაზე?', answer: 'ყავა უკოფეინოდ (decaf) ითვლება, როცა კოფეინის 97% ამოღებულია.' },
    { cat: 'grinding', prompt: 'რა არის Mahlkoenig EK43?', answer: 'გერმანული საფქვავი (ბრენდი 80+ წელია ლიდერი), რომელმაც გაზარდა საშუალო ექსტრაქციის მაჩვენებელი; დაფქვის დიდი დიაპაზონი — თურქულიდან ფილტრამდე.' },
    { cat: 'menu_beer', prompt: 'გაშიფრე DIPA', answer: 'Double IPA (ორმაგი იპა) — ორმაგი მშრალი გასვიანების ლუდი; მენიუში ყველაზე ძლიერი (9.0%).' },
    { cat: 'menu_beer', prompt: 'გაშიფრე APA', answer: 'American Pale Ale — ამერიკული ღია ფერის ელი, Idaho7® სვიით (6.0%).' },
    { cat: 'menu_matcha', prompt: 'რა არის L-theanine?', answer: 'ამინომჟავა მატჩაში — ამშვიდებს ნერვულ სისტემას, ამცირებს სტრესს, აუმჯობესებს კონცენტრაციას და არ იწვევს ძილიანობას.' },
    { cat: 'history', prompt: 'გაშიფრე ყავის 3 თაობა', answer: 'I — ხსნადი ყავა (Nescafe); II — კომერციული (იტალია + Starbucks); III — Specialty.' },
    { cat: 'immersion', prompt: 'გაშიფრე Immersion vs Percolation', answer: 'Immersion = ჩაძირვა (წყალი ჩერდება; მაქს. ექსტრაქცია, მეტი ტანი; French Press). Percolation = გადინება (წყალი მოედინება; გლუვი, სუფთა; V60).' },
    { cat: 'varieties', prompt: 'გაშიფრე არაბიკა vs რობუსტა (კოფეინი/გემო)', answer: 'არაბიკა — 0.8–1.4% კოფეინი, რბილი/ხილოვანი, მაღალ სიმაღლეზე. რობუსტა — 1.7–4% კოფეინი, მძაფრი/მწარე, დაბალ სიმაღლეზე.' },

    /* --- რას შეიცავს / რისგან მზადდება --- */
    { cat: 'drinks', prompt: 'რას შეიცავს კაპუჩინო (Coffee Lab)?', answer: 'რძიანი: ორმაგი ესპრესო + თბილი რძე (60–65°C). ცალკე სტანდარტი არ არსებობს — ვეძახით „რძიან პატარას/დიდს"; განსხვავება მხოლოდ რძის რაოდენობაშია.' },
    { cat: 'menu_hot', prompt: 'რისგან მზადდება ამერიკანო / ლონგ ბლექი?', answer: 'ორმაგი ესპრესო + ცხელი წყალი. ამერიკანო — დიდი (200 მლ); ლონგ ბლექი — ყოველთვის პატარა (180 მლ).' },
    { cat: 'menu_cold', prompt: 'რას შეიცავს ცივი ამერიკანო?', answer: 'ყინული + 130 მლ ცივი გაფილტრული წყალი + ცხელი ორმაგი ესპრესო (ბოლოს).' },
    { cat: 'menu_cocktail', prompt: 'რას შეიცავს Godfather?', answer: '35 მლ ნუშის ლიქიორი (ამარეტო) + 35 მლ ვისკი; დიდი კოვზით ნელ-ნელა ირევა; ფორთოხლის სპირალი.' },
    { cat: 'menu_cocktail', prompt: 'რას შეიცავს Almond Coffee?', answer: '30 მლ არაყი + 20 მლ კალუა + 10 მლ ნუშის ლიქიორი + შავების ესპრესო + 35 მლ ნაღები.' },
    { cat: 'menu_cocktail', prompt: 'რას შეიცავს Coffee Gin Tonic?', answer: 'შავების ესპრესო + 100 მლ ტონიკი + 50 მლ ჯინი + ლიმონის სლაისი.' },
    { cat: 'menu_cocktail', prompt: 'რას შეიცავს Drunk Amerikano?', answer: 'რომი + ყავის ლიქიორი + სიროფი + ესპრესო + ცხელი წყალი; ნაღები ზემოდან ქაფივით; ვუშვებთ საწრუპის გარეშე.' },
    { cat: 'menu_juice', prompt: 'რას შეიცავს მარაკუიას ლიმონათი?', answer: 'პიტნა, მარაკუია, ლიმონის ფრეში, შაქრის სიროფი, საირმე.' },
    { cat: 'menu_juice', prompt: 'რა არის ლიმონათების საერთო ბაზა?', answer: 'ლიმონის ფრეში + შაქრის სიროფი + საირმე (ქართული მინერალური წყალი) — ოთხივე ლიმონათში.' },
    { cat: 'menu_tea', prompt: 'რისგან მზადდება ცეილონის შავი ჩაი?', answer: 'ჩაის მცენარის ახალგაზრდა ფოთლები და კვირტები; შრი-ლანკის მთა. სტანდარტი: 4 გრ / 500 მლ / 3–4 წთ.' },
    { cat: 'menu_matcha', prompt: 'რისგან მზადდება მატჩა?', answer: 'იაპონური მწვანე ჩაი ფხვნილად — ტენჩას ფოთლებისგან, შიზუოკას პრეფექტურა.' },

    /* --- შეფარდება / ratio --- */
    { cat: 'espresso', prompt: 'რა შეფარდებაა ორმაგი ესპრესო?', answer: '1/2 — 18 გრ დაფქული ყავა → 36 მლ სითხე, 9 ბარი წნევით.' },
    { cat: 'menu_notstd', prompt: 'რა შეფარდებაა Ristretto?', answer: '1/1 (ყავა/წყალი), შავების მარცვლით — ესპრესოზე ინტენსიური, მცირე მოცულობით.' },
    { cat: 'menu_notstd', prompt: 'რა შეფარდებაა Lungo?', answer: '1/3 (ყავა/წყალი), შავების მარცვლით.' },
    { cat: 'menu_notstd', prompt: 'რა შეფარდებაა Cortado?', answer: '1/2 (ყავა/რძე), რძიანების მარცვლით.' },

    /* --- ჩამოთვალე / list --- */
    { cat: 'plant', prompt: 'ჩამოთვალე მარცვლის ანატომია (გარედან შიგნით)', answer: 'Skin → Pulp → Mucilage → Parchment → Silverskin → Seed.' },
    { cat: 'harvest', prompt: 'დაასახელე ხელით დაკრეფვის 2 მეთოდი', answer: 'დაფერთხვა (Stripping) — ყველაფერი ერთად; გადარჩევა (Picking) — მხოლოდ მწიფე, ხარისხიანი/ძვირი.' },
    { cat: 'extraction', prompt: 'რა არის ექსტრაქციის იდეალური ნორმა?', answer: '18–22%. <18% — Underextracted (მჟავე/სუსტი); >22% — Overextracted (მწარე/ძლიერი).' },
    { cat: 'cupping', prompt: 'რა არის ქაფინგი?', answer: 'პროფესიული დაგემოვნება — ყავის გემოებისა და დეფექტების აღმოჩენა არასწორი მომზადების გარეშე. 93–95°C → 4 წთ → break&smell → skim → taste.' },
    { cat: 'machine', prompt: 'რომელი ბრენდის ესპრესო-აპარატია Coffee Lab-ში?', answer: 'Sanremo (იტალია, ტრევიზო); მოდელები — Opera და Café Racer.' },
    { cat: 'brewing', prompt: 'ვინ შექმნა French Press / AeroPress / Pulsar?', answer: 'French Press — Attilio Calimani (1929); AeroPress — Alan Adler (2005); Next Level Pulsar — Scott Rao + Jonathan Gagné.' }
  ];

  /* =================================================================
     STATE + RENDERERS
  ================================================================= */
  const rc = { list: [], i: 0, revealed: false, knew: 0, missed: 0 };

  function startRecall() {
    rc.list = (typeof shuffle === 'function') ? shuffle([...RECALL]) : [...RECALL];
    rc.i = 0; rc.revealed = false; rc.knew = 0; rc.missed = 0;
    renderRecall();
  }

  function renderRecall() {
    const sec = byId('recall');
    if (rc.i >= rc.list.length) return renderRecallResult();
    const c = rc.list[rc.i];
    $('#view').innerHTML = sectionHeader(sec) + `
      <div class="rc-stage">
        <div class="rc-meta">
          <span>${rc.i + 1} / ${rc.list.length}</span>
          <span><span class="rc-cat">${CAT_LABEL[c.cat] || c.cat}</span></span>
          <span>✓ ${rc.knew} · ✗ ${rc.missed}</span>
        </div>
        <div class="rc-card">
          <div class="rc-prompt">${esc(c.prompt)}</div>
          ${rc.revealed ? `<div class="rc-answer">${esc(c.answer)}</div>` : `<div class="rc-hint">დაფიქრდი და ნახე პასუხი</div>`}
        </div>
        ${rc.revealed
          ? `<div class="rc-grade">
               <button class="btn miss" id="rcMiss">✗ ვერ ვიცოდი</button>
               <button class="btn good" id="rcKnew">✓ ვიცოდი</button>
             </div>`
          : `<div class="rc-controls">
               <button class="btn" id="rcQuit">⨯ შეწყვეტა</button>
               <button class="btn primary" id="rcShow">💡 პასუხის ჩვენება</button>
             </div>`}
      </div>`;
    if (rc.revealed) {
      $('#rcKnew').onclick = () => { rc.knew++; rcNext(); };
      $('#rcMiss').onclick = () => { rc.missed++; rcNext(); };
    } else {
      $('#rcShow').onclick = () => { rc.revealed = true; renderRecall(); };
      $('#rcQuit').onclick = () => go('dashboard');
    }
  }

  function rcNext() { rc.i++; rc.revealed = false; renderRecall(); }

  function renderRecallResult() {
    const sec = byId('recall');
    const total = rc.knew + rc.missed;
    const pct = total ? Math.round(rc.knew / total * 100) : 0;
    const msg = pct >= 90 ? 'შესანიშნავი მეხსიერება! 🏆' : pct >= 70 ? 'კარგია! 👏' : pct >= 50 ? 'საშუალო — გაიმეორე მასალა.' : 'საჭიროა გამეორება. 📚';
    $('#view').innerHTML = sectionHeader(sec) + `
      <div class="rc-stage">
        <div class="rc-card">
          <div class="rc-cat">შედეგი</div>
          <div class="rc-prompt">${rc.knew} / ${total} ვიცოდი</div>
          <div class="rc-answer" style="text-align:center">${pct}% · ${msg}</div>
        </div>
        <div class="rc-controls">
          <button class="btn" id="rcHome">⌂ მთავარი</button>
          <button class="btn primary" id="rcRetry">↻ თავიდან</button>
        </div>
      </div>`;
    $('#rcRetry').onclick = () => startRecall();
    $('#rcHome').onclick = () => go('dashboard');
  }

  CUSTOM.recall = startRecall;

  /* =================================================================
     REGISTER the new page (group „ვარჯიში", next to ქვიზი)
  ================================================================= */
  const RECALL_SECTION = {
    id: 'recall', title: 'გაშიფრე', ico: '🧩', cat: 'tool', group: 'ვარჯიში', custom: 'recall',
    lead: 'მეხსიერების გამოწვევა — გამოჩნდება დავალება (მაგ. „გაშიფრე CQI" ან „რას შეიცავს კაპუჩინო"), ნახე პასუხი და შეაფასე საკუთარი თავი.'
  };
  let at = SECTIONS.findIndex(s => s.id === 'quiz');
  if (at < 0) at = SECTIONS.length;
  SECTIONS.splice(at, 0, RECALL_SECTION);

  if (typeof CONTENT !== 'undefined') CONTENT.push(RECALL_SECTION);
  if (typeof SEARCH_INDEX !== 'undefined') {
    SEARCH_INDEX.push({
      id: RECALL_SECTION.id, title: RECALL_SECTION.title, cat: RECALL_SECTION.cat,
      text: (RECALL_SECTION.title + ' ' + RECALL_SECTION.lead + ' ' + RECALL.map(r => r.prompt).join(' '))
        .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
    });
  }

  if (typeof buildNav === 'function') buildNav();
  if (typeof updateProgressUI === 'function') updateProgressUI();
  if (typeof state !== 'undefined' && state.current === 'dashboard' && CUSTOM.dashboard) CUSTOM.dashboard();

  console.log('recall.js · გაშიფრე trainer: ' + RECALL.length + ' challenges registered.');
})();
