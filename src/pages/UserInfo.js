import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";

const UserInfo = () => {
  const { username } = useParams();
  const { users } = useSelector((state) => state.users);

  const navigate = useNavigate();

  //retrieve stored user if present
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  //try to set current user
  const currentUser =
    (storedUser?.login?.username === username && storedUser) ||
    users.find((user) => user.login.username === username);

  //return not found page if currentUser is null
  if (!currentUser) return <NotFound />;

  //if current user is present, store in the localStorage
  if (currentUser)
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

  //if we are here, current user is present and we can do destructuring
  const {
    gender,
    name,
    location,
    email,
    login,
    dob,
    registered,
    phone,
    cell,
    id,
    picture,
    nat,
  } = currentUser;

  return (
    <div className="page-container">
      <div className="user-info-header">
        <div>
          {currentUser.name.first} {currentUser.name.last}'s personal
          informations
        </div>
        <button onClick={() => navigate("/users")}>Go Back</button>
      </div>
      <div className="user-info-card">
        <div className="card-header">
          <h2>
            {name.title} {name.first}
            <br />
            {name.last}
          </h2>
          <div className="user-propic-wrapper">
            <img
              src={picture.large}
              alt={`${name.first} ${name.last} propic`}
            />
          </div>
        </div>
        <div className="card-body">
          <div className="contact card-body-section">
            <h3>Contacts:</h3>
            <p>
              <span>Email</span> • {email}
            </p>
            <p>
              <span>Phone</span> • {phone}
            </p>
            <p>
              <span>Cell</span> • {cell}
            </p>
          </div>

          <div className="map card-body-section">
            <h3>Address:</h3>
            <p>
              {location.street.number} {location.street.name}, {location.city}
            </p>
            <p>
              {location.state}, {location.country}
            </p>
            <p>
              <span>Nationality</span> • {nat}
            </p>
          </div>

          <div className="date card-body-section">
            <h3>Birth:</h3>
            <p>
              <span>Date of Birth</span> •{" "}
              {new Date(dob.date).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>
              <span>Age</span> • {dob.age}
            </p>
            <p>
              <span>Gender</span> • {gender}
            </p>
          </div>
          <div className="account card-body-section">
            <h3>Account:</h3>
            <p className="username">@{login.username}</p>
            <p>
              <span>Registration Date</span> •{" "}
              {new Date(registered.date).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>
              <span>ID</span> • {id.value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
