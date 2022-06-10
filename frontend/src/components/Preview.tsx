import { Marp } from '@marp-team/marp-core';
import parse from 'html-react-parser';

const marp = new Marp({
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

interface Props {
  source: string;
}

const Preview = ({ source }: Props) => {
  const compose = (source: string): string => {
    const { html, css } = marp.render(source);
    return `
      <html>
        <head>
          <style>
            ${css}
            .marpit>svg {
              margin: 30px;
              box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
            }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;
  };
  return <div className="">{parse(compose(source))}</div>;
};

export default Preview;
