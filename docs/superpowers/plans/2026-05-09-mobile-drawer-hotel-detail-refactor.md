# Mobile Drawer Shared Runtime Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立一套共用 mobile drawer runtime，讓 `rooms.html`、`booking.html`、`home-around-website-mockup-24.html`、`hotel-detail.html` 的 768px mobile 導覽 drawer 使用同一份 JS/CSS，且視覺與目前 `hotel-detail.html` 一致。

**Architecture:** 新增 `mobile-drawer.css` 作為唯一 drawer 視覺來源，新增 `mobile-drawer.js` 作為唯一 drawer DOM/runtime 控制器。每個 HTML page 只保留 shared CSS/JS asset include；runtime 只生成/接管 mobile drawer，且四頁 drawer 主連結固定為 `<a href="rooms.html">Rooms</a>`。不得修改桌機 nav、hero、form、cards、footer、資料渲染或 chat widget。

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js one-off checks, Codex in-app browser e2e, Git.

---

## Hard Scope Rules

- 實際檔名是 `rooms.html`，不是 `room.html`。
- 執行順序固定：
  1. `rooms.html`
  2. `hotel-detail.html` drawer z-index checkpoint：只把現有基準頁 drawer 壓過 chat widget，不接 runtime。
  3. `booking.html`
  4. `home-around-website-mockup-24.html`
  5. `hotel-detail.html` 最後接入 runtime，作為回歸驗證。
- 每完成一個 page 就 commit、push、跑靜態檢查與 e2e，並停下等待使用者確認後才進下一個 page。
- 只允許修改 drawer 相關內容：
  - `#menuToggle`
  - `#mobileMenu`
  - `#mobileMenuExit`
  - `.mobile-menu*`
  - `.mm-*`
  - `.menu-toggle*`
  - `body.is-menu-open`
  - drawer open/close script
  - `mobile-drawer.css`
  - `mobile-drawer.js`
- 不允許修改：
  - desktop nav link text/order, except removing old mobile-only drawer markup from inside the page.
  - logo image path and size outside drawer runtime.
  - hero, search bar, room cards, booking form, hotel content, footer, chat widget.
  - `hotels-data.js`, `i18n.js`, `chat-booking-widget.js`, `photos/**`, `mor0bric-home-around-LOGO.png`.
- 被淘汰的 old drawer CSS/HTML/JS 必須刪除，不能靠堆疊 `!important` 互相覆蓋。

## Files

- Create: `mobile-drawer.css`
  - Sole shared CSS for mobile drawer visual.
  - Must match the current `hotel-detail.html` drawer style.
- Create: `mobile-drawer.js`
  - Sole shared runtime that creates `#menuToggle` and `#mobileMenu`, binds open/close/Escape/resize/link-close behavior.
  - Generates the same drawer on every page; the main navigation link is always `rooms.html` / `Rooms`.
- Modify: `rooms.html`
  - First runtime consumer.
  - Remove old mobile drawer inline CSS/HTML/JS.
  - Add config + shared CSS/JS includes.
- Modify later: `booking.html`
  - Second runtime consumer after hotel-detail z-index checkpoint approval.
- Modify later: `home-around-website-mockup-24.html`
  - Third runtime consumer after user approval.
- Modify checkpoint: `hotel-detail.html`
  - Before `booking.html`, raise only the existing drawer stacking layer above `chat-booking-widget.js` (`9998` launcher, `9999` panel).
- Modify later: `hotel-detail.html`
  - Final runtime consumer; visual must not regress.
- Modify: `docs/superpowers/plans/2026-05-09-mobile-drawer-hotel-detail-refactor.md`
  - Keep this execution plan aligned with the shared-runtime architecture.

## Runtime Contract

Each page will provide only the shared drawer CSS/JS assets:

```html
<link rel="stylesheet" href="mobile-drawer.css">
<script src="mobile-drawer.js"></script>
```

`mobile-drawer.js` must generate this structure:

