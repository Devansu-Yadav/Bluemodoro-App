import { Routes, Route } from "react-router-dom";
import { MockAPI } from "./components/MockAPI/MockAPI";
import "./styles/App.css";
import { LandingPage } from "./pages/LandingPage";
import { NotFound404Page } from "./pages/NotFound404Page";
import { TaskPage } from "./pages/TaskPage";
import { PomodoroTimerPage } from "./pages/PomodoroTimerPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/tasks" element={<TaskPage />}/>
        <Route path="/pomodoro/:taskId" element={<PomodoroTimerPage />}/>
        <Route path="/mock-api" element={ <MockAPI /> } />
        <Route path="*" element={<NotFound404Page />}/>
      </Routes>
    </div>
  );
}

export default App;
