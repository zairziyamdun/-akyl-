"use client";

import { useEffect, useState } from "react";
import {
  getMySubscriptionOverview,
  type JournalSubscriber,
} from "@/entities/journal-subscription";
import { useAuth } from "@/features/auth";

export type JournalAccessState = {
  loading: boolean;
  hasActiveAccess: boolean;
  current: JournalSubscriber | null;
};

export function useJournalAccess(): JournalAccessState {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [hasActiveAccess, setHasActiveAccess] = useState(false);
  const [current, setCurrent] = useState<JournalSubscriber | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (authLoading) {
      return;
    }

    if (!isAuthenticated) {
      setHasActiveAccess(false);
      setCurrent(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    void (async () => {
      try {
        const overview = await getMySubscriptionOverview();
        if (!cancelled) {
          setHasActiveAccess(overview.hasActiveAccess);
          setCurrent(overview.current);
        }
      } catch {
        if (!cancelled) {
          setHasActiveAccess(false);
          setCurrent(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, isAuthenticated]);

  return {
    loading: authLoading || loading,
    hasActiveAccess,
    current,
  };
}
