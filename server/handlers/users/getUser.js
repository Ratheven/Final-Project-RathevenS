const { connectDb } = require("../../utils/connectDb");
const { validateUser } = require("../../utils/validateUser");
const { ObjectId } = require("mongodb");

const getUser = async (req, res) => {
  const { sub } = req.params;

  const client = await connectDb();
  const user = validateUser(client, "data-name", "users", req.params.sub);

  const db = client.db("data-name");

  const dbStation = client.db("GasStation");

  try {
    const result = await db.collection("users").findOne({ sub: `${sub}` });

    const arrayFavourite = result.favourite;

    arrayFavourite.map((a) => {
      console.log(a, "this is a");
    });
    //get all the gas station
    const array = await dbStation.collection("StationData").find().toArray();



    const finalResult = array.filter((station) => {

      return arrayFavourite.includes(station._id.toString());
    });

    
    res.status(200).json({ status: 200, data: finalResult });
  } catch (err) {
    res
      .status(404)
      .json({ status: 404, message: "User not found.", error: true });
  }
};

module.exports = { getUser };
