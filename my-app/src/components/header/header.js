import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSelector } from "../../selectors/user-selector";
import { request } from "../../utils/request";
import { ACTION_TYPE } from "../../constants/action-type";
import { Button } from "../reused/button/button";
import { removeUserSessionStorage } from "../../utils/session-storage";
import styles from "./header.module.css";

export const Header = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    request("/logout", "POST").then(() => {
      dispatch({
        type: ACTION_TYPE.LOGOUT,
      });
      removeUserSessionStorage();
      navigate("/");
    });
  };

  const addProduct = () => {
    dispatch({
      type: ACTION_TYPE.ERASE_PRODUCT,
    });
    dispatch({
      type: ACTION_TYPE.EDIT_PRODUCT,
      payload: false,
    });
  };
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logoAndtext}>
          <Link to="/" className={styles.link}>
            <div className={styles.logo}>
              <div className={styles.wrapperNV}>
                <div className={styles.charN}>H</div>
                <div className={styles.charV}>В</div>
              </div>
              <div className={styles.enetShop}>магазин</div>
            </div>
          </Link>
          <div className={styles.text}>Итернет магазин нужных вещей</div>
        </div>
        {user.login ? (
          <>
            <div className={styles.loginAndExit}>
              <div className={styles.login}>{user.login}</div>
              {user.role === 0 ? (
                <Link to="/addProduct">
                  <Button heandler={addProduct} name={"Добавить товар"} />
                </Link>
              ) : (
                <Link to="/cart" className={styles.link}>
                  <div className={styles.wrapperCart}>
                    <div className={styles.cart}>🛒</div>
                    {user.cart.length !== 0 && (
                      <div className={styles.countCart}>{user.cart.length}</div>
                    )}
                  </div>
                </Link>
              )}
              <Button heandler={logout} name={"Выйти"} />
            </div>
          </>
        ) : (
          <div className={styles.wrapperRegAut}>
            <Link to="/register" className={styles.link}>
              <Button name={"Зарегистрироваться"} />
            </Link>
            <Link to="/login" className={styles.link}>
              <Button name={"Войти"} />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
