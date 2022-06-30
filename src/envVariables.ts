export const getEnvVariable = (varName: string) => {
  const windowEnv = (window as any).env
  if (!windowEnv) {
    return ''
  }
  return windowEnv[varName]
}

export const stringGenerator = () => Math.random().toString(36).slice(2)

const OAUTH_URL = 'OAUTH_URL'
const OAUTH_CLIENT_ID = 'OAUTH_CLIENT_ID'

const windowLocation = window.location.origin
const API_GATEWAY = getEnvVariable(OAUTH_URL)
const API_BASE_URL = `${windowLocation}/`
const API_AUTH_REDIRECT = `${API_GATEWAY}/oauth2/auth?response_type=code&client_id=${getEnvVariable(
  OAUTH_CLIENT_ID
)}&scope=offline&state=${stringGenerator()}&redirect_uri=${windowLocation}`

export { windowLocation, API_GATEWAY, API_BASE_URL, API_AUTH_REDIRECT }
