"use client";
import dayjs from "dayjs";

const CommitGrid = () => {
  const months: MonthInfo[] = [
    {
      startOn: dayjs().date(1).day(),
      daysInMonth: dayjs().date(),
      monthName: dayjs().format("MMM"),
    },
  ];

  for (let i = 1; i < 12; i++) {
    const prevMonth = dayjs().subtract(i, "month");
    months.push({
      startOn: prevMonth.date(1).day(),
      daysInMonth: prevMonth.daysInMonth(),
      monthName: prevMonth.format("MMM"),
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
          <Month monthInfo={info} key={i} />
        ))}
      </div>
    </div>
  );
};

type MonthInfo = { startOn: number; daysInMonth: number; monthName: string };

const Month: React.FC<{ monthInfo: MonthInfo }> = ({ monthInfo: info }) => {
  const prefix = new Array(info.startOn).fill(0);
  const days = new Array(info.daysInMonth).fill(0);
  const suffix = new Array((42 - (info.daysInMonth + info.startOn)) % 7).fill(
    0,
  );

  return (
    <div className="">
      <p className="text-xs font-semibold uppercase text-zinc-400">
        {info.monthName}
      </p>
      <div className="flex h-[calc((16px+4px)*7-4px)] flex-col flex-wrap content-start gap-1 pr-4">
        {prefix.map((_, i) => (
          <Day key={i} />
        ))}
        {days.map((_, i) => (
          <Day dayInfo={{ placeholder: true }} key={i} />
        ))}
        {suffix.map((_, i) => (
          <Day key={i} />
        ))}
      </div>
    </div>
  );
};

const Day: React.FC<{ dayInfo?: { placeholder: boolean } }> = ({ dayInfo }) => {
  if (dayInfo === undefined) {
    return (
      <div className="h-4 w-4 rounded outline -outline-offset-1 outline-zinc-100" />
    );
  }

  return <button className="h-4 w-4 rounded bg-zinc-100 hover:-scale-125" />;
};

export default CommitGrid;
