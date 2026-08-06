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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
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
    const isPremium = document.getElementById('isPremium').value === 'true';

    // Validate content type based on role
    const allowedTypes = getAllowedContentTypes(currentUser.role);
    if (!allowedTypes.includes(contentType)) {
        showStatus('您的角色无法上传此类型的内容', 'error');
        return;
    }

    // Check if premium content requires official role
    if (isPremium && currentUser.role !== 'official') {
        showStatus('只有官方用户可以上传 Premium 内容', 'error');
        return;
    }

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = '上传中...';

        // Step 1: Request upload URL
        const uploadSession = await requestUploadUrl({
            content_type: contentType,
            title,
            description,
            is_premium: isPremium,
            file_name: selectedFile.name,
            file_size: selectedFile.size,
            file_type: selectedFile.type
        });

        // Step 2: Upload to B2
        await uploadToB2(selectedFile, uploadSession.upload_url, uploadSession.headers);

        // Step 3: Complete upload
        await completeUpload(uploadSession.session_id);

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
    try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
            currentUser = await response.json();
            updateUIForUser(currentUser);
        }
    } catch (error) {
        console.log('Not logged in');
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
                url += `?type=${type}`;
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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '获取上传地址失败');
    }

    return response.json();
}

async function uploadToB2(file, uploadUrl, headers) {
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
                reject(new Error('文件上传失败'));
            }
        });

        xhr.addEventListener('error', () => {
            reject(new Error('网络错误，请重试'));
        });

        xhr.open('PUT', uploadUrl);
        Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key]);
        });
        xhr.send(file);
    });
}

async function completeUpload(sessionId) {
    const response = await fetch('/api/upload/complete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ session_id: sessionId })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '完成上传失败');
    }

    return response.json();
}

// UI helpers
function updateUIForUser(user) {
    if (user) {
        userAvatar.textContent = user.username.charAt(0).toUpperCase();
        userAvatar.title = `${user.username} (${user.role})`;
        
        if (user.role === 'free') {
            uploadBtn.disabled = true;
            uploadBtn.title = '免费用户无法上传';
        }
    } else {
        userAvatar.textContent = 'U';
        userAvatar.title = '未登录';
    }
}

function renderVideos(videos) {
    if (!videos || videos.length === 0) {
        videoGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #606060; padding: 40px;">暂无内容</p>';
        return;
    }

    videoGrid.innerHTML = videos.map(video => {
        const typeLabels = {
            short_drama: '短片短剧',
            tv_series: '剧集',
            movie: '电影',
            ugc_long_video: 'UGC 长视频',
            short_video: '短视频',
            music: '音乐',
            podcast: '播客',
            novel: '小说'
        };

        const duration = video.duration || '0:00';
        const views = video.views || 0;
        const uploadDate = video.created_at ? new Date(video.created_at).toLocaleDateString() : '未知';

        return `
            <div class="video-card">
                <div class="thumbnail-container">
                    <div class="thumbnail"></div>
                    ${video.is_premium ? '<span class="premium-badge">PREMIUM</span>' : ''}
                    ${video.is_encrypted ? '<span class="encrypted-badge">🔒 加密</span>' : ''}
                    <span class="duration-badge">${duration}</span>
                </div>
                <div class="video-info">
                    <div class="channel-avatar"></div>
                    <div class="video-details">
                        <h3 class="video-title">${escapeHtml(video.title)}</h3>
                        <p class="channel-name">${escapeHtml(video.uploader_name || 'Unknown')}</p>
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
