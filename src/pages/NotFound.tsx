import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { Label } from '../components/ui/Section';
import { usePageMeta } from '../lib/usePageMeta';
import { WordReveal } from '../components/ui/WordReveal';

export function NotFound() {
  usePageMeta('Page not found', 'This page does not exist.');

  return (
    <section className="py-28 md:py-40">
      <Container className="flex flex-col items-start gap-5">
        <Label>404</Label>
        <h1 className="text-[2.6rem] leading-[1.05] font-medium tracking-[-0.04em] md:text-6xl">
          <WordReveal text="This page doesn’t exist" />
        </h1>
        <p className="max-w-md text-lg text-ink-2">The link may be out of date, or the address may have a typo.</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Button to="/">Go to the home page</Button>
          <Button to="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
