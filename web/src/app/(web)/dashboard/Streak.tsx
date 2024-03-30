import { IconFlame } from "@tabler/icons-react";

const Streak = () => {
  return (
    <div className="flex flex-shrink-0 flex-col items-center justify-center gap-1 overflow-x-hidden rounded-lg border-2 bg-white p-4">
      <div className="flex items-center">
        <IconFlame size={30} className="text-orange-600" />
        <p className="flex-shrink font-black text-lg uppercase text-zinc-600">
          Streak
        </p>
      </div>
      <p className="text-6xl font-semibold text-zinc-800">40</p>
      <p className="flex-shrink text-sm font-semibold text-zinc-500">
        Days Active
      </p>
      <p className="flex-shrink text-xs font-semibold text-zinc-500">
        (in a row)
      </p>
      {/* <p className="text-sm font-semibold text-zinc-500">streak</p> */}
    </div>
  );
};

export default Streak;
