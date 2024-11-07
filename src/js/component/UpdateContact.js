import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Modal, Button } from 'react-bootstrap';

const UpdateContact = ({ contactId, showModal, handleClose, onUpdateContact }) => {
  const { parametroSlug } = useParams(); // Obtenemos el slug de la URL
  const { actions } = useContext(Context);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      if (contactId && parametroSlug) {
        const data = await actions.getContact(parametroSlug, contactId); // Aseguramos que estamos obteniendo el contacto correcto
        setContact(data);
      }
    };

    setContact(null); // Limpiamos el estado anterior si cambia el contacto o el slug
    fetchContact();
  }, [contactId, parametroSlug, actions]); // Dependemos de contactId y parametroSlug

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contact) {
      await actions.updateContact(parametroSlug, contactId, contact);
      onUpdateContact(contact);  // Llamamos al callback para actualizar el contacto en la lista
      handleClose();
    }
  };

  if (!contact) return null; // Espera a que se cargue el contacto

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Contacto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
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
            <Button type="submit" className="btn btn-primary flex-fill me-2">Actualizar Contacto</Button>
            <Button variant="secondary" className="btn btn-secondary flex-fill ms-2" onClick={handleClose}>Regresar</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateContact;
