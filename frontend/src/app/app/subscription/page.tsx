"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SubscriptionsRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/app/subscriptions");
  }, [router]);
  return null;
}
