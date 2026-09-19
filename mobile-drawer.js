(function () {
  var mainLink = {
    href: 'rooms.html',
    label: 'Rooms'
  };

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (char) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char];
    });
  }

  function buildToggle() {
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'menu-toggle';
    toggle.id = 'menuToggle';
    toggle.setAttribute('aria-label', '開啟選單');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mobileMenu');
    toggle.innerHTML = [
      '<span class="bar t" aria-hidden="true"></span>',
      '<span class="bar m" aria-hidden="true"></span>',
      '<span class="bar b" aria-hidden="true"></span>'
    ].join('');
    return toggle;
  }

  function buildMenu() {
    var menu = document.createElement('aside');
    menu.className = 'mobile-menu';
    menu.id = 'mobileMenu';
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-modal', 'true');
    menu.setAttribute('aria-label', '行動版選單');
    menu.hidden = true;
    menu.innerHTML = [
      '<div class="mobile-menu-inner">',
      '<nav class="mm-section mm-anim d1" aria-label="行動版主要導覽">',
      '<p class="mm-kicker">Navigation</p>',
      '<ul class="mm-nav-main">',
      '<li><a href="' + escapeHtml(mainLink.href) + '">' + escapeHtml(mainLink.label) + '</a></li>',
      '</ul>',
      '<ul class="mm-nav-sub">',
      '<li><a href="#" data-i18n="nav.about">關於我們</a></li>',
      '<li><a href="#" data-i18n="nav.guide">景點攻略</a></li>',
      '<li><a href="#" data-i18n="nav.tickets">電子票券</a></li>',
      '<li><a href="#">最新消息</a></li>',
      '<li><a href="#" data-i18n="nav.stays">直營旅店</a></li>',
      '<li><a href="#" data-i18n="nav.partners">合作夥伴</a></li>',
      '<li><a href="#" data-i18n="nav.lookup">家天下台南行旅信託票券查詢</a></li>',
      '<li><a href="#" data-i18n="nav.contact">聯絡我們</a></li>',
      '<li><a href="#" data-i18n="nav.insurance">網路投保旅平險</a></li>',
      '</ul>',
      '</nav>',
      '<section class="mm-contact mm-anim d2">',
      '<p class="mm-kicker">Contact &amp; Hours</p>',
      '<dl>',
      '<dt>地址</dt><dd>台北市中正區範例路 1 號</dd>',
      '<dt>Phone</dt><dd><a href="tel:+886212345678">(02)1234-5678</a></dd>',
      '<dt>Email</dt><dd><a href="mailto:contact@homearound.example">contact@homearound.example</a></dd>',
      '<dt>Hours</dt><dd>Open 24 hours</dd>',
      '</dl>',
      '</section>',
      '<section class="mm-lang mm-anim d3" aria-label="語言切換">',
      '<span class="mm-kicker">Language</span>',
      '<button type="button" class="lang-btn is-active" data-lang-btn="zh">ZH</button>',
      '<button type="button" class="lang-btn" data-lang-btn="en">EN</button>',
      '<button type="button" class="lang-btn" data-lang-btn="ja">JP</button>',
      '</section>',
      '<div class="mm-cta mm-anim d4">',
      '<a href="booking.html" class="btn btn-primary" data-i18n="nav.book">預訂行程</a>',
      '</div>',
      '<button type="button" class="mm-exit" id="mobileMenuExit" aria-label="關閉選單">關閉</button>',
      '</div>'
    ].join('');
    return menu;
  }

  function bindDrawer(toggle, menu) {
    if (!toggle || !menu || toggle.dataset.hotelDrawerBound === 'true') return;
    toggle.dataset.hotelDrawerBound = 'true';

    var exit = menu.querySelector('#mobileMenuExit');
    var lastFocused = null;

    function setOpen(open) {
      if (open) {
        lastFocused = document.activeElement;
        menu.hidden = false;
        requestAnimationFrame(function () {
          menu.classList.add('is-open');
          toggle.classList.add('is-open');
          toggle.setAttribute('aria-expanded', 'true');
          toggle.setAttribute('aria-label', '關閉選單');
          document.body.classList.add('is-menu-open');
        });
      } else {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', '開啟選單');
        document.body.classList.remove('is-menu-open');
        window.setTimeout(function () {
          if (!menu.classList.contains('is-open')) menu.hidden = true;
        }, 420);
        if (lastFocused && lastFocused.focus) {
          try {
            lastFocused.focus({ preventScroll: true });
          } catch (_) {
            lastFocused.focus();
          }
        }
      }
    }

    toggle.addEventListener('click', function (event) {
      event.preventDefault();
      setOpen(!menu.classList.contains('is-open'));
    });

    if (exit && exit.dataset.hotelDrawerBound !== 'true') {
      exit.dataset.hotelDrawerBound = 'true';
      exit.addEventListener('click', function () { setOpen(false); });
    }

    menu.addEventListener('click', function (event) {
      var link = event.target.closest && event.target.closest('a');
      if (link && link.getAttribute('href') && link.getAttribute('href') !== '#') setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
    });

    var mq = window.matchMedia('(min-width: 769px)');
    function handleMq() {
      if (mq.matches && menu.classList.contains('is-open')) setOpen(false);
    }
    if (mq.addEventListener) mq.addEventListener('change', handleMq);
    else if (mq.addListener) mq.addListener(handleMq);
  }

  function initMobileDrawer() {
    var nav = document.querySelector('.nav');
    var navInner = document.querySelector('.nav-inner');
    if (!nav || !navInner) return;

    var toggle = document.getElementById('menuToggle');
    if (!toggle) {
      toggle = buildToggle();
      navInner.appendChild(toggle);
    }

    var menu = document.getElementById('mobileMenu');
    if (!menu) {
      menu = buildMenu();
      nav.insertAdjacentElement('afterend', menu);
    }

    bindDrawer(toggle, menu);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileDrawer);
  } else {
    initMobileDrawer();
  }
})();
