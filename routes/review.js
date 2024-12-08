const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {validateReview,isLoggedin,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

router.post("/",isLoggedin,validateReview,wrapAsync(reviewController.createReview));

router.delete("/:revId",isLoggedin,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;