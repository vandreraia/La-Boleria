import connection from "../databases/postgres.js";
import dayjs from "dayjs";

export async function insertOrder(clientId, cakeId, quantity, totalPrice) {
    return connection.query(`
        INSERT INTO orders
        ("clientId", "cakeId", quantity, "totalPrice")
        VALUES
        ($1, $2, $3, $4)
    `, [clientId, cakeId, quantity, totalPrice]);
}

export async function findClient(clientId) {
    return connection.query(`
        SELECT * FROM clients
        WHERE id = $1
    `, [clientId]);
}

export async function findCake(cakeId) {
    return connection.query(`
        SELECT * FROM cakes
        WHERE id = $1
    `, [cakeId]);
}

export async function selectOrders(date) {
    if (date) {
        return connection.query(`
        SELECT
        json_build_object(
            'id', clients.id,
            'name', clients.name,
            'address', clients.address,
            'phone', clients.phone
        ) AS client,
        json_build_object(
            'id', cakes.id,
            'name', cakes.name,
            'price', cakes.price,
            'description', cakes.description,
            'image', cakes.image
        ) AS cake,
        orders.id AS "orderId", orders."createdAt",
        orders.quantity, orders."totalPrice", orders."isDelivered"
        FROM ORDERS
        JOIN clients ON clients.id = orders."clientId"
        JOIN cakes ON cakes.id = orders."cakeId"
        WHERE orders."createdAt"::date = $1`, [date])
    } else {
        return connection.query(`
        SELECT
        json_build_object(
            'id', clients.id,
            'name', clients.name,
            'address', clients.address,
            'phone', clients.phone
        ) AS client,
        json_build_object(
            'id', cakes.id,
            'name', cakes.name,
            'price', cakes.price,
            'description', cakes.description,
            'image', cakes.image
        ) AS cake,
        orders.id AS "orderId", orders."createdAt",
        orders.quantity, orders."totalPrice", orders."isDelivered"
        FROM ORDERS
        JOIN clients ON clients.id = orders."clientId"
        JOIN cakes ON cakes.id = orders."cakeId"
    `)
    }
}

export async function selectOrderById(id) {
    return connection.query(`
        SELECT
        json_build_object(
            'id', clients.id,
            'name', clients.name,
            'address', clients.address,
            'phone', clients.phone
        ) AS client,
        json_build_object(
            'id', cakes.id,
            'name', cakes.name,
            'price', cakes.price,
            'description', cakes.description,
            'image', cakes.image
        ) AS cake,
        orders.id AS "orderId", orders."createdAt", orders.quantity, orders."totalPrice"
        FROM ORDERS
        JOIN clients ON clients.id = orders."clientId"
        JOIN cakes ON cakes.id = orders."cakeId"
        WHERE orders.id = $1
    `, [id])
}

export async function findOrderById(id) {
    return connection.query(`
        SELECT * FROM orders
        WHERE orders.id = $1
    `, [id])
}

export async function patchOrderQuery(id) {
    return connection.query(`
        UPDATE orders
        SET "isDelivered" = true 
        WHERE orders.id = $1
    `, [id])
}