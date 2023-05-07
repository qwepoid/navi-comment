import { useEffect, useState } from "react";
import Comment from "./Comment";
import useNode from "./custom-hooks/useNode";
import { defaultState } from "./constants";

const CommentWidget = () => {
  const [comments, setComments] = useState(defaultState);

  const { deleteNode, insertNode, editNode, initialiseComments } = useNode();

  function handleDeleteNode(folderId) {
    const finalStructure = deleteNode(comments, folderId);
    setComments({ ...finalStructure });
  }

  function handleEditNode(folderId, value) {
    const finalStructure = editNode(comments, folderId, value);
    setComments(finalStructure);
  }

  function handleInsertNode(folderId, item) {
    const finalStructure = insertNode(comments, folderId, item);
    setComments(finalStructure);
  }

  useEffect(() => {
    const initialComments = initialiseComments();
    setComments(initialComments);
  }, []);

  return (
    <div className="flex flex-col justify-start items-start">
      <h1 className="text-2xl font-bold mb-4"> Comment Widget</h1>
      <Comment
        currentComment={comments}
        handleInsertComment={handleInsertNode}
        handleEditComment={handleEditNode}
        handleDeleteComment={handleDeleteNode}
      />
    </div>
  );
};

export default CommentWidget;
