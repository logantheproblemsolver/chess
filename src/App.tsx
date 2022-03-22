import React, { useState } from 'react';
import './App.css';
import Chessboard from 'chessboardjsx';
import { ChessInstance, ShortMove } from 'chess.js';
const Chess = require("chess.js");


const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  )

  const [fen, setFen] = useState(chess.fen());
  const [status, setStatus] = useState("")
  const [movesMade, setMovesMade] = useState([])

  const handleMove = (move: ShortMove) => {
    console.log(move.to);
    console.log(chess.in_check())

    if (chess.move(move)) {
      if (chess.in_checkmate()) {
        console.log("Checkmate!")
        setStatus("Checkmate!");
      } else {
        setStatus("");
      }
      
      if (chess.in_check()) {
        console.log("In Check!")
        setStatus("In Check!");
      } else {
        setStatus("");
      }
  
      if (chess.in_stalemate()) {
        console.log("Stalemate!")
        setStatus("Stalemate!");
      } else {
        setStatus("");
      }
  


      const moves = chess.moves();
      console.log(chess.history());
      if (moves.length > 0) {
        const computerMove = moves[Math.floor(Math.random() * moves.length)];
        chess.move(computerMove);
        setFen(chess.fen());
        if (chess.in_check()) {
          console.log("In Check!")
          setStatus("In Check!");
        } else {
          setStatus("");
        }        
        return true;
      } 
      if (chess.in_checkmate()) {
        console.log("Checkmate!")
        setStatus("Checkmate!");
      }
  
      if (chess.in_stalemate()) {
        console.log("Stalemate!")
        setStatus("Stalemate!");
      }
      

      setFen(chess.fen());
      return chess.game_over;
    }
  }
  
  return (
    <div className="flex-center">
      <h1>Random Chess</h1>
      <p>{status}</p>
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move)  => 
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: 'q',
          })}
        showNotation={true}
      />
    </div>
  );
};

export default App;