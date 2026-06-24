import Logo from './components/Logo.jsx';
import Footer from './components/Footer.jsx';
import OrderForm from './components/OrderForm.jsx';
import useFadeUp from './hooks/useFadeUp.js';

/**
 * Standalone /order/ page. Lean chrome — brand + "back to home" link, the
 * form, the regular footer. The marketing components (Hero/Services/etc.)
 * don't ship in this bundle.
 */
export default function OrderPage() {
  useFadeUp();
  return (
    <>
      <nav className="top order-page-nav">
        <div className="nav-inner">
          <a href="/">
            <Logo />
          </a>
          <div className="nav-links">
            <a href="/">← Back to home</a>
          </div>
        </div>
      </nav>
      <main className="order-page-main">
        <OrderForm />
      </main>
      <Footer />
    </>
  );
}
