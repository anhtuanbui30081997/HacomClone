import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import BuildPc from './pages/BuildPc/BuildPc'
import MainLayout from './layouts/MainLayout'
import CheckOrder from './pages/CheckOrder'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='buildpc' element={<BuildPc />} />
          <Route path='check-order' element={<CheckOrder />} />
          <Route path='cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
