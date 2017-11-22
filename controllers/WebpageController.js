var WebpageModel = require("../models/WebpageModel");
const queryUtil = require('../utils/QueryUtil');

module.exports = {

    list: function(req, res) {

        var limit;
        if (queryUtil) {
            limit = queryUtil.pageing(req);
        }

        if (req.query && req.query.fetch && req.query.fetch === "true") {

            WebpageModel
                .find({ '_id': req.query._id })
                .limit(limit.limit)
                .skip(limit.skip)
                .populate('updatedBy')
                .exec(function(err, info) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when getting Webpage.',
                            error: err
                        });
                    }
                    return res.status(200).json(info);
                });

        } else if (req.query && req.query.source) {

            WebpageModel.find({ 'source': { $regex: new RegExp(req.query.source, "ig") } })
                .populate('updatedBy')
                .limit(limit.limit)
                .skip(limit.skip)
                .exec(function(err, info) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when getting Webpage.',
                            error: err
                        });
                    }
                    return res.status(200).json(info);
                });

        } else {
            WebpageModel.find(req.query)
                .limit(limit.limit)
                .skip(limit.skip)
                .exec(function(err, info) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when getting Webpage.',
                            error: err
                        });
                    }
                    return res.status(200).json(info);
                });
        }
    },

    show: function(req, res) {
        var id = req.params.id;
        WebpageModel.findById(id, function(err, info) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Webpage.',
                    error: err
                });
            }
            if (!info) {
                return res.status(404).json({
                    message: 'No such Webpage'
                });
            }
            return res.status(200).json(info);
        });
    },

    create: function(req, res) {

        if (req.body) {
            var Webpage = new WebpageModel(req.body);

            Webpage.save(function(err, info) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating Webpage',
                        error: err
                    });
                }
                return res.status(201).json(info);
            });
        } else if (req.body.query) {

            var limit;
            if (queryUtil) {
                limit = queryUtil.pageing(req);
            }

            WebpageModel.find(req.body.query)
            .limit(limit.limit)
            .skip(limit.skip)
            .exec(function(err, info) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting Webpage.',
                        error: err
                    });
                }
                return res.status(200).json(info);
            });
        }

    },

    update: function(req, res) {

        var id = req.params.id;

        WebpageModel.findByIdAndUpdate(id, req.body, { new: true }, function(err, info) {
            if (err)
                return res.status(400).json({ 'error': err });
            else
                return res.status(202).json(info);
        });
    },

    remove: function(req, res) {
        var id = req.params.id;
        WebpageModel.findByIdAndRemove(id, function(err, info) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Webpage.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },
    getCount: function(req, res) {
        var search = req.params.search;
        WebpageModel.count({firstname : search}, function(err, info) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when counting the Webpage.',
                    error: err
                });
            }
            return res.status(200).json(info);
        });
    }
};
