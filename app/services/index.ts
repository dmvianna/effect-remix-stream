import { Layer } from "effect";
import { makeRemixRuntime } from "~/lib/utilities";
import { TodoRepoLive } from "./TodoRepo";

export const { loaderFunction } = makeRemixRuntime(
  Layer.mergeAll(TodoRepoLive)
);
