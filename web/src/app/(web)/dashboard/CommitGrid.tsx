"use client";
import dayjs from "dayjs";
import { twJoin } from "tailwind-merge";
import { api } from "~/trpc/react";

type MonthInfo = {
  startOn: number;
  daysInMonth: number;
  monthName: string;
  dayData: Record<number, Record<string, number>>;
};

const CommitGrid = () => {
  const { data: savedJobs } = api.jobs.getJobs.useQuery();

  let jobsByMonth: Record<string, Record<number, Record<string, number>>> = {};

  savedJobs?.forEach(({ createdAt, status }) => {
    const statusName = status[0]?.status;

    if (!statusName) {
      return;
    }

    const month = dayjs(createdAt).format("YYYY-MM");
    const day = dayjs(createdAt).date();

    jobsByMonth = {
      ...jobsByMonth,
      [month]: {
        ...jobsByMonth[month],
        [day]: {
          ...jobsByMonth[month]?.[day],
          [statusName]: (jobsByMonth[month]?.[day]?.[statusName] ?? 0) + 1,
        },
      },
    };
  });

  const months: MonthInfo[] = [
    {
      startOn: dayjs().date(1).day(),
      daysInMonth: dayjs().date(),
      monthName: dayjs().format("MMM"),
      dayData: jobsByMonth[dayjs().format("YYYY-MM")] ?? {},
    },
  ];

  for (let i = 1; i < 12; i++) {
    const month = dayjs().subtract(i, "month");
    months.push({
      startOn: month.date(1).day(),
      daysInMonth: month.daysInMonth(),
      monthName: month.format("MMM"),
      dayData: jobsByMonth[month.format("YYYY-MM")] ?? {},
    });
  }
  return (
    <div className="relative flex justify-end gap-4 overflow-x-hidden rounded-lg border-2 bg-white p-4">
      <div className="absolute left-0 top-0 flex h-full flex-col justify-evenly bg-white pb-4 pl-4 pr-1 pt-8">
        <p className="text-xs font-semibold uppercase text-zinc-400">Mon</p>
        <p className="text-xs font-semibold uppercase text-zinc-400">Wed</p>
        <p className="text-xs font-semibold uppercase text-zinc-400">Fri</p>
      </div>
      <div className="flex flex-shrink-0 flex-row-reverse justify-end gap-4 rounded-lg">
        {months.map((info, i) => (
          <Month monthInfo={info} isCurrentMonth={i === 0} key={i} />
        ))}
      </div>
    </div>
  );
};

const Month: React.FC<{ monthInfo: MonthInfo; isCurrentMonth?: boolean }> = ({
  monthInfo,
  isCurrentMonth,
}) => {
  const prefixDays = monthInfo?.startOn ?? 0;
  const days = new Array(monthInfo.daysInMonth).fill(0);
  const postfixDays = isCurrentMonth
    ? 0
    : (42 - (monthInfo.daysInMonth + monthInfo.startOn)) % 7;

  return (
    <div>
      <p className="text-xs font-semibold uppercase text-zinc-400">
        {monthInfo.monthName}
      </p>
      <div className="flex h-[136px] flex-col flex-wrap content-start gap-1 pr-4">
        {prefixDays > 0 && (
          <div
            className={`w-4 rounded bg-zinc-50`}
            style={{ height: `${20 * prefixDays - 4}px` }}
          />
        )}
        
        {days.map((_, i) => (
          <Day dayInfo={monthInfo.dayData[i + 1]} key={i} />
        ))}
        
        
        {postfixDays > 0 && (
          <div
            className={`w-4 rounded bg-zinc-50`}
            style={{ height: `${20 * postfixDays - 4}px` }}
          />
        )}
        
      </div>
    </div>
  );
};

const Day: React.FC<{ dayInfo?: Record<string, number> }> = ({ dayInfo }) => {
  return (
    <div
      className={twJoin(
        "h-4 w-4 rounded",
        dayInfo != undefined ? "bg-emerald-400" : "bg-zinc-100",
      )}
    />
  );
};

export default CommitGrid;
