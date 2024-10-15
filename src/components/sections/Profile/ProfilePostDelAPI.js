const ProfilePostDel = async (e, profileWall, setProfileWall) => {
  const options = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postid: e.target.id, profileWall: profileWall }),
  };
  const profilePostAPI = fetch(
    `https://facespace-backend.onrender.com/profileWalls/${profileWall._id}/delete`,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "Success") {
        console.log(res);
        setProfileWall(res.updatedProfileWall);
        return true;
      } else {
        return false;
      }
    });
  return profilePostAPI;
};

export default ProfilePostDel;
