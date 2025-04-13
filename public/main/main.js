function addServerToDOM(server)
{
	const container			=	document.getElementById('server-container');
	const serverItem		=	document.createElement('div');
	serverItem.className	=	'server-item';
	
	const serverImage = server.name.toLowerCase().replace(/\s+/g, '-') + '.png';
	
	serverItem.innerHTML 	=	`
		<div class="server-name">${server.name}</div>
		<div class="server-image-wrapper">
			<img src="assets/servers/${serverImage}" alt="${server.name}" class="server-image">
			<span class="status-indicator ${server.status ? 'status-online' : 'status-offline'}"></span>
			<div class="corner top-left"></div>
			<div class="corner top-right"></div>
			<div class="corner bottom-left"></div>
			<div class="corner bottom-right"></div>
		</div>
		<span class="player-count">${server.status ? server.players : '~'} / ${server.status ? server.maxPlayers : '~'} joueurs</span>
		<button class="play-btn">Play</button>
	`;

	container.appendChild(serverItem);

	const wrapper		=	serverItem.querySelector('.server-image-wrapper');
	const img			=	wrapper.querySelector('.server-image');
	const button		=	serverItem.querySelector('.play-btn');

	wrapper.addEventListener('mousemove', (e) => {
		const rect			=	wrapper.getBoundingClientRect();
		img.style.transform	=	`rotateX(${-((e.clientY - rect.top) - (rect.height / 2)) / 15}deg) rotateY(${((e.clientX - rect.left) - (rect.width / 2)) / 15}deg)`;
	});

	wrapper.addEventListener('mouseleave', () => {img.style.transform = 'rotateX(0deg) rotateY(0deg)'});
	wrapper.addEventListener('mouseenter', () => {img.style.transition = 'transform 0.1s'});
	wrapper.addEventListener('click', () => {button.click()});
}

async function loadServers()
{
	try {
		const res	=	await fetch('/api/servers');
		const data	=	await res.json();

		data.forEach(server => addServerToDOM(server));
	} catch (err) {
		console.error("Erreur API :", err);
	}
}

loadServers();