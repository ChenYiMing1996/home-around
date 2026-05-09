# Home Around — 33 間飯店外觀照 AI 生成 Prompt

## 使用說明

1. **工具**: Gemini 2.5 Flash Image / ChatGPT-4o (DALL-E 3) / Midjourney v6
2. **比例**: 16:9 (1920×1080 或更高)
3. **品質**: 飯店行銷級別、無人、無 logo、無可讀文字
4. **命名規則**: 生成後請依下表命名,丟到 `photos/hotels/` 資料夾
5. **共用負面條件**(每張都要加):
   ```
   no people, no logos, no readable text, no signs with letters,
   no obvious landmarks, no celebrities, no flags, no copyrighted
   architecture, photorealistic, professional travel photography,
   16:9 aspect ratio, high resolution
   ```

---

## 通用 Style Suffix(可貼在每條 prompt 後面)

```
photorealistic, professional travel photography style,
golden hour or natural daylight as specified, shallow depth of field,
warm color grading, high resolution, 16:9 aspect ratio,
no people, no readable text, no logos, no signs
```

---

## 五大 Hero 主視覺 (高優先,首頁輪播會用)

這 5 張會出現在首頁 hero 輪播,務必精緻。

### 1. `hotel-taitung-luvdao-shuangfa-hero-16x9.png`
**台東綠島雙發飯店 — Shuang Fa Hotel · Green Island**

```
A boutique island hotel exterior on Green Island, Taiwan, at dawn.
Low-rise white-and-blue concrete building, 2-3 stories, simple modern
architecture, palm trees swaying in front, ocean horizon visible in
background, soft golden sunrise light, calm sea, tropical island vibe,
no people, no readable text. 16:9.
```

### 2. `hotel-tainan-yujing-hero-16x9.png`
**台南玉井家天下行旅 — Jiatianxia Inn · Yujing**

```
A small charming pet-friendly inn in a Taiwanese small-town setting in
Yujing district, Tainan. Renovated 2-story building with brick and
warm wood facade, potted plants and ferns by the entrance, a small
pet bowl visible, soft afternoon sun, quiet alley with old red-brick
townhouses behind, mango trees in distance (Yujing is known for mangos),
peaceful slow-life atmosphere, no people, no readable text. 16:9.
```

### 3. `hotel-yilan-langkawi-hero-16x9.png`
**宜蘭羅東蘭卡威庭園民宿 — Langkawi Garden B&B**

```
A Southeast-Asian style garden villa in Luodong, Yilan, Taiwan.
Single-story tropical bungalow with sloped tile roof, surrounded by a
spacious 1000-square-meter garden, tall Norfolk pines and falling-rain
cypress trees, garden path with stone steps, small children's wading
pool visible, wooden swing under a tree, lush green tropical
landscaping, late afternoon golden hour light, family-friendly resort
vibe, no people, no readable text. 16:9.
```

### 4. `hotel-hsinchu-jianshi-hero-16x9.png`
**新竹尖石朝日溫泉會館 — Asahi Hot Spring Resort · Jianshi**

```
A Japanese-style hot spring resort nestled in a misty mountain valley
in Jianshi, Hsinchu, Taiwan. Two-story dark-wood ryokan-style
building with wide eaves, hot spring steam rising from outdoor pools
in foreground, lush green forest and mountain ridges in background,
the Jin-Ping river visible, early morning misty light, tranquil
nature retreat, no people, no readable text. 16:9.
```

### 5. `hotel-kenting-bankala-hero-16x9.png`
**墾丁恆春班卡拉 — Bankala · Hengchun**

```
A coastal villa near Nanwan beach, Hengchun, Kenting, Taiwan.
Mediterranean-style 2-story white building with blue trim, ocean view
balconies, palm trees, the South Bay (Nanwan) beach visible 100
meters away, golden sunset light over the sea, warm sky with orange
and pink hues, surfboards leaning against a wooden fence, beach
holiday vibe, no people, no readable text. 16:9.
```

---

## 都會商旅類 (urban theme)

