import { initToggleMenu } from "./burger-menu";
import { iosVhFix } from "./utils/ios-vh-fix";
import { initModal } from "./modal";

window.addEventListener("DOMContentLoaded", () => {
  iosVhFix();

  window.addEventListener("load", () => {
    initToggleMenu();
    initModal();
  });
});
