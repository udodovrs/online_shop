import styles from "./button.module.css";

export const Button = ({ heandler, name }) => {
  return (
    <button className={styles.btn} onClick={heandler}>
      {name}
    </button>
  );
};
