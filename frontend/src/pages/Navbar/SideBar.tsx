import styled from "@emotion/styled";
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuButton from "../../components/Buttons/MenuButton";

const Container = styled.div``;
export default function Side() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <Container>
        <div>
          <Link to="#" className="menu-bars">
            <MenuButton onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars"></Link>
            </li>
          </ul>
        </nav>
      </Container>
    </>
  );
}
