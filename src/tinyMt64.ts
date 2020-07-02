const MASK63 = 0x7FFFFFFFFFFFFFFFn;
const MASK64 = 0xFFFFFFFFFFFFFFFFn;

function tinyMt64Next$(x: bigint[]): bigint[] {
  x[0] &= MASK63;
  var p = x[0] ^ x[1];
  p ^= p<<12n & MASK64;
  p ^= p>>32n;
  p ^= p<<32n & MASK64;
  p ^= p<<11n & MASK64;
  x[0] = x[1];
  x[1] = p;
  if(p & 1n) {
    x[0] ^= x[2];
    x[1] ^= x[3]<<32n & MASK64;
  }
  return x;
}

function tinyMt64Get(x: bigint[]): bigint {
  // var p = x[0] + x[1];
  var p = x[0] ^ x[1];
  p ^= x[0]>>8n;
  if(p & 1n) p ^= x[4];
  return p;
}

function tinyMt64(s: bigint=0n, mat1: bigint=0n, mat2: bigint=0n, tmat: bigint=0n): () => bigint {
  var x = [s ^ mat1<<32n & MASK64, mat2 ^ tmat, mat1, mat2, tmat];
  for(var i=1; i<8; i++)
    x[i&1] ^= BigInt(i) + 6364136223846793005n*(x[(i-1)&1] ^ x[(i-1)&1]>>62n);
  return () => tinyMt64Get(tinyMt64Next$(x));
}
export default tinyMt64;
