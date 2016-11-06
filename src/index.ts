import * as stream from 'stream';

import { MockReadable } from './MockReadable';
export { MockReadable };

import { MockWritable } from './MockWritable';
export { MockWritable };

export interface StdioOptions
{
  stdin?: stream.ReadableOptions;
  stdout?: stream.WritableOptions;
  stderr?: stream.WritableOptions;
}

// for developer convenience
/**
 * Creates a standard input/output object 
 * { stdin: MockReadable, stderr: MockWritable, stdout: MockWritable }
 * 
 * @export
 * @param {StdioOptions} [options]
 * @returns { stdin: MockReadable, stderr: MockWritable, stdout: MockWritable }
 */
export function stdio (options?: StdioOptions) {
  const stdioOptions = options || {};
  const stdin = new MockReadable(stdioOptions.stdin);
  const stdout = new MockWritable(stdioOptions.stdout);
  const stderr = new MockWritable(stdioOptions.stderr);

  return { stdin, stdout, stderr };
}
