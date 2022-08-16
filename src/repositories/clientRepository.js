import connection from "../databases/postgres.js";

export async function insertClient(name, address, phone) {
    return connection.query(`
        INSERT INTO clients
        (name, address, phone)
        VALUES
        ($1, $2, $3)
    `, [name, address, phone]);
}

export async function selectClientOrderById(id) {
    return connection.query(`
        SELECT
        orders.id AS "orderId", orders.quantity, orders."createdAt",
        orders."totalPrice", cakes.name AS "cakeName"
        FROM ORDERS
        JOIN cakes ON cakes.id = orders."cakeId"
        WHERE "clientId" = $1
    `, [id])
}