import './App.css'
import { useRoutes } from 'react-router-dom'
import { appRoutes } from './routes/AppRoutes'

function App() {
  const element = useRoutes(appRoutes)
  return element
}

export default App
