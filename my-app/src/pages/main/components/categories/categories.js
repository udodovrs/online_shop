import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../../../../utils/request";
import { ACTION_TYPE } from "../../../../constants/action-type";
import { searchSelector } from "../../../../selectors/search-selector";
import styles from "./categories.module.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const search = useSelector(searchSelector);

  useEffect(() => {
    request("/categories").then(({ error, data }) => {
      if (error) {
        console.error("ошибка загрузки категорий товаров");
      }
      setCategories(data);
    });
  }, []);

  const heandleChooseCategory = (item) => {
    dispatch({
      type: ACTION_TYPE.SET_CATEGORY,
      payload: item,
    });
    dispatch({
      type: ACTION_TYPE.DELETE_SEARCH_PHRASE,      
    });
    dispatch({
      type: ACTION_TYPE.SET_FIRST_PAGE_TO_PAG,      
    });
  };

  return (
    <div className={styles.wrapper}>
      <div
          
          className={
            search.category === ''
              ? styles.categoryItemActive
              : styles.categoryItem
          }
          onClick={() => heandleChooseCategory('')}
        >
          все товары
        </div>
      {categories.map((item, index) => (
        <div
          key={index}
          className={
            search.category === item
              ? styles.categoryItemActive
              : styles.categoryItem
          }
          onClick={() => heandleChooseCategory(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
