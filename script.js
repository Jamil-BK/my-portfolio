//Typed.js Script for Home Section

document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typed-output", {
    strings: ["Welcome to My Portfolio"],
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
  });
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript is properly linked!"); // JS Loaded check

  // Select all buttons and project details section
  const buttons = document.querySelectorAll(".toggle-btn");
  const projectDetails = document.getElementById("project-details");
  const detailsTitle = document.getElementById("details-title");
  const detailsDescription = document.getElementById("details-description");
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");

  // Define project data
  const projects = {
    "web-design": {
      title: "Web Design",
      description:
        "A modern web design project showcasing creativity and responsiveness.",
      images: ["assets/a1.png", "assets/a2.png", "assets/a3.png"],
      bgColor: "web-design",
    },
    "web-hosting": {
      title: "Web Hosting/Maintenance",
      description:
        "Providing hosting solutions and website maintenance services.",
      images: ["assets/b1.png", "assets/b2.png", "assets/b3.png"],
      bgColor: "web-hosting",
    },
    "content-creation": {
      title: "Content Creation",
      description:
        "Creating engaging content for digital platforms and marketing.",
      images: ["assets/c1.png", "assets/c2.png", "assets/c3.png"],
      bgColor: "content-creation",
    },
  };

  let activeProject = null; // Stores the currently active project

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const projectKey = this.getAttribute("data-project"); // Get project key from button
      console.log("Selected Project:", projectKey);

      // If the same project is clicked, hide it
      if (activeProject === projectKey) {
        projectDetails.style.display = "none"; // Hide the section
        this.textContent = "Read More"; // Reset button text
        this.style.backgroundColor = "#007BFF"; // Reset button color
        activeProject = null; // Reset active project
        return;
      }

      // Reset all buttons to "Read More" and remove red color
      buttons.forEach((btn) => {
        btn.textContent = "Read More";
        btn.style.backgroundColor = "#007BFF"; // Reset to blue
      });

      if (projects[projectKey]) {
        const project = projects[projectKey];

        // Update Project Details Section
        detailsTitle.textContent = project.title;
        detailsDescription.textContent = project.description;
        img1.src = project.images[0];
        img2.src = project.images[1];
        img3.src = project.images[2];

        // Change background color for each project
        projectDetails.className = `project-details ${project.bgColor}`;

        // Show details section
        projectDetails.style.display = "block";
        this.textContent = "Hide More"; // Change button text
        this.style.backgroundColor = "red"; // Make button red

        activeProject = projectKey; // Set active project
      }
    });
  });

  // Click outside to hide the details section
  document.addEventListener("click", function (event) {
    if (
      !projectDetails.contains(event.target) &&
      !event.target.classList.contains("toggle-btn")
    ) {
      projectDetails.style.display = "none"; // Hide details section
      buttons.forEach((btn) => {
        btn.textContent = "Read More";
        btn.style.backgroundColor = "#007BFF"; // Reset button color
      });
      activeProject = null; // Reset active project
    }
  });
});
// About Section------------------------
// ✅ About Section: Animate skill bars, logo sparkle, and background color
document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.querySelector("#about");
  const skillBars = document.querySelectorAll(".progress-bar.animate-bar");
  const logo = document.querySelector(".logo-animated");

  let animated = false;

  function animateAboutSection() {
    const sectionTop = aboutSection.offsetTop;
    const sectionHeight = aboutSection.offsetHeight;
    const scrollY = window.scrollY + window.innerHeight;

    // Trigger only when it enters view
    if (!animated && scrollY > sectionTop + sectionHeight / 4) {
      aboutSection.classList.add("scrolled");

      skillBars.forEach((bar) => {
        const target = bar.getAttribute("data-value") || bar.dataset.percent;
        if (target) bar.style.width = target;
      });

      if (logo) logo.classList.add("sparkle");
      animated = true; // ✅ Trigger only once
    }

    // Optional reset on scroll-up (if you want animation every time)
    // else remove this `else` block entirely
    else if (animated && scrollY < sectionTop) {
      aboutSection.classList.remove("scrolled");

      skillBars.forEach((bar) => (bar.style.width = "0%"));
      if (logo) logo.classList.remove("sparkle");
      animated = false;
    }
  }

  window.addEventListener("scroll", animateAboutSection);
});

// Contact Form Section

document.addEventListener("DOMContentLoaded", function () {
  // Get form and input elements
  const form = document.getElementById("contactForm");

  const nameInput = document.getElementById("Name");
  const emailInput = document.getElementById("Sender");
  const subjectInput = document.getElementById("Subject");
  const messageInput = document.getElementById("Message");

  // Create error spans dynamically
  createErrorSpan(nameInput, "nameError");
  createErrorSpan(emailInput, "emailError");
  createErrorSpan(subjectInput, "subjectError");
  createErrorSpan(messageInput, "messageError");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  form.addEventListener("submit", function (event) {
    // Clear previous error messages
    nameError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";
    messageError.textContent = "";

    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Please enter your name";
      isValid = false;
    }

    // Validate Email
    if (emailInput.value.trim() === "") {
      emailError.textContent = "Please enter your email";
      isValid = false;
    } else if (!validateEmail(emailInput.value)) {
      emailError.textContent = "Please enter a valid email address";
      isValid = false;
    }

    // Validate Subject
    if (subjectInput.value.trim() === "") {
      subjectError.textContent = "Please enter a subject";
      isValid = false;
    }

    // Validate Message
    if (messageInput.value.trim() === "") {
      messageError.textContent = "Please enter your message";
      isValid = false;
    }

    // If form is not valid, prevent submission
    if (!isValid) {
      event.preventDefault();
    } else {
      alert("Thank you! Your message has been sent successfully.");
      form.reset();
    }
  });

  // Function to validate email format
  function validateEmail(email) {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(String(email));
  }

  // Function to create an error span if not already present
  function createErrorSpan(inputField, errorId) {
    if (!document.getElementById(errorId)) {
      const errorSpan = document.createElement("span");
      errorSpan.classList.add("error");
      errorSpan.id = errorId;
      inputField.parentElement.appendChild(errorSpan);
    }
  }
});

// Collapse navbar on link click (for mobile)
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    });
  });
});

// 🔹 Scroll Progress Bar Script
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById("scroll-progress").style.width = scrollPercent + "%";
});

//   /=========Dark Mode=============

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("darkToggle");
  const body = document.body;

  // Helper function to update button label and style
  function updateToggleUI() {
    if (body.classList.contains("dark-mode")) {
      toggleBtn.innerHTML = "☀️ Light Mode";
      toggleBtn.classList.remove("btn-warning");
      toggleBtn.classList.add("btn-outline-light");
    } else {
      toggleBtn.innerHTML = "🌙 Dark Mode";
      toggleBtn.classList.remove("btn-outline-light");
      toggleBtn.classList.add("btn-warning");
    }
  }

  // Load preference from localStorage
  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
  }

  updateToggleUI(); // Set initial state

  toggleBtn.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    // Save preference
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
    } else {
      localStorage.setItem("dark-mode", "disabled");
    }

    updateToggleUI(); // Update text and style
  });
});

// =============================Testimonial=================

const carouselElement = document.querySelector("#testimonialCarousel");
if (carouselElement) {
  carouselElement.addEventListener("mouseenter", () => {
    bootstrap.Carousel.getInstance(carouselElement).pause();
  });
  carouselElement.addEventListener("mouseleave", () => {
    bootstrap.Carousel.getInstance(carouselElement).cycle();
  });
}

// ===================Client==========================================

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".logo-track");

  track.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });

  track.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
});
