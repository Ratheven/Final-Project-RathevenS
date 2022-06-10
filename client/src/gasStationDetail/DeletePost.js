const DeletPost = ({ id, setPosted, _id }) => {

  const handleDelete = () => {
    fetch(`/post/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _id: _id,
      }),
    }).then(setPosted((prev) => !prev));
  };

  return (
    <button
      onClick={() => {
        handleDelete();
      }}
    >
      delete
    </button>
  );
};

export default DeletPost;
