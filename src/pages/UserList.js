import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ReactComponent as SendMessage } from "../res/icons/message.svg";
import { ReactComponent as UserInfo } from "../res/icons/user-info.svg";

const UserList = () => {
  const [page, setPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(50);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://randomuser.me/api/?page=${page}&results=${usersPerPage}&seed=123456789`
      );
      setUsers((users) => [...users, ...response.data.results]);
      setError(null);
    } catch (error) {
      console.log("An error occurred");
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const userList = users.map((user) => (
    <div key={user.login.uuid} className="user-card">
      <div className="user-propic-wrapper">
        <img
          src={user.picture.large}
          alt={`${user.login.username} profile pic`}
        />
      </div>
      <div className="user-info">
        <h4 className="user-name">
          {user.name.first} {user.name.last}
        </h4>
        <p className="user-username">{user.login.username}</p>
      </div>
      <div className="user-cta">
        <a href={`mailto:${user.email}`} className="user-email">
          <SendMessage />
        </a>
        <button onClick={() => navigate(`/users/${user.login.username}`)}>
          <UserInfo />
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="user-cards">{userList}</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <button onClick={handleLoadMore}>Load More Users</button>
      )}
    </div>
  );
};

export default UserList;
