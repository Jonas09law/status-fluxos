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
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: rgba(255,255,255,0.5);">
                    <p>Nenhum servidor disponível no momento.</p>
                </div>
            `;
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

    } catch (error) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #ef4444;">
                <p>Erro ao carregar servidores. Tente novamente mais tarde.</p>
            </div>
        `;
        console.error('Erro ao buscar servidores:', error);
    }
}

fetchServers();

setInterval(fetchServers, 60000);
