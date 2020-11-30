import {RASTER_SIZE, CELL_FRAME_SIZE, OBJECT_TYPE, CLASS_LIST } from './pacman-setup'

class GameBoard {
  constructor(DOMRaster) {
      this.pointCounter = 0;
      this.raster = [];
      this.DOMRaster = DOMRaster;
    } 
    
    showGameStatus(gamewin) {
        const div = document.createElement('div');
        div.classList.add('game-status');
        div.innerHTML = `${gamewin ? 'GEWONNEN!' : 'GAME OVER!'}`;
        this.DOMRaster.appendChild(div);
    }
      
    createGrid(LEVEL_RASTER){
        this.pointCounter = 0;
        this.raster = [];
        this.DOMRaster.innerHTML = ''
        this.DOMRaster.style.cssText = `raster-template-columns: repeat(${RASTER_SIZE}, ${CELL_FRAME_SIZE}px)`;
      
        LEVEL_RASTER.forEach((square) => {
            const div = document.createElement('div');
            div.classList.add('square', CLASS_LIST[square]);
            div.style.cssText = `width: ${CELL_FRAME_SIZE}px; height: ${CELL_FRAME_SIZE}px;`;
            this.DOMRaster.appendChild(div);
            this.raster.push(div);

            if (CLASS_LIST[square] === OBJECT_TYPE.point) this.pointCounter++;
        })
    }

    addObject(pos, classes){
        this.raster[pos].classList.add(...classes);
    }

    removeObject(pos, classes){
        this.raster[pos].classList.remove(...classes);
    }
    
    objectExist(pos, ocject){
        return this.raster[pos].classList.contains(object);
    }

    rotateDiv(pos, deg){
        this.raster[pos].style.transform = `rotate(${deg}deg)`;
    }

    static createGameBoard(DOMRaster, LEVEL_RASTER){
        const board = new this(DOMRaster);
        board,createGrid(LEVEL_RASTER);
        return board;
    }
}  

export default GameBoard;