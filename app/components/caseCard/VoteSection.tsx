import { Form } from '@remix-run/react'
import React from 'react'
import Button from '../Button'


interface cardProps {
    props: {
        id:number
    }
}
const VoteSection:React.FC<cardProps> = ({props}) => {
  return (
    <div className="flex items-center gap-2 justify-end">
    <Form method="post">
      <input type="hidden" name="event" value={"vote"} />
      <input type="hidden" name="case_id" value={props.id} />

      <input type="hidden" name="isAgreed" value={"1"} />
      <Button width="w-fit" variant="setuju">
        Setuju
      </Button>
    </Form>
    <Form method="post">
      <input type="hidden" name="event" value={"vote"} />
      <input type="hidden" name="case_id" value={props.id} />
      <input type="hidden" name="isAgreed" value={"0"} />
      <Button width="w-fit" variant="tolak">
        Tidak Setuju
      </Button>
    </Form>
  </div>
  )
}

export default VoteSection
