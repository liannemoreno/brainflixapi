const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');



function readVideosFile() {
  const videosList = fs.readFileSync("./data/videos.json");
  const parsedData = JSON.parse(videosList);
  return parsedData;
}

router.get("/", (req, res) => {
  const videos = readVideosFile();
  res.json(videos);
});

router.get("/:id", (req, res) => {
  const videos = readVideosFile();
  const findId = videos.findIndex((video) => video.id === req.params.id);
  if (findId === -1) {
    res.status(404).send("Video not found");
  } else {
    res.json(videos[findId]);
  }
});


router.post("/", (req, res) => {
  console.log(req.body);
  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    channel: "Lianne's Channel",
    image: "image9.jpeg",
    description: req.body.description,
    views: "1,0000,0000,000",
    likes: "1,0000,0000,000",
    duration: "3:05",
    timestamp: Date.now(),
    comments: [
      {
        "id": "0001",
        "name":"Mike Wazowski",
        "comment": "You know, I am so romantic sometimes I think I should just marry myself.",
        "likes": 600,
        "timestamp": Date.now()
      },
      {
        "id": "0002",
        "name":"Celia Mae",
        "comment": "Mike... stop commenting random things on peoples videos. Where are you? You need to come home now! Also, were married...?",
        "likes": 6000,
        "timestamp": Date.now()
      }
    ]
  };

  const videos = readVideosFile();
  videos.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

  res.status(201).json(newVideo);
});

module.exports = router;