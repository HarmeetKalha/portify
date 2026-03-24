import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer glass-card">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="text-gradient">Portify</h3>
          <p>Connecting top talent with innovative companies through portfolios.</p>
        </div>
        <div className="footer-section">
          <h4>Platform</h4>
          <ul>
            <li><a href="#">For Employees</a></li>
            <li><a href="#">For Employers</a></li>
            <li><a href="#">Pricing</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Portfolio Tips</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Portify. All rights reserved.</p>
      </div>
    </footer>
  );
}
