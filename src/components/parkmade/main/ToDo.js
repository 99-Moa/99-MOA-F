import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteSchedule, getDetailSchedule } from "../../../api/schedulesManage";
import dot from "../../../img/dot.png"


// 모임장소 이름과 도로명주소 변경해야함, 지도 적용  제대로 안됬음
const ToDo = ({prop, traceScroll, index, setExtend}) => {
  const navigate = useNavigate();
  const deleteRef = useRef();
  const { kakao } = window;
  const [openDetail, setOpenDetail] = useState(false);
  const [getDetailData, setGetDetailData] = useState({});
  const [isDeleteOrRevise, setIsDeleteOrRevise] = useState(false);
  const { mutate:detailPlan } = useMutation(getDetailSchedule, {
    onSuccess: (res) => {
      setGetDetailData(res.data);
    }
  });
  const { mutate:deletePlan } = useMutation(deleteSchedule, {
    onSuccess: (res) => {
      alert("삭제완료");
    }
  })

  const toChat = () => {
    // navigate("/채팅방")
  }
  const openDR = () => {
    setIsDeleteOrRevise(prev=>!prev);
  }
  const deleteThis = () => {
    deletePlan(prop.id)
  }
  const reviseThis = () => {
    // 수정하기 뮤테이트 쓰기
  }
  const open =  () => {
    setExtend(prev=>!prev)
    setOpenDetail(prev=>!prev);
    !openDetail && traceScroll.current.scrollBy({top: -traceScroll.current.scrollTop})
    !openDetail && setTimeout(() => {traceScroll.current.scrollBy({top: (traceScroll.current.children[0].offsetHeight + traceScroll.current.children[0].offsetHeight*0.24)*index, behavior: 'smooth'})}, 1)
    openDetail && traceScroll.current.scrollBy({top: -(traceScroll.current.children[0].offsetHeight + traceScroll.current.children[0].offsetHeight*0.24)*index, behavior: 'smooth'})
  };

  useEffect(() => {
    detailPlan(prop.id);
    const container = document.querySelector('.kakao-map'); 
    if (container && Object.keys(getDetailData).length) {
      const options = { center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488), level: 5 };
      const map = new kakao.maps.Map(container, options);
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(getDetailData.locationRoadName, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new kakao.maps.Marker({
            map: map,
            position: coords
          });

          map.setCenter(coords);
        }
      });  
    }
  }, [getDetailData.location])
  // useEffect(() => {
  //   detailPlan(prop.id);
  //   const infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  //   const container = document.querySelector('.kakao-map');
  //   if (container && Object.keys(getDetailData).length) {
  //     const options = { center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488), level: 2 };
  //     const map = new kakao.maps.Map(container, options);
  //     const ps = new kakao.maps.services.Places();
  //     const displayMarker = (place) => {
  //       let marker = new kakao.maps.Marker({
  //         map: map,
  //         position: new kakao.maps.LatLng(place.y, place.x),
  //       });
  //       kakao.maps.event.addListener(marker, 'click', () => {
  //         infoWindow.setContent('<div style="padding:5px; font-size:12px; margin:auto">' + place.place_name + '</div>');
  //         infoWindow.open(map, marker);
  //       });
  //     };
  //     ps.keywordSearch(getDetailData.location, (data, status, pagination) => {
  //       if (status === kakao.maps.services.Status.OK) {
  //         const bounds = new kakao.maps.LatLngBounds();
  //         data.map((prop) => { displayMarker(prop); bounds.extend(new kakao.maps.LatLng(prop.y, prop.x)); });
  //         map.setBounds(bounds);
  //       }
  //     });
  //   }
  // }, [getDetailData.location]);
  return (
    <>
      {Object.keys(getDetailData).length ? 
        <ToDoDiv variants={clickVariants} animate={openDetail ? "open" : "close"} index={index}>
          <UpperSummaryDiv variants={clickVariants} animate={openDetail ? "sumSec" : "sumFir"}>
            <SummaryDiv>
              <WrapSummary  onClick={open}>
                <SumContent variants={clickVariants} animate={openDetail ? "colorSec" : "colorFir"} index={index}>
                  {getDetailData.title}
                </SumContent>
                <Date variants={clickVariants} animate={openDetail ? "colorSec" : "colorFir"} index={index}>
                  {`${getDetailData.startDate?.slice(5, 7)}월 ${getDetailData.startDate?.slice(8, 10)}일 ${getDetailData.startTime?.slice(0, 5)}시`}
                </Date>
              </WrapSummary>
              <OptionDiv>
                <OptionImg ref={deleteRef} src={dot} variants={dotVariant} animate={{rotateZ: isDeleteOrRevise ? 90 : 0}} onClick={openDR}/>
                <DeleteOrRevise transition={{ type: "linear" }}  initial={{scaleX:0}} animate={{ scaleX: isDeleteOrRevise ? 1 : 0, duration:0.5 }}>
                  <Choice whileHover={{scale:1.1}} onClick={deleteThis}>
                    삭제
                  </Choice>
                  <Choice whileHover={{scale:1.1}} onClick={reviseThis}>
                    수정
                  </Choice>
                </DeleteOrRevise>
              </OptionDiv>
            </SummaryDiv>
          </UpperSummaryDiv>
          <UpperDetailDiv variants={clickVariants} animate={openDetail ? "detailSec" : "detailFir"}>
            <FirDetailDiv>
              <Attend>
                참석자
              </Attend>
              <Attendees>
                {getDetailData.users?.map((prop) =>
                  <AttendeesDiv key={prop.id}>
                    <AttendeesImg src={prop.imgUrl} />
                  </AttendeesDiv>
                )}
              </Attendees>
            </FirDetailDiv>
            <SecDetailDiv>
              <BigSpan>
                모임 장소
              </BigSpan><br />
              <SmallSpanOne>
                {getDetailData.location}
              </SmallSpanOne><br />
              <SmallSpanTwo>
                {getDetailData.locationRoadName}
              </SmallSpanTwo>
              <MapDiv className="kakao-map" />
            </SecDetailDiv>
            {(getDetailData.users?.length === 1) ?  
              <ThirdDetailDivAlone>
                <BigSpan>
                  세부 내용
                </BigSpan>
                <Content>
                  {getDetailData.content}
              </Content>
              </ThirdDetailDivAlone>
              :
              <>
                <ThirdDetailDivGroup>
                  <BigSpan>
                    세부 내용
                  </BigSpan>
                  <Content>
                    {getDetailData.content}
                  </Content>
                </ThirdDetailDivGroup>
                <UpperChatRoom onClick={toChat}>
                  그룹채팅
                </UpperChatRoom>
              </>
            }
          </UpperDetailDiv>
        </ToDoDiv>
        :
        <ToDoDiv>
        </ToDoDiv>
      }
    </>
  );
}

