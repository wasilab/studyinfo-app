import { LegalPage } from '../components/legal/LegalPage';
import { PRIVACY_POLICY } from '../content/legal';
import { usePageMeta } from '../lib/usePageMeta';

export function PrivacyPolicy() {
  usePageMeta();
  return <LegalPage doc={PRIVACY_POLICY} />;
}
