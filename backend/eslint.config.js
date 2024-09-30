import globals from "globals";
import pluginJs from "@eslint/js";

export default {
  languageOptions: {
    globals: globals.node, // Utilisation des globales Node.js comme 'require', 'process', etc.
  },
  extends: [
    pluginJs.configs.recommended, // Règles recommandées pour le JavaScript
  ],
};
