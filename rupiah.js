export const rupiah = _price => {
  const addDots = nStr => {
    nStr += '';
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? '.' + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }

    if (x1 == 0) x1 = '';
    return x1 + x2;
  };

  return `${addDots(Math.round(_price)).toString()}`;
};
