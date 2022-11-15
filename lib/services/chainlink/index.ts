/**
 * Some chainlink-related code has been borrowed from https://github.com/smartcontractkit/chainlink-in-web2-fh22/blob/main/src/utils/getETHPrice.js
 * which is authored by https://github.com/rgottleber
 */
import { ethers } from 'ethers'
import { aggregatorV3InterfaceABI } from './abi'

// @todo: Move to .env.
const CHAINLINK_NODE_URL = 'https://api.avax-test.network/ext/bc/C/rpc'
const CHAINLINK_CONTRACT_ADDRESS = '0x86d67c3D38D2bCeE722E601025C25a575021c6EA'

export const convertUSDToETH = async (amountInUSD: number) => {
  try {
    console.log('CL DataFeed requested')
    
    const priceOfOneETH = await getETHPrice()
    if (priceOfOneETH == null || priceOfOneETH == 0) {
      return 0
    }

    return amountInUSD / priceOfOneETH
  } catch (e) {
    console.log(e)
    return 0
  }
}

export async function getETHPrice() {
  if (CHAINLINK_NODE_URL == null || CHAINLINK_CONTRACT_ADDRESS == null) {
    throw new Error('Pleae set Chainlink details through your .env.')
  }

  var provider = new ethers.providers.JsonRpcProvider(CHAINLINK_NODE_URL)

  const priceFeed = new ethers.Contract(
    CHAINLINK_CONTRACT_ADDRESS,
    aggregatorV3InterfaceABI,
    provider
  )
  let roundData = await priceFeed.latestRoundData()
  let decimals = await priceFeed.decimals()
  return Number(
    (roundData.answer.toString() / Math.pow(10, decimals)).toFixed(2)
  )
}