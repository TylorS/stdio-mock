import * as stream from 'stream';

const defaults =
  {
    encoding: 'utf8',
  };

export class MockReadable extends stream.Readable {
  private _data: Array<any> = [];
  private _immutableData: Array<any> = [];

  constructor (options?: stream.ReadableOptions) {
    super(Object.assign({}, defaults, options));
  }

  protected _read (size?: number): void {
    const data = this._data;

    if (size === void 0) {
      size = data.length;
    }

    let count = 0;

    while (this.readable && data.length && count < size) {
      const item = data.shift();

      if (!this.push(item, 'utf8')) {
        this.readable = false;
      }

      ++count;
    }
  }

  public write (...data: any[]): MockReadable {
    if (!this.readable) {
      throw new Error('This stream has already finished');
    }

    this._data.push(...data);
    this._immutableData.push(...data);

    this._read();

    return this;
  }

  public data (): Array<any> {
    return this._immutableData.slice(0);
  }

  public end (...args: any[]): void {
    this.readable = false;

    process.nextTick(() => {
      this.emit('end', ...args);
    });
  }
}
