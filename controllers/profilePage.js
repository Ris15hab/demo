const UserDB = require('../models/userDB')
const apiHitCount = require('../models/apiHitCount')

const getData = async (req, res, next) => {
    try {
        // console.log("in")
        const userID = req.user.userData._id
        const quikDbCount = await UserDB.find({ userID }).countDocuments();
        const quikApiCount = quikDbCount * 5;

        // getting top quikDBs
        const topQuikDbs = await UserDB.find({ userID }).sort({ dateTime: -1 });

        const modelCountPromises = topQuikDbs.map(async (item) => {
            const { model } = require(`../models/${userID}/${item.modelStoredAs}.js`);
            const modelCount = await model.find({}).countDocuments();
            item.count = modelCount; // Update the count for the current item
        });

        await Promise.all(modelCountPromises);

        topQuikDbs.sort((a, b) => b.count - a.count);
        const top2QuikDbs = topQuikDbs.slice(0, 2);

        const apiHits = await apiHitCount.findOne({ userID })
        res.status(200).json({ quikDbCount, quikApiCount, top2QuikDbs, userData: req.user.userData, apiHits })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getData
}