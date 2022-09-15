//import Icon from "@mdi/react";
//import { mdiClipboardListOutline } from "@mdi/js";
import { useState } from 'react'
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

function NewRecipe() {
    const [isModalShown, setShow] = useState(false);
  
    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    const [formData, setFormData] = useState({
        name: "",
        procedure: "",
        ingredients: [],
        amount: 0,
        unit: "",
    });

    const setField = (name, val) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            newData[name] = val;
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
                                onChange={(e) => setField("procedure", e.target.value)}
                            />
                        </Form.Group>

                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Ingredience</Form.Label>
                                <Form.Select
                                    onChange={(e) => setField("ingredients", e.target.value)}
                                >
                                    <option value=""></option>
                                    <option>Cibule</option>
                                    <option>Mrkev</option>
                                    <option>Brambory</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Počet</Form.Label>
                                <Form.Control 
                                        type="number"
                                        rows={1}
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