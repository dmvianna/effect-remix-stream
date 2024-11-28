import { Effect, Layer } from "effect";
import { Todo } from "~/types/Todo"

const makeTodoRepo = Effect.sync(() => {
  return {
    getAllTodos: Effect.succeed<Todo[]>([]),
  }
});

export class TodoRepo extends
  Effect.Tag("@services/TodoRepo")<TodoRepo, Effect.Effect.Success<typeof makeTodoRepo>>() {
  static Live = Layer.effect(this, makeTodoRepo);
}
