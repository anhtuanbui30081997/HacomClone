import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import LoginDialog from 'src/components/LoginDialog'
import RegisterDialog from 'src/components/RegisterDialog'

export default function MainLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <LoginDialog />
      <RegisterDialog />
    </div>
  )
}
