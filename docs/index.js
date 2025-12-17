import info from "./configs/info.js";
import buildServers from "./configs/servers.js";
import tags from "./tags/tags.js";
import schemas from "./schemas/index.js";
import responses from "./components/responses.js";
import securitySchemes from "./components/security.js";
import paths from "./paths/index.js";

export default function buildDocument({ serverUrl } = {}) {
	return {
		openapi: "3.0.3",
		info,
		servers: buildServers(serverUrl),
		tags,
		security: [
			{
				bearerAuth: []
			}
		],
		paths,
		components: {
			schemas,
			responses,
			securitySchemes
		}
	};
}
