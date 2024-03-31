package org.jahr.backend.area.service;

import lombok.RequiredArgsConstructor;
import org.jahr.backend.area.model.Area;
import org.jahr.backend.area.repository.AreaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AreaService {
    private final AreaRepository repo;

    public List<Area> getAreas(int locationId) {
        return repo.findAll().stream().filter(el -> el.getLocation().getId() == locationId).map(el -> new Area(el.getId(), el.getName(), el.getLocation())).toList();
    }
}
