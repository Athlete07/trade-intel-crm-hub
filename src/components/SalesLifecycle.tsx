
import { InternationalSalesLifecycle } from "./InternationalSalesLifecycle";

interface SalesLifecycleProps {
  onBack: () => void;
  onCompleted?: (dealId: string) => void;
  dealId?: string;
}

export function SalesLifecycle(props: SalesLifecycleProps) {
  return <InternationalSalesLifecycle {...props} />;
}
