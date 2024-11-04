import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useParams } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateContact from './UpdateContact';
import './ContactList.css'; 

const ContactList = () => {
    const { parametroSlug } = useParams();
    const { store, actions } = useContext(Context);
    const [contactIdToUpdate, setContactIdToUpdate] = useState(null);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {
        actions.loadContacts(parametroSlug);
    }, [parametroSlug, actions]);

    const confirmDelete = async () => {
        if (contactToDelete) {
            await actions.deleteContact(parametroSlug, contactToDelete);
            setShowDeleteModal(false);
            setContactToDelete(null);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card-header text-center bg-primary text-white">
                <h5 className="mb-0">Agenda: {parametroSlug}</h5>
            </div>
            <h2 className="text-center mb-4">Lista de Contactos</h2>
            <div className="list-group">
                {store.contacts?.map(contact => (
                    <div key={contact.id} className="list-group-item contactItem d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-1">{contact.name}</h5>
                        </div>
                        <div>
                            <Button variant="warning" size="sm" onClick={() => {
                                setContactIdToUpdate(contact.id);
                                setShowUpdateModal(false);
                                setTimeout(() => setShowUpdateModal(true), 0);
                            }}>
                                Actualizar
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => { setContactToDelete(contact.id); setShowDeleteModal(true); }}>
                                Eliminar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación de eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Estás seguro de que deseas eliminar este contacto?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={confirmDelete}>Sí, eliminar</Button>
                </Modal.Footer>
            </Modal>

            <UpdateContact
                contactId={contactIdToUpdate}
                showModal={showUpdateModal}
                handleClose={() => {
                    setShowUpdateModal(false);
                    setContactIdToUpdate(null);
                }}
            />
        </div>
    );
};

export default ContactList;
