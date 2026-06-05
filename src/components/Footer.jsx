function Footer({ catalogo = false }) {
    return (
        <footer className={`footer ${catalogo ? "catalog-footer" : ""}`}>
            <a href="/" aria-label="Ir al inicio">
                <img src="/logo.png" alt="Andrés Berrutti Piscinas y Calefactores" />
            </a>

            <p>© 2026 Andrés Berrutti Piscinas y Calefactores</p>

            {catalogo ? (
                <div className="catalog-footer-links">
                    <a href="#catalogo-arriba" className="footer-top-link">
                        Volver arriba
                    </a>
                </div>
            ) : (
                <a href="#inicio" className="footer-top-link">
                    Volver al inicio
                </a>
            )}
        </footer>
    );
}

export default Footer;
