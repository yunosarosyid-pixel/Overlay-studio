const STATE_STORAGE_KEY = 'overlay-studio-state-v1';

// Fungsi berpindah tab
function switchTab(tabName) {
  const tabBtn = document.querySelector(`.tab[data-tab="${tabName}"]`);
  const panelEl = document.getElementById(`panel-${tabName}`);
  
  if (!tabBtn || !panelEl) return;

  document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(x => x.classList.remove('active'));

  tabBtn.classList.add('active');
  panelEl.classList.add('active');

  tabBtn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
}

// Event tab click
document.querySelectorAll('.tab').forEach(t => {
  t.onclick = () => {
    switchTab(t.dataset.tab);
    saveState();
  };
});

document.querySelectorAll('.pos-btn').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('.pos-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    saveState();
  };
});

document.querySelectorAll('.wa-effect').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('.wa-effect').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    saveState();
  };
});

// Update label range
document.getElementById('rt-opacity').oninput = e => document.getElementById('rt-opacity-val').textContent = e.target.value + '%';
document.getElementById('bg-speed').oninput = e => {
  const labels = {1:'Lambat', 2:'Sedang', 3:'Cepat'};
  document.getElementById('bg-speed-val').textContent = labels[e.target.value];
};

// Switch otomatis ke Kustom bila warna animtitle diubah
document.getElementById('at-c1').onchange = () => {
  document.getElementById('at-theme').value = "5";
  saveState();
};
document.getElementById('at-c2').onchange = () => {
  document.getElementById('at-theme').value = "5";
  saveState();
};

function b64(str) { return btoa(unescape(encodeURIComponent(str))); }

function baseUrl() {
  return location.origin + location.pathname;
}

function generateLink(type) {
  saveState();
  const p = new URLSearchParams();
  p.set('ov', type);

  if (type === 'runningtext') {
    p.set('text', b64(document.getElementById('rt-text').value || ' '));
    p.set('color', document.getElementById('rt-color').value);
    p.set('bgcolor', document.getElementById('rt-bgcolor').value);
    p.set('opacity', document.getElementById('rt-opacity').value);
    p.set('size', document.getElementById('rt-size').value);
    p.set('speed', document.getElementById('rt-speed').value);
    p.set('pos', document.querySelector('.pos-btn.active').dataset.val);
  } else if (type === 'wa') {
    p.set('number', b64(document.getElementById('wa-number').value || ''));
    p.set('label', b64(document.getElementById('wa-label').value || ''));
    p.set('color', document.getElementById('wa-color').value);
    p.set('bgcolor', document.getElementById('wa-bgcolor').value);
    p.set('effect', document.querySelector('.wa-effect.active').dataset.val);
    p.set('pos', document.getElementById('wa-pos').value);
  } else if (type === 'bg') {
    p.set('style', document.getElementById('bg-style').value);
    p.set('c1', document.getElementById('bg-color1').value);
    p.set('c2', document.getElementById('bg-color2').value);
    p.set('speed', document.getElementById('bg-speed').value);
  } else if (type === 'countdown') {
    p.set('title', b64(document.getElementById('cd-title').value || ''));
    p.set('target', document.getElementById('cd-target').value || '');
    p.set('color', document.getElementById('cd-color').value);
    p.set('bgcolor', document.getElementById('cd-bgcolor').value);
    p.set('pos', document.getElementById('cd-pos').value);
  } else if (type === 'slot') {
    p.set('sisa', document.getElementById('slot-sisa').value);
    p.set('total', document.getElementById('slot-total').value);
    p.set('label', b64(document.getElementById('slot-label').value || ''));
    p.set('color', document.getElementById('slot-color').value);
    p.set('bgcolor', document.getElementById('slot-bgcolor').value);
    p.set('pos', document.getElementById('slot-pos').value);
  } else if (type === 'trip') {
    p.set('nama', b64(document.getElementById('trip-nama').value || ''));
    p.set('tanggal', b64(document.getElementById('trip-tanggal').value || ''));
    p.set('harga', b64(document.getElementById('trip-harga').value || ''));
    p.set('fasilitas', b64(document.getElementById('trip-fasilitas').value || ''));
    p.set('color', document.getElementById('trip-color').value);
    p.set('bgcolor', document.getElementById('trip-bgcolor').value);
  } else if (type === 'qr') {
    p.set('data', b64(document.getElementById('qr-data').value || ''));
    p.set('label', b64(document.getElementById('qr-label').value || ''));
    p.set('pos', document.getElementById('qr-pos').value);
  } else if (type === 'social') {
    p.set('ig', b64(document.getElementById('soc-ig').value || ''));
    p.set('tiktok', b64(document.getElementById('soc-tiktok').value || ''));
    p.set('wa', b64(document.getElementById('soc-wa').value || ''));
    p.set('color', document.getElementById('soc-color').value);
    p.set('bgcolor', document.getElementById('soc-bgcolor').value);
    p.set('pos', document.getElementById('soc-pos').value);
  } else if (type === 'alert') {
    p.set('text', b64(document.getElementById('alert-text').value || ''));
    p.set('color', document.getElementById('alert-color').value);
    p.set('bgcolor', document.getElementById('alert-bgcolor').value);
    p.set('durasi', document.getElementById('alert-durasi').value);
  } else if (type === 'frame') {
    p.set('color', document.getElementById('frame-color').value);
    p.set('style', document.getElementById('frame-style').value);
    p.set('thick', document.getElementById('frame-thick').value);
  } else if (type === 'livebadge') {
    p.set('text', b64(document.getElementById('lb-text').value || ''));
    p.set('color', document.getElementById('lb-color').value);
    p.set('bgcolor', document.getElementById('lb-bgcolor').value);
    p.set('pos', document.getElementById('lb-pos').value);
  } else if (type === 'camcircle') {
    p.set('size', document.getElementById('cc-size').value);
    p.set('anim', document.getElementById('cc-anim').value);
    p.set('pos', document.getElementById('cc-pos').value);
    p.set('bordercolor', document.getElementById('cc-bordercolor').value);
    p.set('borderthick', document.getElementById('cc-borderthick').value);
  } else if (type === 'splitline') {
    p.set('anim', document.getElementById('split-anim').value);
    p.set('splitpos', document.getElementById('split-pos').value);
    p.set('color', document.getElementById('split-color').value);
    p.set('thick', document.getElementById('split-thick').value);
  } else if (type === 'animtitle') {
    p.set('text', b64(document.getElementById('at-text').value || ''));
    p.set('theme', document.getElementById('at-theme').value);
    p.set('c1', document.getElementById('at-c1').value);
    p.set('c2', document.getElementById('at-c2').value);
    p.set('size', document.getElementById('at-size').value);
    p.set('pos', document.getElementById('at-pos').value);
  }

  const url = baseUrl() + '?' + p.toString();
  const box = document.getElementById('link-' + type);
  box.classList.add('show');
  box.textContent = url;
  box.onclick = () => {
    navigator.clipboard.writeText(url).then(() => {
      box.classList.add('copied');
      const old = box.textContent;
      box.textContent = 'Tersalin ke Clipboard! ' + old;
      setTimeout(() => { box.textContent = old; box.classList.remove('copied'); }, 1500);
    });
  };
  box.style.cursor = 'pointer';

  const prevBtn = document.getElementById('preview-' + type);
  prevBtn.style.display = 'block';
  prevBtn.onclick = () => { location.href = url; };

  navigator.clipboard.writeText(url).catch(()=>{});
}

