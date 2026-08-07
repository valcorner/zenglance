// ZenGlance Frontend Application

// ── State ────────────────────────────────────────────────────────────────────
let currentUser = null;
let selectedFile = null;
let sidebarOpen = false;
let currentCategory = '全部';
let allVideos = [];
let searchDebounce = null;

// ── DOM refs ─────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const menuToggle     = $('menuToggle');
const sidebar        = $('sidebar');
const mainContent    = $('mainContent');
const uploadBtn      = $('uploadBtn');
const uploadModal    = $('uploadModal');
const closeUploadModal = $('closeUploadModal');
const uploadForm     = $('uploadForm');
const dropZone       = $('dropZone');
const fileInput      = $('fileInput');
const fileInfo       = $('fileInfo');
const fileName       = $('fileName');
const fileSize       = $('fileSize');
const progressBar    = $('progressBar');
const progressFill   = $('progressFill');
const statusMessage  = $('statusMessage');
const submitBtn      = $('submitBtn');
const userAvatar     = $('userAvatar');
const userDropdown   = $('userDropdown');
const dropdownHeader = $('dropdownHeader');
const dropdownName   = $('dropdownName');
const dropdownEmail  = $('dropdownEmail');
const dropdownRole   = $('dropdownRole');
const dropdownLogin  = $('dropdownLogin');
const dropdownLogout = $('dropdownLogout');
const videoGrid      = $('videoGrid');
const categoryBar    = $('categoryBar');
const searchInput    = $('searchInput');
const searchInputMobile = $('searchInputMobile');
const searchBtn      = $('searchBtn');
const themeToggle    = $('themeToggle');
const playerModal    = $('playerModal');
const playerContainer = $('playerContainer');

// ── Session helpers ──────────────────────────────────────────────────────────
const SESSION_KEY = 'zenglance_session';

function getSessionId()     { return localStorage.getItem(SESSION_KEY); }
function setSessionId(id)   { id ? localStorage.setItem(SESSION_KEY, id) : localStorage.removeItem(SESSION_KEY); }
function authHeaders()      { const id = getSessionId(); return id ? { Authorization: `Bearer ${id}` } : {}; }

function consumeSessionFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('session_id');
    if (id) {
        setSessionId(id);
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

// ── Theme ────────────────────────────────────────────────────────────────────
function initTheme() {
    const saved = localStorage.getItem('zenglance_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
}
function toggleTheme() {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('zenglance_theme', next);
}

// ── Category map ─────────────────────────────────────────────────────────────
const typeMap = {
    '全部': null,
    '短片短剧': 'short_drama',
    '剧集': 'tv_series',
    '电影': 'movie',
    'UGC 视频': 'ugc_long_video',
    '短视频': 'short_video',
    '音乐': 'music',
    '播客': 'podcast',
    '小说': 'novel'
};
const typeNameMap = {
    short_drama: '短片短剧', tv_series: '剧集', movie: '电影',
    ugc_long_video: 'UGC', short_video: '短视频', music: '音乐',
    podcast: '播客', novel: '小说'
};

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    consumeSessionFromUrl();
    bindEvents();
    loadCurrentUser();
    loadVideos();
});

function bindEvents() {
    // Sidebar toggle
    menuToggle.addEventListener('click', toggleSidebar);

    // Click outside sidebar / dropdown
    document.addEventListener('click', (e) => {
        if (sidebarOpen && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) toggleSidebar();
        if (userDropdown.classList.contains('show') && !e.target.closest('.user-menu')) userDropdown.classList.remove('show');
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllModals(); });

    // User avatar dropdown
    userAvatar.addEventListener('click', (e) => { e.stopPropagation(); userDropdown.classList.toggle('show'); });

    // Login / logout
    dropdownLogin.addEventListener('click', () => { window.location.href = '/auth/login'; });
    dropdownLogout.addEventListener('click', handleLogout);

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Upload modal
    uploadBtn.addEventListener('click', openUploadModal);
    closeUploadModal.addEventListener('click', closeUploadModalHandler);
    uploadModal.addEventListener('click', (e) => { if (e.target === uploadModal) closeUploadModalHandler(); });

    // File upload
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('dragover'); if (e.dataTransfer.files.length) { fileInput.files = e.dataTransfer.files; handleFileSelect(); } });

    // Form submit
    uploadForm.addEventListener('submit', handleSubmit);

    // Category pills (both bar and sidebar)
    categoryBar.addEventListener('click', (e) => {
        const pill = e.target.closest('.category-pill');
        if (!pill) return;
        const cat = pill.dataset.type;
        setActiveCategory(cat);
        loadVideos(cat);
        // Sync sidebar
        document.querySelectorAll('.sidebar-item').forEach(si => si.classList.toggle('active', si.dataset.category === cat));
    });
    sidebar.addEventListener('click', (e) => {
        const item = e.target.closest('.sidebar-item');
        if (!item) return;
        const cat = item.dataset.category;
        setActiveCategory(cat);
        loadVideos(cat);
        // Sync pills
        document.querySelectorAll('.category-pill').forEach(p => p.classList.toggle('active', p.dataset.type === cat));
        if (window.innerWidth < 769) toggleSidebar();
    });

    // Search
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') performSearch(); });
    searchInputMobile.addEventListener('keydown', (e) => { if (e.key === 'Enter') performSearchMobile(); });
    searchInput.addEventListener('input', () => { clearTimeout(searchDebounce); searchDebounce = setTimeout(performSearch, 400); });
    searchInputMobile.addEventListener('input', () => { clearTimeout(searchDebounce); searchDebounce = setTimeout(performSearchMobile, 400); });

    // Player modal close
    playerModal.addEventListener('click', (e) => { if (e.target === playerModal) closePlayerModal(); });
}

