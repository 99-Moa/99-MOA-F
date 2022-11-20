import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import styled from "styled-components";
import { postSchedule } from "../../../../api/schedulesManage";
import Time from "./Time";


// 리액트 훅 폼 적용 하고 뮤테이트 적용하자
// 키보드 위아래 버튼으로 가능하게 하자.
// npm install react-date-range 하자
// 주소 검색을 select 이용하자
const MyPlan = () => {
  const { kakao } = window;
  const traceRoadName = useRef();
  const [isSearch, setIsSearch] = useState(false);
  const [place, setPlace] = useState("");
  const [places, setPlaces] = useState([]);
  const [roadName, setRoadName] = useState("");  // 나중에 벡으로 데이터 도로명주소 보내기용
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { mutate:saveMyPlan } = useMutation(postSchedule, {
    onSuccess: (res) => {

    }
  });

  const searchPlace = (ev) => {
    !isSearch && setIsSearch(true);
    setPlace(ev.target.value);
    if (ev.key === "Enter") {
      !roadName && setRoadName(traceRoadName.current?.children[0]?.children[1]?.innerText);
      setIsSearch(false);
    }
  };
  const saveRoadName = (ev) => {
    setValue("place", ev.currentTarget?.children[0]?.innerText);
    setPlace(ev.currentTarget?.children[0]?.innerText);
    setRoadName(ev.currentTarget?.children[1]?.innerText);
    setIsSearch(false);
  };
  const submitPlan = (data) => {
    // 필수항목 조건 정해지면 바뀌어야함.
    if (data.title && data.place) {
      // saveMyPlan({})
    }
  }
  
  useEffect(() => {
    const infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.querySelector('.plan-kakao');
    const options = {center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488), level: 4};
    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places();
    const displayMarker = (place) => {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      kakao.maps.event.addListener(marker, 'click', () => {
        infoWindow.setContent('<div style="padding:5px; font-size:12px; margin:auto">' + place.place_name + '</div>');
        infoWindow.open(map, marker);
      });
    };
    const displayPagination = (pagination) => {
      const paginationEl = document.querySelector('.page');
      const fragment = document.createDocumentFragment();
      let i;
      while (paginationEl?.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }
      for (i = 1; i <= pagination.last; i++) {
        let el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;
        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = ((i) => {
            return () => {
              pagination.gotoPage(i);
            }
          })(i);
        };
        fragment.appendChild(el);
      }
      paginationEl?.appendChild(fragment);
    }
    if (place) {
      ps.keywordSearch(place, (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          data.map((prop) => {displayMarker(prop); bounds.extend(new kakao.maps.LatLng(prop.y, prop.x));});
          map.setBounds(bounds);
          displayPagination(pagination);
          setPlaces(data);
        }
      });
    }
  }, [place]);
  return (
    <UpperDiv>
      <Form onSubmit={handleSubmit(submitPlan)}>
        <TitleInput {...register("title")} placeholder="제목을 입력해주세요" />
        <DateDiv>
          <DateSelector type="date" {...register("date")}/>
          <TimeDiv>
            <TimeSelect {...register("startTime")}>
              <TimeOption>시작시간</TimeOption>
              <Time />
            </TimeSelect>
            <Wave>~</Wave>
            <TimeSelect {...register("endTime")}>
              <TimeOption>끝나는시간</TimeOption>
              <Time />
            </TimeSelect>
          </TimeDiv>
        </DateDiv>
        <SearchPlaceDiv>
          <PlaceInput {...register("place")} placeholder="장소를 입력해주세요." onKeyUp={searchPlace} />
          <SearchBtn>
            <Svg aria-label="검색" color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16">
              <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
            </Svg>
          </SearchBtn>
          {isSearch && 
            <PlacesDiv>
              <Lists ref={traceRoadName}>
                {places.map((prop, index) => (
                  <List key={index} onClick={saveRoadName}>
                    <PlaceName>{prop.place_name}</PlaceName>
                    <PlaceRoadName>{prop.address_name}</PlaceRoadName>
                  </List>
                ))}
              </Lists>
              <PageDiv className="page"></PageDiv>
            </PlacesDiv>
          }
        </SearchPlaceDiv>
        {roadName && <RoadNameDiv>{roadName}</RoadNameDiv>}
        <MapDiv className="plan-kakao"></MapDiv>
        <MemoDiv>
          <MemoTextArea {...register("textArea")} placeholder="메모가 있나요?" />
        </MemoDiv>
        <DoneDiv>
          <DoneBtn>
            작성
          </DoneBtn>
        </DoneDiv>
      </Form>
    </UpperDiv>
  );
}

