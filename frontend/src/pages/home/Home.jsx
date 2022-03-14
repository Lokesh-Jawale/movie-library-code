import React, {useState, useEffect, useRef} from 'react';
import "./Home.css"
import bg1 from "../../images/bg2.jpg";
import {Search} from "@mui/icons-material";
import MovieCard from '../../components/movieCard/MovieCard';
import Playlist from '../../components/playlist/Playlist.jsx';
import { getUserPlaylists, logoutUser, searchMovies } from '../../utils/apiCalls';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectPlaylists, saveUser, savePlaylists, deleteData } from '../../features/appDataSlice';

function Home() {

	const [searchInput, setSearchInput] = useState("");
	const [movieList, setMovieList] = useState([]);
	const resultsRef = useRef(null);
	const history = useHistory();
	const dispatch = useDispatch();

	const user = useSelector(selectUser);
	const playlists = useSelector(selectPlaylists);
	
	useEffect(() => {
		try {
			const userData = JSON.parse(localStorage.getItem("user"));
			dispatch(saveUser(userData));

			getUserPlaylists(userData?.accessToken, userData?.user?._id)
				.then((res) => {
					dispatch(savePlaylists(res));
				})
				.catch(err => {
					console.log(err);
				})

		} catch (error) {
			console.log(error);
		}
	}, []);
	

	const handleSearch = (e) => {
		e.preventDefault()
		searchMovies(searchInput)
		.then((res) => {
			setMovieList(res)
			resultsRef?.current?.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "start"
			});
		})
		.catch((err) => {
			alert(err)
		})
	}

	const logout = (e) => {
		e.preventDefault();
		logoutUser(user.accessToken, user.user.email)
			.then((res) => {
				dispatch(deleteData());
				localStorage.setItem("user", null);
				alert("User logged out successfully");
			})
			.catch(err => {
				alert("Something went wrong");
				console.log(err);
			})
	}

	const backgroundStyle = {
		backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg1})`,
		backgroundSize: "cover",
		height: "100vh"
	}

	return (
		<div className='home' style={backgroundStyle}>
			
			{/* login or register or logout */}
				{(user?.user?.email) ?
					<div className="home__register">	
						<span className="register__button" onClick={logout}> Logout</span>
					</div>
					:
					<div className="home__register">	
						<span className="register__button" onClick={e => {history.push("/login")}}>Sign In </span>
						<span> | </span>
						<span className="register__button" onClick={e => {history.push("/register")}}> Sign Up</span>
					</div>
				}
			{/* END */}
				
			{/* main content and movie search bar */}
			<div className="home__main__content">
				<h1>Movie Library</h1>
				<p>Explore all kinds of movies and make your own playlist just by logging in</p>
				<form className="home__movie__search" onSubmit={handleSearch}>
					<Search className="search__icon" onClick={handleSearch}/>
					<input className="search__input" type="text" placeholder="Search Movie" value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
				</form>
			</div>
			{/* END */}

			{/* user playlists */}
			{(playlists?.length > 0) ? 
				<h2 className="user__playlist"> {user?.user?.email}'s playlists : </h2>
				: <></>
			}
			{playlists?.map((playlist, index) => (
				<Playlist props={playlist} key={index}/>
			))}	

			{/* END */}

			{/* user searched movies */}
			{movieList?.length > 0 ?
				<div className="search__results" ref={resultsRef}>
					<h2>Search Results for "{searchInput}" : </h2>
					<div className="search__results__container">
						{movieList?.map((movie, index) => (
							<MovieCard props={movie} key={index}/>
						))}
					</div>
				</div>
			: <></>}
			{/* END */}
		</div>
	)
}

export default Home