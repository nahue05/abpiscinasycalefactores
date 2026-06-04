function Footer({ catalogo = false }) {
    return (
        <footer className={`footer ${catalogo ? "catalog-footer" : ""}`}>
            <img src="/logo.png" alt="Andrés Berrutti Piscinas y Calefactores" />

            <p>© 2026 Andrés Berrutti Piscinas y Calefactores</p>

            {catalogo ? (
                <div className="catalog-footer-links">
                    <a href="/" className="footer-top-link">
                        Inicio
                    </a>
                </div>
            ) : (
                <a href="/" className="footer-top-link">
                    Volver al inicio
                </a>
            )}
        </footer>
    );
}

export default Footer;
