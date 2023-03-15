import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//redux
import { useDispatch, useSelector } from 'react-redux'
import { startRequest, setUsers, setError } from "../store/userSlice";

//import components
import SearchBar from "../components/SearchBar";

//import svgs
import { ReactComponent as SendMessageIcon } from "../res/icons/message.svg";
import { ReactComponent as UserInfoIcon } from "../res/icons/user-info.svg";
import { ReactComponent as LoaderAnimation } from "../res/icons/loader.svg";

const UserList = () => {
  const { users, error, isLoading } = useSelector((state) => state.users);

  const [page, setPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(50);
  
  const [searchResults, setSearchResults] = useState([]);
  
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const observer = useRef();

  //function to check if the last element is in the viewport
  const lastElement = useCallback(element => {
    //check if the new page is loading to prevent unwanted calls
    if (isLoading) return
    //disconnect from previous observer
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            setPage(page => page + 1)
        }
    })

    //if element is present, observe it
    if (element) observer.current.observe(element);
  }, [isLoading]);


  //DATA FETCHING
  const fetchUsers = async () => {
    dispatch(startRequest());
    try {
      const response = await axios.get(
        `https://randomuser.me/api/?page=${page}&results=${usersPerPage}&seed=123456789`
      );
      dispatch(setUsers([...users, ...response.data.results]))
    } catch (error) {
      console.log("An error occurred");
      dispatch(setError(error));
    }
  };

  //When page value change (incremented) more users are loaded
  useEffect(() => {
    fetchUsers();
  }, [page]);

  //set default searchResult value equal to "unfiltered" users
  useEffect(() => {
    setSearchResults([...users]);
  }, [users]);

  //add an event listener when the component is mounted to dinamically set the margin top of the page, based on navbar and searchbar heights
  useEffect(()=>{
    const adaptTopMargin = () => {
        const navHeight = document.querySelector('header').offsetHeight;
        const searchbarHeight = document.querySelector('.search-section').offsetHeight;
        document.querySelector('.user-cards').style.marginTop = `${navHeight + searchbarHeight}px`   
    }

    adaptTopMargin();
    
    window.addEventListener('resize', adaptTopMargin);

    return () => window.removeEventListener('resize', adaptTopMargin);
  }, [])

  
  const handleSearch = (filtered) => {
    setSearchResults(filtered);
  };

  const userList = searchResults?.map((user, index) => (
    <div
      key={index + user.login.uuid}
      className="user-card"
      ref={index === (users.length - 1) ? lastElement : null}
    >
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
        <p className="user-location">{user.location.country}</p>
      </div>
      <div className="user-cta">
        <a href={`mailto:${user.email}`} className="user-email">
          <SendMessageIcon />
        </a>
        <button onClick={() => navigate(`/users/${user.login.username}`)}>
          <UserInfoIcon />
        </button>
      </div>
    </div>
  ));

  return (
    <div className="page-container">
      <SearchBar users={users} handleSearch={handleSearch} />
      <div className="user-cards">{userList}</div>
      {!isLoading && !searchResults?.length && <p>No user found</p>}
      {isLoading && <div className="loader-container"><LoaderAnimation /></div>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default UserList;
