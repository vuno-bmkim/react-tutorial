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
        squares[i] = 'X';
        this.setState({squares: squares});
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
        const status = 'Next player: X';

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
