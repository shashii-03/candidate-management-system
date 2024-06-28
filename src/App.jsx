import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Candidate from './components/Candidate/Candidate';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCandidate from './components/AddCandidate/AddCandidate';
import DisplayCandidateMultistep from './components/Candidate/DisplayCandidateMultistep';

const clientId = '233823334409-utlocfu8v7gr2v2gn6u6ivnti9cqmjoq.apps.googleusercontent.com';

const GoogleLoginComponent = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    console.log('Login Success', credentialResponse);
    navigate('/candidate');
  };

  const handleLoginError = () => {
    alert("Oops, login failed!");
    console.log('Login Failed');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 border rounded">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          useOneTap
        />
      </div>
    </div>
  );
};

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GoogleLoginComponent />} />
          <Route path="/candidate" element={<Candidate />}>
            <Route path=":id" element={<DisplayCandidateMultistep />} />
            <Route path="new" element={<AddCandidate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
