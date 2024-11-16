import { Icon } from "@iconify/react/dist/iconify.js";
import { Form } from "@remix-run/react";
import React from "react";
import Button from "./Button";
import { LoaderFunction } from "@remix-run/node";
import VoteSection from "./caseCard/VoteSection";
import PercentageSection from "./caseCard/PercentageSection";

interface cardProps {
  props: {
    id: number;
    title: string;
    description: string;
    image?: string;
    isu: {
      name: string;
      slug: string;
    };
    votes: {
      user_id: number;
    }[];
    total_votes_agree: number;
    total_votes_disagree: number;
    total_votes: number;
    isUserLiked: boolean;
    comment: {
      id: number;
      user_id: number;
      content: string;
      created_at: string;
      profiles: {
        display_name: string;
      };
    }[];
  };
}

const CaseCard: React.FC<cardProps> = ({ props }) => {
  console.log(props);

  return (
    <div className="bg-white relative space-y-2 border-l-4 border-primary  shadow py-4 px-8 rounded-xl">
      <h2 className="text-xl font-bold">{props.title}</h2>
      {props.image && (
        <img src={props.image} alt="img" className="w-1/3 h-auto rounded-lg " />
      )}

      <article
        className="text-sm prose-sm prose"
        dangerouslySetInnerHTML={{ __html: props.description }}
      ></article>
      {props.isUserLiked ? (
        <>
          <PercentageSection props={props} />
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
            <h4 className="font-bold">{props.comment.length} Balasan</h4>
            {
                props.comment.length>0&&(
                    props.comment.map((comment) => (
                       <div className="border shadow-md rounded-lg p-4">
                        <div className="flex items-center gap-4">
                            <h3 className="text-sm font-bold">{comment.profiles.display_name}</h3>
                        </div>
                        <small>{comment.content}</small>
                       </div>
                         
                    ))

                )
            }
          </section>
        </>
      ) : (
        <VoteSection props={props} />
      )}
    </div>
  );
};

export default CaseCard;
