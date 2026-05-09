# Mobile Drawer Hotel Detail Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將 `rooms.html`、`booking.html`、`home-around-website-mockup-24.html` 的 768px mobile drawer 重構成與 `hotel-detail.html` 相同的視覺與互動樣式。

**Architecture:** `hotel-detail.html` 是唯一視覺基準；每個頁面只整理自己的 drawer CSS/HTML/JS，不抽動 drawer 以外的 nav、hero、form、card、footer、資料渲染或 chat widget。每完成一頁就提交、跑自檢、請使用者驗收，驗收通過後才進下一頁。

**Tech Stack:** 靜態 HTML、inline CSS、vanilla JavaScript、Git、Node.js one-off static checks、Codex in-app browser visual/e2e checks。

---

## Scope And Hard Rules

- 實際檔名是 `rooms.html`，不是 `room.html`。
- 執行順序固定：`rooms.html` -> `booking.html` -> `home-around-website-mockup-24.html`。
- 每個頁面只允許修改這些 drawer 相關區塊：
  - `.menu-toggle` button。
  - `#mobileMenu` aside。
  - `#mobileMenuExit` close button。
  - `.mobile-menu*`、`.mm-*`、`.menu-toggle*`、`body.is-menu-open` 相關 CSS。
  - 控制 drawer open/close 的 inline script。
- 禁止修改 drawer 以外的元素與行為：
  - `.nav-logo` 圖片來源與尺寸不因本計畫更動。
  - `.nav-links` 桌機連結內容不因本計畫更動。
  - hero、rooms cards、booking form、hotel detail content、footer、chat widget 不可改。
  - 不可改 `hotels-data.js`、`i18n.js`、`chat-booking-widget.js`。
- 每頁都要刪除被淘汰的舊 drawer CSS/HTML/JS，不能只靠新增 `!important` 補丁壓過舊程式碼。
- 每頁完成後必須跑靜態檢查與 in-app browser e2e 檢查，並停下等待使用者確認後才進下一頁。
- 視覺驗收標準：在 768px mobile drawer 開啟狀態下，背景色、blur、右上圓形 close/hamburger、內容 padding、字體層級、分隔線、動畫節奏，要和 `hotel-detail.html` 一致。

## File Structure

- Modify: `rooms.html`
  - 第一階段目標頁。
  - 刪掉舊版 homepage drawer CSS 與舊 controller。
  - 保留並整理成 hotel-detail drawer 的單一 CSS/JS 實作。
- Modify: `booking.html`
  - 第二階段目標頁。
  - 移除舊版 drawer head、舊 close button 文字樣式、舊 controller。
  - 套用與 `hotel-detail.html` 一致的 drawer visual contract。
- Modify: `home-around-website-mockup-24.html`
  - 第三階段目標頁。
  - 移除舊版 drawer 與 `ha-nav-repair` 造成的重複補丁。
  - 套用與 `hotel-detail.html` 一致的 drawer visual contract。
- Reference only: `hotel-detail.html`
  - 不修改。
  - 作為 canonical visual source。
- Do not modify: `hotels-data.js`、`i18n.js`、`chat-booking-widget.js`、`mor0bric-home-around-LOGO.png`、`photos/**`。

## Canonical Drawer Contract

所有目標頁完成後都要符合下面 contract。

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
        <li><a href="home-around-website-mockup-24.html">首頁</a></li>
        <li><a href="rooms.html">房型總覽</a></li>
        <li><a href="booking.html">預訂行程</a></li>
      </ul>
    </nav>
    <section class="mm-contact mm-anim d2">
      <p class="mm-kicker">Contact &amp; Hours</p>
      <dl>
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

頁面可以調整 `mm-nav-main` 的第一個連結以符合 active context：

```html
<!-- rooms.html -->
<li><a href="rooms.html">Rooms</a></li>

<!-- booking.html -->
<li><a href="booking.html">Booking</a></li>

<!-- home-around-website-mockup-24.html -->
<li><a href="home-around-website-mockup-24.html">Home</a></li>
```

所有目標頁的 drawer controller 最終只能有一份，行為如下：

