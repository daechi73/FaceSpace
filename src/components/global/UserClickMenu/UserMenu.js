const UserMenu = (showMenu, setShowMenu, setShowMenuUsername, username) => {
  if (showMenu === false) setShowMenu(true);
  else {
    setShowMenu(false);
  }
  setShowMenuUsername(username);
};

export default UserMenu;
