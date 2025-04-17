const express 	=	require('express');
const path    	=	require('path');
const dotenv  	=	require('dotenv');
const mysql		=	require('mysql2/promise');

dotenv.config();

const app		=	express();
const PORT		=	3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

const db		=	mysql.createPool({
	host:		process.env.DB_HOST,
	port:		process.env.DB_PORT,
	user:		process.env.DB_USER,
	password:	process.env.DB_PASSWORD,
	database:	process.env.DB_NAME
});

let gServers	=	[];

async function loadServersFromDB() {
	try {
		const [rows]	=	await db.query('SELECT * FROM password_servers');
		gServers		=	rows;
		console.log(`[INFO] Serveurs mis à jour depuis la DB (${rows.length} serveurs)`);
	} catch (err) {console.error('[ERREUR] Échec de la récupération des serveurs :', err)}
}

loadServersFromDB();
setInterval(loadServersFromDB, 0.1 * (60 * 1000)); // Mettre le temps de rafraichissement dans le .env ?

app.get('/api/servers', (req, res) => {res.json(gServers)});

app.listen(PORT, () => {console.log(`Serveur lancé sur http://localhost:${PORT}`)});
