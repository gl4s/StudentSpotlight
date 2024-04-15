import React, { useState } from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/Navbar.css';
import '../css/Footer.css';
import '../css/contact.css';
import react, { useRef } from 'react';
import emailjs from '@emailjs/browser';


const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_ksg5i7f', 'template_hf69v3c', form.current, '1BzVniqzvZdXE3nk0')
            .then((result) => {
                console.log(result.text);
                alert("Your message was succesfully sent!");

            }, (error) => {
                console.log(error.text);
                alert("Due to an error your message wasn't sent. Please try again later!")
            });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='main-container'>
            <Navbar />
            <div className='col-md-12'>
            <div className="content-box">
                
                <h2 className='text-center'>Contact Us</h2>
                <p className='text-center'>
                    Have questions or feedback? Reach out to us using the form below, and we'll get back to you as soon as possible.
                </p>
                <div className='content'>
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="mb-3">
                            <label htmlFor="user_name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="user_name" name="user_name" value={formData.user_name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="user_email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="user_email" name="user_email" value={formData.user_email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea className="form-control" id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            </div>

            <Footer/>
        </div>
    );
};

export default ContactUs;
