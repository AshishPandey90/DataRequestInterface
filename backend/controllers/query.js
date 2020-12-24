const pgp = require("pg-promise");

const connections = [];

const yoyo = class Redshift {
  static async getConnection() {
    const dbName = "DATABASE NAME";
    if (!connections[dbName]) {
      const dbUser = "PUT DATABSE USER NAME";
      const dbPassword = "PUT DATABASE USER PASSWORD";
      const dbHost = "REDSHIFT DATABSE SERVER URL";
      const dbPort = "PORT TO CONNECT ON THE SERVER";
      const dbc = pgp({ capSQL: true });
      console.log(`Opening connection to: ${dbName}, host is: ${dbHost}`);
      const connectionString = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
      connections[dbName] = dbc(connectionString);
    }
    return connections[dbName];
  }

  static async executeQuery(query) {
    try {
      const date1 = new Date().getTime();
      const connection = await this.getConnection();
      const result = await connection.query(query);

      const date2 = new Date().getTime();
      const durationMs = date2 - date1;
      const durationSeconds = Math.round(durationMs / 1000);
      let dataLength = 0;

      if (result && result.length) dataLength = result.length;

      console.log(
        `[Redshift] [${durationMs}ms] [${durationSeconds}s] [${dataLength.toLocaleString()} records] ${query}`
      );

      return result;
    } catch (e) {
      console.error(`Error executing query: ${query} Error: ${e.message}`);
      throw e;
    }
  }
}

module.exports = {
  RedshiftClass: yoyo
}
