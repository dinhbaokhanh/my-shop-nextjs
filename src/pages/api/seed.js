import db from "./db.js";
import User from "../../../models/User.js";

const handler = async (req, res) => {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users);
    await db.disconnect();
    res.send({
        message: 'Success'
    })
}

export default handler;