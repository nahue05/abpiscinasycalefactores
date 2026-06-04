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

function Catalogo() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
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

        setProductos(data || []);
        setCargando(false);
    }

    const gruposCatalogo = useMemo(() => {
        const grupos = {};

        productos.forEach((producto) => {
            const categoriaProducto = producto.categoria || "Otros";
            const marcaProducto = producto.marca || "Sin marca";

            if (!grupos[categoriaProducto]) {
                grupos[categoriaProducto] = {};
            }

            if (!grupos[categoriaProducto][marcaProducto]) {
                grupos[categoriaProducto][marcaProducto] = [];
            }

            grupos[categoriaProducto][marcaProducto].push(producto);
        });

        return grupos;
    }, [productos]);

    const categoriasOrdenadas = useMemo(() => {
        return ordenarCategorias(Object.keys(gruposCatalogo));
    }, [gruposCatalogo]);

    return (
        <>
            <CatalogHeader />

            <main className="catalog-page">
                <section className="catalog-hero">
                    <span>Catálogo</span>

                    <h1>{categoria ? categoria : "Todos los productos"}</h1>



                    {!cargando && categoriasOrdenadas.length > 0 && (
                        <div className="catalog-quick-links">
                            {categoriasOrdenadas.map((categoriaProducto) => (
                                <a href={`#${crearId(categoriaProducto)}`} key={categoriaProducto}>
                                    {categoriaProducto}
                                </a>
                            ))}
                        </div>
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
                                const marcas = gruposCatalogo[categoriaProducto];

                                return (
                                    <section
                                        className="catalog-category-block"
                                        id={crearId(categoriaProducto)}
                                        key={categoriaProducto}
                                    >
                                        {Object.entries(marcas).map(([marcaProducto, productosMarca]) => (
                                            <div className="catalog-brand-block" key={`${categoriaProducto}-${marcaProducto}`}>
                                                <div className="catalog-brand-title">
                                                    <span>{categoriaProducto}</span>
                                                    <h3>{marcaProducto}</h3>
                                                </div>

                                                <div className="catalog-grid">
                                                    {productosMarca.map((producto) => {
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

                                                                    {producto.descripcion_breve && (
                                                                        <div className="catalog-description-hover">
                                                                            <p>{producto.descripcion_breve}</p>
                                                                        </div>
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
                                        ))}
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