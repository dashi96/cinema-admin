declare global {
  interface Window {
    env: any
  }
}

type EnvType = {
  REACT_APP_API_URL?: string
}

const environment: EnvType = {
  REACT_APP_API_URL: import.meta.env.REACT_APP_API_URL
}

export { environment as env }
