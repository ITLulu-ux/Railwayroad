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

            drawGrid(railwayData);
            //drawChart(railwayData);

        })
        .catch(err => {

            console.error("철도 데이터 조회 실패", err);

            drawGrid([]);
            //drawChart([]);

        });
}
function drawGrid(data) {

    if(grid){
        grid.dispose();
    }

    grid = $("#gridContainer").dxDataGrid({

        dataSource: data,

        keyExpr: "stationId",

        showBorders: true,
        columnAutoWidth: true,

        searchPanel: {
            visible: true,
            width: 250,
            placeholder: "역 검색"
        },

        filterRow: {
            visible: true
        },

        paging: {
            enabled: true,
            pageSize: 10
        },

        pager: {
            visible: true,
            showPageSizeSelector: true,
            allowedPageSizes: [10, 20, 50],
            showInfo: true
        },

        columns: [

            {
                dataField: "stationId",
                caption: "번호",
                width: 80
            },

            {
                dataField: "stationName",
                caption: "역명"
            },

            {
                dataField: "region",
                caption: "지역"
            },

            {
                dataField: "highSpeedTrain",
                caption: "고속열차"
            },

            {
                dataField: "regularTrain",
                caption: "일반열차"
            },

            {
                dataField: "subwayLine",
                caption: "지하철"
            }

        ]

    }).dxDataGrid("instance");
}