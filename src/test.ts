import { TestClass2 } from "./test2";

export class TestClass extends TestClass2 {
  y: number;

  constructor() {
    super();
    this.y = 1234;
  }

  explode() {
    throw new Error("Boom!");
  }
}
