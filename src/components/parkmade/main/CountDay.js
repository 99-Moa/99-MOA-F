import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";


const CountDay = ({}) => {
  const [day, setDay] = useState();
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [sec, setSec] = useState();
  const getDDay = (targetDate) => {
    const fisToDo = dayjs(`2022-11-26 00:00`);
    const now = dayjs();
    const diff = fisToDo.diff(now);
    setDay(Math.floor(diff / (1000*60*60*24)));
    setHour(Math.floor((diff / (1000*60*60)) % 24));
    setMinute(Math.floor((diff / (1000*60)) % 60));
    setSec(Math.floor(diff / 1000 % 60));
  };
  useEffect(()=>{
    setInterval(()=>getDDay(), 1000);
    return () => clearInterval(getDDay);
  }, []);
  return (
    <Wrap>
      {(day !== undefined) && 
        <>
          <FirDiv>
            다음 일정까지
          </FirDiv>
          <SecDiv>
            <TimesDiv>
              <TimeNumDiv>
                <NumDiv>
                  {(day > 9) ? day.toString()[0] : "-"}
                </NumDiv>
                <NumDiv>
                  {(day > 9) ? day.toString()[1] : day !== 0 ? day.toString()[0] : "-"}
                </NumDiv>
              </TimeNumDiv>
              <TimeStrDiv>
                DAYS
              </TimeStrDiv>
            </TimesDiv>
            <TangTangDiv>
              <TangTang>
                :
              </TangTang>
            </TangTangDiv>
            <TimesDiv>
              <TimeNumDiv>
                <NumDiv>
                  {(hour > 9) ? hour.toString()[0] : "-"}
                </NumDiv>
                <NumDiv>
                  {(hour > 9) ? hour.toString()[1] : hour !== 0 ? hour.toString()[0] : "-"}
                </NumDiv>
              </TimeNumDiv>
              <TimeStrDiv>
                HOURS
              </TimeStrDiv>
            </TimesDiv>
            <TangTangDiv>
              <TangTang>
                :
              </TangTang>
            </TangTangDiv>
            <TimesDiv>
              <TimeNumDiv>
                <NumDiv>
                  {(minute > 9) ? minute.toString()[0] : "-"}
                </NumDiv>
                <NumDiv>
                  {(minute > 9) ? minute.toString()[1] : minute !== 0 ? minute.toString()[0] : "-"}
                </NumDiv>
              </TimeNumDiv>
              <TimeStrDiv>
                MIN
              </TimeStrDiv>
            </TimesDiv>
            <TangTangDiv>
              <TangTang>
                :
              </TangTang>
            </TangTangDiv>
            <TimesDiv>
              <TimeNumDiv>
                <NumDiv>
                  {(sec > 9) ? sec.toString()[0] : "-"}
                </NumDiv>
                <NumDiv>
                  {(sec > 9) ? sec.toString()[1] : sec !== 0 ? sec.toString()[0] : "-"}
                </NumDiv>
              </TimeNumDiv>
              <TimeStrDiv>
                SEC
              </TimeStrDiv>
            </TimesDiv>
          </SecDiv>
        </> 
      }
    </Wrap>
  );
}

export default CountDay;

const Wrap = styled.div`
  height: 100%;
  width: 100%;
`;
const FirDiv = styled.div`
  height: 20%;
  width: 100%;
  font-size: 100%;
  font-weight: 800;
`;
const SecDiv = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
`;
const TimesDiv = styled.div`
  height: 100%;
  width: 22%;
`;
const TangTangDiv = styled.div`
  height: 100%;
  width: 4%;
`;
const TangTang = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
  font-weight: 700;
`;
const TimeNumDiv = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5%;
`;
const NumDiv = styled(motion.div)`
  height: 80%;
  width: 45%;
  margin-top: 12%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
  font-weight: 800;
  background-color: #E9EEF2;
`;
const TimeStrDiv = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80%;
  font-weight: 700;
  color: #AAAFB5;
`;