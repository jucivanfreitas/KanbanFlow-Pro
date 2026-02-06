import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KanbanBoard from "./Components/KanbanBoard"
import TaskDetails from "./Components/TaskDetails"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<KanbanBoard />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
