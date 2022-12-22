export const APP_NAME: string = 'MarrySign'
export const APP_URL: string =
  process.env.NODE_ENV === 'production'
    ? 'https://marrysign.com'
    : 'http://localhost:3000'
// export const APP_DESCRIPTION: string =
//   'We empower any couple to register marriage online'
export const APP_DESCRIPTION: string = 'Crypto-marriages without restrictions on age, location, culture, gender or anything else.'
export const APP_SLOGAN: string = 'Unrestricted Crypto-Marriages'
// export const APP_SLOGAN: string =
//   'Closer than Copenhagen & quicker than Las Vegas'
// No @ in Twitter handle, please.
// @todo: Replace with the app handle.
export const APP_TWITTER_HANDLE: string = 'MarrySign'

export const SUGGESTED_TERMINATION_COST_ETH = '0.02'
export const SERVICE_FEE_ETH = '0'

export const LOCAL_NETWORKS = ['local', 'localhost', 'hardhat']

// false until the launch.
export const LOGIN_ENABLED = process.env.NODE_ENV !== 'production'
export const SUBSCRIBE_TO_NEWS_PATH = 'https://news.marrysign.com/'

