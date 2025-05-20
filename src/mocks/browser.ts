// src/mocks/browser.js
import { setupWorker } from "msw/browser"

import { handlers } from "./handler"
// This configures a Service Worker with the given request handlers.
// @ts-expect-error - Type incompatibility between HttpHandler and RequestHandler in MSW v2.8.4
export const worker = setupWorker(...handlers)
