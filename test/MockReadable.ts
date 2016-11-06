import * as assert from 'assert';
import { Readable } from 'stream';
import { MockReadable } from '../src';

let stdin: MockReadable;

describe('MockReadable', () => {
  beforeEach(() => {
    stdin = new MockReadable();
  });

  afterEach(() => {
    stdin.end();
  });

  it('should be a instanceof Readable', () => {
    assert.strictEqual(stdin instanceof Readable, true);
  });

  it('should have a `data` method', () => {
    assert.strictEqual(typeof stdin.data, 'function');
  });

  describe('data', () => {
    it('should return an array', () => {
      assert(Array.isArray(stdin.data()));
    });
  });

  it('should have a `write` method', () => {
    assert.strictEqual(typeof stdin.write, 'function');
  });

  describe('when written to', () => {
    it('should be readable', (done) => {
      stdin.on('data', (data: string) => {
        assert.strictEqual(data, 'test');
        done();
      });

      stdin.write('test').end();
    });

    it('should append output to data', () => {
      stdin.write('test', 'data');
      const data = stdin.data();

      assert.strictEqual(data.length, 2);
      assert.strictEqual(data[0], 'test');
      assert.strictEqual(data[1], 'data');
    });
  });
});
