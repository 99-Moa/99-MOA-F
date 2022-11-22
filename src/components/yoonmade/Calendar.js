import FullCalendar from "@fullcalendar/react";
import styled from "styled-components";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React from "react";

const Calendar = ({setIsChoiceGroup, schedulesData}) => {
  const onDateClick = (e) => {
    console.log(e);
    const date = e.dateStr;
    console.log("특정 날짜 클릭시 작동되는 함수", date);
  };
  const onEventClick = (e) => {
    console.log(e.event._instance.range);
    console.log("이벤트를 눌렀을때 동작하는 함수");
  };
  const onAddEvent = () => {
    setIsChoiceGroup(prev=>!prev);
  };
  const onSelectAllow = (selectionInfo) => {
    let startDate = selectionInfo.start;
    let endDate = selectionInfo.end;
    endDate.setSeconds(endDate.getSeconds() - 1);
    if (startDate.getDate() === endDate.getDate()) {
      return true;
    } else {
      return false;
    }
  };
  const setTitleFormat = (date) => {
    const newD = new Date()
    const year = newD.getFullYear()
    const month = newD.getMonth() + 1
    const today = newD.getDate()
    const day = newD.getDay()

    const dayArr = ["일","월","화","수","목","금","토"]


    const yearElm = React.createElement("div",null,`${date.date.year}`)
    const monthElm = React.createElement("div",null,`${date.date.month+1}`)
    const yeaerMonth = React.createElement("div",null,`${date.date.year}년 ${date.date.month+1}월`)
    let todayElm, dateBox, dayElm
    
    

    if(date.date.year === year && date.date.month +1 === month){
      todayElm = React.createElement("div",null,`${today}`)
      // dayElm = React.createElement("div",null,`${dayArr[day]}`)
      dateBox = React.createElement("div",null,[yeaerMonth,todayElm])
      return dateBox
    } else {
      todayElm = React.createElement("div",null,1)
      // dayElm = React.createElement("div",null,`${dayArr[date.date.marker.getDay()]}`)
      dateBox = React.createElement("div",null,[yeaerMonth,todayElm])
      return dateBox
    }

}
  return (
    <Wrapper>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        buttonText={{ today: "오늘" }}
        headerToolbar={{
          left: "today prev,next",
          center: "title",
          right: "myCustomButton",
        }}
        selectable={true}
        selectAllow={onSelectAllow}
        customButtons={{
          myCustomButton: {
            text: "일정생성",
            click: onAddEvent,
          },
        }}
        titleFormat={setTitleFormat}
        height="90%"
        locale="kr"
        dayMaxEvents={true}
        events={[
          { title: "종일이벤트", date: "2022-11-08" },
          { title: "시간이벤트", start: "2022-11-08T12:30:00", allDay: false },
          { title: "장기이벤트", start: "2022-11-08", end: "2022-11-20" },
        ]}
        eventColor="rgba(1,140,255)"
        eventClick={onEventClick}
        dateClick={onDateClick}
      />
    </Wrapper>
  );
};

export default Calendar;

const Wrapper = styled.div`
  height: 75%;
  width: 40%;
  margin-top: 5%;
  font-size: 80%;
  .fc-myCustomButton-button {
    height: 1vh;
    width: 4vw;
    font-size: .5vw;
    border-radius: 5px;
  }
  .fc-today-button {
    height: 1vh;
    width: 3vw;
    font-size: .5vw;
    border-radius: 5px;
  }
  .fc th {
    height: 40px;
    text-align: left;
    font-weight: 400;
    vertical-align: middle;
    background-color: rgba(246, 247, 249);
  }
  .fc .fc-daygrid-day-top {
    flex-direction: column;
  }
  .fc-day-sun {
    color: rgba(255, 119, 119);
  }
  .fc .fc-button:not(:disabled),
  .fc .fc-button-primary:disabled {
    height: 30px;
    opacity: 1;

    &:focus {
      box-shadow: none;
    }

    &:active {
      box-shadow: none;
      border-color: none;
    }
  }
  .fc-toolbar-chunk {
    display: flex;
    align-items: center;


    .fc-today-button {
      background-color: white;
      color: black;
      text-align: center;

      &:focus {
        background-color: white;
        color: black;
      }
    }
    .fc-myCustomButton-button {
      border-color: #ff4545;
      background-color: #ff4545;
      color: white;
      text-align: center;

      &:focus {
        background-color: #ff4545;
        color: white;
      }
    }
  }
  .fc-button-group {
    display: flex;
    gap: 2%;
  }
  .fc-direction-ltr .fc-button-group > .fc-button:not(:first-child),
  .fc-direction-ltr .fc-button-group > .fc-button:not(:last-child) {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 1px solid white;
    background-color: white;
    color: black;
    padding: 0px;

    &:hover {
      background-color: rgba(233, 238, 242);
    }

    &:active {
      box-shadow: none;
    }

    &:focus {
      box-shadow: none;
    }
  }
  .fc .fc-button .fc-icon {
    font-size: 20px;
    font-weight: bold;
  }
  .fc-next-button {
    border-radius: 50%;
  }
  .fc .fc-toolbar-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 1vw;
    line-height: 1.2vw;
  }
`;
