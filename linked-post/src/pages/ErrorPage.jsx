import React, { Component, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "../../node_modules/framer-motion";
import { AlertTriangle, Home, RefreshCw, ChevronDown, Bug } from "../../node_modules/lucide-react";

function GlowBadge({ label = "Error" }) {
  const shouldReduce = useReducedMotion();
  return (
    <div className="relative inline-flex items-center gap-2 rounded-full border border-red-300/40 bg-red-50/80 px-3 py-1 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
      <AlertTriangle className="size-4" aria-hidden />
      <span className="text-sm font-medium">{label}</span>
      {!shouldReduce && (
        <motion.span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full"
          initial={{ boxShadow: "0 0 0 0 rgba(244,63,94,0.0)" }}
          animate={{ boxShadow: [
            "0 0 0 0 rgba(244,63,94,0.0)",
            "0 0 0 8px rgba(244,63,94,0.15)",
            "0 0 0 0 rgba(244,63,94,0.0)",
          ] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

function Details({ children }) {
  const [open, setOpen] = React.useState(false);
  if (!children) return null;
  return (
    <div className="mt-4 w-full">
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between rounded-xl border border-zinc-200/60 bg-white/60 px-4 py-3 text-left shadow-sm backdrop-blur transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <Bug className="size-4 opacity-70" />
          <span className="font-medium">Show technical details</span>
        </div>
        <ChevronDown
          className={`size-5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 overflow-auto rounded-xl border border-zinc-200/60 bg-zinc-50 p-4 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              {typeof children === "string" ? (
                <pre className="whitespace-pre-wrap leading-relaxed">{children}</pre>
              ) : (
                children
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingShapes() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-red-400/20 blur-3xl dark:bg-red-500/15"
        animate={{ x: [0, 20, -10, 0], y: [0, -10, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-rose-400/20 blur-3xl dark:bg-rose-500/15"
        animate={{ x: [0, -15, 10, 0], y: [0, 10, -10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function ErrorPage({
  title = "Something went wrong",
  message = "We couldn't complete your request. Please try again.",
  errorCode,
  details,
  onRetry,
  homeHref = "/",
  compact = false,
}) {
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 8 },
      visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
    }),
    []
  );

  const item = { hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className={`relative mx-auto ${compact ? "max-w-xl" : "max-w-2xl"} p-4 sm:p-6`}>
      <FloatingShapes />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/70"
        role="alert"
        aria-live="polite"
      >
        <motion.div variants={item} className="mb-4 flex items-center justify-between">
          <GlowBadge label={errorCode ? `Error ${errorCode}` : "Error"} />
        </motion.div>

        <motion.h1
          variants={item}
          className="text-balance text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-2 text-pretty text-zinc-600 dark:text-zinc-300"
        >
          {message}
        </motion.p>

        <motion.div variants={item} className="mt-5 flex flex-wrap items-center gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:translate-y-px hover:shadow-md active:scale-[0.99] dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
            >
              <RefreshCw className="size-4" aria-hidden />
              Retry
            </button>
          )}

          {homeHref && (
            <a
              href={homeHref}
              className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:translate-y-px hover:shadow-md active:scale-[0.99] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              <Home className="size-4" aria-hidden />
              Go Home
            </a>
          )}
        </motion.div>

        <motion.div variants={item}>
          <Details>{details}</Details>
        </motion.div>
      </motion.div>
    </div>
  );
}
export class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  handleReset = () => {
    this.setState({ error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.error) {
      return (
        <ErrorView
          title="Oops! An unexpected error occurred"
          message="The page crashed while rendering. You can try again or return home."
          errorCode={"500"}
          details={this.state.error?.stack || this.state.error?.message}
          onRetry={this.handleReset}
        />
      );
    }
    return this.props.children;
  }
}
