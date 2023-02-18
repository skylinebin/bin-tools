import { diffChars } from 'diff';
export const diffStrings = (before: string, after: string) => {
    const diff = diffChars(before, after)
    return {
        ...diff,
    };
  };