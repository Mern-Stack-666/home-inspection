"use client";

import { ChatProvider } from "@/context/ChatContext";

export function Providers({ children }) {
  return (
    <ChatProvider>
      {children}
    </ChatProvider>
  );
}
