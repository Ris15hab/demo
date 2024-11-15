import './App.css';
import Login from './components/Login/Login'
import CreateDB from './components/CreateDB/CreateDB'
import Error from './components/Error/Error'
import Profile from './components/Profile/Profile'
import HowToUse from './components/HowToUse/HowToUse'
import Register from './components/Register/Register'
import ViewAPI from './components/ViewAPI/ViewAPI'
import API from './components/API/API'
import Collection from './components/Collection/Collection'
import Contact from './components/Contact/Contact'
import { Route, Routes } from "react-router";
import { BrowserRouter as Router, Outlet, Navigate } from "react-router-dom";

function App() {
  const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/error" />;
  };
  return (

      <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/error" element={<Error />} />

          <Route path="/createdb" element={<PrivateRoute />}>
          <Route path="/createdb" element={<CreateDB />} />
          </Route> 

          <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/viewapi" element={<PrivateRoute />}>
          <Route path="/viewapi" element={<ViewAPI />} />
          </Route>

          <Route path="/api/:id" element={<PrivateRoute />}>
          <Route path="/api/:id" element={<API />} />
          </Route>

          <Route path="/collection/:id" element={<PrivateRoute />}>
          <Route path="/collection/:id" element={<Collection />} />
          </Route>

          <Route path="/contact" element={<PrivateRoute />}>
          <Route path="/contact" element={<Contact />} />
          </Route>

          <Route path="/howtouse" element={<PrivateRoute />}>
          <Route path="/howtouse" element={<HowToUse />} />
          </Route>
          
        </Routes>
      </div>
    </Router>

  );
}

export default App;