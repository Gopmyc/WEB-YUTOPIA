function createServerElement(server)
{
    const serverItem = document.createElement('div');
    serverItem.className = 'server-item';
    
    serverItem.innerHTML = `
        <div class="server-name">${server.name}</div>
        <div class="server-image-wrapper">
            <img src="assets/servers/naruto-server.png" alt="${server.name}" class="server-image">
            <span class="status-indicator ${server.IP_PORT ? 'status-online' : 'status-offline'}"></span>
            <div class="corner top-left"></div>
            <div class="corner top-right"></div>
            <div class="corner bottom-left"></div>
            <div class="corner bottom-right"></div>
        </div>
        <span class="player-count">${server.IP_PORT ? server.players : '~'} / ${server.IP_PORT ? server.maxPlayers : '~'} joueurs</span>
        <button class="play-btn" data-ip-port="${server.IP_PORT}" data-password="${server.password}">Play</button>
    `;

    const playButton = serverItem.querySelector('.play-btn');
    playButton.addEventListener('click', () => {
        const ipPort = playButton.getAttribute('data-ip-port');
        const password = playButton.getAttribute('data-password');
        const steamLink = `steam://connect/${ipPort}/${password}`;
        console.log(`${steamLink}`)
        window.location.href = steamLink;
    });

    return serverItem;
}

function addServerToDOM(server)
{
    const container			=	document.getElementById('server-container');
    const serverItem		=	createServerElement(server);

    container.appendChild(serverItem);

    const wrapper			=	serverItem.querySelector('.server-image-wrapper');
    const img				=	wrapper.querySelector('.server-image');
    const button			=	serverItem.querySelector('.play-btn');

    wrapper.addEventListener('mousemove', (e) => {
        const rect			=	wrapper.getBoundingClientRect();
        img.style.transform	=	`rotateX(${-((e.clientY - rect.top) - (rect.height / 2)) / 15}deg) rotateY(${((e.clientX - rect.left) - (rect.width / 2)) / 15}deg)`;
    });

    wrapper.addEventListener('mouseleave', () => {img.style.transform = 'rotateX(0deg) rotateY(0deg)'});
    wrapper.addEventListener('mouseenter', () => {img.style.transition = 'transform 0.1s'});
    wrapper.addEventListener('click', () => {button.click()});
}

export { addServerToDOM };