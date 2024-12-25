const GetUpdatedUser = (signedInUserId) => {
  let response;
  return fetch(`${import.meta.env.VITE_API}users/${signedInUserId}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return (response = res);
    });
};

export default GetUpdatedUser;
