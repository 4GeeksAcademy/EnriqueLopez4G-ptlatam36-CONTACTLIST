import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import CentroDeMando from './CentroDeMando';
import { Modal } from 'react-bootstrap';
import './GestionDeAgendas.css';

const GestionDeAgendas = () => {
   const { store, actions } = useContext(Context);
   const [newAgendaName, setNewAgendaName] = useState('');
   const [selectedSlug, setSelectedSlug] = useState('');
   const [showCentroDeMando, setShowCentroDeMando] = useState(false);

   //investigando, tuve que agregar el siguiente truco
   const [shouldReload, setShouldReload] = useState(false);
    // está utilizando en este código para controlar cuándo se debe volver a cargar la lista de agendas.
    //   Es una especie de "bandera" que indica al componente que necesita recargarse después de realizar 
    //   ciertas acciones, como agregar o eliminar una agenda. 
    //   Esto es necesario porque el estado de las agendas se carga inicialmente 
    //   en el useEffect a través de la acción actions.loadAgendas(), 
    //   pero si se agregan o eliminan agendas, >(>creo que todos le estamos metiendo mano a las agendes, me vine a dar cuenta despues)
    //   necesitamos que esa lista se actualice automáticamente.

   const handleAddContact = (slug) => {
      setSelectedSlug(slug);
      setShowCentroDeMando(true);
   };

   const handleClose = () => setShowCentroDeMando(false);

   const handleAddAgenda = async (e) => {
      e.preventDefault();
      if (newAgendaName.trim()) {
         await actions.addAgenda({ name: newAgendaName });
         setNewAgendaName('');
         setShouldReload(true); //afirmativo pareja
      }
   };

   const handleDeleteAgenda = async (slug) => {
      if (slug.trim()) {
         await actions.deleteAgenda(slug);
         setShouldReload(true);
      }
   };

   useEffect(() => {
      actions.loadAgendas();
      setShouldReload(false);
   }, [shouldReload]);

   return (
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
         <h2 className="text-center mb-4">Gestión de Agendas</h2>
         <div className="w-75 d-flex justify-content-center align-items-center">
            <ul className="list-group list-unstyled">
               {store.agendas?.map((agenda) => (
                  <li key={agenda.id} className="list-group-item d-flex justify-content-between align-items-center mb-3 HoverEffect">
                     <div className="flex-grow-1">{agenda.slug}</div>
                     <div className="d-flex">
                        <button className="btn btn-danger mx-1" onClick={() => handleDeleteAgenda(agenda.slug)} style={{ minWidth: '150px', maxWidth: '150px' }}>
                           Eliminar
                        </button>
                        <Link to={`/ContactList/${agenda.slug}`} className="mx-1">
                           <button className="btn btn-primary" style={{ minWidth: '150px', maxWidth: '150px' }}>
                              Mostrar Contactos
                           </button>
                        </Link>
                        <button className="btn btn-success mx-1" onClick={() => handleAddContact(agenda.slug)} style={{ minWidth: '150px', maxWidth: '150px' }}>
                           Agregar Contacto
                        </button>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
         <form onSubmit={handleAddAgenda} className="d-flex mt-4">
            <input
               type="text"
               className="form-control me-2"
               placeholder="Nombre de la nueva agenda"
               value={newAgendaName}
               onChange={(e) => setNewAgendaName(e.target.value)}
               required
            />
            <button type="submit" className="btn btn-success">Añadir Agenda</button>
         </form>
         <Modal show={showCentroDeMando} onHide={handleClose} dialogClassName="custom-modal">
            <Modal.Header closeButton>
               <Modal.Title>Gestión de Contactos</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
               <CentroDeMando slug={selectedSlug} />
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default GestionDeAgendas;
