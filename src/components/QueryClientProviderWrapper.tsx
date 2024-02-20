"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

function QueryClientProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
}

export default QueryClientProviderWrapper;
