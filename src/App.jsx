import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/Pages/HomePage';
import { ErrorPage } from './components/Pages/ErrorPage';
import { Layout } from './components/UI/Layout';
import { AuthFormPage } from './components/Pages/AuthFormPage';
import { AccountPage, DashBoard, Profile } from './components/Pages/AccountPage';
import { Settings } from 'lucide-react';
import { ProtectedRoutes } from './components/UI/ProtectedRoutes';

function App() {
  return (
    <Router>
        <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<AuthFormPage signup={false}/>} />
              <Route path="/signup" element={<AuthFormPage signup={true} /> } />
              <Route element={<ProtectedRoutes />}>
                <Route path="/my-account" element={<AccountPage />}>
                  <Route index path="dashboard" element={<DashBoard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                  </Route>
                </Route>
              <Route path="*" element={<ErrorPage />}/>
            </Routes>
        </Layout>
    </Router>
  );
}

export default App;
