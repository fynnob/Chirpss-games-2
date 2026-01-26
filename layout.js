/**
 * layout.js - 2026 Edition
 * Modern Colors + Classic Layout Support
 */

window.tailwind = window.tailwind || {};
window.tailwind.config = {
    theme: {
        extend: {
            colors: {
                'deep-twilight': '#0f172a',
                'card-bg': '#1e293b',
                'warm-dusk': '#F97316',
                'fiery-core': '#F59E0B',
                'soft-horizon': '#F1F5F9',
                'subtle-gray': '#94A3B8',
            },
            animation: {
                'blob': 'blob 7s infinite',
                'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    }
};

class ChirpssHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-md bg-deep-twilight/80 border-b border-white/10">
            <div class="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                <a href="https://gc.fynn.qzz.io/En/" class="flex items-center gap-2 group">
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-warm-dusk to-fiery-core flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                        C
                    </div>
                    <span class="text-xl font-bold tracking-tight text-white group-hover:text-fiery-core transition-colors">CHIRPSS</span>
                </a>
                
                <button onclick="window.location.href='https://gc.fynn.qzz.io/En/Join/'" 
                    class="px-5 py-2 bg-gradient-to-r from-warm-dusk to-fiery-core text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/20 active:scale-95 transition-all text-sm flex items-center gap-2">
                    <span>Join Room</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </header>
        <div class="h-16"></div> 
        `;
    }
}

class ChirpssFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="border-t border-white/10 mt-20 bg-deep-twilight/50 backdrop-blur-sm">
            <div class="max-w-7xl mx-auto px-6 py-12 text-center">
                <div class="mb-8">
                     <select onchange="changeLanguage(this)" class="bg-card-bg text-subtle-gray text-sm border border-white/10 rounded-lg py-2 px-4 hover:border-warm-dusk/50 outline-none cursor-pointer transition-colors text-center font-medium">
                        <option value="en" selected>English 🇬🇧</option>
                        <option value="de">Deutsch 🇩🇪</option>
                    </select>
                </div>
                <div class="flex justify-center flex-wrap gap-8 text-sm text-subtle-gray mb-8 font-medium">
                    <a href="https://gc.fynn.qzz.io/En/Impressum" class="hover:text-warm-dusk transition-colors">Impressum</a>
                    <a href="https://gc.fynn.qzz.io/En/privacy" class="hover:text-warm-dusk transition-colors">Privacy</a>
                    <a href="https://gc.fynn.qzz.io/En/cookies" class="hover:text-warm-dusk transition-colors">Cookies</a>
                </div>
                <p class="text-xs text-subtle-gray/40 font-mono">© 2026 CHIRPSS. NO DOWNLOADS. NO ADS.</p>
            </div>
        </footer>
        `;
    }
}

customElements.define('chirpss-header', ChirpssHeader);
customElements.define('chirpss-footer', ChirpssFooter);

window.changeLanguage = function(selectObject) {
    const lang = selectObject.value;
    localStorage.setItem('preferredLanguage', lang);
    if (lang.toLowerCase() === 'de') window.location.href = 'https://gc.fynn.qzz.io/De/';
};
