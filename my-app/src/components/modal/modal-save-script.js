import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { userSelector } from "../../selectors/user-selector";
import { appSelector } from "../../selectors/app-selector";
import { ACTION_TYPE } from "../../constants/action-type";
import { request } from "../../utils/request";
import { useNavigate } from "react-router-dom";
import styles from "./modal-save-script.module.css";

export const ModalSaveScript = () => {
  const [value, setValue] = useState("");
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateScript = () => {
    if (value === "") {
      return;
    }
    request(`/scriptscreate/${user.id}`, "POST", { name: value }).then(({error, data}) => {
      dispatch({
        type: ACTION_TYPE.ID_EDIT_SCRIPT,
        payload: data._id,
      });

      dispatch({
        type: ACTION_TYPE.IS_MODAL,
        payload: false,
      });
      navigate(`/scripts/edit/${data._id}`);
    });
    setValue('')
  };

  const handleCancel = () => {
    dispatch({
      type: ACTION_TYPE.IS_MODAL,
      payload: false,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.name}>Название сценария</div>
        <input
          type="text"
          value={value}
          className={styles.input}
          onChange={({ target }) => setValue(target.value)}
        />
        <div className={styles.wrapperBtn}>
          <button className={styles.btn} onClick={handleCreateScript}>
            Сохранить
          </button>
          <button onClick={handleCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
};
