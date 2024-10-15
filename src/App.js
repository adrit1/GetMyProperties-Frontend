import React, { useEffect, Suspense, lazy } from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from './store/userAction.js';
import { ErrorProvider } from './ErrorContext';
import { SuccessProvider } from './SuccessContext';
import ScrollTop from './components/ScrollTop/ScrollTop.js';
import Footer from './components/Footer/Footer.js';
import { Box } from '@mui/material';

// Lazy loading components
const Register = lazy(() => import('./Pages/Register/Register.js'));
const UserProfile = lazy(() => import('./Pages/UserProfile/UserProfile.js'));
const Properties = lazy(() => import('./Pages/Properties/Properties.js'));
const Home = lazy(() => import('./Pages/Home/Home.js'));
const AddUserProperty = lazy(() => import('./Pages/AddUserProperties/AddUserProperties.js'));
const AddProperty = lazy(() => import('./Pages/AddProperty/AddProperty.js'));
const SingleProperties = lazy(() => import('./Pages/SingleProperties/SingleProperties.js'));
const AuthPage = lazy(() => import('./Pages/AuthPage/AuthPage.js'));

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URI}user`, {
          withCredentials: true,
        });
        const data = response;

        const profileData = {
          user_name: data.data.user_name,
          email_id: data.data.email_id,
          gender: data.data.gender,
          mobile_number: data.data.mobile_number
        };

        const { _id, profile_pic, posted_properties, active_properties, tour_request, contact_request, tour_apply, contact_apply } = data.data;

        dispatch(setUser(_id, profile_pic, profileData, posted_properties, active_properties, tour_request, contact_request, tour_apply, contact_apply));
        localStorage.setItem("token", data.token);
      } catch (err) {
        console.error('Not authenticated', err);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <ErrorProvider>
      <SuccessProvider>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <ScrollTop />

            <Box component="main" sx={{ flexGrow: 1 }}>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<AuthPage />} />
                  <Route path="/user/profile" element={<UserProfile />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/add-property" element={<AddUserProperty />} />
                  <Route path="/add-verified-property" element={<AddProperty />} />
                  <Route path="/properties/single-property" element={<SingleProperties />} />
                </Routes>
              </Suspense>
            </Box>

            <Footer />
          </Box>
        </Router>
      </SuccessProvider>
    </ErrorProvider>
  );
}

export default App;
