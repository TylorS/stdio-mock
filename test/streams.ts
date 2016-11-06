import * as assert from 'assert';
import { stdio } from '../src';


describe('streams', () => {
  it('should be pipe()able', (done) => {
    const { stdin, stdout } = stdio();

    stdin.pipe(stdout);

    stdout.on('data', (data: string) => {
      assert.strictEqual(data, 'test');
    });

    stdout.on('end', () => {
      done();
    });

    stdin.write('test').end();
  });
});
