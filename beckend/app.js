require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  register,
  login,
  addProductToCart,
  deleteProductToCart,
} = require("./controllers/user");
const mapUser = require("./helpers/mapUser");
const authenticated = require("./middleware/authenticated");
const hasRole = require("./middleware/hasrole");
const ROLES = require("./constants/roles");
const mapComment = require("./helpers/mapComment");
const {
  addProduct,
  getCategories,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/product");

const port = 3001;

const app = express();

app.use(express.static("../my-app/build"));

app.use(cookieParser());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

app.get("/categories", async (req, res) => {
  const categories = await getCategories();
  res.send({ error: null, data: categories });
});

app.post("/products", async (req, res) => {
  const { products, count } = await getProducts(req.body);
  res.send({ error: null, data: { products, count } });
});

app.get("/product/:id", async (req, res) => {
  const product = await getProduct(req.params.id);
  res.send({ error: null, data: product });
});

app.use(authenticated);

app.post("/productcreate", hasRole([ROLES.ADMIN]), async (req, res) => {
  await addProduct(req.body);
  res.send({ error: null, data: "Товар успешно сохранен" });
});

app.post("/product/edit/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await updateProduct(req.params.id, req.body);
  res.send({ error: null, data: "Товар успешно сохранен" });
});

app.delete("/product/delete/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteProduct(req.params.id);
  res.send({ error: null, data: "Товар успешно удален" });
});

app.post("/user/addToCart/:id", hasRole([ROLES.USER]), async (req, res) => {
  const user = await addProductToCart(req.params.id, req.body);
  res.send({ error: null, data: mapUser(user) });
});

app.post(
  "/user/deleteFromCart/:id",
  hasRole([ROLES.USER]),
  async (req, res) => {
    const user = await deleteProductToCart(req.params.id, req.body);
    res.send({ error: null, data: mapUser(user) });
  }
);

/* app.get("/scripts/:id", async (req, res) => {
  const scripts = await getScripts(req.params.id);
  
  res.send({ error: null, data: scripts });
});

app.get("/script/:id", async (req, res) => {
  const script = await getScript(req.params.id);
  
  res.send({ error: null, data: script });
});

app.delete(`/scripts/delete/:id`, async (req, res)=>{
  const script = await deleteScript(req.params.id)
  res.send({ error: null, data: script })
})

app.post(`/scripts/clone/:id`, async (req, res)=>{
  const script = await cloneScript(req.params.id)
  res.send({ error: null, data: 'Сценарий скопирован' })
})

app.post(`/script/save/:id`, async (req, res)=>{ 
  const script = await updateScript(req.params.id, req.body)
  res.send({ error: null, data: 'Сценарий сохранен' })
}) */

mongoose.connect(process.env.DB_CONECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server was started on port ${port}`);
  });
});
