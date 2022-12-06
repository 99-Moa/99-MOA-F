// import dayjs from "dayjs";
// import { motion } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useMutation } from "react-query";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import styled from "styled-components";
// // import { postSchedule, reviseSchedule } from "../../api/schedulesManage";
// import InputDatePicker from "../parkmade/common/modal/InputDatePicker";
// import Time from "../parkmade/common/modal/Time";

// const PlanSection = ({stompSendFun}) => {

//     const { kakao } = window;
//     const {pathname} = useLocation();
//     const dispatch = useDispatch();
//     const traceRoadName = useRef();
//     const [isSearch, setIsSearch] = useState(false);
//     const [isWriting, setIsWriting] = useState(false)
//     const [startDate, setStartDate] = useState();
//     const [endDate, setEndDate] = useState();
//     const [places, setPlaces] = useState([]);
//     const [place, setPlace] = useState("");
//     const [roadName, setRoadName] = useState("");
//     // const previousData = useSelector(state => state.toggleModal.revisePersonalPlan);

//     const { register, handleSubmit, setValue } = useForm();
//     // const { mutate:saveMyPlan } = useMutation(postSchedule, {
//     //   onSuccess: () => {
//     //     alert("계획 작성 완료");
//     //     // dispatch(toggleChoiceGroup(false));
//     //   }
//     // });
//     // const { mutate:revisePlan } = useMutation(reviseSchedule, {
//     //   onSuccess: () => {
//     //     alert("수정완료!");
//     //     // dispatch(revisePersonalPlan([false, {}, null]))
//     //   }
//     // })
//     const searchPlace = (ev) => {
//       !isSearch && setIsSearch(true);
//       setPlace(ev.target.value);
//       setIsWriting(true)
//       if (ev.key === "Enter") {
//         setRoadName(traceRoadName.current?.children[0]?.children[1]?.innerText);
//         setIsSearch(false);
//         setIsWriting(false);
//       }
//     };
//     const saveRoadName = (ev) => {
//       setValue("place", ev.currentTarget?.children[0]?.innerText);
//       setPlace(ev.currentTarget?.children[0]?.innerText);
//       setRoadName(ev.currentTarget?.children[1]?.innerText);
//       setIsSearch(false);
//       setIsWriting(false);
//     };
//     const submitPlan = (data) => {
//       if (!isWriting) {
//         if (data.title && data.place && startDate && endDate && (data.startTime !== "시작시간") && (data.endTime !== "끝나는시간")) {
//           if (dayjs(startDate).format("YYYY-MM-DD") > dayjs(endDate).format("YYYY-MM-DD")) {
//             alert("시작일은 종요일보다 늦을 수 없습니다.");
//             return;
//           }
//           if (dayjs(startDate).format("YYYY-MM-DD") === dayjs(endDate).format("YYYY-MM-DD") && data.startTime > data.endTime) {
//             alert("시작시간이 종료시간보다 늦을 수 없습니다.");
//             return;
//           }
//           if ((dayjs(`${dayjs(startDate).format("YYYY-MM-DD")} ${data.startTime}`) - dayjs()) < 0) {
//             alert("시작일(시간)이 현재보다 늦을 수 없습니다.");
//             return;
//           }
//         //   if (Object.keys(previousData[1]).length) {
//         //     revisePlan([previousData[2], {"title": data.title, "startDate": dayjs(startDate).format("YYYY-MM-DD"), "endDate": dayjs(endDate).format("YYYY-MM-DD"), "startTime": data.startTime, "endTime": data.endTime, "location": data.place, "locationRoadName":roadName ,"content": data.textArea}]);
//         //     return;
//         //   }
//         stompSendFun("/app/plan", {"title": data.title, "startDate": dayjs(startDate).format("YYYY-MM-DD"), "endDate": dayjs(endDate).format("YYYY-MM-DD"), "startTime": data.startTime, "endTime": data.endTime, "location": data.place, "locationRoadName":roadName ,"content": data.textArea})

//         } else {
//           alert("필수 항목(*)을 작성해 주세요.")
//         }
//       }
//     }

//     useEffect(() => {
//       // 인포 윈도우 생성 (텍스트 상자)
//       const infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });

//       // 지도를 담는 컨테이너
//       const container = document.querySelector('.plan-kakao');
//       // 초기위치
//       const options = {center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488), level: 4};

//       // 맵생성 객체
//       const map = new kakao.maps.Map(container, options);

//       // 플레이스 함수를 이용하기위한 생성자
//       const ps = new kakao.maps.services.Places();

//       // 검색후 나온결과에 모두 마커?
//       const displayMarker = (place) => {
//         let marker = new kakao.maps.Marker({
//           map: map,
//           position: new kakao.maps.LatLng(place.y, place.x),
//         });
//         kakao.maps.event.addListener(marker, 'click', () => {
//           infoWindow.setContent('<div style="padding:5px; font-size:12px; margin:auto">' + place.place_name + '</div>');
//           infoWindow.open(map, marker);
//         });
//       };

