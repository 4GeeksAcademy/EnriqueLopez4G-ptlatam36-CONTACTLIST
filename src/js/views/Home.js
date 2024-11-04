import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // Asegúrate de crear este archivo para estilos personalizados

export const Home = () => {
    return (
        <div className="home-container mt-0">
            <div className="text-center">
                <h1 className="display-4">GESTIÓN DE AGENDAS</h1>
                <h2 className="mt-4">Proyecto React que demuestra el uso del Context</h2>
                <p className="mt-3" style={{ fontSize: '1.1rem' }}>
                    Cada agenda puede tener múltiples contactos.
                </p>
                <p>
                    Made with <i className="fa fa-heart text-danger" /> by{" "}
                    <a href="http://www.4geeksacademy.com">EnriqueLopez4G</a>
		        </p>
            </div>
        </div>
    );
};

export default Home;
