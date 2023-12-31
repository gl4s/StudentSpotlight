import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import '../../css/SchoolMeta.css';

const SchoolMetaComp = () => {

  return (
    <div className="school-meta-comp">
      {/* Header with Link for navigation */}
      <div className="header">
        <Link to="/teacherlogin" className="back-button">Back</Link>
        <h2>{}</h2>
      </div>

    </div>
  );
};

export default SchoolMetaComp;
