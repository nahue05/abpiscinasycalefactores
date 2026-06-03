import "./index.css";
import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaBars, FaTimes } from "react-icons/fa";

function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    const whatsappNumber = "59892334060";
    const whatsappMessage = "Hola, me gustaría obtener información sobre...";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    const instagramLink = "https://www.instagram.com/ab_piscinas/";

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <main>
            <header className="header">
                <div className="header-container">
                    <div className="logo">
                        <img src="/logo_simple.png" alt="Andrés Berrutti Piscinas y Calefactores" />
                    </div>

                    <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
                        <button className="menu-close" onClick={closeMenu} aria-label="Cerrar menú">
                            <FaTimes />
                        </button>

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
                        className="mobile-menu-button"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Abrir menú"
                    >
                        <FaBars />
                    </button>
                </div>

                <div
                    className={`menu-overlay ${menuOpen ? "menu-overlay-open" : ""}`}
                    onClick={closeMenu}
                ></div>
            </header>

            <section className="hero">
                <div className="hero-content">
                    <span className="eyebrow">Piscinas & Calefactores</span>

                    <h1>Piscinas, calefacción y soluciones para tu hogar</h1>

                    <p>
                        Venta y asesoramiento en artículos para piscina, calefactores para piscina,
                        estufas y equipos de calefacción para hogares, comercios y espacios exteriores.
                    </p>

                    <div className="hero-buttons">
                        <a
                            className="primary-button"
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Consultar por WhatsApp
                        </a>

                        <a className="secondary-button" href="#servicios">
                            Ver servicios
                        </a>
                    </div>
                </div>

                <div className="hero-card">
                    <img src="/logo.png" alt="Logo Andrés Berrutti" />
                </div>
            </section>

            <section className="section" id="servicios">
                <div className="section-title">
                    <span>Servicios</span>
                    <h2>Todo para piscinas y calefacción de espacios</h2>
                    <p>
                        Soluciones para quienes buscan equipar, mantener o mejorar su piscina,
                        y también calefaccionar distintos espacios.
                    </p>
                </div>

                <div className="cards">
                    <article className="card">
                        <div className="card-icon">💧</div>
                        <h3>Artículos para piscina</h3>
                        <p>
                            Accesorios, repuestos, productos, bombas, filtros y soluciones para
                            el cuidado del agua.
                        </p>
                    </article>

                    <article className="card">
                        <div className="card-icon">🔥</div>
                        <h3>Calefactores para piscina</h3>
                        <p>
                            Equipos para climatizar el agua y disfrutar la piscina durante más
                            meses del año.
                        </p>
                    </article>

                    <article className="card">
                        <div className="card-icon">🏠</div>
                        <h3>Estufas y calefactores</h3>
                        <p>
                            Opciones de calefacción para hogares, comercios y espacios interiores
                            o exteriores.
                        </p>
                    </article>

                    <article className="card">
                        <div className="card-icon">🤝</div>
                        <h3>Asesoramiento</h3>
                        <p>
                            Orientación para elegir el producto adecuado según el espacio, la
                            necesidad y el presupuesto.
                        </p>
                    </article>
                </div>
            </section>

            <section className="section products" id="productos">
                <div className="section-title">
                    <span>Productos</span>
                    <h2>Líneas principales</h2>
                    <p>
                        La landing puede crecer después con fotos reales, marcas disponibles
                        y productos destacados.
                    </p>
                </div>

                <div className="product-grid">
                    <article className="product-card pool">
                        <div>
                            <span>Piscinas</span>
                            <h3>Equipamiento y mantenimiento</h3>
                            <p>Bombas, filtros, productos, accesorios y repuestos.</p>
                        </div>
                    </article>

                    <article className="product-card heater">
                        <div>
                            <span>Calefacción</span>
                            <h3>Calefactores y estufas</h3>
                            <p>Soluciones para piscinas, hogares, comercios y espacios abiertos.</p>
                        </div>
                    </article>
                </div>
            </section>

            <section className="section works" id="trabajos">
                <div className="section-title">
                    <span>Trabajos</span>
                    <h2>Proyectos realizados</h2>
                    <p>
                        Acá después agregamos fotos reales de instalaciones, productos,
                        piscinas, estufas o calefactores.
                    </p>
                </div>

                <div className="work-grid">
                    <div>
                        <span>Foto 1</span>
                    </div>

                    <div>
                        <span>Foto 2</span>
                    </div>

                    <div>
                        <span>Foto 3</span>
                    </div>
                </div>
            </section>

            <section className="section faq">
                <div className="section-title">
                    <span>Preguntas frecuentes</span>
                </div>

                <div className="faq-list">
                    <article>
                        <h3>¿Venden artículos para piscina?</h3>
                        <p>
                            Sí, contamos con productos, accesorios, repuestos y equipamiento
                            para el cuidado y funcionamiento de piscinas.
                        </p>
                    </article>

                    <article>
                        <h3>¿Tienen calefactores para piscina?</h3>
                        <p>
                            Sí, asesoramos sobre opciones para climatizar el agua según el tipo
                            de piscina y el uso que se le quiera dar.
                        </p>
                    </article>

                    <article>
                        <h3>¿También venden estufas?</h3>
                        <p>
                            Sí, trabajamos con estufas y equipos de calefacción para distintos
                            espacios.
                        </p>
                    </article>

                    <article>
                        <h3>¿Puedo consultar por WhatsApp?</h3>
                        <p>
                            Sí, podés escribir por WhatsApp indicando qué necesitás y te
                            orientamos con la mejor opción disponible.
                        </p>
                    </article>
                </div>
            </section>

            <section className="contact" id="contacto">
                <span>Contacto</span>
                <h2>¿Buscás artículos para piscina o calefacción?</h2>
                <p>
                    Escribinos por WhatsApp y contanos qué necesitás. Te asesoramos para
                    encontrar la mejor opción.
                </p>

                <a
                    className="primary-button contact-button"
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    Pedir presupuesto
                </a>
            </section>

            <footer className="footer">
                <img src="/logo.png" alt="Andrés Berrutti Piscinas y Calefactores" />
                <p>Andrés Berrutti - Piscinas & Calefactores</p>
            </footer>
        </main>
    );
}

export default App;