import { Effect, Context, Layer } from "effect";
import { Todo } from "~/types/Todo";

export class TodoRepo extends Context.Tag("@services/TodoRepo")<
  TodoRepo,
{ readonly getAllTodos: Effect.Effect<Todo[]> }>() {}

export const program = Effect.gen(function* () {
  const repo = yield* TodoRepo;
  const todos = yield* repo.getAllTodos;
  return todos;
})

const todos = [
  new Todo({
    id: 1,
    createdAt: new Date(),
    status: "CREATED",
    title: "One small step for man.",
  }),
];

export const TodoRepoLive = Layer.succeed(TodoRepo, TodoRepo.of({
  getAllTodos: Effect.succeed(todos)
}))

export const runnable = Effect.provide(program, TodoRepoLive)
