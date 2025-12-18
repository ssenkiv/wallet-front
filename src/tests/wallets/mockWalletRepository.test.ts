import { CreateWalletCommand } from '@/modules/wallets/types/createWalletCommand'
import { mockWalletRepository } from '@/modules/wallets/infra/mockWalletRepository'
import { expect, test } from 'vitest'
import { UpdateWalletCommand } from '@/modules/wallets/types/updateWalletCommand'

const {
  createWallet,
  getWalletById,
  getAllWallets,
  deleteWallet,
  updateWallet
} = mockWalletRepository


test('Create wallet test suit', async () => {
  const walletsB4 = await getAllWallets();
  const walletCreateCommand: CreateWalletCommand = {
    accountId: 10,
    currency: 'USD',
  }
  const newWallet = await createWallet(walletCreateCommand)
  const walletsAfter = await getAllWallets();

  expect(newWallet).toHaveProperty('id')
  expect(walletsAfter.length).toBeGreaterThan(walletsB4.length)
  expect(newWallet.amount).toBe(0);
  expect(newWallet.accountId).toBe(walletCreateCommand.accountId)
  expect(newWallet.currency).toBe(walletCreateCommand.currency)
  expect(walletsB4.findIndex(acc => acc.id === newWallet.id)).toBe(-1)
  expect(walletsAfter.findIndex(acc => acc.id === newWallet.id)).toBeGreaterThanOrEqual(0)
})

test("Get wallet test suit", async () => {
  const walletCreateCommand: CreateWalletCommand = {accountId: 1, currency: 'USD'}
  const wallet = await createWallet(walletCreateCommand);
  const retrievedWallet = await getWalletById(wallet.id);

  expect(retrievedWallet).toStrictEqual(wallet);
})

test("Get All wallets test suit", async () => {
  const walletCreateCommand: CreateWalletCommand = {accountId: 1, currency: 'USD'}

  const walletsB4 = await getAllWallets();
  expect(walletsB4.length).toBe(0)

  const wallet1 = await createWallet(walletCreateCommand);
  let wallets = await getAllWallets();
  expect(wallets.length).toBe(1)
  expect(wallets.find(acc => acc.id ===wallet1.id)).toStrictEqual(wallet1)

  const wallet2 = await createWallet({...walletCreateCommand, accountId: 2})
  wallets = await getAllWallets();
  expect(wallets.length).toBe(2);
  expect(wallets.find(acc => acc.id === wallet2.id)).toStrictEqual(wallet2)
})


test("Delete wallet test suit", async () => {
  const walletCreateCommand: CreateWalletCommand = {accountId: 1, currency: 'USD'}
  const wallet = await createWallet(walletCreateCommand);

  let wallets = await getAllWallets();

  expect(wallets.length).toBe(1);

  await deleteWallet(wallet.id)

  wallets = await getAllWallets();
  expect(wallets.length).toBe(0);
})

test("Update wallet test suit", async () => {
  const walletCreateCommand: CreateWalletCommand = {accountId: 1, currency: 'USD'}
  const wallet = await createWallet(walletCreateCommand);
  expect(wallet.amount).toBe(0);

  const walletUpdateCommand: UpdateWalletCommand = {walletId: wallet.id, amount: 1000};
  const updated = await updateWallet(walletUpdateCommand);
  expect(updated.id).toBe(wallet.id);
  expect(updated.amount).toBe(1000)
  expect(updated.currency).toBe(wallet.currency)

  const finalCheckWallet = await getWalletById(wallet.id);
  expect(finalCheckWallet.id).toBe(wallet.id);
  expect(finalCheckWallet.amount).toBe(1000)
  expect(finalCheckWallet.currency).toBe(wallet.currency)
})
