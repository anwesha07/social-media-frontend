import HomePage from './components/HomePage';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<div><h1>About Page</h1></div>} />
          {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
        <Route path="*" element={<div><h1>Page not found!</h1></div>} />
      </Routes>
    </div>
  );
}

export default App;
