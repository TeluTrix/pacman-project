import { OBJECT_TYPE, DIRECTIONS } from './pacman-setup'

class Pacman {
    constructor(speed, startPos) {
        this.pos = startPos;
        this.speed = speed;
        this.dir = null;
        this.timer = 0;
        this.powerpill = false;
        this.rotation = true;
    }

    shouldMove() {
        if (!this.dir) return false;

        if (this.timer === this.speed) {
            this.timer = 0;
            return true;
        }
        this.timer ++
    }

    getNextMove(objectExist) {
        let nextMovePos = this.pos + this.dir.movement;

        if(
            objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
            objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
        ) {
            nextMovePos = this.pos;
        }

        return { nextMovePos, direction: this.dir};
    
    }

    makeMove(){
        const classesToRemove = [OBJECT_TYPE.PACMAN];
        const classesToAdd = [OBJECT_TYPE.PACMAN];

        return {classesToRemove, classesToAdd}
    }

    setNewPosition(nextMovePos) {
        this.pos = nextMovePos;
    }

    handleKeyInput(e, objectExist) {
        let dir;

        if (e.keyCode >= 37 && e.keyCode <=40) {
            dir = DIRECTIONS[e.key];
        } else {
            return;
        }

        const nextMovePosition = this.pos + direction.movement;
        if (objectExist(nextMovePosition, OBJECT_TYPE.WALL)) return;
        this.dir = dir;
    };}

export default Pacman;