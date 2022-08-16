import dotenv from "dotenv";
import { findCake, insertCake } from "../repositories/cakeRepository.js";

dotenv.config();

export async function postCake(req, res) {
    const { name, price, image, description } = req.body;

    try {
        const { rowCount: cakeName} = await findCake(name);

        if (cakeName > 0) {
            return res.status(409).send("bolo ja existe")
        }

        await insertCake(name, price, image, description);

        res.status(201).send("cake criado com sucesso")
    } catch (error) {
        res.status(500).send(error.message);
    }
}