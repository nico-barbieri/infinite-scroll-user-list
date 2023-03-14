import { useNavigate, useParams } from "react-router-dom";

function UserInfo() {
  const { username } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate('/users')}>Go Back</button>
      <div>User Info of {username}</div>
    </>
  )
}

export default UserInfo
