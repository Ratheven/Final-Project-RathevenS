const { validateUser } = require("../../utils/validateUser");
const { connectDb } = require("../../utils/connectDb");

const createUser = async (req, res) => {
  try {
    const  sub  = req.body.user.sub;
   

    const client = await connectDb();

    const isExist = await validateUser(client, "data-name", "users", sub);

    if (isExist) {
      return res
        .status(400)
        .json({ status: 400, message: "User already exist!", error: true });
    }

    if (!isExist) {
      const db = client.db("data-name");
      const newUser = await db
        .collection("users")
        .insertOne({ ...req.body.user, favourite: [] });

      if (newUser.acknowledged) {
        return res.status(200).json({
          status: 200,
          message: "User created successfully.",
          error: null,
        });
      } else {
        return res.status(200).json({
          status: 500,
          message: "Error inserting new user in MongoDB.",
          error: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Error creating new user.", error: error });
  }
};

module.exports = { createUser };
