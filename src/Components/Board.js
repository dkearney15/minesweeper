import React, { Component } from 'react';
import { shuffle } from 'lodash';

import { makeBoard } from '../Utils/board';

import StyledBoard from '../StyledComponents/board.js';
import Row from '../StyledComponents/row.js';
import Space from '../StyledComponents/space.js';


class Board extends Component {
    constructor (props) {
        super();
        this.state = {
            board: makeBoard()
        }
    }

    generateKey = pre => {
        return shuffle(`${pre}_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_${ new Date().getTime() }`.split('')).join('').slice(0,20);
    }
    
    componentDidUpdate(prevProps, prevState) {

    }

    clearSpace = space => {
        const board = this.state.board;
        const _this = this;
        if (space.isMine) {
            this.endGame();
        } else {
            space.cleared = true;
            // go thru sibs and if their count is 0, call clearspace on them
            console.log(space.mineSiblings);
            space.siblings.forEach(sib => {
                if (sib.isMine) return;
                // console.log(sib);
                // if (!sib.mineSiblings.length) _this.clearSpace(sib);
            });
        }
    }

    endGame() {
        console.log('you looooose');
    }

    render() {
        const { board } = this.state;
        return (
            <StyledBoard>
                {
                    board.map((row, rowIdx) => {
                        return (
                            <Row key={this.generateKey(row[0].HTML)}>
                                {
                                    row.map((space, spaceIdx) => {
                                        return <Space
                                            key={this.generateKey(space.HTML)}
                                            cleared={space.cleared}
                                            displayColor={space.isMine ? 'white' : ''}
                                            onClick={() => this.clearSpace(space)}>
                                            {/* {space.cleared ? space.mineSiblings.length : 'O'} */
                                                space.isMine ? 'M' : space.mineSiblings.length
                                            }
                                        </Space>
                                    })
                                }
                            </Row>
                        )
                    })
                }
            </StyledBoard>
        )
    }
}

export default Board;
