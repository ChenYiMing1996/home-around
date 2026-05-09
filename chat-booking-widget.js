(function () {
  if (window.__HA_BOOKING_WIDGET__) return;
  window.__HA_BOOKING_WIDGET__ = true;

  var state = {
    open: false,
    step: "hotel",
    hotelId: "",
    checkin: "",
    checkout: "",
    adults: 2,
    kids: 0,
    guestName: "",
    contact: "",
    notes: "",
    messages: []
  };

  var hotels = Array.isArray(window.HOTELS) ? window.HOTELS : [];
  var params = new URLSearchParams(window.location.search);

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function todayPlus(days) {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + days);
    return formatDate(d);
  }

  function hotelName(id) {
    var h = hotels.find(function (hotel) { return hotel.id === id; });
    return h ? h.name : "尚未選擇";
  }

  function initDefaults() {
    state.hotelId = params.get("hotel") || "";
    state.checkin = params.get("checkin") || todayPlus(1);
    state.checkout = params.get("checkout") || todayPlus(3);
    state.adults = Math.max(1, Math.min(8, parseInt(params.get("adults") || "2", 10) || 2));
    state.kids = Math.max(0, Math.min(6, parseInt(params.get("kids") || "0", 10) || 0));
    state.messages.push({
      role: "bot",
      text: "您好，我是 Home Around 訂房小幫手。可以一步一步協助您完成 demo 訂房，也可以直接在下方輸入文字留言。"
    });
  }

  function injectStyle() {
    var style = document.createElement("style");
    style.textContent = [
      ".ha-chat-launcher{position:fixed;right:22px;bottom:22px;z-index:9998;display:flex;align-items:center;gap:12px;border:0;background:transparent;padding:0;font-family:'Noto Sans TC',-apple-system,BlinkMacSystemFont,system-ui,sans-serif;cursor:pointer}",
      ".ha-chat-launcher__label{display:flex;flex-direction:column;align-items:flex-end;gap:1px;padding:9px 13px 9px 15px;border:1px solid oklch(70% 0.04 70/.45);border-radius:999px;background:oklch(98% 0.015 82/.92);box-shadow:0 16px 40px -24px oklch(20% 0.02 60/.45);backdrop-filter:blur(12px);color:oklch(28% 0.022 60)}",
      ".ha-chat-launcher__label strong{font-size:13px;line-height:1.1;font-weight:700;letter-spacing:.02em}.ha-chat-launcher__label span{font-size:10px;line-height:1.1;color:oklch(48% 0.018 60)}",
      ".ha-chat-orb{width:58px;height:58px;border-radius:50%;position:relative;display:grid;place-items:center;background:radial-gradient(circle at 35% 28%,oklch(96% 0.04 88) 0 18%,oklch(82% 0.16 88) 35%,oklch(42% 0.05 58) 100%);box-shadow:0 18px 46px -20px oklch(20% 0.02 60/.58),inset 0 1px 0 oklch(100% 0 0/.55);transition:transform .22s ease,box-shadow .22s ease}",
      ".ha-chat-orb:before{content:'';position:absolute;inset:-5px;border:1px solid oklch(82% 0.16 88/.42);border-radius:inherit;opacity:.9}.ha-chat-orb svg{width:28px;height:28px;color:oklch(19% 0.02 60);filter:drop-shadow(0 1px 0 oklch(100% 0 0/.35))}",
      ".ha-chat-launcher:hover .ha-chat-orb{transform:translateY(-2px) scale(1.03);box-shadow:0 24px 58px -22px oklch(20% 0.02 60/.65),inset 0 1px 0 oklch(100% 0 0/.6)}.ha-chat-launcher:focus-visible{outline:2px solid oklch(46% 0.09 38);outline-offset:6px;border-radius:999px}",
      ".ha-chat-panel{position:fixed;right:22px;bottom:92px;z-index:9999;width:min(420px,calc(100vw - 28px));height:min(680px,calc(100vh - 118px));display:flex;flex-direction:column;border:1px solid oklch(73% 0.018 70/.72);border-radius:18px;overflow:hidden;background:oklch(98% 0.015 82);box-shadow:0 26px 80px -34px oklch(14% 0.02 60/.55);font-family:'Noto Sans TC',-apple-system,BlinkMacSystemFont,system-ui,sans-serif;color:oklch(24% 0.022 60);opacity:0;transform:translateY(18px) scale(.98);pointer-events:none;transition:opacity .24s ease,transform .24s ease}",
      ".ha-chat-panel.is-open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}.ha-chat-head{display:flex;align-items:center;gap:12px;padding:16px 18px;background:oklch(28% 0.022 60);color:oklch(96% 0.014 82)}",
      ".ha-chat-head__mark{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:oklch(82% 0.16 88);color:oklch(20% 0.02 60)}.ha-chat-head__title{flex:1;min-width:0}.ha-chat-head__title strong{display:block;font-size:15px;line-height:1.2}.ha-chat-head__title span{display:block;margin-top:2px;font-size:11px;color:oklch(92% 0.01 82/.68)}",
      ".ha-chat-close{width:36px;height:36px;border-radius:50%;border:1px solid oklch(96% 0.014 82/.22);background:transparent;color:oklch(96% 0.014 82);font-size:22px;line-height:1;cursor:pointer}.ha-chat-close:hover{background:oklch(96% 0.014 82/.08)}.ha-chat-close:focus-visible{outline:2px solid oklch(82% 0.16 88);outline-offset:3px}",
      ".ha-chat-body{flex:1;overflow:auto;padding:18px;display:flex;flex-direction:column;gap:14px}.ha-msg{max-width:88%;padding:11px 13px;border-radius:14px;font-size:14px;line-height:1.55}.ha-msg.bot{align-self:flex-start;background:oklch(92% 0.018 82);border-top-left-radius:5px}.ha-msg.user{align-self:flex-end;background:oklch(30% 0.025 60);color:oklch(97% 0.014 82);border-top-right-radius:5px}",
      ".ha-card{display:grid;gap:12px;padding:14px;border:1px solid oklch(80% 0.012 70/.75);border-radius:14px;background:oklch(100% 0 0/.72)}.ha-card h4{margin:0;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:oklch(46% 0.09 38)}",
      ".ha-field{display:grid;gap:6px}.ha-field label{font-size:12px;font-weight:700;color:oklch(38% 0.02 60)}.ha-field input,.ha-field select,.ha-field textarea{width:100%;border:1px solid oklch(76% 0.014 70);border-radius:10px;background:oklch(99% 0.008 82);padding:11px 12px;font:inherit;font-size:14px;color:oklch(24% 0.022 60);outline:none}.ha-field textarea{resize:vertical;min-height:68px}.ha-field input:focus,.ha-field select:focus,.ha-field textarea:focus{border-color:oklch(46% 0.09 38);box-shadow:0 0 0 3px oklch(46% 0.09 38/.12)}",
      ".ha-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}.ha-step-actions{display:flex;justify-content:space-between;gap:10px;margin-top:2px}.ha-step-actions button{height:40px;border-radius:10px;border:1px solid oklch(70% 0.014 70);background:transparent;color:oklch(28% 0.022 60);padding:0 14px;font-weight:700;cursor:pointer}.ha-step-actions .primary{background:oklch(82% 0.16 88);border-color:transparent;color:oklch(20% 0.02 60)}.ha-step-actions button:disabled{opacity:.38;cursor:not-allowed}",
      ".ha-summary{display:grid;gap:7px;font-size:13px}.ha-summary div{display:flex;justify-content:space-between;gap:18px;border-bottom:1px solid oklch(82% 0.012 70/.55);padding-bottom:6px}.ha-summary b{font-weight:700;color:oklch(24% 0.022 60)}",
      ".ha-chat-compose{display:flex;gap:8px;padding:12px;border-top:1px solid oklch(78% 0.014 70/.65);background:oklch(96% 0.018 82)}.ha-chat-compose input{flex:1;border:1px solid oklch(76% 0.014 70);border-radius:999px;background:white;padding:12px 14px;font:inherit;font-size:14px;outline:none}.ha-chat-compose input:focus{border-color:oklch(46% 0.09 38);box-shadow:0 0 0 3px oklch(46% 0.09 38/.12)}.ha-chat-compose button{width:44px;height:44px;border-radius:50%;border:0;background:oklch(28% 0.022 60);color:oklch(96% 0.014 82);font-weight:800;cursor:pointer}.ha-chat-compose button:hover{background:oklch(36% 0.025 60)}",
      "@media(max-width:640px){.ha-chat-launcher{right:16px;bottom:16px}.ha-chat-launcher__label{display:none}.ha-chat-panel{right:10px;left:10px;bottom:84px;width:auto;height:min(680px,calc(100vh - 104px));border-radius:16px}.ha-row{grid-template-columns:1fr}}"
    ].join("");
    document.head.appendChild(style);
  }

  function hotelOptions() {
    if (!hotels.length) return '<option value="">尚無旅館資料</option>';
    return hotels.map(function (h) {
      return '<option value="' + escapeHtml(h.id) + '">' + escapeHtml(h.name) + '</option>';
    }).join("");
  }

  function renderStep() {
    var stepHtml = "";
    if (state.step === "hotel") {
      stepHtml =
        '<section class="ha-card">' +
        '<h4>Step 1 · 選擇旅館</h4>' +
        '<div class="ha-field"><label for="haHotel">想入住哪一間旅館？</label>' +
        '<select id="haHotel">' + hotelOptions() + '</select></div>' +
        '<div class="ha-step-actions"><span></span><button class="primary" data-ha-next>下一步</button></div>' +
        '</section>';
    } else if (state.step === "dates") {
      stepHtml =
        '<section class="ha-card">' +
        '<h4>Step 2 · 入住時間</h4>' +
        '<div class="ha-row">' +
        '<div class="ha-field"><label for="haCheckin">入住</label><input id="haCheckin" type="date" value="' + escapeHtml(state.checkin) + '"></div>' +
        '<div class="ha-field"><label for="haCheckout">退房</label><input id="haCheckout" type="date" value="' + escapeHtml(state.checkout) + '"></div>' +
        '</div>' +
        '<div class="ha-step-actions"><button data-ha-back>上一步</button><button class="primary" data-ha-next>下一步</button></div>' +
        '</section>';
    } else if (state.step === "guests") {
      stepHtml =
        '<section class="ha-card">' +
        '<h4>Step 3 · 入住人數</h4>' +
        '<div class="ha-row">' +
        '<div class="ha-field"><label for="haAdults">大人</label><input id="haAdults" type="number" min="1" max="8" value="' + state.adults + '"></div>' +
        '<div class="ha-field"><label for="haKids">兒童</label><input id="haKids" type="number" min="0" max="6" value="' + state.kids + '"></div>' +
        '</div>' +
        '<div class="ha-step-actions"><button data-ha-back>上一步</button><button class="primary" data-ha-next>下一步</button></div>' +
        '</section>';
    } else if (state.step === "name") {
      stepHtml =
        '<section class="ha-card">' +
        '<h4>Step 4 · 登記入住人</h4>' +
        '<div class="ha-field"><label for="haGuestName">入住人姓名</label><input id="haGuestName" type="text" value="' + escapeHtml(state.guestName) + '" placeholder="例如：王小明"></div>' +
        '<div class="ha-step-actions"><button data-ha-back>上一步</button><button class="primary" data-ha-next>下一步</button></div>' +
        '</section>';
    } else if (state.step === "contact") {
      stepHtml =
        '<section class="ha-card">' +
        '<h4>Step 5 · 聯絡方式</h4>' +
        '<div class="ha-field"><label for="haContact">電話或 Email</label><input id="haContact" type="text" value="' + escapeHtml(state.contact) + '" placeholder="0912-345-678 或 name@email.com"></div>' +
        '<div class="ha-field"><label for="haNotes">備註（選填）</label><textarea id="haNotes" placeholder="例如：希望高樓層、需要停車位">' + escapeHtml(state.notes) + '</textarea></div>' +
        '<div class="ha-step-actions"><button data-ha-back>上一步</button><button class="primary" data-ha-next>確認資料</button></div>' +
        '</section>';
    } else {
      var order = "HA-DEMO-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      stepHtml =
        '<section class="ha-card">' +
        '<h4>Demo 訂房摘要</h4>' +
        '<div class="ha-summary">' +
        '<div><span>訂單編號</span><b>' + order + '</b></div>' +
        '<div><span>旅館</span><b>' + escapeHtml(hotelName(state.hotelId)) + '</b></div>' +
        '<div><span>日期</span><b>' + escapeHtml(state.checkin) + ' → ' + escapeHtml(state.checkout) + '</b></div>' +
        '<div><span>人數</span><b>' + state.adults + ' 大人 · ' + state.kids + ' 兒童</b></div>' +
        '<div><span>入住人</span><b>' + escapeHtml(state.guestName || "未填") + '</b></div>' +
        '<div><span>聯絡</span><b>' + escapeHtml(state.contact || "未填") + '</b></div>' +
        '</div>' +
        '<p style="margin:10px 0 0;font-size:13px;color:oklch(48% 0.014 60);">這是前端 demo，尚未建立實際訂單。之後串接後端 API 時，可把這份資料送到訂房系統。</p>' +
        '<div class="ha-step-actions"><button data-ha-reset>重新填寫</button><button class="primary" data-ha-close>完成</button></div>' +
        '</section>';
    }
    return stepHtml;
  }

  function renderMessages() {
    return state.messages.map(function (m) {
      return '<div class="ha-msg ' + m.role + '">' + escapeHtml(m.text) + '</div>';
    }).join("");
  }

  function renderPanel() {
    var body = $("#haChatBody");
    if (!body) return;
    body.innerHTML = renderMessages() + renderStep();
    if (state.step === "hotel" && state.hotelId) $("#haHotel").value = state.hotelId;
    body.scrollTop = body.scrollHeight;
  }

  function readStep() {
    if (state.step === "hotel") {
      var hotel = $("#haHotel");
      if (hotel) state.hotelId = hotel.value;
      if (!state.hotelId && hotels[0]) state.hotelId = hotels[0].id;
      state.messages.push({ role: "user", text: "我想入住：" + hotelName(state.hotelId) });
    } else if (state.step === "dates") {
      state.checkin = $("#haCheckin").value || state.checkin;
      state.checkout = $("#haCheckout").value || state.checkout;
      if (state.checkout <= state.checkin) {
        state.messages.push({ role: "bot", text: "退房日期需要晚於入住日期，請再確認一次。" });
        return false;
      }
      state.messages.push({ role: "user", text: "入住 " + state.checkin + "，退房 " + state.checkout });
    } else if (state.step === "guests") {
      state.adults = Math.max(1, Math.min(8, parseInt($("#haAdults").value || "1", 10)));
      state.kids = Math.max(0, Math.min(6, parseInt($("#haKids").value || "0", 10)));
      state.messages.push({ role: "user", text: state.adults + " 位大人，" + state.kids + " 位兒童" });
    } else if (state.step === "name") {
      state.guestName = ($("#haGuestName").value || "").trim();
      if (!state.guestName) {
        state.messages.push({ role: "bot", text: "請先填寫登記入住人姓名。" });
        return false;
      }
      state.messages.push({ role: "user", text: "入住人：" + state.guestName });
    } else if (state.step === "contact") {
      state.contact = ($("#haContact").value || "").trim();
      state.notes = ($("#haNotes").value || "").trim();
      if (!state.contact) {
        state.messages.push({ role: "bot", text: "請至少留下電話或 Email，方便旅館聯絡。" });
        return false;
      }
      state.messages.push({ role: "user", text: "聯絡方式：" + state.contact + (state.notes ? "；備註：" + state.notes : "") });
    }
    return true;
  }

  function nextStep() {
    var order = ["hotel", "dates", "guests", "name", "contact", "done"];
    if (!readStep()) {
      renderPanel();
      return;
    }
    var idx = order.indexOf(state.step);
    state.step = order[Math.min(order.length - 1, idx + 1)];
    if (state.step !== "done") {
      state.messages.push({ role: "bot", text: "好的，下一步請繼續填寫。" });
    }
    renderPanel();
  }

  function backStep() {
    var order = ["hotel", "dates", "guests", "name", "contact", "done"];
    var idx = order.indexOf(state.step);
    state.step = order[Math.max(0, idx - 1)];
    renderPanel();
  }

  function resetFlow() {
    state.step = "hotel";
    state.hotelId = "";
    state.guestName = "";
    state.contact = "";
    state.notes = "";
    state.messages = [{ role: "bot", text: "我們重新開始。請先選擇想入住的旅館。" }];
    renderPanel();
  }

  function openPanel() {
    state.open = true;
    $("#haChatPanel").classList.add("is-open");
    $("#haChatLauncher").setAttribute("aria-expanded", "true");
    setTimeout(function () {
      var input = $("#haChatInput");
      if (input) input.focus();
    }, 120);
  }

  function closePanel() {
    state.open = false;
    $("#haChatPanel").classList.remove("is-open");
    $("#haChatLauncher").setAttribute("aria-expanded", "false");
    $("#haChatLauncher").focus();
  }

  function sendUserText() {
    var input = $("#haChatInput");
    var text = input ? input.value.trim() : "";
    if (!text) return;
    state.messages.push({ role: "user", text: text });
    input.value = "";
    renderPanel();
  }

  function injectMarkup() {
    var root = document.createElement("div");
    root.innerHTML =
      '<button type="button" class="ha-chat-launcher" id="haChatLauncher" aria-label="開啟訂房小幫手" aria-expanded="false" aria-controls="haChatPanel">' +
      '<span class="ha-chat-launcher__label"><strong>訂房小幫手</strong><span>Chat booking</span></span>' +
      '<span class="ha-chat-orb" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" fill="none"><path d="M5.8 16.7c-1.35-1.18-2.05-2.73-2.05-4.56C3.75 8.25 7.2 5.2 12 5.2s8.25 3.05 8.25 6.94S16.8 19.08 12 19.08c-.76 0-1.49-.08-2.17-.25L5.1 20.1l.7-3.4Z" fill="currentColor" opacity=".18"/><path d="M6.45 16.2c-1.18-1.05-1.8-2.42-1.8-4.03C4.65 8.75 7.72 6.05 12 6.05s7.35 2.7 7.35 6.12S16.28 18.3 12 18.3c-.76 0-1.5-.09-2.18-.28L6 19.05l.45-2.85Z" stroke="currentColor" stroke-width="1.45" stroke-linejoin="round"/><path d="M8.3 12.1h.02M12 12.1h.02M15.7 12.1h.02" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>' +
      '</span></button>' +
      '<aside class="ha-chat-panel" id="haChatPanel" role="dialog" aria-modal="false" aria-label="訂房小幫手聊天視窗">' +
      '<header class="ha-chat-head"><span class="ha-chat-head__mark" aria-hidden="true">⌂</span><span class="ha-chat-head__title"><strong>Home Around 訂房小幫手</strong><span>前端 demo，不會送出真實訂單</span></span><button class="ha-chat-close" id="haChatClose" type="button" aria-label="關閉訂房小幫手">×</button></header>' +
      '<div class="ha-chat-body" id="haChatBody"></div>' +
      '<form class="ha-chat-compose" id="haChatCompose"><input id="haChatInput" type="text" placeholder="也可以直接輸入文字留言..." autocomplete="off" aria-label="輸入訊息"><button type="submit" aria-label="送出訊息">↑</button></form>' +
      '</aside>';
    document.body.appendChild(root);
  }

  function bindEvents() {
    $("#haChatLauncher").addEventListener("click", openPanel);
    $("#haChatClose").addEventListener("click", closePanel);
    $("#haChatCompose").addEventListener("submit", function (event) {
      event.preventDefault();
      sendUserText();
    });
    document.addEventListener("click", function (event) {
      if (event.target.closest("[data-ha-next]")) nextStep();
      if (event.target.closest("[data-ha-back]")) backStep();
      if (event.target.closest("[data-ha-reset]")) resetFlow();
      if (event.target.closest("[data-ha-close]")) closePanel();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && state.open) closePanel();
    });
  }

  initDefaults();
  injectStyle();
  injectMarkup();
  renderPanel();
  bindEvents();
})();
