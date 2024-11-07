import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateContact from './UpdateContact';
import './ContactList.css';

const ContactList = () => {
    const { parametroSlug } = useParams();
    const { store, actions } = useContext(Context);
    const [localContacts, setLocalContacts] = useState(store.contacts);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [contactIdToUpdate, setContactIdToUpdate] = useState(null);

    useEffect(() => {
        if (localContacts.length === 0) {
            actions.loadContacts(parametroSlug).then(() => setLocalContacts(store.contacts));
        }
    }, [parametroSlug, store.contacts, actions, localContacts.length]);

    const handleDelete = async () => {
        if (contactToDelete) {
            await actions.deleteContact(parametroSlug, contactToDelete);
            setLocalContacts(prevContacts => prevContacts.filter(c => c.id !== contactToDelete));
            setShowDeleteModal(false);
        }
    };

    const handleUpdateContact = (updatedContact) => {
        setLocalContacts(prevContacts => 
            prevContacts.map(contact => 
                contact.id === updatedContact.id ? updatedContact : contact
            )
        );
        setShowUpdateModal(false);
    };

    return (
        <div className="container mt-5">
            <div className="card-header text-center bg-primary text-white">
                <h5 className="mb-0">Agenda: {parametroSlug}</h5>
            </div>
            <h2 className="text-center mb-4">Lista de Contactos</h2>
            <div className="list-group">
                {localContacts.map(contact => (
                    <div key={contact.id} className="list-group-item contactItem d-flex justify-content-between align-items-center">
                        <h5 className="mb-1">{contact.name}</h5>
                        <div>
                            <Button variant="warning" size="sm" onClick={() => {
                                setContactIdToUpdate(contact.id);
                                setShowUpdateModal(true);
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
                    <Button variant="danger" onClick={handleDelete}>Sí, eliminar</Button>
                </Modal.Footer>
            </Modal>

            <UpdateContact
                contactId={contactIdToUpdate}
                showModal={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                onUpdateContact={handleUpdateContact}  
            />
        </div>
    );
};

export default ContactList;
