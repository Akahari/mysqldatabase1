package pl.edu.agh.ticketsales.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.ticketsales.domain.Hall;
import pl.edu.agh.ticketsales.domain.Screening;
import pl.edu.agh.ticketsales.domain.Theater;
import pl.edu.agh.ticketsales.repository.HallRepository;
import pl.edu.agh.ticketsales.repository.ScreeningRepository;
import pl.edu.agh.ticketsales.repository.TheaterRepository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Date;
import java.util.Set;

@Service
public class HallService {
    @Autowired
    private HallRepository hallRepository;
    @Autowired
    private TheaterRepository theaterRepository;
    @Autowired
    private ScreeningRepository screeningRepository;

//add hall
    public void addHall(Hall hall) {
        boolean success = true;
        if(hall.getTheaterId() == null) {
            success = false;
        }
        hallRepository.save(hall);
        if(success){
            hallRepository.save(hall);
            Theater theater = theaterRepository.findById(hall.getTheaterId());
            theater.addHallId(hall.getId());
            theaterRepository.save(theater);

        }
    }

//remove hall
    public void removeHall(Integer id){
        Hall hall = hallRepository.findById(id);
        if(hall.getTheaterId() != 0) {
            Theater theater = theaterRepository.findById(hall.getTheaterId());
            theater.removeHallId(id);
            theaterRepository.save(theater);
        }
        hallRepository.delete(id);
    }

//update hall
    public void updateHall(Integer id, Hall hall) {
        Hall n = hallRepository.findById(id);
        boolean seatsChanged = false;
        if(!n.getName().equals(hall.getName()) && hall.getName() != null) n.setName(hall.getName());
        if(n.getRowsNumber() != hall.getRowsNumber() && hall.getRowsNumber() != 0) {
            n.setRowsNumber(hall.getRowsNumber());
            seatsChanged = true;
        }
        if(n.getRowLength() != hall.getRowLength() && hall.getRowLength() != 0) {
            n.setRowLength(hall.getRowLength());
            seatsChanged = true;
        }
        if(seatsChanged){
            if(!n.getScreeningId().isEmpty()){
                Set<Integer> screeningIds = n.getScreeningId();
                for(Integer screeningId : screeningIds){
                    Screening tempScreening = screeningRepository.findById(screeningId);
                    tempScreening.setHallId(n); //this will reshape current seatsStatus array of a screening
                    screeningRepository.save(tempScreening);
                }
            }
        }
        if(n.getTheaterId() != hall.getTheaterId() && hall.getTheaterId() != 0) {
            Theater theaterOld = theaterRepository.findById(n.getTheaterId());
            Theater theaterNew = theaterRepository.findById(hall.getTheaterId());
            theaterOld.removeHallId(id);
            theaterNew.addHallId(id);
            theaterRepository.save(theaterOld);
            theaterRepository.save(theaterNew);
            n.setTheaterId(hall.getTheaterId());
        }
        hallRepository.save(n);
    }

//assign to theater
    public void assignToTheater(Integer id, Integer theaterId){
        Theater theater = theaterRepository.findById(theaterId);
        Hall hall = hallRepository.findById(id);
        theater.addHallId(id);
        hall.setTheaterId(theaterId);
        theaterRepository.save(theater);
        hallRepository.save(hall);
    }

//find
    public Iterable<Hall> getAll() { return hallRepository.findAll(); }
    public Hall findById(Integer id) { return hallRepository.findById(id); }
    public Hall findByScreeningId(Integer screeningId) { return hallRepository.findByScreeningId(screeningId); }
    public Iterable<Hall> findByTheaterId(Integer theaterId) {return hallRepository.findByTheaterId(theaterId); }

//edit (outdated, use update instead)
    //edit theater Id
    public void editTheaterId(Integer id, Integer theaterId) {
        Hall n = hallRepository.findById(id);
        n.setTheaterId(theaterId);
        hallRepository.save(n);
    }
    //edit number of seats
    public void editRows(Integer id, int rows) {
        Hall n = hallRepository.findById(id);
        n.setRowsNumber(rows);
        hallRepository.save(n);
    }
    public void editRowsLength(Integer id, int rowLength) {
        Hall n = hallRepository.findById(id);
        n.setRowLength(rowLength);
        hallRepository.save(n);
    }
    //edit name
    public void editName(Integer id, String name) {
        Hall n = hallRepository.findById(id);
        n.setName(name);
        hallRepository.save(n);
    }

}
