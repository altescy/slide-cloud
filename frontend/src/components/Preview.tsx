import React from 'react';
import { Box, type BoxProps } from '@chakra-ui/react';
import Marp from '@/components/Marp';

interface PreviewProps extends BoxProps {
  markdown: string;
  currentPage?: number;
}


const Preview = ({ markdown, currentPage, ...props }: PreviewProps) => {
  return (
    <Box {...props}>
      <Marp w="full" h="full" markdown={markdown} currentPage={currentPage} />
    </Box>
  );
}

export default Preview;
