import { Link, Outlet } from "react-router-dom";
import styles from "./AppShell.module.css";

export function AppShell() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <Link to="/" className={styles.brand}>
                        Curso online
                    </Link>
                    <nav className={styles.nav} aria-label="Principal">
                        <Link className={styles.navLink} to="/">
                            Enviar feedback
                        </Link>
                        <Link className={styles.navLink} to="/feedbacks/lista">
                            Ver feedbacks
                        </Link>
                    </nav>
                </div>
            </header>

            <main className={styles.main}>
                <Outlet />
            </main>

            <footer className={styles.footer}>
                <p className={styles.footerNote}>
                    Feedback dos alunos fica só na memória do servidor enquanto ele
                    está ligado — sem banco de dados.
                </p>
            </footer>
        </div>
    );
}
