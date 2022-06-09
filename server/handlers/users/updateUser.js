const { connectDb } = require("../../utils/connectDb");
const { validateUser } = require("../../utils/validateUser");

const updateUser = async (req, res) => {
  const client = await connectDb();
  const user = validateUser(client, "data-name", "users", req.params.sub);

  if (user) {
    const db = client.db("data-name");
    const updatedUser = await db.collection("users").updateOne(
      { sub: req.params.sub },
      {
        $set: {
          ...req.body,
        },
      }
    );

    if (updatedUser.acknowledged) {
      res.status(200).json({
        status: 200,
        message: "User Updated.",
        data: updatedUser,
        error: null,
      });
    }
  } else {
    res
      .status(404)
      .json({ status: 404, message: "User not found.", error: true });
  }
};

module.exports = { updateUser };
