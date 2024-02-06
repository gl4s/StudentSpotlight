import React from 'react';
import { Link } from 'react-router-dom';

const SubjectAssignmentComp = () => {
    return (
        <div>
            <div className="header">
                <Link to="/schooladmin" className="back-button">
                    Back
                </Link>
                <h2 className="title">Assign Subjects to Teachers</h2>
            </div>
            {/* Your component JSX here */}
            <h2>Subject Assignment Component</h2>
            <p>This is a placeholder for Subject Assignment Component.</p>
        </div>
    );
};

export default SubjectAssignmentComp;