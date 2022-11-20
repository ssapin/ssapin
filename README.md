###

<div align="center">
<img align="center" src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa879f386-de37-48d1-a149-06190fe24c5f%2Fnotion_%25EA%25B0%2580%25EC%259D%2584_%25ED%2591%259C%25EC%25A7%2580.png?table=block&id=9ab287af-8b1b-4226-9245-74edef1017be&spaceId=70212d7a-cf4e-4637-9c1c-d9387abe4d14&width=1780&userId=721c2187-3c34-4657-8dfe-1e18670710c8&cache=v2" width="800" />  
</div>
<div align="left">
    <h1 align="left">
      <font align="left" size="6" color="#ffffff"> 📌 SSAPIN[싸핀] </font>
    </h1>
  </div>

### 목차

1. [**웹 서비스 소개**](#1)
1. [**버전 기록**](#2)
1. [**기술 스택**](#3)
1. [**주요 기능**](#4)
1. [**프로젝트 구성도**](#5)
1. [**데모 영상**](#6)
1. [**개발 팀 소개**](#7)
1. [**개발 기간 및 일정**](#8)
1. [**실행 방법**](#9)
<hr />

<div id="1"></div>

## 📌 웹 서비스 소개

### **싸피생들이 함께 만들어가는 지도 큐레이팅 서비스, SSAPIN** ✈️

> 취향부터 장소, 시간까지 너무 많은 것을 고려하다가 결국 **같은 곳**을 찾아가시나요? 🚶🏻‍♀️🚶🏻
>
> 오프라인을 통해 새로운 지역을 탐험해야하나요? 
>
> 이제는 **SSAPIN, 싸핀**에서 쉽고 빠르게 장소를 찾고 추천해보세요 ! 📌

<br />

<div id="2"></div>

## 📌 버전 기록

|   버전   | <div align="center">업데이트 내용</div>         | 업데이트 날짜 |
| :------: | ----------------------------------------------- | ------------- |
| `v1.3.0` | 메인페이지 코드 리팩토링 <br /> 스켈레톤 UI 적용 <br /> intersectionObserver API 적용으로 view에 보이지 않는 컴포넌트 데이터 요청 x <br /> 지도찾기 스켈레톤 UI 적용 <br /> 모여지도 장소 수정 시 기존의 장소가 지도에서 보이던 버그 <br /> 맵랭킹을 장소가 많이 찍힌 지도순이 아니라 찜이 많이 된 지도 순으로 변경  | 22.11.20      |
| `v1.2.0` | 웹 전근성 개선 <br /> 프론트엔드 메인페이지 리렌더 이슈 <br /> 로딩 컴포넌트 video tag로 변경 <br /> 로고 width, height 고정 <br /> 닉네임 글자제한 추가 | 22.11.18      |
| `v1.1.0` | 닉네임 중복확인 시 특수문자가 포함 되지 않은 채 검사를 하는 현상을 해결 <br /> 지도에 찍힌 장소의 위치가 미세하게 오차가 있는 문제점을 해결 <br /> 추천지도 카드에 참여자수 대신 찜 개수로 변경 | 22.11.16     |
| `v1.0.1` | 부울경 캠퍼스 장소 추가 시 지명 부울경으로 인해 검색이 되지 않는 문제 해결 <br /> 싸피 캠퍼스 마커 오버레이 색상 및 이미지 변경 <br /> 비로그인일 때 장소추가 버튼을 누르면 로그인창과 장소추가 모달이 함께 뜨는 이슈 <br /> 장소 수정 시 장소 추가 권한 가능하도록 변경 <br /> 지도 추가 모달 및 페이지 이모지 입력란에 한글 입력시 밸리데이션 통과 에러 <br /> 지도 오버레이 글꼴 지정 <br /> 탑버튼 스크롤 이벤트 (스크롤 내릴때만 나타남) <br /> 마이페이지 유효성 검사 <br /> 마이페이지 userdetailCard 글씨크기 작게 + 왼쪽정렬(pc 포함) <br /> PlaceCard 제목이 길 때 삭제 버튼 사라지는 버그 수정 <br /> 북마크시 계속해서 mapRefetch 되는 버그 수정 | 22.11.15     |
| `v1.0.0` | ssapin.com 서비스 오픈                           | 22.11.14      |

<br />
<div id="3"></div>

## 🛠 기술 스택

<table align="center">
  <tr>
    <td align="center" width="165"><strong>Front-end 기술 스택</strong></td>
    <td>
      <div>
        <img src="https://img.shields.io/badge/TypeScript-3178C6?&logo=typescript&logoColor=white"/>
        <img src="https://img.shields.io/badge/React-61DAFB?style=  &logo=react&logoColor=white"/>
        <img src="https://img.shields.io/badge/Recoil-212121?style=  &logo=Recoil&logoColor=white"/>
        <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=  &logo=ReactQuery&logoColor=white"/>
        <img src="https://img.shields.io/badge/Emotion-C865B9?style=  &logo=Emotion&logoColor=white"/>
        <img src="https://img.shields.io/badge/Axios-5A29E4?style=&logo=Axios&logoColor=white"/>
      </div>
    </td>
  </tr>
  <tr>
    <td align="center" width="165"><strong>Back-end 기술 스택</strong></td>
    <td>
        <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=  &logo=springboot&logoColor=white"/>
        <img src="https://img.shields.io/badge/MySQL-4479A1?style=  &logo=mysql&logoColor=white"/>
        <img src="https://img.shields.io/badge/JPA-212121?style=  &logo=jpa&logoColor=white"/>
    </td>
  </tr>
  <tr>
    <td align="center" width="165"><strong>Server 기술 스택</strong></td>
    <td>
        <img src="https://img.shields.io/badge/NGINX-009639?style=  &logo=nginx&logoColor=white"/>
        <img src="https://img.shields.io/badge/Docker-2496ED?style=  &logo=docker&logoColor=white"/>
        <img src="https://img.shields.io/badge/Jenkins-D24939?style=  &logo=jenkins&logoColor=white"/>
        <img src="https://img.shields.io/badge/AmazonAWS-232F3E?style=  &logo=amazonaws&logoColor=white"/>
    </div>
  </tr>
  <tr>
    <td align="center"><strong>배포</strong></td>
    <td>
      <a href="https://ssapin.com" target="_blank">
        📌 SSAPIN[싸핀]
      </a>
    </td>
  </tr>
  <tr>
    <td align="center"><strong>이용가이드</strong></td>
    <td>
      <a href="https://positive-gambler-f01.notion.site/SSAPIN-9ab287af8b1b4226924574edef1017be">
        ⚙️ 이용가이드
      </a>
    </td>
  </tr>
    <tr>
    <td align="center"><strong>노션</strong></td>
    <td>
      <a href="https://sly-hexagon-e43.notion.site/SSAPIN-A307-7a6bc90d0e8c4828981d7ddc37d9d6bb">
        👉 노션 바로가기
      </a>
    </td>
  </tr>
<table>
<br />
<div id="4"></div>

## 💡 주요 기능

<table align="center">
<thead>
  <tr>
    <td align="center"><strong>화면</strong></th>
    <td align="center"><strong>기능</strong></th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img src="" width=250/>
      </td>
      <td>
        <b>추천지도</b>
        <div>사용자가 원하는 테마의 지도를 직접 제작하여 공유하고 설정에 따라 혼자 찍거나 다른 사용자들이 같이 찍을 수 있습니다.</div>
      </td>
    </tr>
    <tr>
      <td>
        <img src="" width=250/>
      </td>
      <td>
        <b>모여지도</b>
        <div>지정된 주제에 따라 사용자가 자신만의 베스트 장소, 딱 한 곳만 찍는 지도 입니다.</div>
      </td>
    </tr>
    <tr>
      <td>
        <img src="" width=250/>
      </td>
      <td>
        <b>장소 추가</b>
        <div>원하는 지도에 자신이 추천하고 싶은 장소를 추가할 수 있습니다. 이 때, 리뷰 작성은 선택입니다.</div>
      </td>
    </tr>
    <tr>
      <td>
        <img src="" width=250/>
      </td>
      <td>
        <b>리뷰 추가</b>
        <div>장소 상세 모달에서 해당 장소에 대한 한줄평 리뷰를 작성할 수 있습니다.</div>
      </td>
    </tr>
    <tr>
      <td>
        <img src="" width=250/>
      </td>
      <td>
        <b>카톡 공유</b>
        <div>추천지도나 장소를 카톡을 통해 공유할 수 있습니다.</div>
      </td>
    </tr>
    <tr>
      <td>
        <img src="" width=250/>
      </td>
      <td>
        <b>북마크</b>
        <div>추천지도나 장소를 북마크하여 언제든 다시 볼 수 있습니다.</div>
      </td>
    </tr>
  </tbody>
<table>
<br />
<div id="5"></div>

## 📂 프로젝트 구성도

|                                               <div align="center">아키텍쳐(Archtecture)</div>                                                |
| :------------------------------------------------------------------------------------------------------------------------------------------: |
|        <img src="https://user-images.githubusercontent.com/63248831/202904662-b774b2ad-80eb-426e-9c90-b0e7733bc585.png" width="700"/>        |
|                                                           **개체-관계 모델 (ERD)**                                                           |
| <img src="https://user-images.githubusercontent.com/63248831/202904691-d4aabe9e-1d94-4e5b-9702-cbcac9745d41.png" width="600" height="500" /> |

<br />
<div id="6"></div>

## 🎥 데모 영상

<table align="center">
<thead>
  <tr>
    <td align="center"><strong>UCC 영상</strong></th>
    <td align="center"><strong>시연 영상</strong></th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      <a href="https://youtu.be/FQOTbVC1RZw" target="_blank">
        <img src="https://user-images.githubusercontent.com/63248831/202905596-1bfaa947-9d54-4267-9e36-21041578e049.png" width=400 height=240/>
      </a>
    </td>
    <td>
      <a href="https://youtu.be/ttVSXWWSRlU" target="_blank">
        <img src="https://user-images.githubusercontent.com/63248831/202905634-37e6b337-fb46-411d-8fa5-e6677e986a66.png" width=400 height=240/>
      </a>
    </td>
  </tr>
  </tbody>
<table>
<br />
<div id="7"></div>

## 👨‍👩‍👧‍👦 개발 팀 소개

<table>
  <tr>
    <td align="center" width="150px">
      <a href="https://github.com/Zyeon" target="_blank">
        <img src="https://github.com/Zyeon.png" alt="유지연 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/Eunyeol-Lucas" target="_blank">
        <img src="https://github.com/Eunyeol-Lucas.png" alt="남은열 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/Binzify" target="_blank">
        <img src="https://github.com/Binzify.png" alt="임상빈 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/jiwon0297" target="_blank">
        <img src="https://github.com/jiwon0297.png" alt="박지원 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/hyunklee" target="_blank">
        <img src="https://github.com/hyunklee.png" alt="이현규 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/hseol" target="_blank">
        <img src="https://github.com/hseol.png" alt="허설 프로필" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/Jo-wonbin" target="_blank">
        유지연<br />(Front-end &<br /> 팀장)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Eunyeol-Lucas" target="_blank">
        남은열<br />(Front-end)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Binzify" target="_blank">
        임상빈<br />(Front-end)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/jiwon0297" target="_blank">
        박지원<br />(Back-end)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/hyunklee" target="_blank">
        이현규<br />(Back-end)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/hseol">
        허설<br />(Back-end)
      </a>
    </td>
  </tr>
</table>

|  이름  |          역할          | <div align="center">개발 내용</div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :----: | :--------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 유지연 |  Back-end<br />Front-end<br />팀장 |    |
| 남은열 |       Front-end        |  |
| 임상빈 |       Front-end        |  |
| 박지원 | Back-end | **Back-end**<br />- DB 설계<br /> - Map, TogetherMap API 작성<br /> **Front-end**<br /> - 카드/기타 컴포넌트 작성 <br /> - 메인페이지/지도검색페이지 레이아웃 및 기능 연결 <br /> - 장소 상세 모달 기능 연결              |
| 이현규 | Back-end |  |
|  허설  | Back-end | |

<br />
<div id="8"></div>

## 📅 개발 기간

22.10.06. ~ 운영 관리 중

<br />
<div id="9"></div>

## 💻 실행 방법

### Client 실행

1. **원격 저장소 복제**

```bash
$ git clone https://lab.ssafy.com/s07-final/S07P31A307.git
```

2. **프로젝트 폴더로 이동**

```bash
$ cd frontend
```

3. **필요한 node_modules 설치**

```bash
$ yarn install
```

4. **개발 서버 실행**

```bash
$ yarn start
```

<br />

## 🦊 git convention

| Emoji | Code                          | 기능     | Description              |
| ----- | ----------------------------- | -------- | ------------------------ |
| ✨    | `:sparkles:`                  | Feat     | 새 기능                  |
| ♻️    | `:recycle:`                   | Refactor | 코드 리팩토링            |
| 🔧    | `:wrench:`                    | Chore    | 리소스 수정/삭제         |
| 🐛    | `:bug:`                       | Fix      | 버그 수정                |
| 📝    | `:memo:`                      | Docs     | 문서 추가/수정           |
| 💄    | `:lipstick:`                  | Style    | UI/스타일 파일 추가/수정 |
| 🎉    | `:tada:`                      | Init     | 프로젝트 시작 / Init     |
| ✅    | `:white_check_mark:`          | Test     | 테스트 추가/수정         |
| ⏪    | `:rewind:`                    | Rewind   | 변경 사항 되돌리기       |
| 🔀    | `:twisted_rightwards_arrows:` | Merge    | 브랜치 합병              |
| 🗃     | `:card_file_box:`             | DB       | 데이터베이스 관련 수정   |
| 💡    | `:bulb:`                      | Comment  | 주석 추가/수정           |
| 🚀    | `:rocket:`                    | Deploy   | 배포                     |


## git flow

<img src="https://user-images.githubusercontent.com/82889580/197453665-7e77f069-647f-42bc-bf40-688b5764d7d7.png" width="500" />
