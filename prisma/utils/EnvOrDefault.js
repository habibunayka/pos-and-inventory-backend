export default function envOrDefault(key, fallback) {
	const raw = process.env[key];
	if (typeof raw === "undefined" || raw === null) {
		return fallback;
	}

	const trimmed = raw.trim();
	return trimmed === "" ? fallback : trimmed;
}
