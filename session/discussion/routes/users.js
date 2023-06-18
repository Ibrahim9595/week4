import { Router } from "express";

export const router = Router();

const userHandler = (req, res) => {
  res.send("The user");
};

const usersListHandler = (req, res) => {
  res.send("Users");
};

const saveUser = (req, res) => {
  res.status(201).send("User Created");
};

const validateUser = (req, res, next) => {
  const { name, age } = req.body || {};

  if (name && age) {
    next();
  }

  res.status(400).send("Invalid user");
};

router.get("/:userId([0-9]+)", userHandler);
router.get("/", usersListHandler);
router.post("/", validateUser, saveUser);