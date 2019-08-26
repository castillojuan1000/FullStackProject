module.exports = {
  "development": {
    "username": process.env.DBUSER,
    "password": process.env.DBPASS,
    "database": "fullstackproject",
    "host": process.env.DBURL,
    "dialect": "postgres",
    "operatorsAliases": false,
    "logging": false
  }
}