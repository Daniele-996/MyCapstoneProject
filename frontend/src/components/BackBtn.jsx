import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";

const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="dark"
      className="btn-dark-custom m-3"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft className="me-2" />
      Indietro
    </Button>
  );
};

export default BackBtn;
