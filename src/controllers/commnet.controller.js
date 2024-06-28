import mongoose, { isValidObjectId } from "mongoose"
import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        populate: ['owner', 'video'],
        sort: { createdAt: -1 }
    }
    const comments = await Comment.paginate({ videp: videoId }, options)
    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                comments,
                "comments fetched successfully"
            )
        )
})

const addComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const userId = req.user?._id
    const { content } = req.body
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id")
    }
    const comment = await Comment.create({
        video: videoId,
        content,
        owner: userId
    })
    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                comment,
                "Comment created successfully"
            )
        )
})

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    const { content } = req.body
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid video id")
    }
    if (!content) {
        throw new ApiError(400, "Content is required")
    }
    const updatedComment = await Comment.findByIdAndUpdate(commentId, {
        $set: {
            content
        }
    }, {
        new: true
    })
    if (!updatedComment) {
        throw new ApiError(500, "Comment couldn't update")
    }
    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                updatedComment,
                "Comment updated successfully"
            )
        )
})

const deleteComment = asyncHandler(async (req, res) => {
    const {commentId} =req.params;
    if(!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id")
    }
    await Comment.findByIdAndDelete({_id: commentId})
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Comment deleted successfully"
        )
    )
})

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}