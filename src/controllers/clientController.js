import dotenv from "dotenv";
import { insertClient, selectClientOrderById } from "../repositories/clientRepository.js";

dotenv.config();

export async function postClient(req,res) {
    const { name, address, phone } = req.body;

    try {
        await insertClient(name, address, phone);

        res.status(201).send("cliente criado com sucesso");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getClientOrderById(req, res) {
    const {id} = req.params;

    try {
        const {rows: order, rowCount: existOrder} = await selectClientOrderById(id);

        if(existOrder === 0) {
            return res.status(404).send("cliente nao tem pedido ou nao existe");
        }

        res.status(200).send(order)
    }catch(error) {
        res.status(500).send(error.message);
    }
}