import type { ReactNode } from 'react';
import type { Block } from '../../content/blocks';
import { Container } from './Container';
import { FeatureGrid, SpotlightPanel } from './Panels';
import { SectionHeader } from './Section';

/** Section header, a large spotlight panel, then a grid of smaller features. */
export function FeatureBlock({
  block,
  panel,
  visuals = [],
  label,
  inner,
}: {
  block: Block;
  panel: ReactNode;
  visuals?: ReactNode[];
  label?: ReactNode;
  inner?: string;
}) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader title={block.title} text={block.text} link={block.link} label={label} />
        <div className="mt-12 md:mt-16">
          <SpotlightPanel title={block.panel.title} text={block.panel.text} inner={inner}>
            {panel}
          </SpotlightPanel>
          {block.features.length > 0 && <FeatureGrid items={block.features.map((f, i) => ({ ...f, visual: visuals[i] }))} />}
        </div>
      </Container>
    </section>
  );
}
