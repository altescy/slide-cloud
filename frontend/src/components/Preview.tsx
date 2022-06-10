import parse, { Element } from 'html-react-parser';

import useMarp from '@/hooks/marp';

const parser = (input: string) => parse(input, {
  replace: domNode => {
    if (domNode instanceof Element && domNode.attribs.class === 'remove') {
      return <></>;
    }
  }
});

interface Props {
  source: string;
}

const Preview = ({ source }: Props) => {
  const marp = useMarp({
    html: true,
    emoji: {
      unicode: true,
      twemoji: {
        base: '/resources/twemoji/',
      },
    },
    math: 'katex',
    markdown: {
      breaks: false,
    },
    inlineSVG: true,
  });
  const compose = (source: string): string => {
    const { html, css } = marp.render(source);
    return `
      <style>
        ${css}
        .marpit>svg {
          margin: 30px;
          box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
        }
      </style>
      <body>
        ${html}
      </body>
    `;
  };
  return <div>{parser(compose(source))}</div>;
};

export default Preview;
