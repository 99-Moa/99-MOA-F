import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


// 메인에서 리액트 쿼리로 데이터 프랍으로서 다받아와야함 디테일까지 
// 이니셜로 다시해보자
const ToDo = ({prop, traceScroll, index, setExtend}) => {
  const navigate = useNavigate();
  const { kakao } = window;
  const [openDetail, setOpenDetail] = useState(false);
  const open =  () => {
    setExtend(prev=>!prev)
    setOpenDetail(prev=>!prev);
    !openDetail && traceScroll.current.scrollBy({top: -traceScroll.current.scrollTop})
    !openDetail && setTimeout(() => {traceScroll.current.scrollBy({top: (traceScroll.current.children[0].offsetHeight + traceScroll.current.children[0].offsetHeight*0.24)*index, behavior: 'smooth'})}, 1)
    openDetail && traceScroll.current.scrollBy({top: -(traceScroll.current.children[0].offsetHeight + traceScroll.current.children[0].offsetHeight*0.24)*index, behavior: 'smooth'})
  };
  const toChat = () => {
    // navigate("/채팅방")
  }
  
  useEffect(() => { 
    const container = document.querySelector('.kakao-map'); 
    const options = {center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488), level: 5}; 
    const map = new kakao.maps.Map(container, options);
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(`서울 강남구 강남대로 지하 396`, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        map.setCenter(coords);
      }
    });  
  }, [/*벡엔드로 부터 받은 주소*/])
  return (
    <ToDoDiv variants={clickVariants} animate={openDetail ? "open" : "close"} index={index}>
      <UpperSummaryDiv onClick={open} variants={clickVariants} animate={openDetail ? "sumSec" : "sumFir"}>
        <SummaryDiv>
          <WrapSummary>
            <SumContent variants={clickVariants} animate={openDetail ? "colorSec" : "colorFir"} index={index}>
              {"11일 나들이 오두방정 모임"}
            </SumContent>
            <Date variants={clickVariants} animate={openDetail ? "colorSec" : "colorFir"} index={index}>
              {"11월 10일 PM 7:00"}
            </Date>
          </WrapSummary>
        </SummaryDiv>
      </UpperSummaryDiv>
      <UpperDetailDiv variants={clickVariants} animate={openDetail ? "detailSec" : "detailFir"}>
        <FirDetailDiv>
          <Attend>
            참석자
          </Attend>
          <Attendees>
            {/* 아래 내용 맵으로 돌리는거다 */}
            <AttendeesDiv>
              <AttendeesImg />
            </AttendeesDiv>
            <AttendeesDiv>
              <AttendeesImg />
            </AttendeesDiv>
          </Attendees>
        </FirDetailDiv>
        <SecDetailDiv>
          <BigSpan>
            모임 장소
          </BigSpan><br/>
          <SmallSpanOne>
            {"강남역"}
          </SmallSpanOne><br/>
          <SmallSpanTwo>
            {"서울 강남구 강남대로 지하 396"}
          </SmallSpanTwo>
          <MapDiv className="kakao-map" />
        </SecDetailDiv>
        <ThirdDetailDiv>
          <BigSpan>
            세부 내용
          </BigSpan>
          <Content>
            {prop}
          </Content>
        </ThirdDetailDiv>
        <UpperChatRoom onClick={toChat}>
          그룹채팅
        </UpperChatRoom>
      </UpperDetailDiv>
    </ToDoDiv>
  );
}

export default ToDo;

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
  padding-left: 3%;
  align-items: center;
`;
const WrapSummary = styled.div`
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
    borderRadius : "8px",
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
      duration : 0.5
    }
  },
  detailSec : {
    height : "90%",
    transition : {
      duration : 0.5,
    }
  }
}