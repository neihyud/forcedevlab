// "use client";

// import {
//   ReactNode,
//   createContext,
//   forwardRef,
//   memo,
//   useCallback,
//   useContext,
//   useMemo,
//   useState,
// } from "react";

// import { VariantProps, cva } from "class-variance-authority";
// import dayjs, { Dayjs } from "dayjs";
// import "dayjs/locale/en";
// import isBetween from "dayjs/plugin/isBetween";
// import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
// import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
// import localeData from "dayjs/plugin/localeData";
// import timezone from "dayjs/plugin/timezone";
// import utc from "dayjs/plugin/utc";

// import { Button } from "@/components/ui/Button";
// import Flex from "@/components/ui/Flex";
// import { cn } from "@/lib/utils";

// dayjs.extend(isSameOrBefore);
// dayjs.extend(isSameOrAfter);
// dayjs.extend(isBetween);
// dayjs.extend(localeData);
// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.locale("vi");

// const monthEventVariants = cva("size-2 rounded-full", {
//   variants: {
//     variant: {
//       default: "bg-primary",
//       blue: "bg-blue-500",
//       green: "bg-green-500",
//       pink: "bg-pink-500",
//       purple: "bg-purple-500",
//     },
//   },
//   defaultVariants: {
//     variant: "default",
//   },
// });

// const dayEventVariants = cva("font-bold border-l-4 rounded p-2 text-xs", {
//   variants: {
//     variant: {
//       default: "bg-muted/30 text-muted-foreground border-muted",
//       blue: "bg-blue-500/30 text-blue-600 border-blue-500",
//       green: "bg-green-500/30 text-green-600 border-green-500",
//       pink: "bg-pink-500/30 text-pink-600 border-pink-500",
//       purple: "bg-purple-500/30 text-purple-600 border-purple-500",
//     },
//   },
//   defaultVariants: {
//     variant: "default",
//   },
// });

// type View = "day" | "week" | "month" | "year";

// type ContextType = {
//   view: View;
//   setView: (view: View) => void;
//   date: Dayjs;
//   setDate: (date: Dayjs) => void;
//   events: CalendarEvent[];
//   locale?: ILocale;
//   setEvents: (date: CalendarEvent[]) => void;
//   onChangeView?: (view: View) => void;
//   onEventClick?: (event: CalendarEvent) => void;
//   today: Dayjs;
// };

// const Context = createContext<ContextType>({} as ContextType);

// export type CalendarEvent = {
//   id: string;
//   start: Dayjs;
//   end: Dayjs;
//   title: string;
//   color?: VariantProps<typeof monthEventVariants>["variant"];
//   renderEvent?: (event: CalendarEvent) => ReactNode;
// };

// type CalendarProps = {
//   children: ReactNode;
//   defaultDate?: Dayjs;
//   events?: CalendarEvent[];
//   view?: View;
//   locale?: ILocale;
//   enableHotkeys?: boolean;
//   onChangeView?: (view: View) => void;
//   onEventClick?: (event: CalendarEvent) => void;
// };

// const FullCalendar = ({
//   children,
//   defaultDate = dayjs(),
//   locale,
//   view: _defaultMode = "month",
//   onEventClick,
//   events: defaultEvents = [],
//   onChangeView,
// }: CalendarProps) => {
//   const [view, setView] = useState<View>(_defaultMode);
//   const [date, setDate] = useState(defaultDate);
//   const [events, setEvents] = useState<CalendarEvent[]>(defaultEvents);

//   const changeView = (view: View) => {
//     setView(view);
//     onChangeView?.(view);
//   };

//   return (
//     <Context.Provider
//       value={{
//         view,
//         setView,
//         date,
//         setDate,
//         events,
//         setEvents,
//         locale,
//         onEventClick,
//         onChangeView: changeView,
//         today: dayjs(),
//       }}
//     >
//       {children}
//     </Context.Provider>
//   );
// };

// export const useCalendar = () => useContext(Context);

// // const CalendarViewTrigger = forwardRef<
// //   HTMLButtonElement,
// //   React.HTMLAttributes<HTMLButtonElement> & {
// //     view: View;
// //   }
// // >((props, ref) => {
// //   const { children, view, ...rest } = props;
// //   const { view: currentView, setView, onChangeView } = useCalendar();

// //   return (
// //     <Button
// //       ref={ref}
// //       aria-current={currentView === view}
// //       size="sm"
// //       variant="outline"
// //       {...rest}
// //       onClick={() => {
// //         setView(view);
// //         onChangeView?.(view);
// //       }}
// //     >
// //       {children}
// //     </Button>
// //   );
// // });
// // CalendarViewTrigger.displayName = 'CalendarViewTrigger';

