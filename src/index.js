import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
class Square extends React.Component -> function Square(props)로 교체

In React, function components are a simpler way
to write components that only contain a render method
and don't have their own state.

Function componenets are less tedious to write than classes, 
(ex: 인자 처리를 위한 constructor 작성, render 메소드 구현)
and many components can be expressed this way.
*/
function Square(props){
    return(
        <button 
            className="square"
            // props.onClick 없으면 
            // Board Component의 handleClick()이 실행 아됨
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        /*
        create a copy of "this.state.squares"  
        (= replace the data with a new copy)
        instead of modifying the existing array 
        (= mutate the data)
        immutability -> "undo/redo/history" 기능에 활용
        */
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        // Square 컴포넌트에 value 키에 대한 값을 전달
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }
    
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + 
            (this.state.xIsNext ? 'X' : 'O');
        }

        return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i]
        if(squares[a] && squares[a] === squares[b] && 
            squares[a] === squares[c]){
                return squares[a];
            }
        }
    return null;    
}