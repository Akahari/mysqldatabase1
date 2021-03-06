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

class Screenings extends React.Component {
    state = {
        screenings: [],
        error: null
    };

    componentDidMount() {
        axios.get('/screening/all').then(
            response => {
                console.log(response);
                this.setState({screenings: response.data});
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
            });
    }

    buy = (screeningId, rowNumber , rowLength, seatsStatus) => {
        const {history} = this.props;
        //console.log(seatsStatus);   //boolean array
        history.push(
        {
            pathname: '/screenings/declareTickets',
            state: {
              screeningId: screeningId,
              rowLength: rowLength,
              rowNumber: rowNumber,
              seatsStatus: seatsStatus //boolean array
            }
      })
    };


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
                <Link to={"/"} style={styles.link}>Wstecz</Link>
                <table>
                    <tbody>
                    <tr>
                        <th>Id filmu</th>
                        <th>Id kina</th>
                        <th>Id sali</th>
                        <th>Data rozpoczecia</th>
                        <th>Data zakonczenia</th>
                        <th>Czas trwania</th>
                        <th>Pozostalo siedzen:</th>
                        <th>Kup bilety</th>
                    </tr>
                    {
                        this.state.screenings.map(screening => (
                            <tr>
                                <td>{screening.movieId}</td>
                                <td>{screening.theaterId}</td>
                                <td>{screening.hallId}</td>
                                <td>{new Date(screening.startDate).toGMTString()}</td>
                                <td>{new Date(screening.endDate).toGMTString()}</td>
                                <td>{screening.duration}</td>
                                <td>{screening.rows * screening.rowLength - screening.seatsStatus.filter(Boolean).length}</td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.buy(screening.id, screening.rows, screening.rowLength, screening.seatsStatus)}
                                    >
                                        Kup
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

export default Screenings;
