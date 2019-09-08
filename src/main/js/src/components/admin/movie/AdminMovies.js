import React from 'react';
import {Link} from 'react-router-dom';
import * as axios from 'axios';

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        padding: 10
    },
    link: {
        flex: 1,
        margin: 10
    }
};

class AdminMovies extends React.Component {

    render() {
        return (
            <div style={styles.container}>
                <p>Welcome to admin view</p>
                <Link to={"/admin/movies/add"} style={styles.link}>Add</Link>
                <Link to={"/admin/movies/overview"} style={styles.link}>Edit/Remove</Link>
                <Link to={"/admin"} style={styles.link}>Back</Link>
            </div>
        );
    }
}

export default AdminMovies;
