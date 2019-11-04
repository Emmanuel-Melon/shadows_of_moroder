const update = () => {
    console.log("updating view!");
};

// game loop!
const MainLoop = () => {
    window.requestAnimationFrame(MainLoop);
    update();
};

// while the game is still on
// loop through players
// execute turn on each
// a turn consists of moves
// every player implements that turns interface