import { contactLink } from '../../content/site';
import { Button } from './Button';
import { Container } from './Container';
import { Icon } from './Icon';

export function CtaSection({ title = 'Start working with StudyInfo.', text = 'Agencies join free. Universities partner on custom terms.' }: { title?: string; text?: string }) {
  return (
    <section className="border-t border-line bg-subtle py-20 md:py-28">
      <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-2xl flex-col gap-4">
          <h2 className="text-[2.2rem] leading-[1.05] font-medium tracking-[-0.035em] sm:text-5xl">{title}</h2>
          <p className="text-[17px] text-ink-2">{text}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button to={contactLink('agency')}>Become a partner</Button>
          <Button to={contactLink('files')} variant="secondary">
            Submit student files <Icon name="arrow" size={15} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
