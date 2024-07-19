import { expect, test } from 'vitest'
import Email from '../Email'

test('should not be able to create a new email if the email was not provided', () => {
  expect(() => new Email(undefined as any)).toThrow(
    'Endereço de e-mail invalido',
  )
})

test('should be able create new email', () => {
  expect(new Email('wtfdenome@mail.com.br')).toBeInstanceOf(Email)
})

test('should be able to get email value', () => {
  const email = new Email('wtfdenome@mail.com.br')
  expect(email.getValue()).toStrictEqual('wtfdenome@mail.com.br')
})
