import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import cookbookLogo from "../images/cookbook-logo.svg";

import RecipeList from '../bricks/RecipeList';

const cookbook = {
  name: "CookBook"
};

function displayHeading(heading) {
  return <h1 className="heading">My <span>{heading}</span></h1>
}

function RecipeListPage() {
  const [recipesLoadCall, setRecipesLoadCall] = useState({ // React Hook, který ukládá aktuální stav načítání receptů
    state: "pending",
  });

  const handleRecipeAdded = (recipe) => { // Funkce na aktualizaci seznamu receptů po přidání nového receptu
    if (recipesLoadCall.state === "success") {
      let recipeList = [...recipesLoadCall.data]; // Kopie seznamu receptů

      if (recipe.id) {
        recipeList = recipeList.filter((rec) => rec.id !== recipe.id); // Odfiltrování editovaného receptu ze seznamu receptů (aby nedošlo k zobrazení duplikátu)
      }

      setRecipesLoadCall({
        state: "success",
        data: [...recipeList, recipe] // Přidání nového/editovaného receptu do seznamu receptů
      });
    }
  }

  let [searchParams] = useSearchParams(); // React Hook pro čtení a upravování stringu v URL
  /* console.log(searchParams); */

  let recipeId = searchParams.get("id"); //Uloží do konstanty recipeId hodnotu URL parametru "id", v současné chvíli vrací null
  /* console.log(recipeId); */

  useEffect(() => { // React Hook pro volání serveru a stažení požadovaného receptu (pokud proměnná recipeId null, dojde ke stažení celého listu receptů)
    /* console.log(recipeId); */
    fetch(`http://localhost:3000/recipe/list?id=${recipeId}`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json(); // Uloží stažená data (recept / seznam receptů) do konstanty responseJson
      if (response.status >= 400) {
        setRecipesLoadCall({ state: "error", error: responseJson});
      } else {
        setRecipesLoadCall({ state: "success", data: responseJson});
      }
    });
  }, [recipeId]); // Volání severu probíhá po každé, když se změní hodnota proměnné recipeId

  const [ingredientsLoadCall, setIngredientsCall] = useState({ // Ukládá aktuální stav načítání ingrediencí
    state: "pending",
  });

  useEffect(() => { // React Hook pro volání serveru a stažení seznamu receptů
    fetch("ingredient/list", {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json(); // Uloží stažená data (seznam ingrediencí) do konstanty responseJson
      if (response.status >= 400) {
        setIngredientsCall({ state: "error", error: responseJson});
      } else {
        setIngredientsCall({ state: "success", data: responseJson});
      }
    });
  }, []); // Volání serveru probíhá pouze jednou

  function getChild() { // Funkce pro zobrazení seznamu receptů na základě dat v recipesLoadCall
    if (recipesLoadCall.state === "success" && ingredientsLoadCall.state === "success") { // Zobrazení proběhne jedině tehdy, když jsou úspěšně stažena data v recipesLoadCall a ingredientsLoadCall
      return (
        <>
          <div className="container">
            {displayHeading(cookbook.name)}
            <p>Vivamus suscipit tortor <span>eget felis porttitor</span> volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <img
              className="logo"
              src={cookbookLogo}
              alt="Logo">
            </img>
            <div className="RecipeList">
              {/* Komponentě RecipeList jsou předány propsy s daty o seznamu receptů a seznamu ingrediencí */}
              <RecipeList 
                recipeList={recipesLoadCall.data}
                ingredientsList={ingredientsLoadCall.data}
                onComplete={(recipe) => handleRecipeAdded(recipe)} // Propa s funkcí na aktualizaci seznamu receptů po přidání nového receptu
              />
            </div>
          </div>
        </>
      );
    } else if (recipesLoadCall.state === "error" || ingredientsLoadCall.state === "error" ) {
        return ( // Pokud fetch dat seznamu receptů nebo seznamu ingrediencí skončí chybou, zobrazí se na obrazovce uživatele "Error"
          <div>Error</div>
        );
    } else {
        return (
          <div>Pending</div>
        );
    }
  }  

  return getChild();
}

export default RecipeListPage;