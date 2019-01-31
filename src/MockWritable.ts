import * as stream from 'stream';

export class MockWritable extends stream.Writable {
  private _data: Array<any> = [];

  constructor (options?: stream.WritableOptions) {
    super(options);
  }

  public _write (data: Buffer | string, encoding: string, callback: Function) {
    this.emit('data', Buffer.isBuffer(data) ? data.toString('utf8' || encoding) : data);
    callback();
  }

  public end (): void {
    this.emit('end');
    super.end();
  }

  public write(data: any): boolean {
    this._data.push(data);
    return super.write(data);
  };

  public data (): Array<any> {
    return this._data.slice(0);
  }
}
