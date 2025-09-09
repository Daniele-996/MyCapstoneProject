import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

const mockReservations = [
  { date: "2025-09-10", room: "Room 3" },
  { date: "2025-09-12", room: "Room 5" },
];

const mockUsers = [
  { username: "mario", reservations: [{ date: "2025-09-11", room: "Room 1" }] },
  { username: "luigi", reservations: [{ date: "2025-09-12", room: "Room 2" }] },
];

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container className="p-4">
      <h2>Profilo: {user?.username}</h2>
      {user?.role === "USER" && (
        <>
          <h4>Le tue prenotazioni:</h4>
          <ul>
            {mockReservations.map((r, i) => (
              <li key={i}>
                {r.date} – {r.room}
              </li>
            ))}
          </ul>
        </>
      )}

      {user?.role === "ADMIN" && (
        <>
          <h4>Utenti e prenotazioni:</h4>
          {mockUsers.map((u) => (
            <div key={u.username}>
              <strong>{u.username}</strong>
              <ul>
                {u.reservations.map((r, i) => (
                  <li key={i}>
                    {r.date} – {r.room}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </Container>
  );
};

export default Profile;
