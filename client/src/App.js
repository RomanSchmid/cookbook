import './App.css';
import RecipeList from './bricks/RecipeList';
import cookbookLogo from "./images/cookbook-logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import recipeListData from "./recipes.json"

const cookbook = {
  name: "Cookbook"
};

function displayHeading(heading) {
  return <h1 style={{ fontSize: "5rem" }}>My <span>{heading}</span></h1>
}

function App() {
  return (
    <div className="App">
      <div className="Container">
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
    </div>
  );
}

export default App;