function setActiveCategory(cat) { currentCategory = cat; }

function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
    sidebar.classList.toggle('open', sidebarOpen);
    mainContent.classList.toggle('sidebar-open', sidebarOpen);
}

function closeAllModals() {
    uploadModal.classList.remove('active');
    playerModal.classList.remove('active');
    if (playerContainer.querySelector('video, audio, iframe')) {
        playerContainer.innerHTML = '';
    }
}

// ── Auth ─────────────────────────────────────────────────────────────────────
async function loadCurrentUser() {
    const sessionId = getSessionId();
    if (!sessionId) { updateUIForUser(null); return; }
    try {
        const res = await fetch('/auth/me', { headers: { ...authHeaders(), Accept: 'application/json' } });
        if (res.ok) { currentUser = await res.json(); updateUIForUser(currentUser); }
        else if (res.status === 401) { setSessionId(null); updateUIForUser(null); }
    } catch { updateUIForUser(null); }
}

async function handleLogout() {
    const sessionId = getSessionId();
    if (sessionId) {
        try { await fetch('/auth/logout', { method: 'POST', headers: { ...authHeaders() } }); } catch {}
    }
    setSessionId(null);
    currentUser = null;
    updateUIForUser(null);
    userDropdown.classList.remove('show');
    loadVideos();
}

function updateUIForUser(user) {
    if (user) {
        const initial = (user.name || 'U').charAt(0).toUpperCase();
        userAvatar.textContent = initial;
        userAvatar.title = `${user.name} (${user.role})`;
        userAvatar.style.background = user.avatar
            ? 'transparent' : '';
        if (user.avatar) userAvatar.innerHTML = `<img src="${user.avatar}" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
        else userAvatar.textContent = initial;

        // Dropdown
        dropdownHeader.style.display = 'block';
        dropdownName.textContent = user.name;
        dropdownEmail.textContent = user.email;
        dropdownRole.textContent = user.role.toUpperCase();
        dropdownRole.className = 'dropdown-role ' + user.role;
        dropdownLogin.style.display = 'none';
        dropdownLogout.style.display = 'flex';

        // Upload button
        if (user.role === 'free') {
            uploadBtn.disabled = true;
            uploadBtn.title = '免费用户无法上传';
        } else {
            uploadBtn.disabled = false;
            uploadBtn.title = '上传内容';
        }
    } else {
        userAvatar.textContent = 'U';
        userAvatar.style.background = '';
        userAvatar.innerHTML = '';
        userAvatar.title = '未登录';
        dropdownHeader.style.display = 'none';
        dropdownLogin.style.display = 'flex';
        dropdownLogout.style.display = 'none';
        uploadBtn.disabled = false;
        uploadBtn.title = '登录后可上传';
    }
}

// ── Videos ───────────────────────────────────────────────────────────────────
async function loadVideos(category = '全部') {
    showSkeletons();
    try {
        let url = '/api/content';
        const type = typeMap[category];
        if (type) url += `?type=${encodeURIComponent(type)}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        allVideos = await res.json();
        renderVideos(allVideos);
    } catch (error) {
        console.error('Error loading videos:', error);
        showErrorState('加载失败，请刷新重试');
    }
}

