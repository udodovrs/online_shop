import { useNavigate } from "react-router-dom";
import styles from "./button-back.module.css";

export const BtnBack = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.btnBack} onClick={() => navigate(-1)}>
      ⇐
    </div>
  );
};
