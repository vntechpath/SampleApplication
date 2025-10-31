import { StatusBadge } from "../StatusBadge";

export default function StatusBadgeExample() {
  return (
    <div className="p-8 space-y-4">
      <div className="flex flex-wrap gap-2">
        <StatusBadge status="pending" />
        <StatusBadge status="processing" />
        <StatusBadge status="shipped" />
        <StatusBadge status="delivered" />
        <StatusBadge status="cancelled" />
      </div>
      <div className="flex flex-wrap gap-2">
        <StatusBadge status="new" />
        <StatusBadge status="contacted" />
        <StatusBadge status="qualified" />
        <StatusBadge status="proposal" />
        <StatusBadge status="closed" />
      </div>
    </div>
  );
}
