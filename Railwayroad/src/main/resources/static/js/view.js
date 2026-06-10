let grid;
let railwayData = [];

document.addEventListener("DOMContentLoaded", () => {

    loadRailwayData();

    document.querySelector("#btnSearch")?.addEventListener("click", () => {
        loadRailwayData();
    });

});

function loadRailwayData() {

    const region = document.getElementById("region")?.value || "";
    const trainType = document.getElementById("trainType")?.value || "";

    const params = new URLSearchParams();

    if(region){
        params.append("region", region);
    }

    if(trainType){
        params.append("trainType", trainType);
    }

    fetch(`/api/stations?${params.toString()}`)
        .then(res => {

            if(!res.ok){
                throw new Error("데이터 조회 실패");
            }

            return res.json();
        })
        .then(data => {

            railwayData = data;

            //drawGrid(railwayData);
            drawChart(railwayData);

        })
        .catch(err => {

            console.error("철도 데이터 조회 실패", err);

            //drawGrid([]);
            drawChart([]);

        });
}

function drawChart(data) {

    const chartData = data.map(item => {

        let transportCount = 0;

        if(item.highSpeedTrain){
            transportCount++;
        }

        if(item.regularTrain){
            transportCount++;
        }

        if(item.subwayLine){
            transportCount++;
        }

        return {

            stationName: item.stationName,
            transportCount: transportCount

        };
    });

    $("#chartContainer").dxChart({

        dataSource: chartData,

        title: "역별 교통 연계 현황",

        commonSeriesSettings: {

            argumentField: "stationName",
            type: "bar"

        },

        series: [

            {
                valueField: "transportCount",
                name: "교통수단 수"
            }

        ],

        argumentAxis: {

            title: {
                text: "역명"
            }

        },

        valueAxis: {

            min: 0,

            title: {
                text: "연계 교통수단 수"
            }

        },

        legend: {
            visible: false
        },

        tooltip: {

            enabled: true,

            customizeTooltip(arg) {

                return {
                    text:
                        "역명 : " + arg.argument +
                        "<br>교통수단 수 : " + arg.value
                };

            }

        }

    });
}