export class Todo 
{
  id: number;                 // Currently a local reference, should be set by backend
  body: string = '';          // The main body of the todo note
  completed: boolean = false; // Indicates wether the task has been completed or not

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}