const express	=	require('express');
const path		=	require('path');
const dotenv	=	require('dotenv');
const mysql		=	require('mysql2/promise');
const http		=	require('http');
const socketIo	=	require('socket.io');

dotenv.config();

const app		=	express();
const server	=	http.createServer(app);
const io		=	socketIo(server);
const PORT		=	3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

const db		=	mysql.createPool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

let gServers	=	[];

async function loadServersFromDB()
{
	try
		{
			const [rows]			=	await db.query('SELECT * FROM password_servers');
			const previousServers	=	gServers;
			gServers				=	rows;
			if (previousServers.length !== gServers.length)
			{
				console.log(`[INFO] Serveurs mis à jour depuis la DB (${gServers.length} serveurs)`);
				io.emit('serversUpdated', gServers);
			}
		}
	catch (sErr)
		{console.error('[ERREUR] Échec de la récupération des serveurs :', sErr)}
}

loadServersFromDB();
setInterval(loadServersFromDB, 0.1 * (60 * 1000));

app.get('/api/servers', (req, res) => {res.json(gServers)});
server.listen(PORT, () => {console.log(`Serveur lancé sur http://localhost:${PORT}`)});