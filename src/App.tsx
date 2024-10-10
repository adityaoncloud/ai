import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserRulesPage from './components/Junctionpage'
import RunEnginePage from './components/RunEngine';
import RulesForm from './components/SubmitRules';
import SignUpPage from './components/Signup';
import LoginPage from './components/Login';
import PredictPage from './components/Predict';
import ProtectedRoute from './ProtectedRoute'

const App = () => {
  return (
    <Router>
    <div>
    <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
            
              <h1 className=''>Aiver</h1>
              <Link to="/user-rules" className="flex-shrink-0 flex items-center">
                <h1>User-rules</h1>
              </Link>
            </div>
            <div className="flex items-center">
              <Link to="/run-engine" className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
                Run Engine
                <span className="sr-only">Run Engine</span>
              </Link>
              <Link to="/add-rules" className="ml-4 p-2 rounded-md text-gray-600 hover:bg-gray-100">
                Add rules
              </Link>
              <Link to="/predict" className="ml-4 p-2 rounded-md text-gray-600 hover:bg-gray-100">
                Predict
              </Link>
            </div>
          </div>
        </div>
      </nav>
        <Routes>
          <Route path="/user-rules" element={<ProtectedRoute><UserRulesPage /></ProtectedRoute>} />
          <Route path="/run-engine" element={<ProtectedRoute><RunEnginePage/></ProtectedRoute>} />
          <Route path="/add-rules" element={<ProtectedRoute><RulesForm/></ProtectedRoute>} />
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/predict" element={<ProtectedRoute><PredictPage/></ProtectedRoute>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
