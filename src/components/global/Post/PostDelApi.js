const PostDelAPI = async (e, signedInUser) => {
  const options = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ signedInUserId: signedInUser.id }),
  };
  const pass = await fetch(
    `https://facespace-backend.netlify.app/api/posts/${e.target.id}/delete`,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "Success") {
        console.log(res);
        return true;
      } else {
        console.log(res);
        return false;
      }
    });
  return pass;
};

export default PostDelAPI;