### 6. `hotel-hualien-shangcheng-hero-16x9.png`
**花蓮市區香城大飯店 — Hualien Charming City Hotel**

```
A modern mid-rise business hotel exterior in downtown Hualien city,
Taiwan. 8-story rectangular building with floor-to-ceiling windows,
clean contemporary facade in beige and dark grey, free parking lot in
foreground, palm trees lining the street, late afternoon sun, urban
business hotel atmosphere, no people, no readable text. 16:9.
```

### 7. `hotel-kinmen-in99-hero-16x9.png`
**金門 IN99 精品旅館 — IN99 Boutique Hotel · Kinmen**

```
A boutique hotel in central Jincheng town, Kinmen, Taiwan. Renovated
3-story townhouse with mix of traditional Min-style red brick and
modern grey concrete, wood-paneled entrance, narrow stone-paved
street with Kinmen-style swallowtail-roof houses in background,
warm late afternoon light, quiet historic island town atmosphere,
no people, no readable text. 16:9.
```

### 8. `hotel-newtaipei-jundi-hero-16x9.png`
**新北中和君迪商旅 — JunDi Business Hotel**

```
A modern business hotel exterior in Zhonghe district, New Taipei,
Taiwan. 6-story contemporary building with clean glass facade, dark
metal accents, free outdoor parking spaces in front, hedges and small
trees, slightly overcast soft daylight, urban commuter neighborhood
backdrop, no people, no readable text. 16:9.
```

### 9. `hotel-chiayi-huangjue-hero-16x9.png`
**嘉義皇爵大飯店 — Royal Chiayi Hotel**

```
A mid-century renovated city hotel exterior in West District, Chiayi
city, Taiwan. 7-story rectangular building with cream-colored stone
facade and dark trim, retro-modern style, classical entrance with
columns, urban street with bicycles and old shophouses in background,
warm afternoon light, mid-tier city hotel atmosphere, no people, no
readable text. 16:9.
```

### 10. `hotel-taipei-meander1948-hero-16x9.png`
**台北 MEANDER 1948 — Datong District**

```
A boutique design hotel converted from a 1948 building in Datong
district, Taipei, Taiwan. 4-story renovated old-Taipei townhouse,
restored grey concrete facade with original 1940s art-deco details,
modern black metal balconies, narrow Taipei alley with motorcycles
parked, warm dusk lighting with hotel windows starting to glow, MRT
neighborhood vibe, no people, no readable text. 16:9.
```

### 11. `hotel-taipei-ximen-hero-16x9.png`
**台北漫步西門館 — Meander Ximen**

```
A boutique design hotel exterior in the busy Ximending shopping
district, Wanhua, Taipei, Taiwan. 5-story narrow building with bold
geometric facade, dark grey panels with warm wood accents, neon-lit
street of Ximending visible (no readable text on signs), young urban
nightlife vibe, twilight blue-hour lighting, no people, no readable
text on any signage. 16:9.
```

### 12. `hotel-newtaipei-bitan-hero-16x9.png`
**新北碧潭帝景飯店 — Imperial View Hotel · Bitan**

```
A lakeside hotel overlooking Bitan Lake in Xindian district, New
Taipei, Taiwan. 8-story modern hotel with floor-to-ceiling windows
facing the emerald-green Bitan lake, the iconic Bitan suspension
bridge visible in background (no text), surrounding green hills,
sunset reflecting on the calm water, lake-view resort hotel vibe,
no people, no readable text. 16:9.
```

### 13. `hotel-nantou-zhaodi-hero-16x9.png`
**南投埔里兆迪商旅 — Zhao Di Business Hotel · Puli**

```
A small mid-tier business hotel exterior in central Puli town, Nantou,
Taiwan. 4-story modern building with clean cream-and-grey facade,
glass entrance lobby visible, palm tree by the entrance, central
Taiwan mountains faintly visible in background, late morning soft
light, small-town business hotel atmosphere, no people, no readable
text. 16:9.
```

### 14. `hotel-kaohsiung-junyi-hero-16x9.png`
**高雄五福鈞怡大飯店 — Junyi Hotel · Wufu, Kaohsiung**

