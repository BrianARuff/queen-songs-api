import { Client } from "pg";
let db = undefined;
if (process.env.NODE_ENV === "production") {
    db = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
db = new Client({
    user: "postgres",
    host: "localhost",
    database: "songs",
    password: "123456",
    port: 5432
});
}
db.connect();

interface Table {
    rows: {}
}

interface Database {
    query: (query: string, queryArgs: any[], response: <T>(err: T, table: Table) => {} | undefined) => {}
}

export default db as Database;