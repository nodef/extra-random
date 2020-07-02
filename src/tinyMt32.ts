const MASK = 0x7FFFFFFF;

function tinyMt32Next$(x: number[]): number[] {
  var q = x[3];
  var p = (x[0] & MASK) ^ x[1] ^ x[2];
  p ^= p<<1;
  q ^= q>>>1 ^ p;
  x[0] = x[1];
  x[1] = x[2];
  x[2] = p ^ q<<10;
  x[3] = q;
  var a = -(q&1) & x[4];
  var b = -(q&1) & x[5];
  x[1] ^= a;
  x[2] ^= b;
  return x;
}

function tinyMt32Get(x: number[]): number {
  // var b = s[0] + s[2]>>8;
  var b = x[0] ^ x[2]>>8;
  var a = x[3] ^ b;
  if(b & 1) a ^= x[6];
  return a;
}

function tinyMt32(s: number=0, mat1: number=0, mat2: number=0, tmat: number=0): () => number {
  var x = [s, mat1, mat2, tmat, mat1, mat2, tmat];
  for(var i=1; i<8; i++)
    x[i&3] ^= i + 1812433253*(s[(i-1)&3] ^ s[(i-1)&3]>>30);
  for(var i=0; i<8; i++)
    tinyMt32Next$(x);
  return () => tinyMt32Get(tinyMt32Next$(x));
}
export default tinyMt32;
