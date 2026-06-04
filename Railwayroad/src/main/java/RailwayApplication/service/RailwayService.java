package RailwayApplication.service;

import RailwayApplication.dto.StationDto;
import RailwayApplication.mapper.RailwayMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

//import static jdk.internal.jrtfs.JrtFileAttributeView.AttrID.size;

@Service
@Slf4j
@RequiredArgsConstructor
public class RailwayService {
    private final RailwayMapper railwayMapper;

    public List<StationDto> getAllStations(StationDto dto) {

        return railwayMapper.getAllStations(dto);

    }
}
