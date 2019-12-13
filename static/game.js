var board = Chessboard('board', {
  position: 'start',
  moveSpeed: 50
});

(async function next(curHistory) {
  const { history, checkmate } = await move(board, curHistory);
  if (checkmate) {
    console.log('Checkmate!')
    return;
  }
  setTimeout(() => { next(history) }, 70);
})([]);

async function move(board, history) {
  const response = await fetch('http://localhost:3000/api/move?h=' + history.join(','));
  const result = await response.json();
  board.position(result.fen, true);
  return {
    history: [...history, result.move],
    checkmate: result.checkmate
  };
}
