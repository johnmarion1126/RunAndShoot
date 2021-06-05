const Entity = require('./Entity');

class Player extends Entity {
  constructor(id) {
    super();
    this.id = id;
    this.number = '' + Math.floor(10 * Math.random());
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.maxSpd = 10;
  }

  update() {
    this.updateSpd();
    this.updatePosition();
  }

  updateSpd() {
    if (this.pressingRight) {
      this.spdX = this.maxSpd;
    } else if (this.pressingLeft) {
      this.spdX = -this.maxSpd;
    } else {
      this.spdX = 0;
    }
  }
}

const playerConnect = (socket, playerList) => {
  const player = new Player(socket.id);
  playerList.push(player);

  socket.on('keyPress', (data) => {
    if (data.inputId === 'left') {
      player.pressingLeft = data.state;
    } else if (data.inputId === 'right') {
      player.pressingRight = data.state;
    } else if (data.inputId === 'up') {
      player.pressingUp = data.state;
    } else if (data.inputId === 'down') {
      player.pressingDown = data.state;
    }
  });
};

const playerDisconnect = (socket, playerList) => {
  delete playerList[socket.id];
};

const playerUpdate = (playerList) => {
  const pack = [];
  playerList.forEach((i) => {
    const player = i;
    player.update();
    pack.push({
      x: player.x,
      y: player.y,
      number: player.number,
    });
  });
  return pack;
};

module.exports = {
  Player,
  playerConnect,
  playerDisconnect,
  playerUpdate,
};