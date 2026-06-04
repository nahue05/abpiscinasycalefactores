import { useEffect } from "react";
import "../styles/home.css";
import HomeHeader from "../components/HomeHeader.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
	    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 760px)");

        if (!mediaQuery.matches) {
            return;
        }

        const elementos = document.querySelectorAll(
            ".hero-content, .hero-card, .section-title, .service-card, .product-card, .work-grid div, .faq-list article, .contact"
        );

        const observador = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("mobile-visible");
                        observador.unobserve(entrada.target);
                    }
                });
            },
            {
                threshold: 0.14,
                rootMargin: "0px 0px -8% 0px"
            }
        );

        elementos.forEach((elemento, index) => {
            elemento.classList.add("mobile-reveal");

            if (index % 2 === 0) {
                elemento.classList.add("mobile-reveal-left");
            } else {
                elemento.classList.add("mobile-reveal-right");
            }

            observador.observe(elemento);
        });

        return () => {
            observador.disconnect();
        };
    }, []);
    const whatsappNumber = "59892334060";
    const whatsappMessage = "Hola, me gustaría obtener información sobre...";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <main className="home-main">
            <HomeHeader />

            <section className="hero" id="inicio">
                <div className="hero-content">
                    <span className="eyebrow gradient-label">Piscinas & Calefactores</span>

                    <h1>Piscinas, calefacción y soluciones para tu hogar</h1>

                    <p>
                        Venta, instalación y asesoramiento en piscinas, artículos para piscina,
                        calefactores, estufas y soluciones de calefacción para hogares y espacios exteriores.
                    </p>
                </div>

                <div className="hero-card">
                    <img src="/logo.png" alt="Logo Andrés Berrutti" />
                </div>
            </section>

			<section className="section services-section" id="servicios">
                <div className="section-title">
                    <span className="gradient-label">Servicios</span>
                    <h2>Instalación, mantenimiento y asesoramiento</h2>
                    <p>
                        Trabajamos tanto en piscinas como en calefacción para el hogar,
                        cuidando la instalación, el funcionamiento y el entorno donde se coloca cada equipo.
                    </p>
                </div>

                <div className="cards service-cards">
                    <article className="card service-card">
                        <div className="service-card-media service-card-pools-maintenance">
                            <h3>
                                <span>Mantenimiento de piscinas</span>
                            </h3>
                        </div>

                        <div className="service-card-body">
                            <p>
                                Servicio periódico para piscinas ya instaladas, con limpieza y mantenimiento
                                del agua para que se mantenga en condiciones durante la temporada.
                            </p>
                        </div>
                    </article>

                    <article className="card service-card">
                        <div className="service-card-media service-card-pools-installation">
                            <h3>
                                <span>Instalación de piscinas</span>
                            </h3>
                        </div>

                        <div className="service-card-body">
                            <p>
                                Instalamos piscinas y cuidamos que el resultado final quede integrado al espacio,
                                logrando un entorno agradable como se puede ver en nuestros trabajos.
                            </p>
                        </div>
                    </article>

                    <article className="card service-card">
                        <div className="service-card-media service-card-heaters-installation">
                            <h3>
                                <span>Instalación de estufas y calefactores</span>
                            </h3>
                        </div>

                        <div className="service-card-body">
                            <p>
                                Instalamos calefactores y estufas para el hogar, buscando una solución funcional,
                                segura y estética, cuidando también el entorno donde queda instalada.
                            </p>
                        </div>
                    </article>

                    <article className="card service-card">
                        <div className="service-card-media service-card-advice">
                            <h3>
                                <span>Asesoramiento personalizado</span>
                            </h3>
                        </div>

                        <div className="service-card-body">
                            <p>
                                Te orientamos para elegir la piscina, el equipo, la estufa o el calefactor adecuado
                                según el espacio, el uso y el presupuesto disponible.
                            </p>
                        </div>
                    </article>
                </div>
            </section>

            <section className="section products products-section" id="productos">
                <div className="section-title">
                    <span className="gradient-label">Productos</span>
                    <h2>Líneas principales</h2>
                    <p>
                        Encontrá productos para piscinas, mantenimiento, calefacción del agua
                        y calefactores para el hogar.
                    </p>
                </div>

                <div className="product-grid">
                    <a href="/catalogo?categoria=Piscinas" className="product-card pool">
                        <div>
                            <span>Piscinas</span>
                            <h3>Equipamiento y mantenimiento</h3>
                            <p>Bombas, filtros, productos, accesorios, repuestos y soluciones para el agua.</p>
                        </div>
                    </a>

                    <a href="/catalogo?categoria=Calefactores" className="product-card heater">
                        <div>
                            <span>Calefactores</span>
                            <h3>Estufas y calefacción</h3>
                            <p>Equipos a leña, pellets, insertables y soluciones para calefaccionar el hogar.</p>
                        </div>
                    </a>
                </div>
            </section>

            <section className="section works works-section" id="trabajos">
                <div className="section-title">
                    <span className="gradient-label">Trabajos</span>
                    <h2>Instalaciones realizadas</h2>
                    <p>
                        En esta sección vamos a mostrar instalaciones de piscinas, calefactores,
                        estufas y terminaciones donde se vea el entorno final de cada trabajo.
                    </p>
                </div>

                <div className="work-grid">
                    <div>
                        <span>Piscinas</span>
                    </div>

                    <div>
                        <span>Calefactores</span>
                    </div>

                    <div>
                        <span>Terminaciones</span>
                    </div>
                </div>
            </section>

            <section className="section faq faq-section">
                <div className="section-title">
                    <span className="gradient-label">Preguntas frecuentes</span>
                </div>

                <div className="faq-list">
                    <article>
                        <h3>¿Realizan mantenimiento de piscinas?</h3>
                        <p>
                            Sí, ofrecemos mantenimiento para piscinas ya instaladas, incluyendo limpieza
                            y cuidado general para mantener el agua en buenas condiciones.
                        </p>
                    </article>

                    <article>
                        <h3>¿Instalan piscinas?</h3>
                        <p>
                            Sí, realizamos instalaciones de piscinas y cuidamos que el resultado quede
                            bien integrado al espacio exterior.
                        </p>
                    </article>

                    <article>
                        <h3>¿Instalan estufas y calefactores?</h3>
                        <p>
                            Sí, trabajamos con instalación de estufas y calefactores para hogares,
                            buscando una solución práctica, segura y estética.
                        </p>
                    </article>

                    <article>
                        <h3>¿Puedo pedir asesoramiento antes de comprar?</h3>
                        <p>
                            Sí, podés consultar por WhatsApp y te orientamos según el espacio,
                            el tipo de uso y el equipo que mejor se adapte a lo que necesitás.
                        </p>
                    </article>
                </div>
            </section>

            <section className="contact" id="contacto">
                <span className="gradient-label">Contacto</span>
                <h2>¿Buscás una solución para piscina o calefacción?</h2>
                <p>
                    Escribinos por WhatsApp y contanos qué necesitás. Te asesoramos para elegir
                    la mejor opción e instalamos cuidando el funcionamiento y el resultado final.
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

            <Footer />
        </main>
    );
}

export default Home;