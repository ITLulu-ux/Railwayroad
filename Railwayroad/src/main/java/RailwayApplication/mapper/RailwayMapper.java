package RailwayApplication.mapper;

import RailwayApplication.dto.StationDto;

import java.util.List;

public interface RailwayMapper {
    List<StationDto> getAllStations(StationDto dto);
    List<StationDto> StationFilter(StationDto dto);
}
