// YouCrick — Complete Interactive Application Controller
(function() {
  const DATA = window.YOUCRICK_DATA;
  let state = {
    currentView: 'home',
    activeMatchId: 'm1',
    activeSubTab: 'commentary',
    tickerFilter: 'ALL',
    commFilter: 'ALL',
    autoSimInterval: null,
    audioMuted: true,
    pollVoted: null,
    pollCounts: { IND: 31420, AUS: 11250, DRAW: 6250 },
    dreamXI: ['Virat Kohli', 'Yashasvi Jaiswal', 'Rishabh Pant', 'Suryakumar Yadav', 'Jasprit Bumrah', 'Smriti Mandhana'],
    manhattanChartInstance: null
  };

  const DREAM_POOL = [
    'Virat Kohli', 'Yashasvi Jaiswal', 'Rohit Sharma', 'Rishabh Pant',
    'Suryakumar Yadav', 'Joe Root', 'Travis Head', 'Hardik Pandya',
    'Ravindra Jadeja', 'Jasprit Bumrah', 'Pat Cummins', 'Rashid Khan',
    'Smriti Mandhana', 'Kagiso Rabada', 'MS Dhoni'
  ];

  function getActiveMatch() {
    return DATA.matches.find(m => m.id === state.activeMatchId) || DATA.matches[0];
  }

  // Toast Notification Helper
  window.showToast = function(msg) {
    const c = document.getElementById('toast-container');
    if (!c) return;
    const el = document.createElement('div');
    el.className = 'toast-enter bg-slate-900 text-white border border-emerald-500/40 px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2';
    el.innerHTML = `<span class="text-emerald-400">🏏</span><span>${msg}</span>`;
    c.appendChild(el);
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 2800);
  };

  // Synthesized Web Audio SFX (Bat Hit & Crowd Cheer)
  function playBallSound(outcome) {
    if (state.audioMuted) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      if (outcome === 4 || outcome === 6) {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (outcome === 'W') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
        osc.start(now);
        osc.stop(now + 0.26);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(360, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {}
  }

  // Navigation & Theme Switching
  window.switchMainView = function(view) {
    state.currentView = view;
    const views = ['home', 'matchcenter', 'schedule', 'stats', 'rankings', 'news', 'fanzone'];
    views.forEach(v => {
      const panel = document.getElementById('view-' + v);
      const navBtn = document.getElementById('nav-' + v);
      if (panel) panel.classList.toggle('hidden', v !== view);
      if (navBtn) navBtn.classList.toggle('nav-tab-active', v === view);
    });
    if (view === 'matchcenter') {
      renderMatchCenter();
    } else if (view === 'schedule') {
      renderSeriesTable('WTC 2025-27');
      renderScheduleFixtures();
    } else if (view === 'stats') {
      renderH2HComparison();
    } else if (view === 'rankings') {
      renderRankings();
    } else if (view === 'news') {
      renderFullNews();
    } else if (view === 'fanzone') {
      runDrsSimulation();
      calculateDls();
      renderDreamXI();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.toggleMobileDrawer = function(force) {
    const d = document.getElementById('mobile-drawer');
    if (!d) return;
    if (typeof force === 'boolean') {
      d.classList.toggle('hidden', !force);
    } else {
      d.classList.toggle('hidden');
    }
  };

  window.toggleTheme = function() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = isDark ? '☀️' : '🌙';
    try { localStorage.setItem('yc_theme', isDark ? 'dark' : 'light'); } catch (e) {}
    if (state.currentView === 'matchcenter' && state.activeSubTab === 'analytics') {
      drawWagonWheel();
      drawPitchMap();
      renderManhattanChart();
    }
  };

  window.toggleAudioMute = function() {
    state.audioMuted = !state.audioMuted;
    const icon = document.getElementById('audio-icon');
    if (icon) icon.textContent = state.audioMuted ? '🔇' : '🔊';
    showToast(state.audioMuted ? 'Stadium SFX Muted' : 'Stadium SFX Enabled');
  };

  // Top Match Ticker Strip
  window.filterTicker = function(cat) {
    state.tickerFilter = cat;
    document.querySelectorAll('.ticker-cat-btn').forEach(btn => {
      const active = btn.getAttribute('data-cat') === cat;
      btn.className = active
        ? 'ticker-cat-btn px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shrink-0'
        : 'ticker-cat-btn px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0';
    });
    renderTickerStrip();
  };

  window.scrollTicker = function(delta) {
    const strip = document.getElementById('live-ticker-strip');
    if (strip) strip.scrollBy({ left: delta, behavior: 'smooth' });
  };

  function renderTickerStrip() {
    const strip = document.getElementById('live-ticker-strip');
    if (!strip) return;
    const list = DATA.matches.filter(m => {
      if (state.tickerFilter === 'ALL') return true;
      if (state.tickerFilter === 'LIVE') return m.status === 'LIVE';
      return m.category === state.tickerFilter;
    });

    strip.innerHTML = list.map(m => {
      const isSelected = m.id === state.activeMatchId;
      const badgeColor = m.status === 'LIVE'
        ? 'bg-red-500/20 text-red-400 border-red-500/30'
        : (m.status === 'RESULT' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30');
      return `
        <div onclick="selectMatch('${m.id}')" class="min-w-[265px] sm:min-w-[290px] p-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 border ${isSelected ? 'border-emerald-400 ring-1 ring-emerald-400/50' : 'border-slate-700'} cursor-pointer transition flex flex-col justify-between shrink-0">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-[10px] text-slate-400 font-semibold truncate max-w-[175px]">${m.series}</span>
              <span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded border ${badgeColor} flex items-center gap-1 shrink-0">
                ${m.status === 'LIVE' ? '<span class="live-dot"></span>' : ''}${m.format}
              </span>
            </div>
            <div class="space-y-1.5 text-xs">
              <div class="flex items-center justify-between font-bold">
                <span class="flex items-center gap-1.5"><span>${m.team1.flag}</span><span>${m.team1.code}</span></span>
                <span class="text-white">${m.team1.score}</span>
              </div>
              <div class="flex items-center justify-between font-bold">
                <span class="flex items-center gap-1.5"><span>${m.team2.flag}</span><span>${m.team2.code}</span></span>
                <span class="text-slate-200">${m.team2.score}</span>
              </div>
            </div>
          </div>
          <div class="mt-2.5 pt-2 border-t border-slate-700/80 flex items-center justify-between text-[11px]">
            <span class="text-emerald-400 font-medium truncate max-w-[195px]">${m.summaryText}</span>
            <span class="text-slate-400 font-bold hover:text-white shrink-0">Center →</span>
          </div>
        </div>
      `;
    }).join('');
  }

  window.selectMatch = function(matchId) {
    state.activeMatchId = matchId;
    const m = getActiveMatch();
    const ind = document.getElementById('sim-match-indicator');
    if (ind) ind.textContent = `Active: ${m.team1.code} vs ${m.team2.code}`;
    renderTickerStrip();
    renderHomeFeatured();
    if (state.currentView === 'matchcenter') {
      renderMatchCenter();
    } else {
      switchMainView('matchcenter');
    }
  };

  // Home View Rendering
  function renderHomeFeatured() {
    const m = getActiveMatch();
    const container = document.getElementById('home-featured-match');
    if (!container) return;

    const recentHtml = m.recentBalls.map(b => `<span class="ball-badge ball-${b}">${b}</span>`).join('');
    const battersHtml = m.currentBatters.map(b => `
      <tr class="border-b border-slate-200/60 dark:border-slate-800 text-xs">
        <td class="py-2 font-bold">${b.name} ${b.onStrike ? '<span class="text-emerald-500">*</span>' : ''}</td>
        <td class="py-2 text-right font-extrabold">${b.runs}</td>
        <td class="py-2 text-right text-slate-500">${b.balls}</td>
        <td class="py-2 text-right text-slate-500">${b.fours}</td>
        <td class="py-2 text-right text-slate-500">${b.sixes}</td>
        <td class="py-2 text-right font-semibold">${b.sr}</td>
      </tr>
    `).join('');

    container.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-500/15 text-red-500">
              <span class="live-dot"></span> ${m.statusBadge}
            </span>
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">${m.series}</span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">📍 ${m.venue}</p>
        </div>
        <button onclick="switchMainView('matchcenter')" class="px-3.5 py-1.5 rounded-lg bg-[#009270] hover:bg-[#007358] text-white text-xs font-bold transition shadow-sm">
          Open Full Match Center →
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-4">
        <div class="p-3.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70">
          <div class="flex items-center justify-between">
            <span class="text-base sm:text-lg font-extrabold flex items-center gap-2"><span class="text-2xl">${m.team1.flag}</span> ${m.team1.name}</span>
            <span class="text-lg sm:text-xl font-black text-[#009270] dark:text-emerald-400">${m.team1.score}</span>
          </div>
          <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Overs: ${m.team1.overs} • CRR: ${m.team1.crr}</div>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70">
          <div class="flex items-center justify-between">
            <span class="text-base sm:text-lg font-extrabold flex items-center gap-2"><span class="text-2xl">${m.team2.flag}</span> ${m.team2.name}</span>
            <span class="text-lg sm:text-xl font-black">${m.team2.score}</span>
          </div>
          <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Overs: ${m.team2.overs} • Win Prob: ${m.team2.winProb}%</div>
        </div>
      </div>

      <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs font-bold text-[#009270] dark:text-emerald-300 mb-4 flex flex-wrap items-center justify-between gap-2">
        <span>📢 ${m.summaryText}</span>
        <span>Partnership: ${m.currentPartnership.runs} (${m.currentPartnership.balls})</span>
      </div>

      <!-- Mini Batter Table -->
      <div class="responsive-table-wrap mb-4">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase text-slate-400">
              <th class="pb-1.5">Batter</th>
              <th class="pb-1.5 text-right">R</th>
              <th class="pb-1.5 text-right">B</th>
              <th class="pb-1.5 text-right">4s</th>
              <th class="pb-1.5 text-right">6s</th>
              <th class="pb-1.5 text-right">SR</th>
            </tr>
          </thead>
          <tbody>${battersHtml}</tbody>
        </table>
      </div>

      <!-- Recent Overs Strip -->
      <div class="flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span class="text-xs font-bold text-slate-400 mr-1">Recent:</span>
          ${recentHtml}
        </div>
        <div class="flex items-center gap-2 text-xs font-bold">
          <button onclick="switchMainView('matchcenter'); switchMatchSubTab('scorecard')" class="text-[#009270] dark:text-emerald-400 hover:underline">Scorecard</button>
          <span>•</span>
          <button onclick="switchMainView('matchcenter'); switchMatchSubTab('analytics')" class="text-[#009270] dark:text-emerald-400 hover:underline">360° Wagon Wheel</button>
        </div>
      </div>
    `;
  }

  function renderHomeWidgets() {
    // News Grid
    const ng = document.getElementById('home-news-grid');
    if (ng) {
      ng.innerHTML = DATA.news.map(n => `
        <article onclick="openArticleModal('${n.id}')" class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 cursor-pointer transition flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-[#009270] dark:text-emerald-400">${n.badge}</span>
              <span class="text-[11px] text-slate-400">${n.time}</span>
            </div>
            <h3 class="font-bold text-sm leading-snug mb-1.5 hover:text-[#009270] dark:hover:text-emerald-400">${n.title}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">${n.summary}</p>
          </div>
          <div class="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
            <span>✍️ ${n.author}</span>
            <span class="font-bold text-emerald-500">Read →</span>
          </div>
        </article>
      `).join('');
    }

    // Mini Standings
    const ms = document.getElementById('home-mini-standings');
    if (ms) {
      const rows = DATA.seriesStandings['IPL 2026'].slice(0, 5).map(r => `
        <tr class="border-b border-slate-200/60 dark:border-slate-800 text-xs">
          <td class="py-2 font-bold">${r.pos}. ${r.team}</td>
          <td class="py-2 text-right">${r.p}</td>
          <td class="py-2 text-right font-bold text-emerald-500">${r.pts}</td>
          <td class="py-2 text-right text-slate-400">${r.nrr}</td>
        </tr>
      `).join('');
      ms.innerHTML = `
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[10px] uppercase text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <th class="pb-1.5">Team</th>
              <th class="pb-1.5 text-right">P</th>
              <th class="pb-1.5 text-right">Pts</th>
              <th class="pb-1.5 text-right">NRR</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    }

    renderPoll();
  }

  window.votePoll = function(choice) {
    if (!state.pollVoted) {
      state.pollCounts[choice] = (state.pollCounts[choice] || 0) + 1;
      state.pollVoted = choice;
      showToast(`Vote recorded for ${choice}!`);
      renderPoll();
    }
  };

  function renderPoll() {
    const box = document.getElementById('poll-options');
    const totalEl = document.getElementById('poll-total-votes');
    if (!box) return;
    const total = state.pollCounts.IND + state.pollCounts.AUS + state.pollCounts.DRAW;
    if (totalEl) totalEl.textContent = `${total.toLocaleString()} votes`;

    const opts = [
      { key: 'IND', label: '🇮🇳 India Win', count: state.pollCounts.IND, color: 'bg-emerald-500' },
      { key: 'AUS', label: '🇦🇺 Australia Win', count: state.pollCounts.AUS, color: 'bg-amber-500' },
      { key: 'DRAW', label: '🤝 Match Drawn', count: state.pollCounts.DRAW, color: 'bg-blue-500' }
    ];

    box.innerHTML = opts.map(o => {
      const pct = Math.round((o.count / total) * 100);
      const isPicked = state.pollVoted === o.key;
      return `
        <button onclick="votePoll('${o.key}')" class="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:border-emerald-500 border ${isPicked ? 'border-emerald-500' : 'border-transparent'} text-left transition relative overflow-hidden">
          <div class="flex items-center justify-between text-xs font-bold relative z-10 mb-1">
            <span>${o.label} ${isPicked ? '✓' : ''}</span>
            <span>${pct}%</span>
          </div>
          <div class="w-full h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden">
            <div class="${o.color} h-full rounded-full" style="width:${pct}%"></div>
          </div>
        </button>
      `;
    }).join('');
  }

  // Live Ball Simulation Engine
  window.toggleAutoSim = function() {
    const dot = document.getElementById('autosim-dot');
    const label = document.getElementById('autosim-label');
    if (state.autoSimInterval) {
      clearInterval(state.autoSimInterval);
      state.autoSimInterval = null;
      if (dot) dot.className = 'w-2 h-2 rounded-full bg-slate-900';
      if (label) label.textContent = 'Sim Live';
      showToast('Live Auto-Simulation Paused');
    } else {
      if (dot) dot.className = 'w-2 h-2 rounded-full bg-red-600 animate-ping';
      if (label) label.textContent = 'Simulating...';
      showToast('Auto-Simulating Live Balls every 3.5s!');
      simulateManualBall('RANDOM');
      state.autoSimInterval = setInterval(() => {
        simulateManualBall('RANDOM');
      }, 3500);
    }
  };

  window.simulateManualBall = function(outcome) {
    const m = getActiveMatch();
    const choices = [0, 0, 1, 1, 2, 4, 4, 6, 'W'];
    const actual = outcome === 'RANDOM' ? choices[Math.floor(Math.random() * choices.length)] : outcome;
    playBallSound(actual);

    // Update overs
    let [ov, ball] = (m.team2.score.includes('/') && m.id === 'm2' ? m.team2.overs : m.team1.overs).split('.').map(Number);
    if (isNaN(ov)) { ov = 10; ball = 0; }
    ball += 1;
    if (ball >= 6) { ov += 1; ball = 0; }
    const newOvers = `${ov}.${ball}`;

    // Active batter & bowler
    const striker = m.currentBatters.find(b => b.onStrike) || m.currentBatters[0];
    const bowler = m.currentBowlers[0];

    let commText = '';
    let commType = 'run';
    if (actual === 'W') {
      commType = 'wicket';
      commText = `OUT! Big breakthrough by ${bowler.name}! Sharp delivery catches the edge of ${striker.name}'s bat and the stadium erupts!`;
      bowler.wickets += 1;
    } else if (actual === 6) {
      commType = 'six';
      striker.runs += 6;
      striker.balls += 1;
      striker.sixes += 1;
      commText = `SIX! Magisterial hit by ${striker.name}! Cleans the front leg and launches ${bowler.name} deep into the stands!`;
    } else if (actual === 4) {
      commType = 'four';
      striker.runs += 4;
      striker.balls += 1;
      striker.fours += 1;
      commText = `FOUR! Crisp timing from ${striker.name}! Pierces the infield off ${bowler.name} for a boundary!`;
    } else {
      striker.runs += Number(actual);
      striker.balls += 1;
      commType = actual === 0 ? 'dot' : 'run';
      commText = actual === 0
        ? `Dot ball! ${bowler.name} lands it on a probing length, solidly defended by ${striker.name}.`
        : `${striker.name} works ${bowler.name} into the gap for ${actual} run${actual > 1 ? 's' : ''}.`;
    }
    striker.sr = ((striker.runs / Math.max(1, striker.balls)) * 100).toFixed(2);

    // Update match score string
    const targetTeam = m.id === 'm2' ? m.team2 : m.team1;
    targetTeam.overs = newOvers;
    const scoreMatch = targetTeam.score.match(/(\d+)\/(\d+)$/);
    if (scoreMatch) {
      const curRuns = parseInt(scoreMatch[1], 10) + (actual === 'W' ? 0 : Number(actual));
      const curWkts = Math.min(9, parseInt(scoreMatch[2], 10) + (actual === 'W' ? 1 : 0));
      targetTeam.score = targetTeam.score.replace(/\d+\/\d+$/, `${curRuns}/${curWkts}`);
    }

    m.recentBalls.push(String(actual));
    if (m.recentBalls.length > 12) m.recentBalls.shift();

    m.commentary.unshift({
      over: newOvers,
      ball: String(actual),
      type: commType,
      batter: striker.name,
      bowler: bowler.name,
      text: commText
    });

    renderTickerStrip();
    renderHomeFeatured();
    if (state.currentView === 'matchcenter') {
      renderMatchCenter();
    }
    showToast(`Over ${newOvers}: ${actual === 'W' ? 'WICKET!' : actual + ' run(s)'} (${striker.name})`);
  };

  // Match Center Rendering
  window.switchMatchSubTab = function(tab) {
    state.activeSubTab = tab;
    const tabs = ['commentary', 'scorecard', 'analytics', 'squads', 'info'];
    tabs.forEach(t => {
      const btn = document.getElementById('mctab-' + t);
      const panel = document.getElementById('mc-panel-' + t);
      if (btn) btn.classList.toggle('subtab-active', t === tab);
      if (panel) panel.classList.toggle('hidden', t !== tab);
    });
    if (tab === 'analytics') {
      setTimeout(() => {
        drawWagonWheel();
        drawPitchMap();
        renderManhattanChart();
      }, 40);
    }
  };

  window.filterCommentary = function(f) {
    state.commFilter = f;
    document.querySelectorAll('.comm-filter-btn').forEach(btn => {
      const active = btn.getAttribute('data-cfilter') === f;
      btn.className = active
        ? 'comm-filter-btn px-2.5 py-1 rounded-md text-xs font-bold bg-[#009270] text-white'
        : 'comm-filter-btn px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-200 dark:bg-slate-800';
    });
    renderMatchCenter();
  };

  function renderMatchCenter() {
    const m = getActiveMatch();

    // Selector pills
    const sel = document.getElementById('mc-match-selector');
    if (sel) {
      sel.innerHTML = DATA.matches.map(item => `
        <button onclick="selectMatch('${item.id}')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${item.id === m.id ? 'bg-[#009270] text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}">
          ${item.team1.flag} ${item.team1.code} vs ${item.team2.code} ${item.team2.flag}
        </button>
      `).join('');
    }

    // Header Content
    const hdr = document.getElementById('mc-header-content');
    if (hdr) {
      hdr.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <span class="text-xs font-bold text-[#009270] dark:text-emerald-400">${m.series}</span>
            <h1 class="text-lg sm:text-2xl font-black mt-0.5">${m.team1.name} vs ${m.team2.name}</h1>
            <p class="text-xs text-slate-500 dark:text-slate-400">📍 ${m.venue} • 🪙 ${m.toss}</p>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-black bg-red-500/15 text-red-500 flex items-center gap-1.5">
            ${m.status === 'LIVE' ? '<span class="live-dot"></span>' : ''}${m.statusBadge}
          </span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
          <div class="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-between">
            <span class="font-extrabold text-base flex items-center gap-2"><span class="text-2xl">${m.team1.flag}</span> ${m.team1.name}</span>
            <span class="font-black text-lg sm:text-xl text-emerald-500">${m.team1.score} <span class="text-xs font-normal text-slate-400">(${m.team1.overs})</span></span>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-between">
            <span class="font-extrabold text-base flex items-center gap-2"><span class="text-2xl">${m.team2.flag}</span> ${m.team2.name}</span>
            <span class="font-black text-lg sm:text-xl">${m.team2.score} <span class="text-xs font-normal text-slate-400">(${m.team2.overs})</span></span>
          </div>
        </div>
        <div class="text-xs font-bold text-amber-500 dark:text-amber-400">⚡ ${m.summaryText}</div>
      `;
    }

    // Commentary List
    const commBox = document.getElementById('mc-commentary-list');
    if (commBox) {
      const filtered = m.commentary.filter(c => state.commFilter === 'ALL' || c.type === state.commFilter);
      commBox.innerHTML = (filtered.length ? filtered : m.commentary).map(c => `
        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 flex items-start gap-3">
          <div class="flex flex-col items-center shrink-0">
            <span class="text-xs font-black text-slate-500 mb-1">${c.over}</span>
            <span class="ball-badge ball-${c.ball}">${c.ball}</span>
          </div>
          <div class="text-xs sm:text-sm leading-relaxed">
            <div class="font-bold text-slate-800 dark:text-slate-200 mb-0.5">${c.bowler} to ${c.batter}</div>
            <p class="text-slate-600 dark:text-slate-300">${c.text}</p>
          </div>
        </div>
      `).join('');
    }

    // Mini Crease & Win Prob
    const crease = document.getElementById('mc-mini-crease');
    if (crease) {
      crease.innerHTML = `
        <h4 class="font-extrabold text-sm mb-3">At the Crease</h4>
        <div class="space-y-2 text-xs">
          ${m.currentBatters.map(b => `
            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
              <span class="font-bold">${b.name} ${b.onStrike ? '🏏' : ''}</span>
              <span class="font-black">${b.runs}(${b.balls}) • SR ${b.sr}</span>
            </div>
          `).join('')}
          <div class="pt-2 border-t border-slate-200 dark:border-slate-700">
            <div class="text-[11px] uppercase text-slate-400 font-bold mb-1">Current Bowler</div>
            ${m.currentBowlers.map(bw => `
              <div class="flex items-center justify-between py-1">
                <span class="font-semibold">${bw.name}</span>
                <span class="font-bold text-emerald-500">${bw.wickets}/${bw.runs} (${bw.overs} Ov)</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    const wp = document.getElementById('mc-win-prob-card');
    if (wp) {
      wp.innerHTML = `
        <h4 class="font-extrabold text-sm mb-2">Real-Time Win Probability</h4>
        <div class="flex items-center justify-between text-xs font-bold mb-1.5">
          <span class="text-emerald-500">${m.team1.code}: ${m.team1.winProb}%</span>
          ${m.drawProb ? `<span class="text-slate-400">Draw: ${m.drawProb}%</span>` : ''}
          <span class="text-amber-500">${m.team2.code}: ${m.team2.winProb}%</span>
        </div>
        <div class="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
          <div class="bg-emerald-500 h-full" style="width:${m.team1.winProb}%"></div>
          <div class="bg-slate-500 h-full" style="width:${m.drawProb || 0}%"></div>
          <div class="bg-amber-500 h-full" style="width:${m.team2.winProb}%"></div>
        </div>
      `;
    }

    // Scorecard Container
    const sc = document.getElementById('mc-scorecard-container');
    if (sc) {
      const inningsList = m.innings && m.innings.length ? m.innings : DATA.matches[0].innings;
      sc.innerHTML = inningsList.map(inn => `
        <div class="yc-card overflow-hidden">
          <div class="bg-[#009270] text-white px-4 py-3 flex items-center justify-between">
            <span class="font-extrabold text-sm sm:text-base">${inn.title}</span>
            <span class="font-black text-sm sm:text-base">${inn.total}</span>
          </div>
          <div class="p-4 space-y-4">
            <div class="responsive-table-wrap">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[11px]">
                    <th class="pb-2">Batter</th>
                    <th class="pb-2">Dismissal</th>
                    <th class="pb-2 text-right">R</th>
                    <th class="pb-2 text-right">B</th>
                    <th class="pb-2 text-right">4s</th>
                    <th class="pb-2 text-right">6s</th>
                    <th class="pb-2 text-right">SR</th>
                  </tr>
                </thead>
                <tbody>
                  ${inn.batters.map(b => `
                    <tr class="border-b border-slate-200/60 dark:border-slate-800">
                      <td class="py-2.5 font-bold ${b.active ? 'text-emerald-500' : ''}">${b.name}</td>
                      <td class="py-2.5 text-slate-500 dark:text-slate-400">${b.dismissal}</td>
                      <td class="py-2.5 text-right font-extrabold">${b.r}</td>
                      <td class="py-2.5 text-right">${b.b}</td>
                      <td class="py-2.5 text-right">${b.fours}</td>
                      <td class="py-2.5 text-right">${b.sixes}</td>
                      <td class="py-2.5 text-right font-semibold">${b.sr}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400 space-y-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
              <div><strong>Extras:</strong> ${inn.extras}</div>
              <div><strong>Did Not Bat:</strong> ${inn.dnb}</div>
              <div><strong>Fall of Wickets:</strong> ${inn.fow}</div>
            </div>
            <div class="responsive-table-wrap">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[11px]">
                    <th class="pb-2">Bowler</th>
                    <th class="pb-2 text-right">O</th>
                    <th class="pb-2 text-right">M</th>
                    <th class="pb-2 text-right">R</th>
                    <th class="pb-2 text-right">W</th>
                    <th class="pb-2 text-right">NB</th>
                    <th class="pb-2 text-right">WD</th>
                    <th class="pb-2 text-right">ECO</th>
                  </tr>
                </thead>
                <tbody>
                  ${inn.bowlers.map(bw => `
                    <tr class="border-b border-slate-200/60 dark:border-slate-800">
                      <td class="py-2 font-bold">${bw.name}</td>
                      <td class="py-2 text-right">${bw.o}</td>
                      <td class="py-2 text-right">${bw.m}</td>
                      <td class="py-2 text-right">${bw.r}</td>
                      <td class="py-2 text-right font-extrabold text-emerald-500">${bw.w}</td>
                      <td class="py-2 text-right">${bw.nb}</td>
                      <td class="py-2 text-right">${bw.wd}</td>
                      <td class="py-2 text-right font-semibold">${bw.eco}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Squads
    const sq = document.getElementById('mc-squads-content');
    if (sq && m.squads) {
      sq.innerHTML = `
        <div>
          <h4 class="font-extrabold text-base mb-3">${m.team1.flag} ${m.team1.name} Playing XI</h4>
          <div class="space-y-1.5 text-xs">
            ${m.squads.t1Playing.map((p, i) => `<div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-semibold">${i + 1}. ${p}</div>`).join('')}
          </div>
          <div class="mt-3 text-xs text-slate-400"><strong>Bench:</strong> ${m.squads.t1Bench.join(', ')}</div>
        </div>
        <div>
          <h4 class="font-extrabold text-base mb-3">${m.team2.flag} ${m.team2.name} Playing XI</h4>
          <div class="space-y-1.5 text-xs">
            ${m.squads.t2Playing.map((p, i) => `<div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-semibold">${i + 1}. ${p}</div>`).join('')}
          </div>
          <div class="mt-3 text-xs text-slate-400"><strong>Bench:</strong> ${m.squads.t2Bench.join(', ')}</div>
        </div>
      `;
    }

    // Match Info
    const info = document.getElementById('mc-info-content');
    if (info) {
      info.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 space-y-2">
            <h4 class="font-extrabold text-sm text-emerald-500">Match Details & Officials</h4>
            <div><strong>Series:</strong> ${m.series}</div>
            <div><strong>Venue:</strong> ${m.venue}</div>
            <div><strong>Toss:</strong> ${m.toss}</div>
            <div><strong>Umpires:</strong> ${m.umpires}</div>
            <div><strong>Match Referee:</strong> ${m.referee}</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 space-y-2">
            <h4 class="font-extrabold text-sm text-amber-500">Pitch & Weather Radar</h4>
            <div><strong>Condition:</strong> ${m.weather.condition} (${m.weather.temp})</div>
            <div><strong>Humidity & Wind:</strong> ${m.weather.humidity} • ${m.weather.wind}</div>
            <div><strong>Rain Probability:</strong> ${m.weather.rainChance}</div>
            <div><strong>Pitch Report:</strong> ${m.pitchReport}</div>
          </div>
        </div>
      `;
    }

    if (state.activeSubTab === 'analytics') {
      drawWagonWheel();
      drawPitchMap();
      renderManhattanChart();
    }
  }

  // HTML5 Canvas 360 Wagon Wheel
  window.drawWagonWheel = function() {
    const canvas = document.getElementById('wagon-wheel-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = (w / 2) - 24;

    ctx.clearRect(0, 0, w, h);

    // Outfield turf gradient
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    grad.addColorStop(0, '#059669');
    grad.addColorStop(1, '#064e3b');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Boundary rope
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 30-yard circle
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.45, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Pitch rectangle in center
    ctx.fillStyle = '#d6bc8b';
    ctx.fillRect(cx - 7, cy - 22, 14, 44);

    // Filter shots
    const batterSel = (document.getElementById('ww-batter-select') || {}).value || 'ALL';
    const runsSel = (document.getElementById('ww-runs-select') || {}).value || 'ALL';

    const shots = DATA.wagonWheelShots.filter(s => {
      if (batterSel !== 'ALL' && s.batter !== batterSel) return false;
      if (runsSel !== 'ALL' && String(s.runs) !== runsSel) return false;
      return true;
    });

    shots.forEach(s => {
      const rad = (s.angle - 90) * (Math.PI / 180);
      const tx = cx + Math.cos(rad) * (r * s.dist);
      const ty = cy + Math.sin(rad) * (r * s.dist);

      ctx.strokeStyle = s.runs === 6 ? '#a855f7' : (s.runs === 4 ? '#34d399' : '#fbbf24');
      ctx.lineWidth = s.runs >= 4 ? 3 : 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(tx, ty);
      ctx.stroke();

      ctx.fillStyle = ctx.strokeStyle;
      ctx.beginPath();
      ctx.arc(tx, ty, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  // HTML5 Canvas Hawkeye Pitch Map
  window.drawPitchMap = function() {
    const canvas = document.getElementById('pitch-map-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Turf surround
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, 0, w, h);

    // Pitch strip
    const px = 85;
    const pw = w - 170;
    ctx.fillStyle = '#d4b483';
    ctx.fillRect(px, 20, pw, h - 40);

    // Length bands
    const bands = [
      { y: 40, h: 55, label: 'YORKER / FULL TOSS', color: 'rgba(245, 158, 11, 0.22)' },
      { y: 95, h: 75, label: 'FULL LENGTH', color: 'rgba(16, 185, 129, 0.22)' },
      { y: 170, h: 95, label: 'GOOD LENGTH', color: 'rgba(59, 130, 246, 0.22)' },
      { y: 265, h: 85, label: 'SHORT / BOUNCER', color: 'rgba(139, 92, 246, 0.22)' }
    ];
    bands.forEach(b => {
      ctx.fillStyle = b.color;
      ctx.fillRect(px, b.y, pw, b.h);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.fillText(b.label, px + 8, b.y + 15);
    });

    // Stumps at top
    ctx.fillStyle = '#ffffff';
    for (let i = -1; i <= 1; i++) {
      ctx.fillRect(w / 2 + i * 8 - 2, 24, 4, 16);
    }

    const lenSel = (document.getElementById('pm-length-select') || {}).value || 'ALL';
    DATA.pitchDeliveries
      .filter(d => lenSel === 'ALL' || d.length === lenSel)
      .forEach(d => {
        const bx = px + d.x * pw;
        const by = 30 + d.y * (h - 60);
        ctx.fillStyle = d.outcome === 'W' ? '#ef4444' : (d.outcome === '4' || d.outcome === '6' ? '#10b981' : '#3b82f6');
        ctx.beginPath();
        ctx.arc(bx, by, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
  };

  // Chart.js Manhattan / Worm Chart
  function renderManhattanChart() {
    const canvas = document.getElementById('manhattan-chart');
    if (!canvas || typeof Chart === 'undefined') return;
    if (state.manhattanChartInstance) {
      state.manhattanChartInstance.destroy();
    }
    const m = getActiveMatch();
    const labels = m.manhattan1.map((_, idx) => `Ov ${idx + 1}`);
    state.manhattanChartInstance = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: m.team1.name,
            data: m.manhattan1,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            tension: 0.35,
            fill: true
          },
          {
            label: m.team2.name,
            data: m.manhattan2,
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            tension: 0.35,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#94a3b8', font: { weight: 'bold' } } }
        },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,0.1)' } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,0.1)' } }
        }
      }
    });
  }

  // Series & Standings View
  window.renderSeriesTable = function(seriesName) {
    const wtcBtn = document.getElementById('st-btn-wtc');
    const iplBtn = document.getElementById('st-btn-ipl');
    if (wtcBtn && iplBtn) {
      wtcBtn.className = seriesName === 'WTC 2025-27'
        ? 'px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#009270] text-white'
        : 'px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-800';
      iplBtn.className = seriesName === 'IPL 2026'
        ? 'px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#009270] text-white'
        : 'px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-800';
    }
    const container = document.getElementById('series-standings-table');
    if (!container) return;
    const rows = DATA.seriesStandings[seriesName] || [];
    container.innerHTML = `
      <table class="w-full text-left border-collapse text-xs sm:text-sm">
        <thead>
          <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[11px]">
            <th class="pb-2.5">#</th>
            <th class="pb-2.5">Team</th>
            <th class="pb-2.5 text-right">P</th>
            <th class="pb-2.5 text-right">W</th>
            <th class="pb-2.5 text-right">L</th>
            <th class="pb-2.5 text-right">D/T</th>
            <th class="pb-2.5 text-right">Pts</th>
            <th class="pb-2.5 text-right">PCT / NRR</th>
            <th class="pb-2.5 text-right">Last 5</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(r => `
            <tr class="border-b border-slate-200/60 dark:border-slate-800">
              <td class="py-3 font-bold">${r.pos}</td>
              <td class="py-3 font-extrabold">${r.team}</td>
              <td class="py-3 text-right">${r.p}</td>
              <td class="py-3 text-right font-semibold text-emerald-500">${r.w}</td>
              <td class="py-3 text-right text-red-400">${r.l}</td>
              <td class="py-3 text-right">${r.d}</td>
              <td class="py-3 text-right font-black">${r.pts}</td>
              <td class="py-3 text-right font-semibold">${r.pct} (${r.nrr})</td>
              <td class="py-3 text-right">${r.form.map(f => `<span class="inline-block w-5 h-5 leading-5 text-center rounded text-[10px] font-bold ml-0.5 ${f === 'W' ? 'bg-emerald-500/20 text-emerald-400' : (f === 'L' ? 'bg-red-500/20 text-red-400' : 'bg-slate-500/20 text-slate-400')}">${f}</span>`).join('')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  };

  function renderScheduleFixtures() {
    const box = document.getElementById('schedule-fixtures-list');
    if (!box) return;
    box.innerHTML = DATA.matches.map(m => `
      <div onclick="selectMatch('${m.id}')" class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 cursor-pointer transition">
        <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>${m.series}</span>
          <span class="font-bold text-emerald-400">${m.statusBadge}</span>
        </div>
        <div class="font-extrabold text-sm sm:text-base mb-1">${m.team1.flag} ${m.team1.name} (${m.team1.score}) vs ${m.team2.flag} ${m.team2.name} (${m.team2.score})</div>
        <div class="text-xs text-slate-500">${m.summaryText}</div>
      </div>
    `).join('');
  }

  // Head-to-Head Player Stats Comparator
  function initH2HDropdowns() {
    const s1 = document.getElementById('h2h-p1');
    const s2 = document.getElementById('h2h-p2');
    if (!s1 || !s2) return;
    const opts = DATA.players.map(p => `<option value="${p.id}">${p.name} (${p.country})</option>`).join('');
    s1.innerHTML = opts;
    s2.innerHTML = opts;
    s1.value = 'p1';
    s2.value = 'p2';
  }

  window.renderH2HComparison = function() {
    const id1 = (document.getElementById('h2h-p1') || {}).value || 'p1';
    const id2 = (document.getElementById('h2h-p2') || {}).value || 'p2';
    const fmt = (document.getElementById('h2h-format') || {}).value || 'test';
    const p1 = DATA.players.find(p => p.id === id1) || DATA.players[0];
    const p2 = DATA.players.find(p => p.id === id2) || DATA.players[1];
    const st1 = p1[fmt];
    const st2 = p2[fmt];
    const out = document.getElementById('h2h-comparison-output');
    if (!out) return;

    const metrics = [
      { label: 'Matches Played', v1: st1.m, v2: st2.m },
      { label: 'Career Runs', v1: st1.runs, v2: st2.runs },
      { label: 'Batting / Bowling Average', v1: st1.avg, v2: st2.avg },
      { label: 'Strike Rate', v1: st1.sr, v2: st2.sr },
      { label: '100s / Wickets', v1: st1.hundreds, v2: st2.hundreds },
      { label: '50s / 5W Hauls', v1: st1.fifties, v2: st2.fifties },
      { label: 'Career Best (HS / BBI)', v1: st1.hs, v2: st2.hs }
    ];

    out.innerHTML = `
      <div class="grid grid-cols-2 gap-4 mb-5">
        <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <div class="text-xs text-emerald-400 font-bold">${p1.country}</div>
          <div class="text-base sm:text-xl font-black">${p1.name}</div>
          <div class="text-xs text-slate-400">${p1.role} • ${p1.style}</div>
        </div>
        <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-right">
          <div class="text-xs text-amber-400 font-bold">${p2.country}</div>
          <div class="text-base sm:text-xl font-black">${p2.name}</div>
          <div class="text-xs text-slate-400">${p2.role} • ${p2.style}</div>
        </div>
      </div>
      <div class="space-y-2.5">
        ${metrics.map(row => `
          <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/70 grid grid-cols-3 items-center text-xs sm:text-sm">
            <div class="font-black text-emerald-500">${row.v1}</div>
            <div class="text-center text-slate-400 font-bold text-xs uppercase">${row.label}</div>
            <div class="text-right font-black text-amber-400">${row.v2}</div>
          </div>
        `).join('')}
      </div>
    `;
  };

  // ICC Rankings View
  window.renderRankings = function() {
    const gender = (document.getElementById('rank-gender') || {}).value || 'men';
    const format = (document.getElementById('rank-format') || {}).value || 'TEST';
    const data = DATA.iccRankings[gender][format];
    const grid = document.getElementById('icc-rankings-grid');
    if (!grid || !data) return;

    const sections = [
      { title: 'Top Teams', items: data.teams, subKey: 'points', subLabel: 'Pts' },
      { title: 'Top Batters', items: data.batters, subKey: 'best', subLabel: 'Best' },
      { title: 'Top Bowlers', items: data.bowlers, subKey: 'best', subLabel: 'Best' }
    ];

    grid.innerHTML = sections.map(sec => `
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <h3 class="font-extrabold text-sm sm:text-base mb-3 text-[#009270] dark:text-emerald-400">${format} — ${sec.title}</h3>
        <div class="space-y-2">
          ${sec.items.map(item => `
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900/70 text-xs">
              <div class="flex items-center gap-2.5">
                <span class="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-500 font-black flex items-center justify-center">${item.rank}</span>
                <div>
                  <div class="font-bold">${item.name}</div>
                  <div class="text-[10px] text-slate-400">${sec.subLabel}: ${item[sec.subKey]}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-black text-sm">${item.rating}</div>
                <div class="text-[10px] font-bold text-emerald-400">${item.trend}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  };

  // News & Article Reader Modal
  function renderFullNews() {
    const g = document.getElementById('full-news-grid');
    if (!g) return;
    g.innerHTML = DATA.news.map(n => `
      <div onclick="openArticleModal('${n.id}')" class="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 cursor-pointer transition space-y-2">
        <div class="flex items-center justify-between text-xs">
          <span class="font-black text-emerald-500">${n.badge} • ${n.category}</span>
          <span class="text-slate-400">${n.readTime}</span>
        </div>
        <h3 class="text-base font-extrabold">${n.title}</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400">${n.summary}</p>
        <div class="text-[11px] text-slate-400 pt-2">By ${n.author} • ${n.time}</div>
      </div>
    `).join('');
  }

  window.openArticleModal = function(id) {
    const n = DATA.news.find(x => x.id === id) || DATA.news[0];
    document.getElementById('modal-article-badge').textContent = `${n.badge} • ${n.category}`;
    document.getElementById('modal-article-title').textContent = n.title;
    document.getElementById('modal-article-meta').textContent = `By ${n.author} • ${n.time} • ${n.readTime}`;
    document.getElementById('modal-article-body').innerHTML = n.body.map(p => `<p>${p}</p>`).join('');
    document.getElementById('article-modal').classList.remove('hidden');
  };

  window.closeArticleModal = function() {
    document.getElementById('article-modal').classList.add('hidden');
  };

  // DRS Hawkeye Simulator
  window.runDrsSimulation = function() {
    const canvas = document.getElementById('drs-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const pitching = (document.getElementById('drs-pitching') || {}).value || 'IN_LINE';
    const impact = (document.getElementById('drs-impact') || {}).value || 'IN_LINE';
    const spin = (document.getElementById('drs-spin') || {}).value || 'HIT_STUMPS';

    // Pitch strip & inline zone
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
    ctx.fillRect(60, 95, w - 120, 90);

    // Stumps on right
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(w - 65, 105, 6, 70);
    ctx.fillRect(w - 55, 105, 6, 70);
    ctx.fillRect(w - 45, 105, 6, 70);

    // Ball trajectory curve
    const pitchY = pitching === 'IN_LINE' ? 140 : (pitching === 'OUTSIDE_OFF' ? 80 : 205);
    const impY = impact === 'IN_LINE' ? 140 : (impact === 'UMPIRES_CALL' ? 100 : 70);
    const endY = spin === 'HIT_STUMPS' ? 140 : (spin === 'CLIPPING' ? 105 : 65);

    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(70, 135);
    ctx.lineTo(220, pitchY);
    ctx.lineTo(350, impY);
    ctx.lineTo(w - 55, endY);
    ctx.stroke();

    // Points
    [{ x: 220, y: pitchY, c: '#3b82f6' }, { x: 350, y: impY, c: '#f59e0b' }, { x: w - 55, y: endY, c: '#ef4444' }].forEach(pt => {
      ctx.fillStyle = pt.c;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
      ctx.fill();
    });

    const banner = document.getElementById('drs-verdict-banner');
    if (banner) {
      if (pitching === 'OUTSIDE_LEG' || impact === 'OUTSIDE_OFF' || spin === 'MISSING') {
        banner.className = 'p-3 rounded-xl text-center font-black text-sm bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
        banner.textContent = 'DECISION: NOT OUT — BALL TRACKING SHOWS MISSING / OUTSIDE LINE!';
      } else if (impact === 'UMPIRES_CALL' || spin === 'CLIPPING') {
        banner.className = 'p-3 rounded-xl text-center font-black text-sm bg-amber-500/20 text-amber-300 border border-amber-500/30';
        banner.textContent = "DECISION: UMPIRE'S CALL — TEAM RETAINS REVIEW!";
      } else {
        banner.className = 'p-3 rounded-xl text-center font-black text-sm bg-red-500/20 text-red-400 border border-red-500/30';
        banner.textContent = 'DECISION: OUT — THREE REDS! CRASHING INTO MIDDLE STUMP!';
      }
    }
  };

  // DLS Calculator
  window.calculateDls = function() {
    const r1 = parseFloat((document.getElementById('dls-t1-runs') || {}).value) || 200;
    const maxOv = parseFloat((document.getElementById('dls-max-overs') || {}).value) || 20;
    const revOv = parseFloat((document.getElementById('dls-rev-overs') || {}).value) || 14;
    const wkts = parseFloat((document.getElementById('dls-wickets') || {}).value) || 2;

    const ovRatio = Math.pow(Math.min(1, revOv / maxOv), 0.86);
    const wktPenalty = 1 + (wkts * 0.045);
    const parScore = Math.round(r1 * ovRatio * wktPenalty);
    const winTarget = parScore + 1;
    const reqRR = (winTarget / Math.max(1, revOv)).toFixed(2);

    const box = document.getElementById('dls-result-box');
    if (box) {
      box.innerHTML = `
        <div class="flex items-center justify-between"><span>DLS Par Score (${revOv} Ov):</span><span class="font-black text-amber-400">${parScore} runs</span></div>
        <div class="flex items-center justify-between"><span>Revised Winning Target:</span><span class="font-black text-emerald-400 text-sm">${winTarget} runs</span></div>
        <div class="flex items-center justify-between"><span>Required Run Rate:</span><span class="font-bold">${reqRR} RPO</span></div>
      `;
    }
  };

  // Custom Dream XI Builder
  function renderDreamXI() {
    const box = document.getElementById('dream-xi-pool');
    const countEl = document.getElementById('xi-count');
    if (countEl) countEl.textContent = state.dreamXI.length;
    if (!box) return;
    box.innerHTML = DREAM_POOL.map(name => {
      const picked = state.dreamXI.includes(name);
      return `
        <button onclick="toggleDreamPlayer('${name}')" class="px-2.5 py-1.5 rounded-lg text-xs font-bold transition border ${picked ? 'bg-[#009270] text-white border-[#009270]' : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700'}">
          ${picked ? '✓ ' : '+ '}${name}
        </button>
      `;
    }).join('');
  }

  window.toggleDreamPlayer = function(name) {
    const idx = state.dreamXI.indexOf(name);
    if (idx >= 0) {
      state.dreamXI.splice(idx, 1);
    } else {
      if (state.dreamXI.length >= 11) {
        showToast('Your World XI already has 11 players!');
        return;
      }
      state.dreamXI.push(name);
    }
    renderDreamXI();
  };

  window.copyDreamXI = function() {
    const text = `My YouCrick World XI (${state.dreamXI.length}/11): ` + state.dreamXI.join(', ');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    } catch (e) {}
    showToast('Dream XI copied to clipboard!');
  };

  // Global Search Modal
  window.openSearchModal = function() {
    const m = document.getElementById('search-modal');
    if (m) m.classList.remove('hidden');
    const inp = document.getElementById('global-search-input');
    if (inp) { inp.value = ''; inp.focus(); }
    handleGlobalSearch();
  };

  window.closeSearchModal = function() {
    const m = document.getElementById('search-modal');
    if (m) m.classList.add('hidden');
  };

  window.handleGlobalSearch = function() {
    const q = ((document.getElementById('global-search-input') || {}).value || '').toLowerCase().trim();
    const res = document.getElementById('global-search-results');
    if (!res) return;

    const matchHits = DATA.matches.filter(m =>
      !q || m.series.toLowerCase().includes(q) || m.team1.name.toLowerCase().includes(q) || m.team2.name.toLowerCase().includes(q)
    );
    const playerHits = DATA.players.filter(p =>
      !q || p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q)
    );

    res.innerHTML = [
      ...matchHits.map(m => `
        <div onclick="closeSearchModal(); selectMatch('${m.id}')" class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:border-emerald-500 border border-transparent cursor-pointer flex items-center justify-between text-xs">
          <span class="font-bold">🏏 ${m.team1.name} vs ${m.team2.name} (${m.format})</span>
          <span class="text-emerald-500 font-bold">${m.team1.score}</span>
        </div>
      `),
      ...playerHits.map(p => `
        <div onclick="closeSearchModal(); switchMainView('stats')" class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:border-emerald-500 border border-transparent cursor-pointer flex items-center justify-between text-xs">
          <span class="font-bold">👤 ${p.name} (${p.country})</span>
          <span class="text-slate-400">${p.role}</span>
        </div>
      `)
    ].join('');
  };

  // Keyboard shortcut Ctrl+K / ESC
  window.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearchModal();
    } else if (e.key === 'Escape') {
      closeSearchModal();
      closeArticleModal();
    }
  });

  // Initialize App on Load
  window.addEventListener('DOMContentLoaded', function() {
    initH2HDropdowns();
    renderTickerStrip();
    renderHomeFeatured();
    renderHomeWidgets();
    renderMatchCenter();
  });
})();
