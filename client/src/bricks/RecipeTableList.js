import React from "react";
import Table from "react-bootstrap/Table";
import Icon from '@mdi/react';
import { mdiPencilOutline } from "@mdi/js";
import styles from "../css/recipe.module.css";

function RecipeTableList(props) {
    return (
      <Table>
        <thead>
          <tr>
            <th>Název receptu</th>
          </tr>
        </thead>
        <tbody>
          {props.recipeList.map((recipe) => {
            return (
              <tr key={recipe.id}>
                <td>
                  <div className={styles.headingContainer}>
                    <div>{recipe.name}</div>
                    <div>
                      <Icon 
                          size={1} 
                          path={mdiPencilOutline} 
                          style={{ color: 'blue', cursor: 'pointer' }} 
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