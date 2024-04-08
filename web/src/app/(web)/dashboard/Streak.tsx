import { IconFlame } from "@tabler/icons-react";
import dayjs from "dayjs";
import { api } from "~/trpc/react";

const Streak = () => {
  const { data: savedJobs, isLoading } = api.jobs.getJobs.useQuery();

  const datesActive = new Set<string>();

  savedJobs?.forEach(({ createdAt, status }) => {
    if (!status) {
      return;
    }
    datesActive.add(dayjs(createdAt).format("YYYY-MM-DD"));
  });

  let streak = datesActive.has(dayjs().format("YYYY-MM-DD")) ? 1 : 0;

  for (let i = 0; i < datesActive.size; i++) {
    const currentDay = dayjs()
      .subtract(i + 1, "day")
      .format("YYYY-MM-DD");
    if (datesActive.has(currentDay)) {
      streak++;
    } else {
      break;
    }
  }

  return (
    <div className="flex flex-shrink-0 flex-col items-center justify-center gap-1 overflow-x-hidden rounded-lg border-2 bg-white px-6 py-4">
      <div className="flex items-center">
        <IconFlame size={30} className="text-orange-600" />
        <p className="flex-shrink text-lg font-black uppercase text-zinc-600">
          Streak
        </p>
      </div>
      <p className="text-6xl font-semibold text-zinc-800">
        {isLoading && "-"}
        {!isLoading && streak}
      </p>
      <p className="flex-shrink text-sm font-semibold text-zinc-500">
        Days Active
      </p>
      <p className="flex-shrink text-xs font-semibold text-zinc-500">
        (in a row)
      </p>
    </div>
  );
};

export default Streak;