```html
<button type="button" class="menu-toggle" id="menuToggle" aria-label="開啟選單" aria-expanded="false" aria-controls="mobileMenu">
  <span class="bar t"></span>
  <span class="bar m"></span>
  <span class="bar b"></span>
</button>

<aside class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="行動版選單" hidden>
  <div class="mobile-menu-inner">
    <nav class="mm-section mm-anim d1" aria-label="行動版主要導覽">
      <p class="mm-kicker">Navigation</p>
      <ul class="mm-nav-main">
        <li><a href="rooms.html">Rooms</a></li>
      </ul>
      <ul class="mm-nav-sub">
        <li><a href="#" data-i18n="nav.about">關於我們</a></li>
        <li><a href="#" data-i18n="nav.guide">景點攻略</a></li>
        <li><a href="#" data-i18n="nav.tickets">電子票券</a></li>
        <li><a href="#">最新消息</a></li>
        <li><a href="#" data-i18n="nav.stays">直營旅店</a></li>
        <li><a href="#" data-i18n="nav.partners">合作夥伴</a></li>
        <li><a href="#" data-i18n="nav.lookup">家天下台南行旅信託票券查詢</a></li>
        <li><a href="#" data-i18n="nav.contact">聯絡我們</a></li>
        <li><a href="#" data-i18n="nav.insurance">網路投保旅平險</a></li>
      </ul>
    </nav>
    <section class="mm-contact mm-anim d2">
      <p class="mm-kicker">Contact &amp; Hours</p>
      <dl>
        <dt>地址</dt><dd>高雄市鹽埕區河西路137號</dd>
        <dt>Phone</dt><dd><a href="tel:+88675337989">(07)533-7989</a></dd>
        <dt>Email</dt><dd><a href="mailto:b470125@yahoo.com.tw">b470125@yahoo.com.tw</a></dd>
        <dt>Hours</dt><dd>Open 24 hours</dd>
      </dl>
    </section>
    <section class="mm-lang mm-anim d3" aria-label="語言切換">
      <span class="mm-kicker">Language</span>
      <button type="button" class="lang-btn is-active" data-lang-btn="zh">ZH</button>
      <button type="button" class="lang-btn" data-lang-btn="en">EN</button>
      <button type="button" class="lang-btn" data-lang-btn="ja">JP</button>
    </section>
    <div class="mm-cta mm-anim d4">
      <a href="booking.html" class="btn btn-primary" data-i18n="nav.book">預訂行程</a>
    </div>
    <button type="button" class="mm-exit" id="mobileMenuExit" aria-label="關閉選單">關閉</button>
  </div>
</aside>
```

## Shared Static Test

Run after every page task:

```powershell
@'
const fs = require('fs');
const vm = require('vm');
const failures = [];
const pages = ['rooms.html','booking.html','home-around-website-mockup-24.html','hotel-detail.html'];

for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
  scripts.forEach((match, index) => {
    const code = match[1].trim();
    if (!code) return;
    try {
      new vm.Script(code, { filename: `${page}:inline-script-${index + 1}` });
    } catch (error) {
      failures.push(`${page}: inline script ${index + 1}: ${error.message}`);
    }
  });
}

for (const file of ['mobile-drawer.js']) {
  const js = fs.readFileSync(file, 'utf8');
  try {
    new vm.Script(js, { filename: file });
  } catch (error) {
    failures.push(`${file}: ${error.message}`);
  }
}

if (!fs.existsSync('mobile-drawer.css')) failures.push('missing mobile-drawer.css');
if (!fs.existsSync('mobile-drawer.js')) failures.push('missing mobile-drawer.js');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('PASS shared drawer static test');
'@ | node -
```

Expected: `PASS shared drawer static test`

## Task 1: Create Shared Runtime And Connect `rooms.html`

**Files:**
- Create: `mobile-drawer.css`
- Create: `mobile-drawer.js`
- Modify: `rooms.html`
- Modify: `docs/superpowers/plans/2026-05-09-mobile-drawer-hotel-detail-refactor.md`

- [ ] **Step 1: Write failing rooms runtime guard**

Run before implementation:

