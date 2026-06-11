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

    // 1. 전체 조회 API (필터 없을 때나 초기 로딩용)
    @GetMapping("/api/stations")
    public List<StationDto> getStations(StationDto dto) {
        return railwayService.getAllStations(dto);
    }

    // 2. 필터링 전용 API (그리드의 filterRow나 조건 검색용)
    @GetMapping("/api/stations/filter")
    public List<StationDto> filterStations(StationDto dto) {
        return railwayService.StationFilter(dto);
    }
}

