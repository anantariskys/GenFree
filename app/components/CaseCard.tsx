import { Icon } from "@iconify/react/dist/iconify.js";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import React, { useEffect, useRef } from "react";
import Button from "./Button";
import { LoaderFunction } from "@remix-run/node";
import VoteSection from "./caseCard/VoteSection";
import PercentageSection from "./caseCard/PercentageSection";
import CommentCard from "./CommentCard";
import { useToast } from "./ToastProvider";

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
        gender: number;
      };
      votes: {
        agree: boolean;
      };
    }[];
  };
}

const CaseCard: React.FC<cardProps> = ({ props }) => {
  const actionData = useActionData<{ error?: string; success?: string }>();
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.error) {
      showToast(actionData.error, "error");
    }
    if (actionData?.success) {
      showToast(actionData.success, "success");
    }
  }, [actionData, showToast]);

  useEffect(() => {
    if (!isSubmitting && formRef.current) {
      formRef.current.reset();
    }
  }, [isSubmitting]);

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
          <Form method="post" ref={formRef}>
            <div className="relative">
              <input
                disabled={isSubmitting}
                placeholder="Tulis opini kalian di sini..."
                type="text"
                name="comment"
                className="bg-gray-100 border rounded w-full px-4 py-2 focus:outline-none focus:ring focus:ring-primary/50"
              />
              <Icon
                icon={isSubmitting ? "mdi:loading" : "formkit:submit"}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-primary ${
                  isSubmitting
                    ? "animate-spin"
                    : "transition-transform duration-200"
                }`}
              />
            </div>
            <input type="hidden" name="case_id" value={props.id} />
            <input type="hidden" name="event" value="comment" />
          </Form>

          <section className="space-y-4">
            <h4 className="font-bold">{props.comment.length} Balasan</h4>
            {props.comment.length > 0 &&
              props.comment.map((comment) => <CommentCard comment={comment} />)}
          </section>
        </>
      ) : (
        <VoteSection props={props} />
      )}
    </div>
  );
};

export default CaseCard;
