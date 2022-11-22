require("dotenv").config();
const express = require("express");


const app = express();

app.get("/restaurants", (req, res) => {
    res.json({
        status: "success",
        restaurant: "McDonalds"
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is up and listening on port ${PORT}`);
});

