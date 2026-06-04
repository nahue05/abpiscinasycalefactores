import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import "../styles/catalogo.css";
import { supabase } from "../lib/supabaseClient";
import CatalogHeader from "../components/CatalogHeader.jsx";
import Footer from "../components/Footer.jsx";

function crearId(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function ordenarCategorias(categorias) {
    const orden = ["Piscinas", "Calefactores"];

    return categorias.sort((a, b) => {
        const posicionA = orden.indexOf(a);
        const posicionB = orden.indexOf(b);

        if (posicionA === -1 && posicionB === -1) {
            return a.localeCompare(b);
        }

        if (posicionA === -1) {
            return 1;
        }

        if (posicionB === -1) {
            return -1;
        }

        return posicionA - posicionB;
    });
}

function claseTituloPrincipal(categoria) {
    if (!categoria) {
        return "catalog-title catalog-title-gradient";
    }

    if (categoria === "Calefactores") {
        return "catalog-title catalog-title-heaters";
    }

    if (categoria === "Piscinas") {
        return "catalog-title catalog-title-pools";
    }

    return "catalog-title";
}

function claseCategoria(categoria) {
    if (categoria === "Calefactores") {
        return "catalog-brand-category catalog-brand-category-heaters";
    }

    if (categoria === "Piscinas") {
        return "catalog-brand-category catalog-brand-category-pools";
    }

    return "catalog-brand-category";
}

function obtenerGrupoProducto(producto) {
    if (producto.categoria === "Piscinas") {
        return producto.subcategoria || producto.marca || "Otros";
    }

    return producto.marca || producto.subcategoria || "Otros";
}

function Catalogo() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
	const [descripcionAbierta, setDescripcionAbierta] = useState(null);
    const [searchParams] = useSearchParams();

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
		.order("marca", { ascending: true })
		.order("modelo", { ascending: true });

        if (categoria) {
            query = query.eq("categoria", categoria);
        }

        const { data, error } = await query;

        if (error) {
            console.log("Error al obtener productos:", error);
            setCargando(false);
            return;
        }

        setProductos(data || []);
        setCargando(false);
    }

    const gruposCatalogo = useMemo(() => {
        const grupos = {};

        productos.forEach((producto) => {
            const categoriaProducto = producto.categoria || "Otros";
            const grupoProducto = obtenerGrupoProducto(producto);

            if (!grupos[categoriaProducto]) {
                grupos[categoriaProducto] = {};
            }

            if (!grupos[categoriaProducto][grupoProducto]) {
                grupos[categoriaProducto][grupoProducto] = [];
            }

            grupos[categoriaProducto][grupoProducto].push(producto);
        });

        return grupos;
    }, [productos]);

    const categoriasOrdenadas = useMemo(() => {
        return ordenarCategorias(Object.keys(gruposCatalogo));
    }, [gruposCatalogo]);

    const enlacesCatalogo = useMemo(() => {
        const enlaces = [];

        categoriasOrdenadas.forEach((categoriaProducto) => {
            const grupos = gruposCatalogo[categoriaProducto];

            Object.keys(grupos).forEach((grupoProducto) => {
                enlaces.push({
                    texto: grupoProducto,
                    id: crearId(`${categoriaProducto}-${grupoProducto}`),
                    categoria: categoriaProducto
                });
            });
        });

        return enlaces;
    }, [categoriasOrdenadas, gruposCatalogo]);

	function toggleDescripcion(idProducto) {
		setDescripcionAbierta((idActual) => idActual === idProducto ? null : idProducto);
	}
    return (
        <>
            <CatalogHeader />

            <main className="catalog-page">
                <section className="catalog-hero">
                    <h1 className={claseTituloPrincipal(categoria)}>
                        {categoria ? categoria : "Todos los productos"}
                    </h1>

                    

                    {!cargando && enlacesCatalogo.length > 0 && (
                        <nav className="catalog-quick-links" aria-label="Secciones del catálogo">
                            {enlacesCatalogo.map((enlace, index) => (
                                <span className="catalog-quick-link-item" key={enlace.id}>
                                    <a
                                        href={`#${enlace.id}`}
                                        className={
                                            enlace.categoria === "Piscinas"
                                                ? "catalog-quick-link-pools"
                                                : "catalog-quick-link-heaters"
                                        }
                                    >
                                        {enlace.texto}
                                    </a>

                                    {index < enlacesCatalogo.length - 1 && (
                                        <span className="catalog-quick-separator">|</span>
                                    )}
                                </span>
                            ))}
                        </nav>
                    )}
                </section>

                <section className="catalog-section">
                    {cargando && (
                        <p className="catalog-status">Cargando productos...</p>
                    )}

                    {!cargando && productos.length === 0 && (
                        <p className="catalog-status">No hay productos cargados en esta categoría.</p>
                    )}

                    {!cargando && productos.length > 0 && (
                        <div className="catalog-groups">
                            {categoriasOrdenadas.map((categoriaProducto) => {
                                const grupos = gruposCatalogo[categoriaProducto];

                                return (
                                    <section
                                        className="catalog-category-block"
                                        key={categoriaProducto}
                                    >
                                        {Object.entries(grupos).map(([grupoProducto, productosGrupo]) => {
                                            const idGrupo = crearId(`${categoriaProducto}-${grupoProducto}`);

                                            return (
                                                <div
                                                    className="catalog-brand-block"
                                                    id={idGrupo}
                                                    key={`${categoriaProducto}-${grupoProducto}`}
                                                >
                                                    <div className="catalog-brand-title">
                                                        <span className={claseCategoria(categoriaProducto)}>
                                                            {categoriaProducto}
                                                        </span>

                                                        <h3>{grupoProducto}</h3>
                                                    </div>

                                                    <div className="catalog-grid">
                                                        {productosGrupo.map((producto) => {
                                                            const mensaje = `Hola, vi esta ${producto.marca} ${producto.modelo} en su catálogo y quería más información.`;
                                                            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;

                                                            return (
                                                                <article className="catalog-card" key={producto.id}>
                                                        			<div className={`catalog-image ${producto.categoria === "Calefactores" ? "catalog-image-heaters" : "catalog-image-pools"}`}>
                                                                        {producto.imagen_url && producto.imagen_url.trim() !== "" ? (
                                                                            <img src={producto.imagen_url} alt={`${producto.marca} ${producto.modelo}`} />
                                                                        ) : (
                                                                            <div className="catalog-no-image">
                                                                                <img src="/logo.png" alt="Logo Andrés Berrutti" />
                                                                            </div>
                                                                        )}

																		{producto.descripcion_breve && (
																			<>
																		<button
																			type="button"
																			className={`catalog-mobile-info-button ${descripcionAbierta === producto.id ? "catalog-mobile-info-button-open" : ""}`}
																			onClick={() => toggleDescripcion(producto.id)}
																			aria-label={
																				descripcionAbierta === producto.id
																					? `Cerrar descripción de ${producto.marca} ${producto.modelo}`
																					: `Ver descripción de ${producto.marca} ${producto.modelo}`
																			}
																		>
																			<span className="catalog-info-text">Más info</span>
																			<span className="catalog-info-x">×</span>
																		</button>

																				<div className={`catalog-description-hover ${descripcionAbierta === producto.id ? "catalog-description-open" : ""}`}>
																					<p>{producto.descripcion_breve}</p>
																				</div>
																			</>
																		)}
                                                                    </div>

                                                                    <div className="catalog-content">
                                                                        <span className="catalog-category">{producto.categoria}</span>

                                                                        <h3>{producto.marca} {producto.modelo}</h3>

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

                                                                        {producto.mostrar_precio && producto.precio && (
                                                                            <p className="catalog-price">
                                                                                ${producto.precio}
                                                                            </p>
                                                                        )}

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
                                                </div>
                                            );
                                        })}
                                    </section>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>

            <Footer catalogo />
        </>
    );
}

export default Catalogo;