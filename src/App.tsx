import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserRulesPage from './components/Junctionpage'
import RunEnginePage from './components/RunEngine';
import RulesForm from './components/SubmitRules';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Aiver</h1>
        <nav className="mb-4">
          <Link className="mr-4 text-blue-500" to="/user-rules">
            User Rules
          </Link>
          <Link className="mr-4 text-blue-500" to="/run-engine">
            Run Engine
          </Link>
          <Link className='text-blue-500' to="/add-rules">
            Add Rules 
          </Link>
        </nav>

        <Routes>
          <Route path="/user-rules" element={<UserRulesPage />} />
          <Route path="/run-engine" element={<RunEnginePage />} />
          <Route path="/add-rules" element={<RulesForm/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
