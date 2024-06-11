export default () => ({
  port: Number(process.env.PORT || 3000),
  hashAlgorithm: process.env.HASH_ALGORITHM,
  encryptAlgorithm: process.env.ENCRYPTION_ALGORITHM,
});
