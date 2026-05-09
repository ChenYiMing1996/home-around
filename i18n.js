/* Home Around — i18n / 多語系字典與切換器
   ───────────────────────────────────────
   為何採單檔三語：file:// 協議下 fetch JSON 不穩，乾脆把字典全部塞進
   一個 JS 物件，瀏覽器直接吃 globals。切換時：
     1. 寫入 localStorage（key: 'home-around-lang'）
     2. 走訪 DOM 套用 data-i18n / data-i18n-attr-* 屬性
     3. 派發 'localechange' 事件 → 動態渲染頁面（hotel-detail / booking）重畫

   key 命名規約：scope.subscope.short  (例: nav.home / hero.headline.span1)
   保留原文 fallback：找不到 key 時回傳 key 本身，方便 debug。 */

(function (global) {
  'use strict';

  var STORAGE_KEY = 'home-around-lang';
  var DEFAULT_LANG = 'zh';
  var SUPPORTED = ['zh', 'en', 'ja'];

  // ── 三語字典 ────────────────────────────────────────────
  var DICT = {
    zh: {
      // ── NAV
      'nav.home': '首頁',
      'nav.about': '關於我們',
      'nav.guide': '景點攻略',
      'nav.tickets': '電子票券',
      'nav.news': '最新消息',
      'nav.stays': '直營旅店',
      'nav.partners': '合作夥伴',
      'nav.lookup': '家天下台南行旅信託票券查詢',
      'nav.contact': '聯絡我們',
      'nav.insurance': '網路投保旅平險',
      'nav.book': '立即訂房',
      'nav.lang.aria': '切換語言',
      // Booking.com 風格 nav（全語系統一英文）
      'bk.stays': 'Stays',
      'bk.flights': 'Flights',
      'bk.cars': 'Car rentals',
      'bk.attractions': 'Attractions',
      'bk.taxis': 'Airport taxis',

      // ── SPEC BAR
      'spec.label': 'SPEC',
      'spec.body': 'Home Around · Website 美術設定稿 · v2 · 33 hotels · 2026-05-04',
      'spec.ratio.label': 'RATIO',
      'spec.ratio.body': '60 warm-base · 20 brown · 10 teal · 7 yellow · 3 green',

      // ── HERO
      'hero.eyebrow': 'Spring 2026 · 春日限定旅程',
      'hero.headline.line1': '慢一點，',
      'hero.headline.line1em': '就到家了。',
      'hero.headline.line2': 'Home, around Taiwan.',
      'hero.headline.full': '慢一點， <em>就到家了。</em><br/>Home, around Taiwan.',
      'hero.sub': '從都會商旅到山中溫泉、海島民宿到老屋客棧 —— Home Around 集結全台 33 間直營旅店，一張精緻系列住宿券，走遍 13 縣市的慢步調台灣。',
      'hero.meta.coverage': '全島 13 縣市 · 33 間直營旅店',
      'hero.meta.voucher': '一張券通用 · 平假日彈性加價',
      'hero.viewLink': '查看此旅宿',
      'hero.dot.aria.prefix': '第',
      'hero.dot.aria.suffix': '張',
      'hero.aria': '飯店輪播',
      // hero 輪播 5 張對應 5 間飯店；標題格式：地點 — 飯店名
      'hero.room.0.loc': '台東綠島 · 海島晨光',
      'hero.room.0.room': '雙發飯店',
      'hero.room.1.loc': '台南玉井 · 寵物友善',
      'hero.room.1.room': '家天下行旅',
      'hero.room.2.loc': '宜蘭羅東 · 300 坪庭園',
      'hero.room.2.room': '蘭卡威庭園民宿',
      'hero.room.3.loc': '新竹尖石 · 山中泡湯',
      'hero.room.3.room': '朝日溫泉會館',
      'hero.room.4.loc': '墾丁南灣 · 海岸夕陽',
      'hero.room.4.room': '班卡拉',

      // ── SEARCH
      'search.aria': '搜尋空房',
      'search.where.label': '目的地 Where',
      'search.where.value': '花蓮 · 太魯閣',
      'search.where.placeholder': '(Hualien)',
      'search.checkin.label': '入住 Check-in',
      'search.checkin.value': '5 月 18 日 週一',
      'search.checkout.label': '退房 Check-out',
      'search.checkout.value': '5 月 21 日 週四',
      'search.guests.label': '人數 Guests',
      'search.guests.value': '2 大人 · 1 小孩',
      'search.cta': '查看空房',
      'search.where.any': '— 全部 33 間旅宿 —',
      'search.adults': '大人',
      'search.adults.sub': '12 歲以上',
      'search.kids': '兒童',
      'search.kids.sub': '12 歲以下',

      // ── VALUE STRIP
      'value.01.title': '33 間直營旅店 Hand-picked',
      'value.01.body': '從都會商旅、海岸民宿到山中溫泉會館 —— 13 縣市、6 種主題地理。',
      'value.02.title': '一張券通用 One Voucher',
      'value.02.body': '精緻系列住宿券平日多館不加價，假日依房型加價 600–2,800 元起。',
      'value.03.title': '家天下信託保障 Trust-protected',
      'value.03.body': '家天下台南行旅信託票券查詢專區，售出住宿券有信託資金保管。',

      // ── EDITOR'S PICK
      'pick.eyebrow': "Editor's pick · 編輯精選",
      'pick.h2.line1': '三間旅宿，',
      'pick.h2.line2': '三種放慢的方式。',
      'pick.h2.full': '三間旅宿，<br/>三種放慢的方式。',
      'pick.meta.line1': '從南灣海岸到山中泡湯、從寵物友善到 300 坪庭園 ——',
      'pick.meta.line2.b': '每一間都附在同一張精緻系列住宿券底下。',
      'pick.meta.full': '從南灣海岸到山中泡湯、從寵物友善到 300 坪庭園 ——<br/><b>每一間都附在同一張精緻系列住宿券底下。</b>',

      'pick.label.coast': '海岸推薦',
      'pick.label.family': '親子推薦',
      'pick.label.pet': '寵物友善',
      'pick.label.from': '住宿券 起 / from',
      'pick.label.perNight': '/晚',
      'pick.cta.view': '查看',

      'pick.bankala.loc': '屏東 · 恆春南灣 · Hengchun',
      'pick.bankala.name': '墾丁恆春班卡拉',
      'pick.bankala.en': 'Bankala · Hengchun, Kenting',
      'pick.bankala.tag1': '南灣海岸',
      'pick.bankala.tag2': '10 坪房型',
      'pick.bankala.tag3': '精緻系列',

      'pick.langkawi.loc': '宜蘭 · 羅東 · Luodong',
      'pick.langkawi.name': '蘭卡威庭園民宿',
      'pick.langkawi.en': 'Langkawi Garden B&B',
      'pick.langkawi.tag1': '300 坪庭園',
      'pick.langkawi.tag2': '兒童戲水池',
      'pick.langkawi.tag3': '免費接駁',

      'pick.yujing.loc': '台南 · 玉井 · Yujing',
      'pick.yujing.name': '台南玉井家天下行旅',
      'pick.yujing.en': 'Jiatianxia Inn · Yujing',
      'pick.yujing.tag1': '寵物友善',
      'pick.yujing.tag2': '慢遊小鎮',
      'pick.yujing.tag3': '精緻系列',

      // ── ALL STAYS
      'all.eyebrow': 'Direct stays · 直營旅店',
      'all.h2.line1': '13 縣市 · 33 間。',
      'all.h2.line2': '用一張券走遍台灣。',
      'all.h2.full': '13 縣市 · 33 間。<br/>用一張券走遍台灣。',
      'all.meta.line1': '本頁所有飯店皆為 Home Around',
      'all.meta.b': '精緻系列住宿券',
      'all.meta.line2.suffix': '適用館，',
      'all.meta.line3': '平日／假日依房型加價，售出後一年內彈性使用。',
      'all.meta.full': '本頁所有飯店皆為 Home Around <b>精緻系列住宿券</b> 適用館，<br/>平日／假日依房型加價，售出後一年內彈性使用。',
      'all.cta': '查看完整館列表 · See all 33 stays',
      'all.badge.family': '親子／寵物',
      'all.badge.spring': '溫泉',
      'all.badge.coast': '海景',

      // ── FAMILY SECTION
      'family.eyebrow': 'Family-friendly stays',
      'family.h2.line1': '帶著孩子，',
      'family.h2.line2': '也能慢慢來。',
      'family.h2.full': '帶著孩子，<br/>也能慢慢來。',
      'family.pull.full': '「300 坪庭園、<br/>兒童戲水池。」<br/><span style="font-size:13px; font-family: var(--font-mono); letter-spacing:0.1em; opacity:0.85; display:block; margin-top:14px;">— 蘭卡威庭園民宿 · 宜蘭羅東</span>',
      'family.lede': '全台 33 間旅宿中，有 4 間特別適合一家人 —— 蘭卡威庭園的兒童戲水池、玉井家天下的寵物友善、君迪商旅的免費停車與兒童不收費、藍衫海景的海岸假期。',
      'family.body': '每間旅宿用同一張<b>精緻系列住宿券</b>適用，雙人房平日多半不加價、四人家庭房依館加價 700–1300 元起。有些館 110 公分以下兒童免費，有些另計加床費，詳情請點開個別飯店頁面看清楚。',
      'family.badge': 'Family · 親子',
      'family.pull.line1': '「300 坪庭園、',
      'family.pull.line2': '兒童戲水池。」',
      'family.pull.attribution': '— 蘭卡威庭園民宿 · 宜蘭羅東',
      'family.stat1.num': '4',
      'family.stat1.unit': '+',
      'family.stat1.body.line1': '標籤親子／寵物友善的',
      'family.stat1.body.line2': '直營旅店',
      'family.stat2.num': '110',
      'family.stat2.unit': 'cm',
      'family.stat2.body.line1': '多館設定為',
      'family.stat2.body.line2': '兒童不收費身高',
      'family.stat3.num': '1',
      'family.stat3.unit': '券',
      'family.stat3.body.line1': '33 間皆通用',
      'family.stat3.body.line2': '精緻系列',

      // ── EXPERIENCES
      'exp.eyebrow': 'Local experiences · 在地體驗',
      'exp.h2.line1': '不只訂房，',
      'exp.h2.line2': '也是一段在地的時間。',
      'exp.h2.full': '不只訂房，<br/>也是一段在地的時間。',
      'exp.meta.line1': '每間旅宿都坐落在不同地理 ——',
      'exp.meta.line2.b': '點圖直達該館頁面，看房型、價格與在地交通。',
      'exp.meta.full': '每間旅宿都坐落在不同地理 ——<br/><b>點圖直達該館頁面，看房型、價格與在地交通。</b>',
      'exp.b1.kicker': '花蓮市區 · 太魯閣 30 分鐘車程',
      'exp.b1.title': '花蓮市區香城大飯店 · 商旅級住宿，免費停車',
      'exp.b2.kicker': '台南玉井 · 寵物友善',
      'exp.b2.title': '玉井家天下行旅',
      'exp.b3.kicker': '宜蘭冬山 · 田野生活',
      'exp.b3.title': '雙黃蛋生活空間民宿',
      'exp.b4.kicker': '墾丁南灣 · 海岸 3 分鐘',
      'exp.b4.title': '墾丁恆春班卡拉 · 海岸假期',
      'exp.b5.kicker': '南投鹿谷 · 凍頂茶鄉',
      'exp.b5.title': '鹿鼎莊 · 加贈兩客晚餐',

      // ── TRUST
      'trust.lead.b': '選擇 Home Around 的理由',
      'trust.lead.body': '2021 年起，從花東到金馬澎、從都會到山中、從寵物友善到主題溫泉 —— 全台 33 間直營旅店，一張券走得完。',
      'trust.stat1.label': '直營旅店',
      'trust.stat2.label': '縣市覆蓋',
      'trust.stat3.label': '張券通用',
      'trust.stat4.label': '天彈性使用',

      // ── NEWSLETTER
      'news.eyebrow': 'Slow letter · 月信',
      'news.h2.line1': '每月一封，',
      'news.h2.line2': '關於台灣旅宿的慢信。',
      'news.h2.full': '每月一封，<br/>關於台灣旅宿的慢信。',
      'news.body': '新開放的旅宿、季節限定的體驗、編輯室的小發現 —— 每月一封，週日早晨送達。隨時可以取消。',
      'news.email.placeholder': '你的 Email · your@email.com',
      'news.cta': '訂閱',
      'news.fine': '不會轉發。不會打擾。NO SPAM. 隨時退訂。',

      // ── FOOTER
      'foot.tag': '慢一點，就到家了。',
      'foot.tag2': 'Hand-picked stays and slow experiences across Taiwan, since 2021.',
      'foot.col1.h': '探索 Discover',
      'foot.col1.li1': '所有旅宿',
      'foot.col1.li2': '親子家庭',
      'foot.col1.li3': '在地體驗',
      'foot.col1.li4': '每月編輯精選',
      'foot.col1.li5': '優惠專區',
      'foot.col2.h': '協助 Support',
      'foot.col2.li1': '常見問題',
      'foot.col2.li2': '取消與退款',
      'foot.col2.li3': '聯絡我們',
      'foot.col2.li4': '旅宿合作申請',
      'foot.col3.h': '關於 About',
      'foot.col3.li1': '編輯團隊',
      'foot.col3.li2': '嚴選原則',
      'foot.col3.li3': '媒體報導',
      'foot.col3.li4': '隱私權政策',
      'foot.col3.li5': '使用條款',
      'foot.copy': '© 2026 HOME AROUND TAIWAN TOURS · 統一編號 12345678',
      'foot.made': 'MADE WITH 慢慢來 · IN TAIPEI',

      // ── ROOMS PAGE (房型挑選頁)
      'rooms.demo.label': 'DEMO',
      'rooms.demo.body': '本頁為示意稿，所有房型圖片以漸層色塊代替；點擊「選擇此房型」進入訂房表單。',
      'rooms.crumb': '選擇房型',
      'rooms.heading': '符合條件的房型',
      'rooms.sub': '依入住期間、人數與目的地，列出符合條件的房型與即時試算的住宿券價格。',
      'rooms.legend': '每張券基本價 NT$2,800／晚 · 加價依房型平假日另計',
      'rooms.editSearch': '回首頁',
      'rooms.modifySearch': '修改搜尋',
      'rooms.chip.where': '目的地',
      'rooms.chip.dates': '入住期間',
      'rooms.chip.guests': '入住人數',
      'rooms.chip.hotel.any': '全部 33 間旅宿',
      'rooms.nights': '晚',
      'rooms.count': '為您找到 {n} 種符合條件的房型',
      'rooms.empty.title': '沒有完全符合的房型',
      'rooms.empty.body': '您的人數可能超過此館房型上限。試試減少人數，或回首頁挑其他旅宿。',
      'rooms.feature.capacity': '可容納',
      'rooms.feature.people': '人',
      'rooms.feature.series': '精緻系列住宿券',
      'rooms.feature.nights': '晚',
      'rooms.bd.weekday': '平日 +{add} × {n} 晚',
      'rooms.bd.weekend': '假日 +{add} × {n} 晚',
      'rooms.bd.package': '假日 {note} (此期間不可訂)',
      'rooms.bd.voucherCount': '使用券',
      'rooms.bd.vouchers': '張',
      'rooms.from': '住宿券總計 / total',
      'rooms.forStay': '已含 {n} 晚加價',
      'rooms.priceUnavailable': '此期間不可訂',
      'rooms.cta.select': '選擇此房型',
      'rooms.cta.unavailable': '請改期或聯絡客服',

      // ── HOTEL DETAIL PAGE
      'hd.bc.notFound': '載入中…',
      'hd.err.h1': '找不到這間旅宿',
      'hd.err.body': '網址中的 id 可能不正確。請回到首頁重新選擇。',
      'hd.err.back': '回首頁',
      'hd.bc.notFound.title': '找不到旅宿',
      'hd.gallery.label': '主視覺',
      'hd.section.rooms': '房型與價格 Room types · pricing',
      'hd.section.rooms.intro': '本價格為「精緻系列住宿券」加價金額。基本住宿券為每晚 NT$2,800 起，依房型／平假日加價。',
      'hd.section.notes': '注意事項 Notes',
      'hd.section.seasonal': '季節說明 Seasonal Pricing',
      'hd.section.transit': '交通方式 Getting there',
      'hd.section.location': '位置 Location',
      'hd.related.h': '你可能也喜歡 You may also like',
      'hd.weekday': '平日 Weekday',
      'hd.weekend': '假日 Weekend',
      'hd.noAdd': '不加價',
      'hd.room.book': '預訂此房型 Reserve →',
      'hd.from': '平日 雙人房 起 / from',
      'hd.perNight': '/晚',
      'hd.contact.phone': '訂房電話 Phone',
      'hd.contact.hours': '訂房時段 Hours',
      'hd.contact.address': '館址 Address',
      'hd.book.now': '立即訂房 Book now →',
      'hd.fb': 'FB 諮詢',
      'hd.line': 'LINE 客服',
      'hd.map.fallback': '在 Google Maps 開啟完整地圖',
      'hd.notesNotice': '（以下為原文）',

      // ── BOOKING PAGE
      'bk.title': '訂房 Booking — Home Around Taiwan Tours',
      'bk.h1.line1': '選擇你的旅宿，',
      'bk.h1.line2': '我們替你保留好房間。',
      'bk.h1.full': '選擇你的旅宿，<br/>我們替你保留好房間。',
      'bk.demo.label': 'DEMO',
      'bk.demo.body': '此頁為 demo 流程，訂房需求送出後不會建立實際訂單。',
      'bk.section.stay': '住宿資訊',
      'bk.field.hotel': '旅宿 Hotel',
      'bk.field.hotel.placeholder': '請選擇旅宿',
      'bk.field.room': '房型 Room type',
      'bk.field.room.placeholder': '請先選擇旅宿',
      'bk.field.checkin': '入住日期 Check-in',
      'bk.field.checkout': '退房日期 Check-out',
      'bk.field.adults': '大人 Adults',
      'bk.field.children': '兒童 Children',
      'bk.field.children.hint': '(110cm 以下免費)',
      'bk.field.voucher': '票券 Voucher',
      'bk.voucher.aria': '票券種類',
      'bk.voucher.refined': '精緻系列',
      'bk.voucher.boutique': '精品系列',
      'bk.voucher.cash': '現金訂房',
      'bk.section.contact': '聯絡資訊',
      'bk.field.name': '主訂房人 Name',
      'bk.field.name.placeholder': '王小明',
      'bk.field.phone': '電話 Phone',
      'bk.field.phone.placeholder': '0912-345-678',
      'bk.field.email': 'Email',
      'bk.field.email.placeholder': 'you@example.com',
      'bk.field.notes': '備註 Notes',
      'bk.field.notes.placeholder': '例如：希望高樓層、攜帶寵物（玉井家天下／藍衫海景／墾丁班卡拉等寵物友善館）、需要嬰兒床…',
      'bk.submit': '送出訂房需求',
      'bk.aria.minus': '減少',
      'bk.aria.plus': '增加',
      'bk.summary.title': '訂單摘要',
      'bk.summary.empty': '請先選擇旅宿。',
      'bk.summary.base': '基本住宿券 / 每晚',
      'bk.summary.weekday': '平日加價',
      'bk.summary.weekend': '假日加價',
      'bk.summary.nights': '晚',
      'bk.summary.subtotal': '小計 Subtotal',
      'bk.summary.note': '送出後家天下客服會於工作日 12 小時內回覆並協助確認訂單。',
      'bk.success.h1': '謝謝你，{name}。',
      'bk.success.lead': '我們已收到你的訂房需求，會於工作日 12 小時內以電話或 LINE 與你確認訂單。',
      'bk.success.orderId': '訂單編號 Order ID',
      'bk.success.next.h': '接下來會發生什麼？ Next steps',
      'bk.success.step1': '客服將於 12 小時內聯繫你確認房況。',
      'bk.success.step2': '確認後我們會傳送 LINE 訊息給你，內含飯店聯絡方式。',
      'bk.success.step3': '入住當天請於櫃台出示訂單編號即可 check-in。',
      'bk.success.cta.home': '回首頁 Home',
      'bk.success.cta.hotel': '查看此旅宿 ',

      // ── HOTEL TAGS
      'tag.寵物友善': '寵物友善',
      'tag.精緻系列': '精緻系列',
      'tag.精品系列': '精品系列',
      'tag.市區': '市區',
      'tag.市中心': '市中心',
      'tag.免費停車': '免費停車',
      'tag.精品民宿': '精品民宿',
      'tag.溫泉': '溫泉',
      'tag.海景': '海景',
      'tag.海岸': '海岸',
      'tag.離島': '離島',
      'tag.親子': '親子',
      'tag.家庭': '家庭',
      'tag.湖景': '湖景',
      'tag.捷運': '捷運',
      'tag.機場 10 分鐘': '機場 10 分鐘',
      'tag.溫泉會館': '溫泉會館',
      'tag.山中': '山中',
      'tag.300 坪庭園': '300 坪庭園',

      // ── REGION
      'region.台南': '台南',
      'region.花蓮': '花蓮',
      'region.澎湖': '澎湖',
      'region.金門': '金門',
      'region.新北': '新北',
      'region.屏東': '屏東',
      'region.南投': '南投',
      'region.嘉義': '嘉義',
      'region.宜蘭': '宜蘭',
      'region.台北': '台北',
      'region.新竹': '新竹',
      'region.高雄': '高雄',
      'region.台東': '台東'
    },

    en: {
      // ── NAV
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.guide': 'Travel Guide',
      'nav.tickets': 'E-Tickets',
      'nav.news': 'News',
      'nav.stays': 'Our Stays',
      'nav.partners': 'Partners',
      'nav.lookup': 'Voucher Lookup',
      'nav.contact': 'Contact',
      'nav.insurance': 'Travel Insurance',
      'nav.book': 'Book Now',
      'nav.lang.aria': 'Switch language',
      // Booking.com style nav (English-only across locales)
      'bk.stays': 'Stays',
      'bk.flights': 'Flights',
      'bk.cars': 'Car rentals',
      'bk.attractions': 'Attractions',
      'bk.taxis': 'Airport taxis',

      // ── SPEC BAR
      'spec.label': 'SPEC',
      'spec.body': 'Home Around · Website mockup · v2 · 33 hotels · 2026-05-04',
      'spec.ratio.label': 'RATIO',
      'spec.ratio.body': '60 warm-base · 20 brown · 10 teal · 7 yellow · 3 green',

      // ── HERO
      'hero.eyebrow': 'Spring 2026 · A slow-paced spring journey',
      'hero.headline.line1': 'Slow down,',
      'hero.headline.line1em': "you're home.",
      'hero.headline.line2': 'Home, around Taiwan.',
      'hero.headline.full': 'Slow down, <em>you’re home.</em><br/>Home, around Taiwan.',
      'hero.sub': 'From city business hotels to mountain hot springs, island B&Bs to old-house inns — Home Around brings together 33 directly-operated stays across Taiwan. One voucher, 13 counties, slow travel done right.',
      'hero.meta.coverage': '13 counties · 33 hand-picked stays',
      'hero.meta.voucher': 'One voucher · weekday/weekend flexible add-on',
      'hero.viewLink': 'View this stay',
      'hero.dot.aria.prefix': 'Slide ',
      'hero.dot.aria.suffix': '',
      'hero.aria': 'Hotel carousel',
      'hero.room.0.loc': 'Lyudao, Taitung · Island morning',
      'hero.room.0.room': 'Shuang Fa Hotel',
      'hero.room.1.loc': 'Yujing, Tainan · Pet-friendly',
      'hero.room.1.room': 'Jiatianxia Inn',
      'hero.room.2.loc': 'Luodong, Yilan · 300-pyeong garden',
      'hero.room.2.room': 'Langkawi Garden B&B',
      'hero.room.3.loc': 'Jianshi, Hsinchu · Mountain hot spring',
      'hero.room.3.room': 'Asahi Hot Spring',
      'hero.room.4.loc': 'South Bay, Kenting · Sunset coast',
      'hero.room.4.room': 'Bankala',

      // ── SEARCH
      'search.aria': 'Search availability',
      'search.where.label': 'Where',
      'search.where.value': 'Hualien · Taroko',
      'search.where.placeholder': '',
      'search.checkin.label': 'Check-in',
      'search.checkin.value': 'Mon, May 18',
      'search.checkout.label': 'Check-out',
      'search.checkout.value': 'Thu, May 21',
      'search.guests.label': 'Guests',
      'search.guests.value': '2 adults · 1 child',
      'search.cta': 'Search',
      'search.where.any': '— All 33 stays —',
      'search.adults': 'Adults',
      'search.adults.sub': 'Age 12+',
      'search.kids': 'Children',
      'search.kids.sub': 'Under 12',

      // ── VALUE STRIP
      'value.01.title': '33 Hand-picked stays',
      'value.01.body': 'From city hotels and coastal B&Bs to mountain hot-spring resorts — 13 counties, 6 themed geographies.',
      'value.02.title': 'One voucher, all hotels',
      'value.02.body': 'Refined-series voucher: most weekday rooms have no add-on; weekends add NT$600–2,800 by room type.',
      'value.03.title': 'Trust-protected vouchers',
      'value.03.body': 'Jiatianxia Tainan voucher trust lookup — sold vouchers backed by escrow protection.',

      // ── EDITOR'S PICK
      'pick.eyebrow': "Editor's pick",
      'pick.h2.line1': 'Three stays,',
      'pick.h2.line2': 'three ways to slow down.',
      'pick.h2.full': 'Three stays,<br/>three ways to slow down.',
      'pick.meta.line1': 'From the South Bay coast to mountain hot springs, pet-friendly B&Bs to a 300-pyeong garden —',
      'pick.meta.line2.b': 'all under the same Refined-series voucher.',
      'pick.meta.full': 'From the South Bay coast to mountain hot springs, pet-friendly B&amp;Bs to a 300-pyeong garden —<br/><b>all under the same Refined-series voucher.</b>',

      'pick.label.coast': 'Coastal pick',
      'pick.label.family': 'Family pick',
      'pick.label.pet': 'Pet-friendly',
      'pick.label.from': 'Voucher from',
      'pick.label.perNight': '/night',
      'pick.cta.view': 'View',

      'pick.bankala.loc': 'Pingtung · Hengchun South Bay',
      'pick.bankala.name': 'Bankala · Hengchun, Kenting',
      'pick.bankala.en': 'Bankala B&B',
      'pick.bankala.tag1': 'South Bay coast',
      'pick.bankala.tag2': '10-pyeong rooms',
      'pick.bankala.tag3': 'Refined series',

      'pick.langkawi.loc': 'Yilan · Luodong',
      'pick.langkawi.name': 'Langkawi Garden B&B',
      'pick.langkawi.en': 'Yilan Luodong',
      'pick.langkawi.tag1': '300-pyeong garden',
      'pick.langkawi.tag2': "Kids' splash pool",
      'pick.langkawi.tag3': 'Free shuttle',

      'pick.yujing.loc': 'Tainan · Yujing',
      'pick.yujing.name': 'Jiatianxia Inn · Yujing',
      'pick.yujing.en': 'Tainan, Pet-friendly',
      'pick.yujing.tag1': 'Pet-friendly',
      'pick.yujing.tag2': 'Slow-town getaway',
      'pick.yujing.tag3': 'Refined series',

      // ── ALL STAYS
      'all.eyebrow': 'Direct stays',
      'all.h2.line1': '13 counties · 33 stays.',
      'all.h2.line2': 'Travel Taiwan with one voucher.',
      'all.h2.full': '13 counties · 33 stays.<br/>Travel Taiwan with one voucher.',
      'all.meta.line1': 'Every stay below is included in the Home Around',
      'all.meta.b': 'Refined-series voucher',
      'all.meta.line2.suffix': ' program —',
      'all.meta.line3': 'flexible weekday/weekend add-ons, valid for one year after purchase.',
      'all.meta.full': 'Every stay below is included in the Home Around <b>Refined-series voucher</b> program —<br/>flexible weekday/weekend add-ons, valid for one year after purchase.',
      'all.cta': 'See all 33 stays',
      'all.badge.family': 'Family / Pet',
      'all.badge.spring': 'Hot spring',
      'all.badge.coast': 'Sea view',

      // ── FAMILY SECTION
      'family.eyebrow': 'Family-friendly stays',
      'family.h2.line1': 'Slow travel,',
      'family.h2.line2': 'with kids in tow.',
      'family.h2.full': 'Slow travel,<br/>with kids in tow.',
      'family.pull.full': '“300-pyeong garden,<br/>kids’ splash pool.”<br/><span style="font-size:13px; font-family: var(--font-mono); letter-spacing:0.1em; opacity:0.85; display:block; margin-top:14px;">— Langkawi Garden B&amp;B · Yilan Luodong</span>',
      'family.lede': "Out of 33 stays, 4 are especially good for families — Langkawi Garden's kids' splash pool, Yujing Jiatianxia's pet-friendly rooms, Junde's free parking and free child stays, and Lanshan's coastal escape.",
      'family.body': "Every stay is covered by the same <b>Refined-series voucher</b>. Most weekday double rooms have no add-on; family rooms add NT$700–1,300 by hotel. Some stays are free for kids under 110 cm; others charge a small extra-bed fee — check each hotel's page for details.",
      'family.badge': 'Family',
      'family.pull.line1': "“300-pyeong garden,",
      'family.pull.line2': "kids' splash pool.”",
      'family.pull.attribution': '— Langkawi Garden B&B · Yilan Luodong',
      'family.stat1.num': '4',
      'family.stat1.unit': '+',
      'family.stat1.body.line1': 'Family / pet-friendly',
      'family.stat1.body.line2': 'tagged stays',
      'family.stat2.num': '110',
      'family.stat2.unit': 'cm',
      'family.stat2.body.line1': 'Many hotels: free for',
      'family.stat2.body.line2': 'kids under this height',
      'family.stat3.num': '1',
      'family.stat3.unit': 'voucher',
      'family.stat3.body.line1': 'Works at all 33',
      'family.stat3.body.line2': 'Refined-series stays',

      // ── EXPERIENCES
      'exp.eyebrow': 'Local experiences',
      'exp.h2.line1': "Not just a room,",
      'exp.h2.line2': 'a piece of local time.',
      'exp.h2.full': 'Not just a room,<br/>a piece of local time.',
      'exp.meta.line1': 'Every stay sits in a different geography —',
      'exp.meta.line2.b': 'tap any tile to see rooms, prices and getting-there.',
      'exp.meta.full': 'Every stay sits in a different geography —<br/><b>tap any tile to see rooms, prices and getting-there.</b>',
      'exp.b1.kicker': 'Hualien city · 30 min to Taroko',
      'exp.b1.title': 'Hualien Charming City Hotel · business-class, free parking',
      'exp.b2.kicker': 'Yujing, Tainan · pet-friendly',
      'exp.b2.title': 'Jiatianxia Inn',
      'exp.b3.kicker': 'Dongshan, Yilan · field life',
      'exp.b3.title': 'Double-Yolk B&B',
      'exp.b4.kicker': 'Kenting South Bay · 3 min to coast',
      'exp.b4.title': 'Bankala · coastal getaway',
      'exp.b5.kicker': 'Luguo, Nantou · Dongding tea country',
      'exp.b5.title': 'Luding Resort · two complimentary dinners',

      // ── TRUST
      'trust.lead.b': 'Why choose Home Around',
      'trust.lead.body': 'Since 2021 — from Hualien-Taitung to Kinmen-Matsu-Penghu, city stays to mountain retreats, pet-friendly to themed hot springs. 33 directly-operated stays, one voucher does it all.',
      'trust.stat1.label': 'Direct stays',
      'trust.stat2.label': 'Counties covered',
      'trust.stat3.label': 'Universal voucher',
      'trust.stat4.label': 'Days of flexibility',

      // ── NEWSLETTER
      'news.eyebrow': 'Slow letter',
      'news.h2.line1': 'One slow letter,',
      'news.h2.line2': 'every month.',
      'news.h2.full': 'One slow letter,<br/>every month.',
      'news.body': 'New stays, seasonal experiences, the editor’s small finds — one letter a month, delivered Sunday morning. Unsubscribe anytime.',
      'news.email.placeholder': 'Your email · you@email.com',
      'news.cta': 'Subscribe',
      'news.fine': 'NO SPAM. No forwarding. Unsubscribe anytime.',

      // ── FOOTER
      'foot.tag': 'Slow down, you’re home.',
      'foot.tag2': 'Hand-picked stays and slow experiences across Taiwan, since 2021.',
      'foot.col1.h': 'Discover',
      'foot.col1.li1': 'All stays',
      'foot.col1.li2': 'Family-friendly',
      'foot.col1.li3': 'Local experiences',
      'foot.col1.li4': "Editor's monthly pick",
      'foot.col1.li5': 'Offers',
      'foot.col2.h': 'Support',
      'foot.col2.li1': 'FAQ',
      'foot.col2.li2': 'Cancellation & refund',
      'foot.col2.li3': 'Contact us',
      'foot.col2.li4': 'Hotel partnership',
      'foot.col3.h': 'About',
      'foot.col3.li1': 'Editorial team',
      'foot.col3.li2': 'Curation principles',
      'foot.col3.li3': 'Press',
      'foot.col3.li4': 'Privacy',
      'foot.col3.li5': 'Terms',
      'foot.copy': '© 2026 HOME AROUND TAIWAN TOURS · Tax ID 12345678',

      // ── ROOMS PAGE
      'rooms.demo.label': 'DEMO',
      'rooms.demo.body': 'Mockup preview — room images shown as gradients. Click "Select this room" to continue to booking.',
      'rooms.crumb': 'Choose a room',
      'rooms.heading': 'Available rooms',
      'rooms.sub': 'Rooms matching your dates, party size, and destination — with live voucher pricing.',
      'rooms.legend': 'Base voucher NT$2,800 per night · weekday/weekend surcharges by room',
      'rooms.editSearch': 'Home',
      'rooms.modifySearch': 'Edit search',
      'rooms.chip.where': 'Where',
      'rooms.chip.dates': 'Dates',
      'rooms.chip.guests': 'Guests',
      'rooms.chip.hotel.any': 'All 33 stays',
      'rooms.nights': 'nights',
      'rooms.count': 'Found {n} matching rooms',
      'rooms.empty.title': 'No rooms quite match',
      'rooms.empty.body': 'Your party may exceed this stay\'s capacity. Try fewer guests, or pick another stay from the home page.',
      'rooms.feature.capacity': 'Sleeps',
      'rooms.feature.people': '',
      'rooms.feature.series': 'Voucher · Premium series',
      'rooms.feature.nights': 'nights',
      'rooms.bd.weekday': 'Weekday +NT${add} × {n}n',
      'rooms.bd.weekend': 'Weekend +NT${add} × {n}n',
      'rooms.bd.package': 'Weekend {note} (unavailable for this date)',
      'rooms.bd.voucherCount': 'Vouchers used',
      'rooms.bd.vouchers': '',
      'rooms.from': 'Voucher total',
      'rooms.forStay': 'Includes surcharges for {n} nights',
      'rooms.priceUnavailable': 'Unavailable',
      'rooms.cta.select': 'Select this room',
      'rooms.cta.unavailable': 'Change dates / contact us',
      'foot.made': 'MADE WITH 慢慢來 · IN TAIPEI',

      // ── HOTEL DETAIL PAGE
      'hd.bc.notFound': 'Loading…',
      'hd.err.h1': "Hotel not found",
      'hd.err.body': 'The id in the URL may be invalid. Please return to the homepage.',
      'hd.err.back': 'Back to home',
      'hd.bc.notFound.title': 'Not found',
      'hd.gallery.label': 'Hero',
      'hd.section.rooms': 'Room types & pricing',
      'hd.section.rooms.intro': 'Prices below are the add-on amount for the “Refined-series voucher”. Base voucher is NT$2,800/night, with add-ons by room type and weekday/weekend.',
      'hd.section.notes': 'Notes',
      'hd.section.seasonal': 'Seasonal pricing',
      'hd.section.transit': 'Getting there',
      'hd.section.location': 'Location',
      'hd.related.h': 'You may also like',
      'hd.weekday': 'Weekday',
      'hd.weekend': 'Weekend',
      'hd.noAdd': 'No add-on',
      'hd.room.book': 'Reserve this room →',
      'hd.from': 'Weekday double from',
      'hd.perNight': '/night',
      'hd.contact.phone': 'Phone',
      'hd.contact.hours': 'Hours',
      'hd.contact.address': 'Address',
      'hd.book.now': 'Book now →',
      'hd.fb': 'FB chat',
      'hd.line': 'LINE chat',
      'hd.map.fallback': 'Open in Google Maps',
      'hd.notesNotice': '(original Chinese)',

      // ── BOOKING PAGE
      'bk.title': 'Booking — Home Around Taiwan Tours',
      'bk.h1.line1': 'Choose your stay,',
      'bk.h1.line2': 'we’ll hold your room.',
      'bk.h1.full': 'Choose your stay,<br/>we’ll hold your room.',
      'bk.demo.label': 'DEMO',
      'bk.demo.body': 'This is a demo flow — submitted requests will not create a real booking.',
      'bk.section.stay': 'Stay info',
      'bk.field.hotel': 'Hotel',
      'bk.field.hotel.placeholder': 'Choose a stay',
      'bk.field.room': 'Room type',
      'bk.field.room.placeholder': 'Choose a stay first',
      'bk.field.checkin': 'Check-in',
      'bk.field.checkout': 'Check-out',
      'bk.field.adults': 'Adults',
      'bk.field.children': 'Children',
      'bk.field.children.hint': '(under 110 cm free)',
      'bk.field.voucher': 'Voucher',
      'bk.voucher.aria': 'Voucher type',
      'bk.voucher.refined': 'Refined series',
      'bk.voucher.boutique': 'Boutique series',
      'bk.voucher.cash': 'Cash booking',
      'bk.section.contact': 'Contact info',
      'bk.field.name': 'Booker name',
      'bk.field.name.placeholder': 'John Doe',
      'bk.field.phone': 'Phone',
      'bk.field.phone.placeholder': '0912-345-678',
      'bk.field.email': 'Email',
      'bk.field.email.placeholder': 'you@example.com',
      'bk.field.notes': 'Notes',
      'bk.field.notes.placeholder': 'e.g. high floor preferred, bringing a pet (Yujing / Lanshan / Bankala are pet-friendly), need a baby cot…',
      'bk.submit': 'Submit booking request',
      'bk.aria.minus': 'Decrease',
      'bk.aria.plus': 'Increase',
      'bk.summary.title': 'Order summary',
      'bk.summary.empty': 'Please choose a stay first.',
      'bk.summary.base': 'Base voucher / night',
      'bk.summary.weekday': 'Weekday add-on',
      'bk.summary.weekend': 'Weekend add-on',
      'bk.summary.nights': 'night(s)',
      'bk.summary.subtotal': 'Subtotal',
      'bk.summary.note': "Our team will reply within 12 business hours to confirm your booking.",
      'bk.success.h1': 'Thank you, {name}.',
      'bk.success.lead': 'We’ve received your booking request and will confirm via phone or LINE within 12 business hours.',
      'bk.success.orderId': 'Order ID',
      'bk.success.next.h': 'Next steps',
      'bk.success.step1': 'Our team contacts you within 12 hours to confirm room availability.',
      'bk.success.step2': "Once confirmed, we'll send you a LINE message with the hotel's contact details.",
      'bk.success.step3': 'On arrival, present your order ID at reception to check in.',
      'bk.success.cta.home': 'Back to home',
      'bk.success.cta.hotel': 'View this stay',

      // ── HOTEL TAGS
      'tag.寵物友善': 'Pet-friendly',
      'tag.精緻系列': 'Refined series',
      'tag.精品系列': 'Boutique series',
      'tag.市區': 'Downtown',
      'tag.市中心': 'City centre',
      'tag.免費停車': 'Free parking',
      'tag.精品民宿': 'Boutique B&B',
      'tag.溫泉': 'Hot spring',
      'tag.海景': 'Sea view',
      'tag.海岸': 'Coastal',
      'tag.離島': 'Outlying island',
      'tag.親子': 'Family',
      'tag.家庭': 'Family',
      'tag.湖景': 'Lake view',
      'tag.捷運': 'MRT nearby',
      'tag.機場 10 分鐘': '10 min to airport',
      'tag.溫泉會館': 'Hot spring resort',
      'tag.山中': 'Mountain',
      'tag.300 坪庭園': '300-pyeong garden',

      // ── REGION
      'region.台南': 'Tainan',
      'region.花蓮': 'Hualien',
      'region.澎湖': 'Penghu',
      'region.金門': 'Kinmen',
      'region.新北': 'New Taipei',
      'region.屏東': 'Pingtung',
      'region.南投': 'Nantou',
      'region.嘉義': 'Chiayi',
      'region.宜蘭': 'Yilan',
      'region.台北': 'Taipei',
      'region.新竹': 'Hsinchu',
      'region.高雄': 'Kaohsiung',
      'region.台東': 'Taitung'
    },

    ja: {
      // ── NAV
      'nav.home': 'ホーム',
      'nav.about': '私たちについて',
      'nav.guide': '観光ガイド',
      'nav.tickets': 'Eチケット',
      'nav.news': 'お知らせ',
      'nav.stays': '直営宿',
      'nav.partners': 'パートナー',
      'nav.lookup': 'バウチャー照会',
      'nav.contact': 'お問い合わせ',
      'nav.insurance': '旅行保険',
      'nav.book': '予約する',
      'nav.lang.aria': '言語切替',
      // Booking.com スタイル nav（全ロケール統一英語）
      'bk.stays': 'Stays',
      'bk.flights': 'Flights',
      'bk.cars': 'Car rentals',
      'bk.attractions': 'Attractions',
      'bk.taxis': 'Airport taxis',

      // ── SPEC BAR
      'spec.label': 'SPEC',
      'spec.body': 'Home Around · ウェブサイトモックアップ · v2 · 33軒 · 2026-05-04',
      'spec.ratio.label': 'RATIO',
      'spec.ratio.body': '60 warm-base · 20 brown · 10 teal · 7 yellow · 3 green',

      // ── HERO
      'hero.eyebrow': 'Spring 2026 · 春の限定旅',
      'hero.headline.line1': 'ゆっくり、',
      'hero.headline.line1em': 'うちに帰る。',
      'hero.headline.line2': 'Home, around Taiwan.',
      'hero.headline.full': 'ゆっくり、<em>うちに帰る。</em><br/>Home, around Taiwan.',
      'hero.sub': '都会のビジネスホテルから山の温泉、離島の民宿から古民家の宿まで——Home Around は台湾全土の33軒の直営宿を集約。一枚のバウチャーで、13県のスローな台湾を旅しよう。',
      'hero.meta.coverage': '13県をカバー · 33軒の直営宿',
      'hero.meta.voucher': '一枚で全館 · 平日/週末で柔軟加算',
      'hero.viewLink': 'この宿を見る',
      'hero.dot.aria.prefix': '',
      'hero.dot.aria.suffix': '番目',
      'hero.aria': 'ホテルカルーセル',
      'hero.room.0.loc': '台東緑島 · 島の朝',
      'hero.room.0.room': '雙發ホテル',
      'hero.room.1.loc': '台南玉井 · ペット可',
      'hero.room.1.room': '家天下行旅',
      'hero.room.2.loc': '宜蘭羅東 · 300坪の庭園',
      'hero.room.2.room': 'ランカウィ庭園民宿',
      'hero.room.3.loc': '新竹尖石 · 山中の温泉',
      'hero.room.3.room': '朝日温泉会館',
      'hero.room.4.loc': '墾丁南灣 · 海岸の夕日',
      'hero.room.4.room': 'バンカラ',

      // ── SEARCH
      'search.aria': '空室検索',
      'search.where.label': '目的地 Where',
      'search.where.value': '花蓮 · 太魯閣',
      'search.where.placeholder': '',
      'search.checkin.label': 'チェックイン',
      'search.checkin.value': '5月18日（月）',
      'search.checkout.label': 'チェックアウト',
      'search.checkout.value': '5月21日（木）',
      'search.guests.label': '人数',
      'search.guests.value': '大人2名 · 子供1名',
      'search.cta': '空室を探す',
      'search.where.any': '— 全33宿 —',
      'search.adults': '大人',
      'search.adults.sub': '12歳以上',
      'search.kids': '子供',
      'search.kids.sub': '12歳未満',

      // ── VALUE STRIP
      'value.01.title': '33軒の直営宿 厳選',
      'value.01.body': '都市ホテル、海岸民宿、山の温泉まで——13県、6種類のテーマ地理。',
      'value.02.title': '一枚で全館',
      'value.02.body': '精緻シリーズバウチャー：平日は多くの館で加算なし、週末は部屋タイプで NT$600〜2,800 加算。',
      'value.03.title': '信託による安心保障',
      'value.03.body': '家天下台南行旅信託でバウチャー照会。販売済みバウチャーは信託資金で保護。',

      // ── EDITOR'S PICK
      'pick.eyebrow': 'エディターズ・ピック',
      'pick.h2.line1': '3軒の宿、',
      'pick.h2.line2': '3種類のスローな過ごし方。',
      'pick.h2.full': '3軒の宿、<br/>3種類のスローな過ごし方。',
      'pick.meta.line1': '南湾の海岸から山の温泉、ペット可から300坪の庭園まで——',
      'pick.meta.line2.b': 'すべて同じ精緻シリーズバウチャーで宿泊可能。',
      'pick.meta.full': '南湾の海岸から山の温泉、ペット可から300坪の庭園まで——<br/><b>すべて同じ精緻シリーズバウチャーで宿泊可能。</b>',

      'pick.label.coast': '海岸おすすめ',
      'pick.label.family': 'ファミリーおすすめ',
      'pick.label.pet': 'ペット可',
      'pick.label.from': 'バウチャー / from',
      'pick.label.perNight': '/泊',
      'pick.cta.view': '見る',

      'pick.bankala.loc': '屏東 · 恆春南灣',
      'pick.bankala.name': '墾丁恆春バンカラ',
      'pick.bankala.en': 'Bankala · Hengchun',
      'pick.bankala.tag1': '南湾の海岸',
      'pick.bankala.tag2': '10坪の客室',
      'pick.bankala.tag3': '精緻シリーズ',

      'pick.langkawi.loc': '宜蘭 · 羅東',
      'pick.langkawi.name': 'ランカウィ庭園民宿',
      'pick.langkawi.en': 'Langkawi Garden',
      'pick.langkawi.tag1': '300坪の庭園',
      'pick.langkawi.tag2': '子供プール',
      'pick.langkawi.tag3': '無料送迎',

      'pick.yujing.loc': '台南 · 玉井',
      'pick.yujing.name': '台南玉井家天下行旅',
      'pick.yujing.en': 'Jiatianxia Inn · Yujing',
      'pick.yujing.tag1': 'ペット可',
      'pick.yujing.tag2': 'スローな小都市',
      'pick.yujing.tag3': '精緻シリーズ',

      // ── ALL STAYS
      'all.eyebrow': '直営宿',
      'all.h2.line1': '13県 · 33軒。',
      'all.h2.line2': '一枚のバウチャーで台湾を旅する。',
      'all.h2.full': '13県 · 33軒。<br/>一枚のバウチャーで台湾を旅する。',
      'all.meta.line1': '全ての宿は Home Around',
      'all.meta.b': '精緻シリーズバウチャー',
      'all.meta.line2.suffix': '対応館です。',
      'all.meta.line3': '平日／週末は部屋タイプで加算、購入後一年間まで柔軟に利用可。',
      'all.meta.full': '全ての宿は Home Around <b>精緻シリーズバウチャー</b>対応館です。<br/>平日／週末は部屋タイプで加算、購入後一年間まで柔軟に利用可。',
      'all.cta': '33軒すべて見る',
      'all.badge.family': 'ファミリー／ペット',
      'all.badge.spring': '温泉',
      'all.badge.coast': '海景',

      // ── FAMILY SECTION
      'family.eyebrow': 'ファミリー向けの宿',
      'family.h2.line1': '子連れでも、',
      'family.h2.line2': 'ゆっくりと。',
      'family.h2.full': '子連れでも、<br/>ゆっくりと。',
      'family.pull.full': '「300坪の庭園、<br/>子供プール。」<br/><span style="font-size:13px; font-family: var(--font-mono); letter-spacing:0.1em; opacity:0.85; display:block; margin-top:14px;">— ランカウィ庭園民宿 · 宜蘭羅東</span>',
      'family.lede': '33軒のうち4軒は特に家族向け——ランカウィ庭園の子供プール、玉井家天下のペット可、君迪商旅の無料駐車と子供無料、藍衫海景の海岸休暇。',
      'family.body': '全ての宿は同じ<b>精緻シリーズバウチャー</b>で利用可能。ダブルルームは平日加算なしの館が多く、ファミリールームは館により NT$700〜1,300 加算。一部の館は110cm 以下の子供は無料、別途エキストラベッド料金が必要な館もあります。詳細は各ホテルページをご確認ください。',
      'family.badge': 'ファミリー',
      'family.pull.line1': '「300坪の庭園、',
      'family.pull.line2': '子供プール。」',
      'family.pull.attribution': '— ランカウィ庭園民宿 · 宜蘭羅東',
      'family.stat1.num': '4',
      'family.stat1.unit': '+',
      'family.stat1.body.line1': 'ファミリー／ペット可の',
      'family.stat1.body.line2': '直営宿',
      'family.stat2.num': '110',
      'family.stat2.unit': 'cm',
      'family.stat2.body.line1': '多くの館で',
      'family.stat2.body.line2': '子供は無料の身長設定',
      'family.stat3.num': '1',
      'family.stat3.unit': '券',
      'family.stat3.body.line1': '33軒すべて',
      'family.stat3.body.line2': '精緻シリーズで利用可',

      // ── EXPERIENCES
      'exp.eyebrow': '現地体験',
      'exp.h2.line1': '宿泊だけでなく、',
      'exp.h2.line2': '土地と向き合う時間も。',
      'exp.h2.full': '宿泊だけでなく、<br/>土地と向き合う時間も。',
      'exp.meta.line1': 'それぞれが異なる地理に位置 ——',
      'exp.meta.line2.b': 'タイルをタップで部屋・価格・アクセスを確認。',
      'exp.meta.full': 'それぞれが異なる地理に位置 ——<br/><b>タイルをタップで部屋・価格・アクセスを確認。</b>',
      'exp.b1.kicker': '花蓮市内 · 太魯閣まで車で30分',
      'exp.b1.title': '花蓮市内チャーミングシティホテル · 商旅級、無料駐車',
      'exp.b2.kicker': '台南玉井 · ペット可',
      'exp.b2.title': '玉井家天下行旅',
      'exp.b3.kicker': '宜蘭冬山 · 田園生活',
      'exp.b3.title': 'ダブルヨーク民宿',
      'exp.b4.kicker': '墾丁南灣 · 海岸まで3分',
      'exp.b4.title': '墾丁恆春バンカラ · 海岸の休日',
      'exp.b5.kicker': '南投鹿谷 · 凍頂茶の里',
      'exp.b5.title': '鹿鼎莊 · 夕食2名分プレゼント',

      // ── TRUST
      'trust.lead.b': 'Home Around を選ぶ理由',
      'trust.lead.body': '2021 年から、花東から金馬澎、都会から山中、ペット可からテーマ温泉まで——台湾全土に33軒の直営宿、一枚のバウチャーで全て巡れます。',
      'trust.stat1.label': '直営宿',
      'trust.stat2.label': 'カバー県数',
      'trust.stat3.label': '一枚で全館',
      'trust.stat4.label': '日間の有効期間',

      // ── NEWSLETTER
      'news.eyebrow': 'スローレター',
      'news.h2.line1': '月に一通、',
      'news.h2.line2': '台湾の宿のスローな手紙。',
      'news.h2.full': '月に一通、<br/>台湾の宿のスローな手紙。',
      'news.body': '新しい宿、季節限定の体験、編集部の小さな発見—— 月に一通、日曜の朝にお届け。いつでも解除可能。',
      'news.email.placeholder': 'メールアドレス · you@email.com',
      'news.cta': '購読する',
      'news.fine': '転送なし。迷惑メールなし。いつでも解除可能。',

      // ── FOOTER
      'foot.tag': 'ゆっくり、うちに帰る。',
      'foot.tag2': '2021年より、台湾全土の厳選宿とスロー体験をお届け。',
      'foot.col1.h': '探す',
      'foot.col1.li1': '全ての宿',
      'foot.col1.li2': 'ファミリー向け',
      'foot.col1.li3': '現地体験',
      'foot.col1.li4': '編集部の月間ピック',
      'foot.col1.li5': 'お得情報',
      'foot.col2.h': 'サポート',
      'foot.col2.li1': 'よくある質問',
      'foot.col2.li2': 'キャンセル・返金',
      'foot.col2.li3': 'お問い合わせ',
      'foot.col2.li4': '宿泊施設提携',
      'foot.col3.h': '会社情報',
      'foot.col3.li1': '編集チーム',
      'foot.col3.li2': '厳選原則',
      'foot.col3.li3': 'メディア',
      'foot.col3.li4': 'プライバシーポリシー',
      'foot.col3.li5': '利用規約',
      'foot.copy': '© 2026 HOME AROUND TAIWAN TOURS · 統一番号 12345678',
      'foot.made': 'MADE WITH 慢慢來 · IN TAIPEI',

      // ── ROOMS PAGE
      'rooms.demo.label': 'DEMO',
      'rooms.demo.body': 'モックアップ：客室画像はグラデーションで仮表示。「この部屋を選ぶ」で予約フォームへ。',
      'rooms.crumb': '部屋を選ぶ',
      'rooms.heading': '条件に合う客室',
      'rooms.sub': '宿泊期間・人数・目的地に合致する客室と、リアルタイム宿泊券価格を表示します。',
      'rooms.legend': '宿泊券基本価格 1泊 NT$2,800 ・ 平日／週末の追加料金は客室別',
      'rooms.editSearch': 'ホーム',
      'rooms.modifySearch': '検索を変更',
      'rooms.chip.where': '目的地',
      'rooms.chip.dates': '宿泊期間',
      'rooms.chip.guests': '宿泊人数',
      'rooms.chip.hotel.any': '全 33 軒',
      'rooms.nights': '泊',
      'rooms.count': '{n} 件の客室が見つかりました',
      'rooms.empty.title': '完全一致の客室がありません',
      'rooms.empty.body': '人数が施設の上限を超えている可能性があります。人数を減らすか、別の宿をお選びください。',
      'rooms.feature.capacity': '定員',
      'rooms.feature.people': '名',
      'rooms.feature.series': '宿泊券（プレミアシリーズ）',
      'rooms.feature.nights': '泊',
      'rooms.bd.weekday': '平日 +NT${add} × {n} 泊',
      'rooms.bd.weekend': '週末 +NT${add} × {n} 泊',
      'rooms.bd.package': '週末 {note}（この期間は予約不可）',
      'rooms.bd.voucherCount': '使用券数',
      'rooms.bd.vouchers': '枚',
      'rooms.from': '宿泊券合計',
      'rooms.forStay': '{n} 泊分の追加料金を含む',
      'rooms.priceUnavailable': '予約不可',
      'rooms.cta.select': 'この部屋を選ぶ',
      'rooms.cta.unavailable': '日付変更／お問い合わせ',

      // ── HOTEL DETAIL PAGE
      'hd.bc.notFound': '読み込み中…',
      'hd.err.h1': '宿が見つかりません',
      'hd.err.body': 'URL の id が正しくない可能性があります。ホームに戻って選び直してください。',
      'hd.err.back': 'ホームに戻る',
      'hd.bc.notFound.title': '見つかりません',
      'hd.gallery.label': 'メイン',
      'hd.section.rooms': '部屋タイプと料金',
      'hd.section.rooms.intro': '以下の価格は「精緻シリーズバウチャー」の加算料金です。基本バウチャーは1泊 NT$2,800 から、部屋タイプ・平日/週末で加算。',
      'hd.section.notes': 'ご注意',
      'hd.section.seasonal': '季節料金',
      'hd.section.transit': 'アクセス',
      'hd.section.location': '所在地',
      'hd.related.h': 'こちらもおすすめ',
      'hd.weekday': '平日',
      'hd.weekend': '週末',
      'hd.noAdd': '加算なし',
      'hd.room.book': 'この部屋を予約 →',
      'hd.from': '平日ダブル / from',
      'hd.perNight': '/泊',
      'hd.contact.phone': '予約電話',
      'hd.contact.hours': '受付時間',
      'hd.contact.address': '住所',
      'hd.book.now': '今すぐ予約 →',
      'hd.fb': 'FB チャット',
      'hd.line': 'LINE 相談',
      'hd.map.fallback': 'Google マップで開く',
      'hd.notesNotice': '（中文原文）',

      // ── BOOKING PAGE
      'bk.title': '予約 — Home Around Taiwan Tours',
      'bk.h1.line1': '宿を選ぶと、',
      'bk.h1.line2': 'お部屋をお取り置きします。',
      'bk.h1.full': '宿を選ぶと、<br/>お部屋をお取り置きします。',
      'bk.demo.label': 'DEMO',
      'bk.demo.body': 'これはデモフローです。送信しても実際の予約は作成されません。',
      'bk.section.stay': '宿泊情報',
      'bk.field.hotel': '宿泊施設',
      'bk.field.hotel.placeholder': '宿を選択してください',
      'bk.field.room': '部屋タイプ',
      'bk.field.room.placeholder': 'まず宿を選択してください',
      'bk.field.checkin': 'チェックイン',
      'bk.field.checkout': 'チェックアウト',
      'bk.field.adults': '大人',
      'bk.field.children': '子供',
      'bk.field.children.hint': '(110cm以下無料)',
      'bk.field.voucher': 'バウチャー',
      'bk.voucher.aria': 'バウチャー種別',
      'bk.voucher.refined': '精緻シリーズ',
      'bk.voucher.boutique': '精品シリーズ',
      'bk.voucher.cash': '現金予約',
      'bk.section.contact': 'ご連絡先',
      'bk.field.name': '予約者名',
      'bk.field.name.placeholder': '山田太郎',
      'bk.field.phone': '電話番号',
      'bk.field.phone.placeholder': '0912-345-678',
      'bk.field.email': 'メール',
      'bk.field.email.placeholder': 'you@example.com',
      'bk.field.notes': '備考',
      'bk.field.notes.placeholder': '例：高層階希望、ペット同伴（玉井家天下／藍衫海景／墾丁班卡拉などペット可）、ベビーベッド希望…',
      'bk.submit': '予約リクエストを送信',
      'bk.aria.minus': '減少',
      'bk.aria.plus': '増加',
      'bk.summary.title': 'ご予約サマリー',
      'bk.summary.empty': 'まず宿を選択してください。',
      'bk.summary.base': '基本バウチャー / 1泊',
      'bk.summary.weekday': '平日加算',
      'bk.summary.weekend': '週末加算',
      'bk.summary.nights': '泊',
      'bk.summary.subtotal': '小計',
      'bk.summary.note': '送信後、家天下のスタッフが12営業時間以内に確認のご連絡をいたします。',
      'bk.success.h1': 'ありがとうございます、{name}様。',
      'bk.success.lead': '予約リクエストを承りました。12営業時間以内に電話または LINE にてご連絡いたします。',
      'bk.success.orderId': '注文番号',
      'bk.success.next.h': '次のステップ',
      'bk.success.step1': 'スタッフが12時間以内に空室確認のご連絡をいたします。',
      'bk.success.step2': '確認後、LINE にてホテルの連絡先をお送りします。',
      'bk.success.step3': 'チェックイン当日、フロントで注文番号をご提示ください。',
      'bk.success.cta.home': 'ホームへ',
      'bk.success.cta.hotel': 'この宿を見る',

      // ── HOTEL TAGS
      'tag.寵物友善': 'ペット可',
      'tag.精緻系列': '精緻シリーズ',
      'tag.精品系列': '精品シリーズ',
      'tag.市區': '市内',
      'tag.市中心': '市中心部',
      'tag.免費停車': '無料駐車場',
      'tag.精品民宿': 'ブティック民宿',
      'tag.溫泉': '温泉',
      'tag.海景': '海景',
      'tag.海岸': '海岸',
      'tag.離島': '離島',
      'tag.親子': 'ファミリー',
      'tag.家庭': 'ファミリー',
      'tag.湖景': '湖景',
      'tag.捷運': 'MRT近く',
      'tag.機場 10 分鐘': '空港まで10分',
      'tag.溫泉會館': '温泉会館',
      'tag.山中': '山中',
      'tag.300 坪庭園': '300坪の庭園',

      // ── REGION
      'region.台南': '台南',
      'region.花蓮': '花蓮',
      'region.澎湖': '澎湖',
      'region.金門': '金門',
      'region.新北': '新北',
      'region.屏東': '屏東',
      'region.南投': '南投',
      'region.嘉義': '嘉義',
      'region.宜蘭': '宜蘭',
      'region.台北': '台北',
      'region.新竹': '新竹',
      'region.高雄': '高雄',
      'region.台東': '台東'
    }
  };

  // ── 內部狀態 + helpers ─────────────────────────────────
  function readSavedLang() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v && SUPPORTED.indexOf(v) >= 0) return v;
    } catch (e) { /* localStorage blocked — ignore */ }
    return DEFAULT_LANG;
  }

  var current = readSavedLang();

  function t(key, opts) {
    var bundle = DICT[current] || DICT[DEFAULT_LANG];
    var raw = (bundle && bundle[key] != null) ? bundle[key]
            : (DICT[DEFAULT_LANG] && DICT[DEFAULT_LANG][key] != null ? DICT[DEFAULT_LANG][key] : key);
    if (!opts) return raw;
    return raw.replace(/\{(\w+)\}/g, function (_, k) {
      return (opts[k] != null) ? String(opts[k]) : '';
    });
  }

  // 資料層 helpers — 飯店物件用
  function hotelName(h) {
    if (!h) return '';
    if (current === 'en' && h.enName) return h.enName;
    return h.name; // ja 暫用 zh 名（漢字共用）；en 用 enName
  }
  function regionName(region) {
    return t('region.' + region, null) === ('region.' + region) ? region : t('region.' + region);
  }
  function tagName(tag) {
    var key = 'tag.' + tag;
    var v = t(key);
    return v === key ? tag : v;
  }
  function roomName(r) {
    if (!r) return '';
    if (current === 'en' && r.en) return r.en;
    return r.name;
  }

  // ── DOM 套用 ────────────────────────────────────────────
  function applyToDom(root) {
    root = root || document;
    // textContent 屬性 (data-i18n="key")
    var texts = root.querySelectorAll('[data-i18n]');
    for (var i = 0; i < texts.length; i++) {
      var el = texts[i];
      var key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    }
    // innerHTML 屬性 (data-i18n-html="key") — 允許簡單的 <b><br/> 等
    var htmls = root.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < htmls.length; j++) {
      var elh = htmls[j];
      var keyh = elh.getAttribute('data-i18n-html');
      elh.innerHTML = t(keyh);
    }
    // placeholder
    var ph = root.querySelectorAll('[data-i18n-placeholder]');
    for (var k = 0; k < ph.length; k++) {
      ph[k].setAttribute('placeholder', t(ph[k].getAttribute('data-i18n-placeholder')));
    }
    // aria-label
    var ar = root.querySelectorAll('[data-i18n-aria]');
    for (var l = 0; l < ar.length; l++) {
      ar[l].setAttribute('aria-label', t(ar[l].getAttribute('data-i18n-aria')));
    }
    // title
    var ti = root.querySelectorAll('[data-i18n-title]');
    for (var m = 0; m < ti.length; m++) {
      ti[m].setAttribute('title', t(ti[m].getAttribute('data-i18n-title')));
    }

    // <html lang>
    document.documentElement.setAttribute('lang',
      current === 'zh' ? 'zh-Hant' : (current === 'ja' ? 'ja' : 'en'));

    // 標記語言切換按鈕的 active state
    var btns = root.querySelectorAll('[data-lang-btn]');
    for (var n = 0; n < btns.length; n++) {
      var b = btns[n];
      if (b.getAttribute('data-lang-btn') === current) b.classList.add('is-active');
      else b.classList.remove('is-active');
    }
  }

  function setLocale(lang) {
    if (SUPPORTED.indexOf(lang) < 0) return;
    if (lang === current) return;
    current = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    applyToDom();
    // 通知動態渲染的頁面（飯店詳情 / 訂房）重新繪製
    try {
      document.dispatchEvent(new CustomEvent('localechange', { detail: { lang: lang } }));
    } catch (err) {
      // 老式 IE fallback (用不到，但留著無傷)
      var ev = document.createEvent('CustomEvent');
      ev.initCustomEvent('localechange', false, false, { lang: lang });
      document.dispatchEvent(ev);
    }
  }

  // ── 全頁初始化：DOM ready 時自動套用一次，並掛上按鈕 click ──
  function init() {
    applyToDom();
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-lang-btn]');
      if (!t) return;
      e.preventDefault();
      setLocale(t.getAttribute('data-lang-btn'));
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── 對外暴露 ────────────────────────────────────────────
  global.I18N = {
    get current() { return current; },
    SUPPORTED: SUPPORTED,
    t: t,
    setLocale: setLocale,
    applyToDom: applyToDom,
    hotelName: hotelName,
    regionName: regionName,
    tagName: tagName,
    roomName: roomName
  };

})(window);
