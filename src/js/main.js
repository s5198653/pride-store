import { initToggleMenu } from "./burger-menu";
import { iosVhFix } from "./utils/ios-vh-fix";
import { initModal } from "./modal";
import { initActiveMenu } from "./active-menu";

window.addEventListener("DOMContentLoaded", () => {
  iosVhFix();

  window.addEventListener("load", () => {
    initToggleMenu();
    initModal();
    initActiveMenu();
  });
});
