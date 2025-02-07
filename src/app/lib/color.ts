//from https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/

export function hsvToRgb(hue: number, sat: number, value: number) {
  const h_i = Math.floor(hue * 6);
  const f = hue * 6 - h_i;
  const p = value * (1 - sat);
  const q = value * (1 - f * sat);
  const t = value * (1 - (1 - f) * sat);

  let r, g, b;

  if (h_i === 0) {
    r = value; g = t; b = p;
  } else if (h_i === 1) {
    r = q; g = value; b = p;
  } else if (h_i === 2) {
    r = p; g = value; b = t;
  } else if (h_i === 3) {
    r = p; g = q; b = value;
  } else if (h_i === 4) {
    r = t; g = p; b = value;
  } else {
    r = value; g = p; b = q;
  }

  return `rgb(${Math.floor(r * 256)}, ${Math.floor(g * 256)}, ${Math.floor(b * 256)})`;
}

const goldenRatioConjugate = 0.618033988749895;


function getRGB() {
  let hue = Math.random(); // Random start value
  hue += goldenRatioConjugate;
  hue %= 1;
  return hsvToRgb(hue, 0.95, 0.95);
}

export function getRandomColors() {
  const colorArr = []
  for (let i = 0; i < 20; i++) {
    colorArr.push(getRGB())
  }
  return colorArr
}
