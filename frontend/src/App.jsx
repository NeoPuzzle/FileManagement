import './App.css'
import Footer from './components/App/Footer'
import React from 'react'; 
import NavBar from './components/App/NavBar'
import { Route, Routes } from 'react-router-dom';
import Login from './views/login/login';
import FileList from './views/files/FilesList';
import FileUpload from './views/files/FileUpload';
import FilesPage from './views/files/FilesPage';

function App() {

  return (
    <>
    <div className="container">
    <NavBar/>
    <div className="content">
    <Routes>
    <Route path="/" element={<FilesPage />} />
      <Route path="/login" element={<Login />}/>
      <Route path='/files' element={<FileList/>} />
      <Route path='/files/create' element={<FileUpload/>}/>
    </Routes>
    </div>
    
    </div>
    <div>
    <Footer />
    </div>
    </>
  )
}

export default App