function renderVideos(videos) {
    const query = getSearchQuery().toLowerCase();
    const filtered = query
        ? videos.filter(v => v.title?.toLowerCase().includes(query) || v.uploader?.name?.toLowerCase().includes(query))
        : videos;

    if (!filtered.length) {
        videoGrid.innerHTML = query
            ? `<div class="empty-state">
                <svg viewBox="0 0 24 24" width="80" height="80"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                <h3>未找到相关内容</h3><p>试试其他关键词或分类</p></div>`
            : `<div class="empty-state">
                <svg viewBox="0 0 24 24" width="80" height="80"><path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/></svg>
                <h3>暂无内容</h3><p>成为第一个上传者吧</p></div>`;
        return;
    }

    videoGrid.innerHTML = filtered.map(video => {
        const duration  = formatDuration(video.duration);
        const views     = video.views || 0;
        const uploadDate= video.createdAt ? timeAgo(video.createdAt) : '';
        const uploader  = video.uploader || {};
        const initials  = (uploader.name || 'U').charAt(0).toUpperCase();
        const typeLabel = typeNameMap[video.contentType] || '';

        return `
        <div class="video-card" data-id="${video.id}">
            <div class="thumbnail-container">
                <div class="thumbnail">${typeLabel ? `<span class="type-badge">${typeLabel}</span>` : ''}</div>
                ${video.isPremium ? '<span class="premium-badge">PREMIUM</span>' : ''}
                ${video.isEncrypted ? '<span class="encrypted-badge">🔒 加密</span>' : ''}
                ${duration !== '0:00' ? `<span class="duration-badge">${duration}</span>` : ''}
            </div>
            <div class="video-info">
                <div class="channel-avatar">${uploader.avatar
                    ? `<img src="${escapeHtml(uploader.avatar)}" alt="">`
                    : initials}</div>
                <div class="video-details">
                    <h3 class="video-title">${escapeHtml(video.title)}</h3>
                    <p class="channel-name">${escapeHtml(uploader.name || '未知创作者')}</p>
                    <p class="video-meta">${formatViews(views)} 次观看${uploadDate ? ` · ${uploadDate}` : ''}</p>
                </div>
            </div>
        </div>`;
    }).join('');

    videoGrid.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => openPlayerModal(card.dataset.id));
    });
}

function getSearchQuery() {
    return (searchInput.value || searchInputMobile.value || '').trim();
}
function performSearch()  { renderFiltered(); }
function performSearchMobile() {
    searchInput.value = searchInputMobile.value;
    renderFiltered();
}
function renderFiltered() {
    const query = getSearchQuery().toLowerCase();
    const filtered = query
        ? allVideos.filter(v => v.title?.toLowerCase().includes(query) || v.uploader?.name?.toLowerCase().includes(query))
        : allVideos;
    renderVideoList(filtered);
}
function renderVideoList(videos) {
    if (!videos.length) {
        videoGrid.innerHTML = `<div class="empty-state"><h3>未找到相关内容</h3><p>试试其他关键词或分类</p></div>`;
        return;
    }
    videoGrid.innerHTML = videos.map(video => {
        const duration  = formatDuration(video.duration);
        const views     = video.views || 0;
        const uploadDate= video.createdAt ? timeAgo(video.createdAt) : '';
        const uploader  = video.uploader || {};
        const initials  = (uploader.name || 'U').charAt(0).toUpperCase();
        const typeLabel = typeNameMap[video.contentType] || '';
        return `
        <div class="video-card" data-id="${video.id}">
            <div class="thumbnail-container">
                <div class="thumbnail">${typeLabel ? `<span class="type-badge">${typeLabel}</span>` : ''}</div>
                ${video.isPremium ? '<span class="premium-badge">PREMIUM</span>' : ''}
                ${video.isEncrypted ? '<span class="encrypted-badge">🔒 加密</span>' : ''}
                ${duration !== '0:00' ? `<span class="duration-badge">${duration}</span>` : ''}
            </div>
            <div class="video-info">
                <div class="channel-avatar">${uploader.avatar ? `<img src="${escapeHtml(uploader.avatar)}" alt="">` : initials}</div>
                <div class="video-details">
                    <h3 class="video-title">${escapeHtml(video.title)}</h3>
                    <p class="channel-name">${escapeHtml(uploader.name || '未知创作者')}</p>
                    <p class="video-meta">${formatViews(views)} 次观看${uploadDate ? ` · ${uploadDate}` : ''}</p>
                </div>
            </div>
        </div>`;
    }).join('');
    videoGrid.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => openPlayerModal(card.dataset.id));
    });
}

