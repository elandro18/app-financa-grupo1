export function EmptyChartState({ message }: { message: string }) {
  return (
    <div className="h-[260px] flex items-center justify-center text-sm text-gray-400">
      {message}
    </div>
  );
}
