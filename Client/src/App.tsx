import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import BuildPc from './pages/BuildPc/BuildPc'
import MainLayout from './layouts/MainLayout'
import CheckOrder from './pages/CheckOrder'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import path from './constants/path'
import Admin from './pages/Admin/Admin'
import ProductList from './pages/ProductList'
import { CategoryType } from './constants/category.enum'
import ProductDetail from './pages/ProductDetail'
import { useEffect } from 'react'

function App() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return (
    <div>
      <Routes>
        <Route path={path.home} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={path.admin} element={<Admin />} />
          <Route
            path={path.laptop_macbook_surface}
            element={<ProductList category={CategoryType.LaptopMacbookSurface} />}
          />
          <Route
            path={path.laptop_may_tinh_xach_tay}
            element={<ProductList category={CategoryType.LaptopMayTinhXachTay} />}
          />
          <Route path={path.laptop_acer} element={<ProductList category={CategoryType.LaptopAcer} />} />
          <Route path={path.laptop_acer_asprire} element={<ProductList category={CategoryType.LaptopAcerAspire} />} />
          <Route path={path.laptop_acer_swift} element={<ProductList category={CategoryType.LaptopAcerSwift} />} />
          <Route path={path.laptop_acer_spin} element={<ProductList category={CategoryType.LaptopAcerSpin} />} />
          <Route
            path={path.laptop_acer_travel_mate}
            element={<ProductList category={CategoryType.LaptopAcerTravelMate} />}
          />
          <Route path={path.laptop_asus} element={<ProductList category={CategoryType.LaptopAsus} />} />
          <Route
            path={path.laptop_asus_vivobook}
            element={<ProductList category={CategoryType.LaptopAsusVivobook} />}
          />
          <Route path={path.laptop_asus_zenbook} element={<ProductList category={CategoryType.LaptopAsusZenbook} />} />
          <Route
            path={path.laptop_asus_zenbook_flip_s}
            element={<ProductList category={CategoryType.LaptopAsusZenbookFlipS} />}
          />
          <Route
            path={path.laptop_asus_zenbook_flip}
            element={<ProductList category={CategoryType.LaptopAsusZenbookFlip} />}
          />
          <Route
            path={path.laptop_asus_zenbook_duo}
            element={<ProductList category={CategoryType.LaptopAsusZenbookDuo} />}
          />
          <Route
            path={path.laptop_asus_expertbook}
            element={<ProductList category={CategoryType.LaptopAsusExpertbook} />}
          />
          <Route path={path.laptop_asus_x_series} element={<ProductList category={CategoryType.LaptopAsusXSeries} />} />
          <Route path={path.laptop_asus_pro_art} element={<ProductList category={CategoryType.LaptopAsusProArt} />} />
          <Route path={path.laptop_dell} element={<ProductList category={CategoryType.LaptopDell} />} />
          <Route
            path={path.laptop_dell_insprion}
            element={<ProductList category={CategoryType.LaptopDellInspiron} />}
          />
          <Route path={path.laptop_dell_vostro} element={<ProductList category={CategoryType.LaptopDellVostro} />} />
          <Route
            path={path.laptop_dell_latitude}
            element={<ProductList category={CategoryType.LaptopDellLatitude} />}
          />
          <Route path={path.laptop_dell_xps} element={<ProductList category={CategoryType.LaptopDellXps} />} />
          <Route
            path={path.laptop_dell_precision}
            element={<ProductList category={CategoryType.LaptopDellPrecision} />}
          />
          <Route path={path.laptop_hp} element={<ProductList category={CategoryType.LaptopHp} />} />
          <Route path={path.laptop_hp_pavilion} element={<ProductList category={CategoryType.LaptopHpPavilion} />} />
          <Route path={path.laptop_hp_probook} element={<ProductList category={CategoryType.LaptopHpProbook} />} />
          <Route path={path.laptop_hp_elitebook} element={<ProductList category={CategoryType.LaptopHpElitebook} />} />
          <Route path={path.laptop_hp_envy} element={<ProductList category={CategoryType.LaptopHpEnvy} />} />
          <Route path={path.laptop_hp_spectre} element={<ProductList category={CategoryType.LaptopHpSpectre} />} />
          <Route path={path.laptop_hp_14s_15s} element={<ProductList category={CategoryType.LaptopHp14s15s} />} />
          <Route
            path={path.laptop_hp_pavilion_x360}
            element={<ProductList category={CategoryType.LaptopHpPavilionX360} />}
          />
          <Route path={path.laptop_lenovo} element={<ProductList category={CategoryType.LaptopLenovo} />} />
          <Route
            path={path.laptop_lenovo_ideapad}
            element={<ProductList category={CategoryType.LaptopLenovoIdeapad} />}
          />
          <Route
            path={path.laptop_lenovo_thinkpad}
            element={<ProductList category={CategoryType.LaptopLenovoThinkpad} />}
          />
          <Route
            path={path.laptop_lenovo_thinkbook}
            element={<ProductList category={CategoryType.LaptopLenovoThinkbook} />}
          />
          <Route path={path.laptop_lenovo_yoga} element={<ProductList category={CategoryType.LaptopLenovoYoga} />} />
          <Route path={path.laptop_msi} element={<ProductList category={CategoryType.LaptopMsiModern15} />} />
          <Route path={path.laptop_msi_prestige} element={<ProductList category={CategoryType.LaptopMsiPrestige} />} />
          <Route path={path.laptop_msi_summit} element={<ProductList category={CategoryType.LaptopMsiSummit} />} />
          <Route path={path.laptop_msi_modern} element={<ProductList category={CategoryType.LaptopMsiModern} />} />
          <Route path={path.laptop_msi_modern_14} element={<ProductList category={CategoryType.LaptopMsiModern14} />} />
          <Route path={path.laptop_msi_modern_15} element={<ProductList category={CategoryType.LaptopMsiModern15} />} />
          <Route path={path.macbook} element={<ProductList category={CategoryType.Macbook} />} />
          <Route
            path={path.laptop_apple_macbook_aircbook}
            element={<ProductList category={CategoryType.LaptopAppleMacbookAir} />}
          />
          <Route
            path={path.laptop_apple_macbook_pro_13}
            element={<ProductList category={CategoryType.LaptopAppleMacbookPro13} />}
          />
          <Route path={path.laptop_lg} element={<ProductList category={CategoryType.LaptopLg} />} />
          <Route path={path.laptop_lg_gram_14} element={<ProductList category={CategoryType.LaptopLgGram14} />} />
          <Route path={path.laptop_lg_gram_15} element={<ProductList category={CategoryType.LaptopLgGram15} />} />
          <Route path={path.laptop_lg_gram_16} element={<ProductList category={CategoryType.LaptopLgGram16} />} />
          <Route path={path.laptop_lg_gram_17} element={<ProductList category={CategoryType.LaptopLgGram17} />} />
          <Route path={path.microsoft_surface} element={<ProductList category={CategoryType.MicrosoftSurface} />} />
          <Route path={path.laptop_vaio} element={<ProductList category={CategoryType.LaptopVaio} />} />
          <Route path={path.laptop_vaio_fe} element={<ProductList category={CategoryType.LaptopVaioFe} />} />
          <Route path={path.producDetail} element={<ProductDetail />} />
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
