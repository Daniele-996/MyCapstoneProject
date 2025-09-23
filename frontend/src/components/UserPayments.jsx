import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, Alert, Card } from "react-bootstrap";

const UserPayments = () => {
  const { id } = useParams();

  const reservations = useSelector((s) => s.reservations.content);
  const rooms = useSelector((s) => s.rooms.content);
  const users = useSelector((s) => s.user.content);
  const user = users.find((u) => String(u.id) === id);
  const userReservations = reservations.filter((r) => String(r.userId) === id);

  if (!userReservations || userReservations.length === 0) {
    return (
      <Alert variant="info" className="text-center w-50 mx-auto mt-3">
        Nessun pagamento trovato per questo utente
      </Alert>
    );
  }

  const total = userReservations.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="table-responsive my-3">
      <Card className="p-4 room-admin-container">
        <h3 className="mb-4 text-center">
          Pagamenti di{" "}
          {user ? `${user.firstName} ${user.lastName}` : `Utente #${id}`}
        </h3>

        <Table bordered hover className="room-table text-center align-middle">
          <thead>
            <tr>
              <th>Giorno</th>
              <th>Ora</th>
              <th>Stanza</th>
              <th>Costo</th>
            </tr>
          </thead>
          <tbody>
            {userReservations.map((r) => {
              const room = rooms.find((rm) => rm.id === r.roomId);
              const slot = room?.timeSlots.find((ts) => ts.id === r.timeSlotId);

              return (
                <tr key={r.id}>
                  <td>{r.date}</td>
                  <td>{slot ? `${slot.startTime} - ${slot.endTime}` : "—"}</td>
                  <td>{room ? room.nameRoom : "—"}</td>
                  <td>{r.amount} €</td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <div className="text-end mt-3">
          <h5>
            Totale: <strong>{total} €</strong>
          </h5>
        </div>
      </Card>
    </div>
  );
};

export default UserPayments;