```powershell
@'
const fs = require('fs');
const failures = [];
const html = fs.readFileSync('rooms.html', 'utf8');

if (!fs.existsSync('mobile-drawer.css')) failures.push('missing mobile-drawer.css');
if (!fs.existsSync('mobile-drawer.js')) failures.push('missing mobile-drawer.js');
if (!/href="mobile-drawer\.css"/.test(html)) failures.push('rooms.html does not load mobile-drawer.css');
if (!/src="mobile-drawer\.js"/.test(html)) failures.push('rooms.html does not load mobile-drawer.js');
if (/<aside class="mobile-menu" id="mobileMenu"/.test(html)) failures.push('rooms.html still contains static mobile drawer HTML');
if (/Mobile menu controller shared with the homepage layout/.test(html)) failures.push('rooms.html still contains old drawer controller');
if (/ha-hotel-detail-drawer-sync/.test(html)) failures.push('rooms.html still contains temporary hotel-detail sync patch');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('PASS rooms runtime guard');
'@ | node -
```

Expected before implementation: command fails for missing shared assets and old rooms drawer code.

- [ ] **Step 2: Create `mobile-drawer.css`**

Create the shared CSS from the current `hotel-detail.html` drawer visual:

```css
@media (max-width: 768px) {
  body.is-menu-open { overflow: hidden; }
  .nav-inner { height: 72px; }
  .nav-logo img { height: 48px; }
  .nav-links,
  .nav-cta .nav-lang,
  .nav-cta .btn-primary { display: none !important; }
  .menu-toggle {
    display: inline-flex !important;
    position: fixed;
    top: 14px;
    right: 18px;
    z-index: 10020;
    width: 46px;
    height: 46px;
    align-items: center;
    justify-content: center;
    border: 1px solid color-mix(in oklch, var(--brown, #4b413b) 45%, transparent);
    border-radius: 999px;
    background: color-mix(in oklch, var(--bg, #f8f1e5) 88%, transparent);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    cursor: pointer;
  }
  .menu-toggle .bar {
    position: absolute;
    left: 12px;
    width: 20px;
    height: 1.5px;
    background: var(--brown, #4b413b);
    transition: transform .32s ease, opacity .2s ease, top .25s ease;
  }
  .menu-toggle .bar.t { top: 16px; }
  .menu-toggle .bar.m { top: 22px; }
  .menu-toggle .bar.b { top: 28px; }
  .menu-toggle.is-open { border-color: oklch(96% 0.012 80 / .28); background: transparent; }
  .menu-toggle.is-open .bar { background: oklch(96% 0.012 80); }
  .menu-toggle.is-open .bar.t { top: 22px; transform: rotate(45deg); }
  .menu-toggle.is-open .bar.m { opacity: 0; }
  .menu-toggle.is-open .bar.b { top: 22px; transform: rotate(-45deg); }
}

@media (min-width: 769px) {
  .menu-toggle,
  .mobile-menu { display: none !important; }
}

.menu-toggle,
.mobile-menu { display: none; }

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 10000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-12px);
  background: oklch(28% 0.022 60 / 75%);
  color: oklch(96% 0.012 80);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition: opacity .34s ease, transform .34s ease, visibility 0s linear .34s;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.mobile-menu.is-open {
  display: block;
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition: opacity .38s ease, transform .38s ease, visibility 0s linear 0s;
}

.mobile-menu-inner {
  min-height: 100%;
  padding: 88px clamp(22px, 6vw, 36px) 42px;
  display: grid;
  align-content: start;
  gap: 32px;
}

.mm-kicker {
  margin: 0 0 12px;
  font-family: var(--font-mono, ui-monospace, Menlo, monospace);
  font-size: 11px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: oklch(96% 0.012 80 / .58);
}

.mm-nav-main,
.mm-nav-sub {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mm-nav-main {
  display: grid;
  gap: 14px;
}

.mm-nav-main a {
  font-family: var(--font-display, Georgia, serif);
  font-size: clamp(34px, 10vw, 52px);
  line-height: 1;
  color: oklch(96% 0.012 80);
}

.mm-nav-sub {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid oklch(96% 0.012 80 / .16);
  display: grid;
  gap: 12px;
}

.mm-nav-sub a {
  font-size: 15px;
  color: oklch(96% 0.012 80 / .78);
}

.mm-contact {
  padding-top: 22px;
  border-top: 1px solid oklch(96% 0.012 80 / .16);
}

.mm-contact dl {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 10px 18px;
  margin: 0;
  font-size: 14px;
}

.mm-contact dt {
  font-family: var(--font-mono, ui-monospace, Menlo, monospace);
  font-size: 10.5px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: oklch(96% 0.012 80 / .55);
}

.mm-contact dd {
  margin: 0;
  color: oklch(96% 0.012 80 / .92);
}

.mm-lang {
  display: flex;
  gap: 14px;
  align-items: center;
  color: oklch(96% 0.012 80 / .65);
}

.mm-lang .lang-btn {
  color: inherit;
}

.mm-cta .btn {
  width: 100%;
  height: 56px;
  justify-content: center;
}

.mobile-menu .mm-anim {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity .45s ease, transform .45s cubic-bezier(.2,.7,.25,1.05);
}

.mobile-menu.is-open .mm-anim {
  opacity: 1;
  transform: translateY(0);
}

.mobile-menu.is-open .d1 { transition-delay: .08s; }
.mobile-menu.is-open .d2 { transition-delay: .14s; }
.mobile-menu.is-open .d3 { transition-delay: .20s; }
.mobile-menu.is-open .d4 { transition-delay: .26s; }
.mobile-menu.is-open .d5 { transition-delay: .32s; }

#mobileMenuExit {
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 10020;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid oklch(96% 0.012 80 / 0.34);
  background: oklch(96% 0.012 80 / 0.05);
  color: transparent;
  font-size: 0;
  line-height: 0;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
}

#mobileMenuExit::before,
#mobileMenuExit::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 18px;
  height: 1.5px;
  background: oklch(96% 0.012 80);
  transform-origin: center;
}

#mobileMenuExit::before { transform: translate(-50%, -50%) rotate(45deg); }
#mobileMenuExit::after { transform: translate(-50%, -50%) rotate(-45deg); }
#mobileMenuExit:hover {
  background: oklch(96% 0.012 80 / 0.12);
  border-color: oklch(96% 0.012 80 / 0.62);
  transform: rotate(90deg);
}
```

