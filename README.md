# Home Around Taiwan Tours

> 台灣在地旅宿訂房網站 — 多語系、資料驅動、響應式前端作品

一個以台灣 33 間直營旅宿為主題的訂房網站前端，從首頁瀏覽、房型搜尋、旅宿詳情到訂房流程完整串接。純手刻 HTML / CSS / Vanilla JavaScript，**無框架、無 build 步驟**，強調工程結構與可維護性。

---

## ✨ 功能特色

- **三語系即時切換（繁中 / English / 日本語）** — 單檔字典 + `data-i18n` 屬性掃描，切換語言不重整頁面，並以 `localStorage` 記憶偏好。
- **資料驅動渲染** — 33 間旅宿資料集中於 `hotels-data.js`，旅宿詳情頁以網址參數 `?id=` 動態產生，新增旅宿不需改動 HTML。
- **對話式訂房 Widget** — 右下角浮動元件，以聊天問答方式引導使用者完成訂房。
- **共用行動版選單 Runtime** — 四個頁面共用同一份 `mobile-drawer.js` / `.css`，避免重複程式碼、統一行為與視覺。
- **設計系統規範** — 依 `brand-spec.md` 定義的色彩比例（60/20/10/7/3）、OKLch 色彩、字級級距與留白規則實作。
- **效能優化** — 圖片全面採用 WebP（相較原始 PNG 體積約降至 1/12）。

---

## 🛠 技術棧

| 分類 | 使用technologies |
|---|---|
| 結構 | HTML5（語意化標籤、無障礙 aria 屬性） |
| 樣式 | CSS3（Grid / Flexbox、CSS 變數、OKLch 色彩、響應式 RWD） |
| 邏輯 | Vanilla JavaScript（ES6，無框架、無依賴） |
| 多語系 | 自製 i18n 模組（字典 + 事件驅動重繪） |
| 影像 | WebP |

> 刻意不使用框架，以展示對原生 DOM、事件系統與模組化設計的掌握。

---

## 📁 專案結構

```
home-around/
├── index.html              # 首頁：Hero 輪播、搜尋、旅宿列表、親子專區
├── rooms.html              # 房型搜尋與篩選
├── hotel-detail.html       # 旅宿詳情（?id= 動態渲染）
├── booking.html            # 訂房表單流程
├── hotels-data.js          # 33 間旅宿資料集 + 圖片解析 helper
├── i18n.js                 # 三語系字典與切換器
├── chat-booking-widget.js  # 對話式訂房元件
├── mobile-drawer.js/.css   # 共用行動版選單 runtime
├── brand-spec.md           # 設計系統規範
└── photos/                 # 旅宿與房型圖（WebP）
```

---

## 🚀 本地執行

純靜態網站，不需安裝任何依賴，直接以本機伺服器開啟即可：

```bash
# 方法一：Python
python -m http.server 8000

# 方法二：Node（npx serve）
npx serve
```

開啟瀏覽器前往 `http://localhost:8000`。

> 建議透過本機伺服器開啟而非直接雙擊 HTML，以確保多頁面連結與 `?id=` 參數正常運作。

---

## 📸 畫面截圖

> _在此放上首頁、旅宿詳情、訂房頁的截圖_

---

## 📝 備註

本專案為個人前端練習作品，所有旅宿資訊、聯絡方式與圖片皆為示範用途，非真實營業資料。

---

**Author** — [ChenYiMing1996](https://github.com/ChenYiMing1996)
