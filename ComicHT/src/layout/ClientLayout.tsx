import { Outlet, useLocation } from "react-router-dom";

import Header from "../components/client/header/Header";
import Footer from "../components/client/footer/Footer";

export default function ClientLayout() {
  const location = useLocation();

  const noLayoutRoutes = ["/login", "/register", "/forgot-password"];

  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      <div className="mt-16">
        <Outlet />
      </div>
      {!hideLayout && <Footer />}
    </>
  );
}
