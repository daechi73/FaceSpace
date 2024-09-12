const ProfilePostDel = (e, profileWall, setProfileWall) => {
  let status;
  const options = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postid: e.target.id, profileWall: profileWall }),
  };
  fetch(`http://localhost:3000/profileWalls/${profileWall._id}/delete`, options)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "Success") {
        console.log(res);
        setProfileWall(res.updatedProfileWall);
        status = true;
      }
    });
  return status;
};

export default ProfilePostDel;
