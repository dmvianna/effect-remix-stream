import { Layer } from "effect";
import { makeRemixRuntime } from "~/lib/utilities";
import { TodoRepoLive } from "./TodoRepo";
import { TracingLive } from "./Tracing";

export const { loaderFunction, actionFunction } = makeRemixRuntime(
  Layer.provide(TracingLive, Layer.mergeAll(TodoRepoLive))
);
