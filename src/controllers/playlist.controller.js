import mongoose, { isValidObjectId } from "mongoose"
import { Playlist } from "../models/playlist.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body
   
    if (!name || !description) {
        throw new ApiError(400, "Please provide all required fields")
    }

    const playlist = await Playlist.create({ name, description, owner: req.user._id });

    return res.status(201).json(new ApiResponse(200, playlist, "Playlist Created Successfully"))
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params
   
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid Playlist Id")
    }

    const userPlaylists = await Playlist.find({
        owner: userId
    })

    return res.status(200).json(new ApiResponse(200, userPlaylists, "User Playlists Fetched Successfully"))
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
   
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid Playlist Id")
    }

    const playlist = await Playlist.findById(playlistId);

    return res.status(200)
        .json(new ApiResponse(200, playlist, "Playlist Details Fetched Successfully"))
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params
    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        { $push: { videos: videoId } }
        , { new: true, useFindAndModify: false }
    )

    if (!playlist) {
        throw new ApiError(404, "Playlist not found")
    }

    return res.status(200).json(new ApiResponse(200, playlist, "Video added to playlist"))
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params
   
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid Playlist Id")
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid Video Id")
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        { $pull: { videos: videoId } }
        , { new: true }
    )

    if (!playlist) {
        throw new ApiError(404, "Playlist not found")
    }

    return res.status(200).json(new ApiResponse(200, playlist, "Video Remove from the playlist"))

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
   
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID")
    }

    await Playlist.findByIdAndDelete({ _id: playlistId })

    return res.status(200)
        .json(new ApiResponse(200, {}, "Playlist Deleted Successfully"))
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
   
    const updatePlaylist = {
        name: req.body.name,
        description: req.body.description,
    };

    const updatePlaylistDetails = await Playlist.findByIdAndUpdate(playlistId, updatePlaylist, {
        new: true,
    });

    return res.status(200)
        .json(new ApiResponse(200, updatePlaylistDetails, "Playlist Details Updated Successfully"))
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}