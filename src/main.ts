import * as dotenv from "dotenv";
dotenv.config();
import server from "./middleware/middleware";
import db from "./database/postgres";

server.post("/songs", (req, res) => {
    const { title, author, lyrics, genre, album } = req.body;
        db.query(`INSERT INTO songs (title, lyrics, author, genre, album) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [title, lyrics, author, genre, album], (err, table) => {
            if (err) {
                return res.json(err);
            }
            res.json(table.rows);
        })
})


server.get("/songs", (req, res) => {
    db.query(`SELECT * FROM songs ORDER BY id ASC;`, (err, table) => {
        if (err) {
            return res.json(err);
        }
        res.json(table.rows);
    })
})

const port = process.env.NODE_ENV === "production" ? process.env.PORT : process.env.LOCAL_PORT

server.listen(port, () => {
    console.log("Server running on port " + port);
})

