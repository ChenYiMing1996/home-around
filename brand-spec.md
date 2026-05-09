# Home Around Taiwan Tours — 設計稿用 brand spec

來源：`mor0bx7k-home-around-ci-tokens.json` + `mor0bx7k-home-around-ci-guide.html` + `mor0bric-home-around-LOGO.png`

## Logo 規則（不可違反）
- 使用 `mor0bric-home-around-LOGO.png` 原檔，不得重繪、改色、拆元素、加效果
- 出現位置：頁首左側、Footer、必要時 hero

## Color tokens（OKLch 對應 hex）
```css
--bg:        oklch(96.5% 0.012 80);   /* #F4F1EC warm-gray — 頁面底色 */
--surface:   oklch(100% 0 0);         /* #FFFFFF white — 卡片 */
--cream:     oklch(98% 0.05 95);      /* #FFF6D8 soft cream — 暖色區塊 */
--fg:        oklch(20% 0.012 60);     /* #2F2A27 charcoal — 內文 */
--brown:     oklch(34% 0.018 60);     /* #4B413B logo dark brown — 標題、Header */
--muted:     oklch(48% 0.012 60);     /* 副文字 */
--border:    oklch(82% 0.008 60);     /* hairline 邊框 */
--teal:      oklch(67% 0.09 185);     /* #4FAFA3 Island Teal — 資訊重點 */
--yellow:    oklch(82% 0.16 88);      /* #F2C21A Taiwan Warm Yellow — 主 CTA */
--green:     oklch(74% 0.13 130);     /* #91B94A Family Green — 親子標籤 */
```

## Color ratio（必須遵守）
| 比例 | Token | 用途 |
|---|---|---|
| 60% | warm-gray / cream / white | 頁面底色、區塊背景、留白 |
| 20% | brown / charcoal | Header、標題、長期穩定面 |
| 10% | teal | 資訊提示、次要按鈕、分隔線 |
| 7%  | yellow | 主要 CTA「立即訂房」「查看空房」 |
| 3%  | green | 親子／自然 tag |

## 字體系統
```css
--font-display: 'Tiempos Headline', 'Newsreader', 'Iowan Old Style', Georgia, 'Noto Serif TC', serif;
--font-body:    -apple-system, BlinkMacSystemFont, 'Inter', 'Noto Sans TC', 'Microsoft JhengHei', system-ui, sans-serif;
--font-mono:    ui-monospace, 'JetBrains Mono', 'IBM Plex Mono', Menlo, monospace;
```
- 中文：Noto Serif TC（display）+ Noto Sans TC（body）
- 英文：Tiempos / Newsreader（display）+ Inter（body）
- 中英混排 fallback 鏈確保一致

## Posture（現代極簡 × 豪華精緻 的折衷）
- **留白優先**：section padding 96–128px（desktop），不擠
- **Hairline borders**：1px solid var(--border)，不用 shadow（除了 hover 時的微細浮起）
- **Radii**：8–12px，不要硬角也不要過軟
- **Hero**：滿版 16:9 圖（佔據高度 70vh），標題 clamp(48px, 6vw, 88px)，襯線
- **Type scale**：1.333 (perfect fourth)，body 17–18px，line-height 1.65
- **Numerics**：tabular-nums（價格、樓層、人數）
- **Accent budget**：每一視窗範圍 yellow CTA 最多 1 個，teal 最多 2 處
- **Animation**：opacity / transform 200–400ms ease-out，禁止 bounce / spring

## 禁忌
- 不要在 hero 上疊三色漸層
- 不要把 yellow / teal / green 三色平均分配（違反 60/20/10/7/3）
- 不要用 emoji 當 feature icon
- 不要修改 Logo
