/****************************************************loading & navbar************************************************************/
$(document).ready(function () {
    $('#loading').fadeOut(1000,function()
    {
        $('body').css('overflow', 'visible');
    });
});

$('.closeIcon').click(function colse() { 
    let navbarWidth = $('#navbar').outerWidth();  
    $('#navbar').animate({'left':-navbarWidth} ,500)
    $('#navbar .right-side').animate({'left':'0'},500)
    $('.closeIcon').fadeOut(0);
    $('.openIcon').fadeIn(0);
});
$('.openIcon').click(function () { 
    let navbarWidth = $('#navbar').outerWidth();  
    $('#navbar').animate({'left':'0'} ,500)
    $('#navbar .right-side').animate({'left':navbarWidth},500)
    $('.closeIcon').fadeIn(0);
    $('.openIcon').fadeOut(0);
    $('.closeIcon').removeClass('d-none');
});

/********************************************************random meals************************************************************/
var allMeals = [];
async function getRandomMeals(name = '')
{
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    var meals = await response.json();
    allMeals=meals.meals
    displayMeals()
}   
getRandomMeals()

function displayMeals()
{
    var item = ''
    for (let i = 0; i < allMeals.length; i++) {
        item+= `
                <div class="col-lg-3 col-md-4 col-sm-6 meals">
                    <div class='meal position-relative' onclick=goToMeal("${allMeals[i].idMeal}")>
                        <img  class="  w-100  meal-img" src=" ${allMeals[i].strMealThumb}">
                        <div class=' px-3 layer d-flex justify-content-start align-items-center'>
                            <h3>${allMeals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
                `
    }
    document.querySelector(".meals").innerHTML = item;
}
var recipe = [];
async function goToMeal(id)
{
    $('.search').addClass('d-none');
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    var recipeOfMeal = await response.json();
    recipe = recipeOfMeal.meals;    
    var items = '';
    // var number = Array.from(Array(20).keys())
    for (let i = 0; i < recipe.length; i++) {
        
        items += `
        <div class="col-lg-4 col-md-12">
            <div class='imgOfMeal'>
                <img class="w-100" src="${recipe[i].strMealThumb}">
                <h1 class='text-center text-white pt-3'>${recipe[i].strMeal}</h1>
            </div>
        </div>
        <div class="col-lg-8 col-md-12 instructions">
            <div class='captionOfMeal d-flex flex-column'>
                <h3 class="text-white" >Instructions</h3>
                <p class="parag-color">${recipe[i].strInstructions}</p>
                <span class="text-white py-2 fw-bold">Area : <span class="fw-light"> ${recipe[i].strArea}</span></span>
                <span class="text-white py-2 fw-bold">Category : <span class="fw-light"> ${recipe[i].strCategory}</span></span>
                <h3 class='text-white my-3'>Recipes :</h3>
                <div class="d-flex flex-wrap">
                <span class="str">${recipe[i].strMeasure1} ${recipe[i].strIngredient1}</span>
                <span class="str">${recipe[i].strMeasure2} ${recipe[i].strIngredient2}</span>
                <span class="str">${recipe[i].strMeasure3} ${recipe[i].strIngredient3}</span>
                <span class="str">${recipe[i].strMeasure4} ${recipe[i].strIngredient4}</span>
                <span class="str">${recipe[i].strMeasure5} ${recipe[i].strIngredient5}</span>
                </div>
                <h3 class='text-white my-3' >Tags :</h3>
                <span class="str-tag">${recipe[i].strTags}</span>
                <div class="py-4 d-flex justify-content-center" >
                    <a class="btn btn-success mx-2" href="${recipe[i].strSource}" target="_blank">Source</a>
                    <a class="btn btn-danger mx-2" href="${recipe[i].strYoutube}" target="_blank">Youtube</a>
                </div>
            </div>
        </div>
        `   
    }
    document.querySelector(".meals").innerHTML = items;
}

