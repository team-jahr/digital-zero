package org.jahr.backend.area.controller;

import lombok.RequiredArgsConstructor;
import org.jahr.backend.area.model.Area;
import org.jahr.backend.area.service.AreaService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/areas")
public class AreaController {
    private final AreaService service;
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Area> getAllAreas(@RequestParam int location){
        return service.getAreas(location);
    }
}
