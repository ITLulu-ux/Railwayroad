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

    @Transactional(readOnly = true)
    public List<StationDto> getPaged(StationDto filter) {
        //int offset= filter.getPage() * filter.getSize();
        log.info("실행");

        return railwayMapper.selectPaged(filter);
    }

    @Transactional(readOnly = true)
    public int getTotalCount(StationDto filter) {
        List<StationDto> total = railwayMapper.countFiltered(filter);
        return (total == null) ? (List<StationDto>) 0 : total;
    }

    /*@Transactional(readOnly = true)
    public List<String> getAvailableDates() {
        return railwayMapper.selectAvailableDates();
    }*/

    /*@Transactional(readOnly = true)
    public List<StatsResultDto> getStats(StatsSearchDto dto) {
        String type=dto.getType();
        if (type == null || type.isEmpty()) {
            type = "daily";
        }
        if ("daily".equals(type)) {
            return autoMapper.selectDailyStats(dto);
        } else if ("weekly".equals(type)){
            return autoMapper.selectWeeklyStats(dto);
        }else {
            return autoMapper.selectMonthlyStats(dto);
        }
    }*/
}
