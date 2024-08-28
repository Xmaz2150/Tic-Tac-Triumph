class Lobby {
    constructor() {
        this.rooms = {};
        this.roomDataT = {};
    }

    addPlayer(socket, roomData) {
        if (!this.rooms[roomData.ID]) {
            this.rooms[roomData.ID] = [];
            this.roomDataT = roomData;
        }

        if (this.rooms[roomData.ID].length < 2) {
            this.rooms[roomData.ID].push(socket.id);
            socket.join(roomData.ID);

            if (this.rooms[roomData.ID].length === 2) {
                return 1;
            }
        } else {
            return -1;
        }
    }

    removePlayer(socket) {
        console.log(`player ${socket.id} disconnected`);
        if (this.roomDataT && this.rooms[this.roomDataT.ID]) {
            console.log(this.roomDataT.ID);
            const playIdx = this.rooms[this.roomDataT.ID].indexOf(socket.id);
            if (playIdx > -1) {
                console.log(`player ${socket.id} removed`);
                this.rooms[this.roomDataT.ID].splice(playIdx, 1);
                return 1;
            } else {
                return -1;
            }
        } else {
            return -2;
        } 
    }

    getPlayers() {
        return this.rooms[this.roomDataT.ID];
  }
}

module.exports = Lobby;