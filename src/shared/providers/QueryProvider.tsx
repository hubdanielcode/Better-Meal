"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [myClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={myClient}>{children}</QueryClientProvider>;
};

export { QueryProvider };