//       // 페이지네이션
//       const displayPagination = (pagination) => {
//         const paginationEl = document.querySelector('.page');
//         const fragment = document.createDocumentFragment();
//         let i;
//         while (paginationEl?.hasChildNodes()) {
//           paginationEl.removeChild(paginationEl.lastChild);
//         }
//         for (i = 1; i <= pagination.last; i++) {
//           let el = document.createElement('a');
//           el.href = '#';
//           el.innerHTML = i;
//           if (i === pagination.current) {
//             el.className = 'on';
//           } else {
//             el.onclick = ((i) => {
//               return () => {
//                 pagination.gotoPage(i);
//               }
//             })(i);
//           };
//           fragment.appendChild(el);
//         }
//         paginationEl?.appendChild(fragment);
//       }
//       if (place) {
//         // 플레이스 값이 선택된경우 검색후 페이지네이션 객체 받아옴
//         ps.keywordSearch(place, (data, status, pagination) => {
//           if (status === kakao.maps.services.Status.OK) {
//             const bounds = new kakao.maps.LatLngBounds();
//             data.map((prop) => {displayMarker(prop); bounds.extend(new kakao.maps.LatLng(prop.y, prop.x));});
//             map.setBounds(bounds);

//             // 페이징해준다
//             displayPagination(pagination);
//             setPlaces(data);
//           }
//         });
//       }
//     }, [place]);

//     return (
//         <UpperDiv>
//           <Form onSubmit={handleSubmit(submitPlan)}>
//             <TitleInput {...register("title")} placeholder="일정 제목*" />
//             <DateDiv>
//               <TextDiv>
//                 날짜<StarSpan>*</StarSpan>
//               </TextDiv>
//               <UpperDayDiv>
//                 <InputDatePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
//               </UpperDayDiv>
//             </DateDiv>
//             <TimesDiv>
//               <TextDiv>
//                 시간<StarSpan>*</StarSpan>
//               </TextDiv>
//               <SelectTimeDiv>
//                 <TimeDiv>
//                   <TimeSelect defaultValue="시작시간" {...register("startTime")}>
//                     <TimeOption disabled value="시작시간">시작시간</TimeOption>
//                     <Time />
//                   </TimeSelect>
//                 </TimeDiv>
//                 <Dash>-</Dash>
//                 <TimeDiv>
//                   <TimeSelect defaultValue="끝나는시간" {...register("endTime")}>
//                     <TimeOption disabled value="끝나는시간">끝나는시간</TimeOption>
//                     <Time />
//                   </TimeSelect>
//                 </TimeDiv>
//               </SelectTimeDiv>
//             </TimesDiv>
//             <SearchPlaceDiv>
//               <TextDiv>
//                 장소<StarSpan>*</StarSpan>
//               </TextDiv>
//               <SearchDiv>
//                 <PlaceInput {...register("place")} placeholder="장소를 입력해주세요." onKeyUp={searchPlace} />
//                 <SearchBtn>
//                   <Svg aria-label="검색" color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16">
//                     <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
//                     <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
//                   </Svg>
//                 </SearchBtn>
//                 {isSearch &&
//                   <PlacesDiv>
//                     <Lists ref={traceRoadName}>
//                       {places.map((prop, index) => (
//                         <List key={index} onClick={saveRoadName}>
//                           <PlaceSpan>{prop.place_name}</PlaceSpan>
//                           <PlaceRoadNameSpan>{prop.road_address_name ? prop.road_address_name : prop.address_name}</PlaceRoadNameSpan>
//                         </List>
//                       ))}
//                     </Lists>
//                     <PageDiv className="page"></PageDiv>
//                   </PlacesDiv>
//                 }
//               </SearchDiv>
//             </SearchPlaceDiv>
//             {roadName ?
//               <RoadNameDiv>
//                 <RoadName>{roadName}</RoadName>
//               </RoadNameDiv>
//               :
//               null
//             }
//             <UpperMapDiv>
//               <MapDiv className="plan-kakao"></MapDiv>
//             </UpperMapDiv>
//             <UpperMemoDiv>
//               <TextDiv>
//                 메모
//               </TextDiv>
//               <MemoDiv>
//                 <MemoTextArea {...register("textArea")} placeholder="메모가 있나요?" />
//               </MemoDiv>
//             </UpperMemoDiv>
//             <DoneDiv>
//               <DoneBtn>
//                 적용하기
//               </DoneBtn>
//             </DoneDiv>
//           </Form>
//         </UpperDiv>
//       );
//     }

// export default PlanSection

