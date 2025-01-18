export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-fluid d-flex flex-column" style={{height:"100vh"}}>
      <nav className="navbar justify-content-center border">Header placeholder</nav>
      <div className="flex-grow-1 container-fluid main d-flex border p-0" id="workArea">
        {children}
      </div>
      <footer className="navbar justify-content-center border">Footer placeholder</footer>
    </div>
  );
}