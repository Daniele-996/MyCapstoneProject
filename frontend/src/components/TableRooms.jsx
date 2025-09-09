import { Table } from "react-bootstrap";
const TableRooms = () => {
  const ROOMS = [
    "Room 1",
    "Room 2",
    "Room 3",
    "Room 4",
    "Room 5",
    "Room 6",
    "Room 7",
    "Room 8",
    "Room 9",
    "Room 10",
  ];
  const HOURS = Array.from({ length: 15 }, (_, i) => `${8 + i}:00`);

  return (
    <Table bordered responsive className="rounded">
      <thead>
        <tr>
          <th>Ora</th>
          {ROOMS.map((room) => (
            <th key={room}>{room}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {HOURS.map((hour) => (
          <tr key={hour}>
            <td>{hour}</td>
            {ROOMS.map((room) => (
              <td key={room + hour}>-</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default Table;
