// Das sind Konstante die angeben, welche grösse unser Spiel (in Raster-Form hat) und wie gross die Zelle ist 
export const RASTER_SIZE = 30;
export const CELL_FRAME_SIZE = 20; // in px

export const DIRECTIONS = {
    PacmanControlLeft: {
        code: 37,
        movement: -1,
        rotation: 180
    },

    PacmanControlUp: {
        code: 38,
        movement: -RASTER_SIZE,
        rotation: 270
    },

    PacmanControlRight: {
        code: 39,
        movement: 1,
        rotation: 0
    },

    PacmanControlDown: {
        code: 40,
        movement: RASTER_SIZE,
        rotation: 90
    }
};

export const OBJECT_TYPE = {
    EMPTY: 'empty', 
    WALL: 'wall',   
    POINT: 'point',
    TABLET: 'tablet',
    PACMAN: 'pacman',
    GHOST: 'ghost',
    PINKY: 'pinky',
    INKY: 'inky',
    BLINKY: 'blinky',
    CLYDE: 'clyde',
    AFRAID_GHOST: 'afraid_ghost',
    GHOSTLAIR: 'lair'
};

// macht eine Liste aus den oberen Klassen
export const CLASS_LIST = [
    OBJECT_TYPE.EMPTY,
    OBJECT_TYPE.WALL,
    OBJECT_TYPE.POINT,
    OBJECT_TYPE.TABLET,
    OBJECT_TYPE.PACMAN,
    OBJECT_TYPE.GHOST,
    OBJECT_TYPE.PINKY,
    OBJECT_TYPE.INKY,
    OBJECT_TYPE.BLINKY,
    OBJECT_TYPE.CLYDE,
    OBJECT_TYPE.AFRAID_GHOST,
    OBJECT_TYPE.GHOSTLAIR
];

export const LEVEL_RASTER = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 
    1, 4, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 4, 1, 
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1,
    0, 1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 2, 1, 0,
    0, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 1, 0,
    0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 9, 9, 9, 9, 9, 9, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1, 9, 9, 9, 9, 9, 9, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 9, 9, 9, 9, 9, 9, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1,
    0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 9, 9, 9, 9, 9, 9, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0,
    0, 1, 2, 2, 2, 1, 2, 1, 1, 1, 2, 1, 9, 9, 9, 9, 9, 9, 1, 2, 1, 1, 1, 2, 1, 2, 2, 2, 1, 0,
    0, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 9, 9, 9, 9, 9, 9, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0,
    1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
    1, 4, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 4, 1, 
    1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
]   
