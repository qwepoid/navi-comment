import { useState } from "react";

const Reply = ({
  onSubmitReply,
}: {
  onSubmitReply: (text: string) => void;
}) => {
  const [replyText, setReplyText] = useState("");

  function handleSubmitReply() {
    onSubmitReply(replyText);
    setReplyText("");
  }

  return (
    <div className="min-w-full flex flex-1">
      <input
        placeholder="Reply"
        className="border-2 p-1 flex-wrap flex-1 mr-2"
        autoFocus
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <button onClick={handleSubmitReply}>Reply</button>
    </div>
  );
};
export default Reply;
