import type { LoaderFunction } from "@remix-run/node";
import { Effect } from "effect";

export const loaderFunction = <A,E>(
  body: (...args: Parameters<LoaderFunction>) => Effect.Effect<A, E,
  never>): {
  (...args: Parameters<LoaderFunction>): Promise<A>;
} =>
  (...args) =>
  Effect.runPromise(body(...args));