export default MyPlan;

const UpperDiv = styled(motion.div)`
  width: 100%;
  height: 100%;
`;
const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TitleInput = styled.input`
  width: 90%;
  height: 5%;
  border: none;
  border-bottom: 1px solid;
  margin: 2% 0px;
  padding-top: 1%;
  display: flex;
  align-items: center;
  outline: none;
  font-size: 150%;
`;
const DateDiv = styled.div`
  width: 90%;
  height: 4%;
  margin: 1% 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const DateSelector = styled.input`
  height: 100%;
  width: 40%;
  border: 1px solid;
  border-radius: 10px;
  background-color: transparent;
  font-size: 200%;
`;
const TimeDiv = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TimeSelect = styled.select`
  height: 100%;
  width: 40%;
  border: 1px solid;
  border-radius: 10px;
  background-color: white;
`;
const TimeOption = styled.option`
  height: 100%;
  width: 40%;
  border: 1px solid;
  border-radius: 10px;
  background-color: white;
`;
const Wave = styled.div`
  height: 100%;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100%;
  font-weight: 700;
`;
const SearchPlaceDiv = styled.div`
  width: 90%;
  height: 4%;
  border: 1px solid;
  border-radius: 10px;
  margin: 1% 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
const RoadNameDiv = styled.div`
  width: 89%;
  height: 2%;
  margin: 0.5%;
  display: flex;
  align-items: center;
  font-size: 90%;
  padding-left: 1%;
`;
const PlacesDiv = styled.div`
  width: 100%;
  max-height: 800%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background-color: white;
  z-index: 20;
  top: 110%;
  gap: 1%;
  border: 1px solid;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const Lists = styled.div`
  width: 100%;
  height: 80%;
  overflow: auto;
  overflow-x: hidden;
`;
const PageDiv = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-top: 1px solid;
`;
const List = styled.div`
  width: 100%;
  height: 15%;
  border: 1px solid;
  cursor: pointer;
`;
const PlaceName = styled.div`
  height: 60%;
  width: 100%;
  font-size: 100%;
  font-weight: 800;
`;
const PlaceRoadName = styled.div`
  height: 40%;
  width: 100%;
  font-size: 85%;
  font-weight: 300;
`;
const PlaceInput = styled.input`
  height: 90%;
  width: 85%;
  font-size: 90%;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin: 0px 2%;
  border: none;
  outline: none;
`;
const SearchBtn = styled.button`
  height: 100%;
  width: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const Svg = styled.svg`
  width: 80%;
  height: 80%;
`;
const MapDiv = styled.div`
  width: 90%;
  height: 45%;
  border: 1px solid;
  border-radius: 10px;
  margin: 1% 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MemoDiv = styled.div`
  width: 90%;
  height: 20%;
  border: 1px solid;
  border-radius: 10px;
  margin: 1% 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MemoTextArea = styled.textarea`
  width: 95%;
  height: 95%;
  overflow: auto;
  outline: none;
  border: none;
`;

const DoneDiv = styled.div`
  width: 90%;
  height: 5%;
  margin-top: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DoneBtn = styled.button`
  height: 100%;
  width: 60%;
  border-radius: 10px;
  cursor: pointer;
`;