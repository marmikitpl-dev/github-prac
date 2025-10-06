// ...existing code...

// DOM helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// Button interaction
const clickBtn = $('#clickMeBtn');
const msg = $('#message');
if (clickBtn) {
	clickBtn.addEventListener('click', () => {
		msg.textContent = 'Nice! You clicked the button.';
		msg.classList.add('highlighted');
		setTimeout(() => msg.classList.remove('highlighted'), 1400);
	});
}

// Theme toggle
const themeToggle = $('#themeToggle');
const root = document.documentElement;
function setTheme(isLight){
	if(isLight){
		document.body.classList.add('light');
		themeToggle.textContent = '🌞';
	} else {
		document.body.classList.remove('light');
		themeToggle.textContent = '🌙';
	}
	try{ localStorage.setItem('prefers-light', isLight ? '1' : '0') }catch(e){}
}
const saved = (localStorage.getItem('prefers-light') === '1');
setTheme(saved || window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches);
if(themeToggle){
	themeToggle.addEventListener('click', ()=> setTheme(!document.body.classList.contains('light')));
}

// Mobile menu
const menuToggle = $('#menuToggle');
const mainNav = $('#mainNav');
if(menuToggle && mainNav){
	menuToggle.addEventListener('click', ()=>{
		mainNav.style.display = mainNav.style.display === 'flex' ? '' : 'flex';
		mainNav.style.flexDirection = 'column';
		mainNav.style.gap = '12px';
		mainNav.style.padding = '12px';
		mainNav.style.background = 'var(--card)';
		mainNav.style.position = 'absolute';
		mainNav.style.right = '20px';
		mainNav.style.top = '64px';
		mainNav.style.boxShadow = '0 6px 24px rgba(2,6,23,0.6)';
	});
	// close on link click
	$$('#mainNav a').forEach(a=>a.addEventListener('click',()=>{ mainNav.style.display = '' }))
}

// Footer year
const yearEl = $('#year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

// small animation class for message
const style = document.createElement('style');
style.textContent = `
	.highlighted{animation: pop 1s ease}
	@keyframes pop{0%{transform:translateY(6px);opacity:0}50%{transform:none;opacity:1}100%{transform:none;opacity:1}}
`;
document.head.appendChild(style);
