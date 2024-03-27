package org.jahr.backend.inspection.model;

import org.jahr.backend.area.Area;
import org.jahr.backend.area.AreaRepository;
import org.jahr.backend.inspection.repository.InspectionRepository;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class InspectionTest {

    @Autowired
    private InspectionRepository inspectionsRepo;

    @Autowired
    private AreaRepository areaRepo;

    @Order(0)
    @Test
    void canAddInspection() {
        // Arrange
        int expected = 2;
        Area area = new Area("An area");
        areaRepo.save(area);

        Inspection inspection1 = new Inspection(null,
                                                "yyyy-MM-dd hh:mm",
                                                false,
                                                null,
                                                area);
        inspectionsRepo.save(inspection1);

        Inspection inspection2 = new Inspection(null,
                                                "yyyy-MM-dd hh:mm",
                                                false,
                                                null,
                                                area);
        inspectionsRepo.save(inspection2);

        // Act
        int actual = inspectionsRepo.findAll().size();

        // Assert
        assertEquals(expected, actual);
    }
}