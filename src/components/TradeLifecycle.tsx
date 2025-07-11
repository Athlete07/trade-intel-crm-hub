
import { InternationalTradeLifecycle } from "./InternationalTradeLifecycle";

interface TradeLifecycleProps {
  onBack: () => void;
  dealId?: string;
}

export function TradeLifecycle(props: TradeLifecycleProps) {
  return <InternationalTradeLifecycle {...props} />;
}
