class PhotoWall {
    constructor() {
        this.initElements();
        this.initEvents();
        this.loadPhoto();
    }

    initElements() {
        this.$photo = document.getElementById('dailyPhoto');
        this.$source = document.getElementById('sourceSelector');
        this.$refreshBtn = document.getElementById('refreshBtn');
        this.$loader = document.querySelector('.loader');
        this.$title = document.getElementById('photoTitle');
        this.$author = document.getElementById('photoAuthor');
    }

    initEvents() {
        this.$refreshBtn.addEventListener('click', () => this.loadPhoto());
        this.$source.addEventListener('change', () => this.loadPhoto());
    }

    async loadPhoto() {
        try {
            this.toggleLoading(true);
            const source = this.$source.value;
            const photoData = await this.fetchPhoto(source);
            this.updateUI(photoData);
        } catch (error) {
            console.error('加载失败:', error);
        } finally {
            this.toggleLoading(false);
        }
    }

    async fetchPhoto(source) {
        const config = API_CONFIG[source];
        const url = new URL(config.endpoint);

        // 添加查询参数
        if(config.params) {
            Object.entries(config.params).forEach(([key, value]) => {
                url.searchParams.set(key, value);
            });
        }

        const response = await fetch(url, {
            headers: config.headers || {}
        });

        if (!response.ok) throw new Error('API请求失败');

        const data = await response.json();
        return this.parseResponse(source, data);
    }

    parseResponse(source, data) {
        // 不同平台的响应结构处理
        const parsers = {
            unsplash: () => ({
                url: data.urls.full,
                title: data.description || '未命名作品',
                author: data.user.name
            }),
            pexels: () => ({
                url: data.photos[0].src.original,
                title: data.photos[0].alt,
                author: data.photos[0].photographer
            }),
            openverse: () => ({
                url: data.results[0].url,
                title: data.results[0].title,
                author: data.results[0].creator
            })
        };
        return parsers[source]();
    }

    updateUI({ url, title, author }) {
        this.$photo.style.opacity = 0;
        setTimeout(() => {
            this.$photo.src = url;
            this.$title.textContent = title;
            this.$author.textContent = `作者：${author}`;
            this.$photo.style.opacity = 1;
        }, 300);
    }

    toggleLoading(show) {
        this.$loader.style.display = show ? 'block' : 'none';
    }
}

// 初始化
window.addEventListener('DOMContentLoaded', () => new PhotoWall());