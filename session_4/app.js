
document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:3000/recipes");
    const recipes = await response.json();
    for (recipe of recipes) {
        const recipeContainer = document.createElement("div");

        const nameTag = document.createElement("h3");
        nameTag.innerText = recipe.name;
        recipeContainer.appendChild(nameTag);

        const cuisineTag = document.createElement("p");
        cuisineTag.innerText = recipe.cuisine;
        recipeContainer.appendChild(cuisineTag);

        const timeTag = document.createElement("p");
        timeTag.innerText = recipe.time;
        recipeContainer.appendChild(timeTag);

        const ingredientsListTag = document.createElement("ul");

        for (ingredient of recipe.ingredients) {
            const ingredientsListItemTag = document.createElement("li");
            ingredientsListItemTag.innerText = ingredient;
            ingredientsListTag.appendChild(ingredientsListItemTag);
        }


        recipeContainer.appendChild(ingredientsListTag);

        const stepsListTag = document.createElement("ol");

        for (step of recipe.steps) {
            const stepsListItemTag = document.createElement("li");
            stepsListItemTag.innerText = "steps";
            stepsListTag.appendChild(stepsListItemTag);
        }


        recipeContainer.appendChild(stepsListTag);

        const recipeList = document.querySelector("#recipe-list");
        recipeList.appendChild(recipeContainer);
    }

    const recipeForm = document.querySelector("form")
    recipeForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newRecipe = {};

        newRecipe.name = event.target.name.value;
        newRecipe.cuisine = event.target.cuisine.value;
        newRecipe.time = event.target.time.value;
        const ingredientsText = event.target.ingredients.value;
        newRecipe.ingredients = ingredientsText.split(/\r?\n/);

        const stepsText = event.target.steps.value;
        newRecipe.steps = stepsText.split(/\r?\n/);
    
        fetch("http://localhost:3000/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRecipe)
        })
    })

})



