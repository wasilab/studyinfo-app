/** A Linear-style feature block: header, a large panel, then a grid of smaller features. */
export interface Block {
  title: string;
  text: string;
  link?: { to: string; label: string };
  panel: { title: string; text: string };
  features: { title: string; text: string }[];
}
