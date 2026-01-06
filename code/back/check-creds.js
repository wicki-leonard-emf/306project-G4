import bcrypt from 'bcryptjs';

const adminHash = '$2b$10$af4WDAu5ZXjEbcTWmpUqTuJG82hka5sOUf5F0M7ldPNlmcPIMDuPG';
const eleveHash = '$2b$10$5BZvK/Gs8qRx3.R8qFkvZuY6L8AbB1Ao04anB8W5XNrs8fYwmjWxW';

// Common passwords to test
const passwordsToTry = [
  'admin123',
  'password123',
  'test123',
  'admin',
  'password',
  '123456',
  'eleve123',
];

console.log('Trying to match admin password...');
for (const pwd of passwordsToTry) {
  const match = await bcrypt.compare(pwd, adminHash);
  if (match) {
    console.log('✓ ADMIN PASSWORD FOUND:', pwd);
    break;
  }
}

console.log('\nTrying to match eleve password...');
for (const pwd of passwordsToTry) {
  const match = await bcrypt.compare(pwd, eleveHash);
  if (match) {
    console.log('✓ ELEVE PASSWORD FOUND:', pwd);
    break;
  }
}
