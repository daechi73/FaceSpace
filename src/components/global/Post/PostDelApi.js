const PostDelAPI = (e) => {
  const options = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId: e.target._id }),
  };
  fetch(`http://localhost:3000/posts/${e.target.id}/delete`, options)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "Success") {
        console.log(res);
      }
    });
};

export default PostDelAPI;
