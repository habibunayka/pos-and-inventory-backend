const defaultServers = [
  {
    "url": "http://localhost:3000",
    "description": "POS Backend server"
  }
];

export default function buildServers(serverUrl = defaultServers[0]?.url) {
  if (!serverUrl) {
    return defaultServers;
  }
  return defaultServers.map((server, index) => {
    if (index === 0) {
      return { ...server, url: serverUrl };
    }
    return server;
  });
}
