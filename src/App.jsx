import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Error from "./pages/Error";
import Application from "./pages/Application";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Error />} />
        <Route path="/app" element={<Application />} />
      </Routes>
    </Router>
  );
}

export default App;
