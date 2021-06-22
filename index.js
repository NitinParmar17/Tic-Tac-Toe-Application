var app = angular.module("myApp", ["ngAnimate", "toaster"]);

app.controller("myController", function ($scope, toaster) {
  onLoad();

  function onLoad() {
    $scope.board = [];
    $scope.won = "";
    value = "";
    symbol = "";
    $scope.letter = "X";
    moveCount = 0;
    $scope.startGame = false;

    for (let i = 0; i < 3; i++) {
      $scope.board[i] = [];
      $scope["col" + i] = false;
      $scope["row" + i] = false;
      $scope["diag" + i] = false;
    }
  }

  $scope.restart = function () {
    onLoad();
  };

  $scope.start = function () {
    if ($scope.letter) {
      symbol = $scope.letter;
      $scope.startGame = true;
    }
  };

  $scope.nextPlay = function (x, y) {
    value = $scope.letter;
    if ($scope.won === "") {
      if (!$scope.board[x][y]) {
        $scope.board[x][y] = value;
        moveCount += 1;

        value == "X" ? ($scope.letter = "O") : ($scope.letter = "X");
      }

      if (moveCount >= $scope.board.length) {
        if (checkForWinner(x, y)) {
          value == symbol ? (value = "Player 1") : (value = "Player 2");

          $scope.won = value + " Won.";
          toaster.pop("success", "Notification", $scope.won);
        } else if (moveCount === Math.pow($scope.board.length, 2)) {
          $scope.won = "It's a Tie";
          toaster.pop("success", "Notification", $scope.won);
        }
      }
    }
  };

  function checkForWinner(x, y) {
    if (checkColumns(y)) {
      return true;
    } else if (checkRows(x)) {
      return true;
    } else if (checkDiagnols()) {
      return true;
    } else {
      return false;
    }
  }

  function checkRows(x) {
    let result = false;
    for (let i = 0; i < $scope.board.length; i++) {
      if ($scope.board[x][i] !== value) {
        result = false;
        break;
      } else result = true;
    }
    if (result == true) {
      $scope["row" + x] = true;
    }
    return result;
  }
  function checkColumns(y) {
    let result = false;
    for (let i = 0; i < $scope.board.length; i++) {
      if ($scope.board[i][y] !== value) {
        result = false;
        break;
      } else result = true;
    }
    if (result == true) {
      $scope["col" + y] = true;
    }
    return result;
  }

  function checkDiagnols() {
    let j = $scope.board.length - 1;
    let d1 = 0;
    let d2 = 0;
    for (let i = 0; i < $scope.board.length; i++) {
      if ($scope.board[i][i] === value) {
        d1 = d1 + 1;
      }
      if ($scope.board[i][j - i] === value) {
        d2 = d2 + 1;
      }
    }
    if (d1 == $scope.board.length || d2 == $scope.board.length) {
      d1 == $scope.board.length ? ($scope.diag1 = true) : ($scope.diag2 = true);

      return true;
    } else {
      return false;
    }
  }
});
