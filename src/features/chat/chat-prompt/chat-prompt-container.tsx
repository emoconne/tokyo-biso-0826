"use client";

import { usePromptContext } from "@/features/main-prompt/prompt-context";

export const ChatPromptContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isPromptOpen } = usePromptContext();
  return <>{isPromptOpen ? children : null}</>;
};
