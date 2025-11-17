import { createRequire } from "node:module";
import createExpressStub from "./ExpressStub.js";

let expressInstance;

try {
	const require = createRequire(import.meta.url);
	 
	expressInstance = require("express");
} catch (error) {
	expressInstance = createExpressStub();
}

export default expressInstance;
