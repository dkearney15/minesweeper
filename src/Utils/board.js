import { shuffle } from 'lodash';

export function makeBoard(width=30, height=15, difficulty=2) {
    const mineCount = (width * height) / 10; // later: as difficulty is higher 10 goes down (inverse relationship)
    const board = [];
    const minesPerRow = Math.floor(mineCount / height);
    for (let i = 0; i < height; i++) {
        const row = [];
        let minesAdded = 0;
        for (let j = 0; j < width; j++) {
            const isMine = minesAdded >= minesPerRow ? false : true;
            if (isMine) minesAdded++; 
            const currentCoords = [i,j];
            const siblingCoords = [[0,1],[0,-1],[1,0],[1,1],[1,-1],[-1,0],[-1,-1],[-1,1]].reduce((accum, dir) => {                
                const newSibling = [dir[0] + currentCoords[0], dir[1] + currentCoords[1]];
                const inBoundsX = dir[0] + currentCoords[0] > -1 && dir[0] + currentCoords[0] < height;
                const inBoundsY = dir[1] + currentCoords[1] > -1 && dir[1] + currentCoords[1] < width;
                return inBoundsX && inBoundsY ? [...accum, newSibling] : accum;
            }, []);
            row.push({
                coords: [i, j],
                isMine,
                siblingCoords
            });
        }
        board.push(row);
    }

    const shuffledBoard = board.map(row => shuffle(row));
    
    return shuffledBoard.map(row => {
        return row.map(space => {
            const siblings = space.siblingCoords.map(coords => shuffledBoard[coords[0]][coords[1]]);
            const mineSiblings = siblings.filter(sib => sib.isMine);
            return {...space, mineSiblings, siblings};
        });
    });
}