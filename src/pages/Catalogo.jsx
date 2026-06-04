import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import { supabase } from "../supabaseClient";

function Catalogo() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [searchParams] = useSearchParams();
	const [menuOpen, setMenuOpen] = useState(false);

	const closeMenu = () => {
		setMenuOpen(false);
	};
    const categoria = searchParams.get("categoria");
    const whatsappNumber = "59892334060";

    useEffect(() => {
        obtenerProductos();
    }, [categoria]);

    async function obtenerProductos() {
        setCargando(true);

        let query = supabase
            .from("productos")
            .select("*")
            .eq("activo", true)
            .order("created_at", { ascending: false });

        if (categoria) {
            query = query.eq("categoria", categoria);
        }

        const { data, error } = await query;

        if (error) {
            console.log("Error al obtener productos:", error);
            setCargando(false);
            return;
        }

        setProductos(data);
        setCargando(false);
    }

    return (
        <>
            <header className="catalog-header">
				<a href="/" className="catalog-logo">
					<img src="/logo_simple_invisible.png" alt="Andrés Berrutti Piscinas y Calefactores" />
				</a>

				<nav className={`catalog-nav ${menuOpen ? "catalog-nav-open" : ""}`}>
					<button className="catalog-menu-close" onClick={closeMenu} aria-label="Cerrar menú">
						<FaTimes />
					</button>

					<a href="/" onClick={closeMenu}>Inicio</a>
					<a href="/catalogo" onClick={closeMenu}>Todo el catálogo</a>
					<a href="/catalogo?categoria=Calefacción" onClick={closeMenu}>Calefacción</a>
					<a href="/catalogo?categoria=Piscinas" onClick={closeMenu}>Piscinas</a>
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

            <main className="catalog-page">
                <section className="catalog-hero">
                    <span>Catálogo</span>
                    <h1>{categoria ? categoria : "Todos los productos"}</h1>
                    <p>
                        Elegí el producto que te interesa y consultanos por WhatsApp para recibir asesoramiento personalizado.
                    </p>
                </section>

                <section className="catalog-section">
                    {cargando && (
                        <p className="catalog-status">Cargando productos...</p>
                    )}

                    {!cargando && productos.length === 0 && (
                        <p className="catalog-status">No hay productos cargados en esta categoría.</p>
                    )}

                    <div className="catalog-grid">
                        {productos.map((producto) => {
                            const mensaje = `Hola, vi esta ${producto.marca} ${producto.modelo} en su catálogo y quería más información.`;
                            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;

                            return (
                                <article className="catalog-card" key={producto.id}>
                                    <div className="catalog-image">
                                        {producto.imagen_url && producto.imagen_url.trim() !== "" ? (
                                            <img src={producto.imagen_url} alt={`${producto.marca} ${producto.modelo}`} />
                                        ) : (
                                            <div className="catalog-no-image">
                                                <img src="/logo.png" alt="Logo Andrés Berrutti" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="catalog-content">
                                        <span className="catalog-category">{producto.categoria}</span>

                                        <h3>{producto.marca} {producto.modelo}</h3>

                                        {producto.descripcion_breve && (
                                            <p className="catalog-description">{producto.descripcion_breve}</p>
                                        )}

                                        <div className="catalog-info">
                                            {producto.metros_cuadrados && (
                                                <p>
                                                    <strong>Calefacciona:</strong> {producto.metros_cuadrados}
                                                </p>
                                            )}

                                            {producto.dimensiones && (
                                                <p>
                                                    <strong>Dimensiones:</strong> {producto.dimensiones}
                                                </p>
                                            )}
                                        </div>

                                        <p className="catalog-price">
                                            {producto.mostrar_precio && producto.precio
                                                ? `$${producto.precio}`
                                                : "Consultar precio"}
                                        </p>

                                        <a
                                            className="catalog-whatsapp"
                                            href={whatsappLink}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <FaWhatsapp />
                                            Consultar
                                        </a>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </main>
			<footer className="footer catalog-footer">
				<img src="/logo.png" alt="Andrés Berrutti Piscinas y Calefactores" />

				<p>© 2026 Andrés Berrutti Piscinas y Calefactores</p>

				<div className="catalog-footer-links">
					<a href="/" className="footer-top-link">
						Inicio
					</a>

					
				</div>
			</footer>
        </>
    );
}

export default Catalogo;