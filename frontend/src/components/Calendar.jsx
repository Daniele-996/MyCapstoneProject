import { useSelector, useDispatch } from "react-redux";
import CalendarLib from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { setDate } from "../redux/actions";

const toLocalISO = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const fromISOToLocalDate = (iso) => {
  if (!iso) return new Date();
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const Calendar = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector((s) => s.calendar.currentDate);

  const handleClickDay = (date) => {
    const iso = toLocalISO(date);
    dispatch(setDate(iso));
  };

  return (
    <CalendarLib
      onClickDay={handleClickDay}
      value={fromISOToLocalDate(currentDate)}
      locale="it-IT"
      tileClassName={({ date, view }) =>
        view === "month" && (date.getDay() === 0 || date.getDay() === 6)
          ? "weekend-day"
          : null
      }
    />
  );
};

export default Calendar;