/********************************************************categories************************************************************/
$('#categories').click(function () { 
    $('.search').addClass('d-none');
    $('.main').removeClass('d-none');
    let navbarWidth = $('#navbar').outerWidth();  
    $('#navbar').animate({'left':-navbarWidth} ,500)
    $('#navbar .right-side').animate({'left':'0'},500)
    $('.closeIcon').fadeOut(0);
    $('.openIcon').fadeIn(0);
    
    var categories = [];
    async function getCategories()
    {
        var response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        var meals = await response.json();
        categories=meals.categories
        displayCategories()
    }   
    getCategories()

    function displayCategories()
    {
        var item = ''
        for (let i = 0; i < categories.length; i++) {
            item+= `
                    <div class="col-lg-3 col-md-4 col-sm-6 categories">
                        <div class='categorie position-relative' onclick=goToFilterCategories("${categories[i].strCategory}")>
                            <img  class="  w-100  categorie-img" src=" ${categories[i].strCategoryThumb}">
                            <div class=' px-3 layer text-center'>
                                <h3 class="pt-2">${categories[i].strCategory}</h3>
                                <p>${categories[i].strCategoryDescription}</p>
                            </div>
                        </div>
                    </div>
                    `
        }
        document.querySelector(".meals").innerHTML = item;
    }
    
});
var filterCategories = [];
async function goToFilterCategories(name)
{
    
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
    var categories = await response.json();
    filterCategories = categories.meals; 
    console.log(filterCategories)   
    var items = '';
    for (let i = 0; i < filterCategories.length; i++) {
        items += `
                    <div class="col-lg-3 col-md-4 col-sm-6 meals">
                        <div class='meal position-relative' onclick=goToMeal("${filterCategories[i].idMeal}")>
                            <img  class="  w-100  meal-img" src=" ${filterCategories[i].strMealThumb}">
                            <div class=' px-3 layer d-flex justify-content-start align-items-center'>
                                <h3>${filterCategories[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>
        `   
    }
    document.querySelector(".meals").innerHTML = items;
}

/********************************************************area************************************************************/
$('#area').click(function () { 
    $('.search').addClass('d-none');
    $('.main').removeClass('d-none');
    let navbarWidth = $('#navbar').outerWidth();  
    $('#navbar').animate({'left':-navbarWidth} ,500)
    $('#navbar .right-side').animate({'left':'0'},500)
    $('.closeIcon').fadeOut(0);
    $('.openIcon').fadeIn(0);
    
    var areas = [];
    async function getAreas()
    {
        var response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        var meals = await response.json();
        areas=meals.meals
        displayAreas()
    }   
    getAreas()

    function displayAreas()
    {
        var item = ''
        for (let i = 0; i < areas.length; i++) {
            item+= `
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="text-center area-box" onclick=goToCountryMeals("${areas[i].strArea}")>
                            <i class="fa-solid fa-city"></i>
                            <h2 class="text-white pt-3">${areas[i].strArea}</h2>
                        </div>
                    </div>
                    `
        }
        document.querySelector(".meals").innerHTML = item;
    }
    
});
var countries = [];
async function goToCountryMeals(country)
{
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    var country = await response.json();
    countries=country.meals
    displayCountryMeals()
}   

function displayCountryMeals()
{
    var item = ''
    for (let i = 0; i < countries.length; i++) {
        item+= `
                <div class="col-lg-3 col-md-4 col-sm-6 meals">
                    <div class='meal position-relative' onclick=goToMeal("${countries[i].idMeal}")>
                        <img  class="  w-100  meal-img" src=" ${countries[i].strMealThumb}">
                        <div class=' px-3 layer d-flex justify-content-start align-items-center'>
                            <h3>${countries[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
                `
    }
    document.querySelector(".meals").innerHTML = item;
}

