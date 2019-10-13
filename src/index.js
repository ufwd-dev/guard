const mysql = require('mysql2/promise');
const config = require('../config.json');
const poster = require('./poster');

const TOTAL_SQL = `SELECT COUNT(*) TABLES,
table_schema FROM information_schema.TABLES
WHERE table_schema = '${config.databaseOptions.database}' GROUP BY table_schema;`
const tableMap = {
	account: {
		name: 'ACCOUNT',
		size: 0
	},
	accountProfile: {
		name: 'ACCOUNT_PROFILE',
		size: 0
	},
	ufwdAccount: {
		name: 'UFWD_ACCOUNT',
		size: 0
	}
}

module.exports = async function check() {
	try {
		const connection = await mysql.createConnection(config.databaseOptions);
		const [tables = rows] = await connection.query(TOTAL_SQL);

		if (tables[0].TABLES !== 33) {
			return false;
		}

		for (const key in tableMap) {
			const Sql = `SELECT COUNT(*) TOTAL FROM ${tableMap[key].name}`;
			const [rows] = await connection.query(Sql);

			tableMap[key].size = rows[0].TOTAL;
		}

		if (tableMap.account.size === 0) {
			return false;
		}

		if (tableMap.account.size !== tableMap.accountProfile.size || tableMap.account.size !== tableMap.ufwdAccount.size) {
			return false;
		}

		console.log(`[${new Date()}] Check Pass!`)
		return true;
	} catch (error) {
		console.log(`[${new Date()}] Check failed! Error Information: ${error.message}`);

		return false;
	}
}