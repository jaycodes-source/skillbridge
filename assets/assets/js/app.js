/* =========================================
   SKILLBRIDGE
   Main JavaScript
========================================= */

"use strict";

/* ===== 1. MOBILE NAVIGATION ===== */

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  if (menuToggle && navigation) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close the menu after selecting a navigation link.
    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
      });
    });

    // Close the menu when clicking outside it.
    document.addEventListener("click", function (event) {
      const clickedInsideMenu = navigation.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
      }
    });

    // Close the mobile menu when returning to desktop width.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
      }
    });
  }

  /* ===== 2. ACTIVE NAVIGATION LINK ===== */

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".navigation a").forEach(function (link) {
    const linkPage = link.getAttribute("href");

    if (!linkPage) return;

    const normalizedLink = linkPage.split("/").pop().split("?")[0];

    if (normalizedLink === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  /* ===== 3. CURRENT YEAR IN FOOTER ===== */

  const yearElements = document.querySelectorAll("[data-current-year]");

  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  /* ===== 4. BASIC SEARCH FORM SUPPORT ===== */

  const searchForms = document.querySelectorAll("[data-search-form]");

  searchForms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const input = form.querySelector("input");
      const query = input ? input.value.trim() : "";

      if (!query) {
        if (input) {
          input.focus();
        }

        return;
      }

      // Send the search term to a page that can process it.
      const target = form.getAttribute("data-search-target");

      if (target) {
        window.location.href =
          target + "?q=" + encodeURIComponent(query);
      } else {
        console.info("SkillBridge search term:", query);
      }
    });
  });

  /* ===== 5. BUTTON FEEDBACK ===== */

  document.querySelectorAll("[data-action]").forEach(function (button) {
    button.addEventListener("click", function () {
      const action = button.getAttribute("data-action");

      if (action === "back-to-top") {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    });
  });

  /* ===== 6. PREVENT EMPTY PLACEHOLDER LINKS ===== */

  document.querySelectorAll('a[href="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });

  console.log("SkillBridge JavaScript loaded successfully.");
});