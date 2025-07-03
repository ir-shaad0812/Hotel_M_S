import express from "express";
import { getUserInfo, loginController, registerController } from "../controller/User.js";
// import {  registerController } from "../controller/User.js";
// import { requireSignIn, isAdmin } from "../middlewares/Auth.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get('/user', getUserInfo);

// protected User route auth
// router.get("/user-auth", requireSignIn, (req, res) => {
//   res.status(200).send({ ok: true });
// });
// //protected Admin route auth
// router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
//   res.status(200).send({ ok: true });
// });

export default router;