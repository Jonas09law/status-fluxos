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

        servers.forEach((server, index) => {
            const card = document.createElement('div');
            card.classList.add('server-card');
            card.innerHTML = `
                <img src="https://media.discordapp.net/attachments/1424266949776511016/1429441384036700293/5735f7572324423abfa553f0af56e167.png?ex=69074a07&is=6905f887&hm=ecfabc5402971242705b4c450e0e1fcfd298f0307e586b8054c2557fe4bc57ef&=&format=webp&quality=lossless&width=170&height=170" alt="Logo do Servidor">
                <h2>Servidor #${index + 1}</h2>
                <div class="status ${server.status.toLowerCase()}">${server.status}</div>
                <div class="players">${server.playing} / ${server.maxPlayers} Jogadores</div>
                <div class="link">
                    <a href="https://www.roblox.com/games/112408194066110" target="_blank">Conectar</a>
                </div>
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
