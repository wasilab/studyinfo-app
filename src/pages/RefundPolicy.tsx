import { LegalPage } from '../components/legal/LegalPage';
import { REFUND_POLICY } from '../content/legal';
import { usePageMeta } from '../lib/usePageMeta';

export function RefundPolicy() {
  usePageMeta();
  return <LegalPage doc={REFUND_POLICY} />;
}
