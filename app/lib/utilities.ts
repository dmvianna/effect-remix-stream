import type { LoaderFunction } from "@remix-run/node";
import { Effect, ManagedRuntime, Layer } from "effect";

export const runtime = ManagedRuntime.make(Layer.empty)

export const loaderFunction = <A,E>(
  body: (...args: Parameters<LoaderFunction>) => Effect.Effect<A, E,
  never>): {
  (...args: Parameters<LoaderFunction>): Promise<A>;
} =>
  (...args) =>
  runtime.runPromise(body(...args));
