import './App.css';
import request from './functModule/request';
import Row from './components/Row';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Login from './components/Login';

import { useEffect, useState } from 'react';



function App() {

  const admin = {
    'email' : 'admin@gmail.com',
    'password' : 'admin'
  }

  const [user, setUser] = useState({email:"", password:""});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const Logins = details => {
      {details.email == admin.email && 
        details.password == admin.password ? 
          (setSuccess(true)): (setError("Email or Password is incorrect"))}
  }

  const Logout = detailsLogout =>{
    setSuccess(false);
    setError("");
    //console.log(detailsLogout);
  }

  const Errors = () =>{
    console.log("Not Match");
  }

  return (
    <div className="App">
      
      {success ? (
        <>
        <Navbar Logout={Logout}/>
        <Banner />
      
        <Row title="NETFLIX ORIGINALS" fetchUrl={request.fetchNetflixOriginals} isLargeRow/>
        <Row title="Trending Now" fetchUrl={request.fetchTrending}/>
        <Row title="Action Movies" fetchUrl={request.fetchActionMovies}/>
        <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies}/>
        <Row title="Documentaries" fetchUrl={request.fetchDocumantaries}/>
        <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies}/>
      </>
      ) : (
        <Login Logins={Logins} error={error}/>
       )}

       {/* <Routes>
          {success ? (
            <Route path="/home" element={
              <div>
              <Navbar Logout={Logout}/>
              <Banner />
            
              <Row title="NETFLIX ORIGINALS" fetchUrl={request.fetchNetflixOriginals} isLargeRow/>
              <Row title="Trending Now" fetchUrl={request.fetchTrending}/>
              <Row title="Action Movies" fetchUrl={request.fetchActionMovies}/>
              <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies}/>
              <Row title="Documentaries" fetchUrl={request.fetchDocumantaries}/>
              <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies}/>
              </div>
            } />
             
            
            ) : (
              <Route path="/" element={<Login Logins={Logins} Errors={Errors}/>} />
            )}
       </Routes> */}
    </div>
  );
}

export default App;
