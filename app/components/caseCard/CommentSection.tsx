import { Icon } from '@iconify/react/dist/iconify.js'
import { Form } from '@remix-run/react'
import React from 'react'
import PercentageSection from './PercentageSection'

interface cardProps {
    props: {
        id: number
        title: string
        description: string
        image?: string
        isu: {
            name: string
            slug: string
        }
        votes: {
            user_id: number
        }
        total_votes_agree: number
        total_votes_disagree: number
        total_votes: number
        isUserLiked: boolean
    }
}

const CommentSection:React.FC<cardProps> = ({props}) => {
  return (
    <>
<PercentageSection props={props}/>
    <Form method="post">
      <input
        placeholder="Tulis opini kalian disini.."
        type="text"
        name="comment"
        className="bg-gray-100 border rounded w-full px-4 py-2"
        id=""
      />
      <input type="hidden" name="case_id" value={props.id} />
      <input type="hidden" name="event" value={"comment"} />
    </Form>
    <section className="">
      <h4 className="font-bold">3 Balasan</h4>
    </section>
  </>
  )
}

export default CommentSection
