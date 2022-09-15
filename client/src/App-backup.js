import { Outlet, useNavigate } from "react-router-dom";
import './App.css';
import { useEffect, useState } from "react";
import RecipeList from './bricks/RecipeList';
import cookbookLogo from "./images/cookbook-logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import recipeListData from "./recipes.json"

const cookbook = {
  name: "Cookbook"
};

function displayHeading(heading) {
  return <h1 className="heading">My <span>{heading}</span></h1>
}

function App() {
  let navigate = useNavigate();

  const [recipesLoadCall, setRecipesLoadCall] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch("/recipe/list", {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipesLoadCall({ state: "error", error: responseJson});
      } else {
        setRecipesLoadCall({ state: "success", data: responseJson});
      }
    });
  }, []) // prázdné pole podmínek znamená, že kód se spustí pouze jednou

  function getChild() {
    switch (recipesLoadCall.state) {
      case "pending":
        console.log(recipesLoadCall.state)
        return (
           <div>Pending</div>
        );
      case "success":
        console.log(recipesLoadCall.state)
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
                <RecipeList recipeList={recipeListData} />
              </div>
            </div>
          </>
        );
      case "error":
        console.log(recipesLoadCall.state)
        return (
          <div>Error</div>
        );
      default:
        return null;
    }
  }
  return (
    <div className="App">
      <div>/ page</div>
      <Outlet />
    </div>
  )
  //return <div className="App">{getChild()}</div>;
}

export default App;