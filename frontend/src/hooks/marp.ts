import { Marp, MarpOptions } from '@marp-team/marp-core';
import { useMemo } from 'react';

export default function useMarp(
  options: MarpOptions = {},
): Marp {
  return useMemo(() => new Marp(options), [options]);
}
