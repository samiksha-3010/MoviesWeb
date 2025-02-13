import React from 'react'
import "./Style/Footer.css";


const Footer = () => {
  return (
    <div>
        <footer className="site-footer">
    <div class="footer-content">
        <div class="footer-section">
            <h3>About Us</h3>
            <p>We are dedicated to providing the best service to our customers. Our mission is to create innovative solutions for a better tomorrow.</p>
        </div>
        
        <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
        
        <div class="footer-section">
            <h3>Connect With Us</h3>
            <div class="social-links">
                <a href="#" class="social-link">Facebook</a>
                <a href="#" class="social-link">Twitter</a>
                <a href="#" class="social-link">LinkedIn</a>
                <a href="#" class="social-link">Instagram</a>
            </div>
        </div>
        
        <div class="footer-section">
            <h3>Contact Info</h3>
            <p>Email: info@example.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Address: 123 Main St, City, Country</p>
        </div>
    </div>
    
    <div class="footer-bottom">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
    </div>
</footer>
    </div>
  )
}

export default Footer