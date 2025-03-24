import React from "react";
import Loader from "./Loader";

export default function LoadingState() {
  return (
    <div className="flex h-64 w-full items-center justify-center">
      <Loader text="Loading interactions..." size="large" color="primary" />
    </div>
  );
}
