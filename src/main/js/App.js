import React from 'react';
import ReactDOM from 'react-dom';
import * as axios from 'axios';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Screenings from './src/components/Screenings';
import Halls from './src/components/Halls';
import Theaters from './src/components/Theaters';
import HomePage from './src/components/HomePage';
import Movies from './src/components/Movies';
import MovieDetails from './src/components/MovieDetails';

import LoginPage from './src/components/LoginPage';
import AdminHomePage from './src/components/admin/AdminHomePage';

import AdminHalls from './src/components/admin/hall/AdminHalls';
import AdminHallsAdd from './src/components/admin/hall/AdminHallsAdd';
import AdminHallsEdit from './src/components/admin/hall/AdminHallsEdit';

import AdminMovies from './src/components/admin/movie/AdminMovies';
import AdminMoviesAdd from './src/components/admin/movie/AdminMoviesAdd';
import AdminMoviesEdit from './src/components/admin/movie/AdminMoviesEdit';

import AdminScreenings from './src/components/admin/screening/AdminScreenings';
import AdminScreeningsAdd from './src/components/admin/screening/AdminScreeningsAdd';
import AdminScreeningsEdit from './src/components/admin/screening/AdminScreeningsEdit';

import AdminTheaters from './src/components/admin/theater/AdminTheaters';
import AdminTheatersAdd from './src/components/admin/theater/AdminTheatersAdd';
import AdminTheatersEdit from './src/components/admin/theater/AdminTheatersEdit';

const styles = {
    grid: {
        minHeight: 700,
        minWidth: 1100,
        height: '100%'
    },
    container: {
        height: '100%',
        backgroundColor: 'white'
    }
};

class App extends React.Component {

    componentDidMount() {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Accept'] = 'application/json';
        axios.defaults.baseURL = 'http://localhost:8080/api';
    }

    render() {
        return (
            <div style={styles.container}>
                <Router>
                    <div style={styles.container}>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/admin" component={AdminHomePage}/>

                        <Route exact path="/movies" component={Movies}/>
                        <Route path="/movies/:movieId" component={MovieDetails}/>
                        <Route exact path="/halls" component={Halls}/>
                        <Route exact path="/screenings" component={Screenings}/>
                        <Route exact path="/theaters" component={Theaters}/>

                        <Route exact path="/admin/theaters" component={AdminTheaters}/>
                        <Route exact path="/admin/theaters/add" component={AdminTheatersAdd}/>
                        <Route exact path="/admin/theaters/edit" component={AdminTheatersEdit}/>

                        <Route exact path="/admin/movies" component={AdminMovies}/>
                        <Route exact path="/admin/movies/add" component={AdminMoviesAdd}/>
                        <Route exact path="/admin/movies/edit" component={AdminMoviesEdit}/>

                        <Route exact path="/admin/halls" component={AdminHalls}/>
                        <Route exact path="/admin/halls/add" component={AdminHallsAdd}/>
                        <Route exact path="/admin/halls/edit" component={AdminHallsEdit}/>

                        <Route exact path="/admin/screenings" component={AdminScreenings}/>
                        <Route exact path="/admin/screenings/add" component={AdminScreeningsAdd}/>
                        <Route exact path="/admin/screenings/edit" component={AdminScreeningsEdit}/>
                        <Route component={() => <Redirect to="/"/>}/>
                    </div>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('react'));
