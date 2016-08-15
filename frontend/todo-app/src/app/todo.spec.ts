/* tslint:disable:no-unused-variable */

import { beforeEach, beforeEachProviders, 
		describe, xdescribe, expect, it, xit, 
		async, inject, addProviders } from '@angular/core/testing';
import {Todo} from './todo';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new Todo()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
  	let todo = new Todo({
  		body: 'hello',
  		complete: true
  	});
  	expect(todo.body).toEqual('hello');
  	expect(todo.completed).toEqual(true);
  });
 
});