// // const EventGroup = ({
// //   events,
// //   hour,
// // }: {
// //   events: CalendarEvent[];
// //   hour: Dayjs;
// // }) => {
// //   return (
// //     <div className="h-20 border-t last:border-b">
// //       {events
// //         .filter((event) => dayjs(event.start).isSame(hour, 'hour'))
// //         .map((event) => {
// //           const hoursDifference = dayjs(event.end).diff(
// //             event.start,
// //             'hour',
// //             true,
// //           );
// //           const startPosition = dayjs(event.start).minute() / 60;
// //           if (event.renderEvent) {
// //             return event.renderEvent(event);
// //           }

// //           return (
// //             <div
// //               key={event.id}
// //               className={cn(
// //                 'relative',
// //                 dayEventVariants({ variant: event.color }),
// //               )}
// //               style={{
// //                 top: `${startPosition * 100}%`,
// //                 height: `${hoursDifference * 100}%`,
// //               }}
// //             >
// //               {event.title}
// //             </div>
// //           );
// //         })}
// //     </div>
// //   );
// // };

// // const CalendarDayView = () => {
// //   const { view, events, date } = useCalendar();

// //   if (view !== 'day') return null;

// //   const hours = [...Array(24)].map((_, i) => dayjs(date).hour(i));

// //   return (
// //     <div className="relative flex h-full overflow-auto pt-2">
// //       <TimeTable />
// //       <div className="flex-1">
// //         {hours.map((hour) => (
// //           <EventGroup key={hour.toString()} hour={hour} events={events} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // const CalendarWeekView = () => {
// //   const { view, date, locale, events } = useCalendar();

// //   const weekDates = useMemo(() => {
// //     const start = dayjs(date).startOf('week');
// //     const weekDates = [];

// //     for (let i = 0; i < 7; i++) {
// //       const day = dayjs(start).add(i, 'day');
// //       const hours = [...Array(24)].map((_, i) => dayjs(day).hour(i));
// //       weekDates.push(hours);
// //     }

// //     return weekDates;
// //   }, [date]);

// //   const headerDays = useMemo(() => {
// //     const daysOfWeek = [];
// //     for (let i = 0; i < 7; i++) {
// //       const result = dayjs(date).startOf('week').add(i, 'day');
// //       daysOfWeek.push(result);
// //     }
// //     return daysOfWeek;
// //   }, [date]);

// //   if (view !== 'week') return null;

// //   return (
// //     <div className="relative flex h-full flex-col overflow-auto">
// //       <div className="bg-card sticky top-0 z-10 mb-3 flex border-b">
// //         <div className="w-12"></div>
// //         {headerDays.map((date, i) => (
// //           <div
// //             key={date.toString()}
// //             className={cn(
// //               'text-muted-foreground flex flex-1 items-center justify-center gap-1 pb-2 text-center text-sm',
// //               [0, 6].includes(i) && 'text-muted-foreground/50',
// //             )}
// //           >
// //             {dayjs(date).format('E')}
// //             <span
// //               className={cn(
// //                 'grid h-6 place-content-center',
// //                 dayjs(date).isSame(dayjs(), 'day') &&
// //                   'bg-primary text-primary-foreground size-6 rounded-full',
// //               )}
// //             >
// //               {dayjs(date).format('D')}
// //             </span>
// //           </div>
// //         ))}
// //       </div>
// //       <div className="flex flex-1">
// //         <div className="w-fit">
// //           <TimeTable />
// //         </div>
// //         <div className="grid flex-1 grid-cols-7">
// //           {weekDates.map((hours, i) => {
// //             return (
// //               <div
// //                 className={cn(
// //                   'text-muted-foreground h-full border-l text-sm first:border-l-0',
// //                   [0, 6].includes(i) && 'bg-muted/50',
// //                 )}
// //                 key={hours[0].toString()}
// //               >
// //                 {hours.map((hour) => (
// //                   <EventGroup
// //                     key={hour.toString()}
// //                     hour={hour}
// //                     events={events}
// //                   />
// //                 ))}
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// const CalendarMonthView = memo(
//   ({
//     weekDaysClassName,
//     weekDayClassName,
//     renderEvent,
//   }: {
//     weekDaysClassName?: string;
//     weekDayClassName?: string;
//     renderEvent?: (day: Dayjs) => ReactNode;
//   }) => {
//     const { date, view, events, locale } = useCalendar();

//     const monthDates = useMemo(() => getDaysInMonth(date), [date]);
//     const weekDays = useMemo(() => generateWeekdays(), [locale]);

//     if (view !== "month") return null;

