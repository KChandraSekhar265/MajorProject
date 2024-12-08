const Review=require("../models/review.js");
const Listing=require("../models/listing.js");

module.exports.createReview=async(req,res)=>{
    let l=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    l.reviews.push(newReview);
    
    await newReview.save();
    await l.save();
    req.flash("success","New Review Created");
    res.redirect(`/listings/${req.params.id}`);
}

module.exports.destroyReview=async(req,res)=>{
    let {id,revId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:revId}});
    await Review.findByIdAndDelete(revId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
}