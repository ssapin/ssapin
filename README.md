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

2. [**버전 기록**](#2)

3. [**기술 스택**](#3)

4. [**주요 기능**](#4)

5. [**프로젝트 구성도**](#5)

6. [**데모 영상**](#6)

7. [**특이사항**](#7)

8. [**구글 애널리틱스 통계**](#8)

9. [**개발 팀 소개**](#9)

10. [**개발 기간 및 일정**](#10)

11. [**실행 방법**](#11)

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

|   버전   | <div align="center">업데이트 내용</div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 업데이트 날짜 |
| :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `v1.3.1` | robot.txt, sitemap.xml 추가<br/>웹 접근성 개선을 위한 utton tag aria-label 추가<br/>중복 코드 제거 (navigator, header, footer)<br/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 22.11.24      |
| `v1.3.0` | 메인페이지 코드 리팩토링 <br /> 스켈레톤 UI 적용 <br /> intersectionObserver API 적용으로 view에 보이지 않는 컴포넌트 데이터 요청 x <br /> 지도찾기 스켈레톤 UI 적용 <br /> 모여지도 장소 수정 시 기존의 장소가 지도에서 보이던 버그 <br /> 맵랭킹을 장소가 많이 찍힌 지도순이 아니라 찜이 많이 된 지도 순으로 변경                                                                                                                                                                                                                                                                                                                                          | 22.11.20      |
| `v1.2.0` | 웹 접근성 개선 <br /> 프론트엔드 메인페이지 리렌더 이슈 <br /> 로딩 컴포넌트 video tag로 변경 <br /> 로고 width, height 고정 <br /> 닉네임 글자제한 추가                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 22.11.18      |
| `v1.1.0` | 닉네임 중복확인 시 특수문자가 포함 되지 않은 채 검사를 하는 현상을 해결 <br /> 지도에 찍힌 장소의 위치가 미세하게 오차가 있는 문제점을 해결 <br /> 추천지도 카드에 참여자수 대신 찜 개수로 변경                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 22.11.16      |
| `v1.0.1` | 부울경 캠퍼스 장소 추가 시 지명 부울경으로 인해 검색이 되지 않는 문제 해결 <br /> 싸피 캠퍼스 마커 오버레이 색상 및 이미지 변경 <br /> 비로그인일 때 장소추가 버튼을 누르면 로그인창과 장소추가 모달이 함께 뜨는 이슈 <br /> 장소 수정 시 장소 추가 권한 가능하도록 변경 <br /> 지도 추가 모달 및 페이지 이모지 입력란에 한글 입력시 밸리데이션 통과 에러 <br /> 지도 오버레이 글꼴 지정 <br /> 탑버튼 스크롤 이벤트 (스크롤 내릴때만 나타남) <br /> 마이페이지 유효성 검사 <br /> 마이페이지 userdetailCard 글씨크기 작게 + 왼쪽정렬(pc 포함) <br /> PlaceCard 제목이 길 때 삭제 버튼 사라지는 버그 수정 <br /> 북마크시 계속해서 mapRefetch 되는 버그 수정 | 22.11.15      |
| `v1.0.0` | ssapin.com 서비스 오픈                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 22.11.14      |

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
        <img src="https://img.shields.io/badge/Querydsl-0285C9?style=  &logo=querydsl&logoColor=white"/>
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

| 웹 화면                                                                                                                                                           | 모바일 화면                                                                                                                     | 기능                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/82889580/203583856-5759b215-527f-4369-8bb4-8671e9c6b2af.gif" width="300" />                                   | <img src="https://user-images.githubusercontent.com/82889580/203585692-1b481578-c380-49d5-8b7e-060b0990277a.gif" width="200" /> | **메인**<br/>운영진이 제공하는 미션, 상위 유저, 핫 플레이스, 추천 지도, 모여지도를 확인할 수 있습니다.                                                                                                                                       |
| <img src="https://user-images.githubusercontent.com/82889580/203585732-9aa046ca-eb6d-4b07-a894-02836c903043.gif" width="300" />                                   | <img src="https://user-images.githubusercontent.com/82889580/203588064-16834099-5d72-45de-9870-ee7bdec17b86.gif" width="200" /> | **회원가입 및 로그인**<br/>카카오 소셜 로그인을 통해 서비스에 가입할 수 있습니다.<br/>회원가입 후 마이페이지로 이동하며 이모지, 별명, 소속 캠퍼스를 변경할 수 있습니다.                                                                      |
| <img src="https://user-images.githubusercontent.com/82889580/203588943-542bbde7-2d7b-4ae6-8ee7-891a1ef6890c.gif" width="300" />                                   | <img src="https://user-images.githubusercontent.com/82889580/203588783-8e3c3748-3f5f-4594-b611-86e5c881ebfc.gif" width="200" /> | **모여지도**<br/>지정된 주제에 따라 사용자가 자신만의 베스트 장소, 딱 한 곳만 찍는 지도입니다.                                                                                                                                               |
| <img title="" src="https://user-images.githubusercontent.com/82889580/203589477-b59fb2dc-a6c6-48c4-a510-1c2cd3a7b121.gif" alt="" width="300" data-align="center"> | <img src="https://user-images.githubusercontent.com/82889580/203589495-e8eae542-b2e7-488e-90c4-7bf15072c7f8.gif" width="200" /> | **추천지도 만들기**<br/>사용자가 원하는 테마의 지도를 직접 제작하여 공유하고 설정에 따라 혼자 찍거나 다른 사용자들과 함께 찍을 수 있습니다.                                                                                                      |
| <img src="https://user-images.githubusercontent.com/82889580/203590274-e4690eea-46d4-4e37-82f5-0c32bdfa6cbe.gif" width="300" />                                   | <img src="https://user-images.githubusercontent.com/82889580/203590594-7da07630-cd5a-4ebd-a264-1eb5efc8435f.gif" width="200" /> | **추천지도**<br/>사용자가 또는 다른 사람과 함께 찍은 장소들이 나타납니다. 장소 추가하기 버튼을 통해 장소를 추가할 수 있습니다.<br/>**장소 추가하기**<br/>카카오 지도 API를 활용하여 사용자 캠퍼스 주변의 장소를 검색하고, 지도에 추가할 수 있습니다. |
| <img src="https://user-images.githubusercontent.com/39465312/203685680-4709979d-2c55-432e-8e0b-63613d79b2df.gif" width="300" />| <img src="https://user-images.githubusercontent.com/39465312/203687018-d3436e89-18da-4d41-a3e0-8e93b4be705b.gif" width="200" />| **리뷰 추가**<br/>장소 상세 모달에서 해당 장소에 대한 한줄평리뷰를 확인 또는 작성할 수 있습니다.                                                                                                                                                 |
| <img src="https://user-images.githubusercontent.com/82889580/203591281-4a69f3e8-1cf1-481e-9492-36a3dea68599.gif" width="300" />                                   | <img src="https://user-images.githubusercontent.com/82889580/203596533-40f388d3-0b76-462f-af3b-86514d988ad8.gif" width="200" /> | **공유 하기**<br/>추천지도 또는 특정 장소를 카카오톡 또는 URL 복사를 통해 다른 사용자와 공유할 수 있습니다.                                                                                                                                      |
| <img src="https://user-images.githubusercontent.com/82889580/203592968-270a4448-65c8-4ea4-9fa0-cbe1e4567760.gif" width="300" />                                   | <img src="https://user-images.githubusercontent.com/82889580/203592947-6b7b713d-6bf0-4cf8-937a-5b41c5d225c0.gif" width="200" /> | **북마크**<br/>추천지도나 장소를 저장할 수 있습니다.                                                                                                                                                                                             |
| <img src="https://user-images.githubusercontent.com/82889580/203593617-791cc63d-fbb3-45e2-ba8a-6a412d233eae.gif" width="300" />                                   | <img src="https://user-images.githubusercontent.com/82889580/203593594-30602477-0f3a-4d6d-9122-5d89c51f7ba0.gif" width="200" /> | **검색**<br/>검색어 또는 지도 만들기에서 추가한 다양한 키워드 필터링으로 지도를 검색할 수 있습니다.                                                                                                                                              |
| <img src="https://user-images.githubusercontent.com/82889580/203593792-690d1f83-70d1-4ab5-8381-45dada19e73e.gif" width="300" />                                   | <img src="https://user-images.githubusercontent.com/82889580/203593815-2b58f396-82ed-4acb-a35c-7f66d4124d6e.gif" width="200" /> | **마이페이지**<br/>본인이 작성한 지도, 추가한 장소 또는 참여한 지도, 북마크 지도와 장소를 확인할 수 있습니다.                                                                                                                                    |
| <img src="https://user-images.githubusercontent.com/82889580/203594331-6b997fe8-d023-412e-836b-4e231669da84.gif" width="300" />                                   | <img src="https://user-images.githubusercontent.com/82889580/203594294-2f5b6f0a-bd3b-4b35-95a6-019c5fb277a8.gif" width="200" /> | **메인페이지 캠퍼스 변경**<br/>캠퍼스를 변경하여 다른 캠퍼스의 지도와 게시물을 확인할 수 있습니다.                                                                                                                                               |

## 📂 프로젝트 구성도

|                                               <div align="center">아키텍쳐(Architecture)</div>                                                |
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

## 📍 특이사항

### 검색 엔진 최적화(SEO) 및 웹 접근성(Accessibility)

| 점수                                                                                                                            | 작업 내역                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/82889580/203600010-c7688194-eeb5-4978-978a-688d789e2d5e.png" width="300" /> | - Meta Data 설정<br/>- 체계화된 Heading 처리<br/>- 시멘틱 마크업 사용<br/>- Document title 설정<br/>- img 태그의 alt 속성 설정<br/>- HTTPS 적용<br/>- robots.txt, sitemap.xml 설정 |
| <img src="https://user-images.githubusercontent.com/82889580/203606455-ebd53501-7695-4726-bf50-8b7e0301d54d.png" width="300" /> | - 시멘틱 마크업 사용<br/>- 버튼 태그 aria attribute 적용<br/>- img 태그 alt 속성 설정<br/><br/>- 저시력자를 위한 색상 대비<br/> 체계화된 Heading 처리                               |

<img src="https://user-images.githubusercontent.com/39465312/203687778-d68ec54d-76c2-4fb0-a914-ad278e2d99bf.png" width="500" />

> 구글에 'ssapin' 검색 시 나타나는 페이지

<img src="https://user-images.githubusercontent.com/82889580/203600916-a08111ca-3887-4caf-9a83-df73f34a25a4.png" width="500" />

> 네이버에 'ssapin' 검색 시 나타나는 페이지

### 웹 성능 최적화

| 웹 성능 최적화 전                                                                                                               | 웹 성능 최적화 후 (2022.11.24 기준)                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/82889580/203601352-6825a8fa-9c50-4c67-a9e0-c1ccfe8ec00a.png" width="300" /> | <img src="https://user-images.githubusercontent.com/82889580/203601487-be174396-96b1-4259-aac8-04f11f18037b.png" width="300" /> |

- '코드 분할(Code Splitting)' 적용

- 불필요한 JS 파일 제거

- gif 파일을 mp4 video로 교체

- 이미지 파일 최적화

  - 브라우저에 따른 webp, png 파일로 교체

> 위 작업을 통해 Performace Score 46점 -> 77점으로 개선, Speed Index 속도 4.6초 -> 1.3초로 개선, CLS 0.034 -> 0.004로 개선

<br />

## 📈 구글 애널리틱스 통계

구글 애널리틱스를 세팅하고 배포를 통해 11월 14일부터 현재까지 실서비스를 운영하고 있습니다.

실제 서비스 배포후 11월 14일 부터 11월 18일까지 집중적으로 사용자들이 이용해주고 있으며, 현재도지속적으로 유지하며, 사용자를 확보하고 있습니다.

<img src="https://user-images.githubusercontent.com/82889580/203605669-50697844-48e9-4549-94db-d631abc0b6f6.png" width="600" height="250" />

> 11월 14일 ~ 11월 18일동안 최고치 DAU 394 명, WAU 773명을 기록하였습니다.

<br />

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
      <a href="https://github.com/Zyeon" target="_blank">
        유지연(팀장)<br />(Front-end & Back-end)
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

|  이름  |               역할                | <div align="center">개발 내용</div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :----: | :-------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 유지연 | Back-end<br />Front-end<br />팀장 | **Back-end**<br/>- Place API 작성<br/>- Junit을 이용한 테스트 코드 작성<br/>**Front-end**<br/>- storybook을 활용한 UI컴포넌트 테스트<br/>- emoji-picker-react를 사용하여 이모지 키보드 적용<br/>- Recoil, React-Query를 이용한 상태관리<br/>- ‘Emotion’을 이용한 CSS-in-JS 방식으로 스타일링 구현<br/>- 정규식을 사용하여 input validation 제어<br/>- 장소 등록 기능 연결<br/>- 리뷰 작성 기능 연결<br/>- 장소,지도 찜 기능 연결<br/>- 와이어프레임 및 프로토타입 설계 (반응형)<br/>- 모바일, PC 반응형 웹 디자인 <br/>**CICD**<br/>- Jenkins, Docker를 통한 자동배포환경 구축                                                                                                                     |
| 남은열 |             Front-end             | **Front-end**<br/>- 서비스 메인 홈 페이지<br/>- kakaomap API 활용 지도 기능<br/>  - 서비스 모여지도, 추천지도 렌더링<br/>  - 카카오 지도 검색 기능 및 장소 추가<br/>  - 핀 및 오버레이 커스텀 제작<br/>- 지도 및 장소 카카오톡 공유<br/>- 카카오톡 로그인 기능<br/>- 404 Not Found 페이지<br/>- 'Recoil', 'React-Query'를 이용한 상태 관리<br/>- ‘Emotion’을 이용한 CSS-in-JS 방식으로 스타일링 구현<br/>- 검색 엔진 최적화(SEO) 작업 (Lighthouse 기준, SEO Score 100점 달성)<br/>- 웹 성능 최적화 작업<br/> <br/> (Performance Score 46점 → 80점으로 개선, Speed Index 속도 4.6초 → 1.3초로 개선)<br/> <br/>- storybook을 통한 UI 테스트 |
| 임상빈 |             Front-end             | **Front-end**<br /> - 버튼 컴포넌트 작성 <br /> - 마이페이지 레이아웃 및 기능 연결 <br /> - 로고 및 로딩 디자인                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 박지원 |             Back-end              | **Back-end**<br />- DB 설계<br /> - Map, TogetherMap API 작성<br /> **Front-end**<br /> - 카드/기타 컴포넌트 작성 <br /> - 메인페이지/지도검색페이지 레이아웃 및 기능 연결 <br /> - 장소 상세 모달 기능 연결                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 이현규 |             Back-end              | **Back-end**<br />- DB 설계<br />- User, Auth API 작성<br />- Server to Server 카카오 로그인<br />- JWT 인증 방식 구현                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|  허설  |             Back-end              | **Back-end**<br/>- DB 설계<br/> - Review API 작성<br/>- 맡은 API Junit 테스트 코드 작성<br/>- 유저랭킹, 맵 랭킹 배치 스케줄러 작성 <br/> **Front-end**<br/> - 기타 컴포넌트 작성 <br/> - 헤더/사이드바 레이아웃 작성<br/> - 장소 상세 모달 레이아웃 작성<br/> - 지도 검색 모달 레이아웃 작성                                                                                                                                                                                                                                                                                                                                              |

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

4. **env 파일 설정**

```
VITE_KAKAO_API_KEY=
VITE_KAKAO_JAVASCRIPT_KEY=
VITE_BASE_URL=http://localhost:3000
VITE_BASE_SERVER_URL=http://localhost:8000
```

5. **개발 서버 실행**

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
