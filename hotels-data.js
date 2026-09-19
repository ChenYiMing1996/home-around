/* Home Around Taiwan Tours — 旅宿資料 (mockup demo)
   ─────────────────────────────────────────────────
   每筆資料包含：基本資訊、聯絡方式、房型加價、備註、交通。
   theme 欄位對應 hotel-detail.html 內的房型圖 gradient (warm / ocean / island / forest / urban / sunset)。
   FB / LINE 在 demo 統一指向官方 channel placeholder，正式環境替換成各館專屬連結。*/

window.HOTELS = [
  {
    id: 'tainan-yujing',
    name: '台南玉井家天下行旅',
    enName: 'Jiatianxia Inn · Yujing, Tainan',
    region: '台南', city: 'Tainan',
    tags: ['寵物友善', '精緻系列'],
    phone: '0905-780-251',
    bookingHours: '09:00–18:00',
    address: '台南市玉井區玉安街67號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'warm',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 800 },
      { name: '四人房', en: 'Family Room', weekday: 0, weekend: 1300 }
    ],
    notes: ['本館為寵物友善民宿，攜帶寵物入住請先告知。']
  },
  {
    id: 'hualien-shangcheng',
    name: '花蓮市區香城大飯店',
    enName: 'Hualien Charming City Hotel',
    region: '花蓮', city: 'Hualien',
    tags: ['市區', '免費停車', '精緻系列'],
    phone: '03-835-3355',
    bookingHours: '週一–週五 09:00–18:00',
    address: '花蓮縣花蓮市國興二街19號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'urban',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 600 },
      { name: '四人房', en: 'Family Room', weekday: 800, weekend: 1200 }
    ],
    notes: [
      '110 公分以下兒童不收費。',
      '提供免費停車場（依現場停放，數量有限）。',
      '不可攜帶寵物。',
      '農曆春節（初一至初五）及跨年不適用。',
      '連續假日、跨年、住宿券不適用。'
    ],
    seasonal: '本價格適用 2026/1/1–2026/6/30。'
  },
  {
    id: 'penghu-zhe-su',
    name: '晢宿民宿精品館（真心愛你精品民宿）',
    enName: 'Zhe-Su Boutique B&B',
    region: '澎湖', city: 'Penghu',
    tags: ['精品民宿', '精緻系列'],
    phone: '0918-333-539',
    bookingHours: '09:00–18:00',
    address: '澎湖縣馬公市西衛里247-1號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'island',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 0 },
      { name: '四人房', en: 'Family Room', weekday: 1200, weekend: 1200 },
      { name: '六人房', en: 'Six-bed Room', weekday: 2200, weekend: 2200 }
    ],
    notes: [
      '11–3 月為冬季淡季價，4–10 月為旺季加價。',
      '4–10 月：雙人房平日 +800 / 假日 +1000；四人房平日 +1800 / 假日 +2000；六人房平日 +2800 / 假日 +3000。'
    ],
    seasonal: '冬季淡季（11–3 月）／旺季（4–10 月）兩種計費。'
  },
  {
    id: 'kinmen-in99',
    name: '金門 IN99 精品旅館',
    enName: 'IN99 Boutique Hotel · Kinmen',
    region: '金門', city: 'Kinmen',
    tags: ['市中心', '機場 10 分鐘', '精緻系列'],
    phone: '0973-763-788 · 08-232-4851',
    bookingHours: '09:00–18:00',
    address: '金門縣金城鎮民生路16號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'urban',
    rooms: [
      { name: '精緻雙人房', en: 'Standard Double', weekday: 0, weekend: 400 },
      { name: '時尚雙人房', en: 'Stylish Double', weekday: 400, weekend: 800 },
      { name: '時尚三人房', en: 'Stylish Triple', weekday: 800, weekend: 1200 },
      { name: '溫馨四人房', en: 'Family Quad', weekday: 1200, weekend: 1600 }
    ],
    notes: [
      '步行可達金城鎮主要景點與美食。',
      '距離金門機場約 10 分鐘車程，水頭碼頭約 12 分鐘。'
    ]
  },
  {
    id: 'penghu-tingyuanji',
    name: '澎湖庭圓季海景民宿',
    enName: 'Ting Yuan Ji Sea-view B&B',
    region: '澎湖', city: 'Penghu',
    tags: ['海景', '精緻系列'],
    phone: '0938-398-663',
    bookingHours: '09:00–18:00',
    address: '澎湖縣馬公市西衛里696號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'island',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 400, weekend: 400 },
      { name: '四人房', en: 'Family Room', weekday: 1400, weekend: 1400 }
    ],
    notes: [
      '11–3 月為冬季淡季價；4–10 月旺季雙人房平日 +600 / 假日 +1000，四人房平日 +2000 / 假日 +2400。'
    ],
    seasonal: '冬季淡季（11–3 月）／旺季（4–10 月）'
  },
  {
    id: 'newtaipei-jundi',
    name: '君迪商旅',
    enName: 'JunDi Business Hotel · New Taipei',
    region: '新北', city: 'New Taipei',
    tags: ['捷運景安站', '免費停車', '精緻系列'],
    phone: '02-8221-3666',
    bookingHours: '入住 17:00 起',
    address: '新北市中和區和城路一段232號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'urban',
    rooms: [
      { name: '標準雙人房', en: 'Standard Double', weekday: 0, weekend: 600 },
      { name: '豪華家庭四人房', en: 'Deluxe Family', weekday: 1000, weekend: 2000 }
    ],
    notes: [
      '120 公分以下兒童不收費。',
      '提供免費停車場（數量有限）。',
      '不可攜帶寵物。',
      '農曆春節（初一至初五）及跨年不適用。'
    ],
    transit: ['北二高中和交流道下，右轉 50 公尺即達。', '高鐵／台鐵板橋站轉計程車約 15 分鐘；捷運景安站搭計程車約 10 分鐘。']
  },
  {
    id: 'kenting-lanshan',
    name: '藍衫海景山莊',
    enName: 'Lanshan Sea-view Villa · Hengchun',
    region: '屏東 · 恆春', city: 'Hengchun',
    tags: ['寵物友善', '海景', '精緻系列'],
    phone: '0908-562-321',
    bookingHours: '09:00–18:00',
    address: '屏東縣恆春鎮樹林路3-1號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'sunset',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 700 },
      { name: '四人房', en: 'Family Room', weekday: 400, weekend: 1200 }
    ],
    notes: ['本館為寵物友善民宿。']
  },
  {
    id: 'liuqiu-hailiu',
    name: '小琉球 海琉小日子輕旅民宿',
    enName: 'Hailiu Slow-life Inn · Xiaoliuqiu',
    region: '屏東 · 小琉球', city: 'Liuqiu',
    tags: ['離島', '海島輕旅', '精緻系列'],
    phone: '0933-655-737',
    bookingHours: '09:00–18:00',
    address: '屏東縣琉球鄉中山路31-1號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'island',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 1000 },
      { name: '四人房', en: 'Family Room', weekday: 1000, weekend: 1800 }
    ]
  },
  {
    id: 'nantou-jiamei',
    name: '佳美休閒山莊',
    enName: 'Jiamei Mountain Villa · Renai',
    region: '南投 · 仁愛', city: 'Renai',
    tags: ['山中', '森林系', '精緻系列'],
    phone: '049-2803940',
    bookingHours: '09:00–18:00',
    address: '南投縣仁愛鄉信義巷80號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'forest',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 1400 },
      { name: '四人房', en: 'Family Room', weekday: 1200, weekend: 2600 }
    ]
  },
  {
    id: 'chiayi-huangjue',
    name: '嘉義皇爵大飯店',
    enName: 'Royal Chiayi Hotel',
    region: '嘉義', city: 'Chiayi',
    tags: ['市區', '精緻系列'],
    phone: '02-1234-5678（家天下代訂）',
    bookingHours: '09:00–18:00',
    address: '嘉義市西區新榮路234號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'urban',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 900 },
      { name: '四人房', en: 'Family Room', weekday: 700, weekend: 1900 }
    ]
  },
  {
    id: 'yilan-doubleyolk',
    name: '宜蘭雙黃蛋生活空間民宿',
    enName: 'Double Yolk Living Space · Dongshan',
    region: '宜蘭 · 冬山', city: 'Dongshan',
    tags: ['田野', '生活空間', '精緻系列'],
    phone: '0933-988-763',
    bookingHours: '09:00–18:00',
    address: '宜蘭縣冬山鄉永美路267號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'forest',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: '僅供包棟' },
      { name: '四人房', en: 'Family Room', weekday: 1300, weekend: '僅供包棟' }
    ],
    notes: ['假日僅供包棟。連續假日、農曆春節不適用。']
  },
  {
    id: 'taipei-meander1948',
    name: '台北 MEANDER 1948',
    enName: 'MEANDER 1948 · Datong, Taipei',
    region: '台北 · 大同', city: 'Taipei',
    tags: ['捷運可達', '不含早餐', '精緻系列'],
    phone: '02-2558-8812',
    bookingHours: '09:00–18:00',
    address: '臺北市大同區太原路42號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'urban',
    rooms: [
      { name: '雙人房（1 券）', en: 'Double · 1 Voucher', weekday: 300, weekend: 2300 }
    ],
    notes: ['假日定義：週五、週六、連續假日。', '春節不適用。', '本系列不含早餐。']
  },
  {
    id: 'taipei-ximen',
    name: '台北 漫步西門館',
    enName: 'Meander · Ximen Taipei',
    region: '台北 · 萬華', city: 'Taipei',
    tags: ['西門商圈', '不含早餐', '精緻系列'],
    phone: '02-2383-1334',
    bookingHours: '09:00–18:00',
    address: '臺北市萬華區成都路163號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'urban',
    rooms: [
      { name: '雙人房（1 券）', en: 'Double · 1 Voucher', weekday: 300, weekend: 2300 }
    ],
    notes: ['假日定義：週五、週六、連續假日。', '春節不適用。', '本系列不含早餐。']
  },
  {
    id: 'penghu-515',
    name: '澎湖 515 會館民宿',
    enName: '515 Hall B&B · Penghu',
    region: '澎湖', city: 'Penghu',
    tags: ['島嶼', '精緻系列'],
    phone: '0937-214-165',
    bookingHours: '09:00–18:00',
    address: '澎湖縣馬公市西衛247-6號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'island',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 1000 },
      { name: '四人房', en: 'Family Room', weekday: 1200, weekend: 2000 }
    ],
    notes: [
      '11–3 月為冬季淡季價；4–10 月旺季雙人房平日 +800、四人房平日 +1800。',
      '農曆春節不適用。'
    ],
    seasonal: '冬季淡季（11–3 月）／旺季（4–10 月）'
  },
  {
    id: 'taitung-tiehua-lezhi',
    name: '台東鐵花村樂知旅店',
    enName: 'LeZhi Inn · TieHua Village, Taitung',
    region: '台東', city: 'Taitung',
    tags: ['鐵花村', '停車自理', '精緻系列'],
    phone: '089-322-100',
    bookingHours: '09:00–18:00',
    address: '台東市復興路145號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'sunset',
    rooms: [
      { name: '時尚精緻雙人房', en: 'Stylish Double', weekday: 0, weekend: 1000 },
      { name: '精緻家庭四人房', en: 'Family Quad', weekday: 1000, weekend: 2100 }
    ],
    notes: [
      '寒暑假平日：雙人 +1200 / 四人 +2300。',
      '寒暑假假日／連假：雙人 +1600 / 四人 +3200。',
      '停車自理。'
    ],
    seasonal: '寒暑假及連假另計加價。'
  },
  {
    id: 'yilan-langkawi',
    name: '宜蘭羅東蘭卡威庭園民宿',
    enName: 'Langkawi Garden B&B · Luodong',
    region: '宜蘭 · 羅東', city: 'Luodong',
    tags: ['親子', '庭園', '精緻系列'],
    phone: '0910-057-077',
    bookingHours: '09:00–18:00',
    address: '宜蘭縣羅東鎮新群二路363號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'forest',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 700 },
      { name: '庭院四人房（無浴缸）', en: 'Garden Quad', weekday: 1000, weekend: 1500 }
    ],
    notes: [
      '300 坪自然生態庭園、落雨松林蔭步道、變葉木庭園。',
      '兒童戲水池、盪鞦韆、搖椅親子區。',
      '提供羅東火車站及轉運站接駁，請於訂房時告知。'
    ],
    transit: ['台北→國道五號→下羅東交流道→側車道往南三公里→右轉新群二路。', '花蓮→蘇澳→上蘇澳交流道→下羅東交流道→迴轉往南 1.2 公里→右轉新群二路。']
  },
  {
    id: 'yilan-jinzhuya',
    name: '宜蘭五結金洙椏民宿',
    enName: 'Jin Zhu Ya B&B · Wujie',
    region: '宜蘭 · 五結', city: 'Wujie',
    tags: ['田野', '不含早餐', '精緻系列'],
    phone: '0972-726-619',
    bookingHours: '09:00–18:00',
    address: '宜蘭縣五結鄉協和中路17-27號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'forest',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 700 },
      { name: '202／203 四人房', en: 'Family Room', weekday: 1000, weekend: 1500 }
    ],
    notes: ['本系列不含早餐。']
  },
  {
    id: 'yilan-zhi1979',
    name: '宜蘭五結致 1979',
    enName: 'Zhi 1979 · Wujie, Yilan',
    region: '宜蘭 · 五結', city: 'Wujie',
    tags: ['老屋翻修', '工業風', '精緻系列'],
    phone: '03-9505064',
    bookingHours: '09:00–18:00',
    address: '宜蘭縣五結鄉新興路25號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'forest',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 700 },
      { name: '四人房', en: 'Family Room', weekday: 1000, weekend: 2000 }
    ],
    notes: ['昔日老舊製衣廠翻修而成，原木與灰金內裝，平衡外觀金屬冷調。']
  },
  {
    id: 'newtaipei-bitan',
    name: '新北碧潭帝景飯店',
    enName: 'Imperial View Hotel · Bitan',
    region: '新北 · 新店', city: 'New Taipei',
    tags: ['碧潭湖景', '主題房', '精緻系列'],
    phone: '02-8212-1100',
    bookingHours: '09:00–18:00',
    address: '新北市新店區碧潭路77巷2號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'urban',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 600 },
      { name: '四人房', en: 'Family Room', weekday: 2000, weekend: 2600 }
    ],
    notes: [
      '國定連假（不含跨年、農曆年）：兩人房 +1200、含指定 +1700、文藝湖景商務雙 +1500、大藝術家主題 +2000、四人環景主題 +2500、蜜月 VIP +3500。',
      '假日定義：週五、週六。'
    ],
    transit: ['北二高（南下）下新店交流道，右轉中正路→左轉北新路→碧潭橋→碧潭路。', '捷運新店線新店站下車，過碧潭吊橋步行 5 分鐘。']
  },
  {
    id: 'hsinchu-jianshi',
    name: '新竹尖石朝日溫泉會館',
    enName: 'Asahi Hot Spring Resort · Jianshi',
    region: '新竹 · 尖石', city: 'Jianshi',
    tags: ['溫泉', '山中', '精緻系列'],
    phone: '03-584-1111',
    bookingHours: '入住 17:00 起',
    address: '新竹縣尖石鄉錦屏村4鄰32號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'forest',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 1500 },
      { name: '四人房', en: 'Family Room', weekday: 800, weekend: 2200 }
    ],
    notes: [
      '國定假日前一天視為假日。',
      '100 公分以下兒童不收費。',
      '入住時間 17:00 起。',
      '新竹首家取得溫泉標章的合法民宿，泉質乾淨，含大眾湯與個人湯屋。'
    ],
    transit: ['北二高關西交流道下，118→台 3 線→69 公里左轉 120 縣道→尖石橋右轉 5 公里。']
  },
  {
    id: 'yilan-lichi',
    name: '宜蘭冬山荔枝民宿',
    enName: 'Lichi B&B · Dongshan',
    region: '宜蘭 · 冬山', city: 'Dongshan',
    tags: ['田野', '親水', '精緻系列'],
    phone: '0937-007-080',
    bookingHours: '09:00–18:00',
    address: '宜蘭縣冬山鄉武淵二路30巷18號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'forest',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 500 },
      { name: '四人房', en: 'Family Room', weekday: 1000, weekend: 1500 }
    ],
    notes: [
      '步行可達冬山河親水公園、清水地熱、傳藝中心、幾米公園、積木博物館。'
    ]
  },
  {
    id: 'nantou-luding',
    name: '南投鹿谷鹿鼎莊',
    enName: 'Luding Manor · Lugu',
    region: '南投 · 鹿谷', city: 'Lugu',
    tags: ['茶鄉', '加贈晚餐', '精緻系列'],
    phone: '049-2750100',
    bookingHours: '09:00–18:00',
    address: '南投縣鹿谷鄉彰雅村凍頂巷10-18號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'forest',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 980 },
      { name: '四人房', en: 'Family Room', weekday: 700, weekend: 2680 }
    ],
    notes: ['精緻系列加贈兩客晚餐。']
  },
  {
    id: 'nantou-ruiju',
    name: '南投日月潭瑞居渡假飯店',
    enName: 'Rui Ju Resort · Sun Moon Lake',
    region: '南投 · 日月潭', city: 'Sun Moon Lake',
    tags: ['日月潭', '山中', '精緻系列'],
    phone: '049-2895589',
    bookingHours: '09:00–18:00',
    address: '南投魚池鄉大雁村大雁巷47-9號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'forest',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 1200 },
      { name: '四人房', en: 'Family Room', weekday: 1200, weekend: 2800 }
    ]
  },
  {
    id: 'nantou-victoria',
    name: '南投清境維多利亞山莊',
    enName: 'Victoria Mountain Villa · Cingjing',
    region: '南投 · 清境', city: 'Cingjing',
    tags: ['歐風', '加贈晚餐', '精緻系列'],
    phone: '049-2801133',
    bookingHours: '09:00–18:00',
    address: '南投縣仁愛鄉大同村榮光巷40號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'forest',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 1580 },
      { name: '四人房', en: 'Family Room', weekday: 800, weekend: 2680 }
    ],
    notes: ['精緻系列加贈兩客晚餐。']
  },
  {
    id: 'nantou-yimo',
    name: '南投清境依默騎馬莊園',
    enName: 'YiMo Equestrian Estate · Cingjing',
    region: '南投 · 清境', city: 'Cingjing',
    tags: ['騎馬', '木屋', '精緻系列'],
    phone: '049-2803635',
    bookingHours: '09:00–18:00',
    address: '南投縣仁愛鄉大同村榮光巷35-2號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'forest',
    rooms: [
      { name: '和室小木屋雙人套房', en: 'Japanese Cabin Double', weekday: 0, weekend: 1600 },
      { name: '歐式大木屋雙人套房', en: 'European Cabin Double', weekday: 800, weekend: 2200 },
      { name: '歐式大木屋四人套房', en: 'European Cabin Quad', weekday: 2000, weekend: 3400 }
    ],
    transit: ['國道 3 號→霧峰系統→國道 6 號（走到底）第三出口左轉霧社→台 14 甲線往清境 6K 處左轉。', '南投客運：台中干城東站→清境農場（壽亭站下車聯絡依默）。']
  },
  {
    id: 'nantou-zhaodi',
    name: '南投埔里兆迪商旅',
    enName: 'Zhao Di Business Hotel · Puli',
    region: '南投 · 埔里', city: 'Puli',
    tags: ['市區', '商旅', '精緻系列'],
    phone: '049-2988666',
    bookingHours: '09:00–18:00',
    address: '南投縣埔里鎮虎山二街5號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'urban',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 500 },
      { name: '四人房', en: 'Family Room', weekday: 1000, weekend: 2000 }
    ],
    transit: ['國道一號→沿國道三、六號水沙連高速公路出口→台 14 線→虎山二街。', '台中火車站步行至干城客運→6268 公車→地理中心碑站→步行 3 分鐘。']
  },
  {
    id: 'kenting-bankala',
    name: '墾丁恆春班卡拉',
    enName: 'Bankala · Hengchun, Kenting',
    region: '屏東 · 恆春', city: 'Hengchun',
    tags: ['南灣', '海岸', '精緻系列'],
    phone: '08-888-0858',
    bookingHours: '09:00–18:00',
    address: '屏東縣恆春鎮南灣路956號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'sunset',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 800 },
      { name: '四人房', en: 'Family Room', weekday: 1000, weekend: 1800 }
    ],
    notes: [
      '入住 10 坪房型。',
      '暑假平日：雙人 +800 / 四人 +1800；暑假假日：雙人 +1800 / 四人 +2800。',
      '春吶、跨年、春節、連續假日比照暑假假日加價。'
    ],
    seasonal: '暑假及特殊節日另計加價。'
  },
  {
    id: 'kaohsiung-junyi',
    name: '高雄五福鈞怡大飯店',
    enName: 'Junyi Hotel · Wufu, Kaohsiung',
    region: '高雄', city: 'Kaohsiung',
    tags: ['市中心', '商務', '精緻系列'],
    phone: '07-282-1888',
    bookingHours: '週一–週五 09:00–18:00',
    address: '高雄市前金區河東路10號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'urban',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 500, weekend: 1800 },
      { name: '四人房', en: 'Family Room', weekday: 1100, weekend: 2400 }
    ],
    notes: [
      '跨年、農曆春節、演唱會等特殊節日不適用。',
      '連續假日及特殊假日依現場規定加價。',
      '暑假（7/1–8/31）需另加 NT$300。'
    ],
    seasonal: '暑假另加 NT$300。'
  },
  {
    id: 'kaohsiung-shangart',
    name: '高雄七賢宮賞藝術大飯店',
    enName: 'Shang Art Hotel · QiXian',
    region: '高雄', city: 'Kaohsiung',
    tags: ['捷運美麗島', '主題房', '精緻系列'],
    phone: '07-239-9888',
    bookingHours: '09:00–18:00',
    address: '高雄市新興區林森一路237號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'urban',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 300, weekend: 1500 },
      { name: '三人房', en: 'Triple Room', weekday: 1000, weekend: 1800 },
      { name: '四人房', en: 'Family Room', weekday: 1300, weekend: 2100 },
      { name: '設計雙人房', en: 'Designer Double', weekday: 1000, weekend: 1800 },
      { name: '設計四人房', en: 'Designer Family', weekday: 1800, weekend: 2600 }
    ],
    notes: [
      '跨年、農曆春節、演唱會等特殊節日不適用。',
      '連續假日及特殊假日依現場規定。',
      '暑假（7/1–8/31）需另加 NT$300。'
    ],
    transit: ['國道一號南下→建國交流道→建國路→林森一路約 1 公里。', '高雄捷運美麗島站 8 號出口步行 8 分鐘。']
  },
  {
    id: 'kaohsiung-niaochao',
    name: '高雄七賢鳥巢七賢館',
    enName: 'NiaoChao QiXian Hotel',
    region: '高雄', city: 'Kaohsiung',
    tags: ['市區', '停車自理', '精緻系列'],
    phone: '07-285-6886',
    bookingHours: '09:00–18:00',
    address: '高雄市前金區七賢二路165號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'urban',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 600 },
      { name: '豪華四人房 A', en: 'Deluxe Family A', weekday: 1000, weekend: 1600 },
      { name: '豪華四人房 B', en: 'Deluxe Family B', weekday: 1200, weekend: 1800 }
    ],
    notes: ['停車自理。']
  },
  {
    id: 'taitung-cuiannong',
    name: '台東市區翠安儂風旅',
    enName: 'Cui An Nong Inn · Taitung',
    region: '台東', city: 'Taitung',
    tags: ['市區', '法式', '精緻系列'],
    phone: '08-922-9979',
    bookingHours: '09:00–18:00',
    address: '台東縣台東市四維路三段152號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'sunset',
    rooms: [
      { name: '小巴黎雙人房', en: 'Petit Paris Double', weekday: 0, weekend: 500 },
      { name: '大巴黎四人房', en: 'Grand Paris Quad', weekday: 1300, weekend: 1700 }
    ],
    notes: [
      '寒假平日同平日；一般假日／暑假平日另計。',
      '寒暑假週六、連續假日：雙人 +1100 / 四人 +2100。'
    ],
    seasonal: '寒暑假及連假另計加價。',
    transit: ['高雄→台九線→更生路左轉四維路→翠安儂風旅。', '花蓮→台 11 線→中華大橋→馬亨亨大道左轉四維路→翠安儂風旅。']
  },
  {
    id: 'taitung-oscar',
    name: '台東車站奧斯卡 & 夏日香氣民宿',
    enName: 'Oscar & Summer Aroma B&B · Taitung',
    region: '台東', city: 'Taitung',
    tags: ['火車站', '童話', '精緻系列'],
    phone: '0965-329-000',
    bookingHours: '09:00–18:00',
    address: '台東市興安路一段175號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'sunset',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 500 },
      { name: '四人房', en: 'Family Room', weekday: 700, weekend: 1200 }
    ],
    transit: ['台東火車站→右轉岩灣路 101 巷→左轉文昌路→右轉興安路一段。']
  },
  {
    id: 'taitung-luvdao-shuangfa',
    name: '台東綠島雙發飯店',
    enName: 'Shuang Fa Hotel · Green Island',
    region: '台東 · 綠島', city: 'Green Island',
    tags: ['離島', '不含早餐', '精緻系列'],
    phone: '0935-111-649',
    bookingHours: '09:00–18:00',
    address: '台東縣綠島鄉南寮路146號',
    fb: 'https://m.me/homearoundtw',
    line: 'https://line.me/R/ti/p/@homearound',
    theme: 'ocean',
    rooms: [
      { name: '雙人房', en: 'Double Room', weekday: 0, weekend: 800 },
      { name: '四人房', en: 'Family Room', weekday: 800, weekend: 2400 }
    ],
    notes: ['本系列不含早餐。']
  }
];

