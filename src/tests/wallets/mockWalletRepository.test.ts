import { CreateWalletRequest } from '@/modules/wallets/types/createWalletRequest'
import { mockWalletRepository } from '@/modules/wallets/infra/mockWalletRepository'
import { expect, test } from 'vitest'

const {
  createWallet,
  getWalletById,
  getAllWallets,
  deleteWallet,
} = mockWalletRepository


test('Create account test suit', async () => {
  const walletsB4 = await getAllWallets();
  const walletCreateRequest: CreateWalletRequest = {
    accountId: 10,
    currency: 'USD',
  }
  const newWallet = await createWallet(walletCreateRequest)
  const walletsAfter = await getAllWallets();

  expect(newWallet).toHaveProperty('id')
  expect(walletsAfter.length).toBeGreaterThan(walletsB4.length)
  expect(newWallet.amount).toBe(0);
  expect(newWallet.accountId).toBe(walletCreateRequest.accountId)
  expect(newWallet.currency).toBe(walletCreateRequest.currency)
  expect(walletsB4.findIndex(acc => acc.id === newWallet.id)).toBe(-1)
  expect(walletsAfter.findIndex(acc => acc.id === newWallet.id)).toBeGreaterThanOrEqual(0)
})

test("Get Account test suit", async () => {
  const walletCreateRequest: CreateWalletRequest = {accountId: 1, currency: 'USD'}
  const wallet = await createWallet(walletCreateRequest);
  const retrievedWallet = await getWalletById(wallet.id);

  expect(retrievedWallet).toStrictEqual(wallet);
})

test("Get All Accounts test suit", async () => {
  const walletCreateRequest: CreateWalletRequest = {accountId: 1, currency: 'USD'}

  const walletsB4 = await getAllWallets();
  expect(walletsB4.length).toBe(0)

  const wallet1 = await createWallet(walletCreateRequest);
  let wallets = await getAllWallets();
  expect(wallets.length).toBe(1)
  expect(wallets.find(acc => acc.id ===wallet1.id)).toStrictEqual(wallet1)

  const wallet2 = await createWallet({...walletCreateRequest, accountId: 2})
  wallets = await getAllWallets();
  expect(wallets.length).toBe(2);
  expect(wallets.find(acc => acc.id === wallet2.id)).toStrictEqual(wallet2)
})


test("Delete Account test suit", async () => {
  const walletCreateRequest: CreateWalletRequest = {accountId: 1, currency: 'USD'}
  const wallet = await createWallet(walletCreateRequest);

  let wallets = await getAllWallets();

  expect(wallets.length).toBe(1);

  await deleteWallet(wallet.id)

  wallets = await getAllWallets();
  expect(wallets.length).toBe(0);
})