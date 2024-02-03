import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import BuildPc from './pages/BuildPc/BuildPc'
import MainLayout from './layouts/MainLayout'
import CheckOrder from './pages/CheckOrder'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import path from './constants/path'
import Admin from './pages/Admin/Admin'

function App() {
  return (
    <div>
      <Routes>
        <Route path={path.home} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={path.admin} element={<Admin />} />
          <Route path={path.build_pc} element={<BuildPc />} />
          <Route path={path.check_oder} element={<CheckOrder />} />
          <Route path={path.cart} element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
