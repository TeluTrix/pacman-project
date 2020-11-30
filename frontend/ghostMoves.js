import { DIRECTIONS, OBJECT_TYPE } from './pacman-setup';

//Primitive random movement
export function randomMovement(position, direction, objectExist) {
    let dir = direction;
    let nextMovePos = position + dir.movement;

    const keys = Object.keys(DIRECTIONS);

    while (
        objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
        objectExist(nextMovePos, OBJECT_TYPE.GHOST)
    ) {
        //Get a randm key from the key array
        const key = keys[Math.floor(Math.random() * keys.length)];
        // set the next move
        nextMovePos = position + dir.movement;
    }
    return { nextMovePos, direction: dir};
    
}