import express from "express"
import { body } from "express-validator"
import reviewController from "../controllers/review.controller.js"
import tokenMiddleware from "../middleware/token.middleware.js"
import requestHandler from "../handlers/request.handler.js"

const router = express.Router({ mergeParams: true })

router.get(
    "/",
    tokenMiddleware.auth,
    reviewController.getReviewsOfUser,
)

router.post(
    "/",
    tokenMiddleware.auth,
    body("mediaId").isLength({ min: 1 })
    .exists().withMessage("mediaId is required")
    .withMessage("mediaId can't be empty"),
    body("content").isLength({ min: 1 })
    .exists().withMessage("content is required")
    .withMessage("content can't be empty"),
    body("mediaType")
    .exists().withMessage("mediaType is required")
    .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
    body("mediaTitle")
    .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
    .exists().withMessage("mediaPoster is required"),
    requestHandler.validate,
    reviewController.create
)

router.delete(
    "/:reviewId",
    tokenMiddleware.auth,
    reviewController.remove
)

export default router;