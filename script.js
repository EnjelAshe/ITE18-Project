document.addEventListener('DOMContentLoaded', function() {
    // === Gallery & Pixel Art Modal ===
    document.querySelectorAll('.gallery-img, .pixel-art-img').forEach(img => {
        img.onclick = function() {
            const modal = document.getElementById('modal');
            const modalImg = document.getElementById('modal-img');
            modal.style.display = 'flex';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modalImg.classList.remove('horizontal', 'vertical');
            if (this.classList.contains('horizontal')) {
                modalImg.classList.add('horizontal');
            } else if (this.classList.contains('vertical')) {
                modalImg.classList.add('vertical');
            }
        };
    });
    document.querySelector('.modal-close').onclick = function() {
        document.getElementById('modal').style.display = 'none';
    };
    document.getElementById('modal').onclick = function(e) {
        if (e.target === this) this.style.display = 'none';
    };

    // === Dark/Light Mode Toggle ===
    const toggleBtn = document.getElementById('mode-toggle'); // Button in your HTML
    const body = document.body;

    // Apply mode and optionally save preference
    function setMode(mode, save = true) {
        if (mode === 'light') {
            body.classList.add('light-mode');
            toggleBtn.textContent = '☀️ Light Mode';
            toggleBtn.setAttribute('aria-pressed', 'true');
        } else {
            body.classList.remove('light-mode');
            toggleBtn.textContent = '🌙 Dark Mode';
            toggleBtn.setAttribute('aria-pressed', 'false');
        }
        if (save) localStorage.setItem('theme', mode);
    }

    // --- Initialization ---
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
        setMode(savedMode, false);
    } else {
        // Follow system preference if no saved mode
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        setMode(prefersLight ? 'light' : 'dark', false);
    }

    // --- Toggle Button Click ---
    toggleBtn.addEventListener('click', () => {
        const isLight = body.classList.contains('light-mode');
        setMode(isLight ? 'dark' : 'light');
    });

    // --- Update on System Preference Change (if user hasn’t chosen explicitly) ---
    if (!savedMode && window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
            setMode(e.matches ? 'light' : 'dark', false);
        });
    }
});
