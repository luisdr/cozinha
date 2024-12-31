const recipesFolder = 'recipes'; // Folder where recipes are stored
const recipeList = document.getElementById('recipe-list');
const recipesIndexFile = `${recipesFolder}/recipes.json`;

// Function to fetch and display recipes
async function loadRecipes() {
    try {
        const response = await fetch(recipesIndexFile);
        if (!response.ok) throw new Error('Failed to fetch recipe index');
        const recipeFiles = await response.json();
        
        for (const file of recipeFiles) {
            try {
                const recipeResponse = await fetch(`${recipesFolder}/${file}`);
                if (!recipeResponse.ok) throw new Error(`Failed to fetch ${file}`);
                const text = await recipeResponse.text();
                displayRecipe(file.replace('.txt', ''), text);
            } catch (error) {
                console.error(error.message);
            }
        }
    } catch (error) {
        console.error('Error loading recipes:', error.message);
    }
}

// Function to display a single recipe
function displayRecipe(title, content) {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');

    const recipeTitle = document.createElement('h2');
    recipeTitle.textContent = title;

    const recipeContent = document.createElement('p');
    recipeContent.textContent = content;

    recipeDiv.appendChild(recipeTitle);
    recipeDiv.appendChild(recipeContent);

    recipeList.appendChild(recipeDiv);
}

// Load recipes on page load
loadRecipes();
