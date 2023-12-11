import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "./components/categories/categories";
import { Sorting } from "./components/sorting/sorting";
import { ProductsArea } from "./components/producrts-area/products-area";
import { Button } from "../../components/reused/button/button";
import { ACTION_TYPE } from "../../constants/action-type";
import { Pagination } from "./components/pagination/pagination";
import { appSelector } from "../../selectors/app-selector";
import styles from "./main.module.css";


export const Main = () => {
  const [searshPhrase, setSearshPhrase] = useState("");
  const dispatch = useDispatch();
  const appStore = useSelector(appSelector)

  const heandleSearch = () => {
    dispatch({
      type: ACTION_TYPE.SET_SEARCH_PHRASE,
      payload: searshPhrase,
    });    
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperSearch}>
        <input
          className={styles.input}
          type="text"
          value={searshPhrase}
          placeholder="Введите наменование товара..."
          onChange={({ target }) => setSearshPhrase(target.value)}
        />
        <Button name={"поиск"} heandler={heandleSearch} />
      </div>
      <div className={styles.wrapperMainArea}>
        <Categories />
        <div className={styles.wrapperContent}>
          <Sorting />
          <ProductsArea />
          {Math.ceil(appStore.lastPage/10) !== 1 && <Pagination />}
        </div>
      </div>
    </div>
  );
};