window.HOTELS_BY_ID = window.HOTELS.reduce(function(acc, h){ acc[h.id] = h; return acc; }, {});

/* ────────── 照片資料 ──────────
   依 theme 建立 pool，再為每間旅宿指定主圖（hotel.photo）。
   Hotel-detail 使用 getHotelPhotos(hotel, n) 取得 n 張：主圖 + 同 theme 池子。
   單一資料源，避免散落各頁面。 */
window.HOTEL_PHOTO_POOLS = {
  warm: [
    'photos/room-008-hotel-double-city-3x2.png',
    'photos/room-001-homestay-double-city-3x2.png',
    'photos/room-004-homestay-twin-city-3x2.png',
    'photos/room-016-business-double-city-3x2.png',
    'photos/room-007-homestay-suite-city-portrait.png'
  ],
  urban: [
    'photos/room-008-hotel-double-city-3x2.png',
    'photos/room-009-hotel-twin-city-4x3.png',
    'photos/room-012-hotel-suite-city-wide.png',
    'photos/room-015-business-single-city-3x2.png',
    'photos/room-016-business-double-city-3x2.png',
    'photos/room-001-homestay-double-city-3x2.png',
    'photos/room-004-homestay-twin-city-3x2.png',
    'photos/room-007-homestay-suite-city-portrait.png'
  ],
  island: [
    'photos/room-006-homestay-family-east-coast-4x3.png',
    'photos/room-013-hotel-twin-east-coast-4x3.png',
    'photos/room-018-business-family-east-coast-3x2.png',
    'photos/room-002-homestay-double-east-coast-4x3.png',
    'photos/room-020-business-double-east-coast-wide.png',
    'photos/room-010-hotel-double-east-coast-3x2.png'
  ],
  ocean: [
    'photos/room-020-business-double-east-coast-wide.png',
    'photos/room-013-hotel-twin-east-coast-4x3.png',
    'photos/room-006-homestay-family-east-coast-4x3.png',
    'photos/room-002-homestay-double-east-coast-4x3.png',
    'photos/room-018-business-family-east-coast-3x2.png',
    'photos/room-010-hotel-double-east-coast-3x2.png'
  ],
  sunset: [
    'photos/room-002-homestay-double-east-coast-4x3.png',
    'photos/room-010-hotel-double-east-coast-3x2.png',
    'photos/room-018-business-family-east-coast-3x2.png',
    'photos/room-006-homestay-family-east-coast-4x3.png',
    'photos/room-013-hotel-twin-east-coast-4x3.png',
    'photos/room-020-business-double-east-coast-wide.png'
  ],
  forest: [
    'photos/room-005-homestay-double-mountain-wide.png',
    'photos/room-011-hotel-family-mountain-3x2.png',
    'photos/room-003-homestay-family-mountain-3x2.png',
    'photos/room-017-business-twin-mountain-4x3.png',
    'photos/room-019-business-single-mountain-3x2.png',
    'photos/room-014-hotel-double-mountain-portrait.png'
  ]
};