```js
(function(){
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('mobileMenu');
  var exit = document.getElementById('mobileMenuExit');
  if (!toggle || !menu || toggle.dataset.hotelDrawerBound === 'true') return;
  toggle.dataset.hotelDrawerBound = 'true';

  var lastFocused = null;

  function setOpen(open) {
    if (open) {
      lastFocused = document.activeElement;
      menu.hidden = false;
      requestAnimationFrame(function(){
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
      window.setTimeout(function(){
        if (!menu.classList.contains('is-open')) menu.hidden = true;
      }, 420);
      if (lastFocused && lastFocused.focus) {
        try { lastFocused.focus({ preventScroll: true }); } catch (_) { lastFocused.focus(); }
      }
    }
  }

  toggle.addEventListener('click', function(event){
    event.preventDefault();
    setOpen(!menu.classList.contains('is-open'));
  });

  if (exit && exit.dataset.hotelDrawerBound !== 'true') {
    exit.dataset.hotelDrawerBound = 'true';
    exit.addEventListener('click', function(){ setOpen(false); });
  }

  menu.addEventListener('click', function(event){
    var a = event.target.closest('a');
    if (a && a.getAttribute('href') && a.getAttribute('href') !== '#') setOpen(false);
  });

  document.addEventListener('keydown', function(event){
    if (event.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
  });

  var mq = window.matchMedia('(min-width: 769px)');
  function handleMq(){
    if (mq.matches && menu.classList.contains('is-open')) setOpen(false);
  }
  if (mq.addEventListener) mq.addEventListener('change', handleMq);
  else if (mq.addListener) mq.addListener(handleMq);
})();
```

## Shared Verification Commands

每個 task 完成後都跑以下靜態檢查。

```powershell
@'
const fs = require('fs');
const vm = require('vm');
const pages = ['hotel-detail.html','rooms.html','booking.html','home-around-website-mockup-24.html'];
const failures = [];

for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
  scripts.forEach((match, index) => {
    const code = match[1].trim();
    if (!code) return;
    try {
      new vm.Script(code, { filename: `${page}:inline-script-${index + 1}` });
    } catch (error) {
      failures.push(`${page} inline script ${index + 1}: ${error.message}`);
    }
  });
}

for (const page of ['rooms.html','booking.html','home-around-website-mockup-24.html']) {
  const html = fs.readFileSync(page, 'utf8');
  const count = pattern => (html.match(pattern) || []).length;
  const hasRequired = [
    ['#menuToggle', /id="menuToggle"/],
    ['#mobileMenu', /id="mobileMenu"/],
    ['#mobileMenuExit', /id="mobileMenuExit"/],
    ['single controller guard', /dataset\.hotelDrawerBound/],
    ['hotel visual menu CSS', /background:\s*oklch\(28%\s+0\.022\s+60\s*\/\s*75%\)/],
    ['drawer blur', /backdrop-filter:\s*blur\(14px\)/],
  ];
  for (const [label, pattern] of hasRequired) {
    if (!pattern.test(html)) failures.push(`${page}: missing ${label}`);
  }
  if (count(/document\.getElementById\('menuToggle'\)|document\.getElementById\("menuToggle"\)/g) !== 1) {
    failures.push(`${page}: expected exactly one menuToggle controller lookup`);
  }
  if (count(/haMobileCloseFix|ha-mobile-close-fix/g) !== 0) {
    failures.push(`${page}: old close-fix shim remains`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('PASS drawer static checks');
'@ | node -
```

Expected: `PASS drawer static checks`

也跑 Git diff 範圍檢查。

```powershell
git diff --check
git diff -- rooms.html booking.html home-around-website-mockup-24.html
```

Expected:
- `git diff --check` exit code `0`。
- diff 只出現在 drawer CSS/HTML/JS 區塊。
- 不出現 hero、form、room card、footer、chat widget、資料陣列的 diff。

每頁的 browser e2e 檢查固定做：