// const UpperDiv = styled(motion.div)`
//   width: 100%;
//   height: 100%;
//   background-color: white;
// `;
// const Form = styled.form`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;
// const TitleInput = styled.input`
//   width: 90%;
//   height: 5%;
//   border: none;
//   border-bottom: 1px solid;
//   margin: 2% 0px;
//   padding-top: 1%;
//   display: flex;
//   align-items: center;
//   outline: none;
//   font-size: 150%;
// `;
// const DateDiv = styled.div`
//   width: 90%;
//   height: 4%;
//   margin: 2% 0px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;
// const UpperDayDiv = styled.div`
//   height: 100%;
//   width: 90%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;
// const Dash = styled.div`
//   height: 100%;
//   width: 3%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 200%;
//   font-weight: 700;
// `;
// const TimesDiv = styled.div`
//   width: 90%;
//   height: 4%;
//   margin: 2% 0px;
//   display: flex;
//   align-items: center;
// `;
// const SelectTimeDiv = styled.div`
//   height: 100%;
//   width: 90%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;
// const TimeDiv = styled.div`
//   height: 100%;
//   width: 46%;
//   display: flex;
//   flex-direction: column;
// `;
// const TimeSelect = styled.select`
//   height: 100%;
//   width: 100%;
//   border: 1px solid #AAAFB5;
//   border-radius: 5px;
//   background-color: white;
//   outline: none;
// `;
// const TimeOption = styled.option`
//   height: 100%;
//   width: 40%;
//   border: 1px solid;
//   border-radius: 4px;
//   display: none;
// `;
// const SearchPlaceDiv = styled.div`
//   width: 90%;
//   height: 4%;
//   margin: 2% 0;
//   display: flex;
//   align-items: center;
// `;
// const RoadNameDiv = styled.div`
//   width: 90%;
//   height: 2%;
//   margin: 0.5% 0;
//   display: flex;
//   align-items: center;
// `;
// const RoadName = styled.div`
//   width: 90%;
//   height: 100%;
//   margin-left: 10%;
//   display: flex;
//   align-items: center;
//   font-size: 90%;
//   padding-left: 1%;
// `;
// const PlacesDiv = styled.div`
//   width: 100%;
//   height: 840%;
//   border: 1px solid #E9EEF2;
//   border-bottom-left-radius: 4px;
//   border-bottom-right-radius: 4px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   position: absolute;
//   background-color: white;
//   z-index: 20;
//   top: 110%;
//   left: -1px;
//   gap: 1%;
// `;
// const Lists = styled.div`
//   width: 100%;
//   height: 90%;
//   overflow: auto;
// `;
// const PageDiv = styled.div`
//   width: 100%;
//   height: 10%;
//   border-top: 1px solid #E9EEF2;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-grow: 0;
//   flex-shrink: 0;
//   gap: 10px;
// `;
// const List = styled.div`
//   width: 100%;
//   height: 20%;
//   border-bottom: 1px solid #E9EEF2;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   cursor: pointer;
//   &:hover {
//     background-color: #E9EEF2;
//   }
// `;
// const PlaceSpan = styled.span`
//   font-size: 90%;
//   font-weight: 600;
//   text-indent: 2%;
// `;
// const PlaceRoadNameSpan = styled.span`
//   font-size: 75%;
//   font-weight: 300;
//   text-indent: 2%;
// `;
// const TextDiv = styled.div`
//   width: 10%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-weight: 700;
// `;
// const StarSpan = styled.span`
//   height: 100%;
//   display: flex;
//   align-items: center;
//   font-weight: 800;
//   color: #FF4545;
// `;
// const SearchDiv = styled.div`
//   width: 90%;
//   height: 100%;
//   border: 1px solid #AAAFB5;
//   border-radius: 5px;
//   margin: 1% 0px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   position: relative;
// `;
// const PlaceInput = styled.input`
//   height: 90%;
//   width: 85%;
//   font-size: 90%;
//   font-weight: 600;
//   display: flex;
//   align-items: center;
//   margin: 0 0 0 1%;
//   border: none;
//   outline: none;
// `;
// const SearchBtn = styled.button`
//   height: 100%;
//   width: 7%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: transparent;
//   border: none;
//   cursor: pointer;
// `;
// const Svg = styled.svg`
//   width: 80%;
//   height: 80%;
// `;
// const UpperMapDiv = styled.div`
//   width: 90%;
//   height: 30%;
//   margin-bottom: 1%;
//   display: flex;
//   justify-content: flex-end;
// `;
// const MapDiv = styled.div`
//   width: 90%;
//   height: 100%;
//   border-radius: 10px;
//   margin: 1% 0px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const UpperMemoDiv = styled.div`
//   width: 90%;
//   height: 25.5%;
//   margin: 3% 0 0 0;
//   display: flex;
//   align-items: center;
// `;
// const MemoDiv = styled.div`
//   width: 90%;
//   height: 100%;
//   border: 1px solid;
//   border-radius: 10px;
//   margin: 1% 0px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const MemoTextArea = styled.textarea`
//   width: 95%;
//   height: 95%;
//   overflow: auto;
//   outline: none;
//   border: none;
//   resize: none;
// `;
// const DoneDiv = styled.div`
//   width: 90%;
//   height: 6%;
//   margin-top: 4%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const DoneBtn = styled.button`
//   height: 100%;
//   width: 100%;
//   border: 1px solid #FF4545;
//   border-radius: 5px;
//   background-color: #FF4545;
//   color: white;
//   font-size: 110%;
//   cursor: pointer;
// `;