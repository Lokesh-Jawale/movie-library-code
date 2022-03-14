const Playlists = require("../models/Playlists");
const { verify } = require("../utils/authVerify");
const router = require("express").Router();

// get all playlists
router.get("/all", async (req, res) => {
    try{
        const playlists = await Playlists.find().lean().exec();

        res.status(200).json(playlists);
    } catch(err) {
       res.status(404).send(err)
    }
})

// get all users playlists
router.get("/:id", verify, async (req, res) => {
    try{
        const playlists = await Playlists.find({
            userId : req.params.id
        }).lean().exec();

        return res.status(200).json(playlists);
    } catch(err) {
       res.status(404).send(err)
    }
})


// create playlist 
router.post("/create", verify, async (req, res) => {
    try{
        const newPlaylist = new Playlists(req.body);
        const savedPlaylist = await newPlaylist.save();

        return res.status(200).json(savedPlaylist);
    }catch(err){
        return res.status(500).json(err);
    }
})


// update playlist add movie to it
router.put("/:id", verify, async (req, res) => {
    try{
        await Playlists.findByIdAndUpdate(req.params.id, {
            $push: {movies : req.body}
        })
        return res.status(200).json("Movie added to playlist successfully");
    }catch(err){
        return res.status(500).json(err);
    }
})


module.exports = router
