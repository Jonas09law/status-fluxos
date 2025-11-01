async function fetchServers() {
    const container = document.getElementById('servers-container');
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Carregando servidores...</p>
        </div>
    `;

    try {
        const response = await fetch('/api/status'); 
        const data = await response.json();
        const servers = data.servers;

        container.innerHTML = '';
        
        if (!servers || servers.length === 0) {
            container.innerHTML = `<p style="text-align:center;color:rgba(255,255,255,0.5);">Nenhum servidor disponível no momento.</p>`;
            return;
        }

        servers.forEach((server, i) => {
            const card = document.createElement('div');
            card.className = 'server-card';
            card.innerHTML = `
                <h2>Servidor #${i+1}</h2>
                <div class="status ${server.status.toLowerCase()}">${server.status}</div>
                <div class="players">${server.playing} / ${server.maxPlayers} Jogadores</div>
                <a href="https://www.roblox.com/games/${server.id}" target="_blank">Conectar</a>
            `;
            container.appendChild(card);
        });

    } catch (err) {
        container.innerHTML = `<p style="text-align:center;color:#ef4444;">Erro ao carregar servidores. Tente novamente mais tarde.</p>`;
        console.error(err);
    }
}

fetchServers();
setInterval(fetchServers, 60000);
