const Script = require("../models/Scripts");
const mapSrcipt = require("../helpers/mapScript");

async function addScript(id, nameScript) {
  const script = await Script.create({
    author: id,
    name: nameScript,
    greeteng: [
      "Добрый день!",
      "Здравствуйте!",
      "Приветствуем Вас!",
      "Добро пожаловать в наш магазин!",
      "Здравствуйте, Спасибо, что вы нашли время оценить товар!",
      "Добрый день! Спасибо, остальным покупателям будет полезен ваш отзыв",
      "Благодарим за Ваш отзыв!",
      "Спасибо за высокую оценку!",
    ],
    gratitude1: [
      "Благодарим Вас за выбор нашего продукта.",
      "Мы признательны Вам за доверие к нашим продуктам.",
      "Благодарим, что Вы нашли время оценить товар.",
      "Спасибо, что выбираете нас!",
      "Спасибо за ваше внимание к нашим товарам!",
    ],
    gratitude2: [
      "У нас много класных товаров, заходите в наш магазин чтобы посмотреть.",
      "В нашем магазине есть что выбрать заходите еще.",
    ],
    goodbye: [
      "Будем рады снова видеть Вас в числе наших покупателей!",
      "Всегда рады видеть Вас снова!",
      "Наслаждайтесь покупками!",
      "Будем рады видеть Вас снова!",
      "Удачных Вам покупок",
    ],
  });
  return script;
}

async function getScript(id) {
  const script = await Script.findOne({ _id: id });
  return script;
}

async function getScripts(id) {
  const scripts = await Script.find({ author: id }).sort({ _id: -1 });
  return scripts;
}

function deleteScript(id) {
  return Script.deleteOne({ _id: id });
}

async function cloneScript(id) {
  const script = await Script.findOne({ _id: id });  
  return await Script.create(mapSrcipt(script));  
}

async function updateScript(id, userData){
	return await Script.findByIdAndUpdate(id, userData, {returnDocument: 'after'})
}

module.exports = {
  addScript,
  getScript,
  getScripts,
  deleteScript,
  cloneScript,
  updateScript,
};
