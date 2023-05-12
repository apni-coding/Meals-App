
// Get necessary DOM elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const fav =  document.getElementById('fav');
const reset = document.getElementById('reset');
// Initialize an empty array to store fav meals
const favoritesList = [];

//take value from user and fetch in api
searchButton.addEventListener('click', () => {
  const searchQuery = searchInput.value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      if (data.meals === null) {
        alert('No meals found for this search query.');
      } else {
        displaySearchResults(data.meals);
      }
    })
    .catch(error => {
      console.error(error);
    });
});

// Define a function to display meal items on screen
function displaySearchResults(meals) {
  searchResults.innerHTML = '';
 
  
  meals.forEach(meal => {
    const mealElement = document.createElement('div');
    mealElement.classList.add('meal');

    const mealImage = document.createElement('img');
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;
    mealElement.appendChild(mealImage);

    const mealName = document.createElement('h2');
    mealName.innerText = meal.strMeal;
    mealElement.appendChild(mealName);

    const mealIngredients = document.createElement('ul');
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        const ingredient = document.createElement('li');
        ingredient.innerText = `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`;
        mealIngredients.appendChild(ingredient);
      } 
      // else {
        // alert('not meal found');
        // alert('No ingredients found for this meal');
        // return;
        // break;
      // }
      
    }

    mealElement.appendChild(mealIngredients);

    const mealDescription = document.createElement('p');
    mealDescription.classList.add('description');
    mealDescription.innerText = meal.strInstructions;
    mealElement.appendChild(mealDescription);

    const readMoreButton = document.createElement('button');
    readMoreButton.innerHTML = 'Read More';
    readMoreButton.addEventListener('click', () => {
      mealDescription.classList.toggle('show');
    });
    mealElement.appendChild(readMoreButton);

    const favoriteButton = document.createElement('button');
    favoriteButton.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
    favoriteButton.addEventListener('click', () => {
      addToFavorites(meal);
    });
    mealElement.appendChild(favoriteButton);

    searchResults.appendChild(mealElement);
  });
}


// // Define a function to add a meal in favorites
function addToFavorites(meal) {
  if (!favoritesList.includes(meal)) {
    favoritesList.push(meal);
    alert(`${meal.strMeal} has been added to your favorites.`);
  } else {
    alert(`${meal.strMeal} is already in your favorites.`);
  }
}

fav.addEventListener('click', showFav);


// Define a function to show all fav meal which are in favr array
function showFav() {
  searchResults.innerHTML = '';
  
  if (favoritesList.length === 0) {
    const noFavMessage = document.createElement('p');
    noFavMessage.innerText = 'You have no favorite meals.';
    searchResults.appendChild(noFavMessage);
  } else {
    favoritesList.forEach(meal => {
      const mealElement = document.createElement('div');
      mealElement.classList.add('meal');

      const mealImage = document.createElement('img');
      mealImage.src = meal.strMealThumb;
      mealImage.alt = meal.strMeal;
      mealElement.appendChild(mealImage);

      const mealName = document.createElement('h2');
      mealName.innerText = meal.strMeal;
      mealElement.appendChild(mealName);

      const mealIngredients = document.createElement('ul');
      for (let i = 1; i <= 20; i++) {
          if (meal[`strIngredient${i}`]) {
              const ingredient = document.createElement('li');
              ingredient.innerText = `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`;
              mealIngredients.appendChild(ingredient);
          } else {
              break;
          }
      }
      mealElement.appendChild(mealIngredients);

      const removeButton = document.createElement('button');
      removeButton.innerHTML = '<i class="fas fa-trash"></i> Remove from Favorites';
      removeButton.addEventListener('click', () => {
          removeFromFavorites(meal);
      });
      mealElement.appendChild(removeButton);

      searchResults.appendChild(mealElement);
    });
  }
}

// Define a function to remove meal from fav
function removeFromFavorites(meal) {
  const mealIndex = favoritesList.findIndex(fav => fav.idMeal === meal.idMeal);
  if (mealIndex !== -1) {
    favoritesList.splice(mealIndex, 1);
    showFav();
    alert(`${meal.strMeal} has been removed from your favorites.`);
  }
}

// Define a function to reset
reset.addEventListener('click', function() {
    searchResults.innerHTML = '';
});
