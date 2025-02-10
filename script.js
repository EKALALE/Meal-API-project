document.addEventListener("DOMContentLoaded", () => {
    fetchMeals();
});

// Function to fetch meals from API
function fetchMeals(searchTerm = "") {
    const mealContainer = document.getElementById("meal-container");
    mealContainer.innerHTML = "Loading...";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            mealContainer.innerHTML = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    const mealDiv = document.createElement("div");
                    mealDiv.classList.add("meal");

                    mealDiv.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <h3>${meal.strMeal}</h3>
                        <p>${meal.strInstructions.substring(0, 100)}...</p>
                    `;

                    mealContainer.appendChild(mealDiv);
                });
            } else {
                mealContainer.innerHTML = "<p>No meals found.</p>";
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Search Function
function searchMeals() {
    const searchInput = document.getElementById("search-input").value;
    fetchMeals(searchInput);
}

// Contact Form Submission
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("form-response").innerText = "Message sent successfully!";
    this.reset();
});