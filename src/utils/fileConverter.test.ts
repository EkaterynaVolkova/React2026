import { describe, expect, it } from 'vitest';
import { convertFileToBase64 } from './fileConverter';

describe('convertFileToBase64 utility', () => {
  it('Successfully converts a File into a string', async () => {
    const fileContent = 'hello world';
    const mockFile = new File([fileContent], 'test.txt', {
      type: 'text/plain',
    });
    const result = await convertFileToBase64(mockFile);
    expect(result).toContain('data:text/plain;base64,');
  });
});
