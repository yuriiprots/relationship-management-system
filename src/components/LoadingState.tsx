import { FC } from "react";
import Loader from "./Loader";

const LoadingState: FC = () => {
  return (
    <div className="flex h-64 w-full items-center justify-center">
      <Loader text="Loading interactions..." size="large" color="primary" />
    </div>
  );
};

export default LoadingState;
