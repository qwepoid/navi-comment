const CommentAction = ({ handleClick, type, classes = "" }) => {
  return (
    <button
      onClick={handleClick}
      className={`border-2 rounded-md px-1 my-1 ${classes}`}
    >
      {type}
    </button>
  );
};

export default CommentAction;
