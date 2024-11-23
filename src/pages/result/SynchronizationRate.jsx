const Syncronization = ({ heartRate1, heartRate2 }) => {
  function calculateCorrelation(arr1, arr2) {
    console.log("heartRate1の要素数: ", heartRate1.length);
    console.log("heartRate2の要素数: ", heartRate2.length);
    if (arr1.length !== arr2.length) {
      throw new Error("Arrays must be of the same length.");
    }

    const mean = (arr) => arr.reduce((sum, val) => sum + val, 0) / arr.length;

    const mean1 = mean(arr1);
    const mean2 = mean(arr2);

    const numerator = arr1.reduce((sum, val, index) => {
      return sum + (val - mean1) * (arr2[index] - mean2);
    }, 0);

    const denominator = Math.sqrt(
      arr1.reduce((sum, val) => sum + Math.pow(val - mean1, 2), 0) *
        arr2.reduce((sum, val) => sum + Math.pow(val - mean2, 2), 0)
    );

    return numerator / denominator;
  }

  const correlation = calculateCorrelation(heartRate1, heartRate2);

  return (
    <div>
      <h1>シンクロ率: {(correlation * 100).toFixed(2)}%</h1>
    </div>
  );
};

export default Syncronization;
