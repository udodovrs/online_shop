const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/token");
const ROLES = require("../constants/roles");

// register
async function register(login, password) {
  if (!password) {
    throw new Error("Pasword is empty");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });

  const token = generate({ id: user.id });

  await user.populate('cart')

  return {
    user,
    token,
  };
}
// login
async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("Пользователь не найден");
  }

  const isPaswordMatch = await bcrypt.compare(password, user.password);

  if (!isPaswordMatch) {
    throw new Error("Неверный пароль");
  }

  const token = generate({ id: user.id });

  await user.populate('cart')

  return {
    user,
    token,
  };
}

function getUsers() {
  return User.find();
}

function getRoles() {
  return [
    { id: ROLES.ADMIN, name: "Admin" },
    { id: ROLES.GUEST, name: "Guest" },
    { id: ROLES.USER, name: "User" },
  ];
}

// delete
function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

// edit(roles)
function updateUser(id, userData) {
  return User.findByIdAndUpdate(id, userData, { returnDocument: "after" });
}

async function addProductToCart(id, { productId }) {
  const user = await User.findByIdAndUpdate(
    id,
    { $push: { cart: productId } },
    { returnDocument: "after" }
  );
  await user.populate("cart");

  return user;
}

async function deleteProductToCart(id, { productId }) {
  const user = await User.findByIdAndUpdate(
    id,
    { $pull: { cart: productId } },
    { returnDocument: "after" }
  );
  await user.populate("cart");

  return user;
}

module.exports = {
  register,
  login,
  getUsers,
  getRoles,
  deleteUser,
  updateUser,
  addProductToCart,
  deleteProductToCart,
};
