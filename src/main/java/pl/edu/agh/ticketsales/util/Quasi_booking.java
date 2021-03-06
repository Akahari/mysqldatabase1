package pl.edu.agh.ticketsales.util;

import pl.edu.agh.ticketsales.domain.Seat;
import pl.edu.agh.ticketsales.domain.TicketType;

import java.io.Serializable;
import java.util.Set;

public class Quasi_booking implements Serializable {
    String firstName;
    String lastName;
    Integer screeningId;
    Set<Quasi_seat> seats;

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Integer getScreeningId() {
        return screeningId;
    }
    public Set<Quasi_seat> getSeats() {
        return seats;
    }
}
