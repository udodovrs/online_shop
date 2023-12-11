import { useState } from "react";
import { getPrise } from "../../../utils/get-prise";
import { request } from "../../../utils/request";
import { ACTION_TYPE } from "../../../constants/action-type";
import { setUserSessionStorage } from "../../../utils/session-storage";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../selectors/user-selector";
import styles from "./cart-product.module.css";

export const CartProduct = ({ item, totalPrise, setTotalPrise }) => {
  const [count, setCount] = useState(1);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const heandleDecrese = () => {
    if (count > 1) {
      setCount(count - 1);
      setTotalPrise(totalPrise - item.prise * (1 - item.discount / 100));
    }
  };

  const heandleIncrese = () => {
    setCount(count + 1);
    setTotalPrise(totalPrise + item.prise * (1 - item.discount / 100));
  };

  const deleteFromCart = () => {
    request(`/user/deleteFromCart/${user.id}`, "POST", {
      productId: item._id,
    }).then(({ error, data }) => {
      dispatch({
        type: ACTION_TYPE.SET_USER,
        payload: data,
      });
      setUserSessionStorage();
      setTotalPrise(
        totalPrise - item.prise * (1 - item.discount / 100) * count
      );
    });
  };

  return (
    <div key={item._id} className={styles.wrapperProduct}>
      <img src={item.image[0]} alt="img" className={styles.img} />
      <div className={styles.wrapperCountAndDeleteBtn}>
        <div className={styles.wrapperCount}>
          <div className={styles.chengeCount} onClick={heandleDecrese}>
            -
          </div>
          <div className={styles.count}>{count}</div>
          <div className={styles.chengeCount} onClick={heandleIncrese}>
            +
          </div>
        </div>
        <button className={styles.dleteBtn} onClick={deleteFromCart}>
          Удалить из корзины
        </button>
      </div>

      <div className={styles.wrapperInformation}>
        <div className={styles.title}>{item.title}</div>
        <div>
          <div className={styles.discount}>
            {getPrise(item.prise * (1 - item.discount / 100))}
          </div>
          <div className={styles.prise}>{getPrise(item.prise)}</div>
        </div>
        <div>Общая стоимость:</div>
        <div className={styles.discountTotal}>
          {getPrise(item.prise * (1 - item.discount / 100) * count)}
        </div>
      </div>
    </div>
  );
};
