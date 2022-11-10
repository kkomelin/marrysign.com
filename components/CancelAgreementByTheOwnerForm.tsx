import { BytesLike } from 'ethers'
import { FC, MouseEvent } from 'react'
import { refuseAgreement } from '../lib/contract/agreement'
import { handleContractError } from '../lib/helpers'
import { MarrySign } from '../typechain'
import Button from './controls/Button'
import { useAppContext } from './hooks/useAppContext'

type Props = {
  agreement: MarrySign.AgreementStruct
  onAgreementCanceled: (agreementId: BytesLike) => void
}
const CancelAgreementByTheOwnerForm: FC<Props> = (props) => {
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
      // if (successful) {
      //   // onAgreementCanceled()
      // }
    } catch (e) {
      hideAppLoading()
      handleContractError(e)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-6 mt-6 border rounded-sm">
      <form className="flex flex-col justify-center w-full max-w-sm">
        <div className="flex flex-col justify-between">
          <Button color="secondary" onClick={handleCancelAgreement}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CancelAgreementByTheOwnerForm
