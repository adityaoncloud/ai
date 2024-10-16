import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserRulesPage from '@/components/Junctionpage';
import RunEnginePage from '@/components/RunEngine';
import RulesForm  from './components/SubmitRules';
import SignUpPage from '@/components/Signup';
import LoginPage from './components/Login';
import PredictPage  from './components/Predict';
import ProtectedRoute from './ProtectedRoute';
import { Button } from './components/ui/button';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans antialiased">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 hidden md:flex">
              <Link to="/" className="mr-6 flex items-center space-x-2">
                <span className="hidden font-bold sm:inline-block">Aiver</span>
              </Link>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link to="/user-rules" className="transition-colors hover:text-foreground/80 text-foreground/60">User Rules</Link>
                <Link to="/run-engine" className="transition-colors hover:text-foreground/80 text-foreground/60">Run Engine</Link>
                <Link to="/add-rules" className="transition-colors hover:text-foreground/80 text-foreground/60">Add Rules</Link>
                <Link to="/predict" className="transition-colors hover:text-foreground/80 text-foreground/60">Predict</Link>
              </nav>
            </div>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <nav className="flex items-center">
                <Link to="/login">
                  <Button variant="ghost" className="mr-2">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="container py-6">
          <Routes>
            <Route path="/user-rules" element={<ProtectedRoute><UserRulesPage /></ProtectedRoute>} />
            <Route path="/run-engine" element={<ProtectedRoute><RunEnginePage /></ProtectedRoute>} />
            <Route path="/add-rules" element={<ProtectedRoute><RulesForm /></ProtectedRoute>} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/predict" element={<ProtectedRoute><PredictPage /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}