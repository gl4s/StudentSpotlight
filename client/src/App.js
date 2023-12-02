import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import AboutUs from './components/AboutUs';
import Documentation from './components/Documentation.js';
import Contact from './components/Contact.js';
import Legal from './components/Legal.js';
import StudentLogin from './components/StudentLogin';
import TeacherLogin from './components/TeacherLogin';
import SchoolReg from './components/SchoolReg.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/teacherlogin" element={<TeacherLogin />} />
        <Route path="/registration" element={<SchoolReg />} />  
      </Routes>
    </Router>
  );
};

export default App;
