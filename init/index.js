
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const initDB = async () => {
    await Listing.deleteMany({});

    const data = initData.data.map((obj) => ({
        ...obj,
        owner: "6ad0d103259a884bd95f5eac"
    }));

    await Listing.insertMany(data);
    console.log("Data was initialized");
};

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    // Feature 1: Delete old listings and insert initial data
    await initDB();

    // Feature 2: Update the image of a specific listing
    await Listing.findByIdAndUpdate("6ab76a46689ca58877d4cd71", {
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60"
        }
    });

    console.log("Updated");
}

main()
    .catch((err) => {
        console.error(err);
    })
    .finally(async () => {
        await mongoose.connection.close();
    });
