import React, { Fragment, useState } from 'react';

interface MenuState {
  menuOpen: boolean;
}

const GameMenu: React.FC<{ newGame: () => any }> = ({ newGame }) => {
  const [state, setState] = useState<MenuState>({ menuOpen: false });

  const toggleMenu = () => {
    setState((prev) => ({ menuOpen: !prev.menuOpen }));
  };

  return (
    <Fragment>
      {state.menuOpen ? (
        <Fragment>
          <div className="menuBackground" onClick={toggleMenu}></div>
          <div className="menuContainer">
            <h3>Menu</h3>
            <button className="newGame" onClick={() => {
              newGame()
              toggleMenu()
            }}>
              New Game
            </button>
            <button className="closeMenu" onClick={toggleMenu}>
              Close Menu
            </button>
          </div>
        </Fragment>
      ) : (
        <div className="closedMenu" onClick={toggleMenu}>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
        </div>
      )}
    </Fragment>
  );
};

export default GameMenu;
