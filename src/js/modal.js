import Glide from "@glidejs/glide";

const modalOpenElements = document.querySelectorAll("[data-open-modal]");
const modalCloseElements = document.querySelectorAll("[data-close-modal]");
const modal = document.querySelector(`[data-modal="product"]`);
const size = document.querySelector(".modal__item-size");
const title = document.querySelector(".modal__title");

const disableScroll = () => {
  const paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
  const pagePosition = window.scrollY;

  document.body.style.paddingRight = paddingOffset;
  document.body.classList.add("scroll-lock");
  document.body.dataset.position = pagePosition;
};

const enableScroll = () => {
  const pagePosition = parseInt(document.body.dataset.position, 10);

  document.body.classList.remove("scroll-lock");
  document.body.classList.remove("scroll-lock");
  document.body.style.paddingRight = "0px";
  window.scroll({ top: pagePosition, left: 0 });
  document.body.removeAttribute("data-position");
};

const openModal = event => {
  modal.classList.add("is-active");
  disableScroll();
  modalOpenElements.forEach(el => el.removeEventListener("click", openModal));
  document.addEventListener("keydown", onKeydownEscape);
  modalCloseElements.forEach(el => el.addEventListener("click", closeModal));
  size.textContent = event.currentTarget.querySelector(
    ".product__item-info"
  ).textContent;
  title.textContent = event.currentTarget.querySelector(
    `[data-product="product__item-title"]`
  ).textContent;

  const images = event.currentTarget.querySelectorAll("picture");
  images.forEach(image => {
    const slide = document.createElement("li");

    slide.classList.add("glide__slide");
    slide.appendChild(image.cloneNode(true));
    modal.querySelector(".glide__slides").appendChild(slide);
  });
  new Glide(".glide", { type: "slider", rewind: false }).mount();
  if (images.length > 1) {
    modal
      .querySelector(".glide__arrows")
      .classList.remove("modal__slide-arrows");
  }
};

const closeModal = () => {
  modal.classList.remove("is-active");
  enableScroll();
  modalCloseElements.forEach(el => el.removeEventListener("click", closeModal));
  document.removeEventListener("keydown", onKeydownEscape);
  modalOpenElements.forEach(el => el.addEventListener("click", openModal));
  size.textContent = "";
  title.textContent = "";
  modal.querySelector(".glide__slides").innerHTML = "";
  modal.querySelector(".glide__arrows").classList.add("modal__slide-arrows");
};

const onKeydownEscape = evt => {
  if (evt.key === "Escape") {
    evt.preventDefault();
    closeModal();
  }
};

export const initModal = () => {
  modalOpenElements.forEach(el =>
    el.addEventListener("click", event => openModal(event))
  );
};
