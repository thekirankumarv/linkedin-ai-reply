import injectAiButton from "../components/AiPopupInjector";
import "~/assets/tailwind.css";

export default defineContentScript({
  matches: ["*://*.google.com/*", "*://*.linkedin.com/*"],
  main() {
    injectAiButton();
  },
});
