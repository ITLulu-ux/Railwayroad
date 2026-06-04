package com.myapp.traffic;

import com.myapp.traffic.mapper.TrafficMapper;
import com.myapp.traffic.traffic.Traffic;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@MybatisTest
@AutoConfigureTestDatabase(replace=AutoConfigureTestDatabase.Replace.NONE)
public class TrafficServiceTest {

    @Autowired
    private TrafficMapper trafficMapper; //인터페이스 자리

    @Test
    @DisplayName("TrafficMapper 테스트")
    public void findAllTest() {
        List<Traffic> entities = trafficMapper.selectAll();
        assertThat(entities).isNotNull();
        for (Traffic e : entities) {
            System.out.println("----모두 출력----");
            System.out.println("시간:" + e.getTmName() + "\t" +
                    "구간:" + e.getTcsName() + "\t "+
                    "통행량:" + e.getTrafficAmout() + "\t" +
                    "차종:" + e.getCarType());
            System.out.println("----개수:" + entities.size());
        }
    }

    @Test
    @DisplayName("값으로 조회")
    public void findIDTest() {
        Traffic traffic = trafficMapper.findById(1L);
        assertThat(traffic).isNotNull();
        assertThat(traffic.getId()).isEqualTo(1L);
    }
}