- [ ] **Step 3: Create `mobile-drawer.js`**

Create a runtime that:
- waits for `DOMContentLoaded` if needed.
- appends `#menuToggle` to `.nav-inner`.
- inserts `#mobileMenu` after `.nav`.
- always renders the main drawer link as `<a href="rooms.html">Rooms</a>`.
- does nothing if the elements already exist.
- has exactly one event binding guard using `dataset.hotelDrawerBound`.

- [ ] **Step 4: Connect `rooms.html` only**

In `rooms.html`:
- Add `<link rel="stylesheet" href="mobile-drawer.css">` after the main page styles.
- Add this before `</body>`:

```html
<script src="mobile-drawer.js"></script>
```

- Delete the static `<aside class="mobile-menu" id="mobileMenu" ...>` block.
- Delete old drawer-only inline CSS.
- Delete old drawer-only inline JS controller.
- Keep all non-drawer page logic unchanged.

- [ ] **Step 5: Run rooms guard**

Run the Step 1 guard again.

Expected after implementation: `PASS rooms runtime guard`

- [ ] **Step 6: Run static verification**

Run:

```powershell
git diff --check
```

Expected: exit code `0`.

Run the shared static test from this plan.

Expected: `PASS shared drawer static test`

- [ ] **Step 7: Run browser e2e for rooms**

At 768px:
- Open `rooms.html`.
- Confirm drawer visual matches `hotel-detail.html`.
- Confirm `.room-card` count remains `72`.
- Open drawer with hamburger.
- Close with Escape.
- Open drawer again.
- Close with `#mobileMenuExit`.
- Confirm console error count is `0`.

- [ ] **Step 8: Commit, push, and stop**

Run:

```powershell
git add docs/superpowers/plans/2026-05-09-mobile-drawer-hotel-detail-refactor.md mobile-drawer.css mobile-drawer.js rooms.html
git commit -m "Refactor rooms mobile drawer runtime"
git push origin codex/mobile-drawer-refactor-plan
```

Stop and wait for user acceptance before starting `booking.html`.

## Task 2: Raise `hotel-detail.html` Drawer Above Chat Widget

Do this only after user accepts Task 1.

**Files:**
- Modify: `hotel-detail.html`

Steps:
- Write and run this failing guard before editing:

