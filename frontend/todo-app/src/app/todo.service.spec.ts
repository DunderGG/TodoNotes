/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {Todo} from './todo'
import { TodoService } from './todo.service';

describe('Todo Service', () => {
  beforeEachProviders(() => [TodoService]);

  describe('#getAllTodos()', () => {
    it('should return an empty array by default', inject([TodoService], (service: TodoService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject([TodoService], (service: TodoService) => {
      let todo1 = new Todo({body: 'Hello 1', completed: false});
      let todo2 = new Todo({body: 'Hello 2', completed: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

describe('#save(todo)', () => {

    it('should automatically assign an incrementing id', inject([TodoService], (service: TodoService) => {
      let todo1 = new Todo({body: 'Hello 1', complete: false});
      let todo2 = new Todo({body: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    }));

  });

  describe('#deleteTodoById(id)', () => {

    it('should remove todo with the corresponding id', inject([TodoService], (service: TodoService) => {
      let todo1 = new Todo({body: 'Hello 1', complete: false});
      let todo2 = new Todo({body: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(1);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(2);
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should not removing anything if todo with corresponding id is not found', inject([TodoService], (service: TodoService) => {
      let todo1 = new Todo({body: 'Hello 1', complete: false});
      let todo2 = new Todo({body: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));

  });

  describe('#updateTodoById(id, values)', () => {

    it('should return todo with the corresponding id and updated data', inject([TodoService], (service: TodoService) => {
      let todo = new Todo({body: 'Hello 1', complete: false});
      service.addTodo(todo);
      let updatedTodo = service.updateTodoById(1, {
        body: 'new body'
      });
      expect(updatedTodo.body).toEqual('new body');
    }));

    it('should return null if todo is not found', inject([TodoService], (service: TodoService) => {
      let todo = new Todo({body: 'Hello 1', complete: false});
      service.addTodo(todo);
      let updatedTodo = service.updateTodoById(2, {
        body: 'new body'
      });
      expect(updatedTodo).toEqual(null);
    }));

  });

  describe('#toggleTodoComplete(todo)', () => {

    it('should return the updated todo with inverse complete status', inject([TodoService], (service: TodoService) => {
      let todo = new Todo({body: 'Hello 1', complete: false});
      service.addTodo(todo);
      let updatedTodo = service.toggleTodoComplete(todo);
      expect(updatedTodo.completed).toEqual(true);
      service.toggleTodoComplete(todo);
      expect(updatedTodo.completed).toEqual(false);
    }));

  });

});