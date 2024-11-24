export const Syncronization = ({ heartRate1, heartRate2 }) => {
  console.log("heartRate1の要素数: ", heartRate1);
  console.log("heartRate2の要素数: ", heartRate2);

  const adjustArraysToShortest = (array1, array2) => {
    console.log("heartRate1の要素数: ", array1.length);
    console.log("heartRate2の要素数: ", array2.length);
    const minLength = Math.min(array1.length, array2.length);
    return [array1.slice(0, minLength), array2.slice(0, minLength)];
  };

  // 配列を短い方に揃える
  const [hr1, hr2] = adjustArraysToShortest(heartRate1, heartRate2);
  console.log(hr1);
  console.log(hr1.length);

  if (hr1.length !== hr2.length) {
    throw new Error("Arrays must be of the same length.");
  }

  const mean = (arr) => arr.reduce((sum, val) => sum + val, 0) / arr.length;

  const mean1 = mean(hr1);
  const mean2 = mean(hr2);

  const numerator = hr1.reduce((sum, val, index) => {
    return sum + (val - mean1) * (hr2[index] - mean2);
  }, 0);

  const denominator = Math.sqrt(
    hr1.reduce((sum, val) => sum + Math.pow(val - mean1, 2), 0) *
      hr2.reduce((sum, val) => sum + Math.pow(val - mean2, 2), 0)
  );

  console.log("パーセント", Math.trunc((numerator / denominator) * 100));

  return Math.trunc((numerator / denominator) * 100);
};

export default Syncronization;
