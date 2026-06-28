export default function TearDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto max-w-8xl px-6 ${className}`}>
      <div className="tear-line" />
    </div>
  );
}
