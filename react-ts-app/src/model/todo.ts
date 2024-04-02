export class Todo {
  id!: number;
  title!: string;
  description!: string;
  completed!: boolean;
  constructor(json: Partial<Todo>) {
    this.id = json.id || random5DigitNumber();
    this.title = json.title || "";
    this.description = json.description || "";
    this.completed = json.completed || false;
  }
}

const random5DigitNumber = () => Math.floor(Math.random() * 90000) + 10000;
