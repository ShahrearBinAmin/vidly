import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn:
      "https://6ea9158dfd1f461abe097bb3073c4ae3@o467255.ingest.sentry.io/5493582",
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  //Sentry.captureException(error);
}

export default {
  init,
  log,
};
