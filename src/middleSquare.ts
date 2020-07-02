/**
 * Lists n-bit psuedorandom numbers.
 * @param s seed value
 * @param n size in bits
 */
function middleSquare(s: bigint, n: bigint): () => bigint {
  var b = n>>1n, f = 1n<<n-1n;
  return () => s = ((s*s) >> b) & f;
}
export default middleSquare;
