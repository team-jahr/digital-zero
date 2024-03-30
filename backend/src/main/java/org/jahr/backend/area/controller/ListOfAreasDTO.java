package org.jahr.backend.area.controller;

import org.jahr.backend.area.model.Area;

import java.util.List;

public record ListOfAreasDTO(List<Area> areaList) {
    public static ListOfAreasDTO toListDTO(List<Area> areaList) {
        return new ListOfAreasDTO(areaList);
    }
}
