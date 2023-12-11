import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../../utils/request";
import { getPrise } from "../../utils/get-prise";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../selectors/user-selector";
import { Button } from "../../components/reused/button/button";
import { ACTION_TYPE } from "../../constants/action-type";
import styles from "./product.module.css";
import { BtnBack } from "../../components/reused/button-back/button-back";
import { setUserSessionStorage } from "../../utils/session-storage";

export const Product = () => {
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { productId } = useParams();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editProduct = () => {
    dispatch({
      type: ACTION_TYPE.SET_PRODUCT,
      payload: { ...product, image: product.image.join(";") },
    });
    dispatch({
      type: ACTION_TYPE.EDIT_PRODUCT,
      payload: true,
    });
    navigate(`/product/edit/${productId}`);
  };

  const deleteProduct = () => {
    request(`/product/delete/${productId}`, "DELETE").then(
      ({ error, data }) => {
        if (error) {
          console.log(error);
        }
        navigate(`/`);
      }
    );
  };

  const AddtoCart = () => {
    request(`/user/addToCart/${user.id}`, "POST", {
      productId,
    }).then(({ error, data }) => {
      dispatch({
        type: ACTION_TYPE.SET_USER,
        payload: data,
      });
      setUserSessionStorage();
    });
  };

   useEffect(() => {
    setIsLoaded(false);
    request(`/product/${productId}`).then(({ error, data }) => {
      if (error) {
        console.error();
        return;
      }
      setProduct(data);
      setIsLoaded(true);
      setMainImg(data.image[0]);
    });
  }, [productId]);

  return (
    <div className={styles.wrapper}>
      {isLoaded ? (
        <>
          <div className={styles.wrapperTitleAndBtnBack}>
            <BtnBack />
            <h1 className={styles.title}>{product.title}</h1>
          </div>

          <div className={styles.wrapperContent}>
            <div className={styles.wrapperImg}>
              <div className={styles.wrapperMiniImg}>
                {product.image.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    alt="img"
                    className={
                      item === mainImg ? styles.miniImgActive : styles.miniImg
                    }
                    onClick={() => setMainImg(item)}
                  />
                ))}
              </div>
              <img src={mainImg} alt="img" className={styles.mainImg} />
            </div>
            <div className={styles.information}>
              <div className={styles.discountLabel}>-{product.discount}%</div>
              <div className={styles.discount}>
                {getPrise(product.prise * (1 - product.discount / 100))}
              </div>
              <div className={styles.prise}>{getPrise(product.prise)}</div>
              <div className={styles.avalible}>
                Доступно на складе: {product.avalible}шт.
              </div>
              {user.role !== 0 && (
                <>
                  <button className={styles.btnBuy}>Купить</button>
                  <button
                    className={styles.btnCart}
                    disabled={
                      user.role === 2
                        ? true
                        : false ||
                          user.cart.map(({ _id }) => _id).includes(productId)
                    }
                    onClick={AddtoCart}
                  >
                    Добавить в корзину <span className={styles.cart}>🛒</span>
                  </button>
                </>
              )}

              {user.role === 2 && (
                <div className={styles.alarmCart}>
                  Вам нужно авторизоваться, что бы положить товар в корзину
                </div>
              )}
              {user.cart.map(({ _id }) => _id).includes(productId) && (
                <div className={styles.alarmCart}>
                  Вы добавили товар в козину
                </div>
              )}
              {user.role === 0 && (
                <div className={styles.wrapperAdminBtn}>
                  <Button heandler={editProduct} name={"редактировать товар"} />
                  <Button heandler={deleteProduct} name={"удалить товар"} />
                </div>
              )}
            </div>
          </div>
          <div className={styles.description}>{product.description}</div>
        </>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
};