// LOGIKA OTOMATIS SIMPAN & MEMUAT ISIAN FORM
function saveState() {
  const fields = {};
  document.querySelectorAll('#editor input[id], #editor select[id], #editor textarea[id]').forEach(el => {
    fields[el.id] = el.value;
  });
  
  const activeTab = document.querySelector('.tab.active');
  const posBtn = document.querySelector('.pos-btn.active');
  const waBtn = document.querySelector('.wa-effect.active');

  const state = {
    tab: activeTab ? activeTab.dataset.tab : 'runningtext',
    fields: fields,
    pos: posBtn ? posBtn.dataset.val : 'bottom',
    effect: waBtn ? waBtn.dataset.val : 'pulse'
  };

  try {
    localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {}
}

function restoreState() {
  let state;
  try { state = JSON.parse(localStorage.getItem(STATE_STORAGE_KEY)); } catch (e) {}
  if (!state) return;

  // 1. Pulihkan nilai field
  if (state.fields) {
    Object.keys(state.fields).forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.value = state.fields[id];
        if (el.oninput) el.oninput({ target: el });
      }
    });
  }

  // 2. Pulihkan tombol segmen aktif
  if (state.pos) {
    const btn = document.querySelector(`.pos-btn[data-val="${state.pos}"]`);
    if (btn) {
      document.querySelectorAll('.pos-btn').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
    }
  }
  if (state.effect) {
    const btn = document.querySelector(`.wa-effect[data-val="${state.effect}"]`);
    if (btn) {
      document.querySelectorAll('.wa-effect').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
    }
  }

  // 3. Pulihkan tab yang terakhir kali dibuka
  if (state.tab) {
    switchTab(state.tab);
  }
}

// Jalankan auto-restore & simpan listeners
(function() {
  if (new URLSearchParams(location.search).get('ov')) return;

  restoreState();

  document.addEventListener('input', saveState);
  document.addEventListener('change', saveState);
})();
