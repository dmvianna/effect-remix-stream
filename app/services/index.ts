import { Layer } from "effect";
import { makeRemixRuntime } from "~/lib/utilities";

export const loaderFunction  = makeRemixRuntime(Layer.empty);
