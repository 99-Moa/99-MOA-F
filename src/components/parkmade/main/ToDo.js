import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteSchedule, getDetailSchedule } from "../../../api/schedulesManage";
import dot from "../../../img/dot.png"
import { revisePersonalPlan } from "../../../store/modules/parkmade/toggleModal";

import { ReactComponent as Alone } from "../../../img/svg/alone.svg";
import { ReactComponent as Group } from "../../../img/svg/mini-group.svg";
import { axiosIns } from "../../../api/api";

const ToDo = ({prop, traceScroll, index, setExtend, infoData}) => {
  const { kakao } = window;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteRef = useRef();
  const [openDetail, setOpenDetail] = useState(false);
  const [getDetailData, setGetDetailData] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [isPersonalPlan, setIsPersonalPlan] = useState(false); 

  const { mutate:detailPlan } = useMutation(getDetailSchedule, {
    onSuccess: (res) => {
      if (res.data.users.length === 1) {
        setIsPersonalPlan(true);
      }
      setGetDetailData(res.data);
    }
  });
  const { mutate:deletePlan } = useMutation(deleteSchedule, {
    onSuccess: (res) => {
      alert("삭제완료");
    }
  })

  const toChat = () => {
    axiosIns
    .post("/room", {
      chatRoomId: prop.id,
    })
    .then((res) => {
      navigate(`/chatroom/${prop.id}`, {
        state: {
          chatRoomId: res.data.data.chatRoomId,
          infoData
        },
      });
    });
  };
  const openDR = () => {
    setIsDelete(prev=>!prev);
  };
  const deleteThis = () => {
    deletePlan(prop.id)
  };
  const revisePlan = () => {
    dispatch(revisePersonalPlan([true, getDetailData, prop.id]))
  };
  const open =  () => {
    setExtend(prev=>!prev)
    setOpenDetail(prev=>!prev);
    !openDetail && traceScroll.current.scrollBy({top: -traceScroll.current.scrollTop})
    !openDetail && setTimeout(() => {traceScroll.current.scrollBy({top: (traceScroll.current.children[0].offsetHeight + traceScroll.current.children[0].offsetHeight*0.21)*index, behavior: 'smooth'})}, 1)
    openDetail && traceScroll.current.scrollBy({top: -(traceScroll.current.children[0].offsetHeight + traceScroll.current.children[0].offsetHeight*0.21)*index, behavior: 'smooth'})
  };

  useEffect(() => {
    detailPlan(prop.id);
    const container = document.querySelector(`.kakao-map${prop.id}`); 
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
  }, [getDetailData.location, prop]);
  return (
    <>
      {Object.keys(getDetailData).length ? 
        <ToDoDiv variants={clickVariants} animate={openDetail ? "open" : "close"} personal={getDetailData?.users?.length} index={index} $isPersonalPlan={isPersonalPlan}>
          <UpperSummaryDiv variants={clickVariants} animate={openDetail ? "sumSec" : "sumFir"} custom={isPersonalPlan}>
            <SummaryDiv>
              <WrapSummary  onClick={open}>
                <ImgDiv>
                  {(getDetailData?.users?.length === 1) ?
                    <Alone fill={!index ? "rgba(255,255,255,1)" : openDetail ? "rgba(255,255,255,1)" : "rgba(255,69,69,1)"} />
                    :
                    <Group width="65%" height="100%" fill={!index ? "rgba(255,255,255,1)" : openDetail ? "rgba(255,255,255,1)" : "rgba(0,140,255,1)"} />
                  }
                </ImgDiv>
                <TextDiv>
                  <SumContent variants={clickVariants} animate={openDetail ? "colorSec" : "colorFir"} index={index} $openDetail={openDetail}>
                    {getDetailData.title}
                  </SumContent>
                  <Date variants={clickVariants} animate={openDetail ? "colorSec" : "colorFir"} index={index} $openDetail={openDetail}>
                    {`${getDetailData.startDate?.slice(5, 7)}월 ${getDetailData.startDate?.slice(8, 10)}일 ${getDetailData.startTime?.slice(0, 5)}시`}
                  </Date>
                </TextDiv>
              </WrapSummary>
              {(getDetailData?.users?.length === 1)?
                <OptionDiv>
                  <OptionImg ref={deleteRef} src={dot} animate={{ rotateZ: isDelete ? 90 : 0 }} onClick={openDR} />
                  <Delete transition={{ type: "linear" }} initial={{ scaleX: 0 }} animate={{ scaleX: isDelete ? 1 : 0, }}>
                    <Choice whileHover={{ scale: 1.1 }} onClick={deleteThis}>
                      삭제
                    </Choice>
                  </Delete>
                </OptionDiv>
                :
                null
              }
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
                    <SquareDiv>
                      <AttendeesImg src={prop.imgUrl} />
                    </SquareDiv>  
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
              <MapDiv className={`kakao-map${prop.id}`} />
            </SecDetailDiv>
            {(getDetailData.users?.length === 1) ?  
              <>
                <ThirdDetailDiv>
                  <BigSpan>
                    메모
                  </BigSpan>
                  <Content>
                    {getDetailData.content}
                  </Content>
                </ThirdDetailDiv>
                <EachEventBtn onClick={revisePlan}>
                  일정 수정
                </EachEventBtn>
              </>
              :
              <>
                <ThirdDetailDiv>
                  <BigSpan>
                    메모
                  </BigSpan>
                  <Content>
                    {getDetailData.content}
                  </Content>
                </ThirdDetailDiv>
                <EachEventBtn onClick={toChat}>
                  그룹채팅
                </EachEventBtn>
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
  border: 1px solid ${prop => prop.$isPersonalPlan ? "#FF4545" : "#0984e3"};
  border-radius: 8px;
  align-items: center;
  overflow: hidden;
  margin: 0px 0px 4% 0px;
  background-color: ${prop => (prop.index === 0) ? ((prop.personal === 1) ? "#FF4545" : "#00a8ff") : "white"};
`;
const UpperSummaryDiv = styled(motion.div)`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  cursor: pointer;
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
  z-index: 1;
`;
const OptionImg = styled(motion.img)`
  height: 50%;
  width: 70%;
`;
const Delete = styled(motion.div)`
  height: 300%;
  width: 200%;
  top: -100%;
  right: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: right center;
  gap: 10%;
  position: absolute;
`;
const Choice = styled(motion.div)`
  height: 50%;
  width: 80%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 80%;
  font-weight: 600;
  color: #FF4545;
  cursor: pointer;
`;
const WrapSummary = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
`;
const ImgDiv = styled.div`
  height: 100%;
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextDiv = styled.div`
  height: 100%;
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Date = styled(motion.div)`
  height: 50%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  font-size: 110%;
  color: ${prop => (prop.index === 0) ? "white" : prop.$openDetail ? "white" : "black"};
  transition-property: color;
  transition-delay: 0.7s;
`;
const SumContent = styled(motion.div)`
  height: 48%;
  width: 100%;
  margin-bottom: 2%;
  display: flex;
  align-items: flex-end;
  font-size: 85%;
  color: ${prop => (prop.index === 0) ? "white" : prop.$openDetail ? "white" : "black"}; //
  transition-property: color;
  transition-delay: 0.7s;
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
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const AttendeesDiv = styled.div`
  height: 100%;
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
`;
const SquareDiv = styled.div`
  width: 70%;
  position: relative;
  ::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
`;
const AttendeesImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
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
  font-weight: 300;
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
const ThirdDetailDiv = styled.div`
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
  border: 1px solid #E9EEF2;
  border-radius: 4px;
  display: flex;
  word-break: break-all;
  overflow-y: auto;
  text-indent: 3%;
  font-size: 85%;
`;
const EachEventBtn = styled(motion.div)`
  height: 10%;
  width: 80%;
  padding: 0px 3%;
  margin: 4% 0px 2% 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #27292D;
  color: white;
  font-weight: 700;
  font-size: 110%;
  border-radius: 8px;
  cursor: pointer;
`;
const clickVariants = {
  open : {
    height : "98%",
    border: "1px solid #E9EEF2",
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
  sumSec : (isPersonalPlan) => ({
    height : "10%",
    backgroundColor : isPersonalPlan ? "#FF4545" : "#00a8ff",
    borderRadius : "5px",
    transition : {
      duration : 0.7,
      delay : 0.7
    }
  }),
  colorFir : {
    transition : {
      duration : 0.7,
    }
  },
  colorSec : {
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
