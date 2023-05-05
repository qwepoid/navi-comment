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
    <div>
      <input
        placeholder="Reply"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <button onClick={handleSubmitReply}>Reply</button>
    </div>
  );
};
export default Reply;
