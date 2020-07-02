function middleSquareWeylSequence(x: bigint=0n, w: bigint=0n, s: bigint=0xb5ad4eceda1ce2a9n): () => bigint {
  return () => {
    x *= x;
    x += (w += s);
    return x = (x>>32n) | (x<<32n);
  };
}
export default middleSquareWeylSequence;
