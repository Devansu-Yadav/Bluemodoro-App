import { Routes, Route } from "react-router-dom";
import { MockAPI } from "./components/MockAPI/MockAPI";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/mock-api" element={ <MockAPI /> } />
      </Routes>
    </div>
  );
}

export default App;