```
A modern city hotel exterior in central Kaohsiung, Taiwan. 12-story
contemporary tower with blue glass facade, palm trees lining the
boulevard, the Love River visible in background, dusk twilight with
hotel windows lit warmly, modern southern Taiwan urban atmosphere,
no people, no readable text. 16:9.
```

### 15. `hotel-kaohsiung-shangart-hero-16x9.png`
**高雄七賢宮賞藝術大飯店 — Shang Art Hotel · QiXian**

```
An art-themed boutique hotel exterior on QiXian Road, Xinxing
district, Kaohsiung, Taiwan. 7-story modern building with sculptural
facade featuring artistic geometric patterns and warm bronze accents,
near the Formosa Boulevard MRT station, bustling urban street,
dusk-blue hour lighting, contemporary art hotel vibe, no people, no
readable text. 16:9.
```

### 16. `hotel-kaohsiung-niaochao-hero-16x9.png`
**高雄七賢鳥巢七賢館 — NiaoChao QiXian Hotel**

```
A small modern city hotel exterior in QianJin district, Kaohsiung,
Taiwan. 5-story renovated building with warm wood-and-grey facade,
inspired by the "bird nest" name with subtle organic curve detail at
the top, a small palm tree by entrance, urban side street with
parked scooters, golden hour southern Taiwan sunlight, friendly
midscale hotel atmosphere, no people, no readable text. 16:9.
```

---

## 海島 / 海景類 (island / ocean theme)

### 17. `hotel-penghu-zhe-su-hero-16x9.png`
**澎湖晢宿民宿精品館 — Zhe-Su Boutique B&B · Penghu**

```
A boutique B&B exterior in XiWei village, Magong, Penghu islands,
Taiwan. Two-story whitewashed concrete building with bright blue
window frames (Aegean style), a small garden of Penghu native
plants, basalt stone wall in foreground, ocean horizon visible in
background, bright midday sunlight, classic Penghu island village
atmosphere, no people, no readable text. 16:9.
```

### 18. `hotel-penghu-tingyuanji-hero-16x9.png`
**澎湖庭圓季海景民宿 — Ting Yuan Ji Sea-view B&B**

```
A sea-view B&B exterior in XiWei village, Penghu islands, Taiwan.
Three-story modern white minimalist building with full-height
ocean-facing windows, expansive ocean view in background with the
turquoise Penghu sea, basalt-stone garden path, bright afternoon
sunlight, premium sea-view holiday rental vibe, no people, no
readable text. 16:9.
```

### 19. `hotel-penghu-515-hero-16x9.png`
**澎湖 515 會館民宿 — 515 Hall B&B**

```
A small boutique B&B exterior in XiWei, Magong, Penghu islands,
Taiwan. Two-story renovated stone-and-concrete house with warm wood
accents, traditional Penghu basalt-stone wall, scattered island
plants, ocean visible at the end of the lane, afternoon sun,
quiet island village atmosphere, no people, no readable text. 16:9.
```

### 20. `hotel-liuqiu-hailiu-hero-16x9.png`
**小琉球 海琉小日子輕旅 — Hailiu Slow-life Inn · Xiaoliuqiu**

```
A small slow-life inn exterior on Xiaoliuqiu (Lambai) island,
Pingtung, Taiwan. Two-story whitewashed building with bright tropical
turquoise trim and rattan furniture on the porch, hammock between
palm trees, coral-stone sidewalk, ocean horizon visible at the end
of the street, late afternoon golden hour, small-island vacation
vibe, no people, no readable text. 16:9.
```

### 21. `hotel-kenting-lanshan-hero-16x9.png`
**屏東恆春藍衫海景山莊 — Lanshan Sea-view Villa**

```
A pet-friendly seaside villa exterior in Hengchun, Pingtung, Taiwan.
Two-story rustic blue-and-white painted villa surrounded by tropical
trees, pet-friendly setting with a wooden dog bowl and leash hook by
entrance, ocean glimpse through the trees in background, golden
sunset light over the South Taiwan sea, casual coastal lifestyle,
no people, no readable text. 16:9.
```

