import { useForm } from "react-hook-form";
import { useState } from "react";
import { request } from "../../utils/request";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setUserSessionStorage } from "../../utils/session-storage";
import { ACTION_TYPE } from "../../constants/action-type";
import styles from "./register.module.css";

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState(null);

  const onSubmit = ({login, password, email}) => {
    request('/register', 'POST', { login, password, email }).then(({ user, error }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch({
        type: ACTION_TYPE.SET_USER,
        payload: user,
      });
			setUserSessionStorage();
      navigate('/')
		});
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.window} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.title}>Регистрация</div>
        <input
          className={styles.input}
          placeholder="Логин..."
          {...register("login", {
            required: { value: true, message: "Поле логин обязательно" },
            pattern: {
              value: /^[A-Za-z-0-9-#%_]+$/i,
              message:
                "Используйте латинские символы, нельзя использовать символы $&?",
            },
            maxLength: {
              value: 20,
              message: "Логин не может содержать больше 20 символов",
            },
            minLength: {
              value: 3,
              message: "Логин должен содержать минимум 3 символов",
            },
          })}
        />
        <div className={styles.error}>{errors.login?.message}</div>
        <input
          className={styles.input}
          placeholder="Email..."
          {...register("email", {
            required: { value: true, message: "Поле email обязательно" },
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message:
                "Несуществующий email",
            },       
          })}
        />
        <div className={styles.error}>{errors.email?.message}</div>
        <input
          className={styles.input}
          type="password"
          placeholder="Пароль..."
          {...register("password", {
            required: { value: true, message: "Поле пароль обязательно" },
            pattern: {
              value: /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d).*$/,
              message:
                "Паопль должен содержать латинские буквы и цифры",
            },
            maxLength: {
              value: 20,
              message: "Пароль не может содержать больше 20 символов",
            },
            minLength: {
              value: 6,
              message: "Пароль должен содержать минимум 6 символов",
            },
          })}
        />
        <div className={styles.error}>{errors.password?.message}</div>
        <input
          className={styles.input}
          type="password"
          placeholder="Повтор пароля..."
          {...register("checkPassword", {
            required: { value: true, message: "Подтверждение пароля обызателено" },   
            validate: (val) => {
                if (watch("password") !== val) {
                  return "Пароли не совпадают";
                }
              }         
          })}
        />
        <div className={styles.error}>{errors.checkPassword?.message}</div>
        <input type="submit" className={styles.btn}/>
        <div className={styles.error}>{serverError}</div>
      </form>
    </div>
  );
};
