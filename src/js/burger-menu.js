const header = document.querySelector('[data-header="sticky"]');
const burgerButton = document.querySelector('[data-burger="burger"]');
const overlay = document.querySelector(".header__overlay");
const navList = document.querySelector(".header__nav-list");

const closeMenu = () => {
  header.classList.remove("is-open");
  document.removeEventListener("keydown", onDocumentKeydown);
  navList.removeEventListener("click", onDocumentClick);
};

const addEventListenersToCloseMenu = () => {
  navList.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onDocumentKeydown);
  overlay.addEventListener("click", closeMenu);
};

const openMenu = () => {
  header.classList.add("is-open");
  addEventListenersToCloseMenu();
};

function onDocumentClick(evt) {
  if (evt.target.hasAttribute("data-close-menu")) {
    closeMenu();
  }
}

function onDocumentKeydown(evt) {
  if (evt.key === "Escape") {
    closeMenu();
  }
}

const initToggleMenu = () => {
  burgerButton.addEventListener("click", () => {
    if (!header.classList.contains("is-open")) {
      openMenu();
    } else {
      closeMenu();
    }
  });
};

export { initToggleMenu };
