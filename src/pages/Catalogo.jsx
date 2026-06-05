import { useCallback, useEffect, useMemo, useState } from "react";
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

function limpiarTexto(texto) {
    return texto ? texto.trim() : "";
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

function claseImagenCategoria(categoria) {
    if (categoria === "Calefactores") {
        return "catalog-image-heaters";
    }

    if (categoria === "Piscinas") {
        return "catalog-image-pools";
    }

    return "";
}

function obtenerGrupoProducto(producto) {
    const categoriaProducto = limpiarTexto(producto.categoria);
    const marcaProducto = limpiarTexto(producto.marca);
    const subcategoriaProducto = limpiarTexto(producto.subcategoria);

    if (categoriaProducto === "Piscinas") {
        return subcategoriaProducto || marcaProducto || "Otros";
    }

    return marcaProducto || subcategoriaProducto || "Otros";
}

function Catalogo() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [descripcionAbierta, setDescripcionAbierta] = useState(null);
    const [searchParams] = useSearchParams();

    const categoria = searchParams.get("categoria");
    const whatsappNumber = "59892334060";

    const obtenerProductos = useCallback(async () => {
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
            setProductos([]);
            setCargando(false);
            return;
        }

        setProductos(data || []);
        setCargando(false);
    }, [categoria]);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            obtenerProductos();
        }, 0);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [obtenerProductos]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 760px)");

        if (!mediaQuery.matches || cargando) {
            return;
        }

        const elementos = document.querySelectorAll(
            ".catalog-title, .catalog-quick-links, .catalog-brand-title, .catalog-card"
        );

        const observador = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("catalog-mobile-visible");
                    } else {
                        entrada.target.classList.remove("catalog-mobile-visible");
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -8% 0px"
            }
        );

        elementos.forEach((elemento) => {
            elemento.classList.add("catalog-mobile-reveal");

            if (elemento.classList.contains("catalog-title")) {
                elemento.classList.add("catalog-mobile-fade-up");
            } else if (elemento.classList.contains("catalog-quick-links")) {
                elemento.classList.add("catalog-mobile-fade-up");
            } else if (elemento.classList.contains("catalog-brand-title")) {
                elemento.classList.add("catalog-mobile-blur-in");
            } else if (elemento.classList.contains("catalog-card")) {
                const cards = Array.from(document.querySelectorAll(".catalog-card"));
                const index = cards.indexOf(elemento);

                if (index % 2 === 0) {
                    elemento.classList.add("catalog-mobile-slide-left");
                } else {
                    elemento.classList.add("catalog-mobile-slide-right");
                }
            }

            observador.observe(elemento);
        });

        return () => {
            observador.disconnect();
        };
    }, [cargando, productos, categoria]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 761px)");

        if (!mediaQuery.matches || cargando) {
            return;
        }

        const elementos = document.querySelectorAll(
            ".catalog-title, .catalog-quick-links, .catalog-brand-title, .catalog-card"
        );

        const observador = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("catalog-desktop-visible");
                    } else {
                        entrada.target.classList.remove("catalog-desktop-visible");
                    }
                });
            },
            {
                threshold: 0.16,
                rootMargin: "0px 0px -10% 0px"
            }
        );

        elementos.forEach((elemento) => {
            elemento.classList.add("catalog-desktop-reveal");

            if (elemento.classList.contains("catalog-title")) {
                elemento.classList.add("catalog-desktop-title");
            } else if (elemento.classList.contains("catalog-quick-links")) {
                elemento.classList.add("catalog-desktop-links");
            } else if (elemento.classList.contains("catalog-brand-title")) {
                elemento.classList.add("catalog-desktop-brand");
            } else if (elemento.classList.contains("catalog-card")) {
                const cards = Array.from(document.querySelectorAll(".catalog-card"));
                const index = cards.indexOf(elemento);
                elemento.classList.add(index % 2 === 0 ? "catalog-desktop-card-left" : "catalog-desktop-card-right");
            }

            observador.observe(elemento);
        });

        return () => {
            observador.disconnect();
        };
    }, [cargando, productos, categoria]);

    const gruposCatalogo = useMemo(() => {
        const grupos = {};

        productos.forEach((producto) => {
            const categoriaProducto = limpiarTexto(producto.categoria) || "Otros";
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
        
		<div className="catalog-shell" id="catalogo-arriba">
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
                                    <section className="catalog-category-block" key={categoriaProducto}>
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
                                                            const descripcionEstaAbierta = descripcionAbierta === producto.id;
                                                            const categoriaProductoCard = limpiarTexto(producto.categoria);

                                                            return (
                                                                <article className="catalog-card" key={producto.id}>
                                                                    <div className={`catalog-image ${claseImagenCategoria(categoriaProductoCard)}`}>
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
                                                                                    className={`catalog-mobile-info-button ${descripcionEstaAbierta ? "catalog-mobile-info-button-open" : ""}`}
                                                                                    onClick={() => toggleDescripcion(producto.id)}
                                                                                    aria-label={
                                                                                        descripcionEstaAbierta
                                                                                            ? `Cerrar descripción de ${producto.marca} ${producto.modelo}`
                                                                                            : `Ver descripción de ${producto.marca} ${producto.modelo}`
                                                                                    }
                                                                                >
                                                                                    <span className="catalog-info-text">Más info</span>
                                                                                </button>

                                                                                <div className={`catalog-description-hover ${descripcionEstaAbierta ? "catalog-description-open" : ""}`}>
                                                                                    <p>{producto.descripcion_breve}</p>
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </div>

                                                                    <div className="catalog-content">
                                                                        <span className="catalog-category">{categoriaProductoCard}</span>

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
		</div>
        
    );
}

export default Catalogo;
