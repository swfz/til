import { worker } from "./src/mocks/browser"

const startWorker = async () => {
  await worker.start({})
}

export const onClientEntry = () => {
  if (process.env.NODE_ENV === "development") {
    startWorker()
  }
}

export { wrapPageElement } from "./src/wrap-page-element"
