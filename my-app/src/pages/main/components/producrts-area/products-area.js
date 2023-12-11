import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../../../../utils/request";
import { searchSelector } from "../../../../selectors/search-selector";
import { CardProduct } from "./card-product/card-product";
import styles from "./products-area.module.css";
import { ACTION_TYPE } from "../../../../constants/action-type";

export const ProductsArea = () => {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const search = useSelector(searchSelector);

  useEffect(() => {
    setIsLoaded(true);
    request("/products", "POST", search).then(({ error, data }) => {
      if (error) {
        console.error("Ошибка получения списка товаров");
      }
      setProducts(data.products);
      dispatch({
        type: ACTION_TYPE.SET_COUNT_PAGE,
        payload: data.count,
      });
      setIsLoaded(false);
    });
  }, [search.updateSearch, search, dispatch]);

  return (
    <div className={styles.wrapper}>
      {isLoaded
        ? "Загрука товаров..."
        : products.length === 0
        ? "Товары по данному запросу не найдены"
        : products.map((item) => <CardProduct key={item._id} item={item} />)}
    </div>
  );
};
