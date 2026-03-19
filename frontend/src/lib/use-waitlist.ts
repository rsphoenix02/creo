import { useState, useCallback } from "react";
import { joinWaitlist } from "./api";

type WaitlistState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function useWaitlist(source: string = "landing") {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<WaitlistState>({ status: "idle" });

  const submit = useCallback(async () => {
    const trimmed = email.trim();
    if (!trimmed) return;

    setState({ status: "loading" });
    try {
      const result = await joinWaitlist(trimmed, source);
      setState({ status: "success", message: result.message });
      setEmail("");
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }, [email, source]);

  const reset = useCallback(() => {
    setState({ status: "idle" });
  }, []);

  return { email, setEmail, state, submit, reset } as const;
}
