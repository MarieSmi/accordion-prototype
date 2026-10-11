(() => {
  'use strict';

  // ---------- Данные ----------
  // Контент свёрстан целиком: середина (Главная / скелетон страницы раздела), справа информеры и ЦУ — одинаковые на всех страницах.
  const SKELETON_ROWS = 8;

  // Пункт подменю: [заголовок, уровень (1|2)]
  const sub = (title, level = 1) => ({ title, level });

  // Разделы аккордеона. icon — символ шрифта Accordion-Font.
  // submenu.cols — колонки подменю; submenu.head — своя подпись заголовка подменю (по умолчанию — название раздела).
  // submenu.headLabel — заголовок подменю только подпись (не пункт: не кликается, без ховера, в редакторе его нет).
  // Заголовок подменю ведёт на страницу раздела.
  const SECTIONS = [
    { id: 'contacts', title: 'Контакты', short: 'Контакты', icon: '',
      submenu: { cols: [[sub('Группы'), sub('Каналы'), sub('Новости'), sub('Звонки'), sub('Почта'), sub('Обсуждения'), sub('Обращения'), sub('Заявки')]] } },
    { id: 'tasks', title: 'Задачи', short: 'Задачи', icon: '',
      submenu: { head: 'Задачи на мне', cols: [
        [sub('От меня', 2), sub('На контроле', 2), sub('По сотрудникам', 2), sub('Разобрать', 2),
         sub('Доски'), sub('Проекты'), sub('Планы работ'), sub('Вехи и сроки'), sub('Кайдзен'), sub('Сбор отчетности')],
      ] } },
    { id: 'business', title: 'Бизнес', short: 'Бизнес', icon: '',
      submenu: { cols: [
        [sub('Продажи/CRM'), sub('Документы', 2), sub('Заказы', 2), sub('Клиенты', 2), sub('Активности', 2),
         sub('Розница/Кассы'), sub('Сервис'), sub('Сметы', 2), sub('Справочники', 2), sub('Виды работ', 2),
         sub('Транспорт'), sub('Машины', 2), sub('ЭТрН', 2), sub('Заказы', 2), sub('Штрафы', 2)],
        [sub('Каталог'), sub('Цены', 2), sub('Скидки и акции', 2), sub('Сертификаты', 2), sub('Списки товаров', 2), sub('Конкуренты', 2),
         sub('Маркетплейсы'), sub('Склад'), sub('Документы', 2), sub('Закупки/Расходы'), sub('Поставщики', 2), sub('Планы потребностей', 2), sub('Маркет')],
      ] } },
    { id: 'staff', title: 'Сотрудники', short: 'Сотр-ки', icon: '',
      submenu: { cols: [
        [sub('Проверка'), sub('Штат'), sub('Мотивация'), sub('Схемы', 2), sub('KPI', 2), sub('OKR', 2),
         sub('Кадровый учет'), sub('ГПХ', 2), sub('Заявления', 2), sub('Воинский учет', 2), sub('События', 2),
         sub('Вакансии'), sub('Подписи'), sub('Курсы'), sub('Списки')],
        [sub('Графики работ'), sub('Правила'), sub('Зарплата'), sub('Расчет', 2), sub('Больничные и пособия', 2), sub('Отпуска', 2),
         sub('Табели', 2), sub('Доп. начисления и удержания', 2), sub('Натуральный доход', 2), sub('Выплаты', 2),
         sub('Справки сотрудникам', 2), sub('Расчеты с физлицами', 2), sub('Налоги и отчетность', 2)],
      ] } },
    { id: 'docs', title: 'Документы', short: 'Док-ты', icon: '',
      submenu: { cols: [
        [sub('Входящие'), sub('Договоры'), sub('Факторинг'), sub('ЕГАИС'), sub('Меркурий'), sub('Маркировка'),
         sub('Прослеживаемость'), sub('Приказы / Извещения'), sub('Доверенности'), sub('Разобрать')],
        [sub('Исходящие'), sub('Акты сверки'), sub('Инструкции'), sub('База знаний'), sub('База знаний'), sub('Заметки')],
      ] } },
    { id: 'accounting', title: 'Учет', short: 'Учет', icon: '',
      submenu: { headLabel: true, cols: [
        [sub('Операции и проводки'), sub('Закрытие месяца'), sub('План счетов'), sub('Баланс'), sub('Имущество/НМА'),
         sub('Комиссия'), sub('Распределение затрат')],
        [sub('Налоги'), sub('ЕНС', 2), sub('НДС', 2), sub('Прибыль', 2), sub('УСН', 2), sub('АУСН', 2), sub('ЕСХН', 2),
         sub('Зарплатные', 2), sub('Взносы ИП', 2), sub('НДФЛ ИП', 2), sub('Патент', 2), sub('Имущественные', 2), sub('Прочие', 2)],
      ] } },
    { id: 'reports', title: 'Отчетность', short: 'Отчет-ть', icon: '',
      submenu: { cols: [[sub('Сдано | не сдано'), sub('Что сдавать'), sub('Доверенности'), sub('Аналитика')]] } },
    { id: 'companies', title: 'Компании', short: 'Комп-и', icon: '',
      submenu: { cols: [[sub('Наши контрагенты')]] } },
    { id: 'marketing', title: 'Маркетинг', short: 'Марке-нг', icon: '',
      submenu: { headLabel: true, cols: [
        [sub('Реклама'), sub('Реклама партнёров'), sub('Наши площадки'), sub('Реестр гостевого Wi-Fi'), sub('Сайты'),
         sub('Короткие ссылки'), sub('Посты'), sub('Отзывы'), sub('Аудитории')],
        [sub('Источники продаж'), sub('Коллтрекинг'), sub('Рассылки'), sub('Автообзвоны'), sub('Опросы')],
      ] } },
    { id: 'contact-center', title: 'Контакт-центр', short: 'К-центр', icon: '',
      submenu: { cols: [
        [sub('Чаты'), sub('Линии'), sub('Чат-боты'), sub('Почта компании'), sub('Телефония'), sub('Скрипты'), sub('Интенты')],
        [sub('Обращения'), sub('Список', 2), sub('Клиенты', 2), sub('По видам', 2), sub('Инциденты')],
      ] } },
    { id: 'calendar', title: 'Календарь', short: 'Кален-рь', calendar: true,
      submenu: { cols: [[sub('Ежедневник'), sub('Табель'), sub('Встречи'), sub('Куда уходит время'), sub('Помещения')]] } },
    { id: 'profile', title: 'Сдобников С.В.', short: 'Сдобников', photo: 'assets/img/avatar-sdobnikov.png',
      submenu: { cols: [[sub('Инструкции'), sub('Зарплата'), sub('KPI'), sub('OKR'), sub('Мотивация'), sub('Мои планы'),
        sub('Документы'), sub('Настройки')]] } },
    { id: 'settings', title: 'Настройки', short: 'Настр-ки', icon: '',
      submenu: { cols: [[sub('Наши компании'), sub('Начальные остатки'), sub('Параметры учета'), sub('Кастомизация'),
        sub('Интеграции'), sub('Видеонаблюдение'), sub('KPI')]] } },
  ];

  // Исходный вид разделов — к нему возвращает ↺ в редакторе подменю.
  const PRISTINE = Object.fromEntries(SECTIONS.map((s) => [s.id, {
    title: s.title, short: s.short, icon: null, head: s.submenu.headLabel ? null : s.submenu.head ?? s.title, showHead: true, cols: s.submenu.cols.map((c) => c.slice()),
  }]));

  // Виды узкого аккордеона (окно «Меню» → «Вид панели»).
  const NARROW_VIEWS = [
    { id: 'labels', title: 'С названиями разделов' },
    { id: 'icons', title: 'Без названий' },
    { id: 'panel', title: 'Раскрывается по ховеру' },
  ];

  // Настройки аккордеона — меняются в окне «Меню» и применяются сразу.
  const DEFAULTS = {
    view: 'wide',            // 'wide' — раскрытый | 'narrow' — узкий
    narrowView: 'labels',    // 'labels' | 'icons' | 'panel'
    submenuTrigger: 'click', // 'click' | 'hover'
  };
  const settings = { ...DEFAULTS };
  const COMMANDS_DELAY = 600; // мс до появления ✎ ⋮ на пункте
  const LEAVE_DELAY = 200;    // мс до закрытия подменю после ухода курсора (режим «по наведению»)

  const isNarrow = () => settings.view === 'narrow';
  const isPanel = () => isNarrow() && settings.narrowView === 'panel';
  // Без названий и в панели подменю открывается только по наведению.
  const triggerForced = () => isNarrow() && settings.narrowView !== 'labels';
  const trigger = () => (triggerForced() ? 'hover' : settings.submenuTrigger);

  const state = {
    page: { section: null, item: null }, // section=null → Главная
    openSection: null,
    panelOpen: false, // панель раскрыта по ховеру
    align: 'stretch', // позиционирование контента: 'stretch' | 'center' | 'left'
    informers: true, // «Информеры» в настройках правой панели: выкл — в колонке информеров нет кнопок телефона и чата
  };

  // ---------- DOM ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  const stage = $('#stage');
  const acc = $('#accordion');
  const list = $('#accList');
  const layer = $('#submenuLayer');
  const pageMain = $('#pageMain');
  const pageSkeleton = $('#pageSkeleton');

  // Сцена 1600×900 вписывается в окно браузера с сохранением пропорций.
  let scale = 1;
  function fitStage() {
    const w = document.documentElement.clientWidth;
    const h = document.documentElement.clientHeight;
    scale = Math.min(w / 1600, h / 900);
    stage.style.transform = `translate(${(w - 1600 * scale) / 2}px, ${(h - 900 * scale) / 2}px) scale(${scale})`;
  }
  new ResizeObserver(fitStage).observe(document.documentElement);
  fitStage();

  // Прямоугольник элемента в координатах сцены.
  function stageRect(node) {
    const s = stage.getBoundingClientRect();
    const r = node.getBoundingClientRect();
    return { left: (r.left - s.left) / scale, top: (r.top - s.top) / scale, width: r.width / scale, height: r.height / scale };
  }

  const calendarHTML = () =>
    `<span class="acc-cal"><span class="acc-glyph acc-cal__frame"></span><span class="acc-cal__day">${new Date().getDate()}</span></span>`;

  // Своя иконка раздела, выбранная в редакторе: { font: 'cbuc24' | 'cbuc', ch }.
  const customGlyph = (ic) => `<span class="acc-glyph acc-glyph--${ic.font}">${ic.ch}</span>`;

  function iconHTML(sec) {
    if (sec.customIcon) return `<span class="acc-item__icon">${customGlyph(sec.customIcon)}</span>`;
    if (sec.photo) return `<img class="acc-item__photo" src="${sec.photo}" alt="">`;
    if (sec.calendar) return calendarHTML();
    return `<span class="acc-item__icon"><span class="acc-glyph">${sec.icon}</span></span>`;
  }

  // Иконка в заголовке подменю — как у пункта аккордеона: фото, календарь или символ шрифта.
  function headIconHTML(sec) {
    if (sec.customIcon) return `<span class="sm-head__icon"><span class="acc-item__icon">${customGlyph(sec.customIcon)}</span></span>`;
    if (sec.photo) return `<span class="sm-head__icon sm-head__icon--photo"><img class="sm-head__photo" src="${sec.photo}" alt=""></span>`;
    // Символ — в той же рамке, что в пункте аккордеона, чтобы иконка не сдвигалась при открытии подменю.
    return `<span class="sm-head__icon">${sec.calendar ? calendarHTML() : `<span class="acc-item__icon"><span class="acc-glyph">${sec.icon}</span></span>`}</span>`;
  }

  // ---------- Аккордеон ----------
  function renderAccordion() {
    list.innerHTML = '';
    for (const sec of SECTIONS) {
      const li = el('li', 'acc-item');
      li.dataset.id = sec.id;
      const btn = el('button', 'acc-item__btn' + (sec.photo ? ' acc-item__btn--photo' : ''),
        `${iconHTML(sec)}<span class="acc-item__title">${sec.title}</span>
         <span class="acc-item__short">${sec.short}</span>
         <span class="acc-cmds">
           <span class="acc-cmd" role="button" aria-label="Настроить"><span class="ico"></span></span>
           <span class="acc-cmd acc-cmd--dots" role="button" aria-label="Ещё"><span class="ico"></span></span>
         </span>`);
      btn.type = 'button';
      // Вторая строка — выбранный пункт подменю (видна только в раскрытом аккордеоне).
      const subRow = el('button', 'acc-item__sub', '<span class="acc-item__sub-title"></span>');
      subRow.type = 'button';
      subRow.addEventListener('click', () => btn.click());
      li.append(btn, subRow);
      list.append(li);

      let timer = null;
      li.addEventListener('mouseenter', () => {
        li.classList.add('is-hover');
        timer = setTimeout(() => li.classList.add('is-delay'), COMMANDS_DELAY);
        if (trigger() === 'hover') {
          if (sec.submenu) { if (state.openSection !== sec.id) openSubmenu(sec.id); }
          else closeSubmenu();
        }
      });
      li.addEventListener('mouseleave', () => {
        clearTimeout(timer);
        li.classList.remove('is-hover', 'is-delay');
      });
      btn.addEventListener('click', (e) => {
        // ✎ открывает редактор подменю; ⋮ — поведение по клику пока не задано.
        const cmd = e.target.closest('.acc-cmd');
        if (cmd) { if (!cmd.classList.contains('acc-cmd--dots')) openEditor(sec.id); return; }
        // Подменю для раздела ещё не нарисовано — переходим сразу на страницу раздела.
        if (!sec.submenu) { navigate(sec.id, null); return; }
        if (state.openSection === sec.id) { if (trigger() === 'click') closeSubmenu(); }
        else openSubmenu(sec.id);
      });
    }
    syncAccordion();
  }

  // Пункт подменю по ключу «колонка:строка».
  function subItem(sec, key) {
    const [ci, ii] = key.split(':').map(Number);
    return sec.submenu.cols[ci][ii];
  }
  const subTitle = (sec, key) => subItem(sec, key).title;

  function syncAccordion() {
    const { section, item } = state.page;
    for (const li of list.children) {
      const selected = li.dataset.id === section;
      li.classList.toggle('is-selected', selected);
      li.classList.toggle('is-open', li.dataset.id === state.openSection);
      const hasSub = selected && item != null;
      li.classList.toggle('has-sub', hasSub);
      if (hasSub) $('.acc-item__sub-title', li).textContent = subTitle(SECTIONS.find((s) => s.id === section), item);
    }
  }

  // Вид аккордеона по настройкам: раскрытый, узкий (с названиями / без), панель (свёрнута / раскрыта).
  // Сворачивание / разворачивание: ширина аккордеона и середины контента меняется плавно (CSS, .stage.is-resizing).
  // При сворачивании аккордеон до конца анимации остаётся раскрытым (обрезается по ширине), затем становится узким.
  const RESIZE_MS = 300;
  let resizeTimer = null;
  let shownNarrow = null; // вид аккордеона, применённый к сцене
  function applyView() {
    const narrow = isNarrow();
    if (shownNarrow !== null && narrow !== shownNarrow) {
      clearTimeout(resizeTimer);
      stage.classList.add('is-resizing');
      stage.classList.toggle('is-narrow', narrow);
      shownNarrow = narrow;
      resizeTimer = setTimeout(() => { stage.classList.remove('is-resizing'); applyAccView(); }, RESIZE_MS);
      if (narrow) return; // узкий вид — в конце анимации
    }
    shownNarrow = narrow;
    stage.classList.toggle('is-narrow', narrow);
    applyAccView();
  }

  function applyAccView() {
    const narrow = isNarrow();
    const panel = isPanel();
    if (!panel) state.panelOpen = false;
    acc.classList.toggle('is-narrow', narrow);
    acc.classList.toggle('is-panel', panel);
    acc.classList.toggle('is-panel-open', panel && state.panelOpen);
    acc.classList.toggle('is-compact', narrow && !(panel && state.panelOpen));
    acc.classList.toggle('is-labels', narrow && settings.narrowView === 'labels');
    $('#accBurger').setAttribute('aria-label', narrow ? 'Развернуть меню' : 'Свернуть меню');
  }

  function setPanelOpen(open) {
    if (!isPanel() || state.panelOpen === open) return;
    state.panelOpen = open;
    applyView();
  }

  // ---------- Уход курсора (режим «по наведению») ----------
  let leaveTimer = null;
  const cancelLeave = () => clearTimeout(leaveTimer);
  function scheduleLeave() {
    if (trigger() !== 'hover') return;
    cancelLeave();
    leaveTimer = setTimeout(() => { closeSubmenu(); setPanelOpen(false); }, LEAVE_DELAY);
  }

  acc.addEventListener('mouseenter', () => { cancelLeave(); setPanelOpen(true); });
  acc.addEventListener('mouseleave', scheduleLeave);

  // ---------- Подменю ----------
  function openSubmenu(id) {
    const sec = SECTIONS.find((s) => s.id === id);
    closeSubmenu();
    if (!sec || !sec.submenu) return;
    closeRp();
    state.openSection = id;

    // Вид подменю: по клику у раскрытого аккордеона — поверх пункта, с иконкой раздела;
    // по наведению и у узкого — справа от аккордеона, с жирным заголовком; у панели — справа, без заголовка.
    const kind = isPanel() ? 'panel' : (isNarrow() || trigger() === 'hover') ? 'narrow' : 'wide';
    const multi = sec.submenu.cols.length > 1;
    const box = el('div', `submenu submenu--${kind}` + (multi ? ' submenu--multi' : ''));
    const panel = el('div', 'submenu__panel');

    // Заголовок подменю ведёт на страницу раздела; у headLabel — только подпись. Удалённого в редакторе (noHead) нет.
    if (kind !== 'panel' && !sec.submenu.noHead) {
      const head = el('div', 'submenu__head');
      const headTitle = sec.submenu.head || sec.title;
      const label = sec.submenu.headLabel;
      const headBtn = el(label ? 'div' : 'button', 'sm-head', kind === 'wide'
        ? `${headIconHTML(sec)}<span class="sm-head__title">${headTitle}</span>`
        : `<span class="sm-head__title">${headTitle}</span>`);
      if (!label) {
        headBtn.type = 'button';
        headBtn.addEventListener('click', () => navigate(sec.id, null));
      }
      head.append(headBtn);
      panel.append(head);
    }

    const cols = el('div', 'submenu__cols');
    sec.submenu.cols.forEach((col, ci) => {
      const c = el('div', 'submenu__col');
      col.forEach((it, ii) => {
        const key = `${ci}:${ii}`;
        const b = el('button', 'sm-item' + (it.level === 2 ? ' sm-item--sub' : ''), it.title);
        b.type = 'button';
        if (state.page.section === sec.id && state.page.item === key) b.classList.add('is-current');
        b.addEventListener('click', () => navigate(sec.id, key));
        c.append(b);
      });
      cols.append(c);
    });
    panel.append(cols);
    box.append(panel);

    // Плавающие кнопки: ✎ — у всех подменю; ✕ — только когда подменю открыто по клику (по наведению оно закрывается само).
    const float = el('div', 'submenu__float');
    if (trigger() === 'click') {
      const close = el('button', 'float-btn', `<img src="assets/img/close-menu.svg" width="12" height="12" alt="">`);
      close.type = 'button';
      close.setAttribute('aria-label', 'Закрыть');
      close.addEventListener('click', closeSubmenu);
      float.append(close);
    }
    const edit = el('button', 'float-btn', '<span class="ico"></span>');
    edit.type = 'button';
    edit.setAttribute('aria-label', 'Редактировать подменю');
    edit.addEventListener('click', () => openEditor(sec.id));
    float.append(edit);
    box.append(float);

    layer.append(box);

    // Заголовок многоколоночного подменю — по ширине первой колонки (колонки шириной по самому длинному пункту).
    const headBtn = $('.sm-head', box);
    if (multi && headBtn) {
      const col = $('.submenu__col', box);
      headBtn.style.width = (col.offsetLeft + col.offsetWidth - headBtn.offsetLeft) + 'px';
    }

    // Позиция: поверх пункта (иконка заголовка совпадает с иконкой пункта)
    // или справа от аккордеона, вровень с пунктом.
    const li = list.querySelector(`[data-id="${id}"]`);
    const top = acc.offsetTop + li.offsetTop; // li позиционируется относительно .accordion
    box.style.left = (kind === 'wide' ? acc.offsetLeft + 4 : acc.offsetLeft + acc.offsetWidth + 4) + 'px';
    box.style.top = Math.min(top, 900 - box.offsetHeight) + 'px';

    box.addEventListener('mouseenter', cancelLeave);
    box.addEventListener('mouseleave', scheduleLeave);
    syncAccordion();
  }

  function closeSubmenu() {
    layer.innerHTML = '';
    state.openSection = null;
    syncAccordion();
  }

  // ---------- Позиционирование контента (переключатель в шапке) ----------
  // «Растянуть» — контент на всю рабочую область; «По центру» / «Слева» — блок 1238
  // (аккордеон + контент + информеры + ЦУ) по центру области 1538 или у её левого края.
  // Плавно меняются ширина середины и центровка (CSS, --mid / --center): середина перестраивается
  // по ширине, аккордеон и ЦУ идут за её краями.
  const ALIGN_MS = 300; // как transition у .stage.is-aligning
  const alignBtns = [...document.querySelectorAll('#alignGroup .tb-btn')];
  let alignTimer = null;
  function setAlign(align) {
    if (align === state.align) return;
    state.align = align;
    clearTimeout(alignTimer);
    stage.classList.add('is-aligning');
    stage.classList.toggle('is-aligned', align !== 'stretch');
    // Центровку не снимаем при «Растянуть»: сдвиг сам уходит в 0, пока середина расширяется.
    if (align !== 'stretch') stage.classList.toggle('is-align-center', align === 'center');
    for (const b of alignBtns) {
      const on = b.dataset.align === align;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-checked', on);
    }
    closeSubmenu();
    alignTimer = setTimeout(() => stage.classList.remove('is-aligning'), ALIGN_MS);
  }
  for (const b of alignBtns) b.addEventListener('click', () => setAlign(b.dataset.align));

  // ---------- Навигация ----------
  // Главная или скелетон страницы раздела (один на все разделы).
  function updatePage() {
    const page = state.page.section ? 'skeleton' : 'main';
    pageMain.hidden = page !== 'main';
    pageSkeleton.hidden = page !== 'skeleton';
  }
  // Строки-заглушки реестра в скелетоне
  $('#skList').innerHTML = '<div class="sk-row"><div class="sk-row__pic"></div><div class="sk-row__body"><div class="sk-row__lines"></div><div class="sk-row__tag"></div></div></div>'.repeat(SKELETON_ROWS);

  function navigate(section, item) {
    state.page = { section, item };
    if (section) leaveTabs();
    updatePage();
    closeSubmenu();
    setPanelOpen(false);
  }

  // На «Главную» ведёт клик по строке шапки, кроме птички (открывает окно «Логотип») и «+».
  // В узком аккордеоне (любой вид) птичка не кнопка: клик по ней, как и по всей шапке, ведёт на «Главную».
  $('.acc-header__row').addEventListener('click', (e) => {
    if (e.target.closest(isNarrow() ? '.acc-plus' : '.acc-plus, .acc-bird')) return;
    navigate(null, null);
  });

  // Клик вне подменю и аккордеона закрывает подменю.
  stage.addEventListener('mousedown', (e) => {
    if (!state.openSection) return;
    if (e.target.closest('.submenu') || e.target.closest('.acc-item')) return;
    closeSubmenu();
  });

  // ---------- Окна настроек (общее) ----------
  // Открыто всегда только одно окно. Окно открывается поверх вызвавшей кнопки (левый край — по кнопке,
  // верх — по верху шапки, как в макете) и перетаскивается за шапку в пределах сцены.
  const windows = {}; // имя → { win, btn, onOpen, onClose }
  let openWin = null;

  function registerWindow(name, { win, btn, onOpen = () => {}, onClose = () => {} }) {
    windows[name] = { win, btn, onOpen, onClose };
    btn.addEventListener('click', () => setWindow(openWin === name && !openFrom ? null : name));
    win.querySelector('.sw-done').addEventListener('click', () => setWindow(null));
    win.querySelector('.sw-close').addEventListener('click', () => setWindow(null));
    win.querySelector('.set-win__head').addEventListener('mousedown', (e) => startDrag(e, win));
  }

  // from — элемент, из которого открыто окно (по умолчанию его кнопка в шапке конструктора).
  // Из шапки: левый край по кнопке, верх по верху шапки, кнопка подсвечена. Из аккордеона (птичка): окно
  // встаёт углом на угол шапки аккордеона (отступы 12 и 7 от птички), кнопка в шапке не подсвечена.
  let openFrom = null;
  function setWindow(name, from = null) {
    if (name) { closeRp(); closeThemePanel(); }
    if (openWin) {
      const w = windows[openWin];
      w.win.hidden = true;
      w.btn.classList.remove('is-active');
      w.onClose();
    }
    openWin = name;
    openFrom = from;
    if (!name) return;
    const w = windows[name];
    w.win.hidden = false;
    if (from) {
      const r = stageRect(from);
      w.win.style.left = Math.round(Math.max(0, r.left - 12)) + 'px';
      w.win.style.top = Math.round(Math.max(0, r.top - 7)) + 'px';
    } else {
      w.btn.classList.add('is-active');
      // 1 — внутренний отступ группы кнопок: окно встаёт по её краю, как в макете (Меню — 8px, Логотип — 86px).
      w.win.style.left = Math.round(stageRect(w.btn).left - 1) + 'px';
      w.win.style.top = '0px';
    }
    w.onOpen();
  }

  function startDrag(e, win) {
    if (e.button !== 0 || e.target.closest('button, .sme-title, .sme-icon')) return;
    e.preventDefault();
    closePopups();
    const startX = e.clientX, startY = e.clientY;
    const left0 = win.offsetLeft, top0 = win.offsetTop;
    const move = (ev) => {
      const left = left0 + (ev.clientX - startX) / scale;
      const top = top0 + (ev.clientY - startY) / scale;
      win.style.left = Math.max(0, Math.min(1600 - win.offsetWidth, left)) + 'px';
      win.style.top = Math.max(0, Math.min(900 - win.offsetHeight, top)) + 'px';
    };
    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      win.classList.remove('is-dragging');
    };
    win.classList.add('is-dragging');
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  // Всплывающие списки внутри окон («Вид панели», «Иконка»).
  function closePopups() { closeDropdown(); closeIconMenu(); closeTabMenus(); }

  // ---------- Окно «Меню» ----------
  const menuWin = $('#menuWin');
  const resetBtn = $('#mwReset');
  const narrowRow = $('#mwNarrowRow');
  const narrowLink = $('#mwNarrowLink');
  const dropdown = $('#mwMenu');
  const dropdownList = $('#mwMenuList');

  function renderWin() {
    for (const t of menuWin.querySelectorAll('.mw-tile')) t.classList.toggle('is-active', t.dataset.view === settings.view);
    narrowRow.hidden = !isNarrow();
    narrowLink.textContent = NARROW_VIEWS.find((v) => v.id === settings.narrowView).title;
    const forced = triggerForced();
    for (const r of menuWin.querySelectorAll('.mw-radio')) {
      const value = r.dataset.trigger;
      r.classList.toggle('is-on', value === trigger());
      r.classList.toggle('is-forced', forced && value === 'hover');
      r.disabled = forced && value === 'click';
    }
    resetBtn.disabled = Object.keys(DEFAULTS).every((k) => settings[k] === DEFAULTS[k]);
  }

  // Любое изменение в окне применяется к аккордеону сразу.
  function update(patch) {
    Object.assign(settings, patch);
    closeSubmenu();
    applyView();
    renderWin();
  }

  registerWindow('menu', { win: menuWin, btn: $('#menuBtn'), onOpen: renderWin, onClose: closeDropdown });
  resetBtn.addEventListener('click', () => update(DEFAULTS));
  for (const t of menuWin.querySelectorAll('.mw-tile')) t.addEventListener('click', () => update({ view: t.dataset.view }));
  for (const r of menuWin.querySelectorAll('.mw-radio')) r.addEventListener('click', () => update({ submenuTrigger: r.dataset.trigger }));
  // Бургер в шапке аккордеона сворачивает / разворачивает меню — как плитки в окне «Меню».
  $('#accBurger').addEventListener('click', () => update({ view: isNarrow() ? 'wide' : 'narrow' }));
  // Значки ховера загружаем заранее, иначе при первом наведении круг на миг пустой.
  for (const n of ['collapse', 'expand']) new Image().src = `assets/img/burger-${n}.svg`;

  // Выпадающий список «Вид панели»: всегда открывается на одном месте — первый пункт встаёт на место ссылки.
  function openDropdown() {
    dropdownList.innerHTML = '';
    NARROW_VIEWS.forEach((v) => {
      const b = el('button', 'mw-menu__item' + (v.id === settings.narrowView ? ' is-on' : ''),
        `<span class="mw-menu__dot"></span><span class="mw-menu__text">${v.title}</span>`);
      b.type = 'button';
      b.addEventListener('click', () => { closeDropdown(); update({ narrowView: v.id }); });
      dropdownList.append(b);
    });
    dropdown.hidden = false;
    const r = stageRect(narrowLink);
    // 30 = отступ списка 8 + отступ пункта 8 + маркер 12 + 2; 12 — верхний отступ списка, 16 — половина пункта.
    dropdown.style.left = (r.left - 30) + 'px';
    dropdown.style.top = (r.top + r.height / 2 - 12 - 16) + 'px';
  }
  function closeDropdown() { dropdown.hidden = true; }

  narrowLink.addEventListener('click', () => (dropdown.hidden ? openDropdown() : closeDropdown()));
  $('#mwMenuClose').addEventListener('click', closeDropdown);
  stage.addEventListener('mousedown', (e) => {
    if (dropdown.hidden || e.target.closest('#mwMenu') || e.target === narrowLink) return;
    closeDropdown();
  });

  // ---------- Окно «Логотип» ----------
  // Логотип — иконка вместо птички в шапке аккордеона. «Загрузка» подставляет случайную иконку из набора.
  const LOGOS = ['leaf', 'sun', 'drop', 'hex', 'star'].map((n) => `assets/img/logos/${n}.svg`);
  const logoWin = $('#logoWin');
  const logoReset = $('#lwReset');
  const iconMenu = $('#iconMenu');
  let logo = null; // null — стандартная птичка

  const logoHTML = () => (logo ? `<img class="logo-img" src="${logo}" width="24" height="24" alt="">` : '<span class="ico24"></span>');

  // Логотип применяется сразу: в шапке аккордеона и в превью окна.
  function renderLogo() {
    $('.acc-bird').innerHTML = logoHTML();
    $('#lwBird .lw-bird__logo').innerHTML = logoHTML();
    logoReset.disabled = logo === null;
  }

  function setLogo(src) { logo = src; renderLogo(); }

  // Меню «Иконка»: открывается так, что скрепка в его заголовке встаёт на место нажатой кнопки.
  function openIconMenu(trigger) {
    iconMenu.hidden = false;
    const r = stageRect(trigger);
    // 20 — отступ заголовка слева, 12 — половина иконки 24; 8 — верхний отступ меню, 14 — половина строки заголовка.
    iconMenu.style.left = Math.round(r.left + r.width / 2 - 20 - 12) + 'px';
    iconMenu.style.top = Math.round(r.top + r.height / 2 - 8 - 14) + 'px';
  }
  function closeIconMenu() { iconMenu.hidden = true; }

  registerWindow('logo', { win: logoWin, btn: $('#logoBtn'), onOpen: renderLogo, onClose: closeIconMenu });
  // Птичка в шапке аккордеона открывает то же окно, что кнопка «Логотип» в шапке конструктора.
  $('.acc-bird').addEventListener('click', (e) => isNarrow() || setWindow(openWin === 'logo' && openFrom ? null : 'logo', e.currentTarget));
  logoReset.addEventListener('click', () => setLogo(null));
  $('#lwBird').addEventListener('click', (e) => openIconMenu(e.currentTarget));
  $('#iconMenuClose').addEventListener('click', closeIconMenu);
  for (const item of iconMenu.querySelectorAll('.icon-menu__item')) {
    item.addEventListener('click', () => {
      const choices = LOGOS.filter((src) => src !== logo);
      setLogo(choices[Math.floor(Math.random() * choices.length)]);
      closeIconMenu();
    });
  }
  stage.addEventListener('mousedown', (e) => {
    if (iconMenu.hidden || e.target.closest('#iconMenu') || e.target.closest('#lwBird')) return;
    closeIconMenu();
  });

  // ---------- Окна правой панели ----------
  // Клик по иконке открывает её окно слева от колонки, повторный — закрывает; открыто одно окно.
  // Закрывают также клик мимо окна, Esc, открытие окна настроек, подменю или редактора.
  // Верх окна — по верху иконки, высота — по содержимому; data-fit="full" («Магазин») — до низа панели.
  let rpOpen = null;
  const rpBtn = (name) => $(`.rp-btn[data-rp="${name}"]`);

  function openRp(name) {
    const win = $('#rp-' + name);
    closeRp();
    if (!win) return;
    setWindow(null);
    closeSubmenu();
    rpOpen = name;
    const btn = rpBtn(name);
    btn.classList.add('is-active');
    win.hidden = false;
    win.style.top = Math.round(stageRect(btn).top) + 'px';
    win.style.bottom = win.dataset.fit === 'full' ? '8px' : '';
  }

  function closeRp() {
    if (!rpOpen) return;
    closeRpMenu();
    $('#rp-' + rpOpen).hidden = true;
    rpBtn(rpOpen).classList.remove('is-active');
    rpOpen = null;
  }

  for (const b of document.querySelectorAll('.rp-btn[data-rp]')) {
    b.addEventListener('click', () => (rpOpen === b.dataset.rp ? closeRp() : openRp(b.dataset.rp)));
  }
  stage.addEventListener('mousedown', (e) => {
    if (!rpMenu.hidden && !e.target.closest('#rpMenu, .rp-link')) closeRpMenu();
    if (rpOpen && !e.target.closest('.rp-win, .rp-btn[data-rp], #rpMenu')) closeRp();
  });
  // Esc сначала закрывает выпадающий список, потом окно.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!rpMenu.hidden) closeRpMenu();
    else closeRp();
  });

  // «Магазин»: список категорий (статика с ховером). open — раскрытый раздел, closed — свёрнутый, child — подраздел.
  const SHOP_CATS = [
    ['Все', 240, 'selected'], ['Секции', 4], ['Навигация', 1], ['Продажи', 32, 'open'],
    ['Каталог и цены', 7, 'child'], ['Розница', 10, 'child'], ['Presto', 2, 'child'], ['Saby Clients', 1, 'child'], ['Документы продаж', 6, 'child'],
    ['Отчетность', 7, 'closed'], ['Базовые возможности', 9, 'closed'], ['Документооборот', 5, 'closed'], ['Управление персоналом', 26, 'closed'],
    ['Бухгалтерия и зарплата', 40, 'closed'], ['Деньги', 5], ['Торги', 13], ['Компании', 9], ['Маркетинг', 6],
    ['CRM и контакт центр', 32, 'closed'], ['Задачи и проекты', 6], ['Корпоративная соцсеть', 21, 'closed'], ['Видеонаблюдение', 1],
    ['Управление транспортом', 6], ['Сайт', 21, 'closed'],
  ];
  const ARROWS = { open: '&#xE9AA;', closed: '&#xE9C2;' };
  $('#rpCats').innerHTML = SHOP_CATS.map(([name, count, kind]) =>
    `<div class="rp-cat${kind === 'child' ? ' rp-cat--child' : ''}${kind === 'selected' ? ' is-selected' : ''}">` +
    `<span class="ico rp-cat__arrow">${ARROWS[kind] ?? ''}</span><span class="rp-cat__name">${name}</span><span class="rp-cat__count">${count}</span></div>`).join('');

  // Карточки на картинке превью (координаты из макета 16041:48565): [x, y, ширина, высота, большая — с «+»].
  const SHOP_WIDGETS = [
    [12, 35, 75.5, 32], [95.5, 35, 75.5, 32], [179, 35, 75.5, 32], [262.5, 35, 75.5, 32], // секции
    [12, 108, 326, 52, true], // вкладки
    [12, 247, 326, 50, true], [12, 372, 326, 202, true], [12, 634, 326, 50, true], // наценка, номенклатура, остаток
    [12, 759, 326, 202, true], // отчеты
  ];
  $('#rpShopPv').insertAdjacentHTML('beforeend', SHOP_WIDGETS.map(([x, y, w, h, big]) =>
    `<div class="rp-wz" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${big ? '<span class="ico24 rp-wz__plus">&#xEAE9;</span>' : ''}</div>`).join(''));

  // «Настройки»: переключатель «Информеры» и выпадающие списки «На странице / В окне».
  // Выключенные «Информеры» прячут кнопки телефона и чата в колонке информеров (styles.css, .no-informers).
  const informers = $('#rpInformers');
  informers.addEventListener('click', () => {
    const on = !informers.classList.contains('is-on');
    informers.classList.toggle('is-on', on);
    informers.setAttribute('aria-checked', on);
    state.informers = on;
    stage.classList.toggle('no-informers', !on);
  });

  const rpMenu = $('#rpMenu');
  const rpMenuList = $('#rpMenuList');
  const NOTICE_MODES = ['На странице', 'В окне'];
  let rpMenuLink = null;

  // Как «Вид панели» в окне «Меню»: выбранный пункт встаёт на место ссылки.
  function openRpMenu(link) {
    rpMenuLink = link;
    rpMenuList.innerHTML = '';
    NOTICE_MODES.forEach((title, i) => {
      const b = el('button', 'mw-menu__item' + (title === link.textContent ? ' is-on' : ''),
        `<span class="mw-menu__dot"></span><span class="mw-menu__text">${title}</span>`);
      b.type = 'button';
      b.addEventListener('click', () => { link.textContent = title; closeRpMenu(); });
      rpMenuList.append(b);
    });
    rpMenu.hidden = false;
    const r = stageRect(link);
    const at = Math.max(0, NOTICE_MODES.indexOf(link.textContent));
    rpMenu.style.left = (r.left - 30) + 'px';
    rpMenu.style.top = (r.top + r.height / 2 - 12 - 16 - at * 38) + 'px';
  }
  function closeRpMenu() { rpMenu.hidden = true; rpMenuLink = null; }

  for (const link of document.querySelectorAll('#rp-settings .rp-link')) {
    link.addEventListener('click', () => (rpMenuLink === link ? closeRpMenu() : openRpMenu(link)));
  }
  $('#rpMenuClose').addEventListener('click', closeRpMenu);

  // ---------- Редактор подменю ----------
  // ✎ (команда пункта или плавающая кнопка подменю) закрывает подменю и открывает окно редактора:
  // пункты подменю — виджеты, заголовок подменю — первый виджет. Иконка в шапке окна встаёт на иконку пункта.
  // Изменения копятся в черновике (с отменой / повтором) и применяются по ✓; ✕ при изменениях спрашивает.
  const editor = $('#smEditor');
  const shield = $('#smeShield');
  const smeTitle = $('#smeTitle');
  const smeCard = $('#smeCard');
  const smeConfirm = $('#smeConfirm');
  const smeIcon = $('#smeIcon');
  const smeUndo = $('#smeUndo'), smeRedo = $('#smeRedo'), smeReset = $('#smeReset');

  // ed: { sec, draft, hist, at, selected: 'head' | 'ci:ii' | null }
  // draft: { title — название раздела, icon — своя иконка (null — исходная), head — заголовок подменю (отдельная сущность; null у headLabel), showHead, cols }
  let ed = null;

  const cloneDraft = (d) => ({ ...d, cols: d.cols.map((c) => c.slice()) });
  const draftKey = (d) => JSON.stringify([d.title, d.icon, d.head, d.showHead, d.cols]);

  function editorIconHTML(sec, icon) {
    if (icon) return customGlyph(icon);
    if (sec.photo) return `<img src="${sec.photo}" alt="">`;
    if (sec.calendar) return calendarHTML();
    return `<span class="acc-glyph">${sec.icon}</span>`;
  }

  function openEditor(id) {
    const sec = SECTIONS.find((s) => s.id === id);
    closeSubmenu();
    setWindow(null);
    closeRp();
    cancelLeave();
    setPanelOpen(false);
    const draft = {
      title: sec.title, icon: sec.customIcon ?? null, head: sec.submenu.headLabel ? null : sec.submenu.head ?? sec.title, showHead: !sec.submenu.noHead,
      cols: sec.submenu.cols.map((c) => c.slice()),
    };
    ed = { sec, draft, hist: [cloneDraft(draft)], at: 0, selected: null };
    smeConfirm.hidden = true;
    renderEditor();
    shield.hidden = false;
    editor.hidden = false;

    // Иконка шапки окна (центр: 10 + 14 слева, 7 + 16 сверху) — ровно на иконку пункта аккордеона.
    const li = list.querySelector(`[data-id="${id}"]`);
    const r = stageRect($('.acc-item__icon, .acc-cal, .acc-item__photo', li));
    const left = r.left + r.width / 2 - 24;
    const top = r.top + r.height / 2 - 23;
    editor.style.left = Math.round(left) + 'px';
    // Не помещается до низа сцены — поднимаем (иконка сдвигается, как у нижних подменю).
    editor.style.top = Math.round(Math.max(0, Math.min(top, 900 - editor.offsetHeight))) + 'px';
  }

  function closeEditor() {
    stopTitleEdit(false);
    closeIconPick();
    closePlusMenu();
    smeConfirm.hidden = true;
    editor.hidden = true;
    shield.hidden = true;
    ed = null;
  }

  // Плавающий тулбар выделенного виджета (Figma rHabzni5OI5D4fxBLQdj2m 131:17364, состав 854:7145): ‹, ⚙, удалить, ⋯.
  // ‹ снимает выделение, удаление работает, ⚙ и ⋯ — пока только наведение.
  function toolbar() {
    const tb = el('div', 'sme-tb');
    const btn = (cls, ch, label) => {
      const b = el('button', 'sme-tb__btn' + (cls ? ' ' + cls : ''), `<span class="ico24">${ch}</span>`);
      b.type = 'button';
      b.setAttribute('aria-label', label);
      tb.append(b);
      return b;
    };
    btn('', '', 'Назад').addEventListener('click', () => select(null));
    btn('', '', 'Настройки');
    btn('sme-tb__btn--del', '', 'Удалить').addEventListener('click', deleteSelected);
    btn('', '', 'Ещё');
    return tb;
  }

  function renderEditor() {
    const { draft, selected } = ed;
    if (!smeTitle.classList.contains('is-editing')) smeTitle.textContent = draft.title;
    smeIcon.innerHTML = editorIconHTML(ed.sec, draft.icon);
    smeCard.innerHTML = '';
    smeCard.classList.toggle('is-multi', draft.cols.length > 1);
    const mk = (side) => el('span', `sme-mk sme-mk--${side}`);
    const widget = (key, title, sub) => {
      const w = el('div', 'sme-w' + (sub ? ' sme-w--sub' : '') + (key === selected ? ' is-selected' : ''));
      w.dataset.key = key;
      w.append(document.createTextNode(title), mk('top'), mk('bottom'));
      if (key === selected) w.append(toolbar());
      return w;
    };
    draft.cols.forEach((col, ci) => {
      const l = el('div', 'sme-list');
      if (ci === 0 && draft.head != null && draft.showHead) l.append(widget('head', draft.head, false));
      col.forEach((it, ii) => l.append(widget(`${ci}:${ii}`, it.title, it.level === 2)));
      l.append(mk('top'), mk('bottom'), mk('left'), mk('right'));
      l.classList.toggle('has-selected', !!l.querySelector('.sme-w.is-selected'));
      smeCard.append(l);
    });
    smeUndo.disabled = ed.at === 0;
    smeRedo.disabled = ed.at === ed.hist.length - 1;
    smeReset.disabled = draftKey(draft) === draftKey(PRISTINE[ed.sec.id]);
  }

  // Изменение черновика — новый шаг истории (шаги «вперёд» отбрасываются).
  function commit(draft) {
    if (draftKey(draft) === draftKey(ed.draft)) return;
    ed.hist = ed.hist.slice(0, ed.at + 1);
    ed.hist.push(cloneDraft(draft));
    ed.at = ed.hist.length - 1;
    ed.draft = draft;
    ed.selected = null;
    renderEditor();
  }

  function goHistory(step) {
    const at = ed.at + step;
    if (at < 0 || at >= ed.hist.length) return;
    ed.at = at;
    ed.draft = cloneDraft(ed.hist[at]);
    ed.selected = null;
    renderEditor();
  }

  function select(key) {
    if (!ed || ed.selected === key) return;
    ed.selected = key;
    renderEditor();
  }

  function deleteSelected() {
    const key = ed.selected;
    if (!key) return;
    const draft = cloneDraft(ed.draft);
    if (key === 'head') draft.showHead = false;
    else {
      const [ci, ii] = key.split(':').map(Number);
      draft.cols[ci].splice(ii, 1);
    }
    commit(draft);
  }

  // Применение черновика: аккордеон и подменю раздела перерисовываются с новым названием и списком.
  function saveEditor() {
    const { sec, draft } = ed;
    const pristine = PRISTINE[sec.id];
    // Открытый пункт подменю ищем по самому пункту — после удалений ключ «колонка:строка» мог сдвинуться.
    const current = state.page.section === sec.id && state.page.item != null ? subItem(sec, state.page.item) : null;
    sec.title = draft.title;
    sec.customIcon = draft.icon;
    sec.short = draft.title === pristine.title ? pristine.short : draft.title;
    if (draft.head != null) { sec.submenu.head = draft.head; sec.submenu.noHead = !draft.showHead; }
    sec.submenu.cols = draft.cols.map((c) => c.slice());
    if (current) {
      let key = null;
      sec.submenu.cols.forEach((c, ci) => { const ii = c.indexOf(current); if (ii >= 0 && key == null) key = `${ci}:${ii}`; });
      state.page.item = key;
    }
    closeEditor();
    renderAccordion();
  }

  // Название раздела: клик — правка на месте; Enter или уход фокуса — применить, Esc — отменить.
  // Каретка встаёт туда, куда кликнули (мимо текста — в конец), текст не выделяется.
  function startTitleEdit(e) {
    if (smeTitle.classList.contains('is-editing')) return;
    ed.selected = null;
    renderEditor();
    smeTitle.classList.add('is-editing');
    smeTitle.contentEditable = 'plaintext-only';
    smeTitle.focus();
    let range = document.caretRangeFromPoint?.(e.clientX, e.clientY);
    if (!range || !smeTitle.contains(range.startContainer)) {
      range = document.createRange();
      range.selectNodeContents(smeTitle);
      range.collapse(false);
    }
    const s = getSelection();
    s.removeAllRanges();
    s.addRange(range);
  }

  function stopTitleEdit(apply) {
    if (!smeTitle.classList.contains('is-editing')) return;
    smeTitle.classList.remove('is-editing');
    smeTitle.contentEditable = 'false';
    smeTitle.scrollLeft = 0;
    const value = smeTitle.textContent.replace(/\s+/g, ' ').trim();
    if (ed && apply && value) commit({ ...cloneDraft(ed.draft), title: value });
    if (ed) smeTitle.textContent = ed.draft.title;
  }

  smeTitle.addEventListener('click', startTitleEdit);
  smeTitle.addEventListener('blur', () => stopTitleEdit(true));
  smeTitle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); smeTitle.blur(); }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); stopTitleEdit(false); }
  });

  // Клик по виджету выделяет его, клик мимо (в окне или за ним) — снимает выделение.
  editor.addEventListener('mousedown', (e) => {
    if (!ed || e.target.closest('.sme-mk')) return;
    const w = e.target.closest('.sme-w');
    if (w) select(w.dataset.key);
    else select(null);
  });
  shield.addEventListener('mousedown', () => ed && select(null));
  $('.sme-head', editor).addEventListener('mousedown', (e) => startDrag(e, editor));

  smeUndo.addEventListener('click', () => goHistory(-1));
  smeRedo.addEventListener('click', () => goHistory(1));
  smeReset.addEventListener('click', () => commit(cloneDraft(PRISTINE[ed.sec.id])));
  $('#smeDone').addEventListener('click', saveEditor);
  $('#smeClose').addEventListener('click', () => {
    if (draftKey(ed.draft) === draftKey(ed.hist[0])) closeEditor();
    else smeConfirm.hidden = false;
  });
  smeConfirm.addEventListener('click', (e) => {
    const answer = e.target.closest('[data-answer]')?.dataset.answer;
    // Это же подтверждение спрашивает и окно «Вкладки».
    if (tw) { answerTabsConfirm(answer); return; }
    if (answer === 'yes') saveEditor();
    else if (answer === 'no') closeEditor();
    else if (answer === 'cancel') smeConfirm.hidden = true;
  });

  // ---------- Виджет «Вкладки» на Главной (Figma xMQ3ZEN4AUINgwjVoxR8hS 18731:100134) ----------
  // Клик по вкладке переключает содержимое дашборда и выделяет виджет (рамка + тулбар «+ ⚙ ⋯»), клик мимо снимает
  // выделение. Двойной клик — переименование на месте; вкладки перетаскиваются мышью. pane — что показывает вкладка:
  // 'main' — дашборд Главной, 'managers' — «Для менеджеров», 'empty' — пустая ячейка (новые и дублированные вкладки).
  // После перезагрузки страницы всё возвращается к исходному.
  let tabs = [{ id: 1, title: 'Главный', pane: 'main' }, { id: 2, title: 'Для менеджеров', pane: 'managers' }];
  let activeTab = 1;
  let nextTabId = 3;

  const tabsW = $('#tabsWidget');
  const tabsList = $('#tabsList');
  const tabAddMenu = $('#tabAddMenu');
  const tabDotsMenu = $('#tabDotsMenu');
  const findTab = (id) => tabs.find((t) => t.id === id);

  function renderTabs() {
    tabsList.innerHTML = '';
    for (const t of tabs) {
      const tab = el('span', 'pg-tab' + (t.id === activeTab ? ' is-active' : ''));
      tab.dataset.id = t.id;
      const text = el('span', 'pg-tab__text');
      text.textContent = t.title;
      text.dataset.text = t.title;
      tab.append(text);
      tabsList.append(tab);
    }
    const pane = findTab(activeTab).pane;
    for (const p of pageMain.querySelectorAll('.dash')) p.hidden = p.dataset.pane !== pane;
  }

  function setActiveTab(id) {
    if (activeTab === id) return;
    activeTab = id;
    renderTabs();
  }

  // Перестановка мышью (вкладки в виджете — по X, строки в окне — по Y): элемент едет за курсором через соседей,
  // порядок применяется по отпусканию. Без сдвига (меньше 4px) это просто клик — onEnd(false).
  function startReorder(e, item, axis, onEnd) {
    if (e.button !== 0) return;
    e.preventDefault();
    const box = item.parentElement;
    const pos = (ev) => (axis === 'x' ? ev.clientX : ev.clientY);
    const start = pos(e);
    let moved = false;
    const move = (ev) => {
      const p = pos(ev);
      if (!moved) {
        if (Math.abs(p - start) < 4) return;
        moved = true;
        item.classList.add('is-dragging');
      }
      const before = [...box.children].find((n) => {
        if (n === item) return false;
        const r = n.getBoundingClientRect();
        return p < (axis === 'x' ? r.left + r.width / 2 : r.top + r.height / 2);
      });
      if (item.nextElementSibling !== (before || null)) box.insertBefore(item, before || null);
    };
    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      item.classList.remove('is-dragging');
      if (moved) {
        const order = [...box.children].map((n) => +n.dataset.id);
        tabs = order.map(findTab);
      }
      onEnd(moved);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  // ----- выделение виджета -----
  function selectTabs(on) {
    tabsW.classList.toggle('is-selected', on);
    if (!on) closeTabMenus();
  }

  tabsW.addEventListener('mousedown', (e) => {
    if (e.target.closest('.is-editing, .tabs-w__bar')) return;
    selectTabs(true);
    const tab = e.target.closest('.pg-tab');
    if (!tab) return;
    const id = +tab.dataset.id;
    startReorder(e, tab, 'x', (moved) => {
      if (moved) { renderTabs(); renderTabsWin(); } else setActiveTab(id);
    });
  });
  tabsW.addEventListener('dblclick', (e) => {
    const tab = e.target.closest('.pg-tab');
    if (tab) startTabRename(tab);
  });

  // Клик мимо виджета, его меню и окна снимает выделение; пока открыто окно «Вкладки», виджет остаётся выделенным.
  stage.addEventListener('mousedown', (e) => {
    if (tw || e.target.closest('#tabsWidget, #tabAddMenu, #tabDotsMenu, #tabsWin, #smeConfirm')) return;
    selectTabs(false);
  });

  // Уход с Главной: меню и окно закрываются (изменения остаются), выделение снимается.
  function leaveTabs() {
    if (tw) closeTabsWin();
    selectTabs(false);
  }

  // ----- переименование на месте (двойной клик): Enter или уход фокуса — применить, Esc — отменить -----
  function startTabRename(tabEl) {
    const t = findTab(+tabEl.dataset.id);
    const text = $('.pg-tab__text', tabEl);
    closeTabMenus();
    text.classList.add('is-editing');
    text.contentEditable = 'plaintext-only';
    text.focus();
    const range = document.createRange();
    range.selectNodeContents(text);
    const s = getSelection();
    s.removeAllRanges();
    s.addRange(range);
    let done = false;
    const finish = (apply) => {
      if (done) return;
      done = true;
      const value = text.textContent.replace(/\s+/g, ' ').trim();
      if (apply && value) t.title = value;
      renderTabs();
      renderTabsWin();
    };
    text.addEventListener('input', () => { text.dataset.text = text.textContent; });
    text.addEventListener('blur', () => finish(true));
    text.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); text.blur(); }
      else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); finish(false); }
    });
  }

  // ----- меню «+» и «⋯» -----
  // «+»: заголовок меню («+ ВКЛАДКА») встаёт под кнопкой — его «+» по центру кнопки, на 4px ниже неё.
  // Из окна «Вкладки» — «+» меню ровно поверх «+» окна (как меню «Иконка» в окне «Логотип»).
  // 20 — отступ заголовка слева, 12 — половина иконки; 8 — верхний отступ меню, 14 — половина строки заголовка.
  function openAddMenu(trigger, over = false) {
    closeTabMenus();
    tabAddMenu.hidden = false;
    trigger.classList.add('is-active');
    const r = stageRect(trigger);
    tabAddMenu.style.left = Math.round(r.left + r.width / 2 - 20 - 12) + 'px';
    tabAddMenu.style.top = Math.round(over ? r.top + r.height / 2 - 8 - 14 : r.top + r.height + 4) + 'px';
    tabAddMenu.trigger = trigger;
  }
  // «⋯»: под кнопкой на 4px, иконка первого пункта — под кнопкой (8 — отступ списка, 12 — отступ пункта).
  function openDotsMenu(trigger) {
    closeTabMenus();
    tabDotsMenu.hidden = false;
    trigger.classList.add('is-active');
    const r = stageRect(trigger);
    tabDotsMenu.style.left = Math.round(r.left + r.width / 2 - 8 - 12 - 12) + 'px';
    tabDotsMenu.style.top = Math.round(r.top + r.height + 4) + 'px';
  }
  function closeTabMenus() {
    tabAddMenu.hidden = true;
    tabDotsMenu.hidden = true;
    for (const b of document.querySelectorAll('.tabs-w__btn.is-active, .tw-plus.is-active')) b.classList.remove('is-active');
  }
  const tabMenuOpen = () => !tabAddMenu.hidden || !tabDotsMenu.hidden;

  $('#tabsPlus').addEventListener('click', (e) => (tabAddMenu.hidden ? openAddMenu(e.currentTarget) : closeTabMenus()));
  $('#tabsDots').addEventListener('click', (e) => (tabDotsMenu.hidden ? openDotsMenu(e.currentTarget) : closeTabMenus()));
  $('#tabsGear').addEventListener('click', () => { closeTabMenus(); openTabsWin('list'); });
  $('#tabAddClose').addEventListener('click', closeTabMenus);
  $('#tabDotsClose').addEventListener('click', closeTabMenus);
  $('#tabAddBlank').addEventListener('click', () => { closeTabMenus(); openTabsWin('new'); });
  tabDotsMenu.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'add') openAddMenu($('#tabsPlus'));
    else if (act === 'settings') { closeTabMenus(); openTabsWin('list'); }
  });
  stage.addEventListener('mousedown', (e) => {
    if (!tabMenuOpen() || e.target.closest('#tabAddMenu, #tabDotsMenu, #tabsPlus, #tabsDots, #twPlus')) return;
    closeTabMenus();
  });

  // ---------- Окно «Вкладки» (Figma 18772:35266) ----------
  // Встаёт справа от виджета (8px). Экраны: список вкладок и одна вкладка (название, доступ).
  // Изменения сразу видны на дашборде; ↺ возвращает всё как было при открытии окна, ✓ закрывает,
  // ✕ при изменениях спрашивает «Сохранить изменения?» («Нет» — вернуть как было).
  // Новая вкладка («С чистого листа») появляется, как только у неё есть название.
  const tabsWin = $('#tabsWin');
  const twList = $('#twList');
  const twInput = $('#twInput');
  const twReset = $('#twReset');
  // tw: { start — снимок при открытии, screen: 'list' | 'edit', editId — открытая вкладка, isNew — экран новой вкладки, prevActive }
  let tw = null;

  const tabsSnapshot = () => JSON.stringify({ tabs, activeTab });
  function restoreTabs(snap) {
    const s = JSON.parse(snap);
    tabs = s.tabs;
    activeTab = s.activeTab;
  }

  function openTabsWin(screen) {
    if (!tw) {
      setWindow(null);
      tw = { start: tabsSnapshot() };
      tabsWin.hidden = false;
      const r = stageRect(tabsW);
      tabsWin.style.left = Math.round(Math.min(r.left + r.width + 8, 1600 - tabsWin.offsetWidth)) + 'px';
      tabsWin.style.top = Math.round(Math.max(0, r.top)) + 'px';
    }
    selectTabs(true);
    if (screen === 'new') showTabEdit(null);
    else showTabList();
  }

  function closeTabsWin() {
    closeTabMenus();
    smeConfirm.hidden = true;
    tabsWin.hidden = true;
    tw = null;
  }

  function showTabList() {
    tw.screen = 'list';
    tw.editId = null;
    tw.isNew = false;
    renderTabsWin();
  }

  // id = null — новая вкладка: пустое поле, вкладка создаётся с первым символом названия.
  function showTabEdit(id) {
    tw.screen = 'edit';
    tw.editId = id;
    tw.isNew = id == null;
    tw.prevActive = activeTab;
    twInput.value = id == null ? '' : findTab(id).title;
    renderTabsWin();
    twInput.focus();
    twInput.setSelectionRange(twInput.value.length, twInput.value.length);
  }

  function renderTabsWin() {
    if (!tw) return;
    const edit = tw.screen === 'edit';
    tabsWin.classList.toggle('is-edit', edit);
    $('#twTitle').textContent = edit ? 'Вкладка' : 'Вкладки';
    twReset.disabled = tabsSnapshot() === tw.start;
    if (edit) return;
    twList.innerHTML = '';
    tabs.forEach((t, i) => {
      const row = el('div', 'tw-row');
      row.dataset.id = t.id;
      const text = el('span', 'tw-row__text');
      text.textContent = t.title;
      const cmds = el('span', 'tw-row__cmds',
        `<button class="tw-row__cmd" type="button" data-cmd="edit" aria-label="Настроить"><span class="ico24">&#xEAA9;</span></button>
         <button class="tw-row__cmd" type="button" data-cmd="copy" aria-label="Дублировать"><span class="ico24">&#xE669;</span></button>` +
        (i > 0 ? '<button class="tw-row__cmd tw-row__cmd--del" type="button" data-cmd="delete" aria-label="Удалить"><span class="ico24">&#xE65C;</span></button>' : ''));
      row.append(text, cmds);
      twList.append(row);
    });
  }

  // После любой правки — дашборд и окно перерисовываются.
  function tabsChanged() {
    if (!findTab(activeTab)) activeTab = tabs[0].id;
    renderTabs();
    renderTabsWin();
  }

  twList.addEventListener('mousedown', (e) => {
    const row = e.target.closest('.tw-row');
    if (!row) return;
    const id = +row.dataset.id;
    const cmd = e.target.closest('[data-cmd]')?.dataset.cmd;
    if (cmd) {
      e.preventDefault();
      if (cmd === 'edit') showTabEdit(id);
      else if (cmd === 'copy') {
        const i = tabs.findIndex((t) => t.id === id);
        tabs.splice(i + 1, 0, { id: nextTabId++, title: tabs[i].title, pane: 'empty' });
        tabsChanged();
      } else if (cmd === 'delete') {
        tabs = tabs.filter((t) => t.id !== id);
        tabsChanged();
      }
      return;
    }
    startReorder(e, row, 'y', (moved) => (moved ? tabsChanged() : showTabEdit(id)));
  });

  // Название применяется на лету; пустое поле у существующей вкладки не стирает её название.
  twInput.addEventListener('input', () => {
    const value = twInput.value.replace(/\s+/g, ' ').trim();
    if (tw.isNew) {
      if (value && tw.editId == null) {
        tw.editId = nextTabId++;
        tabs.push({ id: tw.editId, title: value, pane: 'empty' });
        activeTab = tw.editId;
      } else if (value) findTab(tw.editId).title = value;
      else if (tw.editId != null) {
        tabs = tabs.filter((t) => t.id !== tw.editId);
        tw.editId = null;
        activeTab = tw.prevActive;
      }
    } else if (value) findTab(tw.editId).title = value;
    tabsChanged();
  });
  twInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); showTabList(); }
  });

  $('#twBack').addEventListener('click', showTabList);
  $('#twPlus').addEventListener('click', (e) => (tabAddMenu.hidden ? openAddMenu(e.currentTarget, true) : closeTabMenus()));
  $('#twDone').addEventListener('click', closeTabsWin);
  twReset.addEventListener('click', () => {
    restoreTabs(tw.start);
    tabsChanged();
    showTabList();
  });
  $('#twClose').addEventListener('click', () => {
    if (tabsSnapshot() === tw.start) closeTabsWin();
    else smeConfirm.hidden = false;
  });
  function answerTabsConfirm(answer) {
    if (answer === 'yes') closeTabsWin();
    else if (answer === 'no') { restoreTabs(tw.start); closeTabsWin(); renderTabs(); }
    else if (answer === 'cancel') smeConfirm.hidden = true;
  }
  tabsWin.querySelector('.set-win__head').addEventListener('mousedown', (e) => startDrag(e, tabsWin));

  // Esc: подтверждение — «Отмена»; иначе снимает выделение виджета (если окно не открыто).
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || ed) return;
    if (tw && !smeConfirm.hidden) { e.stopImmediatePropagation(); smeConfirm.hidden = true; return; }
    if (!tw && !tabMenuOpen() && e.target === document.body) selectTabs(false);
  });

  renderTabs();

  // ---------- Выбор иконки раздела (Figma 44fX18O5Huk4hmoaANMNIC 10506:57779, без выбора цвета) ----------
  // Открывается по клику на иконку в шапке редактора, встаёт под ней. Выбранная иконка — в черновик (с отменой),
  // в аккордеон — по ✓. Вкладки справа прокручивают к группе; у последних вкладок групп в макете нет.
  const ICON_GROUPS = [
    { tab: '\uE68D', title: null, icons: [null, 'E758', 'E90F', 'E61F', 'EAF8', ['cbuc', 'EA38'], 'E95B', 'EAA0', 'E9B1'] },
    { tab: '\uE931', title: 'Люди', icons: ['E9A7', 'E92D', 'E92E', 'E92F', 'E926', 'E6A9', 'E6AA', 'E6AB', 'E6AC', 'E6AD', 'E6AE', 'E6AF',
      'E6B0', 'E6B1', 'E6B2', 'E6B3', 'E6B4', 'E6B5', 'E6B6', 'E6B7', 'E6B8', 'E6B9', 'E6BA', 'E6BB', 'E6BC', 'E6BD', 'E6BE', 'EB6F'] },
    { tab: '\uE940', title: 'Статусы пользователя', icons: ['EB3E', 'EAAA', 'EA1C', 'EA1F', 'E96A', 'E949', 'E94A', 'E94B', 'E931', 'E932',
      'E933', 'E934', 'E935', 'E936', 'E937', 'E938', 'E939', 'E93A', 'E93B', 'E93C', 'E93D', 'E93E', 'E93F', 'E940', 'E941', 'E942',
      'E943', 'E944', 'E945', 'E67E', 'E618', 'E620'] },
    { tab: '\uE641', title: 'Финансы', icons: ['EAF2', 'EAD9', 'EA9E', 'EA9F', 'EAA0', 'EAA1', 'EAA2', 'EAA3', 'EAA4', 'EAA5', 'EAA6', 'EAB2',
      'EA93', 'EA38', 'EA35', 'EA06', 'EA0D', 'E9CD', 'E9BB', 'E98E', 'E981', 'E95B', 'E6D6', 'E6D7', 'E6A3', 'E695', 'E696', 'E641', 'E66F'] },
  ].map((g) => ({
    ...g,
    // строка — символ cbuc-icons24; [шрифт, код] — символ другого шрифта; null — пустая иконка
    icons: g.icons.map((i) => (i == null ? null : Array.isArray(i)
      ? { font: i[0], ch: String.fromCharCode(parseInt(i[1], 16)) }
      : { font: 'cbuc24', ch: String.fromCharCode(parseInt(i, 16)) })),
  }));
  const ICON_TABS_REST = ['\uE637', '\uE735', '\uE9E2', '\uE91B', '\uE9D9'];

  const iconPick = $('#iconPick');
  const iconPickList = $('#iconPickList');
  const iconPickTabs = $('#iconPickTabs');

  function renderIconPick() {
    const cur = ed.draft.icon;
    iconPickList.innerHTML = '';
    iconPickTabs.innerHTML = '';
    ICON_GROUPS.forEach((g, gi) => {
      const group = el('div', 'icon-pick__group');
      group.dataset.group = gi;
      if (g.title) group.append(el('div', 'icon-pick__title', g.title));
      const grid = el('div', 'icon-pick__grid');
      for (const ic of g.icons) {
        const b = el('button', 'icon-pick__btn',
          ic ? `<span class="${ic.font === 'cbuc' ? 'ico' : 'ico24'}">${ic.ch}</span>` : '<span class="ico24">&#xE66C;</span>');
        b.type = 'button';
        // Пустая иконка (✕) в «недавних» — как в макете, неактивна.
        if (!ic) b.disabled = true;
        else {
          if (cur && cur.font === ic.font && cur.ch === ic.ch) b.classList.add('is-current');
          b.addEventListener('click', () => { closeIconPick(); commit({ ...cloneDraft(ed.draft), icon: ic }); });
        }
        grid.append(b);
      }
      group.append(grid);
      iconPickList.append(group);
    });
    [...ICON_GROUPS.map((g) => g.tab), ...ICON_TABS_REST].forEach((ch, i) => {
      const t = el('button', 'icon-pick__tab' + (i === 0 ? ' is-active' : ''), `<span class="ico">${ch}</span>`);
      t.type = 'button';
      if (i < ICON_GROUPS.length) t.addEventListener('click', () => {
        iconPickList.scrollTop = iconPickList.querySelector(`[data-group="${i}"]`).offsetTop;
      });
      iconPickTabs.append(t);
    });
  }

  // Активная вкладка — группа, которая сейчас вверху списка (в конце прокрутки — последняя).
  iconPickList.addEventListener('scroll', () => {
    const top = iconPickList.scrollTop + 1;
    let active = 0;
    for (const g of iconPickList.children) if (g.offsetTop <= top) active = +g.dataset.group;
    if (iconPickList.scrollTop + iconPickList.clientHeight >= iconPickList.scrollHeight - 1) active = ICON_GROUPS.length - 1;
    [...iconPickTabs.children].forEach((t, i) => t.classList.toggle('is-active', i === active));
  });

  function openIconPick() {
    stopTitleEdit(true);
    ed.selected = null;
    renderEditor();
    renderIconPick();
    $('#iconPickSearch').value = '';
    iconPick.hidden = false;
    iconPickList.scrollTop = 0;
    smeIcon.classList.add('is-active');
    // Панель — поверх иконки шапки редактора: левый верхний угол панели в левом верхнем углу иконки (как окна «Меню» и «Логотип»).
    const r = stageRect(smeIcon);
    iconPick.style.left = Math.round(Math.max(0, Math.min(r.left, 1600 - iconPick.offsetWidth))) + 'px';
    iconPick.style.top = Math.round(Math.max(0, Math.min(r.top, 900 - iconPick.offsetHeight))) + 'px';
  }
  function closeIconPick() {
    iconPick.hidden = true;
    smeIcon.classList.remove('is-active');
  }

  smeIcon.addEventListener('click', () => (iconPick.hidden ? openIconPick() : closeIconPick()));
  $('#iconPickClose').addEventListener('click', closeIconPick);
  // Клик мимо панели закрывает её (клик по самой иконке переключает панель).
  stage.addEventListener('mousedown', (e) => {
    if (iconPick.hidden || e.target.closest('#iconPick') || e.target.closest('#smeIcon')) return;
    closeIconPick();
  }, true);

  // ---------- Меню «+» редактора (Figma 9eLwMJLQCwT0xHKviN2j1P 16090:257796) ----------
  // Строка шапки (поиск) — вровень с «+», левый край по «+». Клик по странице добавляет её виджетом в конец первой колонки.
  // Раскрывается только «Отчетность» (остальные группы — пока без содержимого), «Добавить виджет» — только наведение.
  const PLUS_TREE = [
    { title: 'Моей компании', kind: 'folder' },
    { sep: true },
    { title: 'Отчетность', kind: 'group', open: true, items: ['Отчетность', 'Письма', 'Требования'] },
    { title: 'Документооборот', kind: 'folder' },
    { title: 'Управление персоналом', kind: 'folder' },
    { title: 'Бухгалтерия и зарплата', kind: 'folder' },
    { title: 'Госсистемы', kind: 'folder' },
    { title: 'Деньги', kind: 'group', items: [] },
    { title: 'Торги', kind: 'group', items: [] },
    { title: 'Маркетинг', kind: 'folder' },
    { title: 'Прочее', kind: 'folder' },
  ];
  const plusMenu = $('#plusMenu');
  const plusList = $('#plusMenuList');
  const plusSearch = $('#plusMenuSearch');
  const smePlus = $('.sme-plus', editor);

  function renderPlusMenu() {
    const q = plusSearch.value.trim().toLowerCase();
    const match = (t) => !q || t.toLowerCase().includes(q);
    plusList.innerHTML = '';
    const row = (cls, html, onClick) => {
      const r = el('button', 'pm-row' + (cls ? ' ' + cls : ''), html);
      r.type = 'button';
      if (onClick) r.addEventListener('click', onClick);
      plusList.append(r);
    };
    if (!q) row('', '<span class="ico pm-ico">&#xEADD;</span><span>Добавить виджет</span>');
    for (const n of PLUS_TREE) {
      if (n.sep) { if (!q) plusList.append(el('div', 'pm-sep')); continue; }
      const kids = (n.items || []).filter(match);
      if (q && !match(n.title) && !kids.length) continue;
      const arrow = n.kind === 'folder' ? '' : (n.open || (q && kids.length)) ? '' : '';
      row('', `<span class="ico pm-ico">${arrow}</span><span>${n.title}</span>`,
        n.kind === 'group' ? () => { n.open = !n.open; renderPlusMenu(); } : null);
      if (n.open || (q && kids.length)) for (const t of (q ? kids : n.items)) row('pm-row--page', `<span>${t}</span>`, () => addPage(t));
    }
  }

  function addPage(title) {
    const draft = cloneDraft(ed.draft);
    draft.cols[0].push(sub(title));
    closePlusMenu();
    commit(draft);
  }

  function openPlusMenu() {
    stopTitleEdit(true);
    plusSearch.value = '';
    renderPlusMenu();
    plusMenu.hidden = false;
    smePlus.classList.add('is-active');
    const r = stageRect(smePlus);
    // 9 — верхний отступ меню, 14 — половина строки поиска.
    plusMenu.style.left = Math.round(Math.min(r.left, 1600 - plusMenu.offsetWidth)) + 'px';
    plusMenu.style.top = Math.round(Math.max(0, Math.min(r.top + r.height / 2 - 9 - 14, 900 - plusMenu.offsetHeight))) + 'px';
    plusSearch.focus();
  }
  function closePlusMenu() {
    plusMenu.hidden = true;
    smePlus.classList.remove('is-active');
  }

  smePlus.addEventListener('click', () => (plusMenu.hidden ? openPlusMenu() : closePlusMenu()));
  $('#plusMenuClose').addEventListener('click', closePlusMenu);
  plusSearch.addEventListener('input', renderPlusMenu);
  stage.addEventListener('mousedown', (e) => {
    if (plusMenu.hidden || e.target.closest('#plusMenu') || e.target.closest('.sme-plus')) return;
    closePlusMenu();
  }, true);

  document.addEventListener('keydown', (e) => {
    if (!plusMenu.hidden && e.key === 'Escape') { e.stopImmediatePropagation(); closePlusMenu(); }
  }, true);

  document.addEventListener('keydown', (e) => {
    if (!ed || smeTitle.classList.contains('is-editing') || e.target === plusSearch) return;
    if (!iconPick.hidden) {
      if (e.key === 'Escape') { e.stopImmediatePropagation(); closeIconPick(); }
      return;
    }
    // Пока открыто подтверждение — только Esc (= «Отмена»).
    if (!smeConfirm.hidden) { if (e.key === 'Escape') { e.stopImmediatePropagation(); smeConfirm.hidden = true; } return; }
    if (e.key === 'Delete') { e.preventDefault(); deleteSelected(); }
    else if (e.key === 'Escape') {
      e.stopImmediatePropagation();
      select(null);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!dropdown.hidden || !iconMenu.hidden || tabMenuOpen()) closePopups();
    else closeSubmenu();
  });

  // ---------- Тема оформления ----------
  // Готовые палитры: красят фон за контентом, аккордеон, подменю и акценты. Тема применяется сразу по клику на плашку,
  // ✓ и ✕ просто закрывают панель. Цвета — с миниатюр макета (16090:237338), «Голубая» — с экрана 19270:30531 (gradient 1).
  // acc — фон аккордеона (null — прозрачный, в кружке шахматка), marker — акцент 1, accent2 — акцент 2, pv — цвета превью.
  const LIGHT = { // аккордеон прозрачный, лежит на фоне страницы
    '--acc-under': 'transparent', '--acc-item-hover': '#ebebeb', '--acc-item-selected': '#f2f2f2',
    '--acc-text': '#000', '--acc-icon': '#8991a9', '--acc-weight': '400', '--acc-cmd-dots': '#8991a9', '--acc-cmd-hover': '#333',
    '--acc-plus': '#8991a9', '--acc-plus-hover': '#333', '--acc-plus-hover-bg': 'rgba(0, 0, 0, .05)',
    '--acc-burger-hover': '#ebebeb', '--acc-bird-hover': '#ebebeb', '--submenu-bg': '#fff', '--submenu-item-hover': '#f2f2f2',
  };
  const GRAY = { // светло-серый аккордеон, тёмный текст
    '--acc-text': '#333', '--acc-icon': '#7b797a', '--acc-label': '#8c8c8c', '--acc-weight': '400', '--acc-cmd-dots': '#7b797a', '--acc-cmd-hover': '#000',
    '--acc-plus': '#7b797a', '--acc-plus-hover': '#000', '--acc-plus-hover-bg': 'rgba(0, 0, 0, .06)', '--submenu-bg': '#fff', '--submenu-item-hover': '#f0f0f0',
  };
  const PV_LIGHT = { title: '#d6d6d6', line: '#d7d7d7', icon: '#d0dce6', iconSel: '#d0dce6' };
  const PV_DARK = { title: '#e9ebec', line: '#6b7884', icon: '#98b2ca', iconSel: '#fff' };
  const PV_GRAY = { title: '#666', line: '#ccc', icon: '#7b797a', iconSel: '#7b797a' };
  const DARK_PAGE = { // тёмная страница: карточки, текст, скелетон
    '--c-surface': '#23303e', '--c-text': '#e9ebec', '--c-text-strong': '#e9ebec', '--c-name': '#a9bfd9', '--c-name2': '#8fb4e8', '--c-sum': '#c9d3e8',
    '--c-label': '#9aa6b4', '--c-link': '#6fa8ec', '--c-border': '#34465a', '--c-divider': '#34465a', '--c-row': '#2b3a4a',
    '--c-sk': '#34465a', '--c-sk-row': '#2b3a4a', '--c-sk-pic': '#2b3a4a',
  };
  const THEMES = [
    { id: 'blue', acc: null, marker: '#0c94ff', accent2: '#cc3d00', bg: 'linear-gradient(#f2f9ff, #f8f8f8 27.546%)', vars: LIGHT, pv: PV_LIGHT },
    { id: 'pink', acc: null, marker: '#ff4567', accent2: '#f6733c', bg: 'linear-gradient(#fff2f4, #f8f8f8 27.546%)', vars: LIGHT, pv: PV_LIGHT },
    { id: 'dark', acc: '#2c3e50', marker: '#0c94ff', accent2: '#cc3d00', vars: {}, pv: PV_DARK },
    { id: 'gray-blue', acc: '#e9e9e9', marker: '#357ed0', accent2: '#cc3d00', vars: { ...GRAY, '--acc-item-hover': '#f2f2f2', '--acc-item-selected': '#dedede', '--acc-burger-hover': '#dedede', '--acc-bird-hover': '#dedede' }, pv: PV_GRAY },
    { id: 'night', acc: '#050620', marker: '#71d186', accent2: '#f6733c',
      vars: { '--acc-item-hover': '#222b47', '--acc-item-selected': '#161e34', '--acc-cmd-dots': '#6b7c99', '--acc-burger-hover': '#161e34', '--acc-bird-hover': '#222b47', '--submenu-bg': '#222b47', '--submenu-item-hover': '#2f3a5a' },
      pv: { ...PV_DARK, line: '#505062', sel: '#161e34' } },
    { id: 'gray-pink', acc: '#e9e9e9', marker: '#ff4567', accent2: '#ff4567', vars: { ...GRAY, '--acc-item-hover': '#f2f2f2', '--acc-item-selected': '#dedede', '--acc-burger-hover': '#dedede', '--acc-bird-hover': '#dedede' }, pv: { ...PV_GRAY, title: '#ff4567' } },
    { id: 'gray-red', acc: '#f0f0f0', marker: '#cd3238', accent2: '#df1c33', vars: { ...GRAY, '--acc-item-hover': '#f8f8f8', '--acc-item-selected': '#e5e5e5', '--acc-burger-hover': '#e5e5e5', '--acc-bird-hover': '#e5e5e5' }, pv: { ...PV_GRAY, title: '#787878', line: '#d0d0d0' } },
    { id: 'dark-full', acc: '#2c3e50', marker: '#0c93fe', accent2: '#ffcc99', bg: '#1d2834', vars: DARK_PAGE, pv: { ...PV_DARK, card: '#23303e', box: '#2b3a4a', top: '#2b3a4a' } },
    { id: 'graphite', acc: '#323232', marker: '#962147', accent2: '#962147',
      vars: { '--acc-item-hover': '#404040', '--acc-item-selected': '#222', '--acc-bird': '#fff', '--acc-bird-bg': '#962147', '--acc-text': '#e6e6e6', '--acc-icon': '#9c9c9c', '--acc-label': '#8c8c8c',
        '--acc-cmd-dots': '#7a7a7a', '--acc-plus': '#9c9c9c', '--acc-burger-hover': '#2a2a2a', '--acc-bird-hover': '#404040', '--submenu-bg': '#404040', '--submenu-item-hover': '#4e4e4e' },
      pv: { title: '#e6e6e6', line: '#414141', icon: '#9c9c9c', iconSel: '#fff', sel: '#222' } },
    { id: 'mint', acc: '#d8e1e2', marker: '#00282c', accent2: '#00282c',
      vars: { '--acc-item-hover': '#cfdadb', '--acc-item-selected': '#e6ecee', '--acc-text': '#1b3e42', '--acc-icon': '#3d5b5e', '--acc-label': '#5d7a7d', '--acc-weight': '400',
        '--acc-cmd-dots': '#5d7a7d', '--acc-cmd-hover': '#00282c', '--acc-plus': '#3d5b5e', '--acc-plus-hover': '#00282c', '--acc-plus-hover-bg': 'rgba(0, 40, 44, .08)',
        '--acc-burger-hover': '#cfdadb', '--acc-bird-hover': '#cfdadb', '--submenu-bg': '#eef3f3', '--submenu-item-hover': '#d8e1e2' },
      pv: { title: '#1b3e42', line: '#98aaac', icon: '#00282c', iconSel: '#00282c', sel: '#e6ecee' } },
  ];
  const DEFAULT_BG = '#f8f8f8';
  // Все токены, которые задаёт хоть одна тема, — чтобы при смене темы сбросить прежние.
  const THEME_PROPS = [...new Set(THEMES.flatMap((t) => Object.keys(themeVars(t))))];
  let themeId = 'dark';

  function themeVars(t) {
    return {
      ...t.vars,
      '--acc-bg': t.acc ?? 'transparent', '--acc-marker': t.marker, '--accent2': t.accent2, '--content-bg': t.bg ?? DEFAULT_BG,
    };
  }

  // Переменные превью: фон, аккордеон, текст и иконки аккордеона, маркер, акцент 2, карточка страницы.
  function pvStyle(t) {
    const v = { ...themeVars(t) };
    const p = t.pv;
    const pv = {
      bg: v['--content-bg'], acc: v['--acc-bg'], sel: p.sel ?? v['--acc-item-selected'] ?? '#273748',
      bird: v['--acc-bird'] ?? t.marker, 'bird-bg': v['--acc-bird-bg'] ?? 'transparent',
      title: p.title, line: p.line, icon: p.icon, 'icon-sel': p.iconSel, marker: t.marker, accent2: t.accent2,
      card: p.card ?? '#fff', box: p.box ?? '#f4f4f4', top: p.top ?? '#fff',
    };
    return Object.entries(pv).map(([k, c]) => `--pv-${k}:${c}`).join(';');
  }

  // Превью 306×181: аккордеон (птичка, название, пункт, выбранный пункт с маркером) и страница (вкладка, карточка).
  function pvHTML(t) {
    return `<span class="tpv" style="${pvStyle(t)}">` +
      '<i class="tpv__acc"></i><i class="tpv__bird">&#xE9E2;</i><i class="tpv__title"></i>' +
      '<i class="tpv__dot" style="top:46px"></i><i class="tpv__line" style="top:54px;width:60px"></i>' +
      '<i class="tpv__sel"></i><i class="tpv__mark"></i><i class="tpv__dot" style="top:79px;background:var(--pv-icon-sel)"></i>' +
      '<i class="tpv__line" style="top:87px;width:34px"></i><i class="tpv__line tpv__a2" style="top:87px;left:84px;width:10px"></i><i class="tpv__line tpv__a1" style="top:87px;left:98px;width:10px"></i>' +
      '<i class="tpv__tab"></i><i class="tpv__bar"></i><i class="tpv__sq" style="left:272.8px"></i><i class="tpv__sq" style="left:283.3px"></i>' +
      '<i class="tpv__sheet"></i><i class="tpv__box" style="left:148.6px;top:45.25px;width:35px;height:33.5px"></i>' +
      '<i class="tpv__box" style="left:188.8px;top:45.25px;width:101.4px;height:11.7px;border-radius:6px"></i>' +
      '<i class="tpv__box" style="left:188.8px;top:65.4px;width:101.4px;height:11.7px;border-radius:6px"></i>' +
      '<i class="tpv__box" style="left:148.6px;top:85.5px;width:141.6px;height:11.7px;border-radius:6px"></i>' +
      '</span>';
  }

  // Кружки темы: цвет аккордеона (прозрачный — шахматка), акцент 1, акцент 2.
  const swatchList = (t) => [t.acc, t.marker, t.accent2];

  const themePanel = $('#themePanel');
  const themeBtn = $('#themeBtn');
  const tpGrid = $('#tpGrid');

  tpGrid.innerHTML = THEMES.map((t) =>
    `<button class="tp-tile" type="button" data-theme="${t.id}"><span class="tp-tile__wrap">` +
    `<span class="tp-tile__sw">${swatchList(t).map((c) => (c ? `<i style="--c:${c}"></i>` : '<i class="is-none"></i>')).join('')}</span>` +
    `<span class="tp-tile__pv">${pvHTML(t)}</span>` +
    '<span class="tp-tile__check"><span class="ico24">&#xE616;</span></span></span></button>').join('');

  function applyTheme(id) {
    const t = THEMES.find((x) => x.id === id);
    themeId = id;
    for (const p of THEME_PROPS) stage.style.removeProperty(p);
    for (const [p, v] of Object.entries(themeVars(t))) stage.style.setProperty(p, v);
    $('#themeSwatches').innerHTML = swatchList(t).map((c) => (c ? `<span class="swatch" style="--c:${c}"></span>` : '<span class="swatch is-none"></span>')).join('');
    $('#bgSwatch').style.setProperty('--c', t.bg ?? DEFAULT_BG);
    $('#tpBig').innerHTML = pvHTML(t);
    for (const b of tpGrid.children) b.classList.toggle('is-active', b.dataset.theme === id);
  }

  function openThemePanel() {
    setWindow(null);
    closeRp();
    themePanel.hidden = false;
    themeBtn.classList.add('is-active');
  }
  function closeThemePanel() {
    themePanel.hidden = true;
    themeBtn.classList.remove('is-active');
  }

  themeBtn.addEventListener('click', () => (themePanel.hidden ? openThemePanel() : closeThemePanel()));
  $('#tpDone').addEventListener('click', closeThemePanel);
  $('#tpClose').addEventListener('click', closeThemePanel);
  tpGrid.addEventListener('click', (e) => {
    const tile = e.target.closest('.tp-tile');
    if (tile && tile.dataset.theme !== themeId) applyTheme(tile.dataset.theme);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !themePanel.hidden) closeThemePanel();
  });

  applyTheme(themeId);
  renderAccordion();
  applyView();
})();
