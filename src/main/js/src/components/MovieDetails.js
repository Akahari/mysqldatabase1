import React from 'react';
import * as axios from 'axios';

const styles = {
    container: {
        height: '100%'
    }
};

class MovieDetails extends React.Component {
    state = {
        movies: [],
        error: null
    };

    render() {
        const {movieId} = this.props.match.params;
        if(this.state.error) {
            return (
                <div style={styles.container}>
                    {this.state.error}
                </div>
            )
        }
        return (
            <div style={styles.container}>
                Movie Details
                <p>{movieId}</p>
            </div>
        );
    }
}

export default MovieDetails;
