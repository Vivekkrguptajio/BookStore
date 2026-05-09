require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app");

const PORT = process.env.PORT || 4001;

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

})
.catch((error) => {
    console.log(error);
});