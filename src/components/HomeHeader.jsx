import { useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

function HomeHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const whatsappNumber = "59892334060";
    const whatsappMessage = "Hola, me gustaría obtener información sobre...";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    const instagramLink = "https://www.instagram.com/ab_piscinas/";

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <header className="header">
                <div className="header-container">
                    <a className="logo" href="#inicio" aria-label="Ir al inicio" onClick={closeMenu}>
                        <img src="/logo_simple_invisible.png" alt="Andrés Berrutti Piscinas y Calefactores" />
                    </a>

                    <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
                        <a href="/catalogo" onClick={closeMenu}>Catálogo</a>
						<a href="#servicios" onClick={closeMenu}>Servicios</a>
                        <a href="#productos" onClick={closeMenu}>Productos</a>
                        <a href="#trabajos" onClick={closeMenu}>Trabajos</a>
                        <a href="#contacto" onClick={closeMenu}>Contacto</a>
                        
                    </nav>

                    <div className="header-socials">
                        <a
                            className="social-link whatsapp-link"
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp />
                        </a>

                        <a
                            className="social-link instagram-link"
                            href={instagramLink}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>
                    </div>

                    <button
                        type="button"
                        className={`mobile-menu-button ${menuOpen ? "mobile-menu-button-open" : ""}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={menuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>

            <button
                type="button"
                className={`menu-overlay ${menuOpen ? "menu-overlay-open" : ""}`}
                onClick={closeMenu}
                aria-label="Cerrar menú"
            />
        </>
    );
}

export default HomeHeader;