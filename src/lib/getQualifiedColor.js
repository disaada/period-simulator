/* eslint-disable array-callback-return */
const getQualifiedColor = (attributes) => {
  let selectedColor = [];
  let unSelectedColor = [];
  let totalSelectedDay = 0;
  let colorQueue = 0;
  let currentDate = attributes[0]?.date.toDate();
  const color = ["hitam", "merah", "kuning kemerahan", "kuning", "keruh"];

  color.map((val, idx) => {
    const selection = attributes
      ?.filter((v) => v.color === val)
      .sort((a, b) => a.code - b.code);
    const length = selection.length;

    if (length > 0 && length <= 15 && totalSelectedDay + length <= 15 && colorQueue === idx) {
      if (
        val === "hitam" ||
        (val !== "hitam" && currentDate < selection[0]?.date.toDate())
      ) {
        selectedColor = selectedColor.concat(selection);
        totalSelectedDay += length;
        currentDate = selection[0]?.date.toDate();
        colorQueue += 1
      } else unSelectedColor.push(selection)
    } else if (selection.length > 0) {
      unSelectedColor.push(selection);
    }
  });

  return [
    selectedColor.sort((a, b) => a.code - b.code),
    unSelectedColor,
  ];
};

export default getQualifiedColor;
