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

router.post("/", (req,res)=>{
    console.log(req.body);
    const newVideo ={
        id:uuidv4(),
        title: req.body.title, 
        channel: req.body.channel,
        image:req.body.image,
    };

    const videos = readVideosFile();
    videos.push(newVideo);
    fs.readFileSync("../data/videos.json", JSON.stringify(videos));

    res.status(201).json(newVideo);   

});

module.exports = router;