```text
1. 用本機 server 或 file URL 開啟目標頁。
2. 將檢視寬度調到 768px 或使用 Codex app 中接近 768px 的 mobile pane。
3. 點右上角 hamburger。
4. 驗收開啟狀態：
   - drawer 覆蓋整個 viewport。
   - 背景為 hotel-detail.html 同款深咖啡透明霧面。
   - 右上 close 圓形按鈕位置、大小、線條與 hotel-detail.html 一致。
   - 內容從上方約 88px 開始，字級、分隔線、間距與 hotel-detail.html 一致。
   - body 不可捲動背景。
   - console error 為 0。
5. 按 Escape 關閉 drawer。
6. 再開一次 drawer，點 `#mobileMenuExit` 關閉。
7. 再開一次 drawer，點 drawer 內非 `#` 的連結，drawer 會關閉或進行正常導頁。
8. 切到 769px 以上，drawer 自動關閉，桌機 nav 恢復。
```

## Task 1: Refactor `rooms.html` Drawer

**Files:**
- Modify: `rooms.html`
- Reference: `hotel-detail.html`

- [ ] **Step 1: Record current drawer blocks**

Run:

```powershell
rg -n "mobile-menu|menu-toggle|mobileMenuExit|ha-hotel-detail-drawer-sync|haMobileCloseFix|ha-mobile-close-fix|dataset\\.hotelDrawerBound" rooms.html hotel-detail.html
```

Expected current findings before editing:
- `rooms.html` has old `.mobile-menu` / `.menu-toggle` CSS near the earlier drawer section.
- `rooms.html` has old controller around the `Mobile menu controller shared with the homepage layout` comment.
- `rooms.html` has `ha-hotel-detail-drawer-sync` CSS/JS later in the file.

- [ ] **Step 2: Write the failing static guard**

Run this before editing:

```powershell
@'
const fs = require('fs');
const html = fs.readFileSync('rooms.html', 'utf8');
const failures = [];
const count = pattern => (html.match(pattern) || []).length;
if (count(/document\.getElementById\('menuToggle'\)|document\.getElementById\("menuToggle"\)/g) !== 1) failures.push('rooms.html should have exactly one menuToggle controller lookup');
if (/Mobile menu controller shared with the homepage layout/.test(html)) failures.push('rooms.html old homepage drawer controller still exists');
if (/haMobileCloseFix|ha-mobile-close-fix/.test(html)) failures.push('rooms.html old close-fix shim still exists');
if (!/dataset\.hotelDrawerBound/.test(html)) failures.push('rooms.html canonical drawer guard missing');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('PASS rooms drawer guard');
'@ | node -
```

Expected before editing: command fails and reports old drawer duplication.

- [ ] **Step 3: Replace only the drawer HTML block**

In `rooms.html`, replace the current `<aside class="mobile-menu" id="mobileMenu" ...>` block only. Keep the surrounding nav, main content, filters, cards, footer, and scripts unchanged.

Use this page-specific drawer content:

```html
<aside class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="行動版選單" hidden>
  <div class="mobile-menu-inner">
    <nav class="mm-section mm-anim d1" aria-label="行動版主要導覽">
      <p class="mm-kicker">Navigation</p>
      <ul class="mm-nav-main">
        <li><a href="rooms.html">Rooms</a></li>
      </ul>
      <ul class="mm-nav-sub">
        <li><a href="home-around-website-mockup-24.html">首頁</a></li>
        <li><a href="rooms.html">房型總覽</a></li>
        <li><a href="booking.html">預訂行程</a></li>
      </ul>
    </nav>
    <section class="mm-contact mm-anim d2">
      <p class="mm-kicker">Contact &amp; Hours</p>
      <dl>
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

- [ ] **Step 4: Delete obsolete rooms drawer CSS and controller**

Delete these drawer-only parts from `rooms.html`:
- The older homepage-style `.menu-toggle`, `.mobile-menu`, `.mobile-menu-inner`, `.mobile-menu-head`, `.mm-*`, `#mobileMenuExit`, and mobile drawer `@media (max-width: 768px)` rules that appear before the nav markup.
- The script block headed by `Mobile menu controller shared with the homepage layout`.
- Any `haMobileCloseFix` / `ha-mobile-close-fix` shim if present.

Keep one final hotel-detail-compatible CSS block and one final hotel-detail-compatible controller. If `rooms.html` already has `ha-hotel-detail-drawer-sync`, rewrite that block so it is the single source of drawer styling and behavior.

- [ ] **Step 5: Run rooms guard and shared verification**

Run:

```powershell
@'
const fs = require('fs');
const html = fs.readFileSync('rooms.html', 'utf8');
const failures = [];
const count = pattern => (html.match(pattern) || []).length;
if (count(/document\.getElementById\('menuToggle'\)|document\.getElementById\("menuToggle"\)/g) !== 1) failures.push('rooms.html should have exactly one menuToggle controller lookup');
if (/Mobile menu controller shared with the homepage layout/.test(html)) failures.push('rooms.html old homepage drawer controller still exists');
if (/haMobileCloseFix|ha-mobile-close-fix/.test(html)) failures.push('rooms.html old close-fix shim still exists');
if (!/dataset\.hotelDrawerBound/.test(html)) failures.push('rooms.html canonical drawer guard missing');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('PASS rooms drawer guard');
'@ | node -
```

Expected after editing: `PASS rooms drawer guard`

Then run the shared static commands from this plan.

- [ ] **Step 6: Run rooms browser e2e**

Open `rooms.html` at 768px and compare open drawer against `hotel-detail.html`.

Expected:
- `rooms.html` drawer visually matches `hotel-detail.html`.
- `.room-card` count remains unchanged from before this task.
- Console error count is `0`.

- [ ] **Step 7: Commit rooms page**

Run:

```powershell
git add rooms.html
git commit -m "Refactor rooms mobile drawer"
```

- [ ] **Step 8: Stop for user acceptance**

Report the rooms result and wait for explicit user confirmation before starting Task 2.

## Task 2: Refactor `booking.html` Drawer

**Files:**
- Modify: `booking.html`
- Reference: `hotel-detail.html`

- [ ] **Step 1: Record current booking drawer blocks**

Run:

```powershell
rg -n "mobile-menu|menu-toggle|mobileMenuExit|haMobileCloseFix|ha-mobile-close-fix|dataset\\.hotelDrawerBound" booking.html hotel-detail.html
```

Expected current findings before editing:
- `booking.html` has a static `#mobileMenu` aside.
- `booking.html` has old homepage-style drawer CSS.
- `booking.html` has a controller near the booking success script area.

- [ ] **Step 2: Write the failing booking guard**

Run this before editing:

```powershell
@'
const fs = require('fs');
const html = fs.readFileSync('booking.html', 'utf8');
const failures = [];
const count = pattern => (html.match(pattern) || []).length;
if (count(/document\.getElementById\('menuToggle'\)|document\.getElementById\("menuToggle"\)/g) !== 1) failures.push('booking.html should have exactly one menuToggle controller lookup');
if (!/dataset\.hotelDrawerBound/.test(html)) failures.push('booking.html canonical drawer guard missing');
if (/haMobileCloseFix|ha-mobile-close-fix/.test(html)) failures.push('booking.html old close-fix shim remains');
if (!/background:\s*oklch\(28%\s+0\.022\s+60\s*\/\s*75%\)/.test(html)) failures.push('booking.html hotel drawer background missing');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('PASS booking drawer guard');
'@ | node -
```

Expected before editing: command fails because `dataset.hotelDrawerBound` is missing or old CSS remains.

- [ ] **Step 3: Replace only booking drawer HTML**

In `booking.html`, replace only the existing `#mobileMenu` aside with:

```html
<aside class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="行動版選單" hidden>
  <div class="mobile-menu-inner">
    <nav class="mm-section mm-anim d1" aria-label="行動版主要導覽">
      <p class="mm-kicker">Navigation</p>
      <ul class="mm-nav-main">
        <li><a href="booking.html">Booking</a></li>
      </ul>
      <ul class="mm-nav-sub">
        <li><a href="home-around-website-mockup-24.html">首頁</a></li>
        <li><a href="rooms.html">房型總覽</a></li>
        <li><a href="booking.html">預訂行程</a></li>
      </ul>
    </nav>
    <section class="mm-contact mm-anim d2">
      <p class="mm-kicker">Contact &amp; Hours</p>
      <dl>
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

- [ ] **Step 4: Delete obsolete booking drawer CSS and controller**

Delete the old `.mobile-menu-head`, old text close button styling, duplicate `.mobile-menu` rules, duplicate `.menu-toggle` rules, and the old controller block. Keep the booking form, submit button, success modal, margin fixes, footer, and chat widget untouched.

Insert or retain exactly one hotel-detail-compatible CSS block and one controller from the canonical contract.

- [ ] **Step 5: Run booking guard and shared verification**

Run:

```powershell
@'
const fs = require('fs');
const html = fs.readFileSync('booking.html', 'utf8');
const failures = [];
const count = pattern => (html.match(pattern) || []).length;
if (count(/document\.getElementById\('menuToggle'\)|document\.getElementById\("menuToggle"\)/g) !== 1) failures.push('booking.html should have exactly one menuToggle controller lookup');
if (!/dataset\.hotelDrawerBound/.test(html)) failures.push('booking.html canonical drawer guard missing');
if (/haMobileCloseFix|ha-mobile-close-fix/.test(html)) failures.push('booking.html old close-fix shim remains');
if (!/background:\s*oklch\(28%\s+0\.022\s+60\s*\/\s*75%\)/.test(html)) failures.push('booking.html hotel drawer background missing');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('PASS booking drawer guard');
'@ | node -
```

Expected after editing: `PASS booking drawer guard`

Then run the shared static commands from this plan.

- [ ] **Step 6: Run booking browser e2e**

Open `booking.html` at 768px and compare open drawer against `hotel-detail.html`.

Expected:
- `booking.html` drawer visually matches `hotel-detail.html`.
- Booking form layout and submit button are unchanged outside the drawer.
- Console error count is `0`.

- [ ] **Step 7: Commit booking page**

Run:

```powershell
git add booking.html
git commit -m "Refactor booking mobile drawer"
```

- [ ] **Step 8: Stop for user acceptance**

Report the booking result and wait for explicit user confirmation before starting Task 3.

## Task 3: Refactor `home-around-website-mockup-24.html` Drawer

**Files:**
- Modify: `home-around-website-mockup-24.html`
- Reference: `hotel-detail.html`

- [ ] **Step 1: Record current homepage drawer blocks**

Run:

```powershell
rg -n "mobile-menu|menu-toggle|mobileMenuExit|ha-nav-repair|haMobileCloseFix|ha-mobile-close-fix|dataset\\.hotelDrawerBound" home-around-website-mockup-24.html hotel-detail.html
```

Expected current findings before editing:
- `home-around-website-mockup-24.html` has a static drawer aside.
- `home-around-website-mockup-24.html` has older drawer CSS.
- `home-around-website-mockup-24.html` has `ha-nav-repair` logo repair code that must not become a drawer workaround.

- [ ] **Step 2: Write the failing homepage guard**

Run this before editing:

```powershell
@'
const fs = require('fs');
const html = fs.readFileSync('home-around-website-mockup-24.html', 'utf8');
const failures = [];
const count = pattern => (html.match(pattern) || []).length;
if (count(/document\.getElementById\('menuToggle'\)|document\.getElementById\("menuToggle"\)/g) !== 1) failures.push('home page should have exactly one menuToggle controller lookup');
if (!/dataset\.hotelDrawerBound/.test(html)) failures.push('home page canonical drawer guard missing');
if (/haMobileCloseFix|ha-mobile-close-fix/.test(html)) failures.push('home page old close-fix shim remains');
if (!/background:\s*oklch\(28%\s+0\.022\s+60\s*\/\s*75%\)/.test(html)) failures.push('home page hotel drawer background missing');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('PASS homepage drawer guard');
'@ | node -
```

Expected before editing: command fails because the page still has the old drawer implementation.

- [ ] **Step 3: Replace only homepage drawer HTML**

In `home-around-website-mockup-24.html`, replace only the existing `#mobileMenu` aside with:

```html
<aside class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="行動版選單" hidden>
  <div class="mobile-menu-inner">
    <nav class="mm-section mm-anim d1" aria-label="行動版主要導覽">
      <p class="mm-kicker">Navigation</p>
      <ul class="mm-nav-main">
        <li><a href="home-around-website-mockup-24.html">Home</a></li>
      </ul>
      <ul class="mm-nav-sub">
        <li><a href="home-around-website-mockup-24.html">首頁</a></li>
        <li><a href="rooms.html">房型總覽</a></li>
        <li><a href="booking.html">預訂行程</a></li>
      </ul>
    </nav>
    <section class="mm-contact mm-anim d2">
      <p class="mm-kicker">Contact &amp; Hours</p>
      <dl>
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

- [ ] **Step 4: Delete obsolete homepage drawer CSS and controller**

Delete only old drawer-related CSS and JS:
- Old `.mobile-menu` / `.menu-toggle` / `#mobileMenuExit` / `.mm-*` drawer CSS that predates the hotel-detail visual block.
- Old drawer controller around the `mobile menu controller` comments.
- Drawer-related duplicate rules in `ha-nav-repair` if they affect mobile drawer behavior.

