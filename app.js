const recipeContainer  = document.querySelector(".card-container");
const searchBox  = document.querySelector(".search-box");
const searchBtn  = document.querySelector(".btn");
const popUP = document.querySelector(".pop-up--container");
const ingridient = document.querySelector(".ingridient");
const cross = document.querySelector(".cross");
const popHeading  = document.querySelector(".pop-heading")

 async function fetchRecipe(query){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    let data = await res.json();
    let meals= data.meals;
    console.log(meals);

    meals.forEach((meal)=>{
        let card = document.createElement("div");
        card.classList.add("card");

        let image = document.createElement("img");
        image.src = meal.strMealThumb;
        image.classList.add("img")

        let aboutRecipe = document.createElement("div");
        aboutRecipe.classList.add("about");

        let recipeName  = document.createElement("h3");
        recipeName.innerText = meal.strMeal;

        let dishName  = document.createElement("h3");
        dishName.innerText = meal.strArea;

        let catagory = document.createElement("p");
        catagory.innerText = meal.strCategory;

        let btn = document.createElement("button");
        btn.innerText = "view recipe"
        btn.classList.add("recipe-btn");

        btn.addEventListener("click",function(){
            popUP.classList.add("visible");
            popup(meal);
         })

        recipeContainer.appendChild(card);
        
        card.appendChild(image);
        card.appendChild(aboutRecipe);
        aboutRecipe.appendChild(recipeName);
        aboutRecipe.appendChild(dishName);
        aboutRecipe.appendChild(catagory);
        aboutRecipe.appendChild(btn);
    });
}

cross.addEventListener("click",function(){
    popUP.classList.toggle("visible");
})

function fetchIngri(meal){
    let ingridientsList = ""
   for(let i = 1; i<=20;i++){
    let ingridients = meal[`strIngredient${i}`]
    if(ingridients){
        let measure = meal[`strMeasure${i}`];
        ingridientsList += `<li>${measure} ${ingridients}</li>`
    }
    else{
        break;
    }
   }
   return ingridientsList;
}
function popup(meal){
    popHeading.innerText =meal.strMeal;
    ingridient.innerHTML = `
         <ul>${fetchIngri(meal)}</ul>
        <div>
            <h3>Instruction</h3>
            <p>${meal.strInstructions}</p>
        </div>

    `
    
}
searchBtn.addEventListener("click",function(e){
    recipeContainer.innerHTML= ""
    e.preventDefault();
    let input = searchBox.value.trim();
    fetchRecipe(input);
})
