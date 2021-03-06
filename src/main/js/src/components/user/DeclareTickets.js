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
    paper: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        height: '100%'
    },
    form: {
        width: '100%',
        marginTop: 10,
    }
};

class DeclareTickets extends React.Component {
    state = {
        normalAmount: 0,
        reducedAmount: 0,
        kidsAmount: 0,
        ticketsAmount: 0,
        error: null
    };

    componentDidMount() {
            console.log("welcome to tickets declaration");
    }

    next = () => {
        const {history} = this.props;
        const ticketsAmount = this.state.normalAmount + this.state.reducedAmount + this.state.kidsAmount;
        if(ticketsAmount > 0){
            history.push(
            {
                pathname: '/screenings/selectSeats',
                state: {
                    screeningId: this.props.location.state.screeningId,
                    rowLength: this.props.location.state.rowLength,
                    rowNumber: this.props.location.state.rowNumber,
                    seatsStatus: this.props.location.state.seatsStatus,
                    normalAmount: this.state.normalAmount,
                    reducedAmount: this.state.reducedAmount,
                    kidsAmount: this.state.kidsAmount,
                    ticketsAmount: ticketsAmount
                }
            })
        } else {
            console.log("no tickets selected");
        }
    };

    render(){
        if(this.state.error) {
            return (
                <div style={styles.container}>
                    {this.state.error}
                </div>
            )
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div style={styles.container}>
                    <Link to={"/screenings"} style={styles.link}>Wstecz</Link>
                    Placeholder for ticket declaration
                </div>
                <CssBaseline/>
                <div style={styles.paper}>
                    <Typography component="h1" variant="h5">
                        Wybierz bilety
                    </Typography>
                    <form style={styles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="normal"
                            label="Normalny (pelna cena)"
                            name="normal"
                            autoFocus
                            onChange={(event) => this.setState({normalAmount: parseInt(event.target.value, 10)})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="reduced"
                            label="Ulgowy (75% ceny)"
                            name="reduced"
                            onChange={(event) => this.setState({reducedAmount: parseInt(event.target.value, 10)})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="kids"
                            label="Dzieciecy (50% ceny)"
                            name="kids"
                            onChange={(event) => this.setState({kidsAmount: parseInt(event.target.value, 10)})}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.next}
                        >
                            Dalej
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default DeclareTickets;