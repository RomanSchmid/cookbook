import { Outlet, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Icon from "@mdi/react";
import { mdiLoading, mdiAlertOctagonOutline } from "@mdi/js";
import './App.css';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [listRecipesCall, setListRecipesCall] = useState({
    state: "pending",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/recipe/list", {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setListRecipesCall({ state: "error", error: responseJson});
      } else {
        setListRecipesCall({ state: "success", data: responseJson});
      }
    });
  }, []);

  function getRecipesListDropdown() {
    switch (listRecipesCall.state) {
      case "pending":
        return (
          <Nav.Link disabled={true}>
            <Icon size={1} path={mdiLoading} spin={true} /> Recipes List
          </Nav.Link>
        );
      case "success":
        return (
          <NavDropdown title="Vyber recept" id="navbarScrollingDropdown">
            {listRecipesCall.data.map((recipe) => {
              return (
                <NavDropdown.Item
                  key={recipe.id}
                  onClick={() =>
                    navigate("/recipeDetail?id=" + recipe.id)
                  }
                >
                  {recipe.name}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        );
      case "error":
        return (
          <div>
            <Icon size={1} path={mdiAlertOctagonOutline} /> Error
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="App">
      <Navbar
        fixed="top"
        expand={"sm"}
        className="mb-3"
        bg="dark"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand>
            My CookBook
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                My CookBook
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {getRecipesListDropdown()}
                <Nav.Link 
                  style={{margin: "0 30px"}}
                  onClick={() => navigate("recipeList")}
                >
                  Recepty
                </Nav.Link>
                <Nav.Link
                  onClick={() => navigate("ingredientList")}
                  >
                  Ingredience
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
}

export default App;