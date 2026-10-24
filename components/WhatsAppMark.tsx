export function WhatsAppMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        d="M12 2.6a9.4 9.4 0 0 0-8.1 14.2L2.6 21.4l4.7-1.2A9.4 9.4 0 1 0 12 2.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.7 7.3c.3-.3.8-.3 1 .1l1 1.8c.2.3.1.7-.1 1l-.6.6c.6 1.3 1.6 2.3 2.9 2.9l.6-.6c.3-.3.7-.3 1-.1l1.8 1c.4.2.4.7.1 1l-.8.8c-.6.6-1.6.8-2.4.4a10 10 0 0 1-4.7-4.7c-.4-.8-.2-1.8.4-2.4Z"
        fill="currentColor"
      />
    </svg>
  );
}
