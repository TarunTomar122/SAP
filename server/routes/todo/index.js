import { Router } from "express";
import models from "../../models";

const router = Router();

router.post("/add", async (req, res) => {
    try {
        const { description, title } = req.body;
        const todo = await models.Todo.create({
            description,
            title,
            date: Date.now(),
        });
        res.json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

router.get("/get", async (req, res) => {
    try {
        const todos = await models.Todo.findAll();
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

router.post("/delete", async (req, res) => {
    try {
        const { title } = req.body;
        const todo = await models.Todo.destroy({
            where: {
                title
            }
        });
        res.json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})



export default router;