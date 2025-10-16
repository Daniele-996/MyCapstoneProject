export const SET_ROOMS = "SET_ROOMS";
export const SET_LOGIN = "SET_LOGIN";
export const SET_LOGOUT = "SET_LOGOUT";
export const SET_DATE = "SET_DATE";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SET_PAYMENTS = "SET_PAYMENTS";
export const UPDATE_PAYMENT_STATUS = "UPDATE_PAYMENT_STATUS";
export const SET_USER = "SET_USER";
export const UPDATE_AVATAR = "UPDATE_AVATAR";
export const SETS_USERS = "SETS_USERS";
export const UPDATE_USER_ROLE = "UPDATE_USER_ROLE";
export const DELETE_USER = "DELETE_USER";
export const USER_PAYMENTS = "USER_PAYMENTS";
export const RESERVATIONS_REQUEST = "RESERVATIONS_REQUEST";
export const RESERVATIONS_SUCCESS = "RESERVATIONS_SUCCESS";
export const RESERVATIONS_FAILURE = "RESERVATIONS_FAILURE";

//------------------------------ ACTION CREATORS ---------------------------------
export const setRooms = (rooms) => ({ type: SET_ROOMS, payload: rooms });

export const setLogin = (token, email, password) => ({
  type: SET_LOGIN,
  payload: { token, email, password },
});

export const setLogout = () => ({ type: SET_LOGOUT });

export const setDate = (date) => ({
  type: SET_DATE,
  payload: date,
});

export const setError = (message) => ({
  type: SET_ERROR,
  payload: message,
});

export const clearError = () => ({ type: CLEAR_ERROR });

export const setPayments = (payments) => ({
  type: SET_PAYMENTS,
  payload: payments,
});

export const setUserProfile = (user) => ({ type: SET_USER, payload: user });

export const reservationsRequest = () => ({ type: RESERVATIONS_REQUEST });

export const reservationsSuccess = (reservations) => ({
  type: RESERVATIONS_SUCCESS,
  payload: reservations,
});

export const reservationsFailure = (message) => ({
  type: RESERVATIONS_FAILURE,
  payload: message,
});

export const setUsers = (users) => ({ type: SETS_USERS, payload: users });

export const updateAvatarAction = (user) => ({
  type: UPDATE_AVATAR,
  payload: user,
});

export const setUserPayments = (payments) => ({
  type: USER_PAYMENTS,
  payload: payments,
});

//------------------------------ ALL FETCHS ---------------------------------

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(clearError());
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(
          data.message || "C'è stato un errore nell'effetuare il login"
        );
      }

      dispatch(setLogin(data.accessToken, email, password));
      localStorage.setItem("token", data.accessToken);
      const todayIso = new Date().toLocaleDateString("sv-SE");
      dispatch(setDate(todayIso));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const registerUser = (formData) => {
  return async (dispatch) => {
    dispatch(clearError());
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await resp.json();
      if (!resp.ok) {
        dispatch(setError(data.message || "Errore nella registrazione!"));
        return false;
      }

      if (data.id) return true;
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(clearError());
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/users/search`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await resp.json();

      if (!resp.ok)
        throw new Error(data.message || "Errore nel caricamento utenti");

      dispatch(setUsers(data));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const updateUserRole = (userId, newRole) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!resp.ok) throw new Error("Errore nell'aggiornamento del ruolo");

      const updatedUser = await resp.json();
      dispatch({ type: UPDATE_USER_ROLE, payload: updatedUser });
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const updateUserAvatar = (userId, file) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/avatar`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!resp.ok) throw new Error("Errore durante l'upload avatar");

      const updatedUser = await resp.json();
      dispatch(updateAvatarAction(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data.message || "Errore nell'eliminazione utente");
      }

      dispatch({ type: DELETE_USER, payload: userId });
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const fetchUserReservations = (userId) => {
  return async (dispatch) => {
    dispatch(reservationsRequest());
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/reservations/search?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!resp.ok) throw new Error("Errore nel caricamento prenotazioni");

      const data = await resp.json();
      dispatch(reservationsSuccess(data));
    } catch (err) {
      dispatch(reservationsFailure(err.message));
    }
  };
};

export const fetchRooms = () => {
  return async (dispatch, getState) => {
    dispatch(clearError());
    const token = getState().auth.token;
    if (!token) return;

    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!resp.ok) throw new Error("Errore nel caricamento delle stanze");

      const data = await resp.json();
      dispatch(setRooms(data));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const createRoom = ({ nameRoom, orthopedicBed }) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nameRoom, orthopedicBed }),
      });

      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(
          errData.message || "Errore nella creazione della stanza"
        );
      }

      dispatch(fetchRooms());
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const deleteRoom = (roomId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/rooms/${roomId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!resp.ok) throw new Error("Errore nell'eliminazione della stanza");

      dispatch(fetchRooms());
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const fetchPayments = () => {
  return async (dispatch, getState) => {
    dispatch(clearError());
    const token = getState().auth.token;
    if (!token) return;

    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!resp.ok) throw new Error("Errore nel caricamento dei pagamenti");
      const data = await resp.json();
      dispatch(setPayments(data));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const updatePaymentStatus = (id, newStatus) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    if (!token) return;

    try {
      const resp = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/payments/${id}/status?status=${newStatus}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!resp.ok) throw new Error("Errore aggiornamento pagamento");

      const updatedPayment = await resp.json();
      dispatch({
        type: "UPDATE_PAYMENT_STATUS",
        payload: updatedPayment,
      });
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const fetchUserPayments = (userId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    if (!token) return;

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/payments/search?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!resp.ok) {
        throw new Error("Errore nel caricamento dei pagamenti utente");
      }

      const data = await resp.json();
      dispatch(setUserPayments(data));
    } catch (err) {
      console.error("fetchUserPayments error:", err.message);
    }
  };
};

export const fetchReservations = () => {
  return async (dispatch) => {
    dispatch(reservationsRequest());
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/reservations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await resp.json();
      if (!resp.ok)
        throw new Error(data.message || "Errore nel caricamento prenotazioni");

      dispatch(reservationsSuccess(data));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const createReservation = ({ roomId, userId, date, timeSlotId }) => {
  return async (dispatch, getState) => {
    dispatch(reservationsRequest());
    const token = getState().auth.token;
    if (!token) throw new Error("Utente non autenticato");

    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ roomId, userId, date, timeSlotId }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        const message = data?.message || "Errore nella prenotazione";
        throw new Error(message);
      }

      const currentDate = getState().calendar.currentDate;
      await dispatch(fetchReservations(currentDate));
      return true;
    } catch (err) {
      dispatch(setError(err.message));
      throw err;
    }
  };
};

export const deleteReservation = (reservationId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    if (!token) return;

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/reservations/${reservationId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!resp.ok) throw new Error("Errore nella cancellazione");

      const currentDate = getState().calendar.currentDate;
      await dispatch(fetchReservations(currentDate));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const fetchUserProfile = () => {
  return async (dispatch, getState) => {
    dispatch(clearError());
    const token = getState().auth.token;
    if (!token) return;

    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!resp.ok) throw new Error("Errore nel caricamento del profilo");

      const data = await resp.json();
      dispatch(setUserProfile(data));
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};
