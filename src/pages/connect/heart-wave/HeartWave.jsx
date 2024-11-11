import "../heart-wave/HeartWave.scss";
import PropTypes from 'prop-types';

function HeartWave({ fillLevel }) {
  return (
    <div
      className={`loading wave ${
        fillLevel === 0
          ? "step-0"
          : fillLevel === 1
          ? "step-1"
          : "step-2"
      }`}
    >
      ❤️
    </div>
  );
}

HeartWave.propTypes = {
    fillLevel: PropTypes.number.isRequired,  // fillLevel の型を数値に指定
  };

export default HeartWave;
