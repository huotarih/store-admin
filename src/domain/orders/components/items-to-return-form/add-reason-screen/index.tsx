import { useAdminReturnReasons } from "medusa-react"
import React, { useMemo, useState } from "react"
import { Controller } from "react-hook-form"
import { ItemsToReturnFormType } from ".."
import Button from "../../../../../components/fundamentals/button"
import Modal from "../../../../../components/molecules/modal"
import { useLayeredModal } from "../../../../../components/molecules/modal/layered-modal"
import { NextSelect } from "../../../../../components/molecules/select/next-select"
import TextArea from "../../../../../components/molecules/textarea"
import { NestedForm } from "../../../../../utils/nested-form"

type Props = {
  form: NestedForm<ItemsToReturnFormType>
  index: number
  isClaim?: boolean
}

const AddReasonScreen = ({ form, index, isClaim = false }: Props) => {
  const { return_reasons } = useAdminReturnReasons()
  const returnReasonOptions = useMemo(() => {
    return (
      return_reasons?.map((reason) => ({
        label: reason.label,
        value: reason.id,
      })) || []
    )
  }, [return_reasons])

  const { control, path, register, resetField, getValues } = form

  const [originalValue] = useState(
    getValues(path(`items.${index}.return_reason_details`))
  )

  const { pop } = useLayeredModal()

  const cancelAndPop = () => {
    resetField(path(`items.${index}.return_reason_details`), {
      defaultValue: originalValue,
    })
    pop()
  }

  return (
    <>
      <Modal.Content>
        <div className="flex flex-col gap-y-base">
          <h2 className="inter-base-semibold">Reason for Return</h2>
          <Controller
            control={control}
            name={path(`items.${index}.return_reason_details.reason`)}
            render={({ field }) => {
              return (
                <NextSelect
                  label="Reason"
                  placeholder="Choose a return reason"
                  {...field}
                  options={returnReasonOptions}
                  isClearable
                />
              )
            }}
          />
          <TextArea
            label="Note"
            placeholder="Product was damaged during shipping"
            {...register(path(`items.${index}.return_reason_details.note`))}
          />
        </div>
      </Modal.Content>
      <Modal.Footer>
        <div className="w-full flex items-center justify-end gap-x-xsmall">
          <Button size="small" variant="secondary" onClick={cancelAndPop}>
            Cancel
          </Button>
          <Button size="small" variant="primary" onClick={pop}>
            Save and go back
          </Button>
        </div>
      </Modal.Footer>
    </>
  )
}

const useAddReasonScreen = () => {
  const { pop, push } = useLayeredModal()

  const pushScreen = (props: Props) => {
    push({
      title: "Select Reason",
      onBack: () => pop(),
      view: <AddReasonScreen {...props} />,
    })
  }

  return { pushScreen }
}

export default useAddReasonScreen
