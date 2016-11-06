import * as assert from 'assert';
import { Writable } from 'stream';
import { MockWritable } from '../src';

let stdout: MockWritable;

describe('MockWritable', () => {
  beforeEach(() => {
    stdout = new MockWritable();
  });

  it('should be a class', () => {
    assert.strictEqual(typeof MockWritable, 'function');
  });

  it('should be an instance of Writable', () => {
    assert.strictEqual(stdout instanceof Writable, true);
  });

  it('should have `data` method', () => {
    assert.strictEqual(typeof stdout.data, 'function');
  });

  describe('data', () => {
    it('should return an array', () => {
      assert.strictEqual(Array.isArray(stdout.data()), true);
    });

    it('should return all data written to it', (done) => {
      stdout.write('test');
      stdout.write('data');

      const data = stdout.data();

      setTimeout(() => {
        assert.strictEqual(data.length, 2);
        assert.strictEqual(data[0], 'test');
        assert.strictEqual(data[1], 'data');
        done();
      }, 0);
    });
  });
});
