/**
 * Lists n-bit psuedorandom numbers.
 * @param s seed value
 * @param n size in bits
 */
function middleSquare32(s: number, n: number): () => number {
  var b = n>>1, f = 1<<n-1;
  return () => s = ((s*s) >> b) & f;
}
export default middleSquare32;
