// Show Menu
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  // Validating if the variables exists

  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("show-menu"));
  }
};

showMenu("nav-toggle", "nav-menu");

// Remove Menu Mobile

const navLink = document.querySelectorAll(".nav-link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");

  navMenu.classList.remove("show-menu");
}
navLink.forEach((nav) => nav.addEventListener("click", linkAction));

// SCROLL FOR SECTION THAT YOU'VE CLICKED

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 50;
    sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(`.nav-menu a[href*='${sectionId}']`)
        .classList.add("active-link");
    } else {
      document
        .querySelector(`.nav-menu a[href*='${sectionId}']`)
        .classList.remove("active-link");
    }
  });
}

// SHOW SCROLL TOP
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // IF HIGHER THAN 560 VW, SHOW-SCROLL CLASS
  if (this.scrollY >= 200) {
    scrollTop.classList.add("show-scroll");
  } else {
    scrollTop.classList.remove("show-scroll");
  }
}

window.addEventListener("scroll", scrollTop);

/* DARK LIGHT THEME */
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// REDUCING THE SIZE AND PRINT ON AN A4 SHEET

function scaleCv() {
  document.body.classList.add("scale-cv");
}

function removeScale() {
  document.body.classList.remove("scale-cv");
}

// GENERATE PDF
let areaCv = document.getElementById("area-cv");

let resumeButton = document.getElementById("resume-button");

let opt = {
  margin: 0,
  filename: "myResume.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 4 },
  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
};

function generateResume() {
  html2pdf(areaCv, opt);
}

resumeButton.addEventListener("click", () => {
  scaleCv();
  generateResume();
  setTimeout(removeScale, 5000);
});
