var app = angular.module('myApp', []);
app.controller('todoCtrl', function ($scope) {

    $scope.todoList = [];
    $scope.completedList = [];
    $scope.errorMessage;
    $scope.flagDuplicate = false;
    $scope.flagClicked;
    $scope.date = new Date().toLocaleString();
    $scope.modalItem;

    $scope.isEmpty = function () {
        return $scope.todoList.length <= 0;
    };

    $scope.isEmptyCompleted = function () {
        return $scope.completedList.length <= 0;
    };

    $scope.isBothEmpty = function () {
        return $scope.completedList.length + $scope.todoList.length <= 0;
    };

    $scope.countTotal = function () {
        return $scope.todoList.length;
    };

    $scope.count = function () {
        if ($scope.flagClicked === "add") {
            return "Listed Items: " + $scope.todoList.length;
        }
        if ($scope.flagClicked === "viewDeleted") {
            return "Deleted Items: " + $scope.completedList.length;
        }
        else return "Listed Items: " + $scope.todoList.length;

    };

    $scope.countDeleted = function () {
        return $scope.completedList.length;
    };

    $scope.todoAdd = function () {
        $scope.flagClicked = "add";
        if ($scope.todoInput) {
            if ($scope.checkDuplicate()) {
                $scope.flagDuplicate = false;
                if ($scope.inputValidate()) {
                    $scope.errorMessage = "This item is already moved to Completed. Do you want to move it to the To-Do list?";
                    $('#myModal').modal('show');
                    $scope.modalItem = ({
                        todoText: $scope.todoInput,
                        checkboxStatus: false,
                        date: $scope.date
                    });
                    $scope.todoInput = "";
                } else {
                    $scope.todoList.push({
                        todoText: $scope.todoInput,
                        checkboxStatus: false,
                        date: $scope.date
                    });
                    $scope.todoInput = "";
                }

            } else {
                $scope.errorMessage = "Duplicate entries not allowed";
                $scope.flagDuplicate = true;
            }
        }
    };

    $scope.inputValidate = function () {
        var flag = false;
        for (var i = 0; i < $scope.completedList.length; i++) {
            if ($scope.todoInput === $scope.completedList[i].todoText) {
                flag = true;
            }
        }
        return flag;
    };

    $scope.checkDuplicate = function () {
        var flag = true;
        for (var i = 0; i < $scope.todoList.length; i++) {
            if ($scope.todoInput === $scope.todoList[i].todoText) {
                flag = false;
            }
        }
        return flag;
    };

    $scope.viewDeleted = function () {
        $scope.flagClicked = "viewDeleted";
    };

    $scope.completed = function () {
        var duplicateList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(duplicateList, function (x) {
            if (!x.checkboxStatus) $scope.todoList.push(x);
            if (x.checkboxStatus) {
                x.checkboxStatus = false;
                $scope.completedList.push(x);
            }
        });
    };

    $scope.move = function () {
        var duplicateList = $scope.completedList;
        $scope.completedList = [];
        angular.forEach(duplicateList, function (y) {
            if (!y.checkboxStatus) $scope.completedList.push(y);
            if (y.checkboxStatus) {
                y.checkboxStatus = false;
                $scope.todoList.push(y);
            }
        });
    }

    $scope.moveThroughModal = function () {
        var duplicateList = $scope.completedList;
        $scope.completedList = [];
        angular.forEach(duplicateList, function (y) {
            if ($scope.modalItem.todoText === y.todoText) y.checkboxStatus = true;
            if (!y.checkboxStatus) $scope.completedList.push(y);
            if (y.checkboxStatus) {
                y.checkboxStatus = false;
                $scope.todoList.push(y);
            }
        });
    }

    $scope.removeTodo = function (x) {
        $scope.todoList.splice(x, 1);
    };

    $scope.removeCompleted = function (x) {
        $scope.completedList.splice(x, 1);
    };

});