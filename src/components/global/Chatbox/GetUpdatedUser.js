const GetUpdatedUser = (signedInUserId) => {
  let response;
  return fetch(`http://localhost:3000/users/${signedInUserId}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return (response = res);
    });
};

export default GetUpdatedUser;
