import { useDispatch, useSelector } from "react-redux";
import { searchSelector } from "../../../../selectors/search-selector";
import styles from "./sorting.module.css";
import { ACTION_TYPE } from "../../../../constants/action-type";

export const Sorting = () => {
  const search = useSelector(searchSelector);
  const dispatch = useDispatch();

  const heandelDecrease = () => {
    dispatch({
      type: ACTION_TYPE.DECREASE_SORT,
      payload: !search.decrease,
    });
  };

  const heandelIncrease = () => {
    dispatch({
        type: ACTION_TYPE.INCREASE_SORT,
        payload: !search.increase,
      });
  };
  return (
    <div className={styles.wrapper}>
      <div
        className={
          search.decrease ? styles.sortingChoosedItem : styles.sortingItem
        }
        onClick={heandelDecrease}
      >
        По убываню цены
      </div>
      <div
        className={
          search.increase ? styles.sortingChoosedItem : styles.sortingItem
        }
        onClick={heandelIncrease}
      >
        По возростанию цены
      </div>
    </div>
  );
};
