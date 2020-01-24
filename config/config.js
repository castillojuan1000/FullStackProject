require('dotenv').config();

module.exports = {
	development: {
		username: process.env.PG_USER || 'postgres',
		password: process.env.PG_PASSWORD || null,
		database: 'gifttoyou',
		host: '127.0.0.1',
		dialect: 'postgres',
		logging: false
	},
	production: {
		use_env_variable: 'DATABASE_URL',
		host: process.env.DATABASE_URL,
		dialect: 'postgres',
		operatorsAliases: false,
		logging: false,
		dialectOptions: {
			ssl: true
		}
	}
};