export default React.memo(ToDo);

const ToDoDiv = styled(motion.div)`
  width: 99%;
  height: 10%;
  align-items: center;
  overflow: hidden;
  margin: 0px 0px 4% 0px;
  border: 1px solid #0984e3;
  border-radius: 8px;
  background-color: ${prop => (prop.index === 0 && !prop.openDetail) && "#00a8ff"};
`;
const UpperSummaryDiv = styled(motion.div)`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
`;
const SummaryDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 3%;
  align-items: center;
`;
const OptionDiv = styled.div`
  margin-right: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const OptionImg = styled(motion.img)`
  height: 50%;
  width: 70%;
`;
const DeleteOrRevise = styled(motion.div)`
  height: 300%;
  width: 400%;
  top: -100%;
  right: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform-origin: right center;
  gap: 10%;
`;
const Choice = styled(motion.div)`
  height: 40%;
  width: 40%;
  border: 1px solid #AAAFB5;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #E9EEF2;
  font-size: 50%;
  cursor: pointer;
`;

const WrapSummary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Date = styled(motion.div)`
  height: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: ${prop => (prop.index === 0) && "white"};
`;
const SumContent = styled(motion.div)`
  height: 30%;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${prop => (prop.index === 0) && "white"};
`;
const UpperDetailDiv = styled(motion.div)`
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: white;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
const FirDetailDiv = styled.div`
  height: 10%;
  width: 85%;
  padding: 0% 3%;
  margin-top: 2%;
  display: flex;
  align-items: center;
`;
const Attend = styled.div`
  height: 100%;
  width: 20%;
  display: flex;
  align-items: center;
  font-weight: 900;
`;
const Attendees = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  align-items: center;
`;
const AttendeesDiv = styled.div`
  height: 70%;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2%;
`;
const AttendeesImg = styled.img`
  height: 100%;
  width: 100%;
  border: none ;
  border-radius: 25px;
  background-color: gray;
`;
const SecDetailDiv = styled.div`
  height: 48%;
  width: 85%;
  padding: 0% 3%;
`;
const BigSpan = styled.span`
  font-size: 100%;
  font-weight: 900;
`;
const SmallSpanOne = styled.span`
  font-size: 70%;
  font-weight: 800;
`;
const SmallSpanTwo = styled.span`
  font-size: 70%;
  font-weight: 200;
`;
const MapDiv = styled.div`
  height: 70%;
  width: 100%;
  margin: 2% 0px;
  background-color: wheat;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThirdDetailDivAlone = styled.div`
  height: 30%;
  width: 85%;
  padding: 0 3%;
  margin-bottom: 3%;
`;

const ThirdDetailDivGroup = styled.div`
  height: 20%;
  width: 85%;
  padding: 0% 3%;
`;
const Content = styled.div`
  width: 98%;
  height: 85%;
  margin-top: 2%;
  padding: 1%;
  background-color: white;
  border: 1px solid gray;
  border-radius: 8px;
  display: flex;
  word-break: break-all;
  align-items: center;
  overflow-y: auto;

`;
const UpperChatRoom = styled(motion.div)`
  height: 10%;
  width: 80%;
  padding: 0px 3%;
  margin: 4% 0px 2% 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3436;
  color: white;
  font-weight: 700;
  font-size: 110%;
  border-radius: 8px;
  cursor: pointer;
`;

const clickVariants = {
  open : {
    height : "98%",
    border: "1px solid gray",
    transition : {
      duration : 0.7,
    }
  },
  close : {
    height : "10%",
    transition : {
      duration : 0.7
    }
  },
  sumFir : {
    height :"100%",
    transition : {
      duration : 0.7,
    }
  },
  sumSec : {
    height : "10%",
    color : "white",
    backgroundColor : "#00a8ff",
    borderRadius : "5px",
    transition : {
      duration : 0.7,
      delay : 0.7
    }
  },
  colorFir : {
    transition : {
      duration : 0.7,
    }
  },
  colorSec : {
    color : "white",
    transition : {
      duration : 0.7,
      delay : 0.7
    }
  },
  detailFir : {
    height : "0%",
    display: "none",
    transition : {
      duration : 0.5,
    }
  },
  detailSec : {
    height : "90%",
    transition : {
      duration : 0.5,
      
    }
  }
}

const dotVariant = {
  ani: {
    rotateZ:90
  }
}