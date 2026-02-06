import React from 'react'
import './Footer.css'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">
            © {currentYear} Datavisio - Consultoria web e análise de dados. Todos os direitos reservados.
          </p>
          <p className="footer-subtext">
            Powered by in React & Vite
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
