import { Router } from "express";
import models from "../../models";

import Sequelize from "sequelize";

const router = Router();

// Add journal
router.post("/add", async (req, res) => {
    try {

        const { answers, date } = req.body;

        // const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0);
        console.log("date", date)

        // Add journal to person
        await models.Journal.create({
            answers: answers,
            date: date,
        });

        res.status(200).json({ response: "Thought added" });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Get a random entry from the journal
router.get("/getRandom", async (req, res) => {
    try {

        // const { timeFrame } = req.body;

        // Get a random entry from the journal
        const journal = await models.Journal.findOne({
            order: [
                [Sequelize.fn('RANDOM')]
            ]
        });
        res.json(journal);

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Get the journal ratings for a month
router.post("/getMonth", async (req, res) => {
    try {
        const { month, year } = req.body;
        const date = new Date(year, month, 0);
        const dateString = date.toISOString().slice(0, 10);

        console.log("dateString: ", dateString);

        const journals = await models.Journal.findAll({
            where: {
                date: {
                    [Sequelize.Op.gte]: dateString
                }
            }
        });

        var data = [];

        // loop over journals
        for (var journal of journals) {
            const { answers } = journal;
            const { date } = journal;

            // check if there is an entry in the data with the same date 
            var found = false;
            for (var entry of data) {
                if (entry.date == date.toISOString().slice(0, 10)) {
                    found = true;
                }
            }

            // if not, add it
            if (!found) {
                data.push({
                    date: date.toISOString().slice(0, 10),
                    rating: parseInt(answers[4]),
                })
            }
            else {
                // if yes, add the rating to the existing entry 
                for (var entry of data) {
                    if (entry.date == date.toISOString().slice(0, 10)) {

                        // convert the rating to a number
                        var rating = parseInt(answers[4]);
                        entry.rating += rating;
                        // average the rating
                        entry.rating /= 2;
                    }
                }
            }
        }

        res.json({ data });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

// Get the journal for the particular day of the month
router.post("/getDay", async (req, res) => {
    try {
        const { month, year, day } = req.body;
        const date = new Date(year, month, day);
        const dateString = date.toISOString().slice(0, 10);

        console.log("dateString: ", dateString);

        const journals = await models.Journal.findAll({
            where: {
                date: {
                    [Sequelize.Op.gte]: date
                }
            }
        });

        // sort those journals by date
        const sortedJournals = journals.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        // // loop over all the journals
        // for (var journal of sortedJournals) {
        //     // print their id
        //     console.log(journal.id);
        // }

        var journal = sortedJournals[0];

        res.json(journal);

    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})


export default router;