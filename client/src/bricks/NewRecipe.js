//import Icon from "@mdi/react";
//import { mdiClipboardListOutline } from "@mdi/js";
import { useState } from 'react'
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

function NewRecipe(props) {
    /* console.log(props.ingredients) */
    const [isModalShown, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
/*     const [recipeAddCall, setRecipeAddCall] = useState({
        state: "inactive"
    });

    const defaultForm = {
        "name": "",
        "description": "",
        "imgUri": "",
        "ingredients": [
            {
                "id": "",
                "amount": "",
                "unit": ""
            }
        ]
    } */
  
    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    const [formData, setFormData] = useState({
        "name": "",
        "description": "",
        "imgUri": "",
        "ingredients": [
            {
                "id": "",
                "amount": "",
                "unit": ""
            }
        ]
    });

    const setField = (name, val) => {
        /* console.log(val) */

        return setFormData((formData) => {
            const newData = { ...formData };          

            if (name === "id") {
                newData["ingredients"][name] = val;
            } else if (name === "amount") {
                newData["ingredients"][name] = parseInt(val);
            } else if (name === "unit") {
                newData["ingredients"][name] = val;
            } else {
                newData[name] = val;
            }
            return newData
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        /* e.stopPropagation(); */
        const form = e.currentTarget; 
        /* console.log(form.checkValidity()) */

        const payload = {
            ...formData,
        }

        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        console.log(payload);
    }

    return (
        <>
            <Modal show={isModalShown} onHide={handleCloseModal}>
                <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Vytvořit recept</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group 
                            className="mb-3" 
                            controlId="nazev"
                        >
                            <Form.Label>Název</Form.Label>
                            <Form.Control 
                                type="text"
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
                                    onChange={(e) => setField("id", e.target.value)}
                                    required
                                >   
                                    <option value=""></option>
                                    {props.ingredients.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Zadejte ingredienci!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Množství</Form.Label>
                                <Form.Control 
                                        type="number"
                                        min={0}
                                        max={1000}
                                        rows={1}
                                        placeholder="0"
                                        onChange={(e) => setField("amount", e.target.value)}
                                        required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Zadejte množství!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Jednotka</Form.Label>
                                <Form.Select
                                    onChange={(e) => setField("unit", e.target.value)}
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
                        <Button 
                            variant="primary" 
                            type="submit"
                        >
                            + Vytvořit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Button
                variant="primary"
                onClick={handleShowModal}
            >
                {"+"}
            </Button>
        </>
    )
  }
  
export default NewRecipe;