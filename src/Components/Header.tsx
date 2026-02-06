import React from 'react'
import './Header.css'

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">Bem vindo ao Datavisio!</h1>
      <h2 className="app-subtitle">App Gerenciador de Tarefas</h2>
    </header>
  )
}

export default Header
