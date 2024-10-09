// src/mocks/browser.js
import { setupWorker } from "msw/browser"

import { handlers } from "./handler"
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)
