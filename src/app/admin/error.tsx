"use client";

import React, { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex w-full items-center label-medium mt-20 flex-col gap-4">
      <div className="text-4xl">Something went wrong!!</div>
      <button className="flex text-xl border py-2 px-4 rounded-xl text-white bg-[#202529]" onClick={() => reset()}>Try again</button>
    </div>
  );
}
