import { useEffect, useState, useContext } from 'react'
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";

import UserContext from "../UserProvider";

import Icon from '@mdi/react';
import { mdiPencilOutline } from "@mdi/js";
import DeleteRecipe from './DeleteRecipe';

function CreateOrEditRecipe({ ingredients, onComplete, recipe, onDelete }) {
    const { isAuthorized } = useContext(UserContext);

    const defaultForm = { // Výchozí formát objektu receptu
        name: "",
        description: "",
        imgUri: "https://cdn4.iconfinder.com/data/icons/food-and-equipment-outline/32/dish-256.png",
        ingredients: [
            {
                id: "",
                amount: "",
                unit: ""
            }
        ]
    }

    const [isModalShown, setShow] = useState(false); // Stav, ve kterém se nachází zobrazení modálního okna (ve výchozím stavu je skryté)
    const [validated, setValidated] = useState(false); // Stav, ve kterém se nachází formulář (zda je správně vyplněný a může být odeslán)
    const [formData, setFormData] = useState(defaultForm); // Stav, ve kterém se nachází objekt receptu
    const [recipeAddCall, setRecipeAddCall] = useState({ // Stav, ve kterém se nachází odesílání receptu na server
        state: "inactive" // Výchozí stav je inactive
    });
    const [deleteRecipeError, setDeleteRecipeError] = useState("");

    useEffect(() => {
        if (recipe) {
            setFormData({
                name: recipe.name,
                description: recipe.description,
                imgUri: "https://cdn4.iconfinder.com/data/icons/food-and-equipment-outline/32/dish-256.png",
                ingredients: [
                    {
                        id: recipe.ingredients[0].id,
                        amount: recipe.ingredients[0].amount,
                        unit: recipe.ingredients[0].unit
                    }
                ]
            })
        }
    }, [recipe])
  
    const handleShowModal = () => setShow(true); // Funkce, která zobrazí modální okno
    const handleCloseModal = () => { // Funkce, která proběhne při odeslání nového receptu nebo při stisknutí X na modálním okně
        setShow(false); // Uzavření modálního okna
        setFormData(defaultForm); // Po uzavření modálního okna, nastaví hodnoty nově vytvářeného objektu receptu na výchozí
    }

    const setIngredientsField = (name, val) => { // Funkce, která přenastavuje hodnoty v objektu receptu (formData), resp. pouze jeho property ingredients
        const newData = { ...formData }; // Vytvoření kopie stávajícího objektu receptu (formData)
        const newFirstItem = { ...formData.ingredients[0] }; // Vytvoření kopie stávajícího objektu ingrediencí
        newFirstItem[name] = val; // Přířazení hodnoty k příslušné property v nově vytvořené kopii objektu ingrediencí
        newData.ingredients = [newFirstItem] // Přiřazení pole objektů (1 objekt ingrediencí) k ingredients property v nově vytvořené kopii newData

        return setFormData(newData); // Přepsání hodnot objektu ve formData hodnotami z objektu newData
    }

    const setField = (name, val) => { // Funkce, která přenastavuje hodnoty v objektu receptu (formData)
        const newData = { ...formData }; // Vytvoření kopie stávajícího objektu receptu (formData)
        newData[name] = val; // Přířazení hodnoty k příslušné property v nově vytvořené kopie newData

        return setFormData(newData); // Přepsání hodnot objektu ve formData hodnotami z objektu newData
    }

    const payload = { // Objekt nově vytvořeného nebo upravovaného receptu, který bude odeslán na server
        ...formData,
        id: recipe ? recipe.id : null // Pokud se recept upravuje, je do objektu přidána property id
    }

    const handleSubmit = async (e) => { // Funkce pro odeslání nového receptu na server
        e.preventDefault(); // Zabránění refreshe stránky po stistknutí odesílacího tlačítka
        /* e.stopPropagation(); */

        const form = e.currentTarget; // uložení elementu Form do konstanty form

        if (!form.checkValidity()) { // Ověření, že všechny inputy byly vyplněny správně a formulář je možno odeslat (vrací boolean)
            setValidated(true);
        }

        setRecipeAddCall({ state: "pending" }); // Nastavení odesílání receptu na server do stavu pending
        fetch(`/recipe/${recipe ? 'update' : 'create'}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload) // Odesílaný recept na server
          }).then(async (response) => {
            const responseJson = await response.json(); // Uložený recept na serveru s přiděleným id
            if (response.status >= 400) {
                setRecipeAddCall({ state: "error", error: responseJson}); // Nastavení odesílání receptu na server do stavu error
            } else {
                setRecipeAddCall({ state: "success", data: responseJson}); // Nastavení odesílání receptu na server do stavu success

                if (typeof onComplete === 'function') {
                    onComplete(responseJson); // Předaná funkce z RecipeListPage -> RecipeList -> CreateOrEditRecipe, která přidá nový recept do seznamu receptů a aktualizuje ho
                }

                handleCloseModal(); // Uzavření modálního okna
            }
        });
    }

    return (
        <>
            <Modal show={isModalShown} onHide={handleCloseModal}>
                <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                    <Modal.Header closeButton>
                        { recipe ? (
                            <Modal.Title>Upravit recept</Modal.Title>
                        ) : (
                            <Modal.Title>Vytvořit recept</Modal.Title>
                        )}                     
                    </Modal.Header>
                    <Modal.Body>
                        {deleteRecipeError && // Pokud mazání známky neproběhne úspěšně, zobrazí se alert s patřičným errorem
                            <Alert variant='danger'>
                                Error: {deleteRecipeError}
                            </Alert>
                        }
                        <Form.Group 
                            className="mb-3" 
                            controlId="nazev"
                        >
                            <Form.Label>Název</Form.Label>
                            <Form.Control 
                                type="text"
                                value={formData.name}
                                onChange={(e) => setField("name", e.target.value)}
                                maxLength={20}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Zadejte název receptu!
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group 
                            className="mb-3" 
                            controlId="postup"
                        >
                            <Form.Label>Postup</Form.Label>
                            <Form.Control 
                                as="textarea"
                                value={formData.description}
                                rows={5}
                                onChange={(e) => setField("description", e.target.value)}
                                required
                                maxLength={300}
                            />
                            <Form.Control.Feedback type="invalid">
                                Zadejte popis receptu!
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Ingredience</Form.Label>
                                <Form.Select
                                    value={formData.ingredients[0].id}
                                    onChange={(e) => setIngredientsField("id", e.target.value)}
                                    required
                                >   
                                    <option value=""></option>
                                    {ingredients.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Zadejte ingredienci!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Množství</Form.Label>
                                <Form.Control 
                                        type="number"
                                        value={formData.ingredients[0].amount}
                                        min={0}
                                        max={1000}
                                        rows={1}
                                        placeholder="0"
                                        onChange={(e) => setIngredientsField("amount", parseInt(e.target.value))}
                                        required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Zadejte množství!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Jednotka</Form.Label>
                                <Form.Select
                                    value={formData.ingredients[0].unit}
                                    onChange={(e) => setIngredientsField("unit", e.target.value)}
                                    required
                                >
                                    <option></option>
                                    <option>ks</option>
                                    <option>g</option>
                                    <option>ml</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Zadejte jednotku!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            { recipeAddCall.state === 'error' && 
                                <div className="text-danger">Error: {recipeAddCall.error.errorMessage}</div> 
                            }
                        </div>
                        <Button 
                            variant="primary" 
                            type="submit"
                        >
                            { recipe ? "Upravit" : "Vytvořit" }
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {isAuthorized ? (
                 recipe ? (
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Icon 
                        size={1} 
                        path={mdiPencilOutline} 
                        style={{ color: 'rgb(11, 94, 215)', cursor: 'pointer' }} 
                        onClick={handleShowModal}
                        /> 
                        <DeleteRecipe
                            recipe={recipe}
                            onError={(error) => setDeleteRecipeError(error)} // Propsa, která bude zachycovat případný error při mazání známky
                            onDelete={onDelete}
                        ></DeleteRecipe>
                    </div>
                ) : (
                    <Button
                    variant="primary"
                    onClick={handleShowModal}
                    >
                    {"+"}
                    </Button>
                )
                ) : (null)
            }
        </>
    )
  }
  
export default CreateOrEditRecipe;