//     return (
//       <div className="flex flex-col sm:h-full sm:min-h-[800px]">
//         <div
//           className={cn(
//             "text-text-1 text-right text-sm",
//             "sticky top-0 z-1 grid grid-cols-7 gap-px overflow-hidden bg-white p-px max-sm:rounded-t-3xl",
//             weekDaysClassName
//           )}
//         >
//           <div className="absolute top-0 left-0 z-[-1] h-full w-full rounded-t-3xl bg-white" />
//           {weekDays.map((day, i) => (
//             <Flex
//               align="center"
//               justify="center"
//               key={day}
//               className={cn(
//                 "text-text-2 ring-border-color px-4 py-4 text-right text-sm ring-1",
//                 i === 0 && "rounded-tl-3xl",
//                 i === 6 && "rounded-tr-3xl",
//                 weekDayClassName
//               )}
//             >
//               {day}
//             </Flex>
//           ))}
//         </div>
//         <div className="-mt-px grid flex-1 auto-rows-fr grid-cols-7 gap-px overflow-hidden p-px">
//           {monthDates.map((_date, index) => {
//             const currentEvents = events.filter((event) =>
//               dayjs(event.start).isSame(_date, "day")
//             );

//             return (
//               <div
//                 className={cn(
//                   "text-text-1 ring-border-color min-h-15 overflow-auto bg-white p-2 text-sm ring-1",
//                   !dayjs(date).isSame(_date, "month") && "bg-[#F5F5F5]",
//                   dayjs(_date).isSame(dayjs(), "day") && "bg-[#8642f610]",
//                   index === 35 && "rounded-bl-3xl",
//                   index === 41 && "rounded-br-3xl"
//                 )}
//                 key={_date.toString()}
//               >
//                 <span
//                   className={cn(
//                     "sticky top-0 mb-1 grid size-6 place-items-center rounded-full font-bold",

//                     !dayjs(date).isSame(_date, "month") &&
//                       "text-text-disabled bg-[#F5F5F5] !font-normal",
//                     dayjs(_date).isSame(dayjs(), "day") && "text-main"
//                   )}
//                 >
//                   {dayjs(_date).format("D")}
//                 </span>
//                 {renderEvent && renderEvent(_date)}
//                 {!renderEvent &&
//                   currentEvents.map((event) => {
//                     return (
//                       <div
//                         key={event.id}
//                         className="flex items-center gap-1 rounded px-1 text-sm"
//                       >
//                         <div
//                           className={cn(
//                             "shrink-0",
//                             monthEventVariants({ variant: event.color })
//                           )}
//                         ></div>
//                         <span className="flex-1 truncate">{event.title}</span>
//                       </div>
//                     );
//                   })}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// );
// CalendarMonthView.displayName = "CalendarMonthView";
// // const CalendarYearView = () => {
// //   const { view, date, today, locale } = useCalendar();

// //   const months = useMemo(() => {
// //     if (!view) {
// //       return [];
// //     }

// //     return Array.from({ length: 12 }).map((_, i) => {
// //       return getDaysInMonth(dayjs(date).month(i));
// //     });
// //   }, [date, view]);

// //   const weekDays = useMemo(() => generateWeekdays(), [locale]);

// //   if (view !== 'year') return null;

// //   return (
// //     <div className="grid h-full grid-cols-4 gap-10 overflow-auto">
// //       {months.map((days, i) => (
// //         <div key={days[0].toString()}>
// //           <span className="text-xl">{i + 1}</span>

// //           <div className="my-5 grid grid-cols-7 gap-2">
// //             {weekDays.map((day) => (
// //               <div
// //                 key={day}
// //                 className="text-muted-foreground text-center text-xs"
// //               >
// //                 {day}
// //               </div>
// //             ))}
// //           </div>

// //           <div className="grid grid-cols-7 gap-x-2 text-center text-xs tabular-nums">
// //             {days.map((_date) => {
// //               return (
// //                 <div
// //                   key={_date.toString()}
// //                   className={cn(
// //                     dayjs(_date).month() !== i && 'text-muted-foreground',
// //                   )}
// //                 >
// //                   <div
// //                     className={cn(
// //                       'grid aspect-square size-full place-content-center tabular-nums',
// //                       dayjs(today).isSame(_date, 'day') &&
// //                         dayjs(_date).month() === i &&
// //                         'bg-primary text-primary-foreground rounded-full',
// //                     )}
// //                   >
// //                     {dayjs(_date).format('D')}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // const CalendarNextTrigger = forwardRef<
// //   HTMLButtonElement,
// //   React.HTMLAttributes<HTMLButtonElement>
// // >(({ children, onClick, ...props }, ref) => {
// //   const { date, setDate, view } = useCalendar();

