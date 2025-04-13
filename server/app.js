const express 	=	require('express');
const path    	=	require('path');
const dotenv  	=	require('dotenv');

dotenv.config();

const app		=	express();
const PORT		=	3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

const servers	=	{};

app.post('/api/servers/update', (req, res) => {
	const {serverId, name, players, maxPlayers}	=	req.body;

	if (!serverId || !name) {return res.status(400).json({error: 'serverId et name requis'})}

	servers[serverId]	=	{
		name,
		status:		true,
		players:	players || 0,
		maxPlayers:	maxPlayers || 64
	};

	res.json({ message: `Serveur ${serverId} mis à jour` });
});

app.get('/api/servers', (req, res) => {const data = Object.values(servers); res.json(data)});
app.listen(PORT, () => {console.log(`Serveur lancé sur http://localhost:${PORT}`)});