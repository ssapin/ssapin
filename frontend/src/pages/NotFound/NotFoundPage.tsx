import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  const moveToMain = () => {
    navigate("/");
  };
  return (
    <div>
      404여기 왜들어옴?
      <button type="button" onClick={moveToMain}>
        매인으로 가라
      </button>
    </div>
  );
}

export default NotFoundPage;
