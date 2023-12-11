import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Register } from "./pages/register/register";
import { Autorize } from "./pages/autorize/autorize";
import { ModalSaveScript } from "./components/modal/modal-save-script";
import { useSelector } from "react-redux";
import { appSelector } from "./selectors/app-selector";
import { Cart } from "./pages/cart/cart";
import { AddProduct } from "./pages/addProduct/addProduct";
import { Main } from "./pages/main/main";
import { Product } from "./pages/product/product";
import styles from './App.module.css'

export const  App = () => {
  const appStore = useSelector(appSelector)

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.wrapperContent}>
        {appStore.isModal && < ModalSaveScript /> }
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Autorize />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/product/edit/:productId" element={<AddProduct />} />
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}


