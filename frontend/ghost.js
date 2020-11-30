import {DIRECTIONS, OBJECT_TYPE} from './pacman-setup';

class Ghost {
    constructor(speed = 5, startPos, movement, name) {
        this.name = name;
        this. movement = movement;
        this.startPos = startPos;
        this.dir = DIRECTIONS.PacmanControlRight;
        this.speed = speed;
        this.timer = 0;
        this.isScared = false;
        this.rotation = false;
    }

    shouldMove() {
        if(this.timer == this.speed) {
            this.timer = 0;
            return true;
        }
        this.timer++;
        return false;
    }

    getNextMove(obejectExist) {
        const { nextMovePos, direction } = this.movement(
            this.pos,
            this.dir,
            obejectExist
        );
        return { nextMovePos, direction}
    }

    makeMove(){
        const classesToRemove = [OBJECT_TYPE.GHOST, OBJECT_TYPE.AFRAID_GHOST, this.name];
        let classesToAdd = [OBJECT_TYPE.Ghost, this.name];

        if (this.isScared) classesToAdd = [...classesToAdd, OBJECT_TYPE.AFRAID_GHOST];

        return { classesToRemove, classesToAdd};
    }

    setNewPos(nextMovePos, direction) {
        this.pos = nextMovePos;
        this.dir = direction;
    }
}

export default Ghost;