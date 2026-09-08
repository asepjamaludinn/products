"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";

export const ChatInput = ({ onSend, onTyping }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onTyping?.(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value);
    setValue("");
    onTyping?.(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-slate-100 p-3"
    >
      <Input
        value={value}
        onChange={handleChange}
        placeholder="Type a message…"
        className="flex-1"
      />
      <Button type="submit">Send</Button>
    </form>
  );
};
