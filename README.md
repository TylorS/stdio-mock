# Standard I/O Mock

A basic implementation of Readable and Writable streams to mock 
`process.stdout`, `process.stderr`, `process.stdin`, or any readable and 
writable streams.

## Get it

```sh
npm install --save stdio-mock
```

## TypeScript 

This project is proudly written in TypeScript so you can enjoy using beautiful 
typings! :smile: 

## Basic Usage 

**for standard i/o**
```typescript
import { stdio } from 'stdio-mock';

const { stdout, stdin } = stdio();

stdin.pipe(stdout);

stdout.on('data', data => {
  // do stuff
})

stdin.write('test data');
stdin.end();
```

**for more general purpose use cases**
```typescript
import { MockReadable, MockWriteable } from 'stdio-mock';

const stdin = new MockReadable();
const stdout = new MockWriteable();
```

## API

#### `stdio(): StdIO` 

This is the main function exposed by the library as a convenience to mock your 
standard input and output streams.

```typescript
type StdIO = {
  stdin: MockReadable,
  stdout: MockWriteable,
  stderr: MockWriteable,
} 
```
```typescript
import { stdio } from 'stdio-mock';

const { stdout, stdin } = stdio();

stdin.pipe(stdout);

stdout.on('data', data => {
  // do stuff
})

stdin.write('test data');
stdin.end();
```

#### `MockReadable :: stream.Readable`

This is an implementation of Node.js' `stream.Readable` with additional methods 
for use in testing.

**MockReadable.write(...data: Array<any>): MockWriteable**

Pushes data into the Readable stream. This will throw and error if the stream 
has ended.

```typescript
import { MockReadable } from 'stdio-mock';

const readable = new MockReadable();

readable.on('data', (data: string) => {
  assert.stictEqual(data, 'test');
});

readable.write('test');
```

**MockReadable.data(): Array<any>**

Returns an array containing all data that has been passed into the stream.

```typescript
import { MockReadable } from 'stdio-mock';

const readable = new MockReadable();

readable.write('test');

const data = readable.data();

assert.strictEqual(data[0], 'test');
```

**MockReadable.end(): void**

Ends the stream asynchronously.

```
import { MockReadable } from 'stdio-mock';

const readable = new MockReadable();

readable.write('test');
readable.end();
```

#### MockWriteable :: stream.Writable 

This is an implementation of Node.js' `stream.Writable` with an additional method 
to query all the data that has been pushed to it.

**MockWriteable.data(): Array<any>**

Returns an array containing all data that has been passed into the stream.

```typescript
import { MockWritable } from 'stdio-mock';

const writable = new MockWritable();

writable.write('test');

const data = writable.data();

assert.strictEqual(data[0], 'test');
```
