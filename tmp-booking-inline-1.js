
(function(){
  'use  strict';

  //  蝡憟隤頂nav/breadcrumb/footer  
  if  (window.I18N)  window.I18N.applyToDom();

  //  
  //  Helpers
  //  
  //  i18n  shim嚗頛i18n.js  銋嚗key  園閮
  function  getI()  {  return  window.I18N;  }
  function  t(key,  opts)  {  var  I  =  getI();  return  I    I.t(key,  opts)  :  key;  }
  function  hotelDisplayName(h)  {  var  I  =  getI();  return  I    I.hotelName(h)  :  h.name;  }
  function  regionDisplay(r)  {  var  I  =  getI();  return  I    I.regionName(r)  :  r;  }
  function  roomDisplay(r)  {  var  I  =  getI();  return  I    I.roomName(r)  :  r.name;  }

  function  escapeHtml(s){
    return  String(s  ==  null    ''  :  s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }
  function  getParam(name){
    var  m  =  new  RegExp('[&]'  +  name  +  '=([^&]*)').exec(window.location.search);
    return  m    decodeURIComponent(m[1].replace(/\+/g,  '  '))  :  '';
  }
  function  fmtDate(d){
    var  y  =  d.getFullYear();
    var  m  =  String(d.getMonth()+1).padStart(2,'0');
    var  dd  =  String(d.getDate()).padStart(2,'0');
    return  y  +  '-'  +  m  +  '-'  +  dd;
  }
  function  parseDate(s){
    if  (!s)  return  null;
    var  p  =  s.split('-').map(Number);
    if  (p.length  !==  3)  return  null;
    var  d  =  new  Date(p[0],  p[1]-1,  p[2]);
    if  (isNaN(d.getTime()))  return  null;
    return  d;
  }
  function  isWeekend(d){
    var  day  =  d.getDay();  //  0=Sun,  5=Fri,  6=Sat
    return  day  ===  5  ||  day  ===  6;
  }
  function  nightsByType(a,  b){
    var  weekday  =  0,  weekend  =  0;
    var  cur  =  new  Date(a.getTime());
    while  (cur  <  b)  {
      if  (isWeekend(cur))  weekend++;  else  weekday++;
      cur.setDate(cur.getDate()  +  1);
    }
    return  {  weekday:  weekday,  weekend:  weekend  };
  }
  function  genOrderId(){
    var  ts  =  Date.now().toString(36).toUpperCase();
    var  rnd  =  Math.random().toString(36).slice(2,6).toUpperCase();
    return  'HA-'  +  ts.slice(-6)  +  '-'  +  rnd;
  }

  var  BASE_RATE  =  2800;

  //  
  //  Data  wiring
  //  
  var  HOTELS  =  (window.HOTELS  ||  []);
  var  preHotelId  =  getParam('hotel');
  var  preRoomName  =  getParam('room');
  //  敺撠”桀葆詨賂demo  剁∪蝡荔
  var  preCheckin  =  getParam('checkin');    //  YYYY-MM-DD
  var  preCheckout  =  getParam('checkout');  //  YYYY-MM-DD
  var  preAdults  =  getParam('adults');      //  1-8
  var  preKids  =  getParam('kids');          //  0-6

  //  蝟餅靽雿輻歇頛詨摰對snapshotForm  券皜脣restoreForm  券皜脣憛
  function  snapshotForm(){
    function  v(id){  var  el  =  document.getElementById(id);  return  el    el.value  :  '';  }
    var  voucher  =  document.querySelector('input[name="voucher"]:checked');
    return  {
      hotel:  v('f-hotel'),
      room:  v('f-room'),
      checkin:  v('f-checkin'),
      checkout:  v('f-checkout'),
      adults:  v('f-adults')  ||  '2',
      kids:  v('f-kids')  ||  '0',
      voucher:  voucher    voucher.value  :  '蝎曄溶蝟餃',
      name:  v('f-name'),
      phone:  v('f-phone'),
      email:  v('f-email'),
      notes:  v('f-notes')
    };
  }
  function  restoreForm(snap){
    function  set(id,  val){  var  el  =  document.getElementById(id);  if  (el  &&  val)  el.value  =  val;  }
    if  (snap.hotel)  {
      set('f-hotel',  snap.hotel);
      var  hotel  =  HOTELS.find(function(h){  return  h.id  ===  snap.hotel;  });
      if  (hotel)  populateRooms(hotel,  null);
      if  (snap.room  !==  '')  set('f-room',  snap.room);
    }
    set('f-checkin',  snap.checkin);
    set('f-checkout',  snap.checkout);
    if  (snap.adults)  {
      set('f-adults',  snap.adults);
      var  ca  =  document.getElementById('cv-adults');  if  (ca)  ca.textContent  =  snap.adults;
    }
    if  (snap.kids)  {
      set('f-kids',  snap.kids);
      var  ck  =  document.getElementById('cv-kids');  if  (ck)  ck.textContent  =  snap.kids;
    }
    var  vrad  =  document.querySelector('input[name="voucher"][value="'  +  snap.voucher  +  '"]');
    if  (vrad)  vrad.checked  =  true;
    set('f-name',  snap.name);
    set('f-phone',  snap.phone);
    set('f-email',  snap.email);
    set('f-notes',  snap.notes);
    updateSummary();
  }

  //  
  //  Render  booking  form
  //  
  var  main  =  document.getElementById('main');

  function  renderForm(){
    var  byRegion  =  {};
    HOTELS.forEach(function(h){
      (byRegion[h.region]  =  byRegion[h.region]  ||  []).push(h);
    });

    var  hotelOptions  =  '<option  value="">'  +  escapeHtml(t('bk.field.hotel.placeholder'))  +  '</option>';
    Object.keys(byRegion).sort().forEach(function(reg){
      hotelOptions  +=  '<optgroup  label="'  +  escapeHtml(regionDisplay(reg))  +  '">';
      byRegion[reg].sort(function(a,b){  return  hotelDisplayName(a).localeCompare(hotelDisplayName(b));  }).forEach(function(h){
        var  sel  =  (h.id  ===  preHotelId)    '  selected'  :  '';
        hotelOptions  +=  '<option  value="'  +  escapeHtml(h.id)  +  '"'  +  sel  +  '>'  +  escapeHtml(hotelDisplayName(h))  +  '</option>';
      });
      hotelOptions  +=  '</optgroup>';
    });

    var  today  =  new  Date();  today.setHours(0,0,0,0);
    var  ci  =  parseDate(preCheckin)  ||  (function(){  var  d  =  new  Date(today);  d.setDate(today.getDate()  +  1);  return  d;  })();
    var  co  =  parseDate(preCheckout)  ||  (function(){  var  d  =  new  Date(ci);  d.setDate(ci.getDate()  +  2);  return  d;  })();
    if  (co  <=  ci)  {  co  =  new  Date(ci);  co.setDate(ci.getDate()  +  1);  }
    var  minDate  =  fmtDate(today);
    var  nAdults  =  Math.max(1,  Math.min(8,  parseInt(preAdults,  10)  ||  2));
    var  nKids    =  Math.max(0,  Math.min(6,  parseInt(preKids,    10)  ||  0));

    main.innerHTML  =  ''  +
      '<section  class="booking-shell">'  +
        '<header  class="head">'  +
          '<div  class="eyebrow">'  +  escapeHtml(t('bk.demo.label'))  +  '    BOOKING</div>'  +
          '<h1>'  +  escapeHtml(t('bk.h1.full'))  +  '</h1>'  +
          '<p  class="deck">'  +  escapeHtml(t('bk.demo.body'))  +  '</p>'  +
        '</header>'  +
        '<div  class="body-grid">'  +
          '<form  class="form-card"  id="booking-form"  novalidate>'  +
            '<div  class="form-section">'  +
              '<h2>'  +  escapeHtml(t('bk.section.stay'))  +  '</h2>'  +
              '<div  class="section-en">STAY  DETAILS</div>'  +
              '<div  class="form-row  single">'  +
                '<div  class="field">'  +
                  '<label  for="f-hotel">'  +  escapeHtml(t('bk.field.hotel'))  +  '<span  class="req">*</span></label>'  +
                  '<select  id="f-hotel"  name="hotel"  required>'  +  hotelOptions  +  '</select>'  +
                  '<span  class="err-msg">'  +  escapeHtml(t('bk.field.hotel.placeholder'))  +  '</span>'  +
                '</div>'  +
              '</div>'  +
              '<div  class="form-row  single">'  +
                '<div  class="field">'  +
                  '<label  for="f-room">'  +  escapeHtml(t('bk.field.room'))  +  '<span  class="req">*</span></label>'  +
                  '<select  id="f-room"  name="room"  required  disabled>'  +
                    '<option  value="">'  +  escapeHtml(t('bk.field.room.placeholder'))  +  '</option>'  +
                  '</select>'  +
                  '<span  class="err-msg">'  +  escapeHtml(t('bk.field.room.placeholder'))  +  '</span>'  +
                '</div>'  +
              '</div>'  +
              '<div  class="form-row">'  +
                '<div  class="field">'  +
                  '<label  for="f-checkin">'  +  escapeHtml(t('bk.field.checkin'))  +  '<span  class="req">*</span></label>'  +
                  '<input  type="date"  id="f-checkin"  name="checkin"  required  min="'  +  minDate  +  '"  value="'  +  fmtDate(ci)  +  '"  />'  +
                '</div>'  +
                '<div  class="field">'  +
                  '<label  for="f-checkout">'  +  escapeHtml(t('bk.field.checkout'))  +  '<span  class="req">*</span></label>'  +
                  '<input  type="date"  id="f-checkout"  name="checkout"  required  min="'  +  minDate  +  '"  value="'  +  fmtDate(co)  +  '"  />'  +
                '</div>'  +
              '</div>'  +
              '<div  class="form-row">'  +
                '<div  class="field">'  +
                  '<label>'  +  escapeHtml(t('bk.field.adults'))  +  '</label>'  +
                  '<div  class="counter"  data-counter="adults"  data-min="1"  data-max="8">'  +
                    '<button  type="button"  data-step="-1"  aria-label="'  +  escapeHtml(t('bk.aria.minus'))  +  '">-</button>'  +
                    '<span  class="cv"  id="cv-adults">'  +  nAdults  +  '</span>'  +
                    '<button  type="button"  data-step="1"  aria-label="'  +  escapeHtml(t('bk.aria.plus'))  +  '">+</button>'  +
                  '</div>'  +
                  '<input  type="hidden"  id="f-adults"  name="adults"  value="'  +  nAdults  +  '"  />'  +
                '</div>'  +
                '<div  class="field">'  +
                  '<label>'  +  escapeHtml(t('bk.field.children'))  +  '  <span  class="hint"  style="font-family:inherit;letter-spacing:0;font-size:11px;color:var(--muted);">'  +  escapeHtml(t('bk.field.children.hint'))  +  '</span></label>'  +
                  '<div  class="counter"  data-counter="kids"  data-min="0"  data-max="6">'  +
                    '<button  type="button"  data-step="-1"  aria-label="'  +  escapeHtml(t('bk.aria.minus'))  +  '">-</button>'  +
                    '<span  class="cv"  id="cv-kids">'  +  nKids  +  '</span>'  +
                    '<button  type="button"  data-step="1"  aria-label="'  +  escapeHtml(t('bk.aria.plus'))  +  '">+</button>'  +
                  '</div>'  +
                  '<input  type="hidden"  id="f-kids"  name="kids"  value="'  +  nKids  +  '"  />'  +
                '</div>'  +
              '</div>'  +
              '<div  class="form-row  single">'  +
                '<div  class="field">'  +
                  '<label>'  +  escapeHtml(t('bk.field.voucher'))  +  '</label>'  +
                  '<div  class="seg"  role="radiogroup"  aria-label="'  +  escapeHtml(t('bk.voucher.aria'))  +  '">'  +
                    '<input  type="radio"  name="voucher"  id="v-1"  value="refined"  checked  />'  +
                    '<label  for="v-1">'  +  escapeHtml(t('bk.voucher.refined'))  +  '</label>'  +
                    '<input  type="radio"  name="voucher"  id="v-2"  value="boutique"  />'  +
                    '<label  for="v-2">'  +  escapeHtml(t('bk.voucher.boutique'))  +  '</label>'  +
                    '<input  type="radio"  name="voucher"  id="v-3"  value="cash"  />'  +
                    '<label  for="v-3">'  +  escapeHtml(t('bk.voucher.cash'))  +  '</label>'  +
                  '</div>'  +
                '</div>'  +
              '</div>'  +
            '</div>'  +
            '<div  class="form-section">'  +
              '<h2>'  +  escapeHtml(t('bk.section.contact'))  +  '</h2>'  +
              '<div  class="section-en">CONTACT</div>'  +
              '<div  class="form-row">'  +
                '<div  class="field">'  +
                  '<label  for="f-name">'  +  escapeHtml(t('bk.field.name'))  +  '<span  class="req">*</span></label>'  +
                  '<input  type="text"  id="f-name"  name="name"  required  autocomplete="name"  placeholder="'  +  escapeHtml(t('bk.field.name.placeholder'))  +  '"  />'  +
                '</div>'  +
                '<div  class="field">'  +
                  '<label  for="f-phone">'  +  escapeHtml(t('bk.field.phone'))  +  '<span  class="req">*</span></label>'  +
                  '<input  type="tel"  id="f-phone"  name="phone"  required  autocomplete="tel"  inputmode="tel"  placeholder="'  +  escapeHtml(t('bk.field.phone.placeholder'))  +  '"  />'  +
                '</div>'  +
              '</div>'  +
              '<div  class="form-row  single">'  +
                '<div  class="field">'  +
                  '<label  for="f-email">'  +  escapeHtml(t('bk.field.email'))  +  '</label>'  +
                  '<input  type="email"  id="f-email"  name="email"  autocomplete="email"  placeholder="'  +  escapeHtml(t('bk.field.email.placeholder'))  +  '"  />'  +
                '</div>'  +
              '</div>'  +
              '<div  class="form-row  single">'  +
                '<div  class="field">'  +
                  '<label  for="f-notes">'  +  escapeHtml(t('bk.field.notes'))  +  '</label>'  +
                  '<textarea  id="f-notes"  name="notes"  placeholder="'  +  escapeHtml(t('bk.field.notes.placeholder'))  +  '"></textarea>'  +
                '</div>'  +
              '</div>'  +
            '</div>'  +
            '<div  class="form-foot">'  +
              '<button  class="submit-btn"  type="submit">'  +  escapeHtml(t('bk.submit'))  +  '<span  class="arr"></span></button>'  +
              '<p  class="demo-note">'  +  escapeHtml(t('bk.demo.label'))  +  '    '  +  escapeHtml(t('bk.demo.body'))  +  '</p>'  +
            '</div>'  +
          '</form>'  +
          '<aside  class="summary"  id="summary">'  +  renderSummary(null,  null,  ci,  co,  nAdults,  nKids)  +  '</aside>'  +
        '</div>'  +
      '</section>';

    bindForm();
    if  (preHotelId)  {
      var  hotel  =  HOTELS.find(function(h){  return  h.id  ===  preHotelId;  });
      if  (hotel)  {
        document.getElementById('bc-hotel').textContent  =  hotelDisplayName(hotel)  +  '    '  +  t('nav.book');
        populateRooms(hotel,  preRoomName);
        updateSummary();
      }
    }
  }

  function  renderSummary(hotel,  room,  ci,  co,  adults,  kids){
    if  (!hotel)  {
      return  ''  +
        '<div  class="label-head">'  +  escapeHtml(t('bk.summary.title'))  +  '</div>'  +
        '<div  class="empty-state">'  +
          '<div  class="ic">"</div>'  +
          escapeHtml(t('bk.summary.empty'))  +
        '</div>';
    }

    var  nb  =  nightsByType(ci,  co);
    var  totalNights  =  nb.weekday  +  nb.weekend;
    var  roomAddWk  =  (room  &&  typeof  room.weekday  ===  'number')    room.weekday  :  0;
    var  roomAddWd  =  (room  &&  typeof  room.weekend  ===  'number')    room.weekend  :  0;
    var  subtotal  =  (BASE_RATE  +  roomAddWk)  *  nb.weekday  +  (BASE_RATE  +  roomAddWd)  *  nb.weekend;

    var  html  =  ''  +
      '<div  class="label-head">'  +  escapeHtml(t('bk.summary.title'))  +  '</div>'  +
      '<h3>'  +  escapeHtml(hotelDisplayName(hotel))  +  '</h3>'  +
      '<div  class="h-en">'  +  escapeHtml(regionDisplay(hotel.region))  +  '  繚  '  +  escapeHtml(hotel.city  ||  '')  +  '</div>'  +

      '<div  class="row"><span  class="k">'  +  escapeHtml(t('bk.field.room'))  +  '</span><span  class="v">'  +  escapeHtml(room    roomDisplay(room)  :  '-')  +  '</span></div>'  +
      '<div  class="row"><span  class="k">'  +  escapeHtml(t('bk.field.checkin'))  +  '</span><span  class="v  num">'  +  fmtDate(ci)  +  '</span></div>'  +
      '<div  class="row"><span  class="k">'  +  escapeHtml(t('bk.field.checkout'))  +  '</span><span  class="v  num">'  +  fmtDate(co)  +  '</span></div>'  +
      '<div  class="row"><span  class="k">'  +  escapeHtml(t('bk.summary.nights'))  +  '</span><span  class="v  num">'  +  totalNights  +  '  繚  '  +  escapeHtml(t('bk.summary.weekday'))  +  '  '  +  nb.weekday  +  '  /  '  +  escapeHtml(t('bk.summary.weekend'))  +  '  '  +  nb.weekend  +  '</span></div>'  +
      '<div  class="row"><span  class="k">'  +  escapeHtml(t('bk.field.adults'))  +  '</span><span  class="v  num">'  +  adults  +  (kids    '  繚  '  +  kids  +  '  '  +  escapeHtml(t('bk.field.children'))  :  '')  +  '</span></div>'  +

      '<div  class="breakdown">'  +
        escapeHtml(t('bk.summary.base'))  +  '  NT$<b>'  +  BASE_RATE.toLocaleString()  +  '</b>'  +
        (roomAddWk  ||  roomAddWd
            '<br/>'  +  escapeHtml(t('bk.summary.weekday'))  +  '  +NT$<b>'  +  roomAddWk.toLocaleString()  +  '</b>'  +  escapeHtml(t('bk.summary.weekend'))  +  '  +NT$<b>'  +  roomAddWd.toLocaleString()  +  '</b>'
          :  '<br/>'  +  escapeHtml(t('hd.noAdd')))  +
      '</div>'  +

      '<div  class="total">'  +
        '<span  class="k">'  +  escapeHtml(t('bk.summary.subtotal'))  +  '</span>'  +
        '<span  class="v"><sup>NT$</sup>'  +  subtotal.toLocaleString()  +  '</span>'  +
      '</div>';

    return  html;
  }

  function  populateRooms(hotel,  preselectName){
    var  roomSel  =  document.getElementById('f-room');
    if  (!hotel  ||  !hotel.rooms)  {
      roomSel.innerHTML  =  '<option  value="">/option>';
      roomSel.disabled  =  true;
      return;
    }
    var  opts  =  ['<option  value="">'  +  escapeHtml(t('bk.field.room.placeholder'))  +  '</option>'];
    hotel.rooms.forEach(function(r,  i){
      //  踹內嚗+詨  敶Ｗ嚗詨∠蕃霅舀穿
      var  addStr  =  (typeof  r.weekday  ===  'number'  &&  r.weekday  >  0)
          '  (+'  +  r.weekday  +  ')'
        :  '';
      var  sel  =  preselectName  &&  r.name  ===  preselectName    '  selected'  :  '';
      opts.push('<option  value="'  +  i  +  '"'  +  sel  +  '>'  +  escapeHtml(roomDisplay(r))  +  addStr  +  '</option>');
    });
    roomSel.innerHTML  =  opts.join('');
    roomSel.disabled  =  false;
  }

  function  updateSummary(){
    var  hid  =  document.getElementById('f-hotel').value;
    var  ridx  =  document.getElementById('f-room').value;
    var  ci  =  parseDate(document.getElementById('f-checkin').value);
    var  co  =  parseDate(document.getElementById('f-checkout').value);
    var  ad  =  parseInt(document.getElementById('f-adults').value,  10)  ||  2;
    var  kd  =  parseInt(document.getElementById('f-kids').value,  10)  ||  0;

    var  hotel  =  HOTELS.find(function(h){  return  h.id  ===  hid;  });
    if  (!hotel  ||  !ci  ||  !co  ||  co  <=  ci)  {
      document.getElementById('summary').innerHTML  =  renderSummary(null,  null,  ci,  co,  ad,  kd);
      return;
    }
    var  room  =  (ridx  !==  ''  &&  hotel.rooms[ridx])    hotel.rooms[ridx]  :  null;
    document.getElementById('summary').innerHTML  =  renderSummary(hotel,  room,  ci,  co,  ad,  kd);
  }

  function  bindForm(){
    //  counters
    document.querySelectorAll('.counter').forEach(function(box){
      var  key  =  box.getAttribute('data-counter');
      var  min  =  parseInt(box.getAttribute('data-min'),  10);
      var  max  =  parseInt(box.getAttribute('data-max'),  10);
      var  cv  =  box.querySelector('.cv');
      var  hidden  =  document.getElementById('f-'  +  key);
      box.querySelectorAll('button').forEach(function(btn){
        btn.addEventListener('click',  function(){
          var  step  =  parseInt(btn.getAttribute('data-step'),  10);
          var  v  =  parseInt(cv.textContent,  10)  +  step;
          if  (v  <  min)  v  =  min;  if  (v  >  max)  v  =  max;
          cv.textContent  =  v;  hidden.value  =  v;
          //  disable  arrows  at  bounds
          box.querySelector('button[data-step="-1"]').disabled  =  (v  <=  min);
          box.querySelector('button[data-step="1"]').disabled  =  (v  >=  max);
          updateSummary();
        });
      });
      //  initial  bounds
      var  initV  =  parseInt(cv.textContent,  10);
      box.querySelector('button[data-step="-1"]').disabled  =  (initV  <=  min);
      box.querySelector('button[data-step="1"]').disabled  =  (initV  >=  max);
    });

    //  hotel  change  populate  rooms
    var  hotelSel  =  document.getElementById('f-hotel');
    hotelSel.addEventListener('change',  function(){
      var  hotel  =  HOTELS.find(function(h){  return  h.id  ===  hotelSel.value;  });
      populateRooms(hotel);
      updateSummary();
      var  bc  =  document.getElementById('bc-hotel');
      bc.textContent  =  hotel    (hotelDisplayName(hotel)  +  '  繚  '  +  t('nav.book'))  :  t('nav.book');
    });

    //  room/dates  change  recalc
    ['f-room','f-checkin','f-checkout'].forEach(function(id){
      document.getElementById(id).addEventListener('change',  function(){
        //  ensure  checkout  >  checkin
        var  ci  =  parseDate(document.getElementById('f-checkin').value);
        var  co  =  parseDate(document.getElementById('f-checkout').value);
        if  (ci  &&  co  &&  co  <=  ci)  {
          var  nco  =  new  Date(ci.getTime());  nco.setDate(ci.getDate()  +  1);
          document.getElementById('f-checkout').value  =  fmtDate(nco);
        }
        if  (ci)  document.getElementById('f-checkout').min  =  fmtDate(ci);
        updateSummary();
      });
    });

    //  submit
    document.getElementById('booking-form').addEventListener('submit',  function(e){
      e.preventDefault();
      //  validate
      var  ok  =  true;
      var  fd  =  {};
      ['hotel','room','checkin','checkout','name','phone','email'].forEach(function(k){
        var  el  =  document.getElementById('f-'  +  k);
        var  field  =  el.closest('.field');
        var  val  =  el.value.trim();
        var  bad  =  false;
        if  (el.required  &&  !val)  bad  =  true;
        if  (k  ===  'phone'  &&  val  &&  !/^[0-9+\-()  ]{8,}$/.test(val))  bad  =  true;
        if  (k  ===  'email'  &&  val  &&  !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val))  bad  =  true;
        if  (k  ===  'checkout')  {
          var  ci  =  parseDate(document.getElementById('f-checkin').value);
          var  co  =  parseDate(val);
          if  (!co  ||  (ci  &&  co  <=  ci))  bad  =  true;
        }
        if  (bad)  {  field.classList.add('error');  ok  =  false;  }
        else  {  field.classList.remove('error');  fd[k]  =  val;  }
      });
      fd.adults  =  document.getElementById('f-adults').value;
      fd.kids  =  document.getElementById('f-kids').value;
      var  voucherEl  =  document.querySelector('input[name="voucher"]:checked');
      fd.voucher  =  voucherEl    voucherEl.value  :  '蝎曄溶蝟餃';
      fd.notes  =  document.getElementById('f-notes').value.trim();

      if  (!ok)  {
        //  jump  to  first  error  (no  scrollIntoView;  use  scrollTo)
        var  firstErr  =  document.querySelector('.field.error');
        if  (firstErr)  {
          var  top  =  firstErr.getBoundingClientRect().top  +  window.pageYOffset  -  120;
          window.scrollTo({  top:  top,  behavior:  'smooth'  });
        }
        return;
      }

      //  success  render  confirmation
      renderSuccess(fd);
    });
  }

  //  
  //  Render  success
  //  fd  券◤憛怠末嚗closure  霈霈localechange  銋葡
  //  
  var  lastSuccessFd  =  null;
  var  lastOrderId  =  null;

  function  renderSuccess(fd,  reusedOrderId){
    var  hotel  =  HOTELS.find(function(h){  return  h.id  ===  fd.hotel;  });
    var  room  =  hotel.rooms[fd.room];
    var  ci  =  parseDate(fd.checkin),  co  =  parseDate(fd.checkout);
    var  nb  =  nightsByType(ci,  co);
    var  totalNights  =  nb.weekday  +  nb.weekend;
    var  subtotal  =  (BASE_RATE  +  (room.weekday  ||  0))  *  nb.weekday  +  (BASE_RATE  +  (room.weekend  ||  0))  *  nb.weekend;
    //  蝟餅靽orderId嚗甈⊿皜脰啗蝣    var  orderId  =  reusedOrderId  ||  genOrderId();
    lastSuccessFd  =  fd;
    lastOrderId  =  orderId;

    document.getElementById('bc-hotel').textContent  =  (t('bk.success.h1',  {  name:  ''  }).replace(/[嚗]\s*$/,  ''))  +  '  繚  '  +  orderId;

    main.innerHTML  =
      '<section  class="container">'  +
        '<div  class="success">'  +
          '<div  class="check">/div>'  +
          '<div  class="eyebrow">'  +  escapeHtml(t('bk.section.contact'))  +  '  繚  OK</div>'  +
          '<h1>'  +  escapeHtml(t('bk.success.h1',  {  name:  fd.name  }))  +  '</h1>'  +
          '<p  class="deck">'  +  escapeHtml(t('bk.success.lead'))  +  '</p>'  +

          '<div  class="order-card">'  +
            '<div  class="order-id">'  +  escapeHtml(t('bk.success.orderId'))  +  '  繚  <b>'  +  escapeHtml(orderId)  +  '</b></div>'  +
            '<h2>'  +  escapeHtml(hotelDisplayName(hotel))  +  '</h2>'  +
            '<div  class="o-row"><span  class="k">'  +  escapeHtml(t('bk.field.room'))  +  '</span><span  class="v">'  +  escapeHtml(roomDisplay(room))  +  '</span></div>'  +
            '<div  class="o-row"><span  class="k">'  +  escapeHtml(t('bk.field.voucher'))  +  '</span><span  class="v">'  +  escapeHtml(fd.voucher)  +  '</span></div>'  +
            '<div  class="o-row"><span  class="k">'  +  escapeHtml(t('bk.field.checkin'))  +  '</span><span  class="v  num">'  +  fd.checkin  +  '</span></div>'  +
            '<div  class="o-row"><span  class="k">'  +  escapeHtml(t('bk.field.checkout'))  +  '</span><span  class="v  num">'  +  fd.checkout  +  '</span></div>'  +
            '<div  class="o-row"><span  class="k">'  +  escapeHtml(t('bk.summary.nights'))  +  '</span><span  class="v  num">'  +  totalNights  +  '  nights  -  '  +  escapeHtml(t('bk.summary.weekday'))  +  '  '  +  nb.weekday  +  '  /  '  +  escapeHtml(t('bk.summary.weekend'))  +  '  '  +  nb.weekend  +  '</span></div>'  +
            '<div  class="o-row"><span  class="k">'  +  escapeHtml(t('bk.field.adults'))  +  '</span><span  class="v  num">'  +  fd.adults  +  (parseInt(fd.kids,10)    '  繚  '  +  fd.kids  +  '  '  +  escapeHtml(t('bk.field.children'))  :  '')  +  '</span></div>'  +
            '<div  class="o-row"><span  class="k">'  +  escapeHtml(t('bk.field.phone'))  +  '</span><span  class="v  num">'  +  escapeHtml(fd.phone)  +  '</span></div>'  +
            (fd.email    '<div  class="o-row"><span  class="k">'  +  escapeHtml(t('bk.field.email'))  +  '</span><span  class="v">'  +  escapeHtml(fd.email)  +  '</span></div>'  :  '')  +
            (fd.notes    '<div  class="o-row"><span  class="k">'  +  escapeHtml(t('bk.field.notes'))  +  '</span><span  class="v"  style="max-width:60%;">'  +  escapeHtml(fd.notes)  +  '</span></div>'  :  '')  +
            '<div  class="o-total">'  +
              '<span  class="k">'  +  escapeHtml(t('bk.summary.subtotal'))  +  '</span>'  +
              '<span  class="v">NT$  '  +  subtotal.toLocaleString()  +  '</span>'  +
            '</div>'  +
          '</div>'  +

          '<div  class="next-steps">'  +
            '<h3>'  +  escapeHtml(t('bk.success.next.h'))  +  '</h3>'  +
            '<ol>'  +
              '<li>'  +  escapeHtml(t('bk.success.step1'))  +  '</li>'  +
              '<li>'  +  escapeHtml(t('bk.success.step2'))  +  '</li>'  +
              '<li>'  +  escapeHtml(t('bk.success.step3'))  +  '</li>'  +
            '</ol>'  +
          '</div>'  +

          '<div  class="success-cta">'  +
            '<a  href="home-around-website-mockup.html"  class="btn  btn-ghost">'  +  escapeHtml(t('bk.success.cta.home'))  +  '</a>'  +
            '<a  href="hotel-detail.htmlid='  +  encodeURIComponent(hotel.id)  +  '"  class="btn  btn-primary">'  +  escapeHtml(t('bk.success.cta.hotel'))  +  '  /a>'  +
          '</div>'  +
        '</div>'  +
      '</section>';

    if  (!reusedOrderId)  {
      //  芸擐活歲圈嚗隤頂葡蝵      window.scrollTo({  top:  0,  behavior:  'smooth'  });
    }
  }

  //  
  //  Hook  localechange  蝟餅蝜芾ˊ桀恍嚗orm  success嚗  //  Form嚗napshot  re-render  restore嚗uccess嚗fd  orderId
  //  
  document.addEventListener('localechange',  function(){
    if  (lastSuccessFd)  {
      renderSuccess(lastSuccessFd,  lastOrderId);
    }  else  if  (document.getElementById('booking-form'))  {
      var  snap  =  snapshotForm();
      renderForm();
      restoreForm(snap);
    }
  });

  //  boot
  if  (HOTELS  &&  HOTELS.length)  {
    renderForm();
  }  else  {
    main.innerHTML  =  '<section  class="container"><div  style="padding:80px  0;text-align:center;color:var(--muted);">憌臬鞈撠頛嚗蝣箄  hotels-data.js  撌脣具/div></section>';
  }
})();