/* 每間旅宿的主圖（出現在 hero / direct stays / bento / hotel-detail 主圖）。
   未列出者會自動取對應 theme pool 的第 1 張。 */
window.HOTEL_PHOTOS = {
  // Hero 5（必須是 wide-friendly 的圖）
  'taitung-luvdao-shuangfa':  'photos/room-020-business-double-east-coast-wide.png',
  'tainan-yujing':            'photos/room-008-hotel-double-city-3x2.png',
  'yilan-langkawi':           'photos/room-005-homestay-double-mountain-wide.png',
  'hsinchu-jianshi':          'photos/room-011-hotel-family-mountain-3x2.png',
  'kenting-bankala':          'photos/room-002-homestay-double-east-coast-4x3.png',

  // 其他飯店主圖（依 theme 與類型挑選）
  'hualien-shangcheng':       'photos/room-013-hotel-twin-east-coast-4x3.png',
  'penghu-zhe-su':            'photos/room-006-homestay-family-east-coast-4x3.png',
  'kinmen-in99':              'photos/room-009-hotel-twin-city-4x3.png',
  'penghu-tingyuanji':        'photos/room-018-business-family-east-coast-3x2.png',
  'newtaipei-jundi':          'photos/room-016-business-double-city-3x2.png',
  'kenting-lanshan':          'photos/room-010-hotel-double-east-coast-3x2.png',
  'liuqiu-hailiu':            'photos/room-006-homestay-family-east-coast-4x3.png',
  'nantou-jiamei':            'photos/room-019-business-single-mountain-3x2.png',
  'chiayi-huangjue':          'photos/room-015-business-single-city-3x2.png',
  'yilan-doubleyolk':         'photos/room-003-homestay-family-mountain-3x2.png',
  'taipei-meander1948':       'photos/room-001-homestay-double-city-3x2.png',
  'taipei-ximen':             'photos/room-004-homestay-twin-city-3x2.png',
  'penghu-515':               'photos/room-013-hotel-twin-east-coast-4x3.png',
  'taitung-tiehua-lezhi':     'photos/room-002-homestay-double-east-coast-4x3.png',
  'yilan-jinzhuya':           'photos/room-017-business-twin-mountain-4x3.png',
  'yilan-zhi1979':            'photos/room-014-hotel-double-mountain-portrait.png',
  'newtaipei-bitan':          'photos/room-012-hotel-suite-city-wide.png',
  'yilan-lichi':              'photos/room-005.png',
  'nantou-luding':            'photos/room-014.png',
  'nantou-ruiju':             'photos/room-017.png',
  'nantou-victoria':          'photos/room-019.png',
  'nantou-yimo':              'photos/room-025.png',
  'nantou-zhaodi':            'photos/room-031.png',
  'kaohsiung-junyi':          'photos/room-033.png',
  'kaohsiung-shangart':       'photos/room-007-homestay-suite-city-portrait.png',
  'kaohsiung-niaochao':       'photos/room-009-hotel-twin-city-4x3.png',
  'taitung-cuiannong':        'photos/room-018-business-family-east-coast-3x2.png',
  'taitung-oscar':            'photos/room-010-hotel-double-east-coast-3x2.png'
};

