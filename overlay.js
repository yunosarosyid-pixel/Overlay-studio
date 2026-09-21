(function() {
  const params = new URLSearchParams(location.search);
  const ov = params.get('ov');
  if (!ov) return;

  const editorEl = document.getElementById('editor');
  if (editorEl) editorEl.style.display = 'none';
  document.documentElement.style.background = 'transparent';
  document.body.style.background = 'transparent';

  const backBtn = document.createElement('button');
  backBtn.textContent = '← Editor Studio';
  backBtn.style.cssText = 'position:fixed;top:10px;left:10px;z-index:9999;padding:8px 14px;border-radius:8px;border:1px solid #444;background:rgba(0,0,0,0.7);color:#fff;font-size:13px;font-family:sans-serif;cursor:pointer;';
  backBtn.onclick = () => { location.href = location.origin + location.pathname; };
  document.body.appendChild(backBtn);

  function unb64(s) { try { return decodeURIComponent(escape(atob(s))); } catch(e) { return ''; } }

  if (ov === 'runningtext') {
    const el = document.getElementById('ov-runningtext');
    el.style.display = 'block';
    const text = unb64(params.get('text') || '');
    const color = params.get('color') || '#ffffff';
    const bgcolor = params.get('bgcolor') || '#000000';
    const opacity = (parseInt(params.get('opacity') || '70')) / 100;
    const size = params.get('size') || '28';
    const speed = params.get('speed') || '20';
    const pos = params.get('pos') || 'bottom';

    function hexToRgba(hex, a) {
      const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }

    el.innerHTML = `
      <style>
        html, body { margin:0; padding:0; background:transparent; overflow:hidden; }
        .rt-bar {
          position: fixed; left:0; right:0; ${pos === 'top' ? 'top:0;' : 'bottom:0;'}
          background: ${hexToRgba(bgcolor, opacity)};
          padding: 14px 0; overflow: hidden; white-space: nowrap;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .rt-track {
          display: inline-block; white-space: nowrap;
          animation: rt-scroll ${speed}s linear infinite;
          font-size: ${size}px; color: ${color};
          font-family: -apple-system, sans-serif; font-weight: 600;
        }
        @keyframes rt-scroll {
          from { transform: translateX(100vw); }
          to { transform: translateX(-100%); }
        }
      </style>
      <div class="rt-bar"><div class="rt-track">${text.replace(/</g,'&lt;')}</div></div>
    `;
  }

  if (ov === 'wa') {
    const el = document.getElementById('ov-wa');
    el.style.display = 'block';
    const number = unb64(params.get('number') || '');
    const label = unb64(params.get('label') || '');
    const color = params.get('color') || '#ffffff';
    const bgcolor = params.get('bgcolor') || '#22c55e';
    const effect = params.get('effect') || 'pulse';
    const pos = params.get('pos') || 'bottom-right';
    const posCss = {
      'bottom-right': 'bottom:40px; right:40px;',
      'bottom-left': 'bottom:40px; left:40px;',
      'top-right': 'top:40px; right:40px;',
      'top-left': 'top:40px; left:40px;'
    }[pos];

    const animCss = effect === 'pulse'
      ? 'animation: wa-pulse 1.6s ease-in-out infinite;'
      : effect === 'bounce'
      ? 'animation: wa-bounce 1.4s ease-in-out infinite;'
      : effect === 'glow'
      ? 'animation: wa-glow 2s infinite;'
      : '';

    el.innerHTML = `
      <style>
        html, body { margin:0; padding:0; background:transparent; overflow:hidden; }
        .wa-badge {
          position: fixed; ${posCss}
          background: ${bgcolor}; color: ${color};
          padding: 14px 22px; border-radius: 16px;
          font-family: -apple-system, sans-serif; text-align: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.35); ${animCss}
        }
        .wa-label { font-size: 13px; opacity: 0.9; font-weight: 500; margin-bottom: 2px; }
        .wa-number { font-size: 24px; font-weight: 700; letter-spacing: 0.5px; }
        @keyframes wa-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes wa-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes wa-glow { 0%, 100% { box-shadow: 0 0 10px ${bgcolor}; } 50% { box-shadow: 0 0 25px ${bgcolor}, 0 0 40px ${bgcolor}; } }
      </style>
      <div class="wa-badge">
        ${label ? `<div class="wa-label">${label.replace(/</g,'&lt;')}</div>` : ''}
        <div class="wa-number">${number.replace(/</g,'&lt;')}</div>
      </div>
    `;
  }

  if (ov === 'bg') {
    const el = document.getElementById('ov-bg');
    el.style.display = 'block';
    const style = params.get('style') || 'particles';
    const c1 = params.get('c1') || '#22c55e';
    const c2 = params.get('c2') || '#ec4899';
    const speedRaw = parseInt(params.get('speed') || '2');
    const dur = { 1: 18, 2: 10, 3: 5 }[speedRaw] || 10;

    let inner = '';
    if (style === 'particles') {
      let dots = '';
      for (let i = 0; i < 30; i++) {
        const left = Math.random() * 100;
        const size = 4 + Math.random() * 10;
        const delay = Math.random() * dur;
        const d = 6 + Math.random() * dur;
        const color = i % 2 === 0 ? c1 : c2;
        dots += `<div class="p" style="left:${left}vw;width:${size}px;height:${size}px;background:${color};animation-duration:${d}s;animation-delay:-${delay}s;"></div>`;
      }
      inner = `
        <style>
          html, body { margin:0; padding:0; overflow:hidden; background:transparent; width:100vw; height:100vh; }
          .p { position:absolute; bottom:-20px; border-radius:50%; opacity:0.7; animation-name: floatUp; animation-timing-function: linear; animation-iteration-count: infinite; }
          @keyframes floatUp { from { transform: translateY(0) translateX(0); opacity:0; } 10% { opacity:0.7; } 90% { opacity:0.7; } to { transform: translateY(-110vh) translateX(30px); opacity:0; } }
        </style>
        <div style="position:fixed; inset:0;">${dots}</div>
      `;
    } else if (style === 'gradient') {
      inner = `
        <style>
          html, body { margin:0; padding:0; overflow:hidden; }
          .g { position:fixed; inset:0; background: linear-gradient(120deg, ${c1}, ${c2}, ${c1}); background-size: 300% 300%; animation: gmove ${dur}s ease infinite; opacity:0.55; }
          @keyframes gmove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        </style>
        <div class="g"></div>
      `;
    } else if (style === 'bokeh') {
      let circles = '';
      for (let i = 0; i < 14; i++) {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = 30 + Math.random() * 90;
        const color = i % 2 === 0 ? c1 : c2;
        const d = dur + Math.random() * dur;
        const delay = Math.random() * dur;
        circles += `<div class="bk" style="left:${left}vw;top:${top}vh;width:${size}px;height:${size}px;background:${color};animation-duration:${d}s;animation-delay:-${delay}s;"></div>`;
      }
      inner = `
        <style>
          html, body { margin:0; padding:0; overflow:hidden; }
          .bk { position:absolute; border-radius:50%; filter: blur(6px); opacity:0.35; animation-name: bkfloat; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
          @keyframes bkfloat { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-25px) scale(1.15); } }
        </style>
        <div style="position:fixed; inset:0;">${circles}</div>
      `;
    } else if (style === 'grid') {
      inner = `
        <style>
          html, body { margin:0; padding:0; overflow:hidden; }
          .grid {
            position:fixed; inset:-50%; width:200%; height:200%;
            background-image: linear-gradient(${c1}55 1px, transparent 1px), linear-gradient(90deg, ${c1}55 1px, transparent 1px);
            background-size: 60px 60px; animation: gridmove ${dur}s linear infinite;
          }
          @keyframes gridmove { from { transform: translate(0,0); } to { transform: translate(60px,60px); } }
        </style>
        <div class="grid"></div>
      `;
    }
    el.innerHTML = inner;
  }

  if (ov === 'countdown') {
    const el = document.getElementById('ov-countdown');
    el.style.display = 'block';
    const title = unb64(params.get('title') || '');
    const target = params.get('target') || '';
    const color = params.get('color') || '#ffffff';
    const bgcolor = params.get('bgcolor') || '#15803d';
    const pos = params.get('pos') || 'top-center';
    const posCss = {
      'top-center': 'top:30px; left:50%; transform:translateX(-50%);',
      'top-right': 'top:30px; right:30px;',
      'top-left': 'top:30px; left:30px;',
      'bottom-center': 'bottom:30px; left:50%; transform:translateX(-50%);'
    }[pos];

    el.innerHTML = `
      <style>
        html, body { margin:0; padding:0; background:transparent; overflow:hidden; }
        .cd-box {
          position: fixed; ${posCss}
          background: ${bgcolor}; color: ${color};
          padding: 14px 24px; border-radius: 14px;
          font-family: -apple-system, sans-serif; text-align: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.35);
        }
        .cd-title { font-size: 13px; opacity: 0.9; margin-bottom: 4px; font-weight: 500; }
        .cd-time { font-size: 30px; font-weight: 700; letter-spacing: 0.5px; }
      </style>
      <div class="cd-box">
        <div class="cd-title">${title.replace(/</g,'&lt;')}</div>
        <div class="cd-time" id="cd-out">--:--:--:--</div>
      </div>
    `;
    function tick() {
      const out = document.getElementById('cd-out');
      if (!out) return;
      const t = new Date(target).getTime();
      if (!target || isNaN(t)) { out.textContent = 'Segera'; return; }
      const now = Date.now();
      let diff = t - now;
      if (diff <= 0) { out.textContent = 'Trip sudah dimulai'; return; }
      const d = Math.floor(diff / 86400000); diff -= d*86400000;
      const h = Math.floor(diff / 3600000); diff -= h*3600000;
      const m = Math.floor(diff / 60000); diff -= m*60000;
      const s = Math.floor(diff / 1000);
      out.textContent = d + 'h ' + String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
    }
    tick(); setInterval(tick, 1000);
  }

  if (ov === 'slot') {
    const el = document.getElementById('ov-slot');
    el.style.display = 'block';
    const sisa = params.get('sisa') || '0';
    const total = params.get('total') || '0';
    const label = unb64(params.get('label') || '');
    const color = params.get('color') || '#ffffff';
    const bgcolor = params.get('bgcolor') || '#d97706';
    const pos = params.get('pos') || 'top-right';
    const posCss = {
      'top-right': 'top:30px; right:30px;',
      'top-left': 'top:30px; left:30px;',
      'bottom-right': 'bottom:30px; right:30px;',
      'bottom-left': 'bottom:30px; left:30px;'
    }[pos];

    el.innerHTML = `
      <style>
        html, body { margin:0; padding:0; background:transparent; overflow:hidden; }
        .sl-box {
          position: fixed; ${posCss}
          background: ${bgcolor}; color: ${color};
          padding: 12px 20px; border-radius: 14px;
          font-family: -apple-system, sans-serif; text-align: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.35);
          animation: sl-pulse 1.8s ease-in-out infinite;
        }
        .sl-label { font-size: 12px; opacity: 0.9; font-weight: 500; }
        .sl-num { font-size: 26px; font-weight: 700; }
        @keyframes sl-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
      </style>
      <div class="sl-box">
        <div class="sl-label">${label.replace(/</g,'&lt;')}</div>
        <div class="sl-num">${sisa} / ${total}</div>
      </div>
    `;
  }

  if (ov === 'trip') {
    const el = document.getElementById('ov-trip');
    el.style.display = 'block';
    const nama = unb64(params.get('nama') || '');
    const tanggal = unb64(params.get('tanggal') || '');
    const harga = unb64(params.get('harga') || '');
    const fasilitas = unb64(params.get('fasilitas') || '');
    const color = params.get('color') || '#ffffff';
    const bgcolor = params.get('bgcolor') || '#1e3a2f';

    el.innerHTML = `
      <style>
        html, body { margin:0; padding:0; background:transparent; overflow:hidden; }
        .lt-wrap { position: fixed; left:0; right:0; bottom:60px; display:flex; justify-content:center; }
        .lt-box {
          background: ${bgcolor}; color: ${color};
          padding: 16px 26px; border-radius: 14px; max-width: 90vw;
          font-family: -apple-system, sans-serif;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          animation: lt-in 0.6s ease-out; text-align: center;
        }
        .lt-nama { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
        .lt-meta { font-size: 15px; opacity: 0.9; margin-bottom: 2px; }
        .lt-fasilitas { font-size: 13px; opacity: 0.75; margin-top: 4px; }
        @keyframes lt-in { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      </style>
      <div class="lt-wrap">
        <div class="lt-box">
          <div class="lt-nama">${nama.replace(/</g,'&lt;')}</div>
          <div class="lt-meta">${tanggal.replace(/</g,'&lt;')} &middot; ${harga.replace(/</g,'&lt;')}</div>
          ${fasilitas ? `<div class="lt-fasilitas">${fasilitas.replace(/</g,'&lt;')}</div>` : ''}
        </div>
      </div>
    `;
  }

  if (ov === 'qr') {
    const el = document.getElementById('ov-qr');
    el.style.display = 'block';
    const data = unb64(params.get('data') || '');
    const label = unb64(params.get('label') || '');
    const pos = params.get('pos') || 'bottom-right';
    const posCss = {
      'bottom-right': 'bottom:40px; right:40px;',
      'bottom-left': 'bottom:40px; left:40px;',
      'top-right': 'top:40px; right:40px;',
      'top-left': 'top:40px; left:40px;'
    }[pos];

    el.innerHTML = `
      <style>
        html, body { margin:0; padding:0; background:transparent; overflow:hidden; }
        .qr-box {
          position: fixed; ${posCss}
          background: #ffffff; padding: 12px; border-radius: 14px;
          text-align: center; box-shadow: 0 6px 20px rgba(0,0,0,0.35);
          font-family: -apple-system, sans-serif;
        }
        .qr-label { font-size: 12px; color: #111; font-weight: 600; margin-top: 6px; }
      </style>
      <div class="qr-box">
        <div id="qr-canvas"></div>
        ${label ? `<div class="qr-label">${label.replace(/</g,'&lt;')}</div>` : ''}
      </div>
    `;
    const qrScript = document.createElement('script');
    qrScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    qrScript.onload = () => {
      new QRCode(document.getElementById('qr-canvas'), { text: data || ' ', width: 140, height: 140 });
    };
    document.body.appendChild(qrScript);
  }

  if (ov === 'social') {
    const el = document.getElementById('ov-social');
    el.style.display = 'block';
    const ig = unb64(params.get('ig') || '');
    const tiktok = unb64(params.get('tiktok') || '');
    const wa = unb64(params.get('wa') || '');
    const color = params.get('color') || '#ffffff';
    const bgcolor = params.get('bgcolor') || '#0f172a';
    const pos = params.get('pos') || 'top';

    el.innerHTML = `
      <style>
        html, body { margin:0; padding:0; background:transparent; overflow:hidden; }
        .sb-bar {
          position: fixed; left:0; right:0; ${pos === 'top' ? 'top:0;' : 'bottom:0;'}
          background: ${bgcolor}; color: ${color};
          padding: 10px 0; display:flex; justify-content:center; gap:28px;
          font-family: -apple-system, sans-serif; font-size: 15px; font-weight: 600;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .sb-item { display:flex; align-items:center; gap:6px; }
      </style>
      <div class="sb-bar">
        ${ig ? `<div class="sb-item">IG ${ig.replace(/</g,'&lt;')}</div>` : ''}
        ${tiktok ? `<div class="sb-item">TikTok ${tiktok.replace(/</g,'&lt;')}</div>` : ''}
        ${wa ? `<div class="sb-item">WA ${wa.replace(/</g,'&lt;')}</div>` : ''}
      </div>
    `;
  }

  if (ov === 'alert') {
    const el = document.getElementById('ov-alert');
    el.style.display = 'block';
    const text = unb64(params.get('text') || '');
    const color = params.get('color') || '#ffffff';
    const bgcolor = params.get('bgcolor') || '#ec4899';
    const durasi = parseInt(params.get('durasi') || '5');

    el.innerHTML = `
      <style>
        html, body { margin:0; padding:0; background:transparent; overflow:hidden; }
        .al-wrap { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); }
        .al-box {
          background: ${bgcolor}; color: ${color};
          padding: 18px 32px; border-radius: 16px;
          font-family: -apple-system, sans-serif; font-size: 22px; font-weight: 700;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          animation: al-pop 0.5s ease-out, al-out 0.5s ease-in ${durasi}s forwards;
        }
        @keyframes al-pop { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes al-out { from { transform: scale(1); opacity: 1; } to { transform: scale(0.85); opacity: 0; } }
      </style>
      <div class="al-wrap" id="al-wrap"><div class="al-box" id="al-box">${text.replace(/</g,'&lt;')}</div></div>
    `;
  }

  if (ov === 'frame') {
    const el = document.getElementById('ov-frame');
    el.style.display = 'block';
    const color = params.get('color') || '#22c55e';
    const style = params.get('style') || 'full';
    const thick = params.get('thick') || '6';

    if (style === 'corners') {
      el.innerHTML = `
        <style>
          html, body { margin:0; padding:0; overflow:hidden; }
          .fr-corner { position: fixed; width: 60px; height: 60px; border-color: ${color}; border-style: solid; }
          .fr-tl { top:10px; left:10px; border-width:${thick}px 0 0 ${thick}px; }
          .fr-tr { top:10px; right:10px; border-width:${thick}px ${thick}px 0 0; }
          .fr-bl { bottom:10px; left:10px; border-width:0 0 ${thick}px ${thick}px; }
          .fr-br { bottom:10px; right:10px; border-width:0 ${thick}px ${thick}px 0; }
        </style>
        <div class="fr-corner fr-tl"></div><div class="fr-corner fr-tr"></div>
        <div class="fr-corner fr-bl"></div><div class="fr-corner fr-br"></div>
      `;
    } else if (style === 'sparkle') {
      el.innerHTML = `
        <style>
          html, body { margin:0; padding:0; overflow:hidden; }
          .fr-full { position: fixed; inset: 0; border: ${thick}px solid ${color}; box-sizing: border-box; }
          .fr-glow { position: fixed; inset: 0; border: ${thick}px solid ${color}; box-sizing: border-box; opacity: 0.5; animation: fr-glow 2s ease-in-out infinite; filter: blur(4px); }
          @keyframes fr-glow { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.85; } }
        </style>
        <div class="fr-full"></div><div class="fr-glow"></div>
      `;
    } else {
      el.innerHTML = `
        <style>
          html, body { margin:0; padding:0; overflow:hidden; }
          .fr-full { position: fixed; inset: 0; border: ${thick}px solid ${color}; box-sizing: border-box; }
        </style>
        <div class="fr-full"></div>
      `;
    }
  }

  if (ov === 'livebadge') {
    const el = document.getElementById('ov-livebadge');
    el.style.display = 'block';
    const text = unb64(params.get('text') || '');
    const color = params.get('color') || '#111111';
    const bgcolor = params.get('bgcolor') || '#ffffff';
    const pos = params.get('pos') || 'top-center';
    const posCss = {
      'top-center': 'top:30px; left:50%; transform:translateX(-50%);',
      'center': 'top:50%; left:50%; transform:translate(-50%,-50%);',
      'bottom-center': 'bottom:30px; left:50%; transform:translateX(-50%);'
    }[pos];

    el.innerHTML = `
      <style>
        html, body { margin:0; padding:0; background:transparent; overflow:hidden; }
        .lb-badge {
          position: fixed; ${posCss}
          background: ${bgcolor}; color: ${color};
          padding: 10px 20px; border-radius: 999px;
          font-family: -apple-system, sans-serif; font-size: 16px; font-weight: 700;
          display: flex; align-items: center; gap: 10px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.35);
        }
        .lb-red-dot {
          width: 12px; height: 12px; background-color: #ef4444; border-radius: 50%;
          display: inline-block; box-shadow: 0 0 10px #ef4444;
          animation: lb-blink 1.2s ease-in-out infinite;
        }
        @keyframes lb-blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(0.8); }
        }
      </style>
      <div class="lb-badge">
        <span class="lb-red-dot"></span>
        <span>${text.replace(/</g,'&lt;')}</span>
      </div>
    `;
  }

  if (ov === 'camcircle') {
    const el = document.getElementById('ov-camcircle');
    el.style.display = 'block';
    const size = params.get('size') || '260';
    const anim = params.get('anim') || 'glow-spin';
    const pos = params.get('pos') || 'bottom-right';
    const bordercolor = params.get('bordercolor') || '#22c55e';
    const borderthick = params.get('borderthick') || '6';
    const posCss = {
      'bottom-right': 'bottom:40px; right:40px;',
      'bottom-left': 'bottom:40px; left:40px;',
      'top-right': 'top:40px; right:40px;',
      'top-left': 'top:40px; left:40px;'
    }[pos];

    let animStyle = '';
    if (anim === 'glow-spin') {
      animStyle = `
        border: ${borderthick}px solid ${bordercolor};
        box-shadow: 0 0 20px ${bordercolor}, inset 0 0 15px ${bordercolor};
        animation: cc-rotate 6s linear infinite;
      `;
    } else if (anim === 'cyber-tech') {
      animStyle = `
        border: ${borderthick}px dashed ${bordercolor};
        box-shadow: 0 0 15px ${bordercolor};
        animation: cc-rotate 12s linear infinite;
      `;
    } else if (anim === 'pulse-wave') {
      animStyle = `
        border: ${borderthick}px solid ${bordercolor};
        animation: cc-pulse 2s ease-in-out infinite;
      `;
    } else {
      animStyle = `border: ${borderthick}px solid ${bordercolor}; box-shadow: 0 8px 24px rgba(0,0,0,0.4);`;
    }

    el.innerHTML = `
      <style>
        html, body { margin:0; padding:0; background:transparent; overflow:hidden; }
        .cc-ring {
          position: fixed; ${posCss}
          width: ${size}px; height: ${size}px; border-radius: 50%;
          box-sizing: border-box;
          ${animStyle}
        }
        @keyframes cc-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes cc-pulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 10px ${bordercolor}; } 50% { transform: scale(1.04); box-shadow: 0 0 25px ${bordercolor}; } }
      </style>
      <div class="cc-ring"></div>
    `;
  }

  if (ov === 'splitline') {
    const el = document.getElementById('ov-splitline');
    el.style.display = 'block';
    const anim = params.get('anim') || 'laser-beam';
    const splitpos = params.get('splitpos') || '50';
    const color = params.get('color') || '#3b82f6';
    const thick = params.get('thick') || '6';

    let extraCss = '';
    let extraHtml = '';
    if (anim === 'laser-beam') {
      extraCss = `
        background: ${color};
        box-shadow: 0 0 12px ${color};
        overflow: hidden;
      `;
      extraHtml = `<div class="sp-laser"></div>`;
    } else if (anim === 'rgb-flow') {
      extraCss = `
        background: linear-gradient(90deg, ${color}, #ec4899, #3b82f6, ${color});
        background-size: 300% 100%;
        animation: sp-flow 3s linear infinite;
        box-shadow: 0 0 12px ${color};
      `;
    } else if (anim === 'neon-pulse') {
      extraCss = `
        background: ${color};
        animation: sp-pulse 1.8s ease-in-out infinite;
      `;
    } else {
      extraCss = `background: ${color}; box-shadow: 0 2px 10px rgba(0,0,0,0.3);`;
    }

    el.innerHTML = `
      <style>
        html, body { margin:0; padding:0; background:transparent; overflow:hidden; }
        .sp-line {
          position: fixed; left: 0; right: 0; top: ${splitpos}%;
          height: ${thick}px; transform: translateY(-50%);
          ${extraCss}
        }
        .sp-laser {
          position: absolute; top:0; bottom:0; width: 120px;
          background: linear-gradient(90deg, transparent, #ffffff, transparent);
          animation: sp-sweep 2.5s ease-in-out infinite;
        }
        @keyframes sp-sweep { 0% { left: -150px; } 100% { left: 100vw; } }
        @keyframes sp-flow { 0% { background-position: 0% 50%; } 100% { background-position: 300% 50%; } }
        @keyframes sp-pulse { 0%, 100% { opacity: 0.6; box-shadow: 0 0 8px ${color}; } 50% { opacity: 1; box-shadow: 0 0 20px ${color}; } }
      </style>
      <div class="sp-line">${extraHtml}</div>
    `;
  }

  if (ov === 'animtitle') {
    const el = document.getElementById('ov-animtitle');
    el.style.display = 'block';
    const AT_L={
    A:{d:'M 6 60 L 32 4 L 58 60 M 16 38 H 48'},
    B:{d:'M 8 4 V 60 H 34 A 14 14 0 0 0 34 32 H 8 M 30 32 A 14 14 0 0 0 30 4 H 8'},
    C:{d:'M 49 15 A 24 24 0 1 0 49 49'},
    D:{d:'M 8 4 H 28 A 26 28 0 0 1 28 60 H 8 Z'},
    E:{d:'M 54 4 H 10 V 60 H 54 M 10 32 H 46'},
    F:{d:'M 54 4 H 10 V 60 M 10 32 H 44'},
    G:{d:'M 49 15 A 24 24 0 1 0 56 32 H 34'},
    H:{d:'M 8 4 V 60 M 56 4 V 60 M 8 32 H 56'},
    I:{d:'M 32 4 V 60',x:20,w:24},
    J:{d:'M 48 4 V 40 A 16 16 0 0 1 16 40'},
    K:{d:'M 8 4 V 60 M 52 4 L 8 36 M 22 25 L 54 60'},
    L:{d:'M 8 4 V 60 H 52'},
    M:{d:'M 6 60 V 4 L 32 40 L 58 4 V 60'},
    N:{d:'M 8 60 V 4 L 56 60 V 4'},
    O:{d:'M 32 32 m 0 -27 a 27 27 0 1 1 0 54 a 27 27 0 1 1 0 -54'},
    P:{d:'M 8 60 V 4 H 34 A 14 14 0 0 1 34 32 H 8'},
    Q:{d:'M 32 32 m 0 -24 a 24 24 0 1 1 0 48 a 24 24 0 1 1 0 -48 M 40 42 L 56 58'},
    R:{d:'M 8 60 V 4 H 32 A 14 14 0 0 1 32 32 H 8 M 30 32 L 54 60'},
    S:{d:'M 50 14 C 44 4 14 4 14 20 C 14 34 50 28 50 44 C 50 60 20 60 14 50'},
    T:{d:'M 6 4 H 58 M 32 4 V 60'},
    U:{d:'M 8 4 V 34 A 24 24 0 0 0 56 34 V 4'},
    V:{d:'M 6 4 L 32 60 L 58 4'},
    W:{d:'M 4 4 L 18 60 L 32 24 L 46 60 L 60 4'},
    X:{d:'M 8 4 L 56 60 M 56 4 L 8 60'},
    Y:{d:'M 6 4 L 32 32 L 58 4 M 32 32 V 60'},
    Z:{d:'M 8 4 H 56 L 8 60 H 56'}
    };
    const AT_PAL = [
      {g:[['#973BED','#007CFF'],['#00E0ED','#00DA72'],['#FF8A00','#FF2D75']],o:['#FFC800','#FF00FF']},
      {g:[['#00C6FF','#0072FF'],['#00E0ED','#185FA5'],['#5DCAA5','#0F6E56']],o:['#00E0ED','#973BED']},
      {g:[['#FF8A00','#FF2D75'],['#FFC800','#FF5A30'],['#FF2D75','#973BED']],o:['#FFC800','#FF2D75']},
      {g:[['#39FF14','#00E0ED'],['#FF00FF','#973BED'],['#FFF200','#39FF14']],o:['#00E0ED','#FF00FF']},
      {g:[['#97C459','#3B6D11'],['#5DCAA5','#0F6E56'],['#FAC775','#BA7517']],o:['#97C459','#0F6E56']}
    ];
    const isHex = s => /^#[0-9a-fA-F]{6}$/.test(s || '');
    const raw = unb64(params.get('text') || '');
    let words = raw.toUpperCase().replace(/[^A-Z ]/g, '').trim().split(/\s+/).filter(Boolean);
    if (!words.length) words = ['CITO', 'ADVENTURE'];
    
    const theme = parseInt(params.get('theme') || '5');
    const c1 = isHex(params.get('c1')) ? params.get('c1') : '#973bed';
    const c2 = isHex(params.get('c2')) ? params.get('c2') : '#007cff';
    
    let pal;
    if (theme === 5) {
      pal = { g: [[c1,c2],[c2,c1],[c1,c2]], o: [c1,c2] };
    } else {
      pal = AT_PAL[theme] || AT_PAL[0];
    }
    
    const maxSize = Math.max(30, Math.min(300, parseInt(params.get('size') || '100') || 100));
    const pos = params.get('pos') || 'center';
    const posCss = {
      'top-center': 'top:5vh; left:50%; transform:translateX(-50%);',
      'center': 'top:50%; left:50%; transform:translate(-50%,-50%);',
      'bottom-center': 'bottom:5vh; left:50%; transform:translateX(-50%);'
    }[pos] || 'top:50%; left:50%; transform:translate(-50%,-50%);';
    const avail = Math.max(200, Math.floor(window.innerWidth * 0.9));

    let idx = 0;
    const rowsHtml = words.map(word => {
      const chars = word.split('');
      let units = 0;
      chars.forEach(c => { units += (AT_L[c] ? (AT_L[c].w || 64) : 64) / 64; });
      const size = Math.max(18, Math.min(maxSize, Math.floor(avail / (units + 0.1 * (chars.length - 1)))));
      const gap = Math.round(size * 0.1);
      const letters = chars.map(c => {
        const l = AT_L[c] || AT_L['A'], vx = l.x || 0, w = l.w || 64, isO = c === 'O';
        const i = idx++;
        const g = isO ? 'at-go' : 'at-g' + (i % 3);
        const cls = isO ? 'at-spin' : 'at-dash';
        const sw = isO ? 10 : 8;
        const delay = isO ? 0 : -(i * 0.12);
        return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="' + vx + ' 0 ' + w + ' 64" height="' + size + '" width="' + (size * w / 64) + '" style="display:block"><path stroke-linejoin="round" stroke-linecap="round" stroke-width="' + sw + '" stroke="url(#' + g + ')" d="' + l.d + '" class="' + cls + '" pathLength="360" style="animation-delay:' + delay + 's"></path></svg>';
      }).join('');
      return '<div class="at-row" style="gap:' + gap + 'px">' + letters + '</div>';
    }).join('');
    const rowGap = Math.round(Math.min(maxSize, 100) * 0.3);

    const stops = (id, a, b) => '<linearGradient gradientUnits="userSpaceOnUse" y2="2" x2="0" y1="62" x1="0" id="' + id + '"><stop stop-color="' + a + '"></stop><stop stop-color="' + b + '" offset="1"></stop></linearGradient>';
    const defs = stops('at-g0', pal.g[0][0], pal.g[0][1]) + stops('at-g1', pal.g[1][0], pal.g[1][1]) + stops('at-g2', pal.g[2][0], pal.g[2][1]) +
      '<linearGradient gradientUnits="userSpaceOnUse" y2="0" x2="0" y1="64" x1="0" id="at-go"><stop stop-color="' + pal.o[0] + '"></stop><stop stop-color="' + pal.o[1] + '" offset="1"></stop>' +
      '<animateTransform repeatCount="indefinite" keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1" keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1" dur="8s" values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32" type="rotate" attributeName="gradientTransform"></animateTransform></linearGradient>';

    el.innerHTML = `
      <style>
        html, body { margin:0; padding:0; background:transparent; overflow:hidden; }
        .at-wrap { position: fixed; ${posCss} display:flex; flex-direction:column; align-items:center; gap:${rowGap}px; }
        .at-row { display:flex; align-items:center; justify-content:center; }
        .at-dash { animation: at-dashArray 2s ease-in-out infinite, at-dashOffset 2s linear infinite; }
        .at-spin { animation: at-spinDash 2s ease-in-out infinite, at-spin 8s ease-in-out infinite, at-dashOffset 2s linear infinite; transform-origin: center; }
        @keyframes at-dashArray { 0%{stroke-dasharray:0 1 359 0} 50%{stroke-dasharray:0 359 1 0} 100%{stroke-dasharray:359 1 0 0} }
        @keyframes at-spinDash { 0%{stroke-dasharray:270 90} 50%{stroke-dasharray:0 360} 100%{stroke-dasharray:270 90} }
        @keyframes at-dashOffset { 0%{stroke-dashoffset:365} 100%{stroke-dashoffset:5} }
        @keyframes at-spin { 0%{rotate:0deg} 12.5%,25%{rotate:270deg} 37.5%,50%{rotate:540deg} 62.5%,75%{rotate:810deg} 87.5%,100%{rotate:1080deg} }
      </style>
      <svg width="0" height="0" viewBox="0 0 64 64" style="position:absolute"><defs>${defs}</defs></svg>
      <div class="at-wrap">${rowsHtml}</div>
    `;
  }
})();