---

## 山中 / 森林類 (forest theme)

### 22. `hotel-nantou-jiamei-hero-16x9.png`
**南投仁愛佳美休閒山莊 — Jiamei Mountain Villa · Renai**

```
A mountain villa exterior in Renai township, Nantou, Taiwan. Two-
story wooden alpine-style lodge nestled among tall cedar and pine
trees, pitched dark-brown roof, stone chimney, spacious wooden deck,
mist drifting through the surrounding mountains, early morning
forest atmosphere, central Taiwan mountain retreat vibe, no people,
no readable text. 16:9.
```

### 23. `hotel-yilan-doubleyolk-hero-16x9.png`
**宜蘭冬山雙黃蛋生活空間民宿 — Double Yolk Living Space · Dongshan**

```
A countryside guesthouse exterior in Dongshan township, Yilan,
Taiwan. Modern minimalist 2-story house surrounded by rice paddies
and a small egg-themed lifestyle garden, white concrete walls with
warm wood accents, large windows reflecting the sky, country lane
in foreground, late afternoon golden light over green rice fields,
slow rural life atmosphere, no people, no readable text. 16:9.
```

### 24. `hotel-yilan-jinzhuya-hero-16x9.png`
**宜蘭五結金洙椏民宿 — Jin Zhu Ya B&B · Wujie**

```
A countryside B&B exterior in Wujie township, Yilan, Taiwan. Two-
story modern Taiwanese country house with white-grey facade and
deep wooden balconies, large garden of grass and flowering plants,
rice paddies stretching to mountains in background, soft afternoon
light, peaceful Yilan countryside atmosphere, no people, no
readable text. 16:9.
```

### 25. `hotel-yilan-zhi1979-hero-16x9.png`
**宜蘭五結致 1979 — Zhi 1979 · Wujie**

```
A boutique guesthouse converted from an old 1979 garment factory in
Wujie, Yilan, Taiwan. Two-story building with industrial steel-frame
exterior, warm wooden cladding mixed with raw concrete and grey
metal, large factory-style windows, surrounded by Yilan countryside
greenery, dusk lighting with warm interior glow, industrial-chic
renovation atmosphere, no people, no readable text. 16:9.
```

### 26. `hotel-yilan-lichi-hero-16x9.png`
**宜蘭冬山荔枝民宿 — Lichi B&B · Dongshan**

```
A small countryside B&B exterior in Dongshan township, Yilan,
Taiwan. Two-story Taiwanese-style house with warm orange-red brick
facade, lychee fruit trees in the garden, near the Dongshan River
Water Park, gentle morning light over green Yilan countryside,
family-friendly slow-life atmosphere, no people, no readable text.
16:9.
```

### 27. `hotel-nantou-luding-hero-16x9.png`
**南投鹿谷鹿鼎莊 — Luding Manor · Lugu**

```
A mountain manor exterior in Lugu township, Nantou, Taiwan, in the
Dongding tea region. Two-story stone-and-wood villa surrounded by
green Oolong tea plantation terraces on the slope, bamboo grove in
background, faint mist over the mountain valley, late afternoon
warm light, premium Taiwan tea-country retreat atmosphere, no
people, no readable text. 16:9.
```

### 28. `hotel-nantou-ruiju-hero-16x9.png`
**南投日月潭瑞居渡假飯店 — Rui Ju Resort · Sun Moon Lake**

```
A mountain resort exterior in Yuchi township, Nantou, Taiwan, near
Sun Moon Lake. Three-story modern resort with warm beige stone
facade and dark wood accents, large glass lobby, surrounded by
forested mountains, hint of Sun Moon Lake water visible in distance,
golden hour light over the mountains, premium lakeside resort
atmosphere, no people, no readable text. 16:9.
```

### 29. `hotel-nantou-victoria-hero-16x9.png`
**南投清境維多利亞山莊 — Victoria Mountain Villa · Cingjing**

