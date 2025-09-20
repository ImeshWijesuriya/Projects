const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");
const cors = require("cors");

app.use(cors());

app.use(express.json());

const recipesFilePath = path.join(__dirname, "recipes.json");

app.get("/", (req, res) => {
    res.send("Hello world, home page here!")
});

app.get("/recipes", (req, res) => {
    fs.readFile(recipesFilePath, "utf-8", (err, data) => {
        const recipes = JSON.parse(data);
        res.json(recipes);
    })
    
});

app.post("/recipes", (req, res) => {

    const newRecipe = req.body;

    fs.readFile(recipesFilePath, "utf8", (err, data) => {
        const recipes = JSON.parse(data);
        recipes.push(newRecipe);
        console.log(recipes);

        fs.writeFile(recipesFilePath, JSON.stringify(recipes), () => {});
    })

    res.send("Recipe added, storing dishes")
});

app.listen(port, () => {
    console.log("Server is running on http://localhost:", port)
});