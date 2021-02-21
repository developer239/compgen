import Rollbar from 'rollbar'

export const reporter = new Rollbar({
  accessToken: 'ROLLUP_PUBLIC_TOKEN',
  captureUncaught: true,
  captureUnhandledRejections: true,
})