```
A European-style mountain villa exterior in Cingjing, Renai township,
Nantou, Taiwan. Three-story Victorian English country manor with
red-brick walls, white windows and steep dark roofs, set against
the Cingjing high mountain ranges and rolling pasture, sheep
grazing on green slopes in distance, soft afternoon mountain light,
European alpine retreat atmosphere, no people, no readable text.
16:9.
```

### 30. `hotel-nantou-yimo-hero-16x9.png`
**南投清境依默騎馬莊園 — YiMo Equestrian Estate · Cingjing**

```
A mountain log cabin estate exterior in Cingjing, Nantou, Taiwan.
Two-story rustic European wood cabin lodge with stone foundation,
wide front lawn, a paddock with a horse grazing in distance (no
people), surrounded by Cingjing high mountains and pine trees,
mist drifting in the valley, late afternoon golden light, rustic
equestrian retreat atmosphere, no people, no readable text. 16:9.
```

---

## 落日 / 暖橘類 (sunset theme)

### 31. `hotel-taitung-tiehua-lezhi-hero-16x9.png`
**台東鐵花村樂知旅店 — LeZhi Inn · TieHua Village, Taitung**

```
A boutique inn exterior in central Taitung city, Taiwan, near the
TieHua Village music venue area. Three-story renovated building
with warm wood and rattan facade, bohemian indie atmosphere, hanging
plants and small string lights on the porch, the East Coast mountain
ranges visible in distance, warm sunset golden hour, alternative
indie travel vibe, no people, no readable text. 16:9.
```

### 32. `hotel-taitung-cuiannong-hero-16x9.png`
**台東市區翠安儂風旅 — Cui An Nong Inn · Taitung**

```
A French-style boutique inn exterior in Taitung city, Taiwan. Three-
story Parisian-inspired building with cream-colored stucco walls and
black wrought-iron balconies, mansard roof, small French cafe
seating area in front (empty), the Pacific coast mountains visible
in distance, warm late afternoon east-coast Taiwan light, charming
European-meets-Taiwan-east-coast atmosphere, no people, no readable
text. 16:9.
```

### 33. `hotel-taitung-oscar-hero-16x9.png`
**台東車站奧斯卡 & 夏日香氣民宿 — Oscar & Summer Aroma B&B**

```
A small fairytale-themed B&B exterior near Taitung train station,
Taiwan. Two-story whimsical building with pastel pink and butter
yellow facade, arched windows, a small fragrant herb garden in front
(lavender, rosemary), white wooden picket fence, warm late afternoon
sunlight, charming European cottage meets summer-aroma fairytale
atmosphere, no people, no readable text. 16:9.
```

---

## 接圖規格(我會自動處理,你只需丟檔)

把生成完的 33 張圖,**檔名嚴格對齊上表**,放到下面這個資料夾:

```
C:\Users\abc102601\Documents\Codex\2026-05-02\https-github-com-nexu-io-open\.od\projects\b07be789-1955-4170-898c-61bcb9cbcb9b\photos\hotels\
```

完成後告訴我「圖丟好了」,我立刻寫一段 JS,把 32+1 個 hotel id 自動接上 hero 輪播 + Direct stays 32 卡 + Bento 體驗 5 格 + Editor's pick 3 卡。**首頁五處全部換成真實飯店外觀照,房型實拍照只留在房型展示頁。**

如果某張你不滿意要重生,只要新檔覆蓋同名 png,首頁立刻會跟著換,不需要再改 code。

---

## 進階建議

1. **品質優先順序**: 先生 Hero 5 張(會出現在首頁最大位置),驗證風格 OK 再批次生其他 28 張
2. **如果用 Midjourney**: 在每條 prompt 後面加 `--ar 16:9 --v 6 --style raw`
3. **如果用 ChatGPT-4o**: 直接貼整段 prompt,要求「generate as 16:9 wide image」
4. **如果用 Gemini 2.5 Flash Image**: 直接貼,Gemini 對英文 prompt 解析準確,記得指定 `aspect ratio: 16:9`
5. **批次效率**: 開 5 個分頁同時跑 5 條 prompt,30 分鐘內可完成全部 33 張

祝順利。
