import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage.js';
import AboutUs from './components/AboutUs.js';
import Documentation from './components/Documentation.js';
import Contact from './components/Contact.js';
import Legal from './components/Legal.js';
import StudentLogin from './components/StudentLogin.js';
import TeacherLogin from './components/TeacherLogin.js';
import SchoolReg from './components/SchoolReg.js';
import Student from './components/Student.js';
import Teacher from './components/Teacher.js';
import SchoolAdmin from './components/SchoolAdmin.js';
import SystemAdmin from './components/SystemAdmin.js';

import Members from './components/SchoolAdmin/Members.js';
import NewUser from './components/SchoolAdmin/NewUser.js';
import SchoolMeta from './components/SchoolAdmin/SchoolMeta.js';
import SchoolSchedule from './components/SchoolAdmin/SchoolSchedule.js';
import Statistics from './components/SchoolAdmin/Statistics.js';
import SubjectAssignment from './components/SchoolAdmin/SubjectAssignment.js';

import TeacherClasses from './components/Teacher/TeacherClasses.js';
import TeacherGrades from './components/Teacher/TeacherGrades.js';
import TeacherProfile from './components/Teacher/TeacherProfile.js';
import TeacherAssignments from './components/Teacher/TeacherAssignments.js';

import GlobalSubjects from './components/SystemAdmin/GlobalSubjects.js';

import StudentFullScheduele from './components/Student/StudentFullScheduele.js';
import StudentAllGrades from './components/Student/StudentAllGrades.js';
import StudentProfile from './components/Student/StudentProfile';




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
        <Route path="/schoolregistration" element={<SchoolReg />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/schooladmin" element={<SchoolAdmin />} />
        <Route path="/systemadmin" element={<SystemAdmin />} />  

        <Route path="/members" element={<Members />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path="/schoolmeta" element={<SchoolMeta />} />
        <Route path="/schoolschedule" element={<SchoolSchedule />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/subjectassignment" element={<SubjectAssignment />} />

        <Route path="/globalsubjects" element={<GlobalSubjects/>} />

        <Route path="/teacherclasses" element={<TeacherClasses/>}/>
        <Route path="/teacherassignments" element={<TeacherAssignments/>}/>
        <Route path="/teachergrades" element={<TeacherGrades/>}/>
        <Route path="/teacherprofile" element={<TeacherProfile/>}/>

        <Route path="/studentfullscheduele" element={<StudentFullScheduele/>}/>
        <Route path="/studentallgrades" element={<StudentAllGrades/>}/>
        <Route path="/studentprofile" element={<StudentProfile/>}/>

        
      </Routes>
    </Router>
  );
};

export default App;
