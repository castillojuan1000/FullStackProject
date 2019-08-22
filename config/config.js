module.exports = {
  "development": {
    "username": process.env.DBUSER,
    "password": process.env.DBPASS,
    "database": "FullStackProject",
    "host": process.env.DBURL,
    "dialect": "postgres",
    "operatorsAliases": false
  }
}