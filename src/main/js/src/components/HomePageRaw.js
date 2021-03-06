import React from 'react';
import * as axios from 'axios';
import {Link} from 'react-router-dom';

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

class HomePage extends React.Component {

    render() {
        return (
            <div style={styles.container}>
                <Link to="/login" style={styles.link}>Login as admin</Link>
                <Link to="/movies" style={styles.link}>Movies</Link>
                <Link to="/theaters" style={styles.link}>Theaters</Link>
                <p>---------</p>
                <Link to="/halls" style={styles.link}>Halls</Link>
                <Link to="/screenings" style={styles.link}>Screenings</Link>
            </div>
        );
    }
}

export default HomePage;