/********************************************************Ingredients************************************************************/
$('#ingredients').click(function () { 
    $('.search').addClass('d-none');
    $('.main').removeClass('d-none');
    let navbarWidth = $('#navbar').outerWidth();  
    $('#navbar').animate({'left':-navbarWidth} ,500)
    $('#navbar .right-side').animate({'left':'0'},500)
    $('.closeIcon').fadeOut(0);
    $('.openIcon').fadeIn(0);
    
    var ingredients = [];
    async function getIngredients()
    {
        var response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        var meals = await response.json();
        ingredients=meals.meals
        displayIngredients()
    }   
    getIngredients()

    function displayIngredients()
    {
        var item = ''
        for (let i = 0; i < 14; i++) {
            item+= `
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="text-center ingredients-box" onclick=goToIngredientsMeals("${ingredients[i].strIngredient}")>
                            <i class="fa-solid fa-utensils"></i>
                            <h3 class="text-white pt-3">${ingredients[i].strIngredient}</h3>
                            <p class="text-white">${ingredients[i].strDescription}</p>
                        </div>
                    </div>
                    `
        }
        document.querySelector(".meals").innerHTML = item;
    }
    
});
var meals = [];
async function goToIngredientsMeals(ingredients)
{
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    var meal = await response.json();
    meals=meal.meals
    displayIngredientsMeals()
}   

function displayIngredientsMeals()
{
    var item = ''
    for (let i = 0; i < meals.length; i++) {
        item+= `
                <div class="col-lg-3 col-md-4 col-sm-6 meals">
                    <div class='meal position-relative' onclick=goToMeal("${meals[i].idMeal}")>
                        <img  class="  w-100  meal-img" src=" ${meals[i].strMealThumb}">
                        <div class=' px-3 layer d-flex justify-content-start align-items-center'>
                            <h3>${meals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
                `
    }
    document.querySelector(".meals").innerHTML = item;
}

/********************************************************Searching************************************************************/
var filter = []
async function searchFirstLetterMeals(letter = "a")
{
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    var meals = await response.json();
    filter=meals.meals
    displaysearchFirstLetterMeals()
    
}   
function displaysearchFirstLetterMeals()
{
    var item = ''
    for (let i = 0; i < filter.length; i++) {
        item+= `
                <div class="col-lg-3 col-md-4 col-sm-6 meals">
                    <div class='meal position-relative' onclick=goToMeal("${filter[i].idMeal}")>
                        <img  class="  w-100  meal-img" src=" ${filter[i].strMealThumb}">
                        <div class=' px-3 layer d-flex justify-content-start align-items-center'>
                            <h3>${filter[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
                `
    }
    document.querySelector(".meals").innerHTML = item;
}
$('#search').click(function () { 
    $('.contact').addClass('d-none');
    $('.main').removeClass('d-none');
    let navbarWidth = $('#navbar').outerWidth();  
    $('#navbar').animate({'left':-navbarWidth} ,500)
    $('#navbar .right-side').animate({'left':'0'},500)
    $('.closeIcon').fadeOut(0);
    $('.openIcon').fadeIn(0);
    $('.search').removeClass('d-none');
    $('.main').addClass('d-none');
    var nameSearch = document.getElementById('nameSearch');
    var letterSearch = document.getElementById('letterSearch');

    $(nameSearch).keyup(function () { 
        getRandomMeals(nameSearch.value)
        $('.main').removeClass('d-none');
    });
    $(letterSearch).keyup(function (e) { 
        if(e.keyCode < 65 || e.keyCode > 90 || e.key == 'q' || e.key == 'u' || e.key == 'x' || e.key == 'z' || e.key == 'Q' || e.key == 'U' || e.key == 'X' || e.key == 'Z')
        {
            $('.main').addClass('d-none');
        }
        else
        {
            searchFirstLetterMeals(letterSearch.value)
            $('.main').removeClass('d-none');
        }
    });
});

