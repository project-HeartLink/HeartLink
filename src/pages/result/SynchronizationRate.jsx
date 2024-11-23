export const Syncronization = ({ heartRate1, heartRate2 }) => {
  console.log("heartRate1の要素数: ", heartRate1);
  console.log("heartRate2の要素数: ", heartRate2);

  if (heartRate1.length !== heartRate2.length) {
    throw new Error("Arrays must be of the same length.");
  }
  

  const mean = (arr) => arr.reduce((sum, val) => sum + val, 0) / arr.length;

  const mean1 = mean(heartRate1);
  const mean2 = mean(heartRate2);

  const numerator = heartRate1.reduce((sum, val, index) => {
    return sum + (val - mean1) * (heartRate2[index] - mean2);
  }, 0);

  const denominator = Math.sqrt(
    heartRate1.reduce((sum, val) => sum + Math.pow(val - mean1, 2), 0) *
      heartRate2.reduce((sum, val) => sum + Math.pow(val - mean2, 2), 0)
  );

  console.log("パーセント",Math.trunc((numerator / denominator) * 100))

  return Math.trunc((numerator / denominator) * 100);
};

export default Syncronization;
