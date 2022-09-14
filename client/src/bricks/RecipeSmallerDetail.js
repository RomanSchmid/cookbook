import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/recipe.module.css";

function RecipeSmallerDetail(props) {
    function getRecipeList(recipeList) {
        return recipeList.map((recipe) => {
            return (
                <Card 
                    className={styles.card}>
                    <Card.Body>
                        <div>
                            <h2 
                                className={styles.heading}>
                                {recipe.name}
                            </h2>
                        </div>
                        <div>
                            <img 
                                className={styles.image}
                                src={recipe.imgUri} 
                                alt={recipe.name}
                                width="100%">
                            </img>
                        </div>
                        <div
                            style={{ overflow: "hidden", height: "1.5em"}}
                        >
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

export default RecipeSmallerDetail;