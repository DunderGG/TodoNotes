import {Component} from '@angular/core';
import {CORE_DIRECTIVES, NgClass, FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators} from '@angular/common';
import {HTTP_PROVIDERS, Http, Request, RequestMethod, RequestOptions, Headers, URLSearchParams} from '@angular/http';


import {Todo} from '../todo';
import {TodoService} from '../todo.service';

@Component({
  moduleId: module.id,
  selector: 'todo-app',
  templateUrl: 'todo-app.component.html',
  styleUrls: ['todo-app.component.css'],
  providers: [TodoService],
  viewProviders:[HTTP_PROVIDERS],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES] 
})

export class TodoAppComponent 
{
  http: Http;
  newTodoForm: ControlGroup;
  newTodo: Todo;
  
  headers: Headers;
  requestOptions: RequestOptions;

  getResult:Object;

  public constructor(private todoService: TodoService,
              formBuilder: FormBuilder,
              http: Http) 
  {
    this.newTodo = new Todo();

    this.newTodoForm = formBuilder.group({
      'body': new Control(this.newTodo.body),
      'completed': new Control(this.newTodo.completed)
    })

    this.headers = new Headers();

    this.http = http;

  }

  addTodo() 
  {
    //console.log(this.newTodo, "newTodo");

    this.headers.append("Content-Type", 'application/x-www-form-urlencoded');

    var data = JSON.stringify({
      'body' : this.newTodo.body,
      'completed' : this.newTodo.completed
    });

    this.requestOptions = new RequestOptions({
        method: RequestMethod.Post,
        url: "http://localhost:8080/notes/new",
        headers: this.headers,
        body: data
    })
    this.http.request(new Request(this.requestOptions));

    var params = new URLSearchParams();
    params.append('body', this.newTodo.body);
    params.append('completed', 'false');
    

    var res:String;
    this.http.post(this.requestOptions.url, 
                  params,
                  this.requestOptions.headers
                  ).subscribe(response => {
                    res = response.headers.values()[1][0];
                    console.log(response, "POST result");
                    
                    if(res == "Success!")
                    {
                      // Add a local copy of the todo note...
                      this.todoService.addTodo(this.newTodo);
                      // and then instantiate a new object
                      this.newTodo = new Todo();
                    }
                    else
                    {
                      alert("something went wrong!");
                    }
                  });

    
  }


  toggleTodoComplete(todo) {
    this.todoService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoService.deleteTodoById(todo.id);
  }

  get todos() 
  {
    return this.todoService.getAllTodos();
  }

}