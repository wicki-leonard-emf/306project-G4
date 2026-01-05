import { customAlphabet } from 'nanoid'

// Alphabet: lettres minuscules + majuscules + chiffres (62 caractères)
// Évite les caractères ambigus: 0/O, 1/l/I
const alphabet = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 6)

export function generateId() {
  return nanoid()
}
