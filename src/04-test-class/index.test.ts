import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  let currentAcc: BankAccount;
  const initBalance = 100;

  beforeEach(() => {
    currentAcc = getBankAccount(initBalance);
  });

  test('should create account with initial balance', () => {
    expect(currentAcc.getBalance()).toBe(initBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => currentAcc.withdraw(currentAcc.getBalance() + 1)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const newAcc = getBankAccount(0);
    expect(() =>
      currentAcc.transfer(currentAcc.getBalance() + 1, newAcc),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => currentAcc.transfer(1, currentAcc)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const balance = currentAcc.getBalance();
    const deposit = 50;
    currentAcc.deposit(deposit);
    expect(currentAcc.getBalance()).toBe(balance + deposit);
  });

  test('should withdraw money', () => {
    const balance = currentAcc.getBalance();
    const delta = 1;
    currentAcc.withdraw(delta);
    expect(currentAcc.getBalance()).toBe(balance - delta);
  });

  test('should transfer money', () => {
    const balance = currentAcc.getBalance();
    const newAcc = getBankAccount(0);
    const delta = 1;
    currentAcc.transfer(delta, newAcc);
    expect(currentAcc.getBalance()).toBe(balance - delta);
    expect(newAcc.getBalance()).toBe(delta);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const spy = jest.spyOn(lodash, 'random');
    spy.mockReturnValueOnce(10).mockReturnValueOnce(5);
    const balance = await currentAcc.fetchBalance();
    expect(balance).toBe(10);
    expect(typeof balance).toBe('number');
    spy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const spy = jest.spyOn(lodash, 'random');
    spy.mockReturnValueOnce(10).mockReturnValueOnce(5);
    await currentAcc.synchronizeBalance();
    expect(currentAcc.getBalance()).toBe(10);
    spy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const spy = jest.spyOn(lodash, 'random');
    spy.mockImplementationOnce(() => 10).mockImplementationOnce(() => 0);
    await expect(currentAcc.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
    spy.mockRestore();
  });
});
