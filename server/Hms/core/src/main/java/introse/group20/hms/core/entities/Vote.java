package introse.group20.hms.core.entities;

import introse.group20.hms.core.entities.enums.Rating;

import java.util.UUID;

public class Vote {
    public Vote() {
    }

    public Vote(Rating rating, String content) {
        this.rating = rating;
        this.content = content;
    }

    private UUID id;
    private Rating rating;
    private String content;
    private Patient patient;
    private Doctor doctor;
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
}
