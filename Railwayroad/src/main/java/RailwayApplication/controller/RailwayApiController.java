package RailwayApplication.controller;

import RailwayApplication.dto.StationDto;
import RailwayApplication.service.RailwayService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RailwayApiController {
    private final RailwayService railwayService;

    @GetMapping("/api/stations")
    public List<StationDto> getStations(StationDto dto){

        return railwayService.getAllStations(dto);
        }
    }

