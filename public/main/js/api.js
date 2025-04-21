async function loadServers()
{
    try
	{
        const res	=	await fetch('/api/servers');
        if (!res.ok)
			{throw new Error('Error retrieving servers')}
        const data	=	await res.json();
        return data;
    }
	catch (err)
	{
        console.error("Erreur API :", err);
        document.getElementById('server-container').innerHTML = `<p class="error">Error loading servers. Please try again later.</p>`;
        return [];
    }
}

export { loadServers };
