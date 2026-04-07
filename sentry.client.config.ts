import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://712ae04cf13ec145d037ad08d546012a@o4511171159785472.ingest.us.sentry.io/4511177271803904",
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    Sentry.replayIntegration(),
  ],
});
