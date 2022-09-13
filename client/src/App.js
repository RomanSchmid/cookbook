import './App.css';
import cookbookLogo from "./cookbook-logo.svg"

const cookbook = {
  name: "Cookbook"
};

function displayHeading(heading) {
  return <h1>My <span>{heading}</span></h1>
}

function App() {
  return (
    <div className="App">
      {displayHeading(cookbook.name)}
      <p>Vivamus suscipit tortor <span>eget felis porttitor</span> volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <img 
        src={cookbookLogo}
        alt="Logo" 
        width="300"
        height="300"
        >
      </img>
    </div>
  );
}

export default App;
