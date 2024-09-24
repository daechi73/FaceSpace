const PostDelAPI = (e, signedInUser) => {
  const options = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ signedInUserId: signedInUser.id }),
  };
  const pass = fetch(
    `http://localhost:3000/posts/${e.target.id}/delete`,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return true;
    });
  return pass;
};

export default PostDelAPI;
