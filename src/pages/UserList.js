import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [page, setPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(50)
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://randomuser.me/api/?page=${page}&results=${usersPerPage}&seed=123456789`);
            setUsers(users => [...users, ...response.data.results]);
            setError(null);
        } catch (error) {
            console.log('An error occurred')
            setError(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const userList = users.map(user => (
        <div key={user.login.uuid} className='user-card'>
            <h4 className='user-username'>{user.login.username}</h4>
            <div className='user-propic-wrapper'>
                <img src={user.picture.large} alt={`${user.login.username} profile pic`} />
            </div>
            <div className='user-info'>
                <p className='user-name'>{user.name.first} {user.name.last}</p>
                <a href={`mailto:${user.email}`} className='user-email'>{user.email}</a>
            </div>
            <button onClick={() => navigate(`/users/${user.login.username}`)}>Go to user page</button>
        </div>
    ))

    return (
        <div>
            <div className='user-cards'>
                {userList}
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && (
                <button onClick={handleLoadMore}>Load More Users</button>
            )}
        </div>
    );
};

export default UserList;