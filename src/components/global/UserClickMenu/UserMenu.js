const UserMenu = (
  showMenu,
  setShowMenu,
  setShowMenuUsername,
  username,
  pageX,
  pageY,
  setCoords
) => {
  if (showMenu === false) setShowMenu(true);
  else {
    setShowMenu(false);
  }
  setCoords([pageX, pageY]);
  setShowMenuUsername(username);
};

export default UserMenu;
