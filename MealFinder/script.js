// MAKING SURE DOM LOADED FRIST
window.onload = function () {
  const getMeal = document.getElementById("get-meal");
  //   ADDING CLICK EVENT TO THE BUTTON
  getMeal.addEventListener("click", getData);
  // FETCHING DATA FROM THE API
  function getData() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((res) => {
        createMeal(res.meals[0]);
      });
  }
  const createMeal = (meal) => {
    const ingredients = [];
    const measure = [];
    // GRABING INGREDIENTS/MEASURS UP TO 20
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        // STOP IF NO MORE INGREDIENTS OR MEASURS
        break;
      }
    }

    // SHOWING DATA INTO THE DOM
    document.getElementById("meal-container").innerHTML = `
		
		<ul class="heading">
			<li><strong>Origin:</strong> ${meal.strArea}</li>
			<li><strong>Category:</strong> ${meal.strCategory}</li>
			<li><strong>Food Name:</strong> ${meal.strMeal}</li>
		</ul>

		<div class="food-section">
			<ul class="list">
				<li><strong>Ingredients:</strong> ${ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")}
				${measure.map((measure) => `<li>${measure}`).join("")}
			</ul>
			<div class="img">
				<img src="${meal.strMealThumb}" alt="Meal Image">
			</div>
		</div>
		
		<div class="instruction">
			<p><strong>Instruction:</strong> ${meal.strInstructions}</p>
		</div>
	
		<div class="youtube"><strong>How to Cook Watch on YouTube:</strong>
		<div class="videoWrapper">
		<iframe width="420" height="315"
		src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
		</iframe>
	</div>
		</div>
		
		`;

    // console.log(meal.strIngredients)
    // console.log(meal.strMeasure)
    // console.log(meal.strMeal)
    // console.log(meal.strArea)
    // console.log(meal.strInstructions)
  };
};
