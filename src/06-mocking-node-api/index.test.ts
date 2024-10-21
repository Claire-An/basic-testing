import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const interval = 1000;

  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, interval);
    expect(spy).toBeCalledWith(callback, interval);
    spy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const interval = 1000;

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, interval);
    expect(spy).toBeCalledWith(callback, interval);
    spy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval * 5);
    expect(callback).toBeCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  const fileName = 'file.txt';

  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    await readFileAsynchronously(fileName);
    expect(spy).toBeCalled();
    spy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    expect(await readFileAsynchronously(fileName)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
