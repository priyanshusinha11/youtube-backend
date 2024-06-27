import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    tweet: {
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    },
    likedby: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

}, { timestamps: true })

export const Like = mongoose.model("Like", likeSchema)