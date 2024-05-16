import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import LoginDialog from 'src/components/LoginDialog'
import RegisterDialog from 'src/components/RegisterDialog'
import TopSearch from 'src/pages/ProductList/components/TopSearch'

export default function MainLayout() {
  return (
    <div>
      <Header />
      <TopSearch />
      <Outlet />
      <Footer />
      <LoginDialog />
      <RegisterDialog />
    </div>
  )
}
