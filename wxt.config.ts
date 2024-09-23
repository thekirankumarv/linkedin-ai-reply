import { defineConfig } from "wxt";

export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    manifest_version: 3,
    name: "LinkedIn AI Reply",
    version: "1.0",
    description: "A Chrome extension that runs on LinkedIn and assists users in generating replies to messages",
    permissions: ["activeTab", "scripting"],
  },
});
