package RailwayApplication.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StationDto {
    private Integer stationId;    // 고유아이디
    private String stationName;   // 역 이름
    private String region;        // 서울역이면 서울
    private String highSpeedTrain;   // 고속열차
    private String regularTrain;    // 일반열차
    private String subwayLine;     // 지하철
}