/********************************************************contact us************************************************************/
$('#contactUs').click(function () { 
    $('.search').addClass('d-none');
    $('.main').removeClass('d-none');
    let navbarWidth = $('#navbar').outerWidth();  
    $('#navbar').animate({'left':-navbarWidth} ,500)
    $('#navbar .right-side').animate({'left':'0'},500)
    $('.closeIcon').fadeOut(0);
    $('.openIcon').fadeIn(0);
    $('.contact').removeClass('d-none');
    $('.main , .search').addClass('d-none');
    
    var nameInput = document.getElementById('nameInput');
    var emailInput = document.getElementById('emailInput');
    var numberInput = document.getElementById('numberInput');
    var ageInput = document.getElementById('ageInput');
    var passwordInput = document.getElementById('passwordInput');
    var rePasswordInput = document.getElementById('rePasswordInput');
    var submitBtn = document.querySelector('.submitBtn')

    var nameAlert = document.querySelector('.nameAlert');
    var emailAlert = document.querySelector('.emailAlert');
    var numberAlert = document.querySelector('.numberAlert');
    var ageAlert = document.querySelector('.ageAlert');
    var passwordAlert = document.querySelector('.passwordAlert');
    var rePasswordAlert = document.querySelector('.rePasswordAlert');
    
    var rejexForName = /^[A-Z][a-z-( )*]{2,15}$/
    var rejexForEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var rejexForNumber = /^[0][0-9]{10}$/
    var rejexForAge = /^[1-9][0-9]$/
    var rejexForPassword =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    function enableBtn()
    {
        if(rejexForName.test(nameInput.value) && rejexForEmail.test(emailInput.value) && rejexForNumber.test(numberInput.value) && rejexForAge.test(ageInput.value) && rejexForPassword.test(passwordInput.value) && (rePasswordInput.value == passwordInput.value))
        {
            submitBtn.removeAttribute('disabled')
        } 
    }

    nameInput.onkeyup = function()
    {
        enableBtn()
        if(rejexForName.test(nameInput.value))  
        {
            nameInput.classList.add('is-valid');
            nameInput.classList.remove('is-invalid');
            nameAlert.classList.add('d-none');
            
        }
        else                                        
        {
            nameInput.classList.add('is-invalid');
            nameInput.classList.remove('is-valid');
            nameAlert.classList.remove('d-none');
            
        }
    }
    
    emailInput.onkeyup = function()
    {
        enableBtn()
        if(rejexForEmail.test(emailInput.value))  
        {
            emailInput.classList.add('is-valid');
            emailInput.classList.remove('is-invalid');
            emailAlert.classList.add('d-none');
            
        }
        else                                        
        {
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
            emailAlert.classList.remove('d-none');
            
        }
    }
    
    numberInput.onkeyup = function()
    {
        enableBtn()
        if(rejexForNumber.test(numberInput.value))  
        {
            numberInput.classList.add('is-valid');
            numberInput.classList.remove('is-invalid');
            numberAlert.classList.add('d-none');
            
        }
        else                                        
        {
            numberInput.classList.add('is-invalid');
            numberInput.classList.remove('is-valid');
            numberAlert.classList.remove('d-none');
            
        }
    }  
    
    ageInput.onkeyup = function()
    {
        enableBtn()
        if(rejexForAge.test(ageInput.value))  
        {
            ageInput.classList.add('is-valid');
            ageInput.classList.remove('is-invalid');
            ageAlert.classList.add('d-none');
            
        }
        else                                        
        {
            ageInput.classList.add('is-invalid');
            ageInput.classList.remove('is-valid');
            ageAlert.classList.remove('d-none');
            
        }
    }

    passwordInput.onkeyup = function()
    {
        enableBtn()
        if(rejexForPassword.test(passwordInput.value))  
        {
            passwordInput.classList.add('is-valid');
            passwordInput.classList.remove('is-invalid');
            passwordAlert.classList.add('d-none');
            
        }
        else                                        
        {
            passwordInput.classList.add('is-invalid');
            passwordInput.classList.remove('is-valid');
            passwordAlert.classList.remove('d-none');
            
        }
    }

    rePasswordInput.onkeyup = function()
    {
        enableBtn()
        if(rePasswordInput.value == passwordInput.value)  
        {
            rePasswordInput.classList.add('is-valid');
            rePasswordInput.classList.remove('is-invalid');
            rePasswordAlert.classList.add('d-none');
            
        }
        else                                        
        {
            rePasswordInput.classList.add('is-invalid');
            rePasswordInput.classList.remove('is-valid');
            rePasswordAlert.classList.remove('d-none');
            
        }
    }
})

