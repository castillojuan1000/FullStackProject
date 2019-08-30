module.exports = {
  "development": {
    "username": process.env.DBUSER,
    "password": process.env.DBPASS,
    "database": "fullstackproject",
    "host": process.env.DBURL,

    "dialect": "postgres",
    "operatorsAliases": false,
    "logging": false
  },


  "local": {
    "username": "postgres",
    "password": null,
    "database": "fullstackproject",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }


}

