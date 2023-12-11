import { useNavigate } from "react-router-dom";
import { getPrise } from "../../../../../utils/get-prise";
import styles from "./card-product.module.css";


export const CardProduct = ({ item }) => {
  const navigate = useNavigate();


  return (
    <div className={styles.wrapper} onClick={()=>navigate(`/product/${item._id}`)}>
      <div  className={styles.wrapperImg}>
      <img className={styles.img} src={item.image[0]} alt="img" />
      </div>
      
      <div className={styles.priseBlock}>
        <div className={styles.discount}>
          {getPrise(item.prise * (1 - item.discount / 100))}
        </div>
        <div className={styles.prise}>{getPrise(item.prise)}</div>
      </div>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.discountLabel}>-{item.discount}%</div>
      <div className={item.avalible > 0 ? styles.avalible : styles.notavalible}>
        {item.avalible > 0 ? "в наличии" : "нет  в наличии"}
      </div>
    </div>
  );
};