```powershell
@'
const fs = require('fs');
const html = fs.readFileSync('hotel-detail.html', 'utf8');
const failures = [];
const zValues = [...html.matchAll(/z-index:\s*(\d+)/g)].map(m => Number(m[1]));
const menu = /\.mobile-menu\s*\{[\s\S]*?z-index:\s*(\d+)/.exec(html);
const close = /\.ha-mobile-close-fix\s*\{[\s\S]*?z-index:\s*(\d+)/.exec(html);
if (!menu || Number(menu[1]) <= 9999) failures.push('hotel-detail mobile-menu z-index must be above chat panel 9999');
if (!close || Number(close[1]) <= 9999) failures.push('hotel-detail close z-index must be above chat panel 9999');
if (Math.max(...zValues.filter(v => v > 9999)) < 10020) failures.push('hotel-detail drawer controls should include a 10020 z-index layer');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('PASS hotel-detail drawer z-index guard');
'@ | node -
```

Expected before editing: fails because `.mobile-menu` is still below chat.

- Change only drawer stacking CSS in `hotel-detail.html`:
  - `.menu-toggle` z-index: `10020`
  - `.mobile-menu` z-index: `10000`
  - keep `.ha-mobile-close-fix` z-index at `10020`
- Do not change `chat-booking-widget.js`.
- Do not change hotel content, nav links, hero/content sections, footer, or generated detail render.
- Run the z-index guard again.
- Run shared static test.
- Run hotel-detail browser e2e at 768px:
  - drawer opens.
  - chat launcher/panel no longer appears above drawer.
  - close button remains at current hotel-detail position and works.
  - console/runtime errors are `0`.
- Commit `Raise hotel detail drawer above chat`.
- Push and stop for user acceptance before starting `booking.html`.

## Task 3: Connect `booking.html`

Do this only after user accepts Task 2.

**Files:**
- Modify: `booking.html`

Steps:
- Add `mobile-drawer.css` include.
- Add `mobile-drawer.js`.
- Confirm the generated drawer main link remains `<a href="rooms.html">Rooms</a>`.
- Delete old booking static drawer HTML/CSS/JS.
- Run shared static test.
- Run booking browser e2e at 768px.
- Commit `Refactor booking mobile drawer runtime`.
- Push and stop for user acceptance.

## Task 4: Connect `home-around-website-mockup-24.html`

Do this only after user accepts Task 3.

**Files:**
- Modify: `home-around-website-mockup-24.html`

Steps:
- Add `mobile-drawer.css` include.
- Add `mobile-drawer.js`.
- Confirm the generated drawer main link remains `<a href="rooms.html">Rooms</a>`.
- Delete old homepage static drawer HTML/CSS/JS.
- Do not touch hero carousel, hero thumbnails, search bar, room sections, footer, or chat widget.
- Run shared static test.
- Run homepage browser e2e at 768px.
- Commit `Refactor homepage mobile drawer runtime`.
- Push and stop for user acceptance.

## Task 5: Connect `hotel-detail.html`

Do this only after user accepts Task 4.

**Files:**
- Modify: `hotel-detail.html`

Steps:
- Add `mobile-drawer.css` include.
- Add `mobile-drawer.js`.
- Confirm the generated drawer main link remains `<a href="rooms.html">Rooms</a>`.
- Delete old hotel-detail generated drawer CSS/JS and repair shim.
- Verify visual output remains the same as current hotel-detail baseline.
- Run shared static test.
- Run four-page browser e2e at 768px.
- Commit `Use shared mobile drawer on hotel detail`.
- Push branch.

## Final Acceptance

Before merge:

```powershell
git diff main...HEAD -- rooms.html booking.html home-around-website-mockup-24.html hotel-detail.html mobile-drawer.css mobile-drawer.js
```

Expected:
- Page diffs only remove old drawer code and add shared runtime config/includes.
- `mobile-drawer.css` contains the visual implementation.
- `mobile-drawer.js` contains the runtime implementation.
- No non-drawer page element is changed.

## Self-Review

- Spec coverage: shared JS runtime, shared CSS, four pages, strict no non-drawer edits, obsolete drawer code deletion, hotel-detail visual parity, page-by-page acceptance gates.
- Placeholder scan: no placeholders; all task commands and expected results are explicit.
- Risk control: rooms goes first because it currently has duplicate old/new drawer controllers; hotel-detail is migrated last to preserve the visual reference until the end.