// //   const next = useCallback(() => {
// //     if (view === 'day') {
// //       setDate(dayjs(date).add(1, 'day'));
// //     } else if (view === 'week') {
// //       setDate(dayjs(date).add(1, 'week'));
// //     } else if (view === 'month') {
// //       setDate(dayjs(date).add(1, 'month'));
// //     } else if (view === 'year') {
// //       setDate(dayjs(date).add(1, 'year'));
// //     }
// //   }, [date, view, setDate]);

// //   return (
// //     <Button
// //       size="icon"
// //       variant="outline"
// //       ref={ref}
// //       {...props}
// //       onClick={(e) => {
// //         next();
// //         onClick?.(e);
// //       }}
// //     >
// //       {children}
// //     </Button>
// //   );
// // });
// // CalendarNextTrigger.displayName = 'CalendarNextTrigger';

// // const CalendarPrevTrigger = forwardRef<
// //   HTMLButtonElement,
// //   React.HTMLAttributes<HTMLButtonElement>
// // >(({ children, onClick, ...props }, ref) => {
// //   const { date, setDate, view } = useCalendar();

// //   const prev = useCallback(() => {
// //     if (view === 'day') {
// //       setDate(dayjs(date).subtract(1, 'day'));
// //     } else if (view === 'week') {
// //       setDate(dayjs(date).subtract(1, 'week'));
// //     } else if (view === 'month') {
// //       setDate(dayjs(date).subtract(1, 'month'));
// //     } else if (view === 'year') {
// //       setDate(dayjs(date).subtract(1, 'year'));
// //     }
// //   }, [date, view, setDate]);

// //   return (
// //     <Button
// //       size="icon"
// //       variant="outline"
// //       ref={ref}
// //       {...props}
// //       onClick={(e) => {
// //         prev();
// //         onClick?.(e);
// //       }}
// //     >
// //       {children}
// //     </Button>
// //   );
// // });
// // CalendarPrevTrigger.displayName = 'CalendarPrevTrigger';

// // const CalendarTodayTrigger = forwardRef<
// //   HTMLButtonElement,
// //   React.HTMLAttributes<HTMLButtonElement>
// // >(({ children, onClick, ...props }, ref) => {
// //   const { setDate, today } = useCalendar();

// //   const jumpToToday = useCallback(() => {
// //     setDate(today);
// //   }, [today, setDate]);

// //   return (
// //     <Button
// //       variant="outline"
// //       ref={ref}
// //       {...props}
// //       onClick={(e) => {
// //         jumpToToday();
// //         onClick?.(e);
// //       }}
// //     >
// //       {children}
// //     </Button>
// //   );
// // });
// // CalendarTodayTrigger.displayName = 'CalendarTodayTrigger';

// const CalendarCurrentDate = () => {
//   const { date, view } = useCalendar();

//   return (
//     <time dateTime={date.toISOString()} className="tabular-nums">
//       {dayjs(date).format(view === "day" ? "dd MM YYYY" : "MMMM YYYY")}
//     </time>
//   );
// };

// // const TimeTable = () => {
// //   const now = dayjs();

// //   return (
// //     <div className="w-12 pr-2">
// //       {Array.from(Array(25).keys()).map((hour) => {
// //         return (
// //           <div
// //             className="text-muted-foreground/50 relative h-20 text-right text-xs last:h-0"
// //             key={hour}
// //           >
// //             {now.hour() === hour && (
// //               <div
// //                 className="z- absolute left-full h-[2px] w-dvw translate-x-2 bg-red-500"
// //                 style={{
// //                   top: `${(now.minute() / 60) * 100}%`,
// //                 }}
// //               >
// //                 <div className="absolute top-1/2 left-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500"></div>
// //               </div>
// //             )}
// //             <p className="top-0 -translate-y-1/2">
// //               {hour === 24 ? 0 : hour}:00
// //             </p>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// const getDaysInMonth = (date: Dayjs) => {
//   const startOfMonthDate = dayjs(date).startOf("month");
//   const startOfWeekForMonth = dayjs(startOfMonthDate).startOf("week");

//   let currentDate = startOfWeekForMonth;
//   const calendar = [];

//   while (calendar.length < 42) {
//     calendar.push(currentDate);
//     currentDate = currentDate.add(1, "day");
//   }

//   return calendar;
// };

// const generateWeekdays = () => {
//   const daysOfWeek = [];
//   for (let i = 0; i < 7; i++) {
//     const date = dayjs(new Date()).startOf("week").add(i, "day");
//     daysOfWeek.push(dayjs(date).format("ddd"));
//   }
//   return daysOfWeek;
// };

// export {
//   FullCalendar,
//   CalendarCurrentDate,
//   // CalendarDayView,
//   CalendarMonthView,
//   // CalendarNextTrigger,
//   // CalendarPrevTrigger,
//   // CalendarTodayTrigger,
//   // CalendarViewTrigger,
//   // CalendarWeekView,
//   // CalendarYearView,
// };
