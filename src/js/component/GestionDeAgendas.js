import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import CentroDeMando from './CentroDeMando';
import { Modal } from 'react-bootstrap';

const GestionDeAgendas = () => {
    const { store, actions } = useContext(Context);
    const [newAgendaName, setNewAgendaName] = useState('');
    const [selectedSlug, setSelectedSlug] = useState('');
    const [showCentroDeMando, setShowCentroDeMando] = useState(false);
    const [shouldReload, setShouldReload] = useState(false); // Para controlar recarga manual solo asi resolvi

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
            setShouldReload(true); // Indica que se necesita recargar pila
        }
    };

    

    const handleDeleteAgenda = async (slug) => {
        if (slug.trim()) {
            await actions.deleteAgenda(slug);
            setShouldReload(true); // Indica que se necesita recargar pila
        }
    };

    useEffect(() => {
        actions.loadAgendas();
        setShouldReload(false); // Resetea mi batiseñal
    }, [shouldReload]); // Solo recarga cuando shouldReload cambia a true

    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">Gestión de Agendas</h2>
            <div className="w-75" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <ul className="list-group list-unstyled">
                    <div className="row g-2">
                        {store.agendas?.map((agenda) => (
                            <li key={agenda.id} className="list-group-item col-12 d-flex justify-content-around">
                                <div className="col-3 text-center">{agenda.slug}</div>
                                <div className="col-3 text-center">
                                    <button className="btn btn-danger btn-block" onClick={() => handleDeleteAgenda(agenda.slug)}>
                                        Eliminar
                                    </button>
                                </div>
                                <div className="col-3 text-center">
                                    <Link to={`/ContactList/${agenda.slug}`}>
                                        <button className="btn btn-primary btn-block">Show Contacts</button>
                                    </Link>
                                </div>
                                <div className="col-3 text-center">
                                    <button className="btn btn-success btn-block" onClick={() => handleAddContact(agenda.slug)}>
                                        Add Contact
                                    </button>
                                </div>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
            <form onSubmit={handleAddAgenda} className="form-inline mt-3">
                <div className="form-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre de la nueva agenda"
                        value={newAgendaName}
                        onChange={(e) => setNewAgendaName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success mb-2 ml-2">
                    Añadir Agenda
                </button>
            </form>

            <Modal show={showCentroDeMando} onHide={handleClose} dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Gestion de Contactos</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    <CentroDeMando slug={selectedSlug} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default GestionDeAgendas;
