import { ArrowPathIcon } from "@heroicons/react/24/solid";

const Loading = () => {
  return (
    <div className="h-full flex justify-center items-center p-10">
      <ArrowPathIcon className="h-1/3 animate-spin" />
    </div>
  );
};

export default Loading;
