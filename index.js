var app = angular.module("myApp", ["ngAnimate", "toaster"]);

app.controller("myController", function ($scope, toaster) {
  onLoad();
  function onLoad() {
    $scope.board = [];
    duplicate = [];
    $scope.won = "";
    symbol = "";
    moveCount = { X: 0, O: 0 };

    $scope.startGame = false;

    for (let i = 0; i < 3; i++) {
      $scope.board[i] = [];
      duplicate[i] = [];
    }
  }

  $scope.restart = function () {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        $scope.board[i][j] = "";
        duplicate[i][j] = "";
      }
    }
    onLoad();
    $scope.letter = "";
  };

  $scope.nextPlay = function (x, y) {
    if ($scope.won === "") {
      if (!duplicate[x][y]) {
        $scope.board[x][y] = value;
        duplicate[x][y] = value;
        moveCount[value] += 1;
      }

      if (moveCount[value] >= 3) {
        if (checkForWinner(x, y)) {
          if (value == symbol) {
            value = "Player 1";
          } else value = "Player 2";

          $scope.won = value + " Won.";

          $("#confirm").modal("show");
          toaster.pop("success", "Notification", $scope.won);
        } else if (moveCount["X"] + moveCount["O"] === 9) {
          $scope.won = "It's a Tie";

          toaster.pop("success", "Notification", $scope.won);
          $("#confirm").modal("show");
        }
      }
      if (value === "X") {
        value = "O";
      } else {
        value = "X";
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
  $scope.start = function () {
    if ($scope.letter) {
      value = $scope.letter;
      symbol = value;
      $scope.startGame = true;
    }
  };
  $scope.newGame = function () {
    $scope.restart();
  };

  function checkRows(x) {
    let result = false;
    for (let i = 0; i < 3; i++) {
      if ($scope.board[x][i] !== value) {
        result = false;
        break;
      } else result = true;
    }
    return result;
  }
  function checkColumns(y) {
    let result = false;
    for (let i = 0; i < 3; i++) {
      if ($scope.board[i][y] !== value) {
        result = false;
        break;
      } else result = true;
    }
    return result;
  }

  function checkDiagnols() {
    if (
      ($scope.board[0][0] === value &&
        $scope.board[1][1] === value &&
        $scope.board[2][2] === value) ||
      ($scope.board[0][2] === value &&
        $scope.board[1][1] === value &&
        $scope.board[2][0] === value)
    ) {
      return true;
    }
    return false;
  }
});
