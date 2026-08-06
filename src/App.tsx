import { Navigate, Route, Routes } from 'react-router-dom'
import { TabletView } from './pages/TabletView'
import { TVView } from './pages/TVView'

function App() {
  return (
    <Routes>
      <Route path="/tablet" element={<TabletView />} />
      <Route path="/tv" element={<TVView />} />
      <Route path="*" element={<Navigate to="/tablet" replace />} />
    </Routes>
  )
}

export default App
