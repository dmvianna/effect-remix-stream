export interface Todo {
  readonly id: number;
  readonly title: string;
  readonly createdAt: string;
  readonly status: "COMPLETED" | "CREATED";
}
