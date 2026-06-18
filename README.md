# Railway Road Migration Project

## 프로젝트 소개

본 프로젝트는 인턴십 기간 중 경험한 Spring Boot, MyBatis, DevExtreme 기반 조회 시스템 구조를 바탕으로 새롭게 재구성한 철도 조회 시스템입니다.

기존 프로젝트는 H2 Database 환경에서 차량, 노선 및 승객 로그 데이터를 조회하는 시스템이었으나, H2 Server 연결이 불가능한 상태가 되어 기존 데이터를 활용할 수 없었습니다.

이에 따라 단순 복원이 아닌 새로운 데이터 모델을 설계하였으며, 실제 철도역, 열차 및 지하철 정보를 기반으로 데이터베이스를 재구성하였습니다.

또한 H2 Database 환경을 MySQL(MariaDB) 환경으로 마이그레이션하고 DevExtreme DataGrid와 dxChart를 활용하여 조회 및 시각화 기능을 개선하였습니다.

---

## 개발 배경

기존 프로젝트를 Clone하여 실행하였으나 H2 Server 연결이 끊어진 상태로 데이터 조회가 불가능하였습니다.

이에 따라 DB 구조를 새롭게 구성하고 기존 기능을 복원하는 과정에서 단순 복원이 아닌 데이터 구조 개선, UI 개선, DevExtreme 기능 확장을 목표로 프로젝트를 진행하였습니다.

### DBMS 변경

* 기존 DBMS : H2 Database
* 변경 DBMS : MySQL
* 개인 노트북 환경에서는 MySQL 설치 문제로 MariaDB 사용
* MySQL과 MariaDB의 높은 호환성을 활용하여 개발 진행
* 학원 PC 환경에서는 MySQL 사용
* application.properties는 MySQL 기준 유지

---

## 기술 스택

### Backend

* Java 17
* Spring Boot
* MyBatis
* Maven

### Frontend

* HTML5
* CSS3
* JavaScript
* jQuery
* Bootstrap
* DevExtreme

### Database

* MySQL
* MariaDB

### Environment

* Windows 11
* IntelliJ IDEA
* Docker

### Version Control

* Git
* GitHub

---

## 데이터베이스 구조

### Stations

철도역 기본 정보 관리

* station_id
* station_name
* region
* region_type

### High Speed Lines

고속열차 정보 관리

* KTX
* SRT

### Regular Lines

일반열차 정보 관리

* 무궁화
* ITX

### Subway Lines

수도권 지하철 및 광역철도 정보 관리

* 1호선
* 4호선
* GTX-A
* 공항철도
* 경의중앙선
* 수인분당선 등

---

## 주요 기능

### 1. 철도 통합 조회

* DevExtreme DataGrid 기반 조회
* 4개 테이블 LEFT JOIN
* 페이지네이션 지원
* 검색 기능 지원
* 권역(수도권/비수도권) 조회 지원

### 2. 철도 상세 분석

* DevExtreme dxChart 활용
* Stacked Bar Chart 시각화
* 역별 교통수단 확보 현황 분석
* 필터와 차트 연동
* Tooltip 제공

### 3. 권역 기반 조회

* 수도권
* 비수도권

권역 데이터를 추가하여 지역별 조회 기능 제공

---

## 마이그레이션 과정

### 구조 개선

* DTO 통합
* Mapper 및 Mapper XML 재구성
* DB 연결 구조 변경
* JavaScript 파일 분리
* HTML 구조 개선

### 화면 개선

* main.html
* list.html
* view.html

3개의 화면으로 역할 분리

### DevExtreme 기능 확장

* FilterRow 적용
* HeaderFilter 적용
* Pagination 적용
* DataGrid + Chart 연동
* Tooltip 기능 추가

---

## 데이터 확장

기존 10개 역 데이터에서 시작하여 전국 주요 철도역을 추가하였습니다.

### 기존

* 서울역
* 용산역
* 수원역
* 대전역
* 익산역
* 동대구역
* 부산역
* 광명역
* 천안아산역
* 오송역

### 추가

* 청량리역
* 영등포역
* 행신역
* 제천역
* 강릉역
* 원주역
* 전주역
* 광주송정역
* 목포역
* 순천역
* 여수엑스포역
* 울산역
* 포항역
* 창원중앙역
* 판교역 등

총 30개 규모의 철도역 데이터셋으로 확장하였습니다.

---

## Docker 실행 시

Docker 컨테이너에서 로컬 MariaDB에 접근하기 위해 spring.datasource.url을 
jdbc:mysql://host.docker.internal:3306/railway_db 로 설정하여 테스트하였습니다.

---

## Docker 적용

Spring Boot 프로젝트를 JAR 파일로 패키징한 후 Docker 이미지로 컨테이너화하였습니다.
초기에는 application.properties의 DB 주소를 localhost로 설정하여 Docker 컨테이너에서 MariaDB 연결에 실패하였습니다. 원인은 Docker 환경에서 localhost가 컨테이너 자신을 의미하기 때문이었으며, 이를 host.docker.internal로 변경하여 로컬 MariaDB와 정상적으로 연동하였습니다.

---

## 프로젝트 회고

본 프로젝트를 통해 단순 CRUD 구현을 넘어 다음과 같은 경험을 얻을 수 있었습니다.

* H2 → MySQL(MariaDB) 마이그레이션
* MyBatis Dynamic SQL 활용
* DevExtreme DataGrid 활용
* DevExtreme Chart 활용
* 데이터 모델링 개선
* UI/UX 개선
* 데이터 시각화 구현

---

### 데이터 출처

본 프로젝트의 철도역, 열차 종류 및 노선 정보는 한국철도공사(KORAIL), 서울교통공사 및 각 철도 운영기관에서 공개하는 정보를 참고하여 학습 및 포트폴리오 목적으로 구성하였습니다.

프로젝트에 사용된 데이터는 실제 운영 정보를 참고하여 직접 구축한 샘플 데이터이며, 실시간 정보 또는 운영기관의 공식 데이터를 제공하지 않습니다.

본 프로젝트는 비상업적 포트폴리오 및 학습 목적으로 제작되었습니다.
