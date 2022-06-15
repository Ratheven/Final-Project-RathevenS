const validateUser = async (client, database, collection, sub) => {
  const db = client.db(database);

  const queryObj = { sub: sub };

  const user = await db.collection(collection).findOne(queryObj);

  return user;
};

module.exports = { validateUser };
