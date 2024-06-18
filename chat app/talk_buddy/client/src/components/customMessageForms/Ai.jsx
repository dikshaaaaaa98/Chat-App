import { usePostAiTextMutation } from "@/state/api";
import React, { useState } from "react";
import MessageFormUI from "./MessageFormUI";

function subtractMinutes(date, minutes) {
  date.setMinutes(date.getMinutes() - minutes);

  return date;
}

const Ai = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [trigger] = usePostAiTextMutation();

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
    const date = subtractMinutes(new Date(),1)
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random())}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    // setTimeout(() => {
    //   console.log("called me");
    // }, 5000);
    trigger(form);
    setMessage("");
    setAttachment("");
  };

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Ai;
