const validateUser = async (client, database, collection, sub) => {
  const db = client.db(database);

  console.log(db);
  const queryObj = { sub: sub };

  const user = await db.collection(collection).findOne(queryObj);

  console.log(user);
  return user;
};

module.exports = { validateUser };
