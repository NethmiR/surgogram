import ClipLoader from "react-spinners/ClipLoader";

interface LoadingSpinnerProps {
  isTransitioning: boolean;
}

const LoadingSpinner = ({ isTransitioning }: LoadingSpinnerProps) => {
  return (
    isTransitioning && (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 bg-opacity-30 backdrop-blur-lg">
        <ClipLoader size={60} color="#3B82F6" loading={true} />
      </div>
    )
  );
};

export default LoadingSpinner;
