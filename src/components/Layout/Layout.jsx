import AppBar from "../AppBar/AppBar";
import css from "./Layout.module.css";
import Footer from "../Footer/Footer";

export default function Layout({ children }) {
  return (
    <div className={css.layout}>
      <AppBar />
      <main className={css.main}>{children}</main>
      <Footer />
    </div>
  );
}
