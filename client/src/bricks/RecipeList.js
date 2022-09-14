import React, { useState } from "react";
import RecipeBiggerDetail from "./RecipeBiggerDetail";
import RecipeSmallerDetail from "./RecipeSmallerDetail";
import styles from "../css/recipe.module.css";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

/* import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline } from "@mdi/js"; */

function RecipeList(props) {
  const [viewType, setViewType] = useState("bigger");
  const display = viewType === "bigger";

  return (
    <div>
      <Navbar bg="light">
        <div className={styles.navBar}>
          <Navbar.Brand>Seznam receptů</Navbar.Brand>
            <div className={styles.navBarButtons}>
              <Button
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

        {viewType === "bigger" ? (
            <RecipeBiggerDetail recipeList={props.recipeList} />
        ) : (
            <RecipeSmallerDetail recipeList={props.recipeList} />
        )}
      </div>
    </div>
  );
}

export default RecipeList;