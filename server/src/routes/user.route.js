import express from "express"
import { body } from "express-validator"
import favouriteController from "../controllers/favourite.controller.js"
import userController from "../controllers/user.controller.js"
import requestHandler from "../handlers/request.handler.js"
import userModel from "../models/user.model.js"
import tokenMiddleware from  "../middleware/token.middleware.js"

const router = express.Router()

router.post(
    "/signup",
    body("username").isLength({ min: 5 })
    .exists().withMessage("username is required")
    .withMessage("username minimum 5 characters")
    .custom(async value => {
        const user = await userModel.findOne({ username: value })
        if (user) return Promise.reject("username already exists")
    }),
    body("password")
    .exists().withMessage("password is required")
    .isLength({ min: 5 }).withMessage("password minimum 5 characters"),
    body("confirmPassword")
    .exists().withMessage("password is required")
    .isLength({ min: 5 }).withMessage("confirmPassword minimum 5 characters")
    .custom((value, { req }) => {
        if (value !== req.body.password) throw new Error("confirmPassword doesn't match") 
        return true
    }),
    body("displayName")
    .exists().withMessage("displayName is required")
    .isLength({ min: 5 }).withMessage("displayname minimum 5 characters"),
    requestHandler.validate,
    userController.signup
);

router.post(
    "/signin",
    body("username").isLength({ min: 5 })
    .exists().withMessage("username is required")
    .withMessage("username minimum 5 characters"),
    body("password").isLength({ min: 5 })
    .exists().withMessage("password is required")
    .withMessage("password minimum 5 characters"),
    requestHandler.validate,
    userController.signin
)

router.put(
    "update-password",
    tokenMiddleware.auth,
    body("password")
    .exists().withMessage("password is required")
    .isLength({ min: 5 }).withMessage("password minimum 5 characters"),
    body("newPassword")
    .exists().withMessage("newPassword is required")
    .isLength({ min: 5 }).withMessage("newPassword minimum 5 characters"),
    body("confirmNewPassword")
    .exists().withMessage("confirmNewPassword is required")
    .isLength({ min: 5 }).withMessage("confirmNewPassword minimum 5 characters")
    .custom((value, { req }) => {
        if (value !== req.body.password) throw new Error("confirmNewPassword doesn't match") 
        return true
    }),
    requestHandler.validate,
    userController.updatePassword
)

router.get(
    "/info",
    tokenMiddleware.auth,
    userController.getInfo
)

router.get(
    "/favourites",
    tokenMiddleware.auth,
    favouriteController.getFavouriteOfUser
)

router.get(
    "/favourites",
    tokenMiddleware.auth,
    body("mediaType")
    .exists().withMessage("mediaType is required")
    .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
    body("mediaId")
    .exists().withMessage("mediaId is required")
    .isLength({ min: 1 }).withMessage("mediaId can't be empty"),
    body("mediaTitle")
    .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
    .exists().withMessage("mediaPoster is required"),
    body("mediaRate")
    .exists().withMessage("mediaRate is required"),
    requestHandler.validate,
    favouriteController.addFavourite
)

router.delete(
    "favourtie/:favouriteId",
    tokenMiddleware.auth,
    favouriteController.removeFavourite
)



export default router;