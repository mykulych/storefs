const sort = require("./sort.helper");
const User = require("../models/User");

module.exports = async ads => {
    const sortedAds = sort(ads)
    const filteredAds = sortedAds.filter(item => !item.buyer)
    const data = await filteredAds.map(async item => {
        const user = await User.findById(item.publisher.toString())
        const test =  {
            ...item,
            publisher: user
        }
        return { ...test._doc, publisher: test.publisher }
    })
    return await Promise.all(data)
}