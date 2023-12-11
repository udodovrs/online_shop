export const getPrise = (prise) => {
    return prise.toLocaleString("ru-RU", {
      style: "currency",
      currency: "RUB",
    });
  };
