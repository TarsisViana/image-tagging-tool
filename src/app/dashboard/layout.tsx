import Link from "next/link";
import { Container, NavbarBrand } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const text = "< Home"
  return (
    <div
      className="container-fluid d-flex flex-column"
      style={{ height: "100vh"}}
    >
      <Navbar className="bg-body-tertiary border">
        <Container>
          <NavbarBrand href="/" as={Link}>{text}</NavbarBrand>
        </Container>
      </Navbar>
      <div
        className="flex-grow-1 container-fluid main d-flex border p-0" id="workArea"
        style={{maxHeight: 'calc(100vh - 100.39px)' }}
      >
        {children}
      </div>
      <footer className="navbar justify-content-center border">Made by Tarsis Viana</footer>
    </div>
  );
}