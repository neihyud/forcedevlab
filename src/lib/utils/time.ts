// import dayjs from 'dayjs';

// import { memoizeFunction } from './memo-func';

// export const timeDiff = memoizeFunction(
//   (
//     start?: string | number | Date | null,
//     end?: string | number | Date | null,
//     unit: dayjs.OpUnitType = 'day',
//     float = false,
//     round = false,
//   ) => {
//     if (!start || !end) return 0;
//     let d1 = dayjs(start);
//     let d2 = dayjs(end);

//     if (round) {
//       d1 = d1.startOf(unit);
//       d2 = d2.startOf(unit);
//     }

//     return d2.diff(d1, unit, float);
//   },
// );
