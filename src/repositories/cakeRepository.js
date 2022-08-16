import connection from "../databases/postgres.js";

export async function insertCake(name, price, image, description) {
    return connection.query(`
        INSERT INTO cakes
        (name, price, image, description)
        VALUES
        ($1, $2, $3, $4)
    `, [name, price, image, description]);
}

export async function findCake(name) {
    return connection.query(`
        SELECT * FROM cakes
        WHERE name = $1
    `, [name])
}