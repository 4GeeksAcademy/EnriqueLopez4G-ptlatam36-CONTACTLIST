import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

const AddNewContact = () => {
    const { parametroSlug } = useParams();
    const { actions } = useContext(Context);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleAddNewContact = async (e) => {
        e.preventDefault();
        const newContact = { name, phone, email, address };

        // Llama a la acción AddAgenda y AddContact
        await actions.addContact(newContact,parametroSlug);

        // Resetea los campos del formulario
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
    };

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-lg mb-4">
                        <div className="card-header text-center bg-primary text-white">
                            <h5 className="mb-0">Agenda: {parametroSlug}</h5>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img
                                    src="https://static.kiteprop.com/kp/blogposts/23/2ac064/lg/2ac064ce99001ce4c7e09060034c0f9d.jpg"
                                    className="card-img"
                                    alt="Imagen de Agenda"
                                    style={{ height: "150px", objectFit: "cover" }}
                                />
                            </div>
                            <div className="col-md-8 d-flex align-items-center">
                                <div className="card-body">
                                    <h2 className="text-center mb-4">Agregar Nuevo Contacto</h2>
                                    <form onSubmit={handleAddNewContact}>
                                        <div className="form-group mb-3">
                                            <label htmlFor="name">Nombre</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="phone">Teléfono</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="email">Correo Electrónico</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="address">Dirección</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block">
                                            <i className="bi bi-person-plus"></i> Agregar Contacto
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewContact;
