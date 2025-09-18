export const SET_ROOMS = "SET_ROOMS";
export const SET_LOGIN = "SET_LOGIN";
export const SET_LOGOUT = "SET_LOGOUT";
export const SET_DATE = "SET_DATE";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SET_PAYMENTS = "SET_PAYMENTS";
export const SET_RESERVATIONS = "SET_RESERVATIONS";
export const SET_USER = "SET_USER";

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

export const setReservations = (reservations) => ({
  type: SET_RESERVATIONS,
  payload: reservations,
});

export const setUserProfile = (user) => ({ type: SET_USER, payload: user });

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(clearError());
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(
          errData.message || "C'è stato un errore nell'effetuare il login"
        );
      }
      const data = await resp.json();
      dispatch(setLogin(data.accessToken, email, password));
      localStorage.setItem("token", data.accessToken);
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const registerUser = (formData) => {
  return async (dispatch) => {
    dispatch(clearError());
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Errore nella registrazione");
      }
      const data = await res.json();

      if (data.accessToken) {
        dispatch(setLogin(data.accessToken, formData.email, formData.password));
        localStorage.setItem("token", data.accessToken);
      }
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Errore nel caricamento delle stanze");

      const data = await res.json();
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Errore nel caricamento dei pagamenti");
      const data = await res.json();
      dispatch(setPayments(data));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};

export const fetchReservations = (date) => {
  return async (dispatch, getState) => {
    dispatch(clearError());
    const token = getState().auth.token;
    if (!token) return;

    try {
      const url = date
        ? `${import.meta.env.VITE_API_URL}/reservations/search?date=${date}`
        : `${import.meta.env.VITE_API_URL}/reservations`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Errore nel caricamento delle prenotazioni");

      const data = await res.json();
      dispatch(setReservations(data));
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Errore nel caricamento del profilo");

      const data = await res.json();
      dispatch(setUserProfile(data));
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
};
