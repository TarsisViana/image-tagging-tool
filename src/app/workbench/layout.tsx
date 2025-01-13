export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-fluid d-flex flex-column" style={{height:"100vh"}}>
      <nav className="navbar justify-content-center">Header placeholder</nav>
      <div className="container-fluid main flex-grow-1">
        {children}
      </div>
      <footer className="navbar justify-content-center">Footer placeholder</footer>
    </div>
  );
}