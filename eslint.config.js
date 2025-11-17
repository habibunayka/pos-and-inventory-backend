import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

export default [
	js.configs.recommended,
	{
		files: ["**/*.js", "**/*.cjs"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.node,
				console: "readonly",
				process: "readonly",
				Buffer: "readonly" 
			}
		},
		plugins: {
			import: importPlugin
		},
		rules: {
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
			quotes: ["error", "double", { avoidEscape: true }],
			semi: ["error", "always"],
			"prefer-const": "warn",
			"no-var": "error",
			"no-unused-vars": "off",
			"no-undef": "off"
		}
	}
];
