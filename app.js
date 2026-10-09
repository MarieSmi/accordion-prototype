(() => {
  'use strict';

  // ---------- Данные ----------
  // Страница → скриншот контентной области. Для страниц без своего макета — скелетон.
  const SHOTS = {
    main: 'assets/img/page-main.png',
    skeleton: 'assets/img/page-contacts-skeleton.png',
  };

  // Пункт подменю: [заголовок, уровень (1|2)]
  const sub = (title, level = 1) => ({ title, level });

  // Разделы аккордеона. icon — символ шрифта Accordion-Font.
  // submenu.cols — колонки подменю; head — пункт-заголовок подменю (ведёт на страницу раздела).
  const SECTIONS = [
    { id: 'contacts', title: 'Контакты', icon: '',
      submenu: { cols: [[sub('Группы'), sub('Каналы'), sub('Новости'), sub('Звонки'), sub('Почта'), sub('Обсуждения'), sub('Обращения'), sub('Заявки')]] } },
    { id: 'tasks', title: 'Задачи', icon: '' },
    { id: 'business', title: 'Бизнес', icon: '',
      submenu: { cols: [
        [sub('Продажи/CRM'), sub('Документы', 2), sub('Заказы', 2), sub('Клиенты', 2), sub('Активности', 2),
         sub('Розница/Кассы'), sub('Сервис'), sub('Сметы', 2), sub('Справочники', 2), sub('Виды работ', 2),
         sub('Транспорт'), sub('Машины', 2), sub('ЭТрН', 2), sub('Заказы', 2), sub('Штрафы', 2)],
        [sub('Каталог'), sub('Цены', 2), sub('Скидки и акции', 2), sub('Сертификаты', 2), sub('Списки товаров', 2), sub('Конкуренты', 2),
         sub('Маркетплейсы'), sub('Склад'), sub('Документы', 2), sub('Закупки/Расходы'), sub('Поставщики', 2), sub('Планы потребностей', 2), sub('Маркет')],
      ] } },
    { id: 'staff', title: 'Сотрудники', icon: '' },
    { id: 'docs', title: 'Документы', icon: '' },
    { id: 'accounting', title: 'Учет', icon: '' },
    { id: 'reports', title: 'Отчетность', icon: '' },
    { id: 'companies', title: 'Компании', icon: '' },
    { id: 'marketing', title: 'Маркетинг', icon: '' },
    { id: 'contact-center', title: 'Контакт-центр', icon: '' },
    { id: 'calendar', title: 'Календарь', calendar: true,
      submenu: { cols: [[sub('Ежедневник'), sub('Табель'), sub('Встречи'), sub('Куда уходит время'), sub('Помещения')]] } },
    { id: 'profile', title: 'Сдобников С.В.', photo: 'assets/img/avatar-sdobnikov.png' },
    { id: 'settings', title: 'Настройки', icon: '' },
  ];

  // Настройки аккордеона (позже будут меняться из окна «Меню»).
  const settings = {
    submenuTrigger: 'click', // 'click' | 'hover'
    commandsDelay: 600,      // мс до появления ✎ ⋮ на пункте
  };

  const state = {
    page: { section: null, item: null }, // section=null → Главная
    openSection: null,
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
  const list = $('#accList');
  const layer = $('#submenuLayer');
  const shot = $('#contentShot');

  // Сцена 1600×900 вписывается в окно браузера с сохранением пропорций.
  function fitStage() {
    const w = document.documentElement.clientWidth;
    const h = document.documentElement.clientHeight;
    const s = Math.min(w / 1600, h / 900);
    stage.style.transform = `translate(${(w - 1600 * s) / 2}px, ${(h - 900 * s) / 2}px) scale(${s})`;
  }
  new ResizeObserver(fitStage).observe(document.documentElement);
  fitStage();

  function iconHTML(sec) {
    if (sec.photo) return `<img class="acc-item__photo" src="${sec.photo}" alt="">`;
    if (sec.calendar) {
      return `<span class="acc-cal"><span class="acc-icon20 acc-cal__frame"></span><span class="acc-cal__day">${new Date().getDate()}</span></span>`;
    }
    return `<span class="acc-item__icon"><span class="acc-icon20">${sec.icon}</span></span>`;
  }

  // ---------- Аккордеон ----------
  function renderAccordion() {
    list.innerHTML = '';
    for (const sec of SECTIONS) {
      const li = el('li', 'acc-item');
      li.dataset.id = sec.id;
      const btn = el('button', 'acc-item__btn' + (sec.photo ? ' acc-item__btn--photo' : ''),
        `${iconHTML(sec)}<span class="acc-item__title">${sec.title}</span>
         <span class="acc-cmds">
           <span class="acc-cmd" role="button" aria-label="Настроить"><span class="ico"></span></span>
           <span class="acc-cmd acc-cmd--dots" role="button" aria-label="Ещё"><span class="ico"></span></span>
         </span>`);
      btn.type = 'button';
      li.append(btn);
      list.append(li);

      let timer = null;
      btn.addEventListener('mouseenter', () => {
        li.classList.add('is-hover');
        timer = setTimeout(() => li.classList.add('is-delay'), settings.commandsDelay);
        if (settings.submenuTrigger === 'hover') openSubmenu(sec.id);
      });
      btn.addEventListener('mouseleave', () => {
        clearTimeout(timer);
        li.classList.remove('is-hover', 'is-delay');
      });
      btn.addEventListener('click', (e) => {
        // Команды ✎ ⋮ — поведение по клику пока не задано.
        if (e.target.closest('.acc-cmd')) return;
        if (state.openSection === sec.id) closeSubmenu();
        else openSubmenu(sec.id);
      });
    }
    syncAccordion();
  }

  function syncAccordion() {
    for (const li of list.children) {
      li.classList.toggle('is-selected', li.dataset.id === state.page.section);
      li.classList.toggle('is-open', li.dataset.id === state.openSection);
    }
  }

  // ---------- Подменю ----------
  function openSubmenu(id) {
    const sec = SECTIONS.find((s) => s.id === id);
    closeSubmenu();
    if (!sec || !sec.submenu) {
      // Подменю для раздела ещё не нарисовано — переходим сразу на страницу раздела.
      if (sec) navigate(sec.id, null);
      return;
    }
    state.openSection = id;

    const multi = sec.submenu.cols.length > 1;
    const box = el('div', 'submenu' + (multi ? ' submenu--multi' : ''));
    const panel = el('div', 'submenu__panel');

    const head = el('div', 'submenu__head');
    const headBtn = el('button', 'sm-head',
      `<span class="sm-head__icon">${sec.calendar
        ? `<span class="acc-cal"><span class="acc-icon20 acc-cal__frame"></span><span class="acc-cal__day">${new Date().getDate()}</span></span>`
        : `<span class="acc-icon20">${sec.icon}</span>`}</span><span class="sm-head__title">${sec.title}</span>`);
    headBtn.type = 'button';
    headBtn.addEventListener('click', () => navigate(sec.id, null));
    head.append(headBtn);

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

    panel.append(head, cols);

    const float = el('div', 'submenu__float');
    const close = el('button', 'float-btn', `<svg width="12" height="12" viewBox="8 8 12 12" fill="none"><path d="M19.7917 18.875C19.9306 18.9861 20 19.1389 20 19.3333C20 19.5278 19.9306 19.6806 19.7917 19.7917C19.6806 19.9306 19.5278 20 19.3333 20C19.1389 20 18.9861 19.9306 18.875 19.7917L14 14.9583L9.125 19.7917C9.01389 19.9306 8.86111 20 8.66667 20C8.47222 20 8.31944 19.9306 8.20833 19.7917C8.06944 19.6806 8 19.5278 8 19.3333C8 19.1389 8.06944 18.9861 8.20833 18.875L13.0417 14L8.20833 9.125C8.06944 9.01389 8 8.86111 8 8.66667C8 8.47222 8.06944 8.31944 8.20833 8.20833C8.31944 8.06944 8.47222 8 8.66667 8C8.86111 8 9.01389 8.06944 9.125 8.20833L14 13.0417L18.875 8.20833C18.9861 8.06944 19.1389 8 19.3333 8C19.5278 8 19.6806 8.06944 19.7917 8.20833C19.9306 8.31944 20 8.47222 20 8.66667C20 8.86111 19.9306 9.01389 19.7917 9.125L14.9583 14L19.7917 18.875Z" fill="white"/></svg>`);
    close.type = 'button';
    close.setAttribute('aria-label', 'Закрыть');
    close.addEventListener('click', closeSubmenu);
    float.append(close);
    if (!multi) {
      const edit = el('button', 'float-btn', '<span class="ico"></span>');
      edit.type = 'button';
      edit.setAttribute('aria-label', 'Редактировать подменю');
      // Окно редактирования подменю — отдельный этап.
      float.append(edit);
    }

    box.append(panel, float);
    layer.append(box);

    // Позиция: поверх пункта, иконка заголовка совпадает с иконкой пункта.
    const li = list.querySelector(`[data-id="${id}"]`);
    const acc = $('#accordion');
    const top = acc.offsetTop + li.offsetTop; // li позиционируется относительно .accordion
    box.style.left = (acc.offsetLeft + 4) + 'px';
    box.style.top = Math.min(top, 900 - box.offsetHeight - 8) + 'px';

    if (settings.submenuTrigger === 'hover') {
      box.addEventListener('mouseleave', (e) => {
        if (!e.relatedTarget || !li.contains(e.relatedTarget)) closeSubmenu();
      });
    }
    syncAccordion();
  }

  function closeSubmenu() {
    layer.innerHTML = '';
    state.openSection = null;
    syncAccordion();
  }

  // ---------- Навигация ----------
  function navigate(section, item) {
    state.page = { section, item };
    shot.src = section ? SHOTS.skeleton : SHOTS.main;
    closeSubmenu();
  }

  $('#goHome').addEventListener('click', () => navigate(null, null));

  // Клик вне подменю и аккордеона закрывает подменю.
  stage.addEventListener('mousedown', (e) => {
    if (!state.openSection) return;
    if (e.target.closest('.submenu') || e.target.closest('.acc-item')) return;
    closeSubmenu();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSubmenu(); });

  renderAccordion();
})();
