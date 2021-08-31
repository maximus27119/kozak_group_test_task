const mongoose = require('mongoose');

mongoDbUrl = process.env.MONGODB_URL;

module.exports = async () => {
    try {
        await mongoose.connect(mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to the database.");
    } catch (error) {
        console.log("Could not connect to database", error);
    }
};