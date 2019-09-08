import React from 'react';
import * as axios from 'axios';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withRouter} from "react-router-dom";

const styles = {
    container: {
        height: '100%'
    },
    link: {
        flex: 1,
        margin: 10
    }
};

class AdminMoviesEdit extends React.Component {
    state = {
        movies: [],
        error: null
    };
    edit = (movieId) => {
        const {history} = this.props;
        console.log("You pushed edit button :)");
        history.push(`/admin/movies/edit/${movieId}`);
    };
    remove = (movieId) => {
        const {history} = this.props;
        console.log("You pushed remove button :)");
        axios.post(`/movie/remove/${movieId}`).then(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
            }
        );
    history.push('/admin/movies');
    };

    componentDidMount() {
        axios.get('/movie/all').then(
            response => {
                console.log(response);
                this.setState({movies: response.data});
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
            });
            console.log(this.state);
    }

    render() {
        if(this.state.error) {
            return (
                <div style={styles.container}>
                    {this.state.error}
                </div>
            )
        }
        return (
            <div style={styles.container}>
                <Link to={"/admin/movies"} style={styles.link}>Exit</Link>
                <table>
                    <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Duration</th>
                        <th>Description</th>
                        <th>Cast</th>
                        <th>Directors</th>
                        <th>Tags</th>
                        <th>Link</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                    {
                        this.state.movies.map(movie => (
                            <tr>
                                <td>{movie.title}</td>
                                <td>{movie.duration}</td>
                                <td>{movie.description}</td>
                                <td>{movie.cast.join(", ")}</td>
                                <td>{movie.directors.join(", ")}</td>
                                <td>{movie.tags.join(", ")}</td>
                                <td><Link to={`/movies/${movie.id}`}>Open</Link></td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.edit(movie.id)}
                                    >
                                        Edit
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.remove(movie.id)}
                                    >
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AdminMoviesEdit;