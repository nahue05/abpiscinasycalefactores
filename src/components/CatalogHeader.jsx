import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function CatalogHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="catalog-header">
            <a href="/" className="catalog-logo">
                <img src="/logo_simple_invisible.png" alt="Andrés Berrutti Piscinas y Calefactores" />
            </a>

            <nav className={`catalog-nav ${menuOpen ? "catalog-nav-open" : ""}`}>
                <button className="catalog-menu-close" onClick={closeMenu} aria-label="Cerrar menú">
                    <FaTimes />
                </button>
				<a href="/" className="catalog-nav-link catalog-nav-link-home" onClick={closeMenu}>
					Inicio
				</a>

				<a href="/catalogo" className="catalog-nav-link catalog-nav-link-all" onClick={closeMenu}>
					Todos los productos
				</a>

				<a href="/catalogo?categoria=Piscinas" className="catalog-nav-link catalog-nav-link-pools" onClick={closeMenu}>
					Piscinas
				</a>

				<a href="/catalogo?categoria=Calefactores" className="catalog-nav-link catalog-nav-link-heaters" onClick={closeMenu}>
					Calefactores
				</a>
            </nav>

            <button
                className="catalog-mobile-menu-button"
                onClick={() => setMenuOpen(true)}
                aria-label="Abrir menú"
            >
                <FaBars />
            </button>

            <button
                className={`catalog-menu-overlay ${menuOpen ? "catalog-menu-overlay-open" : ""}`}
                onClick={closeMenu}
                aria-label="Cerrar menú"
            />
        </header>
    );
}

export default CatalogHeader;
