import { useSelector } from "react-redux";
import { BtnBack } from "../../components/reused/button-back/button-back";
import { userSelector } from "../../selectors/user-selector";
import { getPrise } from "../../utils/get-prise";
import styles from "./cart.module.css";
import { CartProduct } from "./components/cart-product";
import { useState } from "react";

export const Cart = () => {
  const user = useSelector(userSelector);
  const initialtotalPrise = user.cart.reduce((acc, item) => {
    return acc + item.prise * (1 - item.discount / 100);
  }, 0);

  const [totalPrise, setTotalPrise] = useState(initialtotalPrise);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTitleAndBtnBack}>
        <BtnBack />
        <h1 className={styles.title}>Товары в корзине</h1>
      </div>
      {user.cart.length !== 0 ? (
        <div className={styles.wpapperProducts}>
          {user.cart.map((item) => (
            <CartProduct
              key={item._id}
              item={item}
              totalPrise={totalPrise}
              setTotalPrise={setTotalPrise}
            />
          ))}
        </div>
      ) : (
        <h3>Товаров в корзине пока нет</h3>
      )}
      <div className={styles.totalInform}>
        <h3 >Общая стоимость корзины</h3>
        <div className={styles.discountTotal}>{getPrise(totalPrise)}</div>
        <button className={styles.btnBuy}>купить</button>
      </div>
    </div>
  );
};
