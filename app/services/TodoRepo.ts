import { Context, Effect, Layer } from "effect";
import { Todo } from "~/types/Todo";

const makeTodoRepo = Effect.sync(() => {
  return {
    getAllTodos: Effect.gen(function* () {
      const todos = [
        new Todo({
          id: 1,
          createdAt: new Date(),
          status: "CREATED",
          title: "One small step for man.",
        }),
      ];

      const encoded: ReadonlyArray<Todo.Encoded> = yield* Todo.encodeArray(
        todos
      );

      return encoded;
    }),
  };
});

export class TodoRepo extends Context.Tag("@services/TodoRepo")<
  TodoRepo,
  Effect.Effect.Success<typeof makeTodoRepo>
>() {
  static Live = Layer.effect(this, makeTodoRepo);
}
