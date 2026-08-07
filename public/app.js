// ZenGlance Frontend Application

// State
let currentUser = null;
let selectedFile = null;
let sidebarOpen = false;

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const uploadBtn = document.getElementById('uploadBtn');
const uploadModal = document.getElementById('uploadModal');
const closeUploadModal = document.getElementById('closeUploadModal');
const uploadForm = document.getElementById('uploadForm');
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const statusMessage = document.getElementById('statusMessage');
const submitBtn = document.getElementById('submitBtn');
const userAvatar = document.getElementById('userAvatar');
const videoGrid = document.getElementById('videoGrid');
const categoryPills = document.querySelectorAll('.category-pill');

// --- Auth token helpers -----------------------------------------------------

const TOKEN_KEY = 'zenglance_jwt';

function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function setAuthToken(token) {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
    } else {
        localStorage.removeItem(TOKEN_KEY);
    }
}

function authHeaders() {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

// 处理 OAuth 回调带来的 ?token=...
function consumeTokenFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
        setAuthToken(token);
        // 清理 URL，避免 token 残留在地址栏/历史
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    consumeTokenFromUrl();
    initEventListeners();
    loadCurrentUser();
    loadVideos();
});

// Event Listeners
function initEventListeners() {
    // Sidebar toggle
    menuToggle.addEventListener('click', toggleSidebar);

    // Upload modal
    uploadBtn.addEventListener('click', openUploadModal);
    closeUploadModal.addEventListener('click', closeUploadModalHandler);
    uploadModal.addEventListener('click', (e) => {
        if (e.target === uploadModal) {
            closeUploadModalHandler();
        }
    });

    // File upload
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);

    // Drag and drop
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);

    // Form submit
    uploadForm.addEventListener('submit', handleSubmit);

    // Category pills
    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            categoryPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            loadVideos(pill.textContent);
        });
    });
}

// Sidebar
function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
    sidebar.classList.toggle('open', sidebarOpen);
    mainContent.classList.toggle('sidebar-open', sidebarOpen);
}

// Upload Modal
function openUploadModal() {
    if (!currentUser) {
        showStatus('请先登录', 'error');
        return;
    }

    if (currentUser.role === 'free') {
        showStatus('免费用户无法上传内容', 'error');
        return;
    }

    uploadModal.classList.add('active');
}

function closeUploadModalHandler() {
    uploadModal.classList.remove('active');
    resetForm();
}

// File handling
function handleDragOver(e) {
    e.preventDefault();
    dropZone.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    dropZone.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    dropZone.classList.remove('dragover');

    if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        handleFileSelect();
    }
}

function handleFileSelect() {
    const file = fileInput.files[0];
    if (!file) return;

    selectedFile = file;
    fileInfo.style.display = 'block';
    fileInfo.textContent = `${file.name} (${formatFileSize(file.size)})`;
}

// Form submission
async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedFile) {
        showStatus('请选择文件', 'error');
        return;
    }

    const contentType = document.getElementById('contentType').value;
    const title = document.getElementById('contentTitle').value;
    const description = document.getElementById('contentDescription').value;

    // Validate content type based on role
    const allowedTypes = getAllowedContentTypes(currentUser.role);
    if (!allowedTypes.includes(contentType)) {
        showStatus('您的角色无法上传此类型的内容', 'error');
        return;
    }

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = '上传中...';

        // Step 1: Request upload URL
        const uploadSession = await requestUploadUrl({
            contentType,
            title,
            description,
            slug: slugify(title),
            fileSize: selectedFile.size,
            duration: undefined, // 由客户端播放器后续探测，未探测时留空
            mimeType: selectedFile.type || 'application/octet-stream'
        });

        // Step 2: Upload to B2 (PUT directly with the presigned URL)
        await uploadToB2(selectedFile, uploadSession.uploadUrl);

        // Step 3: Complete upload
        await completeUpload(uploadSession.sessionId);

        showStatus('上传成功！', 'success');

        setTimeout(() => {
            closeUploadModalHandler();
            loadVideos();
        }, 1500);

    } catch (error) {
        console.error('Upload error:', error);
        showStatus(error.message || '上传失败，请重试', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '开始上传';
    }
}

