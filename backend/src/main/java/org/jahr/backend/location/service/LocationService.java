package org.jahr.backend.location.service;

import lombok.RequiredArgsConstructor;
import org.jahr.backend.location.model.Location;
import org.jahr.backend.location.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository repo;

    public List<Location> getLocations(){
        return repo.findAll();
    }
}
