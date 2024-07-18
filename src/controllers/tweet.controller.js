import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
  
    const { content } = req.body;
    const user = req.user?._id;
    const tweet = await Tweet.create({
        content,
        owner: user
    })
    return res.status(201).json(new ApiResponse(200, tweet, "Tweet Published Successfully"))

})

const getUserTweets = asyncHandler(async (req, res) => {

    const { userId } = req.params;
    if (!isValidObjectId(userId)) {
        throw new ApiError(404, "User not found");
    }

    const userTweets = await Tweet.find({
        owner: userId
    });

    return res.status(200).json(new ApiResponse(200, userTweets, "Get user tweets "))
})

const updateTweet = asyncHandler(async (req, res) => {

    const { tweetId } = req.params;
    const { content } = req.body;

    if (!content) {
        throw new ApiError(400, "tweet content is not filled");
    }

    const updateTweetContent = await Tweet.findByIdAndUpdate(tweetId, {
        $set: {
            content: content
        }
    },
        { new: true }
    )

    return res.status(200)
        .json(new ApiResponse(200, updateTweetContent, "Tweet Updated Successfully"))
})

const deleteTweet = asyncHandler(async (req, res) => {
   
    const { tweetId } = req.params;

    await Tweet.deleteOne({
        _id: tweetId
    })

    return res.status(200)
        .json(new ApiResponse(200, {}, "Tweet Deleted Successfully"))
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}