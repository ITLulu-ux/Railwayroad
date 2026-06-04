package com.myapp.traffic;

import com.myapp.traffic.client.TrafficApiClient;
import com.myapp.traffic.service.ListService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

//import static org.hamcrest.MatcherAssert.assertThat;

@SpringBootTest
public class ListTest {

    @Autowired
    private ListService listService;

    @Autowired
    private TrafficApiClient trafficApiClient;

    @Test
    void testfetchTrafficData() {
        var trafficList = trafficApiClient.fetchTrafficData();
        System.out.println("받아올 데이터 수: " + trafficList.size());
        assertThat(trafficList).isNotNull();
        assertThat(trafficList).isNotEmpty();
        var first = trafficList.get(0);
        System.out.println("첫 번째 데이터: " + first.getTcsName() + "," + first.getTrafficAmout());
    }

    @Test
    void saveFromApi() {
        listService.saveFromApi();
        var all = listService.list();
        System.out.println("총 데이터 수: " + all.size());
        assertThat(all).isNotEmpty();

        var sample = all.get(0);
        System.out.println("샘플데이터->" + sample.getTmName() +
                "," + sample.getTcsName() +
                "," + sample.getTrafficAmout() +
                "," + sample.getCarType());
    }
}


