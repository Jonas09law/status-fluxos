const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/status', async (req, res) => {
    try {
        const serverId = '112408194066110';
        const response = await axios.get(`https://games.roblox.com/v1/games/${serverId}/servers/Public?limit=100`);
        const servers = response.data.data.map(srv => ({
            id: serverId,
            status: srv.playing > 0 ? 'ONLINE' : 'OFFLINE',
            playing: srv.playing,
            maxPlayers: srv.maxPlayers
        }));
        res.json({ servers });
    } catch (err) {
        res.status(500).json({ servers: [] });
    }
});

app.listen(3000, () => console.log('API rodando na porta 3000'));
