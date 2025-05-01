import { Outlet } from "react-router";
import Header from "./Header";
import Spacing from "./Spacing";
import Footer from "./Footer";
import SideNav from "./SideNav";

function AppLayout() {
  return (
    <>
      <Header />

      <main className="my-10" role="main">
        <Spacing testid="spacing-container">
          <div className="grid h-full grid-cols-[17rem_1fr_12rem]">
            <SideNav />
            <Outlet />
          </div>
        </Spacing>
      </main>

      <Footer />
    </>
  );
}

export default AppLayout;
