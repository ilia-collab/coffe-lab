/* ===================================================================
   COFFEE LAB — FULL PRODUCT MENU ("სრული მენიუ")
   A new page (like ისტორია / ესპრესო / ქვიზი) that lists every product
   GROUPED into: ცხელი ყავები · ცივი ყავები · სასმელები · ალკოჰოლი.

   • Click any product → a detail panel opens with its info.
   • Coffees can be sorted (PART 2) — by intensity (descending/ascending)
     using the app's own intensity model (DRINKS / BREW). The app has no
     per-drink bitterness/sweetness data, so those sorts are not offered.

   Source of truth: menu.md / DRINKS / BREW. All content Georgian; numbers
   preserved. Self-registering IIFE with double-load guard.
   Load AFTER app.js and the menu modules.
=================================================================== */
(function () {
  if (typeof window !== 'undefined') {
    if (window.__CL_PRODUCT_MENU__) return;    // guard against double-load
    window.__CL_PRODUCT_MENU__ = true;
  }
  if (typeof SECTIONS === 'undefined' || typeof CUSTOM === 'undefined') {
    console.warn('product-menu.js: main app script must load first — nothing registered.');
    return;
  }

  /* =================================================================
     PRODUCTS — grouped catalogue (intensity = app's own model)
     group: 'coffee' | 'cold' | 'drink' | 'alcohol'
  ================================================================= */
  const PRODUCTS = [
    /* ---- ☕ ცხელი ყავები (sortable by intensity) ---- */
    { group: 'coffee', cat: 'menu_hot', name: 'ორმაგი ესპრესო', sub: 'Double Espresso', intensity: 100,
      ratio: '18 გრ → 36 მლ (1/2)', beans: 'ესპრესოს',
      desc: 'მენიუს ყველაზე ინტენსიური ყავა — ინტენსიური, მკვეთრად გამოხატული გემოებით.',
      prep: '18 გრ დაფქული ყავა → 36 მლ სითხე, 9 ბარი წნევით.' },
    { group: 'coffee', cat: 'menu_hot', name: 'ლონგ ბლექი', sub: 'Long Black · შავი, რძის გარეშე', intensity: 72,
      size: '180 მლ', beans: 'ესპრესოს',
      desc: 'ორმაგი ესპრესო + ცხელი წყალი. ყოველთვის პატარა ზომით მზადდება; POS-ში — „შავი, რძის გარეშე, პატარა".' },
    { group: 'coffee', cat: 'menu_hot', name: 'ამერიკანო', sub: 'Americano · შავი, რძის გარეშე', intensity: 55,
      size: '200 მლ', beans: 'ესპრესოს',
      desc: 'ორმაგი ესპრესო + 200 მლ ცხელი წყალი (დიდი). მეტი წყალი → ნაკლები ინტენსივობა.' },
    { group: 'coffee', cat: 'menu_hot', name: 'რძიანი პატარა', sub: 'White Small · კაპუჩინო/ფლეტ ვაითი', intensity: 58,
      size: '180 მლ რძე', beans: 'რძიანების',
      desc: 'ორმაგი ესპრესო + 180 მლ თბილი რძე. მეტად ინტენსიური, ვიდრე დიდი; ყავის გემო უფრო შესამჩნევი.',
      prep: 'რძეს ვაცხელებთ 60–65°C-მდე — ბუნებრივი სიტკბოს შესანარჩუნებლად.' },
    { group: 'coffee', cat: 'menu_hot', name: 'რძიანი დიდი', sub: 'White Large · ლატე/კაპუჩინო', intensity: 42,
      size: '200 მლ რძე', beans: 'რძიანების',
      desc: 'ორმაგი ესპრესო + 200 მლ თბილი რძე. ნაკლებად ინტენსიური, რბილი, ტკბილი რძიანი ყავა.' },
    { group: 'coffee', cat: 'menu_notstd', name: 'რისტრეტო', sub: 'Ristretto', intensity: 108,
      ratio: '1/1 (ყავა/წყალი)', beans: 'შავების',
      desc: 'ესპრესოზე ინტენსიური ყავა, მოცულობით კი გაცილებით მცირე.' },
    { group: 'coffee', cat: 'menu_notstd', name: 'ლუნგო', sub: 'Lungo', intensity: 80,
      ratio: '1/3 (ყავა/წყალი)', beans: 'შავების',
      desc: 'რისტრეტო/ესპრესოზე ნაკლები, შავ (რძის გარეშე) პატარაზე მეტი ინტენსივობა.' },
    { group: 'coffee', cat: 'menu_notstd', name: 'კორტადო', sub: 'Cortado', intensity: 66,
      ratio: '1/2 (ყავა/რძე)', beans: 'რძიანების',
      desc: 'თეთრ (რძით) პატარასთან შედარებით ინტენსიური, მოცულობით კი მცირე.' },
    { group: 'coffee', cat: 'menu_notstd', name: 'მაკიატო', sub: 'Macchiato', intensity: 74,
      beans: 'რძიანების',
      desc: 'რძიანების ორმაგ ესპრესოს ზემოდან ~2 კოვზი ამოყვანილი რძის ქაფი. კორტადოზე ინტენსიური.' },
    { group: 'coffee', cat: 'menu_other', name: 'Hand Brew', sub: 'ფილტრი · Next Level Pulsar', intensity: 38,
      desc: 'ფილტრის ყავებს შორის საშუალოდ ინტენსიური. დისპერსიული თავსახური + სარქველი; ქაღალდის ფილტრი → სუფთა სხეული, მკვეთრად გამოხატული არომატები.' },

    /* ---- 🧊 ცივი ყავები ---- */
    { group: 'cold', cat: 'menu_cold', name: 'ცივი ორმაგი ესპრესო', sub: 'ყველაზე ინტენსიური ცივი',
      desc: 'ცივ ყავებს შორის ყველაზე ინტენსიური — მზადდება მხოლოდ ორმაგი ესპრესოთი.',
      prep: 'ესპრესო შეიქერდება ყინულებთან და ისხმება ჭიქაში, რომელშიც ხვდება მხოლოდ ერთი კუბი ყინული.' },
    { group: 'cold', cat: 'menu_cold', name: 'ცივი ყავა რძით', sub: 'საშუალოდ ინტენსიური',
      desc: 'საშუალოდ ინტენსიური — რძის (130 მლ) გამო ინტენსივობა მცირდება.',
      prep: 'ჭიქაში ყინული, ემატება რძე, შემდეგ ცხელი ორმაგი ესპრესო.' },
    { group: 'cold', cat: 'menu_cold', name: 'ცივი ამერიკანო', sub: 'საშუალოდ ინტენსიური',
      desc: 'საშუალოდ ინტენსიური — ორმაგი ესპრესო და ცივი გაფილტრული წყალი.',
      prep: 'ჭიქაში ყინული + 130 მლ ცივი გაფილტრული წყალი + ბოლოს ცხელი ორმაგი ესპრესო.' },
    { group: 'cold', cat: 'menu_other', name: 'ესპრესო ტონიკით', sub: 'Sparkling · ცივი',
      desc: 'სახასიათო გემო, მეტად გამოხატული სასიამოვნო სიმჟავე.',
      prep: 'ჭიქაში ყინული, ემატება ტონიკი და ბოლოს ცხელი ორმაგი ესპრესო.' },
    { group: 'cold', cat: 'menu_other', name: 'ესპრესო ნაღებით', sub: 'Creamy · ცივი',
      desc: 'ნაღების ბუნებრივი სიტკბო.',
      prep: 'ერთი კუბი ყინული, ესპრესო შეიქერდება ყინულთან, ისხმება ჭიქაში, ბოლოს 35 მლ ნაღები.' },

    /* ---- 🥤 სასმელები (ჩაი · მატჩა · ფრეში · ლიმონათი) ---- */
    { group: 'drink', cat: 'menu_tea', name: 'ცეილონის შავი ჩაი', sub: 'Ceylon Black Tea',
      desc: 'ახალგაზრდა ფოთლები/კვირტები, შრი-ლანკის მთა; ინტენსიური წითელი/სპილენძისფერი, არომატული და მომჟავო.',
      prep: '4 გრ ჩაი + 500 მლ ცხელი წყალი, დაყოვნება 3–4 წთ.' },
    { group: 'drink', cat: 'menu_tea', name: 'ელ გრეი ბერგამოტით', sub: 'Earl Grey · შავი',
      desc: 'შავი ჩაის ბლენდი ბერგამოტის არომატით.' },
    { group: 'drink', cat: 'menu_tea', name: 'შავი ჩაი კენკრით', sub: 'Berries · შავი',
      desc: 'შავი ჩაის ბლენდი ხილითა და ჰერბარიუმებით, შავი მოცხარის არომატით (მოცხარი 2%, ფოთლები 1%).' },
    { group: 'drink', cat: 'menu_tea', name: 'მწვანე კლასიკური', sub: 'Green · იუნანი',
      desc: 'მწვანე ჩაი სამხრეთ ჩინეთიდან (იუნანი); ოდნავ ყვავილოვანი, სასიამოვნო სიტკბოთი.' },
    { group: 'drink', cat: 'menu_tea', name: 'მწვანე მარწყვითა და ანანასით', sub: 'Green · ხილით',
      desc: 'მწვანე ჩაის ბლენდი ხილის ნაჭრებით, მარწყვისა და ანანასის არომატით.' },
    { group: 'drink', cat: 'menu_tea', name: 'მწვანე ჟასმინით', sub: 'Green Jasmine',
      desc: 'ჟასმინის ყვავილის არომატი; ინტენსიური ყვავილოვანი, ღრმა და ჰარმონიული გემო.' },
    { group: 'drink', cat: 'menu_tea', name: 'წითელი ფორთოხალი და მარაკუია', sub: 'Fruit Tea · ვიტ. C',
      desc: 'ხილის მელანჟი ვიტამინ C-ით; წითელი ფორთოხლისა და მარაკუიას არომატით.',
      ingredients: 'ვაშლი, წითელი ფორთოხალი, ჰიბისკუსი, მარაკუია, ჭარხალი, მანგო, ზამბახის ყვავილი.' },
    { group: 'drink', cat: 'menu_tea', name: 'მარწყვი გუავა', sub: 'Fruit Tea',
      desc: 'ხილის მელანჟი მარწყვისა და გუავას გემოებით.',
      ingredients: 'დაშაქრული ანანასი და პაპაია, ასკილი, ჰიბისკუსი, ანწლი, ჭარხალი, მარწყვი, გუავა, ვანილი.' },
    { group: 'drink', cat: 'menu_tea', name: 'კივი მსხალი', sub: 'Fruit Tea',
      desc: 'ხილის მელანჟი კივისა და მსხლის არომატით.',
      ingredients: 'მსხალი და ვაშლი, დაშაქრული ანანასი და მანგო, ნესვი, ასკილი, კივი.' },
    { group: 'drink', cat: 'menu_tea', name: 'Milky Oolong', sub: 'რძით ფერმენტირებული უულუნი',
      desc: 'ფუჯიანი (ჩინეთი); ფოთლები რძის არომატში გაჟღენთამდე შრება. რბილი, ტკბილი, ყვავილოვანი; თხელი რძისეული ნოტები და კარამელის არომატი.' },
    { group: 'drink', cat: 'menu_matcha', name: 'მატჩა', sub: 'Matcha Shizuoka',
      desc: 'იაპონური მწვანე ჩაი ფხვნილად — ტენჩას ფოთლები, შიზუოკა. ანტიოქსიდანტები, კოფეინი + L-theanine, აჩქარებს მეტაბოლიზმს. გემო: უმამი + ოდნავ ტკბილი + მსუბუქი სიმწარე.' },
    { group: 'drink', cat: 'menu_matcha', name: 'ცხელი მატჩა ლატე', sub: 'Hot Matcha Latte',
      prep: 'მატჩა იხსნება ცხელ წყალში, შემდეგ ემატება ამოყვანილი რძე.' },
    { group: 'drink', cat: 'menu_matcha', name: 'ცივი მატჩა ლატე', sub: 'Cold Matcha Latte',
      prep: 'მატჩა იხსნება ცხელ წყალში, ისხმება ყინულიან და რძიან ჭიქაში.' },
    { group: 'drink', cat: 'menu_matcha', name: 'მატჩა ტონიკით', sub: 'Matcha Tonic',
      prep: 'მატჩა იხსნება ცხელ წყალში, ისხმება ტონიკიან და ყინულიან ჭიქაში.' },
    { group: 'drink', cat: 'menu_juice', name: 'ფორთოხლის ფრეში', sub: 'Fresh Pressed',
      desc: 'ახლადგამოწურული ფორთოხლის წვენი.' },
    { group: 'drink', cat: 'menu_juice', name: 'გრეიფრუტის ფრეში', sub: 'Fresh Pressed',
      desc: 'ახლადგამოწურული გრეიფრუტის წვენი.' },
    { group: 'drink', cat: 'menu_juice', name: 'შერეული ფრეში', sub: 'Fresh Pressed',
      desc: 'ახლადგამოწურული შერეული ფრეში.' },
    { group: 'drink', cat: 'menu_juice', name: 'მარაკუიას ლიმონათი', sub: 'Homemade Lemonade',
      ingredients: 'პიტნა, მარაკუია, ლიმონის ფრეში, შაქრის სიროფი, საირმე.' },
    { group: 'drink', cat: 'menu_juice', name: 'ჟოლოს ლიმონათი', sub: 'Homemade Lemonade',
      ingredients: 'ჟოლო, შაქრის სიროფი, ლიმონის ფრეში, საირმე.' },
    { group: 'drink', cat: 'menu_juice', name: 'პიტნა და ლიმონი', sub: 'Homemade Lemonade',
      ingredients: 'პიტნა, ლიმონის სლაისი, ლიმონის ფრეში, შაქრის სიროფი, საირმე.' },
    { group: 'drink', cat: 'menu_juice', name: 'მატჩას ლიმონათი', sub: 'Homemade Lemonade',
      ingredients: 'მატჩა, ლიმონის სლაისი, ლიმონის ფრეში, შაქრის სიროფი, საირმე.' },

    /* ---- 🍺 ალკოჰოლი (ლუდი · კოქტეილები) ---- */
    { group: 'alcohol', cat: 'menu_beer', name: 'West Coast IPA', sub: 'Craft Beer', abv: '6.0%', vol: '330 მლ', energy: '42.9 კალ/100 მლ',
      desc: 'აშშ-ს დასავლეთ სანაპიროს სტილის IPA — ტროპიკული ხილის გემო, წიწვოვანი სიმწარე, დიდხანს გამყოლი სიმშრალე.',
      ingredients: 'წყალი, ქერის ალაო, სვია, საფუარი. შეიძლება შეიცავდეს ბუნებრივ ნალექს.' },
    { group: 'alcohol', cat: 'menu_beer', name: 'Double IPA', sub: 'ორმაგი იპა · Craft Beer', abv: '9.0%', vol: '330 მლ', energy: '42.9 კალ/100 მლ',
      desc: 'ორმაგი მშრალი გასვიანების ლუდი, ალაოს სიტკბოსა და სვიის არომატის საუკეთესო ბალანსით. მენიუში ყველაზე ძლიერი.',
      ingredients: 'წყალი, ქერის ალაო, სვია, საფუარი. შეიძლება შეიცავდეს ბუნებრივ ნალექს.' },
    { group: 'alcohol', cat: 'menu_beer', name: 'Single Malt IPA', sub: 'Craft Beer', abv: '6.0%', vol: '330 მლ', energy: '42.9 კალ/100 მლ',
      desc: 'ერთი სახეობის ალაოსა და სვიაზე მოხარშული IPA — მშრალი, საშუალო-მსუბუქი, წიწვოვანი სიმწარითა და ციტრუსის არომატებით.',
      ingredients: 'წყალი, ქერის ალაო, სვია, საფუარი. შეიძლება შეიცავდეს ბუნებრივ ნალექს.' },
    { group: 'alcohol', cat: 'menu_beer', name: 'American Pale Ale', sub: 'Idaho7 · Craft Beer', abv: '6.0%', vol: '330 მლ', energy: '42.9 კალ/100 მლ',
      desc: 'ამერიკული ღია ფერის ელი, გასვიანებული Idaho7®-ის უნიკალური სვიით.',
      ingredients: 'წყალი, ქერის ალაო, სვია, საფუარი. შეიძლება შეიცავდეს ბუნებრივ ნალექს.' },
    { group: 'alcohol', cat: 'menu_cocktail', name: 'Drunk Amerikano', sub: 'ესპრესოს კოქტეილი',
      ingredients: 'რომი, ყავის ლიქიორი, სიროფი, ესპრესო, ცხელი წყალი, ნაღები.',
      prep: 'ცივის ჭიქაში რომი, ყავის ლიქიორი, სიროფი, ესპრესო; + ცხელი წყალი, მორევა. ნაღები ზემოდან ქაფივით. ვუშვებთ საწრუპის გარეშე.' },
    { group: 'alcohol', cat: 'menu_cocktail', name: 'Matcha Cocktail', sub: 'მატჩას კოქტეილი',
      ingredients: 'მატჩა, ფორთოხლის წვენი (წინასწარ წვრილ საცერში გადაწურული). დანარჩენი მენიუში დაკონკრეტებული არ არის.',
      prep: 'შეიქი; ორმაგი სტრეინერითა და საცერით გადააქვთ ჭიქაში.' },
    { group: 'alcohol', cat: 'menu_cocktail', name: 'The Magnificent Seven', sub: 'კოქტეილი',
      desc: 'მზადდება შეიქით; ინგრედიენტების ზუსტი ჩამონათვალი მენიუში არ არის.',
      prep: 'შეიქის შემდეგ ორმაგი სტრეინერი/საცერი. სერვირება — ფორთოხლის ჩიფსი და პიტნა.' },
    { group: 'alcohol', cat: 'menu_cocktail', name: 'Godfather', sub: 'spirit-forward კოქტეილი',
      ingredients: '35 მლ ნუშის ლიქიორი (ამარეტო) + 35 მლ ვისკი.',
      prep: 'დიდი კოვზით ნელ-ნელა ირევა (არ იშეიქება); ცივის ჭიქაში ყინულის დიდი კუბი; ფორთოხლის კანის სპირალი.' },
    { group: 'alcohol', cat: 'menu_cocktail', name: 'Almond Coffee', sub: 'ესპრესოს კოქტეილი',
      ingredients: '30 მლ არაყი, 20 მლ კალუა, 10 მლ ნუშის ლიქიორი, შავების ესპრესო, 35 მლ ნაღები.',
      prep: 'შეიქი ყინულთან და ესპრესოსთან; უყინულოდ გადააქვთ ცივის ჭიქაში; ბოლოს 35 მლ ნაღები.' },
    { group: 'alcohol', cat: 'menu_cocktail', name: 'Coffee Gin Tonic', sub: 'ესპრესოს კოქტეილი',
      ingredients: 'შავების ესპრესო, 100 მლ ტონიკი, 50 მლ ჯინი, ლიმონის სლაისი.',
      prep: 'ჭიქა ყინულით; ტონიკი, ჯინი, ლიმონი; ბოლოს წინასწარ გამზადებული ესპრესო ყინულზე.' }
  ];

  const GROUPS = [
    { key: 'coffee',  label: '☕ ცხელი ყავები',  sortable: true },
    { key: 'cold',    label: '🧊 ცივი ყავები',   sortable: false },
    { key: 'drink',   label: '🥤 სასმელები',     sortable: false, note: 'ჩაი · მატჩა · ფრეში · ლიმონათი' },
    { key: 'alcohol', label: '🍺 ალკოჰოლი',      sortable: false, note: 'ლუდი · კოქტეილები' }
  ];

  /* Sort options for the coffees group — intensity uses the app's own model
     (DRINKS / BREW). The app has no per-drink bitterness/sweetness data. */
  const SORTS = [
    { key: 'int-desc', label: 'ინტენსიური ↓' },
    { key: 'int-asc',  label: 'ნაკლებად ინტენსიური ↑' }
  ];

  const pm = { sort: 'int-desc' };

  function sortCoffees(list) {
    const arr = [...list];
    if (pm.sort === 'int-asc') arr.sort((a, b) => (a.intensity || 0) - (b.intensity || 0));
    else arr.sort((a, b) => (b.intensity || 0) - (a.intensity || 0)); // int-desc (default)
    return arr;
  }

  function itemBadge(p) {
    if (p.intensity != null) return `<span class="pm-badge mono">ინტენს. ${p.intensity}</span>`;
    if (p.abv) return `<span class="pm-badge mono">${esc(p.abv)}</span>`;
    return '';
  }

  function renderItem(p) {
    const i = PRODUCTS.indexOf(p);
    return `<button class="pm-item" data-i="${i}">
      <div class="pm-item-top"><span class="pm-name" style="border-left:3px solid ${CAT_COLOR[p.cat] || 'var(--crema)'};padding-left:8px">${esc(p.name)}</span>${itemBadge(p)}</div>
      ${p.sub ? `<span class="pm-sub">${esc(p.sub)}</span>` : ''}
      <span class="pm-open">დააჭირე დეტალებისთვის →</span>
    </button>`;
  }

  function renderSortBar() {
    return `<div class="pm-toolbar">
      <span class="pm-sort-label">დახარისხება:</span>
      ${SORTS.map(s => `<button class="chip${s.key === pm.sort ? ' active' : ''}" data-sort="${s.key}">${esc(s.label)}</button>`).join('')}
    </div>`;
  }

  function renderMenu(sec) {
    return sectionHeader(sec) + `
      <div class="note study-hide" style="margin-bottom:18px">სრული მენიუ — დაჯგუფებული პროდუქტები. ყავები შეგიძლია დაახარისხო ინტენსივობით; ნებისმიერ პროდუქტზე დაჭერით გაიხსნება დეტალები.</div>
      ${GROUPS.map(g => {
        let items = PRODUCTS.filter(p => p.group === g.key);
        if (g.key === 'coffee') items = sortCoffees(items);
        return `<div class="pm-group">
          <div class="pm-group-h">${g.label}<span class="pm-count mono">${items.length}</span>${g.note ? `<span class="pm-note mono">${esc(g.note)}</span>` : ''}</div>
          ${g.sortable ? renderSortBar() : ''}
          <div class="pm-grid">${items.map(renderItem).join('')}</div>
        </div>`;
      }).join('')}`;
  }

  function bindMenu() {
    $$('.pm-item').forEach(b => b.onclick = () => openProduct(PRODUCTS[parseInt(b.dataset.i)]));
    $$('.pm-toolbar .chip[data-sort]').forEach(b => b.onclick = () => {
      pm.sort = b.dataset.sort;
      CUSTOM.productmenu(byId('productmenu'));
    });
  }

  CUSTOM.productmenu = function (s) {
    $('#view').innerHTML = renderMenu(s);
    bindMenu();
  };

  /* ---------- product detail (modal) ---------- */
  let escHandler = null;
  function closeModal() {
    const m = document.getElementById('pmModal');
    if (m) m.remove();
    if (escHandler) { document.removeEventListener('keydown', escHandler); escHandler = null; }
  }
  function openProduct(p) {
    if (!p) return;
    closeModal();
    const color = CAT_COLOR[p.cat] || 'var(--crema)';
    const rows = [];
    if (p.ratio)  rows.push(['შეფარდება', p.ratio]);
    if (p.size)   rows.push(['ზომა', p.size]);
    if (p.beans)  rows.push(['მარცვალი', p.beans]);
    if (p.abv)    rows.push(['ალკოჰოლი', p.abv]);
    if (p.vol)    rows.push(['მოცულობა', p.vol]);
    if (p.energy) rows.push(['ენერგია', p.energy]);

    const m = document.createElement('div');
    m.className = 'modal-scrim';
    m.id = 'pmModal';
    m.innerHTML = `<div class="modal" role="dialog" aria-modal="true">
      <button class="modal-close" aria-label="დახურვა">×</button>
      <div class="modal-eyebrow" style="color:${color}"><span class="modal-dot" style="background:${color}"></span>${CAT_LABEL[p.cat] || ''}</div>
      <h2>${esc(p.name)}</h2>
      ${p.sub ? `<div class="modal-sub">${esc(p.sub)}</div>` : ''}
      ${p.intensity != null ? `<div class="meter" style="margin:14px 0"><span class="meter-label">ინტენს.</span><div class="meter-track"><div class="meter-fill" style="width:${Math.min(100, p.intensity)}%"></div></div><span class="meter-label mono">${p.intensity}</span></div>` : ''}
      ${p.desc ? `<div class="modal-row"><span class="ml">აღწერა</span>${esc(p.desc)}</div>` : ''}
      ${rows.map(r => `<div class="modal-row"><span class="ml">${esc(r[0])}</span>${esc(r[1])}</div>`).join('')}
      ${p.prep ? `<div class="modal-row"><span class="ml">მომზადება</span>${esc(p.prep)}</div>` : ''}
      ${p.ingredients ? `<div class="modal-row"><span class="ml">ინგრედიენტები</span>${esc(p.ingredients)}</div>` : ''}
    </div>`;
    document.body.appendChild(m);
    m.querySelector('.modal-close').onclick = closeModal;
    m.onclick = e => { if (e.target === m) closeModal(); };
    escHandler = e => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', escHandler);
  }

  /* =================================================================
     REGISTER the new page (top of the „მენიუ" group)
  ================================================================= */
  const MENU_SECTION = {
    id: 'productmenu', title: 'სრული მენიუ', ico: '📖', cat: 'drinks', group: 'მენიუ', custom: 'productmenu',
    lead: 'ბარის ყველა პროდუქტი — დაჯგუფებული: ცხელი ყავები, ცივი ყავები, სასმელები და ალკოჰოლი.'
  };
  let at = SECTIONS.findIndex(s => s.id === 'menu_hot');
  if (at < 0) at = SECTIONS.findIndex(s => s.id === 'numbers');
  if (at < 0) at = SECTIONS.length;
  SECTIONS.splice(at, 0, MENU_SECTION);

  if (typeof CONTENT !== 'undefined') CONTENT.push(MENU_SECTION);
  if (typeof SEARCH_INDEX !== 'undefined') {
    SEARCH_INDEX.push({
      id: MENU_SECTION.id, title: MENU_SECTION.title, cat: MENU_SECTION.cat,
      text: (MENU_SECTION.title + ' ' + MENU_SECTION.lead + ' ' +
        PRODUCTS.map(p => p.name + ' ' + (p.sub || '') + ' ' + (p.desc || '')).join(' '))
        .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
    });
  }

  if (typeof buildNav === 'function') buildNav();
  if (typeof updateProgressUI === 'function') updateProgressUI();
  if (typeof state !== 'undefined' && state.current === 'dashboard' && CUSTOM.dashboard) CUSTOM.dashboard();

  console.log('product-menu.js · სრული მენიუ: ' + PRODUCTS.length + ' products registered.');
})();
