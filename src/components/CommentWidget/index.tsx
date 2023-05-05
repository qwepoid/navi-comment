import { useState } from "react";
import Comment from "./Comment";
import useNode from "./custom-hooks/useNode";
import { defaultState } from "./constants";

const CommentWidget = () => {
  const [comments, setComments] = useState(defaultState);

  const { deleteNode, insertNode } = useNode();

  function handleDeleteNode(folderId) {
    const finalStructure = deleteNode(comments, folderId);
    setComments({ ...finalStructure });
  }

  function handleInsertNode(folderId, item) {
    const finalStructure = insertNode(comments, folderId, item);
    setComments(finalStructure);
  }

  return (
    <div className="flex flex-col justify-start items-start">
      <h1 className="text-2xl font-bold"> Comment Widget</h1>
      <span typeof=""></span>
      <Comment
        currentComment={comments}
        handleDeleteComment={handleDeleteNode}
        handleInsertComment={handleInsertNode}
      />
    </div>
  );
};

export default CommentWidget;
