import React, { useState, useMemo } from "react";

import RecipeBiggerDetail from "./RecipeBiggerDetail";
import RecipeSmallerDetail from "./RecipeSmallerDetail";
import RecipeTableList from "./RecipeTableList";
import CreateOrEditRecipe from "./CreateOrEditRecipe";

import styles from "../css/recipe.module.css";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

function RecipeList({ ingredientsList, recipeList }) {

  const [viewType, setViewType] = useState("bigger"); // Stav pro zobrazení seznamu receptů (bigger, smaller, table)

  const [searchBy, setSearchBy] = useState(""); // Stav pro vyhledávání receptů

  const filteredRecipeList = useMemo(() => { // React Hook pro zapamatování hodnoty (filtrovaného seznamu receptů)
    return recipeList.filter((item) => {
      return (
        item.name
          .toLocaleLowerCase()
          .includes(searchBy.toLocaleLowerCase()) ||
        item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
      );
    });
  }, [searchBy, recipeList]); // Memo Hook se spustí pouze pokud se změní hodnota searchBy nebo recipeList

  function handleSearch(event) { // Funkce, která se spustí při stisknutí tlačítka vyhledat
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function handleSearchDelete(event) { // Funkce, která se bude spouštět při změně hodnoty vstupu pro vyhledávání
    if (!event.target.value) setSearchBy(""); // Pokud na vstupu nebude hodnota (uživatel stiskne X), bude vyhledávání zrušeno
  }

  return (
    <div>
      <Navbar bg="white">
        <div className={styles.navBar}>
          <Navbar.Brand>Seznam receptů</Navbar.Brand>
            <div>
              <Form className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                  id={"searchInput"}
                  style={{ maxWidth: "150px" }}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearchDelete}
                />
                <Button
                  style={{ margin: "0 5px" }}
                  variant="outline-primary"
                  type="submit"
                >
                  <Icon size={1} path={mdiMagnify} />
                </Button>
              </Form>
            </div>
            <div>
              {/* Komponentě CreateOrEditRecipe je předán seznam ingrediencí a klíč (id ingredience) */}
              <CreateOrEditRecipe
                key={ingredientsList.id}
                ingredients={ingredientsList}
              />
            </div>
            <div className={styles.navBarButtons}>
              <Button
                className={"d-none d-md-block"}
                variant="outline-primary"
                onClick={() => setViewType("bigger")}
              >
                {"Bigger"}
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => setViewType("smaller")}
              >
                {"Smaller"}
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => setViewType("table")}
              >
                {"Table"}
              </Button>          
            </div>
        </div>
      </Navbar>
      <div className={styles.recipeList}>
        {/* Na zákldaě hodnoty viewType se zobrazí korespondující komponenta */}
        {viewType === "bigger" ? <RecipeBiggerDetail recipeList={filteredRecipeList} /> : null}
        {viewType === "smaller" ? <RecipeSmallerDetail recipeList={filteredRecipeList} /> : null}
        {viewType === "table" ? <RecipeTableList recipeList={filteredRecipeList} /> : null}
      </div>
    </div>
  );
}

export default RecipeList;