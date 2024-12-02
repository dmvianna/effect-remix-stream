import { NodeSdk } from "@effect/opentelemetry";
import {
  Config,
  Redacted,
  Context,
  Duration,
  Effect,
  Layer,
  Option,
} from "effect";
import {
  BatchSpanProcessor,
  OTLPMetricExporter,
  OTLPTraceExporter,
  PeriodicExportingMetricReader,
} from "~/lib/otel";

export const HoneycombConfig = Config.nested("HONEYCOMB")(
  Config.all({
    apiKey: Config.redacted("API_KEY"),
    serviceName: Config.string("SERVICE_NAME"),
  })
);

export const TracingLive = Layer.unwrapEffect(
  Effect.gen(function* () {
    const config = Option.getOrNull(yield* Config.option(HoneycombConfig))
    if (!config) {
      return Layer.succeedContext(Context.empty());
    }
    const { apiKey, serviceName } = config;
    const headers = {
      "x-honeycomb-team": Redacted.value(apiKey),
      "x-honeycomb-dataset": serviceName,
    };
    const traceExporter = new OTLPTraceExporter({
      url: "https://api.honeycomb.io/v1/traces",
      headers,
    });
    const metricExporter = new OTLPMetricExporter({
      url: "https://api.honeycomb.io/v1/metrics",
      headers,
    });
    return NodeSdk.layer(() => ({
      resource: { serviceName },
      spanProcessor: new BatchSpanProcessor(traceExporter, {
        scheduledDelayMillis: Duration.toMillis("1 seconds"),
      }),
      metricReader: new PeriodicExportingMetricReader({
        exporter: metricExporter,
        exportIntervalMillis: Duration.toMillis("5 seconds"),
      }),
    }));
  })
);