Keep homepage hero carousel, hero thumbnails, search bar, room data render, logo repair for non-drawer nav, footer, and chat widget untouched.

- [ ] **Step 5: Run homepage guard and shared verification**

Run:

```powershell
@'
const fs = require('fs');
const html = fs.readFileSync('home-around-website-mockup-24.html', 'utf8');
const failures = [];
const count = pattern => (html.match(pattern) || []).length;
if (count(/document\.getElementById\('menuToggle'\)|document\.getElementById\("menuToggle"\)/g) !== 1) failures.push('home page should have exactly one menuToggle controller lookup');
if (!/dataset\.hotelDrawerBound/.test(html)) failures.push('home page canonical drawer guard missing');
if (/haMobileCloseFix|ha-mobile-close-fix/.test(html)) failures.push('home page old close-fix shim remains');
if (!/background:\s*oklch\(28%\s+0\.022\s+60\s*\/\s*75%\)/.test(html)) failures.push('home page hotel drawer background missing');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('PASS homepage drawer guard');
'@ | node -
```

Expected after editing: `PASS homepage drawer guard`

Then run the shared static commands from this plan.

- [ ] **Step 6: Run homepage browser e2e**

Open `home-around-website-mockup-24.html` at 768px and compare open drawer against `hotel-detail.html`.

Expected:
- Homepage drawer visually matches `hotel-detail.html`.
- Hero carousel and thumbnails still render.
- Search bar remains untouched.
- Console error count is `0`.

- [ ] **Step 7: Commit homepage page**

Run:

```powershell
git add home-around-website-mockup-24.html
git commit -m "Refactor homepage mobile drawer"
```

- [ ] **Step 8: Stop for user acceptance**

Report the homepage result and wait for explicit user confirmation before final cleanup.

## Task 4: Final Cross-Page Verification

**Files:**
- Verify only: `hotel-detail.html`
- Verify only: `rooms.html`
- Verify only: `booking.html`
- Verify only: `home-around-website-mockup-24.html`

- [ ] **Step 1: Run full static verification**

Run the shared static commands from this plan.

Expected:
- Inline scripts compile for all four pages.
- Each target page has exactly one drawer controller.
- No obsolete close-fix shim remains.
- `git diff --check` returns exit code `0`.

- [ ] **Step 2: Run four-page browser e2e**

At 768px, open and test:

```text
hotel-detail.html
rooms.html
booking.html
home-around-website-mockup-24.html
```

For each page:
- Open drawer.
- Compare visual result to `hotel-detail.html`.
- Close with Escape.
- Open again.
- Close with close button.
- Confirm console error count is `0`.

- [ ] **Step 3: Confirm no non-drawer changes**

Run:

```powershell
git diff main...HEAD -- rooms.html booking.html home-around-website-mockup-24.html
```

Expected:
- Diff only contains drawer CSS/HTML/JS removal and replacement.
- No unrelated text, layout, product content, data, image path, form field, footer, or chat widget change.

- [ ] **Step 4: Push branch**

Run:

```powershell
git push origin codex/mobile-drawer-refactor-plan
```

Expected:
- Remote branch is updated.

## Self-Review

- Spec coverage: plan covers stable main, branch work, no non-drawer edits, obsolete code removal, hotel-detail visual parity, ordered pages, e2e after each page, and user approval gates.
- Placeholder scan: this plan contains concrete file paths, snippets, commands, expected results, and stop points.
- Risk control: each page is isolated into its own task and commit; `rooms.html` goes first because it already has duplicate old/new drawer controllers.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-09-mobile-drawer-hotel-detail-refactor.md`.

Two execution options:

1. Subagent-Driven (recommended): dispatch a fresh subagent per page task, review between tasks, and stop for user acceptance after each page.
2. Inline Execution: execute one page task in this session, run checks, stop for user acceptance before continuing.

The next executable task is Task 1 for `rooms.html`.
