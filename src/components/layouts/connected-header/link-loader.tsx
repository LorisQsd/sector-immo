"use client";

import { LoaderCircle } from "lucide-react";
import { useLinkStatus } from "next/link";

export default function LoadingIndicator() {
  const { pending } = useLinkStatus();
  return pending ? (
    <LoaderCircle aria-label="Loading" className="animate-spin ml-auto" />
  ) : null;
}
