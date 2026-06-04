package RailwayApplication.mapper;

import RailwayApplication.dto.StationDto;

import RailwayApplication.service.RailwayService;

import java.util.List;

public interface RailwayMapper {
    List<StationDto> selectPaged(StationDto dto);

    List<StationDto> countFiltered(StationDto dto);
}
