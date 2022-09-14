import React, { useState, useMemo } from "react";
import RecipeBiggerDetail from "./RecipeBiggerDetail";
import RecipeSmallerDetail from "./RecipeSmallerDetail";
import RecipeTableList from "./RecipeTableList";
import styles from "../css/recipe.module.css";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

function RecipeList(props) {
  const [viewType, setViewType] = useState("bigger");
  const [searchBy, setSearchBy] = useState("");

  const filteredStudentList = useMemo(() => {
    return props.recipeList.filter((item) => {
      return (
        item.name
          .toLocaleLowerCase()
          .includes(searchBy.toLocaleLowerCase()) ||
        item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
      );
    });
  }, [searchBy, props.recipeList]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
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
        {viewType === "bigger" ? <RecipeBiggerDetail recipeList={filteredStudentList} /> : null}
        {viewType === "smaller" ? <RecipeSmallerDetail recipeList={filteredStudentList} /> : null}
        {viewType === "table" ? <RecipeTableList recipeList={filteredStudentList} /> : null}
      </div>
    </div>
  );
}

export default RecipeList;