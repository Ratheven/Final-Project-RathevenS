const { connectDb } = require("../../utils/connectDb");
const { validateUser } = require("../../utils/validateUser");

const getUser = async (req, res) => {
  const client = await connectDb();
  const user = validateUser(client, "data-name", "users", req.params.sub);

  if (user) {
    res.status(200).json({ status: 200, message: "User found.", error: null });
  } else {
    res
      .status(404)
      .json({ status: 404, message: "User not found.", error: true });
  }
};

module.exports = { getUser };