function showSkeletons() {
    videoGrid.innerHTML = Array.from({ length: 8 }, (_, i) => `
        <div class="skeleton-card">
            <div class="skeleton skeleton-thumb"></div>
            <div style="display:flex;gap:12px;padding:12px 4px;">
                <div class="skeleton skeleton-avatar"></div>
                <div style="flex:1;">
                    <div class="skeleton skeleton-line w-75"></div>
                    <div class="skeleton skeleton-line w-50"></div>
                    <div class="skeleton skeleton-line w-30" style="margin-top:8px;"></div>
                </div>
            </div>
        </div>`).join('');
}

function showErrorState(msg) {
    videoGrid.innerHTML = `<div class="error-state"><svg viewBox="0 0 24 24" width="48" height="48"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg><h3>出错了</h3><p>${escapeHtml(msg)}</p></div>`;
}

// ── Player ───────────────────────────────────────────────────────────────────
async function openPlayerModal(contentId) {
    playerModal.classList.add('active');
    playerContainer.innerHTML = '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#aaa;">加载中...</div>';

    try {
        const res = await fetch(`/api/content/${encodeURIComponent(contentId)}`);
        if (!res.ok) throw new Error('Content not found');
        const item = await res.json();
        renderPlayer(item);
    } catch (error) {
        playerContainer.innerHTML = `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#aaa;flex-direction:column;gap:12px;">
            <svg viewBox="0 0 24 24" width="48" height="48"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            <span>加载失败</span></div>`;
    }
}

