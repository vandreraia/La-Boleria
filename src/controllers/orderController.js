import dotenv from "dotenv";
import { insertOrder, findClient, findCake, selectOrders, selectOrderById, findOrderById, patchOrderQuery } from "../repositories/orderRepository.js";

dotenv.config();

export async function postOrder(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body;

    try {
        const { rowCount: existClient } = await findClient(clientId);

        if (existClient === 0) {
            return res.status(404).send("cliente nao existe");
        }

        const { rowCount: existCake } = await findCake(cakeId);

        if (existCake === 0) {
            return res.status(404).send("bolo nao existe");
        }

        await insertOrder(clientId, cakeId, quantity, totalPrice);

        res.status(201).send("ordem criada com sucesso");
    } catch (error) {
        res.status(500).send(error.message);
    }
}
export async function getOrders(req, res) {
    const { date } = req.query;

    try {
        const { rows: orders, rowCount: existOrder } = await selectOrders(date);

        if (existOrder === 0) {
            return res.status(404).send(orders);
        }

        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getOrderById(req, res) {
    const { id } = req.params;

    try {
        const { rows: order, rowCount: existOrder } = await selectOrderById(id);

        if (existOrder === 0) {
            return res.status(404).send("ordem nao existe");
        }

        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function patchOrder(req, res) {
    const { id } = req.params;

    try {
        const { rowCount: existOrder } = await findOrderById(id);

        if (existOrder === 0) {
            return res.status(404).send("ordem nao existe");
        }

        await patchOrderQuery(id);

        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
}