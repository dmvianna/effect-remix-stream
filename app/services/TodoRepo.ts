import { Effect, Context, Layer } from "effect";
import { Todo } from "~/types/Todo";

export class TodoRepo extends Context.Tag("@services/TodoRepo")<
  TodoRepo,
{ readonly getAllTodos: Effect.Effect<Todo[]>
  readonly deleteAll: Effect.Effect<void>
}>() {}

export const getF = Effect.gen(function* () {
  const repo = yield* TodoRepo;
  return yield* repo.getAllTodos;
})

export const delF = Effect.gen(function* () {
  const repo = yield* TodoRepo;
  yield* repo.deleteAll;
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
  getAllTodos: Effect.succeed(todos),
  deleteAll: Effect.succeed([])
}))

export const runGet = Effect.provide(getF, TodoRepoLive)
export const runDel = Effect.provide(delF, TodoRepoLive)
