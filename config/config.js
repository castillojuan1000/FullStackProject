module.exports = {
  "development": {
    // "username": process.env.DBUSER,
    // "password": process.env.DBPASS,
    // "database": "fullstackproject",
    // "host": process.env.DBURL,
    // "dialect": "postgres",
    // "operatorsAliases": false,
    // "logging": false
    "username": "postgres",
    "password": process.env.DBPASS,
    "database": "fullstackproject",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false,
  },
  "local": {
    "username": "postgres",
    "password": process.env.DBPASS,
    "database": "fullstackproject",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false,
  }


}

