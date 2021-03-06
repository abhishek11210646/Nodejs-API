'use strict';
const response = require('./../../config/response');
const mongoose = require("mongoose");
const Video = mongoose.model('Video');
module.exports = {
    getVideos: async (req, res) => {
        try {
            let video = await Video.find({}).sort({createdAt: -1});
            
            response.ok(res, video);
        }
        catch (e) {
            response.error(res, e);
        }

    },
    newVideo: async (req, res) => {
        try {
            let video = new Video(req.body.video);
            if(req.body.video.type === 'CURRENT') {
                let video2 = await Video.findOne({'type':'CURRENT'});
                if(video2) {
                    video2.type = 'TOP';
                    await video2.save();
                }
             }
            await video.save();
            response.ok(res, { video });
        }
        catch (e) {
            response.error(res, e);
        }

    },
    deleteVideo: async (req, res) => {
        try {
            let video = req.params.id;
            await Video.findByIdAndRemove(video);
            response.ok(res, { video });
        }
        catch (e) {
            response.error(res, e);
        }

    },
    updateVideo: async (req, res) => {
        try {
        let video = await Video.findOne({'_id':req.body.id});
        if(req.body.type === 'CURRENT') {
            let video2 = await Video.findOne({'type':'CURRENT'});
            if(video2) {
                video2.type = 'TOP';
                await video2.save();
            }
        }
        await Video.findByIdAndUpdate({'_id':req.body.id}, { $set: req.body });
        response.ok(res, { video });
        } catch(e) {
            response.error(res, e);
        }
    }
};
