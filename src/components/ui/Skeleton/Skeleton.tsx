type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-[6px] bg-gray-200 dark:bg-gray-800 ${className}`}
    />
  );
}
