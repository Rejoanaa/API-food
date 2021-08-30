const searchMeal = () => {
    const searchText = document.getElementById('input-search');
    const meal = searchText.value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
    searchText.value = '';
    if (meal == '') {
        alert('please give us an item!');
        const meals = document.getElementById('displayMeals');
        meals.innerHTML = '';
        const mealDetails = document.getElementById('mealDetails');
        mealDetails.textContent = '';
    }
    // console.log(url)
    else {
        fetch(url)
            .then(res => res.json())
            .then(data => displayMeals(data.meals))
    }
}

const displayMeals = (items) => {
    const searchedMeals = document.getElementById('displayMeals')
    // searchedMeals.innerHTML = '';
    // ekoi kaj korbe
    searchedMeals.textContent = '';
    const mealDetails = document.getElementById('mealDetails');
    mealDetails.textContent = '';

    if (items != null) {
        items.forEach(meals => {
            // console.log(meals)
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `<div class="col">
        <div onclick='loadMealDetails(${meals.idMeal})' class="card h-100">
            <img src="${meals.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meals.strMeal}</h5>
                <p class="card-text">${meals.strInstructions.slice(0, 200)}</p>
            </div>
        </div>
    </div> `;
            searchedMeals.appendChild(div)

        });
    }
    else {
        alert('please enter a valid food name')
    }
}
const loadMealDetails = (mealId) => {
    // console.log(mealId)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))

}

const displayMealDetails = (meals) => {
    // console.log(details)
    const mealDetails = document.getElementById('mealDetails');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
     <img src="${meals.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meals.strMeal}</h5>
        <p class="card-text">${meals.strInstructions.slice(0, 200)}</p>
        <a href="${meals.strYoutube}" class="btn btn-primary">See more</a>
    </div>`
    mealDetails.appendChild(div)
}