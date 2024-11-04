import React, {useState} from "react";
import { Link } from "react-router-dom";
import ContactList from "./ContactList";

const CentroDeMando = ( {slug} )=> {
    const [showAddContact, setShowAddContact] = useState(false);
    const [showContacts, setShowContacts] = useState(false);

    const handlelistContactsClick =()=> {
        setShowContacts(true);
    }
    const handleAddContactClick = () => {
        setShowAddContact(true); 
    };
    return (
        <div className="container mt-2">
          <div className="text-center mb-2">
            <h5>Agenda:</h5>
            <h3>{slug}</h3>
          </div>
               <div className="d-flex justify-content-around mb-4 align-items-center">
                <div className="me-3"> {/* Margen a la derecha para separar las imágenes */}
                    <img 
                        src="https://static.kiteprop.com/kp/blogposts/23/2ac064/lg/2ac064ce99001ce4c7e09060034c0f9d.jpg" 
                        alt="Nueva Imagen" 
                        className="img-fluid"
                        style={{ maxHeight: "100px" }}
                    />
                </div>
                <div>
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/7133/7133332.png" 
                        alt="Usuarios" 
                        className="img-fluid"
                        style={{ maxHeight: "100px" }}
                    />
                </div>
            </div>

        <div className="d-flex justify-content-around">
            <Link to = {`/contactlist/${slug}`}  className="btn btn-primary">
                Listar Contactos
            </Link>
            <Link to= {`/add-new-contact/${slug}`} className="btn btn-success">
                Agregar Contacto
            </Link>
        </div>
            {showContacts && <ContactList/>}
    </div>
    )
}

export default CentroDeMando;