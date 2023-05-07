import { useEffect, useRef, useState } from "react";
import Reply from "../Reply";
import { TCommentWidget } from "../types";
import CommentAction from "../CommentAction";
import { ActionType } from "../CommentAction/types";

const Comment = ({
  currentComment,
  handleInsertComment,
  handleEditComment,
  handleDeleteComment,
}: TCommentWidget) => {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [commentTitle, setCommentTitle] = useState<string>("");
  const titleRef = useRef(null);
  function handleAddComment(): void {
    if (isEditMode) {
      const updatedComment = titleRef?.current?.innerHTML;
      if (updatedComment.lenth === 0) return;
      handleEditComment(currentComment.id, titleRef?.current?.innerHTML);
      setEditMode(false);
    } else {
      if (commentTitle.length === 0) return;
      handleInsertComment(currentComment.id, commentTitle);
      setCommentTitle("");
    }
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

  function handleCancelEdit() {
    titleRef.current.innerHTML = currentComment.title;
    setEditMode(false);
  }

  useEffect(() => {
    if (isEditMode) {
      titleRef?.current?.focus();
    }
  }, [isEditMode]);

  return (
    <>
      {currentComment.id === 1 ? (
        <div className="w-96 flex">
          <input
            placeholder="Enter comment"
            className="border-2 p-2 min-w-full flex-wrap mr-2"
            value={commentTitle}
            onChange={(e) => setCommentTitle(e.target.value)}
            maxLength={40}
          />
          <button
            onClick={handleAddComment}
            className="whitespace-nowrap font-bold text-white border-blue-500 bg-blue-500 px-2 rounded-md"
          >
            Add comment
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-2 items-start border-2 flex-col w-[600px] bg-slate-200 p-2 rounded-lg my-2">
            <div className="flex justify-between w-full items-center">
              <span
                className={`p-2 w-[500px] text-ellipsis overflow-hidden ${
                  isEditMode && "bg-white rounded-md"
                }`}
                ref={titleRef}
                contentEditable={isEditMode}
                suppressContentEditableWarning={isEditMode}
              >
                {currentComment.title}
              </span>
              <span className="text-sm font-light italic">
                {new Date(currentComment.timeStamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center justify-between w-full">
              {isEditMode ? (
                <div className="flex p-2 gap-2">
                  <CommentAction
                    type={ActionType.Save}
                    classes="text-blue-500"
                    handleClick={handleAddComment}
                  />
                  <CommentAction
                    type={ActionType.Cancel}
                    handleClick={handleCancelEdit}
                  />
                </div>
              ) : (
                <div className="flex">
                  <CommentAction
                    type={ActionType.Reply}
                    classes="text-blue-500"
                    handleClick={() => setShowReply(!showReply)}
                  />
                  <CommentAction
                    type={ActionType.Edit}
                    handleClick={() => setEditMode(true)}
                  />
                  <CommentAction
                    type={ActionType.Delete}
                    classes="text-red-500"
                    handleClick={() => handleDeleteComment(currentComment.id)}
                  />
                </div>
              )}
              <span className="px-2 font-thin text-sm">
                {currentComment?.isEdited ? "Edited" : ""}
              </span>
            </div>
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
              handleEditComment={handleEditComment}
              handleInsertComment={handleInsertComment}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
      </div>
    </>
  );
};

export default Comment;
