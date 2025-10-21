import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import BackBtn from "./BackBtn";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  updateUserAvatar,
  updateUserProfile,
  clearError,
} from "../redux/actions";

const Profile = () => {
  const dispatch = useDispatch();
  const fileInput = useRef(null);

  const user = useSelector((state) => state.user.user);
  const globalError = useSelector((state) => state.error?.message); // se hai un reducer error
  // fallback in caso non avessi uno slice error
  const errorMsg = globalError || null;

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [localMsg, setLocalMsg] = useState(null);

  // form state
  const initial = useMemo(
    () => ({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    }),
    [user]
  );

  const [form, setForm] = useState(initial);

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <h3>⚠ Nessun utente loggato</h3>
      </Container>
    );
  }

  const handleAvatarClick = () => {
    fileInput.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Il file è troppo grande! Max 2MB.");
        return;
      }
      dispatch(updateUserAvatar(user.id, file));
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onCancel = () => {
    setForm(initial);
    setEditMode(false);
    setLocalMsg(null);
    dispatch(clearError());
  };

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setLocalMsg(null);
    dispatch(clearError());

    if (!form.firstName?.trim() || !form.lastName?.trim()) {
      setSaving(false);
      setLocalMsg("Nome e Cognome sono obbligatori.");
      return;
    }
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      setSaving(false);
      setLocalMsg("Email non valida.");
      return;
    }
    if (form.phone && form.phone.length > 20) {
      setSaving(false);
      setLocalMsg("Telefono troppo lungo.");
      return;
    }

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone?.trim() || null,
    };

    const ok = await dispatch(updateUserProfile(user.id, payload));
    setSaving(false);

    if (ok) {
      setLocalMsg("Profilo aggiornato con successo ✅");
      setEditMode(false);
    } else {
      setLocalMsg(null);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4 shadow new-dark text-light rounded-3">
            <div className="d-flex align-items-center mb-4">
              <Image
                src={user.avatarUrl}
                roundedCircle
                height="100"
                width="100"
                className="me-3 border border-3 border-light"
                onClick={handleAvatarClick}
                style={{ cursor: "pointer", objectFit: "cover" }}
                alt="Avatar utente"
              />
              <Form.Control
                type="file"
                accept="image/*"
                ref={fileInput}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div className="flex-grow-1">
                <h4 className="mb-1">
                  {user.firstName} {user.lastName}
                </h4>
                <span className="badge bg-info text-dark">{user.role}</span>
              </div>

              {!editMode ? (
                <Button
                  variant="warning"
                  className="ms-3"
                  onClick={() => setEditMode(true)}
                >
                  Modifica
                </Button>
              ) : (
                <div className="d-flex gap-2 ms-3">
                  <Button
                    variant="secondary"
                    onClick={onCancel}
                    disabled={saving}
                  >
                    Annulla
                  </Button>
                  <Button variant="success" onClick={onSave} disabled={saving}>
                    {saving ? (
                      <>
                        <Spinner
                          size="sm"
                          animation="border"
                          className="me-2"
                        />
                        Salvataggio...
                      </>
                    ) : (
                      "Salva"
                    )}
                  </Button>
                </div>
              )}
            </div>

            {(localMsg || errorMsg) && (
              <Alert variant={errorMsg ? "danger" : "success"} className="py-2">
                {errorMsg || localMsg}
              </Alert>
            )}

            <Card.Body>
              <Form onSubmit={onSave}>
                <Row className="mb-3">
                  <Col sm={4}>
                    <strong>Nome:</strong>
                  </Col>
                  <Col sm={8}>
                    {!editMode ? (
                      user.firstName
                    ) : (
                      <Form.Control
                        name="firstName"
                        value={form.firstName}
                        onChange={onChange}
                        required
                      />
                    )}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm={4}>
                    <strong>Cognome:</strong>
                  </Col>
                  <Col sm={8}>
                    {!editMode ? (
                      user.lastName
                    ) : (
                      <Form.Control
                        name="lastName"
                        value={form.lastName}
                        onChange={onChange}
                        required
                      />
                    )}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm={4}>
                    <strong>Email:</strong>
                  </Col>
                  <Col sm={8}>
                    {!editMode ? (
                      user.email
                    ) : (
                      <Form.Control
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                      />
                    )}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm={4}>
                    <strong>Telefono:</strong>
                  </Col>
                  <Col sm={8}>
                    {!editMode ? (
                      user.phone || "-"
                    ) : (
                      <Form.Control
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        placeholder="Es. +39 333 1234567"
                      />
                    )}
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Row className="mt-3">
          <Col className="d-flex justify-content-center">
            <BackBtn />
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default Profile;
