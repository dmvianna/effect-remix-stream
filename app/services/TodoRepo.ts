import { Effect, Context, Layer } from "effect";
import { Todo } from "~/types/Todo";

const makeTodoRepo = Effect.sync(() => {
  return {
    getAllTodos: Effect.succeed<Todo[]>([
      {
        id: 1,
        createdAt: new Date(),
        status: "CREATED",
        title: "One small step for man.",
      },
    ]),
  };
});

export class TodoRepo extends Context.Tag("@services/TodoRepo")<
  TodoRepo,
  Effect.Effect.Success<typeof makeTodoRepo>
>() {
  static Live = Layer.effect(this, makeTodoRepo);
}
