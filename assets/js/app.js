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

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("nav-open");

        menuToggle.classList.toggle("active");

        menuToggle.textContent =
            nav.classList.contains("nav-open") ? "✕" : "☰";

    });

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("nav-open");

            menuToggle.classList.remove("active");

            menuToggle.textContent = "☰";

        });

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

});