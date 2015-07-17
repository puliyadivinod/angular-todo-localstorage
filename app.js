angular.module("TodoApp", [])
    .controller("TodoController", ["$scope", function ($scope) {

        var todoList = this;
        var storage = window.localStorage;

        if(!storage.todos){
            storage["todos"] = JSON.stringify([]);
        }

        todoList.todos = JSON.parse(storage.todos);

        todoList.remaining = function() {
            var count = 0;
            angular.forEach(todoList.todos, function(todo){
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        todoList.completed = function(){
            storage["todos"] = JSON.stringify(todoList.todos);
        };

        todoList.addTodo = function() {
            todoList.todos.push({text: todoList.todoText, done: false});
            todoList.todoText = "";

            storage["todos"] = JSON.stringify(todoList.todos);
        };

        todoList.archive = function(){
            var oldTodos = todoList.todos;
            todoList.todos = [];
            angular.forEach(oldTodos, function(todo){
                if(!todo.done) todoList.todos.push(todo);
            });
            storage["todos"] = JSON.stringify(todoList.todos);
        };
    }]);