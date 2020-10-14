// https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)
// Version 4.0
export function pSBC(p: any, c0: any, c1?: any, l?: any) {
  let r,
    g,
    b,
    P,
    f,
    t,
    h,
    a: any = typeof c1 === 'string';
  const i = parseInt,
    m = Math.round;
  if (
    typeof p !== 'number' ||
    p < -1 ||
    p > 1 ||
    typeof c0 !== 'string' ||
    (c0[0] !== 'r' && c0[0] !== '#') ||
    (c1 && !a)
  ) {
    return null;
  }
  const pSBCr = d => {
    let n = d.length;
    const x: any = {};
    if (n > 9) {
      ([r, g, b, a] = d = d.split(',')), (n = d.length);
      if (n < 3 || n > 4) {
        return null;
      }
      (x.r = i(r[3] === 'a' ? r.slice(5) : r.slice(4))), (x.g = i(g)), (x.b = i(b)), (x.a = a ? parseFloat(a) : -1);
    } else {
      if (n === 8 || n === 6 || n < 4) {
        return null;
      }
      if (n < 6) {
        d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '');
      }
      d = i(d.slice(1), 16);
      if (n === 9 || n === 5) {
        (x.r = (d >> 24) & 255), (x.g = (d >> 16) & 255), (x.b = (d >> 8) & 255), (x.a = m((d & 255) / 0.255) / 1000);
      } else {
        (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
      }
    }
    return x;
  };
  (h = c0.length > 9),
    (h = a ? (c1.length > 9 ? true : c1 === 'c' ? !h : false) : h),
    (f = pSBCr(c0)),
    (P = p < 0),
    (t = c1 && c1 !== 'c' ? pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }),
    (p = P ? p * -1 : p),
    (P = 1 - p);
  if (!f || !t) {
    return null;
  }
  if (l) {
    (r = m(P * f.r + p * t.r)), (g = m(P * f.g + p * t.g)), (b = m(P * f.b + p * t.b));
  } else {
    (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)),
      (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)),
      (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
  }
  (a = f.a), (t = t.a), (f = a >= 0 || t >= 0), (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
  if (h) {
    return 'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')';
  } else {
    return (
      '#' +
      (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
    );
  }
}

export function abs(num: number, percent: number | string): number {
  if (+percent) {
    return +percent;
  }

  if (!percent || percent[(percent as string).length - 1] !== '%') {
    return 0;
  }

  percent = (percent as string).substr(0, (percent as string).length - 1);

  return (num * +percent) / 100;
}

export function isDecimal(num: number): boolean{
  return String(num).indexOf('.')>-1
}

export function getFactor(num: number|string): number{
  let factor = 1
  if (isDecimal(Number(num))) {
    num = String(num)
    const dec1 = num.split('.')[1]
    factor = Math.pow(10, dec1.length)
  }
  return factor
}
export function getFactorInNums(num1: number, num2: number): number{
  let factor1 = getFactor(num1)
  let factor2 = getFactor(num2)
  if(factor1>factor2) return factor1
  return factor2
}

export function multiply(num1: number, num2: number): number{
  num1 = Number(num1)
  num2 = Number(num2)
  let m1 = getFactor(num1)
  let m2 = getFactor(num2)
  num1 *= m1
  num2 *= m2
  console.log(num1, num2, num1*num2/m1/m2)
  return num1*num2/m1/m2
}