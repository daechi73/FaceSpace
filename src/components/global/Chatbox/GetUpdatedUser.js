const GetUpdatedUser = (signedInUserId) => {
  let response;
  return fetch(`https://facespace-backend.onrender.com/users/${signedInUserId}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return (response = res);
    });
};

export default GetUpdatedUser;
