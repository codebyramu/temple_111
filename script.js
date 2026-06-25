/* ─────────────────────────────────────────────
   script.js — Aggressive GSAP ScrollTrigger
   Bhaskararajapuram — activetheory level
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger, Draggable);

    const mob = () => window.innerWidth <= 768;

    /* ══════════════════════════════
       1. LOADER
    ══════════════════════════════ */
    const loader = document.getElementById('loader');
    const bar    = document.getElementById('l-bar');
    const lp     = [
        document.getElementById('lp1'),
        document.getElementById('lp2'),
        document.getElementById('lp3'),
    ];

    // Title lines animate in immediately
    gsap.to(['.lt-1','.lt-2','.lt-3'], {
        y: 0, opacity: 1, duration: 1.1,
        ease: 'expo.out', stagger: .12, delay: .2
    });

    requestAnimationFrame(() => bar.classList.add('go'));

    const showPhrase = (el, d) => {
        setTimeout(() => el.classList.add('on'),  d);
        setTimeout(() => el.classList.remove('on'), d + 1400);
    };
    showPhrase(lp[0], 400);
    showPhrase(lp[1], 2000);
    showPhrase(lp[2], 3600);

    const LOAD_T = 5500;
    setTimeout(() => {
        loader.classList.add('done');
        document.body.classList.remove('is-loading');
        setTimeout(() => { loader.style.display = 'none'; }, 1400);
        animHero();
    }, LOAD_T);


    /* ══════════════════════════════
       2. CURSOR — ZERO LAG
    ══════════════════════════════ */
    const dot  = document.getElementById('c-dot');
    const ring = document.getElementById('c-ring');
    let mX = window.innerWidth/2, mY = window.innerHeight/2;
    let rX = mX, rY = mY;

    if (!mob()) {
        window.addEventListener('mousemove', e => {
            mX = e.clientX; mY = e.clientY;
            dot.style.transform = `translate(calc(${mX}px - 50%), calc(${mY}px - 50%))`;
        }, { passive: true });

        const ringLoop = () => {
            rX += (mX - rX) * 0.24;
            rY += (mY - rY) * 0.24;
            ring.style.transform = `translate(calc(${rX}px - 50%), calc(${rY}px - 50%))`;
            requestAnimationFrame(ringLoop);
        };
        ringLoop();

        // Cursor hover states
        document.querySelectorAll('a, button, .temple-card, .story-img-frame, .ss-img-frame').forEach(el => {
            el.addEventListener('mouseenter', () => {
                dot.classList.add('is-hover');
                ring.classList.add('is-hover');
                const t = el.dataset.cursor || '';
                ring.querySelector('.c-ring-text').textContent = t;
            });
            el.addEventListener('mouseleave', () => {
                dot.classList.remove('is-hover');
                ring.classList.remove('is-hover');
            });
        });
    } else {
        dot.style.display = 'none';
        ring.style.display = 'none';
    }


    /* ══════════════════════════════
       3. PORTAL BG
    ══════════════════════════════ */
    let pX = window.innerWidth/2, pY = window.innerHeight/2;
    let ptX = pX, ptY = pY;

    window.addEventListener('mousemove', e => { ptX=e.clientX; ptY=e.clientY; }, { passive:true });
    window.addEventListener('touchmove', e => {
        if(e.touches.length){ ptX=e.touches[0].clientX; ptY=e.touches[0].clientY; }
    }, { passive:true });

    const portalLoop = () => {
        pX += (ptX-pX)*0.08;
        pY += (ptY-pY)*0.08;
        const t = Date.now();
        const r = 80 + Math.sin(t/800)*10 + Math.sin(t/1700)*7 + Math.sin(t/400)*4;
        document.documentElement.style.setProperty('--cx', pX+'px');
        document.documentElement.style.setProperty('--cy', pY+'px');
        document.documentElement.style.setProperty('--cr',  r+'px');
        requestAnimationFrame(portalLoop);
    };
    portalLoop();


    /* ══════════════════════════════
       4. NAV
    ══════════════════════════════ */
    const nav = document.getElementById('nav');
    ScrollTrigger.create({
        trigger: '#hero', start: 'bottom 80%',
        onEnter:     () => nav.classList.add('solid'),
        onLeaveBack: () => nav.classList.remove('solid'),
    });

    const burger  = document.getElementById('burger');
    const mobMenu = document.getElementById('mob-menu');
    const mmClose = document.getElementById('mm-close');
    const openMenu  = () => { mobMenu.classList.add('open'); burger.classList.add('open'); document.body.style.overflow='hidden'; };
    const closeMenu = () => { mobMenu.classList.remove('open'); burger.classList.remove('open'); document.body.style.overflow=''; };
    burger?.addEventListener('click',  () => mobMenu.classList.contains('open') ? closeMenu() : openMenu());
    mmClose?.addEventListener('click', closeMenu);
    mobMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));


    /* ══════════════════════════════
       4.5 TEXT SPLITTING UTILS
    ══════════════════════════════ */
    function splitWords(selector) {
        document.querySelectorAll(selector).forEach(el => {
            const words = el.innerText.trim().split(/\s+/);
            el.innerHTML = '';
            words.forEach(w => {
                const span = document.createElement('span');
                span.style.display = 'inline-block';
                span.style.marginRight = '0.25em';
                span.innerText = w;
                el.appendChild(span);
            });
        });
    }
    // Pre-split text blocks for animations
    splitWords('.hero-sub');
    splitWords('.gq-text');
    splitWords('.fs-body');

    /* ══════════════════════════════
       5. HERO ANIMATION
    ══════════════════════════════ */
    function animHero() {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        tl.fromTo('.hero-tag',     { opacity:0, y:12, scale:.9 }, { opacity:1, y:0, scale:1, duration:.8, stagger:.1 })
          .fromTo('.hbt-word',     { yPercent:110 },               { yPercent:0, duration:1.3, stagger:.08 }, '-=.5')
          .fromTo('.hero-sub span',{ opacity:0, y:12, rotateX:-20 }, { opacity:1, y:0, rotateX:0, duration:.8, stagger:.04, ease:'back.out(1.5)' }, '-=.7')
          .fromTo('.hero-scroll-hint', { opacity:0 },              { opacity:1, duration:.8 }, '-=.3');
    }


    /* ══════════════════════════════
       6. HERO PARALLAX
    ══════════════════════════════ */
    gsap.to('#hero-video', {
        yPercent:22, ease:'none',
        scrollTrigger:{ trigger:'#hero', start:'top top', end:'bottom top', scrub:true }
    });
    gsap.to('#hero .hero-content', {
        opacity:0, y:-80, ease:'none',
        scrollTrigger:{ trigger:'#hero', start:'center center', end:'bottom top', scrub:1.2 }
    });


    /* ══════════════════════════════
       7. STATEMENT PIN — words light up on scroll
    ══════════════════════════════ */
    const words = document.querySelectorAll('.stmt-word');
    const dash  = document.querySelector('.stmt-dash');

    // Pin the statement section and light up words one by one
    ScrollTrigger.create({
        trigger: '#statement-pin',
        start: 'top top',
        end: 'bottom bottom',
        pin: '#statement-inner',
        scrub: false,
        onUpdate: self => {
            const p = self.progress;
            // Light words at intervals
            words.forEach((w, i) => {
                const threshold = (i + 1) / (words.length + 1);
                if (p >= threshold) w.classList.add('lit');
                else w.classList.remove('lit');
            });
            if (p >= 0.85) dash.classList.add('lit');
            else dash.classList.remove('lit');
        }
    });


    /* ══════════════════════════════
       8. VILLAGE CHAPTER
    ══════════════════════════════ */
    // Image clip-path reveal
    gsap.to('#vil-img .chi-clip', {
        clipPath: 'inset(0 0% 0 0 round 24px)',
        ease: 'expo.out',
        duration: 1.6,
        scrollTrigger: { trigger: '#vil-img', start: 'top 75%', toggleActions: 'play none none reverse' }
    });
    // Image Ken Burns on scroll
    gsap.fromTo('#vil-img .chi-inner', { scale:1.08 }, { scale:1, ease:'none',
        scrollTrigger: { trigger:'#village', start:'top bottom', end:'bottom top', scrub:1.5 }
    });

    // Scrolly big words — yellow box fill reveal
    gsap.to('.sr1 .sr-big', {
        backgroundPosition: '0% 0%', ease: 'none',
        scrollTrigger: { trigger: '.sr1', start: 'top 85%', end: 'top 45%', scrub: 1 }
    });
    gsap.to('.sr2 .sr-big', {
        backgroundPosition: '0% 0%', ease: 'none',
        scrollTrigger: { trigger: '.sr2', start: 'top 85%', end: 'top 45%', scrub: 1 }
    });
    gsap.to('.sr3 .sr-big', {
        backgroundPosition: '0% 0%', ease: 'none',
        scrollTrigger: { trigger: '.sr3', start: 'top 85%', end: 'top 45%', scrub: 1 }
    });

    // Facts split
    gsap.fromTo('.fs-left', { opacity:0, x:-40 }, { opacity:1, x:0, duration:1.1, ease:'expo.out',
        scrollTrigger:{ trigger:'.facts-split', start:'top 75%', toggleActions:'play none none reverse' }
    });
    gsap.fromTo('.fs-right > *', { opacity:0, y:30 }, { opacity:1, y:0, stagger:.12, duration:.9, ease:'power3.out',
        scrollTrigger:{ trigger:'.facts-split', start:'top 70%', toggleActions:'play none none reverse' }
    });


    /* ══════════════════════════════
       9. STATS COUNTER
    ══════════════════════════════ */
    document.querySelectorAll('.counter').forEach(el => {
        const target = parseInt(el.closest('[data-count]').dataset.count);
        gsap.fromTo(el, { innerText: 0 }, {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: { trigger: '.s-stats', start: 'top 80%', toggleActions: 'play none none reset' }
        });
    });

    gsap.fromTo('.stat-item', { opacity:0, y:40 }, {
        opacity:1, y:0, stagger:.15, duration:1, ease:'expo.out',
        scrollTrigger:{ trigger:'.s-stats', start:'top 80%', toggleActions:'play none none reverse' }
    });


    /* ══════════════════════════════
       10. SAINT SECTION
    ══════════════════════════════ */
    // Image tilt effect
    const saintFrame = document.getElementById('saint-frame');
    const saintImg   = document.getElementById('saint-img');
    const bulge      = saintFrame?.querySelector('.img-bulge');

    if (saintFrame && !mob()) {
        let sRX=0, sRY=0, sTX=0, sTY=0;

        saintFrame.addEventListener('mousemove', e => {
            const r  = saintFrame.getBoundingClientRect();
            const fx = (e.clientX - r.left) / r.width  - .5;
            const fy = (e.clientY - r.top)  / r.height - .5;
            sTX = fx * 12; sTY = -fy * 10;
            if (bulge) { bulge.style.setProperty('--bx', ((fx+.5)*100)+'%'); bulge.style.setProperty('--by', ((fy+.5)*100)+'%'); }
            const dist = Math.sqrt(fx*fx + fy*fy);
            gsap.to(saintImg, { x:fx*-10, y:fy*-10, scale:1.04 + (.5-dist)*.04, duration:.6, ease:'power2.out' });
        });
        saintFrame.addEventListener('mouseleave', () => {
            sTX=0; sTY=0;
            gsap.to(saintImg, { x:0, y:0, scale:1, duration:.8, ease:'power3.out' });
        });

        const tiltLoop = () => {
            sRX += (sTX - sRX)*.1;
            sRY += (sTY - sRY)*.1;
            gsap.set(saintFrame, { rotateY:sRX, rotateX:sRY, transformPerspective:900 });
            requestAnimationFrame(tiltLoop);
        };
        tiltLoop();
    }

    // Saint text reveal
    gsap.fromTo('.ss-eyebrow', { opacity:0, y:10 }, { opacity:1, y:0, duration:.8,
        scrollTrigger:{ trigger:'.saint-split', start:'top 75%', toggleActions:'play none none reverse' }
    });
    gsap.fromTo('.ss-name, .ss-role', { opacity:0, y:30 }, { opacity:1, y:0, stagger:.15, duration:1.1, ease:'expo.out',
        scrollTrigger:{ trigger:'.saint-split', start:'top 70%', toggleActions:'play none none reverse' }
    });
    gsap.fromTo('.ssf-item', { opacity:0, x:30 }, { opacity:1, x:0, stagger:.12, duration:.9, ease:'power3.out',
        scrollTrigger:{ trigger:'.saint-split', start:'top 60%', toggleActions:'play none none reverse' }
    });

    // Giant quote
    gsap.fromTo('.gq-text', { opacity:0, y:60, scale:.96 }, { opacity:1, y:0, scale:1, duration:1.4, ease:'expo.out',
        scrollTrigger:{ trigger:'.giant-quote', start:'top 75%', toggleActions:'play none none reverse' }
    });
    // Counter-rotate the quote marks for drama
    gsap.fromTo('.gq-mark', { opacity:0, rotation:20, scale:.8 }, { opacity:1, rotation:0, scale:1, duration:1.2, ease:'expo.out',
        scrollTrigger:{ trigger:'.giant-quote', start:'top 75%', toggleActions:'play none none reverse' }
    });


    /* ══════════════════════════════
       11. TEMPLES — clip-path + horizontal drag
    ══════════════════════════════ */
    // Temple header clip reveal
    gsap.to('.th-clip', {
        clipPath: 'inset(0 0% 0 0 round 24px)', duration:1.6, ease:'expo.out',
        scrollTrigger:{ trigger:'.temple-header', start:'top 78%', toggleActions:'play none none reverse' }
    });
    gsap.fromTo('.th-inner', { scale:1.08 }, { scale:1, ease:'none',
        scrollTrigger:{ trigger:'.temple-header', start:'top bottom', end:'bottom top', scrub:1.5 }
    });
    gsap.fromTo('.th-text > *', { opacity:0, y:24 }, { opacity:1, y:0, stagger:.15, duration:1, ease:'expo.out',
        scrollTrigger:{ trigger:'.temple-header', start:'top 70%', toggleActions:'play none none reverse' }
    });

    // Temple cards stagger reveal
    gsap.fromTo('.temple-card', { opacity:0, y:50, scale:.97 }, {
        opacity:1, y:0, scale:1, stagger:.12, duration:1, ease:'expo.out',
        scrollTrigger:{ trigger:'.temples-track', start:'top 80%', toggleActions:'play none none reverse' }
    });

    // Horizontal pinned scroll for temples
    const trackOuter = document.getElementById('temples-track-outer');
    const track = document.getElementById('temples-track');
    if (trackOuter && track) {
        let getScrollAmount = () => -(track.scrollWidth - trackOuter.clientWidth);
        gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: trackOuter,
                start: "center center",
                end: () => `+=${track.scrollWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true
            }
        });
    }


    /* ══════════════════════════════
       12. RIVERS
    ══════════════════════════════ */
    // Rivers full clip reveal
    gsap.to('.rf-clip', {
        clipPath: 'inset(0 0% 0 0 round 24px)', duration:1.8, ease:'expo.out',
        scrollTrigger:{ trigger:'.rivers-full', start:'top 78%', toggleActions:'play none none reverse' }
    });
    gsap.fromTo('#river-img-inner', { scale:1.1 }, { scale:1, ease:'none',
        scrollTrigger:{ trigger:'.rivers-full', start:'top bottom', end:'bottom top', scrub:2 }
    });
    gsap.fromTo('.rf-title', { opacity:0, y:40 }, { opacity:1, y:0, duration:1.3, ease:'expo.out',
        scrollTrigger:{ trigger:'.rivers-full', start:'top 65%', toggleActions:'play none none reverse' }
    });

    // Rivers detail rows
    document.querySelectorAll('.rd-row').forEach((row, i) => {
        gsap.to(row, {
            opacity:1, x:0, duration:1, ease:'expo.out',
            scrollTrigger:{ trigger:row, start:'top 80%', toggleActions:'play none none reverse' }
        });
    });

    // River close statement
    gsap.fromTo('.rc-text', { opacity:0, y:50, scale:.95 }, { opacity:1, y:0, scale:1, duration:1.4, ease:'expo.out',
        scrollTrigger:{ trigger:'.river-close', start:'top 80%', toggleActions:'play none none reverse' }
    });


    /* ══════════════════════════════
       13. HORIZONTAL SCROLL (temples) — optional scrub
    ══════════════════════════════ */
    // Already using Draggable, skip


    /* ══════════════════════════════
       14. SECTION DARK TINT on s-chapter-dark
    ══════════════════════════════ */
    // (handled by CSS background)


    /* ══════════════════════════════
       15. SECTION PARALLAX TILT (text col)
    ══════════════════════════════ */
    if (!mob()) {
        document.querySelectorAll('.ss-text-col, .story-text-col').forEach(col => {
            let tX=0, tY=0, cX=0, cY=0;
            window.addEventListener('mousemove', e => {
                const rect = col.getBoundingClientRect();
                if(rect.top > window.innerHeight || rect.bottom < 0) return;
                const fx = (e.clientX - (rect.left + rect.width/2))  / (rect.width/2);
                const fy = (e.clientY - (rect.top  + rect.height/2)) / (rect.height/2);
                tX = fy * -2.5; tY = fx * 3;
            }, { passive:true });
            const loop = () => {
                cX += (tX - cX)*.06; cY += (tY - cY)*.06;
                gsap.set(col, { rotateX:cX, rotateY:cY, transformPerspective:1200 });
                requestAnimationFrame(loop);
            };
            loop();
        });
    }

    /* ══════════════════════════════
       16. PREMIUM TEXT REVEALS (Light Mode)
    ══════════════════════════════ */
    // Giant Quote
    gsap.from('.gq-text span', {
        opacity:0, y:15, rotateX:-30,
        stagger:.03, duration:1, ease:'back.out(1.5)',
        scrollTrigger:{ trigger:'.giant-quote', start:'top 75%', toggleActions:'play none none reverse' }
    });

    // Facts body
    gsap.from('.fs-body span', {
        opacity:0, y:10,
        stagger:.01, duration:.8, ease:'power2.out',
        scrollTrigger:{ trigger:'.fs-body', start:'top 85%', toggleActions:'play none none reverse' }
    });

    // Clip-path Wipes for Headings
    gsap.utils.toArray('.fs-title, .ss-name, .th-title, .rf-title').forEach(el => {
        gsap.fromTo(el, { clipPath:'inset(0 100% 0 0)', x:-20, opacity:0 }, {
            clipPath:'inset(0 0% 0 0)', x:0, opacity:1,
            duration:1.2, ease:'expo.out',
            scrollTrigger:{ trigger:el, start:'top 85%', toggleActions:'play none none reverse' }
        });
    });

}); // end DOMContentLoaded
