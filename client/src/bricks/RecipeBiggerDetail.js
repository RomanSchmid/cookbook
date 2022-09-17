import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/recipe.module.css";
//import NewRecipe from "./NewRecipe";

function RecipeBiggerDetail(props) {
    function getRecipeList(recipeList) {
        return recipeList.map((recipe) => {
            return (
                <Card 
                    className={styles.card}
                    key={recipe.id}
                >
                    <Card.Body>
                        <div className={styles.headingContainer}>
                            <h2
                                className={styles.heading}>
                                {recipe.name}
                            </h2>
                            <div>
{/*                                 <NewRecipe
                                    recipe={recipe}
                                /> */}
                            </div>
                        </div>
                        <div>
                            <img 
                                className={styles.image}
                                src={recipe.imgUri} 
                                alt={recipe.name}
                                width="100%">
                            </img>
                        </div>
                        <div>
                            <p
                                className={styles.paragraph}>
                                {recipe.description}
                            </p>
                        </div>
                    </Card.Body>
                </Card>
            );
        });
    }
    return getRecipeList(props.recipeList);
}

export default RecipeBiggerDetail;