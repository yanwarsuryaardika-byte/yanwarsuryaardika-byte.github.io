const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const images = document.querySelectorAll(".profile-photo, .project-image img");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

images.forEach((image) => {
  const hideFailedImage = () => {
    image.classList.add("image-load-failed");
    image.setAttribute("aria-hidden", "true");
  };

  image.addEventListener("error", hideFailedImage);

  if (image.complete && image.naturalWidth === 0) {
    hideFailedImage();
  }
});

const setActiveLink = () => {
  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
};

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

const experiencePhotos = document.querySelectorAll(".experience-media img");
const photoExtensions = [".jpg", ".jpeg", ".png", ".JPG", ".JPEG"];

experiencePhotos.forEach((photo) => {
  const link = photo.closest("a");
  const basePath = photo.getAttribute("src").replace(/\.[^./]+$/, "");
  let attempt = 0;

  const tryNextExtension = () => {
    attempt += 1;
    if (attempt < photoExtensions.length) {
      const nextSrc = basePath + photoExtensions[attempt];
      photo.src = nextSrc;
      if (link) link.href = nextSrc;
    } else {
      photo.classList.add("image-load-failed");
      photo.setAttribute("aria-hidden", "true");
    }
  };

  photo.addEventListener("error", tryNextExtension);

  if (photo.complete && photo.naturalWidth === 0) {
    tryNextExtension();
  }
});
