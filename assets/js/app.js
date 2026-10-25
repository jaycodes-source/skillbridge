/* =========================================
   SKILLBRIDGE — WEBSITE INTERACTIONS
   File: assets/js/app.js
========================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* =====================================
     1. MOBILE NAVIGATION
  ===================================== */

  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  if (menuToggle && navigation) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });

    document.addEventListener("click", function (event) {
      if (
        !navigation.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      }
    });
  }

  /* =====================================
     2. INTERACTIVE SKILL PATHWAYS
  ===================================== */

  const skillButtons = document.querySelectorAll("[data-skill]");
  const skillDetails = document.getElementById("skillDetails");

  const skillContent = {
    coding: {
      title: "💻 Web Development",
      description:
        "Learn how websites are created, from your first HTML page to interactive websites with JavaScript.",
      steps: [
        "Step 1: Understand HTML structure.",
        "Step 2: Style pages with CSS.",
        "Step 3: Add interactions with JavaScript.",
        "Step 4: Build and publish a personal portfolio."
      ]
    },

    design: {
      title: "🎨 Graphic Design",
      description:
        "Learn how to communicate ideas through layouts, colors, typography, logos, and digital graphics.",
      steps: [
        "Step 1: Learn basic design principles.",
        "Step 2: Practise typography and color combinations.",
        "Step 3: Create posters and social media designs.",
        "Step 4: Build a portfolio of your designs."
      ]
    },

    ai: {
      title: "🤖 Artificial Intelligence",
      description:
        "Explore AI tools, responsible AI use, prompt writing, and ways to solve real-world problems.",
      steps: [
        "Step 1: Understand what AI can and cannot do.",
        "Step 2: Practise writing clear prompts.",
        "Step 3: Evaluate AI-generated information.",
        "Step 4: Create a small project using AI tools."
      ]
    },

    business: {
      title: "💼 Entrepreneurship",
      description:
        "Discover how to identify problems, develop useful ideas, understand customers, and present solutions.",
      steps: [
        "Step 1: Identify a problem in your community.",
        "Step 2: Research who experiences the problem.",
        "Step 3: Design a practical solution.",
        "Step 4: Present your idea and collect feedback."
      ]
    },

    writing: {
      title: "✍️ Communication",
      description:
        "Improve your writing, presentations, teamwork, and ability to explain ideas clearly.",
      steps: [
        "Step 1: Practise writing clear explanations.",
        "Step 2: Organise ideas into a logical structure.",
        "Step 3: Create a short presentation.",
        "Step 4: Ask for feedback and improve your work."
      ]
    },

    data: {
      title: "📊 Data Skills",
      description:
        "Learn how to organise information, read charts, spot patterns, and make evidence-based decisions.",
      steps: [
        "Step 1: Understand tables and basic data.",
        "Step 2: Practise with spreadsheets.",
        "Step 3: Create simple charts.",
        "Step 4: Explain what your data shows."
      ]
    },

    video: {
      title: "🎬 Video Creation",
      description:
        "Explore storytelling, editing, sound, and visual techniques for creating engaging videos.",
      steps: [
        "Step 1: Plan a short video idea.",
        "Step 2: Write a simple script or storyboard.",
        "Step 3: Practise editing and sound.",
        "Step 4: Publish a project and review the result."
      ]
    },

    problem: {
      title: "🧠 Problem Solving",
      description:
        "Build your ability to break down difficult problems, test ideas, and develop useful solutions.",
      steps: [
        "Step 1: Describe the problem clearly.",
        "Step 2: Break it into smaller tasks.",
        "Step 3: Compare possible solutions.",
        "Step 4: Test a solution and learn from feedback."
      ]
    }
  };

  function showSkill(skillName) {
    const skill = skillContent[skillName];

    if (!skill || !skillDetails) {
      return;
    }

    skillDetails.replaceChildren();

    const closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.type = "button";
    closeButton.textContent = "×";
    closeButton.setAttribute("aria-label", "Close skill details");

    closeButton.addEventListener("click", function () {
      skillDetails.classList.remove("visible");

      skillButtons.forEach(function (button) {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
      });
    });

    const title = document.createElement("h3");
    title.textContent = skill.title;

    const description = document.createElement("p");
    description.textContent = skill.description;

    const list = document.createElement("ul");

    skill.steps.forEach(function (step) {
      const item = document.createElement("li");
      item.textContent = step;
      list.appendChild(item);
    });

    skillDetails.append(closeButton, title, description, list);
    skillDetails.classList.add("visible");

    skillDetails.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

    skillButtons.forEach(function (button) {
      const selected = button.dataset.skill === skillName;

      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  skillButtons.forEach(function (button) {
    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", function () {
      showSkill(button.dataset.skill);
    });
  });

  /* =====================================
     3. CURRENT YEAR IN FOOTER
  ===================================== */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =====================================
     4. SMOOTH SCROLL FOR PAGE LINKS
  ===================================== */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  /* =====================================
     5. BASIC BUTTON FEEDBACK
  ===================================== */

  document.querySelectorAll("[data-message]").forEach(function (button) {
    button.addEventListener("click", function () {
      const message = button.dataset.message;

      if (message) {
        alert(message);
      }
    });
  });

  /* =====================================
     6. CONSOLE MESSAGE
  ===================================== */

  console.log("SkillBridge website interactions loaded successfully.");
});