/* 注入 photo 欄位到每筆 hotel；查不到時退到 theme pool 第一張（room photo，用於房型展示） */
window.HOTELS.forEach(function(h){
  h.photo = window.HOTEL_PHOTOS[h.id]
         || (window.HOTEL_PHOTO_POOLS[h.theme] || [])[0]
         || 'photos/room-008-hotel-double-city-3x2.png';
});

/* 取 n 張：主圖優先，其餘從 theme pool 補；不重複；不夠時循環 */
window.getHotelPhotos = function(hotel, n) {
  var pool = (window.HOTEL_PHOTO_POOLS[hotel.theme] || []).slice();
  var out = [];
  if (hotel.photo) out.push(hotel.photo);
  pool.forEach(function(p){ if (out.indexOf(p) === -1 && out.length < n) out.push(p); });
  var i = 0;
  while (out.length < n && pool.length) { out.push(pool[i % pool.length]); i++; }
  return out.slice(0, n);
};

/* ===== 飯店外觀圖（首頁 hero / direct stays / bento / 編輯精選用） =====
   33 間飯店每間都有 4 個 variant：
   - hero-16x9.png       — 16:9 大圖，用於首頁 hero 輪播
   - board-3x2.png        — 3:2，用於 direct stays grid（aspect-ratio: 16/10 接近 3:2）
   - board-4x3.png        — 4:3，用於編輯精選 stay-photo（aspect-ratio: 4/3）
   - exterior-master.png  — 外觀主圖大原稿，用於 bento 與 hotel-detail 大圖背景
   檔案命名規則：photos/hotels/hotel-{id}-{variant}.png
*/
(function(){
  var BASE = 'photos/hotels/hotel-';
  window.HOTELS.forEach(function(h){
    h.heroPhoto         = BASE + h.id + '-hero-16x9.png';
    h.cardPhoto         = BASE + h.id + '-board-3x2.png';
    h.cardPhoto4x3      = BASE + h.id + '-board-4x3.png';
    h.exteriorPhoto     = BASE + h.id + '-exterior-master.png';
    h.familyGardenPhoto = BASE + h.id + '-family-garden-9x16.png';
  });
})();

/* 取得飯店圖（依 variant 安全 fallback）
   variant: 'hero' (16:9) | 'card' (3:2) | 'card4x3' (4:3)
          | 'exterior' (大原稿) | 'familyGarden' (9:16，目前僅 langkawi 有)
*/
window.getHotelImage = function(idOrHotel, variant) {
  var hotel = typeof idOrHotel === 'string'
    ? window.HOTELS.filter(function(h){ return h.id === idOrHotel; })[0]
    : idOrHotel;
  if (!hotel) return '';
  switch (variant) {
    case 'hero':         return hotel.heroPhoto;
    case 'card':         return hotel.cardPhoto;
    case 'card4x3':      return hotel.cardPhoto4x3;
    case 'exterior':     return hotel.exteriorPhoto;
    case 'familyGarden': return hotel.familyGardenPhoto;
    default:             return hotel.cardPhoto;
  }
};
