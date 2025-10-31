import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import PesanPage from './pages/PesanPage'
import HistoryPage from './pages/HistoryPage'
import AboutPage from './pages/AboutPage'
import Navbar from './components/navbar/Navbar'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/pesan" element={<PesanPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 text-center py-3 text-sm text-slate-500">
        © 2025 Griya Dahar Amel Kale Kaya Bakaran
      </footer>
    </div>
  )
}