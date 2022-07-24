import { Routes, Route } from "react-router-dom";
import "styles/App.css";
import { MockAPI } from "components";
import { LandingPage, NotFound404Page, TaskPage, PomodoroTimerPage } from "pages";

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
