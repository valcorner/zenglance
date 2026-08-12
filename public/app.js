/* Video Frontend Application */

(function() {
  'use strict';

  // ── State ─────────────────────────────────────────────────────────────────
  const state = {
    user: null,
    videos: [],
    playlists: [],
    collections: [],
    currentCategory: null,
    currentPlaylist: null,
    currentPage: 1,
    loading: false,
    searchQuery: ''
  };

  // ── API ────────────────────────────────────────────────────────────────────
  async function apiFetch(url, options = {}) {
    const token = localStorage.getItem('video_token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
      // /auth/me is a "check status" endpoint – 401 = "not logged in" (normal), don't redirect.
      // Only auto-redirect for other authenticated pages/actions that actually require login.
      if (res.status === 401 && !options.skipRedirectOn401) {
        window.location.href = '/login.html';
      }
      return null;
    }
    return res;
  }

  async function fetchVideos(page = 1) {
    try {
      const url = state.currentCategory
        ? `/api/content?type=${state.currentCategory}&page=${page}&limit=12`
        : `/api/content?page=${page}&limit=12`;
      const res = await apiFetch(url, { skipRedirectOn401: true });
      if (!res) return;
      const data = await res.json();
      if (page === 1) state.videos = data.data || [];
      else state.videos = [...state.videos, ...(data.data || [])];
      renderVideos();
    } catch (e) {
      console.error('Failed to load videos:', e);
      document.getElementById('main').innerHTML = `<div class="empty-state"><p>${t('status.loadFailedTitle')}</p><p>${t('status.loadFailed')}</p></div>`;
    }
  }

  async function fetchPlaylists() {
    // Playlists are per-user. No token means anonymous user → no playlists, skip API
    // to avoid triggering 401 auto-redirect to login on a public page.
    const token = localStorage.getItem('video_token');
    if (!token) {
      state.playlists = [];
      return;
    }
    try {
      const res = await apiFetch('/api/playlists', { skipRedirectOn401: true });
      if (!res) return;
      const data = await res.json();
      state.playlists = data.data || [];
    } catch (e) { console.error(e); }
  }

  // ── Logout ─────────────────────────────────────────────────────────────────
  async function logout() {
    const token = localStorage.getItem('video_token');
    if (token) {
      try { await apiFetch('/auth/logout', { method: 'POST', headers: { 'Authorization': 'Bearer ' + token } }); } catch (e) { /* ignore */ }
    }
    localStorage.removeItem('video_token');
    state.user = null;
    updateUserInfo();
    location.href = '/';
  }
  window.logout = logout;

  // ── User helpers ───────────────────────────────────────────────────────────
  async function fetchUser() {
    const res = await apiFetch('/auth/me', { skipRedirectOn401: true });
    if (!res) return;
    const data = await res.json();
    if (data.data) {
      state.user = data.data;
      updateUserInfo();
    }
  }

  function updateUserInfo() {
    const avatar = document.getElementById('userAvatar');
    const name = document.getElementById('userName');
    const userMenu = document.getElementById('userMenu');
    const loginBtn = document.getElementById('loginBtn');
    const uploadBtn = document.getElementById('uploadBtn');

    if (state.user) {
      const initials = (state.user.name || 'U').slice(0, 2).toUpperCase();
      if (avatar) avatar.textContent = initials;
      if (name) name.textContent = state.user.name;
      if (userMenu) userMenu.style.display = 'flex';
      if (loginBtn) loginBtn.style.display = 'none';
      if (uploadBtn) uploadBtn.style.display = 'inline-flex';
      const profileLink = document.getElementById('profileLink');
      if (profileLink) profileLink.href = '/profile.html?id=' + state.user.id;
      const adminLink = document.getElementById('adminLink');
      if (adminLink) adminLink.style.display = state.user.role === 'admin' ? 'flex' : 'none';
    } else {
      if (userMenu) userMenu.style.display = 'none';
      if (loginBtn) loginBtn.style.display = 'inline-flex';
      if (uploadBtn) uploadBtn.style.display = 'none';
      const profileLink = document.getElementById('profileLink');
      if (profileLink) { profileLink.style.display = 'none'; }
      const adminLink = document.getElementById('adminLink');
      if (adminLink) { adminLink.style.display = 'none'; }
    }
  }

  // ── Time helpers ───────────────────────────────────────────────────────────
  function timeAgo(iso) {
    if (!iso) return '';
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60) return t('timeAgo.justNow');
    if (diff < 3600) {
      const m = Math.floor(diff / 60);
      return t('timeAgo.minutesAgo', { n: m });
    }
    if (diff < 86400) {
      const h = Math.floor(diff / 3600);
      return t('timeAgo.hoursAgo', { n: h });
    }
    if (diff < 2592000) {
      const d = Math.floor(diff / 86400);
      return t('timeAgo.daysAgo', { n: d });
    }
    if (diff < 31536000) {
      const mo = Math.floor(diff / 2592000);
      return t('timeAgo.monthsAgo', { n: mo });
    }
    const y = Math.floor(diff / 31536000);
    return t('timeAgo.yearsAgo', { n: y });
  }

  function formatViews(n) {
    if (n >= 1000000) return t('formatViews.millions', { n: (n / 1000000).toFixed(1) });
    if (n >= 10000) return t('formatViews.thousands', { n: Math.floor(n / 1000) });
    if (n >= 1000) return t('formatViews.thousands', { n: (n / 1000).toFixed(1) });
    return String(n);
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  function renderVideos() {
    const main = document.getElementById('main');
    if (!main) return;

    const list = state.currentPlaylist ? state.currentPlaylist.videos : state.videos;

    if (!list || list.length === 0) {
      const emptyTitle = state.searchQuery ? t('status.notFound') : t('status.empty');
      const emptyHint = state.searchQuery ? t('status.searchHint') : t('status.emptyHint');
      main.innerHTML = `<div class="empty-state"><h3>${emptyTitle}</h3><p>${emptyHint}</p></div>`;
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'video-grid';

    list.forEach(item => {
      const card = document.createElement('div');
      card.className = 'video-card';
      card.dataset.id = item.id;
      card.innerHTML = `
        <div class="video-card-thumbnail" onclick="window.__openPlayer('${item.id}', '${item.contentType || ''}')">
          ${item.thumbnail ? `<img src="${item.thumbnail}" alt="${escapeHtml(item.title)}" loading="lazy">` : `<div class="video-card-placeholder"><svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="4" y="10" width="32" height="22" rx="3" stroke="currentColor" stroke-width="1.5"/><path d="M16 28l8-6-8-6v12z" fill="currentColor"/></svg></div>`}
          <div class="video-card-duration">${item.duration ? formatDuration(item.duration) : ''}</div>
          <button class="video-card-play" onclick="window.__openPlayer('${item.id}', '${item.contentType || ''}')" aria-label="Play">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
              <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <div class="video-card-info">
          <div class="video-card-title">${escapeHtml(item.title)}</div>
          <div class="video-card-meta">
            <span class="video-card-creator">${escapeHtml(item.creator?.name || t('player.unknownCreator'))}</span>
            ${item.views ? `<span>${formatViews(item.views)} ${t('player.views')}</span>` : ''}
            ${item.contentType ? `<span class="meta-tag">${t('category.' + item.contentType)}</span>` : ''}
          </div>
          <div class="video-card-desc">${escapeHtml(item.description || '')}</div>
          ${item.created_at ? `<div class="video-card-time">${timeAgo(item.created_at)}</div>` : ''}
        </div>`;
      grid.appendChild(card);
    });

    main.innerHTML = '';
    main.appendChild(grid);

    // Load more button
    if (list.length >= 12) {
      const loadMore = document.createElement('div');
      loadMore.className = 'load-more';
      loadMore.innerHTML = `<button onclick="window.__loadMore()">${t('status.loadMore')}</button>`;
      main.appendChild(loadMore);
    }
  }

  function renderCategoryList() {
    const main = document.getElementById('main');
    if (!main) return;

    const categories = [
      { code: 'short_drama', icon: '\u{1F3A5}' },
      { code: 'tv_series', icon: '\u{1F4FA}' },
      { code: 'movie', icon: '\u{1F3AC}' },
      { code: 'ugc_long_video', icon: '\u{1F3A8}' },
      { code: 'short_video', icon: '\u{1F4F1}' }
    ];

    main.innerHTML = `
      <div class="category-grid">
        ${categories.map(c => `
          <div class="category-card" onclick="window.__selectCategory('${c.code}')">
            <div class="category-card-icon">${c.icon}</div>
            <div class="category-card-name">${t('category.' + c.code)}</div>
          </div>
        `).join('')}
      </div>`;
  }

  function renderSearchResults(query) {
    state.searchQuery = query;
    state.currentPage = 1;
    state.videos = [];
    fetchVideos(1);
  }

  // ── Upload ─────────────────────────────────────────────────────────────────
  function openUploadModal() {
    if (!state.user) {
      alert(t('status.loginFirst'));
      return;
    }
    if (state.user.role === 'free') {
      alert(t('status.freeCannotUpload'));
      return;
    }
    document.getElementById('uploadModal').classList.add('show');
  }

  function closeUploadModal() {
    document.getElementById('uploadModal').classList.remove('show');
  }

  function generateSlug(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function startUpload() {
    const type = document.getElementById('uploadType').value;
    const title = document.getElementById('uploadTitle').value;
    const desc = document.getElementById('uploadDesc').value;
    const videoUrl = document.getElementById('uploadUrl').value.trim();

    if (!type) { alert(t('status.selectType')); return; }
    if (!title) { alert(t('status.titleRequired')); return; }
    if (!videoUrl) { alert(t('status.videoUrlRequired') || 'Please enter a video URL'); return; }
    if (!videoUrl.startsWith('https://cdn.valcorner.qzz.io/')) {
      alert(t('status.videoUrlInvalid') || 'URL must start with https://cdn.valcorner.qzz.io/');
      return;
    }

    // Role check
    const roleAllowed = {
      short_drama:  ['senior', 'admin'],
      tv_series:    ['senior', 'admin'],
      movie:        ['senior', 'admin'],
      ugc_long_video: ['senior', 'admin'],
      short_video:  ['senior', 'admin']
    };
    const allowed = roleAllowed[type] || ['senior', 'admin'];
    if (!allowed.includes(state.user.role)) {
      alert(t('status.permissionDenied'));
      return;
    }

    const submitBtn = document.getElementById('uploadSubmit');
    const spinner = submitBtn?.querySelector('.upload-spinner');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.querySelector('span:first-child').style.display = 'none'; }
    if (spinner) spinner.style.display = 'inline';

    const slug = generateSlug(title);

    // Single API call: submit metadata + video URL, no file upload
    apiFetch('/api/upload/request', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description: desc || undefined,
        contentType: type,
        slug,
        videoUrl
      })
    })
      .then(res => {
        if (!res) throw new Error('Submit failed');
        return res.json();
      })
      .then(() => {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.querySelector('span:first-child').style.display = 'inline'; }
        if (spinner) spinner.style.display = 'none';
        alert(t('status.uploadSuccess'));
        closeUploadModal();
        fetchVideos(1);
      })
      .catch(err => {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.querySelector('span:first-child').style.display = 'inline'; }
        if (spinner) spinner.style.display = 'none';
        alert(t('status.uploadFailed'));
        console.error(err);
      });
  }

  // ── Player ─────────────────────────────────────────────────────────────────
  function openPlayer(id, type) {
    const base = '/watch.html?id=' + encodeURIComponent(id);
    const url = type ? base + '&type=' + encodeURIComponent(type) : base;
    window.location.href = url;
  }

  // ── Helper functions ───────────────────────────────────────────────────────
  function formatDuration(seconds) {
    if (!seconds) return '';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function showCategory(category) {
    state.currentCategory = category;
    state.currentPlaylist = null;
    state.currentPage = 1;
    state.videos = [];
    document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
    const item = document.querySelector(`.sidebar-item[data-category="${category}"]`);
    if (item) item.classList.add('active');
    fetchVideos(1);
  }

  function showPlaylist(playlist) {
    state.currentPlaylist = playlist;
    state.currentCategory = null;
    state.currentPage = 1;
    state.videos = [];
    document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
    renderPlaylist(playlist);
  }

  function renderPlaylist(playlist) {
    const main = document.getElementById('main');
    if (!main) return;

    main.innerHTML = `
      <div class="playlist-header">
        <h1>${escapeHtml(playlist.name)}</h1>
        <p>${escapeHtml(playlist.description || '')}</p>
        <div class="playlist-meta">
          <span>${playlist.videos?.length || 0} ${t('player.videos')}</span>
          <span>${t('player.creator')}: ${escapeHtml(playlist.creator?.name || t('player.unknownCreator'))}</span>
        </div>
      </div>`;

    if (playlist.videos && playlist.videos.length > 0) {
      const list = document.createElement('div');
      list.className = 'playlist-list';
      playlist.videos.forEach(item => {
        const row = document.createElement('div');
        row.className = 'playlist-item';
        row.onclick = () => window.__openPlayer(item.id, item.contentType || '');
        row.innerHTML = `
          <div class="playlist-item-thumb">
            ${item.thumbnail ? `<img src="${item.thumbnail}" alt="${escapeHtml(item.title)}" loading="lazy">` : `<div class="playlist-item-placeholder"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 3l14 9-14 9V3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></div>`}
            <div class="playlist-item-duration">${formatDuration(item.duration)}</div>
          </div>
          <div class="playlist-item-info">
            <div class="playlist-item-title">${escapeHtml(item.title)}</div>
            <div class="playlist-item-desc">${escapeHtml(item.description || '')}</div>
            <div class="playlist-item-meta">
              <span>${escapeHtml(item.creator?.name || t('player.unknownCreator'))}</span>
              ${item.views ? `<span>${formatViews(item.views)} ${t('player.views')}</span>` : ''}
              ${item.duration ? `<span>${formatDuration(item.duration)}</span>` : ''}
            </div>
          </div>`;
        list.appendChild(row);
      });
      main.appendChild(list);
    } else {
      main.innerHTML += `<div class="empty-state"><p>${t('status.empty')}</p></div>`;
    }
  }

  // ── Search ─────────────────────────────────────────────────────────────────
  function handleSearch(e) {
    const query = e.target.value.trim();
    if (e.key === 'Enter' && query) {
      state.currentCategory = null;
      state.currentPlaylist = null;
      renderSearchResults(query);
    }
  }

  // ── Event listeners (synchronous — register immediately, not after API calls) ──
  function registerEventListeners() {
    // Sidebar toggle
    document.getElementById('sidebarToggle')?.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-open');
    });

    // Upload button
    document.getElementById('uploadBtn')?.addEventListener('click', openUploadModal);
    document.getElementById('uploadModalClose')?.addEventListener('click', closeUploadModal);
    document.getElementById('uploadModal')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeUploadModal();
    });
    document.getElementById('uploadSubmit')?.addEventListener('click', startUpload);

    // Search
    document.getElementById('searchInput')?.addEventListener('keyup', handleSearch);

    // Sidebar category clicks
    document.querySelectorAll('.sidebar-item[data-category]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const category = item.dataset.category;
        showCategory(category);
        document.body.classList.remove('sidebar-open');
      });
    });

    // Home click
    document.querySelector('.sidebar-item[href="/"]')?.addEventListener('click', (e) => {
      e.preventDefault();
      state.currentCategory = null;
      state.currentPlaylist = null;
      document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
      e.currentTarget.classList.add('active');
      renderCategoryList();
      document.body.classList.remove('sidebar-open');
    });

    // User dropdown
    document.querySelector('.user-menu')?.addEventListener('click', (e) => {
      const menu = e.currentTarget;
      const dropdown = menu.querySelector('.user-dropdown');
      if (dropdown) dropdown.classList.toggle('show');
    });

    // Prevent user-dropdown from closing when clicking inside it
    document.querySelector('.user-dropdown')?.addEventListener('click', (e) => e.stopPropagation());

    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.user-menu')) {
        document.querySelectorAll('.user-dropdown').forEach(d => d.classList.remove('show'));
      }
    });
  }

  // ── Initialize ─────────────────────────────────────────────────────────────
  // ── Cookie banner (bottom) ────────────────────────────────────────────────
  function showCookieBanner() {
    var banner = document.getElementById('cookieBanner');
    if (!banner) return;
    banner.classList.add('show');
    var btn = document.getElementById('cookieAgreeBtn');
    var closeBtn = document.getElementById('cookieClose');

    btn.addEventListener('click', function () {
      localStorage.setItem('video_agreedCookie', '1');
      banner.classList.remove('show');
    });

    closeBtn.addEventListener('click', function () {
      // Close button just hides temporarily; banner will re-appear next visit
      banner.classList.remove('show');
    });

    // Translate banner elements after a tick so i18n init has run
    setTimeout(function () {
      if (window.i18n && window.i18n.applyTranslations) window.i18n.applyTranslations();
    }, 0);
  }

  function checkCookieBanner() {
    if (localStorage.getItem('video_agreedCookie')) return;
    // Cookie banner appears for everyone (anonymous too) – not dependent on login
    showCookieBanner();
  }

  async function init() {
    // Register all event listeners immediately on DOM ready
    registerEventListeners();
    // Show login button immediately (fetchUser is async, update it when it returns)
    updateUserInfo();
    // Start API calls in background
    await Promise.all([fetchUser(), fetchPlaylists()]);
    checkCookieBanner();
    renderCategoryList();
    // Re-render main content when language changes
    if (typeof window.i18n === 'object' && window.i18n.onLangChange) {
      window.i18n.onLangChange(() => {
        if (state.currentPlaylist) renderPlaylist(state.currentPlaylist);
        else if (state.videos.length) renderVideos();
        else renderCategoryList();
      });
    }
  }

  // ── Expose global functions ────────────────────────────────────────────────
  window.__openPlayer = openPlayer;
  window.__loadMore = () => fetchVideos(state.currentPage + 1);
  window.__selectCategory = showCategory;

  document.addEventListener('DOMContentLoaded', init);
})();
