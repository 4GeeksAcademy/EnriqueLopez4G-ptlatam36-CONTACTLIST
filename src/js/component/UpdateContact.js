import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateContact = ({ contactId, showModal, handleClose }) => {
    const { parametroSlug } = useParams();
    const { actions } = useContext(Context);
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            if (contactId) {
                const data = await actions.getContact(parametroSlug, contactId);
                setContact(data);
            }
        };
    
        setContact(null); // Restablece el contacto cuando contactId cambia
        fetchContact();
    }, [contactId, parametroSlug]); 
    
    
    

    const handleUpdateContact = async (e) => {
        e.preventDefault();
        await actions.updateContact(parametroSlug, contactId, contact);
        handleClose();
    };

    if (!contact) return null; // Espera a que el contacto se cargue

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Actualizar Contacto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleUpdateContact}>
                    {['name', 'phone', 'email', 'address'].map((field) => (
                        <div key={field} className="form-group mb-3">
                            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input
                                type={field === 'email' ? 'email' : 'text'}
                                className="form-control"
                                id={field}
                                value={contact[field]}
                                onChange={(e) => setContact({ ...contact, [field]: e.target.value })}
                                required
                            />
                        </div>
                    ))}
                    <div className="d-flex justify-content-between mt-3">
                        <Button type="submit" className="btn btn-primary flex-fill me-2">
                            <i className="bi bi-person-check"></i> Actualizar Contacto
                        </Button>
                        <Button variant="secondary" className="btn btn-secondary flex-fill ms-2" onClick={handleClose}>
                            Regresar
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateContact;
