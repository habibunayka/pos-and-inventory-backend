import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";

export default [
	js.configs.recommended,
	{
		files: ["**/*.js"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
		},
		plugins: {
			import: importPlugin,
		},
		rules: {
			// ===== Style Lu =====
			indent: ["error", "tab"],
			"no-tabs": "off",
			"no-mixed-spaces-and-tabs": ["error"],
			"comma-spacing": ["error", { before: false, after: true }],
			"space-in-parens": ["error", "never"],
			"keyword-spacing": ["error", { before: true, after: true }],
			"object-curly-spacing": ["error", "always"],
			"array-bracket-spacing": ["error", "never"],
			"space-before-blocks": ["error", "always"],
			"arrow-spacing": ["error", { before: true, after: true }],

			// ===== Behavior =====
			quotes: ["error", "double", { avoidEscape: true }],
			semi: ["error", "always"],
			"prefer-const": "warn",
			"no-var": "error",
			"no-unused-vars": "warn",
			"no-console": "off",
		},
	},
];