function renderPlayer(item) {
    // Player
    const isVideo = item.contentType?.startsWith('video') || ['short_drama','tv_series','movie','ugc_long_video','short_video'].includes(item.contentType);
    const isAudio = item.contentType === 'music' || item.contentType === 'podcast';
    const isDoc   = ['novel'].includes(item.contentType);

    let playerHTML = '';
    if (isVideo) {
        playerHTML = `<video controls autoplay style="position:absolute;inset:0;width:100%;height:100%;background:#000;">
            <source src="${escapeHtml(item.cdn?.playUrl || '')}" type="${escapeHtml(item.mimeType || 'video/mp4')}">
            您的浏览器不支持视频播放
        </video>`;
    } else if (isAudio) {
        playerHTML = `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1a1a2e,#16213e);flex-direction:column;gap:24px;">
            <div style="font-size:80px;">🎵</div>
            <audio controls autoplay style="width:80%;max-width:500px;">
                <source src="${escapeHtml(item.cdn?.playUrl || '')}" type="${escapeHtml(item.mimeType || 'audio/mpeg')}">
            </audio>
        </div>`;
    } else if (isDoc) {
        playerHTML = `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#f5f5f5;flex-direction:column;gap:16px;">
            <div style="font-size:80px;">📄</div>
            <a href="${escapeHtml(item.cdn?.playUrl || '')}" download style="padding:12px 24px;background:#065fd4;color:white;border-radius:8px;text-decoration:none;font-weight:500;">下载文件</a>
        </div>`;
    } else {
        playerHTML = `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#f5f5f5;"><span style="color:#999;">暂无预览</span></div>`;
    }
    playerContainer.innerHTML = playerHTML;

    // Info
    $('playerTitle').textContent  = item.title || '未知标题';
    $('playerViews').textContent  = `${(item.views || 0).toLocaleString()} 次观看`;
    $('playerDate').textContent   = item.createdAt ? new Date(item.createdAt).toLocaleDateString('zh-CN') : '';
    $('playerTypeBadge').textContent = typeNameMap[item.contentType] || item.contentType || '';
    $('playerDesc').textContent   = item.description || '';
    $('playerPremiumBadge').style.display = item.isPremium ? 'inline' : 'none';
    $('playerEncryptedBadge').style.display = item.isEncrypted ? 'inline' : 'none';

    const uploader = item.uploader || {};
    const initials = (uploader.name || 'U').charAt(0).toUpperCase();
    const avatarEl = $('playerAvatar');
    if (uploader.avatar) {
        avatarEl.innerHTML = `<img src="${escapeHtml(uploader.avatar)}" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    } else {
        avatarEl.textContent = initials;
    }
    $('playerUploaderName').textContent  = uploader.name || '未知创作者';
    $('playerUploaderRole').textContent  = uploader.role ? uploader.role.toUpperCase() : '';
}

function closePlayerModal() {
    playerModal.classList.remove('active');
    playerContainer.innerHTML = '';
}

// ── Upload ───────────────────────────────────────────────────────────────────
function openUploadModal() {
    if (!currentUser) { showStatus('请先登录', 'error'); return; }
    if (currentUser.role === 'free') { showStatus('免费用户无法上传内容', 'error'); return; }
    uploadModal.classList.add('active');
}

function closeUploadModalHandler() {
    uploadModal.classList.remove('active');
    resetForm();
}

function handleFileSelect() {
    const file = fileInput.files[0];
    if (!file) return;
    selectedFile = file;
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    fileInfo.style.display = 'flex';
}

async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedFile) { showStatus('请选择文件', 'error'); return; }

    const contentType = $('contentType').value;
    const title       = $('contentTitle').value.trim();
    const description = $('contentDescription').value.trim();

    const allowedTypes = getAllowedContentTypes(currentUser?.role);
    if (!allowedTypes.includes(contentType)) { showStatus('您的角色无法上传此类型的内容', 'error'); return; }

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = '上传中...';
        progressBar.style.display = 'block';

        const uploadSession = await requestUploadUrl({ contentType, title, description, slug: slugify(title), fileSize: selectedFile.size, mimeType: selectedFile.type || 'application/octet-stream' });
        await uploadToB2(selectedFile, uploadSession.uploadUrl, uploadSession.uploadAuth);
        await completeUpload(uploadSession.sessionId);

        showStatus('上传成功！', 'success');
        setTimeout(() => { closeUploadModalHandler(); loadVideos(currentCategory); }, 1500);
    } catch (error) {
        console.error('Upload error:', error);
        showStatus(error.message || '上传失败，请重试', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '开始上传';
        progressBar.style.display = 'none';
        progressFill.style.width = '0%';
    }
}

async function requestUploadUrl(data) {
    const res = await fetch('/api/upload/request', { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: JSON.stringify(data) });
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || err.details || '获取上传地址失败'); }
    return res.json();
}

function uploadToB2(file, uploadUrl, uploadAuth) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) progressFill.style.width = `${(e.loaded / e.total) * 100}%`;
        });
        xhr.addEventListener('load', () => xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`上传失败 (HTTP ${xhr.status})`)));
        xhr.addEventListener('error', () => reject(new Error('网络错误，请重试')));
        xhr.open('PUT', uploadUrl);
        xhr.setRequestHeader('Authorization', `Bearer ${uploadAuth}`);
        xhr.send(file);
    });
}

async function completeUpload(sessionId) {
    const res = await fetch(`/api/upload/complete/${encodeURIComponent(sessionId)}`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() } });
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || err.details || '完成上传失败'); }
    return res.json();
}

function resetForm() {
    uploadForm.reset(); selectedFile = null;
    fileInfo.style.display = 'none';
    progressBar.style.display = 'none';
    progressFill.style.width = '0%';
    statusMessage.innerHTML = '';
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function showStatus(message, type) {
    statusMessage.innerHTML = `<div class="status-message ${type}">${escapeHtml(message)}</div>`;
    setTimeout(() => { statusMessage.innerHTML = ''; }, 5000);
}

function formatFileSize(bytes) {
    if (!bytes) return '0 B';
    const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function formatDuration(seconds) {
    if (!seconds || typeof seconds !== 'number' || seconds <= 0) return '';
    const total = Math.floor(seconds);
    const h = Math.floor(total / 3600), m = Math.floor((total % 3600) / 60), s = total % 60;
    const pad = n => String(n).padStart(2, '0');
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

function formatViews(n) {
    if (!n) return '0';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 10000)   return (n / 10000).toFixed(1) + '万';
    if (n >= 1000)    return (n / 1000).toFixed(1) + 'K';
    return String(n);
}

function timeAgo(ts) {
    const diff = Date.now() - new Date(ts).getTime();
    const sec  = Math.floor(diff / 1000);
    if (sec < 60)   return '刚刚';
    if (sec < 3600) return `${Math.floor(sec / 60)} 分钟前`;
    if (sec < 86400) return `${Math.floor(sec / 3600)} 小时前`;
    if (sec < 2592000) return `${Math.floor(sec / 86400)} 天前`;
    if (sec < 31536000) return `${Math.floor(sec / 2592000)} 个月前`;
    return `${Math.floor(sec / 31536000)} 年前`;
}

function slugify(text) {
    return String(text || '').toLowerCase().trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
        || `content-${Date.now()}`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getAllowedContentTypes(role) {
    const map = {
        official: ['short_drama','tv_series','movie','ugc_long_video','short_video','music','podcast','novel'],
        premium:  ['ugc_long_video','short_video','music','podcast','novel'],
        free:     []
    };
    return map[role] || [];
}
