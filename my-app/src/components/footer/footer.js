import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.contacts}>
          <div>Roman Udodov</div>
          <div>telegram: RuWindRes</div>
          <div>email: udodovrs@gmail.com</div>
        </div>
        <div className={styles.information}>
          <div>В этом проекте испльзованы:</div>
          <div>React JS - frontend</div>
          <div>Express JS - backend</div>
        </div>
      </div>
    </footer>
  );
};
