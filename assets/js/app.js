/* ===========================================================
   Ammar Sharhan Portfolio
   app.js
=========================================================== */

/* ==========================================
   Global Elements
========================================== */

const header = document.querySelector(".header");
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("section[id]");
const reveals = document.querySelectorAll(".reveal");

/* ==========================================
   Header Scroll
========================================== */

function initHeaderScroll() {

    if (!header) return;

    window.addEventListener("scroll", () => {

        header.classList.toggle("scrolled", window.scrollY > 20);

    });

}

/* ==========================================
   Mobile Navigation
========================================== */

function initMobileMenu() {

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".nav a");

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener("click", (event) => {

        event.stopPropagation();

        const isOpen = nav.classList.toggle("nav-open");

        document.body.classList.toggle("menu-open", isOpen);

        menuToggle.classList.toggle("active");

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("nav-open");

            document.body.classList.remove("menu-open");

            menuToggle.classList.remove("active");

            menuToggle.textContent = "☰";

        });

    });

    document.addEventListener("click", (event) => {

        const clickedInsideMenu =
            nav.contains(event.target) ||
            menuToggle.contains(event.target);

        if (!clickedInsideMenu && nav.classList.contains("nav-open")) {

            nav.classList.remove("nav-open");

            document.body.classList.remove("menu-open");

            menuToggle.classList.remove("active");

            menuToggle.textContent = "☰";

        }

    });

}

/* ==========================================
   Active Navigation
========================================== */

function initActiveNavigation() {

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + current
            );

        });

    });

}

/* ==========================================
   Scroll Reveal
========================================== */

function initReveal() {

    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });

    reveals.forEach(item => observer.observe(item));

}

/* ==========================================
   Initialize
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initHeaderScroll();

    initMobileMenu();

    initActiveNavigation();

    initReveal();

    initBackToTop();

    initScrollProgress();

    initLoader();

    initCursorGlow();

    initTheme();

    initImages();

    initCounters();

});
/* ==========================================
   Back To Top
========================================== */

function initBackToTop() {

    const backToTop = document.getElementById("backToTop");

    const footer = document.querySelector(".footer");

    if (!backToTop) return;

    window.addEventListener("scroll", () => {

        const scrollPosition =
            window.scrollY + window.innerHeight;

        const documentHeight =
            document.documentElement.scrollHeight;

        const footerVisible =
            footer &&
            footer.getBoundingClientRect().top <
            window.innerHeight;

        if (
            window.scrollY > 500 &&
            !footerVisible
        ) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ==========================================
   Scroll Progress
========================================== */

function initScrollProgress(){

    const progress=document.querySelector(".scroll-progress");

    if(!progress) return;

    window.addEventListener("scroll",()=>{

        const scrollTop=window.scrollY;

        const docHeight=

            document.documentElement.scrollHeight-

            window.innerHeight;

        const width=(scrollTop/docHeight)*100;

        progress.style.width=width+"%";

    });

}

/* ==========================================
   Loading Screen
========================================== */

function initLoader(){

    const loader=document.querySelector(".loader");

    if(!loader) return;

    document.body.classList.remove("page-loaded");

    window.addEventListener("load",()=>{

        setTimeout(()=>{

            loader.classList.add("hide");

            document.body.classList.add("page-loaded");

        },500);

    });

}

/* ==========================================
   Cursor Glow
========================================== */

function initCursorGlow(){

    const glow=document.querySelector(".cursor-glow");

    if(!glow) return;

    document.addEventListener("mousemove",(e)=>{

        glow.style.opacity=".9";

        glow.style.left=e.clientX+"px";

        glow.style.top=e.clientY+"px";

    });

    document.addEventListener("mouseleave",()=>{

        glow.style.opacity="0";

    });

}

/* ==========================================
   Theme Toggle
========================================== */

function initTheme(){

    const btn=document.getElementById("themeToggle");

    if(!btn) return;

    const savedTheme=localStorage.getItem("theme");

    if(savedTheme==="dark"){

        document.body.classList.add("dark-mode");

        btn.textContent="☀️";

    }

    btn.addEventListener("click",()=>{

        document.body.classList.toggle("dark-mode");

        const dark=document.body.classList.contains("dark-mode");

        btn.textContent=dark ? "☀️" : "🌙";

        localStorage.setItem(

            "theme",

            dark ? "dark" : "light"

        );

    });

}

/* ==========================================
   Image Lazy Fade
========================================== */

function initImages(){

    const images=document.querySelectorAll("img");

    images.forEach(img=>{

        if(img.complete){

            img.classList.add("loaded");

        }else{

            img.addEventListener("load",()=>{

                img.classList.add("loaded");

            });

        }

    });

}

/* ==========================================
   Animated Counters
========================================== */

function initCounters(){

    const counters =
        document.querySelectorAll(".stat-number");

    if(!counters.length) return;

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if(!entry.isIntersecting) return;

                const counter = entry.target;

                const target =
                    Number(counter.dataset.target);

                if(!Number.isFinite(target)) return;

                const duration = 2800;

                const startTime = performance.now();

                function updateCounter(currentTime){

                    const progress =
                        Math.min(
                            (currentTime - startTime) / duration,
                            1
                        );

                    const eased =
                        1 - Math.pow(1 - progress, 3);

                    counter.textContent =
                        Math.round(target * eased);

                    if(progress < 1){

                        requestAnimationFrame(updateCounter);

                    }

                }

                requestAnimationFrame(updateCounter);

                observer.unobserve(counter);

            });

        },
        {
            threshold:0.6
        }
    );

    counters.forEach(counter =>
        observer.observe(counter)
    );

}