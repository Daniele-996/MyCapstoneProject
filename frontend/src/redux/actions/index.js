export const SET_ROOMS = "SET_ROOMS";
export const SET_LOGIN = "SET_LOGIN";
export const SET_LOGOUT = "SET_LOGOUT";
export const SET_DATE = "SET_DATE";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SET_PAYMENTS = "SET_PAYMENTS";
export const SET_USER = "SET_USER";
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

export const fetchReservations = (date) => {
  return async (dispatch, getState) => {
    dispatch(reservationsRequest());
    const token = getState().auth.token;
    if (!token) return;

    try {
      const url = date
        ? `${import.meta.env.VITE_API_URL}/reservations/search?date=${date}`
        : `${import.meta.env.VITE_API_URL}/reservations`;

      const resp = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!resp.ok)
        throw new Error("Errore nel caricamento delle prenotazioni");

      const data = await resp.json();
      dispatch(reservationsSuccess(data));
    } catch (err) {
      dispatch(reservationsFailure(err.message));
    }
  };
};

export const fetchReservationsRange = (roomId, from, to) => {
  return async (dispatch, getState) => {
    dispatch(reservationsRequest());
    const token = getState().auth.token;
    if (!token) return;

    try {
      const url = `${
        import.meta.env.VITE_API_URL
      }/reservations/search?roomId=${roomId}&from=${from}&to=${to}`;

      const resp = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!resp.ok) {
        throw new Error(
          "Errore nel caricamento delle prenotazioni settimanali"
        );
      }

      const data = await resp.json();
      dispatch(reservationsSuccess(data));
    } catch (err) {
      dispatch(reservationsFailure(err.message));
    }
  };
};

export const createReservation = ({ room, user, date, timeSlot }) => {
  return async (dispatch, getState) => {
    dispatch(reservationsRequest());
    const token = getState().auth.token;
    if (!token) return;

    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ room, user, date, timeSlot }),
      });

      const data = await resp.json();
      if (!resp.ok)
        throw new Error(data.message || "Errore nella prenotazione");

      const currentDate = getState().calendar.currentDate;
      await dispatch(fetchReservations(currentDate));

      return true;
    } catch (err) {
      dispatch(reservationsFailure(err.message));
      return false;
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
