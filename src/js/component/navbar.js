import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-dark mb-0">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="48"
						height="48"
						fill="gray" // Cambiar el relleno a azul
						className="bi bi-house"
						viewBox="0 0 16 16"
					>
						<path
							d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"
							stroke="blue" // Cambiar el color de las líneas a blanco
							strokeWidth="1" // Ajusta el grosor de las líneas si es necesario
						/>
					</svg>
				</span>
			</Link>
			<div className="ml-auto">
				<Link to="/agendas">
					<button className="btn btn-primary">Check the Context in action</button>
				</Link>
			</div>
		</nav>
	);
};
