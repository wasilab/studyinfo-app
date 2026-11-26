import { LegalPage } from '../components/legal/LegalPage';
import { TERMS_OF_SERVICE } from '../content/legal';
import { usePageMeta } from '../lib/usePageMeta';

export function TermsOfService() {
  usePageMeta();
  return <LegalPage doc={TERMS_OF_SERVICE} />;
}
