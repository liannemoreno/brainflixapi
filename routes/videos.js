const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


function readVideosFile() {
    const videosList = fs.readFileSync("../data/videos.json");
    const parsedData = JSON.parse(videosList);
    return parsedData;
}

router.get("/", (req,res)=>{
    const videos = readVideosFile();
    res.json(videos);
});

router.get("/:id", (req,res)=>{
    findId = videoList.findIndex((video)=> video.id === req.params.id);
    res.json(videoList(findId));
});

router.post("/", (req,res)=>{
    console.log(req.body);
    const newVideo ={
        id:uuidv4(),
        image:req.body.image,
        title: req.body.title, 
        channel: req.body.channel,
    };

    const videos = readVideosFile();
    videos.push(newVideo);
    fs.writeFileSync("../data/videos.json", JSON.stringify(videos));

    res.status(201).json(newVideo);   
});

module.exports = router;