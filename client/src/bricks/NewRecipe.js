//import Icon from "@mdi/react";
//import { mdiClipboardListOutline } from "@mdi/js";
import { useState } from 'react'
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

function NewRecipe(props) {
    /* console.log(props.ingredients) */
    const [isModalShown, setShow] = useState(false);
  
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

        const payload = {
            ...formData,
        }

        console.log(payload);
    }

    return (
        <>
            <Modal show={isModalShown} onHide={handleCloseModal}>
                <Form onSubmit={(e) => handleSubmit(e)}>
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
                            />
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
                            />
                        </Form.Group>

                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Ingredience</Form.Label>
                                <Form.Select
                                    onChange={(e) => setField("id", e.target.value)}
                                >   
                                    <option value=""></option>
                                    {props.ingredients.map(opt => <option value={opt.id}>{opt.name}</option>)}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Počet</Form.Label>
                                <Form.Control 
                                        type="number"
                                        min="0"
                                        rows={1}
                                        placeholder="0"
                                        onChange={(e) => setField("amount", e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Jednotka</Form.Label>
                                <Form.Select
                                    onChange={(e) => setField("unit", e.target.value)}
                                >
                                    <option></option>
                                    <option>ks</option>
                                    <option>g</option>
                                    <option>ml</option>
                                </Form.Select>
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