// API calls
async function loadCurrentUser() {
    const token = getAuthToken();
    if (!token) {
        updateUIForUser(null);
        return;
    }

    try {
        const response = await fetch('/auth/me', {
            headers: {
                ...authHeaders(),
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            currentUser = await response.json();
            updateUIForUser(currentUser);
        } else if (response.status === 401) {
            // token 失效，清理本地
            setAuthToken(null);
            updateUIForUser(null);
        }
    } catch (error) {
        console.log('Not logged in:', error);
    }
}

async function loadVideos(category = '全部') {
    try {
        let url = '/api/content';
        if (category !== '全部') {
            const typeMap = {
                '短片短剧': 'short_drama',
                '剧集': 'tv_series',
                '电影': 'movie',
                'UGC 视频': 'ugc_long_video',
                '短视频': 'short_video',
                '音乐': 'music',
                '播客': 'podcast',
                '小说': 'novel'
            };
            const type = typeMap[category];
            if (type) {
                url += `?type=${encodeURIComponent(type)}`;
            }
        }

        const response = await fetch(url);
        if (response.ok) {
            const videos = await response.json();
            renderVideos(videos);
        }
    } catch (error) {
        console.error('Error loading videos:', error);
    }
}

async function requestUploadUrl(data) {
    const response = await fetch('/api/upload/request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders()
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || err.details || '获取上传地址失败');
    }

    return response.json();
}

function uploadToB2(file, uploadUrl) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percent = (e.loaded / e.total) * 100;
                progressBar.style.display = 'block';
                progressFill.style.width = percent + '%';
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve();
            } else {
                reject(new Error(`文件上传失败 (HTTP ${xhr.status})`));
            }
        });

        xhr.addEventListener('error', () => {
            reject(new Error('网络错误，请重试'));
        });

        // Presigned PUT：Content-Type 在签名时已固定，这里只放文件本体
        xhr.open('PUT', uploadUrl);
        xhr.send(file);
    });
}

async function completeUpload(sessionId) {
    const response = await fetch(`/api/upload/complete/${encodeURIComponent(sessionId)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders()
        }
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || err.details || '完成上传失败');
    }

    return response.json();
}

// UI helpers
function updateUIForUser(user) {
    if (user) {
        const initial = (user.username || user.name || 'U').charAt(0).toUpperCase();
        userAvatar.textContent = initial;
        userAvatar.title = `${user.username || user.name} (${user.role})`;

        if (user.role === 'free') {
            uploadBtn.disabled = true;
            uploadBtn.title = '免费用户无法上传';
        } else {
            uploadBtn.disabled = false;
            uploadBtn.title = '';
        }
    } else {
        userAvatar.textContent = 'U';
        userAvatar.title = '未登录';
        uploadBtn.disabled = false;
    }
}

function renderVideos(videos) {
    if (!videos || videos.length === 0) {
        videoGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #606060; padding: 40px;">暂无内容</p>';
        return;
    }

    videoGrid.innerHTML = videos.map(video => {
        const duration = formatDuration(video.duration);
        const views = video.views || 0;
        const uploadDate = video.createdAt ? new Date(video.createdAt).toLocaleDateString() : '未知';
        const uploaderName = video.uploader?.name || 'Unknown';

        return `
            <div class="video-card">
                <div class="thumbnail-container">
                    <div class="thumbnail"></div>
                    ${video.isPremium ? '<span class="premium-badge">PREMIUM</span>' : ''}
                    ${video.isEncrypted ? '<span class="encrypted-badge">🔒 加密</span>' : ''}
                    <span class="duration-badge">${duration}</span>
                </div>
                <div class="video-info">
                    <div class="channel-avatar"></div>
                    <div class="video-details">
                        <h3 class="video-title">${escapeHtml(video.title)}</h3>
                        <p class="channel-name">${escapeHtml(uploaderName)}</p>
                        <p class="video-meta">${views.toLocaleString()} 次观看 · ${uploadDate}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function showStatus(message, type) {
    statusMessage.innerHTML = `<div class="status-message ${type}">${escapeHtml(message)}</div>`;

    setTimeout(() => {
        statusMessage.innerHTML = '';
    }, 5000);
}

function resetForm() {
    uploadForm.reset();
    selectedFile = null;
    fileInfo.style.display = 'none';
    fileInfo.textContent = '';
    progressBar.style.display = 'none';
    progressFill.style.width = '0%';
    statusMessage.innerHTML = '';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 把秒数格式化成 m:ss 或 h:mm:ss
function formatDuration(seconds) {
    if (!seconds || typeof seconds !== 'number' || seconds <= 0) return '0:00';
    const total = Math.floor(seconds);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

// 生成 kebab-case slug（与后端 zod 正则 /^[a-z0-9]+(?:-[a-z0-9]+)*$/ 匹配）
function slugify(text) {
    return String(text || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // 移除非 a-z0-9 / 空格 / -
        .replace(/[\s_-]+/g, '-')      // 分隔符合并为单个 -
        .replace(/^-+|-+$/g, '')       // 去首尾 -
        || `content-${Date.now()}`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getAllowedContentTypes(role) {
    const typeMap = {
        official: ['short_drama', 'tv_series', 'movie', 'ugc_long_video', 'short_video', 'music', 'podcast', 'novel'],
        premium: ['ugc_long_video', 'short_video', 'music', 'podcast', 'novel'],
        free: []
    };
    return typeMap[role] || [];
}
