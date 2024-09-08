function hexToRgb(hex: any, id = '') {
  let arr = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
    , (m: any, r: any, g: any, b: any) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map((x: any) => parseInt(x, 16));

  let keys = [
    'r' + id,
    'g' + id,
    'b' + id
  ];

  let output: Record<any, any> = {};

  keys.forEach((key, num) => {
    output[key] = arr[num]/255
  });

  return output;
}

function wrapper(fn: any) {

  return function shadesModel(input: any) {
    return fn(hexToRgb(input));
  };
}

export default wrapper;
