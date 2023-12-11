import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/reused/button/button";
import { request } from "../../utils/request";
import { useSelector } from "react-redux";
import { editProductSelector } from "../../selectors/edit-product-selector";
import { productSelector } from "../../selectors/product-selector";
import styles from "./addProduct.module.css";
import { BtnBack } from "../../components/reused/button-back/button-back";

export const AddProduct = () => {
  const isEditProduct = useSelector(editProductSelector);
  const product = useSelector(productSelector);
  const navigate = useNavigate();

  const [title, setTitle] = useState(isEditProduct ? product.title : "");
  const [category, setCategory] = useState(
    isEditProduct ? product.category : ""
  );
  const [prise, setPrise] = useState(isEditProduct ? product.prise : "");
  const [discount, setDiscount] = useState(
    isEditProduct ? product.discount : ""
  );
  const [avalible, setAvalible] = useState(
    isEditProduct ? product.avalible : ""
  );
  const [description, setDescription] = useState(
    isEditProduct ? product.description : ""
  );
  const [imageUrl, setImageUrl] = useState(isEditProduct ? product.image : "");
  const [message, setMessage] = useState(null);

  const validateSendProduct = () => {
    const rule =
      title === "" ||
      category === "" ||
      prise === "" ||
      discount === "" ||
      avalible === "" ||
      description === "" ||
      imageUrl === "";

    return rule;
  };

  const showMessge = (mesageValue) => {
    setMessage(mesageValue);
    setTimeout(() => {
      setMessage(null);
    }, 1500);
  };

  const heandlSave = () => {
    if (validateSendProduct()) {
      showMessge("Должны быть заполнены все поля товара");
      return;
    }

    let image;

    if (imageUrl.includes(";")) {
      if (imageUrl[imageUrl.length - 1] === ";") {
        image = imageUrl
          .substring(0, imageUrl.length - 1)
          .split(";")
          .map((item) => item.trim());
      } else {
        image = imageUrl.split(";").map((item) => item.trim());
      }
    } else {
      image = [imageUrl.trim()];
    }

    const sendData = {
      title,
      prise,
      discount,
      category,
      avalible,
      description,
      image,
    };

    if (isEditProduct) {
      request(`/product/edit/${product._id}`, "POST", sendData).then(
        ({ error, data }) => {
          if (error) {
            showMessge(error);
          }
          showMessge(data);
          navigate(`/product/${product._id}`);
        }
      );
    } else {
      request("/productcreate", "POST", sendData).then(({ error, data }) => {
        if (error) {
          showMessge(error);
        }
        showMessge(data);
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTitleAndBtnBack}>
        <BtnBack />
        <h4>
          {isEditProduct
            ? "Отредактировать товар"
            : "Добавление товара в католог"}{" "}
          {message && <span className={styles.message}>{message}</span>}
        </h4>
      </div>

      <div className={styles.title}>Наименование товара</div>

      <input
        type="text"
        className={styles.input}
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />

      <div className={styles.title}>Категория товара</div>
      <input
        type="text"
        className={styles.input}
        value={category}
        onChange={({ target }) => setCategory(target.value)}
      />
      <div className={styles.title}>Цена товара</div>
      <input
        type="number"
        className={styles.input}
        value={prise}
        onChange={({ target }) => setPrise(target.value)}
      />
      <div className={styles.title}>Скидка в %</div>
      <input
        type="number"
        className={styles.input}
        value={discount}
        onChange={({ target }) => setDiscount(target.value)}
      />
      <div className={styles.title}>Доступно товаров на складе</div>
      <input
        type="number"
        className={styles.input}
        value={avalible}
        onChange={({ target }) => setAvalible(target.value)}
      />
      <div className={styles.title}>Описание товара</div>
      <textarea
        className={styles.textarea}
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <div className={styles.title}>Ссылки на фотографии</div>
      <div className={styles.titleInfo}>
        Ссылки на фотографии можно добавлять одну за одной разделяя их точкой с
        запятой
      </div>
      <textarea
        className={styles.textareaUrl}
        value={imageUrl}
        onChange={({ target }) => setImageUrl(target.value)}
      />
      <div>
        <Button heandler={heandlSave} name={"Сохранить товар"} />
      </div>
    </div>
  );
};
