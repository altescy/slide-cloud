import React from 'react';
import { Box, type BoxProps } from '@chakra-ui/react';
import { Marpit } from '@marp-team/marpit';

import { useResizeObserver } from '@/hooks';

const DEFAULT_THEME = `
/* @theme default */

section {
  width: 1280px;
  height: 960px;
  font-size: 40px;
  padding: 40px;
}

h1 {
  font-size: 60px;
  color: #09c;
}

h2 {
  font-size: 50px;
}
`

const useMarpit = () => {
  const marpit = React.useMemo(() => new Marpit(), []);
  return marpit;
}

interface MarpProps extends BoxProps {
  markdown: string;
  theme?: string;
  currentPage?: number;
}

const Marp = ({ markdown, theme, currentPage, ...props }: MarpProps) => {
  theme = theme ?? DEFAULT_THEME;

  const ref = React.useRef<HTMLDivElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const containerSize = useResizeObserver(ref);

  const marpit = useMarpit();

  React.useEffect(() => {
    if (theme) marpit.themeSet.default = marpit.themeSet.add(theme);
  }, [marpit, theme]);

  const content = React.useMemo(() => {
    const { html, css } = marpit.render(markdown)
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            html, body {
              margin: 0;
              padding: 0;
            }
            ${css}
          </style>
        </head>
        <body>
           ${html}
        </body>
      </html>
    `
  }, [marpit, markdown, containerSize, currentPage]);

  React.useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentDocument) {
      iframeRef.current.contentDocument.body.innerHTML = content;
    }
    if (currentPage) {
      iframeRef.current?.contentDocument?.getElementById(currentPage.toString())?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [content]);

  React.useEffect(() => {
    if (currentPage) {
      iframeRef.current?.contentDocument?.getElementById(currentPage.toString())?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [currentPage]);

	return (
    <Box ref={ref} {...props}>
      <iframe
        ref={iframeRef}
        srcDoc={content}
        style={{
          width: `${1280 /containerSize.width * 100}%`,
          height: `${containerSize.height * 1280 / containerSize.width}px`,
          border: 'none',
          overflow: 'hidden',
          transform: `scale(${containerSize.width / 1280})`,
          transformOrigin: 'top left',
        }}
        title="Marp"
      />
    </Box>
  );
}

export default Marp
