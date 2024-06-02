export default () => ({
  port: Number(process.env.PORT || 3000),
  algorithm: process.env.ENCRYPT_ALGORITHM,
});
