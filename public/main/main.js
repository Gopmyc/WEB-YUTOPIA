import { addServerToDOM	} from './js/dom.js';
import { loadServers	} from './js/api.js';

async function initializeServers()
{
    const servers	=	await loadServers();
    const container	=	document.getElementById('server-container');

    if (servers.length === 0)
		{container.innerHTML = '<p>No servers currently available.</p>'}
	else
		{servers.forEach(server => addServerToDOM(server))}
}

initializeServers();