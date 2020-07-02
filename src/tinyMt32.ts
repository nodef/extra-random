const MEXP = 127;
const SH0 = 1;
const SH1 = 10;
const SH8 = 8;
const MASK = 0x7FFFFFFF;
const MUL = 1/16777216;

function next(s: number[]) {
  var y = s[3];
  var x = (s[0] & MASK) ^ s[1] ^ s[2];
  x ^= x<<SH0;
  y ^= y>>SH0 ^ x;
  s[0] = s[1];
  s[1] = s[2];
  s[2] = x ^ y<<SH1;
  s[3] = y;
  var a = -(y&1) & s[4];
  var b = -(y&1) & s[5];
  s[1] ^= a;
  s[2] ^= b;
}
