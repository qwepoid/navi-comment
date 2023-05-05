import { useState } from "react";
import Reply from "../Reply";
import { TCommentWidget } from "../types";

const Comment = ({
  currentComment,
  handleInsertComment,
  handleDeleteComment,
}: TCommentWidget) => {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [commentTitle, setCommentTitle] = useState<string>("");

  function handleAddComment(): void {
    if (commentTitle.length === 0) return;
    handleInsertComment(currentComment.id, commentTitle);
    setCommentTitle("");
  }

  /**
   * Handles the case when user submits reply to a comment
   * @param replyText
   * @returns
   */
  function handleOnSubmitReply(replyText: string): void {
    if (replyText.length === 0) return;
    handleInsertComment(currentComment.id, replyText);
    setShowReply(false);
  }
  return (
    <>
      {currentComment.id === 1 ? (
        <div className="w-96 flex">
          <input
            placeholder="Enter comment"
            className="border-2 p-2 min-w-full flex-wrap"
            value={commentTitle}
            onChange={(e) => setCommentTitle(e.target.value)}
            maxLength={40}
          />
          <button onClick={handleAddComment} className="whitespace-nowrap">
            Add comment
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <span>{currentComment.title}</span>
            <button
              onClick={() => handleDeleteComment(currentComment.id)}
              className="border-2 rounded-md border-red-500 text-red-500 px-1 my-1"
            >
              Delete
            </button>
            <button
              onClick={() => setShowReply(!showReply)}
              className="border-2 rounded-md border-blue-500 text-blue-500 px-1 my-1"
            >
              Reply
            </button>
          </div>
          {showReply && (
            <Reply
              onSubmitReply={(text: string) => handleOnSubmitReply(text)}
            />
          )}
        </>
      )}
      <div className="ml-8">
        {Array.isArray(currentComment.items) &&
          currentComment.items.map((childComment) => (
            <Comment
              currentComment={childComment}
              key={childComment.id}
              handleInsertComment={handleInsertComment}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
      </div>
    </>
  );
};

export default Comment;
