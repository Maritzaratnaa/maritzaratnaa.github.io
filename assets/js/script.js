'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar toggle functionality for mobile
const initSidebar = function () {
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
  }
};
initSidebar();
document.addEventListener("DOMContentLoaded", initSidebar);



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn)
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);

if (overlay)
  overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    // Use data-filter-value if available, otherwise fallback to innerText
    let selectedValue = (this.dataset.filterValue || this.innerText).toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn.length > 0 ? filterBtn[0] : null;

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    // Use data-filter-value if available, otherwise fallback to innerText
    let selectedValue = (this.dataset.filterValue || this.innerText).toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn)
      lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }

    });
  }
}



// page navigation — wrapped in a function so it runs AFTER components.js
// has injected the navbar into the DOM
const initNavigation = function () {
  // Re-query after dynamic render
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  // function to switch tabs based on a page name string
  const navigateToPage = function (pageName) {
    let found = false;
    const targetPageName = pageName.toLowerCase();

    for (let i = 0; i < pages.length; i++) {
      const pageDataName = pages[i].dataset.page;

      // Support mapping across language variations
      const isMatch = (pageDataName === targetPageName) ||
                      (targetPageName === "kontak" && pageDataName === "contact") ||
                      (targetPageName === "contact" && pageDataName === "kontak");

      if (isMatch) {
        pages[i].classList.add("active");
        found = true;
      } else {
        pages[i].classList.remove("active");
      }
    }

    for (let i = 0; i < navigationLinks.length; i++) {
      // Prefer data-nav-target (language-independent key) over display text
      const navTarget = (navigationLinks[i].dataset.navTarget || navigationLinks[i].innerHTML).toLowerCase();
      const isMatch = (navTarget === targetPageName) ||
                      (targetPageName === "kontak" && navTarget === "contact") ||
                      (targetPageName === "contact" && navTarget === "kontak");

      if (isMatch) {
        navigationLinks[i].classList.add("active");
      } else {
        navigationLinks[i].classList.remove("active");
      }
    }

    if (found) {
      window.scrollTo(0, 0);
    }
  };

  // add click event to all nav links
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
      // Use data-nav-target (language-independent) if available
      const targetPage = (this.dataset.navTarget || this.innerHTML).toLowerCase();
      window.location.hash = targetPage;
      navigateToPage(targetPage);
    });
  }

  // Check hash on page load and hash change
  const handleHashNavigation = function () {
    const hash = window.location.hash.substring(1);
    if (hash) {
      navigateToPage(hash);
    }
  };

  window.addEventListener("hashchange", handleHashNavigation);

  // Handle hash that is already set when page loads
  handleHashNavigation();
};

// Initialize navigation after the DOM (and injected components) are ready
document.addEventListener("DOMContentLoaded", initNavigation);

// Portfolio hover image slider functionality
const initSliders = function () {
  const sliders = document.querySelectorAll("[data-slider]");

  sliders.forEach(slider => {
    const track = slider.querySelector(".slider-track");
    const slides = slider.querySelectorAll(".slider-track img");
    const dotsContainer = slider.querySelector(".slider-dots");
    
    if (!track || slides.length <= 1) return;

    // Dynamically generate dot indicators to match number of slides
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      slides.forEach((_, idx) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (idx === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
      });
    }

    const dots = slider.querySelectorAll(".slider-dots .dot");
    let slideIndex = 0;
    let intervalId = null;
    
    const showSlide = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, idx) => {
        if (idx === index) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    };
    
    slider.addEventListener("mouseenter", () => {
      // Clear any existing intervals to prevent double cycles
      if (intervalId) clearInterval(intervalId);
      
      intervalId = setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
      }, 1800);
    });
    
    slider.addEventListener("mouseleave", () => {
      if (intervalId) clearInterval(intervalId);
      slideIndex = 0;
      showSlide(slideIndex);
    });
  });
};

// Initialize sliders on DOMContentLoaded and Load
document.addEventListener("DOMContentLoaded", initSliders);
window.addEventListener("load", initSliders);