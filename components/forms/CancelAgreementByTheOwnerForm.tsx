import { BytesLike } from 'ethers'
import { FC, MouseEvent } from 'react'
import { refuseAgreement } from '../../lib/contract/agreement'
import { handleContractError } from '../../lib/helpers'
import { MarrySign } from '../../typechain'
import Button from '../controls/Button'
import { useAppContext } from '../hooks/useAppContext'

type Props = {
  agreement: MarrySign.AgreementStruct
  onAgreementCanceled: (agreementId: BytesLike) => void
}
/**
 * The Cancel Agreement action is nothing but Refusing
 * but the language is rephrased to better suite the agreement creator.
 * @param props
 * @returns
 */
const CancelAgreementForm: FC<Props> = (props) => {
  const { agreement, onAgreementCanceled } = props
  const { showAppLoading, hideAppLoading } = useAppContext()

  /**
   * Cancel/refuse the agreement by its creator.
   * In fact, it's just a matter of naming for the user.
   * @param e
   */
  const handleCancelAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      showAppLoading('Cancelling your agreement...')
      const successful = await refuseAgreement(
        agreement.id.toString(),
        (agreementId: BytesLike) => {
          hideAppLoading()
          return onAgreementCanceled(agreementId)
        }
      )
      if (!successful) {
        hideAppLoading()
        handleContractError('Transaction failed for some reason.')
      }
    } catch (e) {
      hideAppLoading()
      handleContractError(e)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-6 mt-6 border rounded-sm">
      <form className="flex flex-col justify-center w-full max-w-sm">
        <div className="flex flex-col justify-between">
          <Button
            color="secondary"
            onClick={handleCancelAgreement}
            description="No termination cost required"
            className='w-full'
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CancelAgreementForm
