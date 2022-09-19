import React from "react";
import Table from "react-bootstrap/Table";
import styles from "../css/recipe.module.css";
import CreateOrEditRecipe from "./CreateOrEditRecipe";

function RecipeTableList({ recipeList, ingredientsList, onComplete, onDelete }) {
    return (
      <Table>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { recipeList.map((recipe) => {
            return (
              <tr key={recipe.id}>
                <td>
                  <div className={styles.headingContainer}>
                    <div>{recipe.name}</div>
                    <div>
                      <CreateOrEditRecipe
                        ingredients={ingredientsList}
                        recipe={recipe}
                        onComplete={onComplete}
                        onDelete={onDelete}
                      />
                      </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

export default RecipeTableList;