const MASK32 = 0xFFFFFFFF;

function XorshiftAdd32Next$(x: number[]): number[] {
  var p = x[0];
  p ^= p<<15 & MASK32;
  p ^= p>>>18;
  p ^= x[3]<<11 & MASK32;
  x[0] = x[1];
  x[1] = x[2];
  x[2] = x[3];
  x[3] = p;
  return x;
}

function XorshiftAdd32Get(x: number[]): number {
  return x[3] + x[2];
}

function XorshiftAdd32(s: number=0): () => number {
  var x = [s, 0, 0, 0];
  for(var i=1; i<8; i++)
    x[i&3] ^= i + 1812433253*(x[(i-1)&3] ^ x[(i-1)&3]>>>30);
  for(var i=0; i<8; i++)
    XorshiftAdd32Next$(x);
  return () => XorshiftAdd32Get(XorshiftAdd32Next$(x));
}
export default XorshiftAdd32;
