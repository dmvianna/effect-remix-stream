export interface Todo {
  readonly id: number;
  readonly title: string;
  readonly createdAt: Date;
  readonly status: "COMPLETED" | "CREATED";
}
