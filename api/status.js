const axios = require('axios');

const serverId = "112408194066110";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      `https://games.roblox.com/v1/games/${serverId}/servers/Public?limit=100`
    );

    const servers = response.data.data;

    const result = servers.map((s) => ({
      id: s.id,
      playing: s.playing,
      maxPlayers: s.maxPlayers,
      status: s.playing > 0 ? "ONLINE" : "OFFLINE",
    }));

    res.status(200).json({ servers: result });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Não foi possível buscar os dados do servidor' });
  }
}
