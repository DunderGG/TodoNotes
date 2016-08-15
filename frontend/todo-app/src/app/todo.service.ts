import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http, Request, RequestMethod, RequestOptions, Headers, URLSearchParams, Response} from '@angular/http';
 import {Observable} from 'rxjs/Rx';
 import 'rxjs/add/operator/map';
import {Todo} from './todo';

@Injectable()
export class TodoService {

  // Will contain the id of the last POSTed todo note
  lastId: number = 0;

  // A list of the current todo notes
  todos: Todo[] = [];

  http: Http;

  getResult:Object;

  constructor(http: Http) 
  {
    this.http = http;
  }

  // When pressing ENTER,
  //  do:  POST /todos
  addTodo(todo: Todo): TodoService 
  {
    // The id for the note should be handled by the database,
    //   this id is only for local reference
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    

    this.todos.push(todo);
    return this;
  }

  // When pressing the delete button,
  //  do: DELETE /todos/:id
  deleteTodoById(id: number): TodoService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return this;
  }

  // When updating a todo note,
  //  do: PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // When requesting all todo notes,
  //  do: GET /todos
  getAllTodos()
  {
    console.log("Getting all existing notes");
    this.getResult = this.http.get("http://localhost:8080/notes");
    console.log(this.getResult, "getResult");
    //this.todoService.getAllTodos().subscribe(res => this.getResult = res);

    return this.todos;
  }

  // When requesting a specific todo not
  //  do: GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // When toggling a specific todo note to complete
  toggleTodoComplete(todo: Todo){
    let updatedTodo = this.updateTodoById(todo.id, {
      completed: !todo.completed
    });
    return updatedTodo;
  }

}