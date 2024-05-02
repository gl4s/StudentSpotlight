import React from "react";
import { Link } from "react-router-dom";
import '../css/Footer.css';

const Footer = () => {
  const handleDownload = () => {
    // Construct the URL to your local documentation file
    const documentationUrl = "/studentspotlight.pdf";
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = documentationUrl;
    // Set the download attribute and filename
    link.setAttribute("download", "studentspotlight.pdf");
    // Trigger the click event to start the download
    document.body.appendChild(link);
    link.click();
    // Cleanup
    document.body.removeChild(link);
  };

  return (
    <footer className="custom-footer">
      <div className="footer-labels">
        <Link to="/aboutus" className="footer-label">
          ABOUT US
        </Link>
        <span className="footer-label" onClick={handleDownload}>
          DOCUMENTATION
        </span>
        <Link to="/contact" className="footer-label">
          CONTACT
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
