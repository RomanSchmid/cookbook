import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import cookbookLogo from "../images/cookbook-logo.svg";
import RecipeList from '../bricks/RecipeList';
//import recipeListData from "../recipes.json"

const cookbook = {
  name: "CookBook"
};

function displayHeading(heading) {
  return <h1 className="heading">My <span>{heading}</span></h1>
}

function RecipeListPage() {
  const [recipesLoadCall, setRecipesLoadCall] = useState({
    state: "pending",
  });

  let [searchParams] = useSearchParams();

  const recipeId = searchParams.get("id");

  useEffect(() => {
    fetch(`http://localhost:3000/recipe/list?id=${recipeId}`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipesLoadCall({ state: "error", error: responseJson});
      } else {
        setRecipesLoadCall({ state: "success", data: responseJson});
      }
    });
  }, [recipeId])

  const [ingredientsCall, setIngredientsCall] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch("ingredient/list", {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setIngredientsCall({ state: "error", error: responseJson});
      } else {
        setIngredientsCall({ state: "success", data: responseJson});
      }
    });
  }, []);

  function getChild() {
    switch (recipesLoadCall.state) {
      case "pending":
        /* console.log(recipesLoadCall.state) */
        return (
           <div>Pending</div>
        );
      case "success":
        /* console.log(recipesLoadCall.state) */
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
                <RecipeList 
                  recipeList={recipesLoadCall.data}
                  ingredientsList={ingredientsCall.data}
                />
              </div>
            </div>
          </>
        );
      case "error":
        /* console.log(recipesLoadCall.state) */
        return (
          <div>Error</div>
        );
      default:
        return null;
    }
  }
    
  return getChild();
    
}
  
export default RecipeListPage;