require("dotenv").config();
const express = require("express");
const db = require("./db");
const morgan = require('morgan');
const app = express();

app.use(express.json());

//GET all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM restaurants");
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows,
            },
        });
    } catch (error) {
        console.log(error);
    };
});

// GET a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);

    try {
        const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        });
    } catch (error) {
        console.log(error);
    };

});

// Create a Restaurant
app.post("/api/v1/restaurants", async (req,res) => {
    console.log(req.body);

    try {
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *", 
            [req.body.name, req.body.location. req.body.price_range]
        );
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        });
    } catch (error) {
        console.log(error);
    };
});

// Update a Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        });
    } catch (error) {
        console.log(error);
    };
});

//Delete a Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        res.status(204).json({
            status: "success"
        });
    } catch (error) {
        console.log(error);
    };
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is up and listening on port ${PORT}`);
});

