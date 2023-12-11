import { useDispatch, useSelector } from "react-redux";
import { searchSelector } from "../../../../selectors/search-selector";
import { appSelector } from "../../../../selectors/app-selector";
import styles from "./pagination.module.css";
import { ACTION_TYPE } from "../../../../constants/action-type";

export const Pagination = () => {
  const search = useSelector(searchSelector);
  const appStore = useSelector(appSelector)
  const dispatch = useDispatch();

  const setFirstPage = () => {
    dispatch({
      type: ACTION_TYPE.SET_FIRST_PAGE_TO_PAG,
    });
  };

  const setSecondPage = () => {
    dispatch({
      type: ACTION_TYPE.SET_SECOND_PAGE_TO_PAG,
    });
  };

  const setPreviousPage = () => {
    dispatch({
      type: ACTION_TYPE.SET_PREVIOUS_PAGE_TO_PAG,
    });
  };

  const setLastPage = () => {
    
    dispatch({
      type: ACTION_TYPE.SET_LAST_PAGE_TO_PAG,
      payload: Math.ceil(appStore.lastPage/10),
    });
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={search.page === 1 ? styles.decr : styles.decrActive}
        onClick={setFirstPage}
      >
        ⋘
      </div>
      <div
        className={search.page === 1 ? styles.decr : styles.decrActive}
        onClick={setPreviousPage}
      >
        ≪
      </div>
      <div className={styles.page}>{search.page}</div>
      <div
        className={search.page !== 1 ? styles.incr : styles.incrActive}
        onClick={setSecondPage}
      >
        ≫
      </div>
      <div
        className={search.page !== 1 ? styles.incr : styles.incrActive}
        onClick={setLastPage}
      >
        ⋙
      </div>
    </div>
  );
};
