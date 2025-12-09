interface ProgressBarProps {
  label: string;
  value: number;
  maxValue: number;
}

const ProgressBar = ({ label, value, maxValue }: ProgressBarProps) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-[#0e6d62]">
          {value}회
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-[#0e6d62] h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

