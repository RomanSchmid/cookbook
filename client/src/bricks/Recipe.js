import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/recipe.module.css";

function Recipe(props) {
    return (
        <Card 
            className={styles.card}>
            <Card.Body>
                <div>
                    <h2 
                        className={styles.heading}>
                        {props.recipe.name}
                    </h2>
                </div>
                <div>
                    <img 
                        className={styles.image}
                        src={props.recipe.imgUri} 
                        alt={props.recipe.name}
                        width="100%">
                    </img>
                </div>
                <div>
                    <p>
                        {props.recipe.description}
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Recipe;