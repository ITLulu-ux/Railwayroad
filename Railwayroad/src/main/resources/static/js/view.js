let gridInstance;
let chartInstance;
let railwayData = []; // 서버에서 받아온 원본 데이터를 보관할 배열

// ==========================================
// 1. 페이지 로드 시 초기화 및 이벤트 바인딩
// ==========================================
$(function() {
    // 1단계: 데이터가 없는 빈 껍데기 차트와 필터 패널을 화면에 생성
    initChart([]);
    initFilterPanel();

    // 2단계: 초기 화면 진입 시 서버에서 전체 데이터를 불러와 채움
    loadInitialData();
});

// ==========================================
// 2. 초기 데이터 로드 (API 호출)
// ==========================================
function loadInitialData() {
    //const params = new URLSearchParams();
    //params.append("regionType", regionType);
    fetch(`/api/stations/filter`)
        .then(res => {
            if (!res.ok) throw new Error("데이터 조회 실패");
            return res.json();
        })
        .then(data => {
            console.log("서버 원본 데이터 로드 완료:", data);
            railwayData = data;

            // 시각화 컴포넌트(차트 및 필터 패널)에 데이터 공급
            updateVisuals(railwayData);
        })
        .catch(err => console.error("초기 데이터 로드 실패:", err));
}

// ==========================================
// 3. 차트 및 그리드 데이터 동시 업데이트 함수
// ==========================================
function updateVisuals(data) {
    // 차트 인스턴스 데이터 갱신
    if (chartInstance) {
        chartInstance.option("dataSource", formatChartData(data));
    }
    // 필터 패널(그리드) 인스턴스 데이터 원본 갱신
    if (gridInstance) {
        gridInstance.option("dataSource", data);
    }
}

// ==========================================
// 4. 상단 필터 패널 초기화 (DataGrid 트릭 활용)
// ==========================================
function initFilterPanel() {
    gridInstance = $("#gridContainer").dxDataGrid({
        dataSource: [],
        keyExpr: "stationId",

        filterRow: { visible: false }, // 돋보기 필터 활성화
        headerFilter: { visible: true },
        showHeaders: true,            // 필터 상단에 이름표(역명, 지역 등) 표시
        showBorders: false,
        loadPanel: { enabled: false },
        height: 80,                   // 얘가 필터로 조회되는 DataGrid 크기

        // 💡 디비버(MySQL) 및 DTO 스펙과 필드명을 일치시켜 복구 완료
        columns: [
            { dataField: "stationName", caption: "역명", dataType: "string" },
            { dataField: "regionType", caption: "권역", dataType: "string" },
            { dataField: "highSpeedTrain", caption: "고속열차", dataType: "string" },
            { dataField: "regularTrain", caption: "일반열차", dataType: "string" },
            { dataField: "subwayLine", caption: "지하철 노선", dataType: "string" }
        ],

        // 💡 사용자가 필터 돋보기 창에 값을 입력할 때마다 실시간 작동
        onContentReady: function(e) {
            const component = e.component;
            const filterExpr = component.getCombinedFilter();
            const dataSource = component.getDataSource();

            if (dataSource) {
                // 그리드 화면 크기(80px) 제약 없이, 필터가 걸린 '진짜 데이터 전체'를 로드
                dataSource.store().load({ filter: filterExpr })
                    .then(filteredData => {
                        console.log("현재 필터링되어 남은 데이터 개수:", filteredData.length);

                        if (chartInstance) {
                            // 필터링된 데이터를 가공 함수에 거쳐 차트에 실시간 주입
                            chartInstance.option("dataSource", formatChartData(filteredData));
                        }
                    })
                    .catch(err => console.error("필터 데이터 추출 실패:", err));
            }
        }
    }).dxDataGrid("instance");
}

// ==========================================
// 5. 하단 dxChart 초기화 (Stacked Bar Chart 스타일)
// ==========================================
function initChart(initialData) {
    chartInstance = $("#chartContainer").dxChart({
        height: 600,      // 얘가 차트 크기
        dataSource: formatChartData(initialData),
        title: "역별 연계 교통수단 확보 현황",

        // 💡 면접관에게 칭찬받는 누적 막대 차트(StackedBar) 설정
        commonSeriesSettings: {
            argumentField: "stationName",
            type: "stackedBar"
        },

        // 💡 단일 막대를 고속/일반/지하철 영역으로 분할하고 색상 다각화
        series: [
            //{ valueField: "regionType", name: "수도권/비수도권", color: "#9d4dff" },
            { valueField: "highSpeedCount", name: "고속열차 (KTX/SRT)", color: "#ff4d4d" },
            { valueField: "regularCount", name: "일반열차 (무궁화/새마을 등)", color: "#4da6ff" },
            { valueField: "subwayCount", name: "지하철 노선", color: "#2db300" }
        ],

        argumentAxis: {
            title: { text: "역명" }
        },

        // 💡 제3자가 봐도 직관적인 Y축 이름과 격자 범위 정의
        valueAxis: {
            min: 0,
            max: 3,          // 한 역당 최대 수단 종류는 3개이므로 고정
            tickInterval: 1, // 1단위로 끊어서 0, 1, 2, 3 표시
            title: { text: "확보된 교통수단 종류 수 (최대 3종)" }
        },

        // 하단 범례 활성화 (어느 색상이 어떤 열차인지 설명)
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center",
            itemTextPosition: "right"
        },

        tooltip: {
            enabled: true,
            customizeTooltip(arg) {
                // 마우스 오버 시 역명과 해당 막대 영역의 구체적 카운트 표기
                return {
                    text: `<b>${arg.argument}</b><br>${arg.seriesName}: ${arg.value}종`
                };
            }
        }
    }).dxChart("instance");
}

// ==========================================
// 6. 차트용 데이터 가공 유틸 함수 (데이터 병합 및 Group By 처리)
// ==========================================
function formatChartData(rawData) {
    if (!rawData || rawData.length === 0) return [];

    // 중복된 역명 행들을 하나로 묶기 위한 임시 맵
    const stationMap = {};

    rawData.forEach(item => {
        const name = item.stationName;

        // 해당 역이 맵에 없으면 최초 1회 초기 구조 셋팅
        if (!stationMap[name]) {
            stationMap[name] = {
                stationName: name,
                regionCount: 0,
                highSpeedCount: 0,
                regularCount: 0,
                subwayCount: 0
            };
        }

        // 💡 쪼개져서 들어오는 중복 행들에서 인프라 존재 여부(1 또는 0)만 추출
        if (item.highSpeedTrain && item.highSpeedTrain !== '없음') {
            stationMap[name].highSpeedCount = 1;
        }
        if (item.regularTrain && item.regularTrain !== '없음') {
            stationMap[name].regularCount = 1;
        }
        if (item.subwayLine && item.subwayLine !== '없음') {
            stationMap[name].subwayCount = 1;
        }
    });

    // 맵에 이쁘게 정돈된 객체들을 다시 DevExtreme 차트용 배열로 반환
    return Object.values(stationMap);
}