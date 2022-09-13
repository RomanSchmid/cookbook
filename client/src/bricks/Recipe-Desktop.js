import React from "react";
import Card from "react-bootstrap/Card";

function Recipe(props) {
    return (
        <Card 
            style={{ width: '20rem' }}>
            <Card.Body>
                <div>
                    <h2 style={{ fontSize: "1rem" }}>
                        {props.recipe.name}
                    </h2>
                </div>
                <div>
                    <img 
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