declare module 'react-scroll' {
  import * as React from 'react';

  export interface ElementProps {
    name?: string;
    id?: string;
    className?: string;
    children?: React.ReactNode;
  }

  export class Element extends React.Component<ElementProps> {}

  export interface ScrollOptions {
    duration?: number;
    delay?: number;
    smooth?: boolean | string;
    offset?: number;
    containerId?: string;
    ignoreCancelEvents?: boolean;
  }

  export const scroller: {
    scrollTo(target: string, options?: ScrollOptions): void;
    scrollToTop(options?: ScrollOptions): void;
    scrollToBottom(options?: ScrollOptions): void;
    scrollMore(position: number, options?: ScrollOptions): void;
  };

  export function scrollSpy(): {
    update(): void;
  };

  export function animateScroll(): {
    scrollToTop(options?: unknown): void;
    scrollTo(position: number, options?: unknown): void;
    scrollMore(position: number, options?: unknown): void;
  };
}
