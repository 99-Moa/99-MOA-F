import FullCalendar from "@fullcalendar/react";
import styled from "styled-components";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React from "react";
import { defaultColor } from "./styles";

const Calendar = ({ setIsChoiceGroup, schedulesData }) => {
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
    setIsChoiceGroup((prev) => !prev);
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
    const newD = new Date();
    const year = newD.getFullYear();
    const month = newD.getMonth() + 1;
    const today = newD.getDate();
    const day = newD.getDay();

    const dayArr = ["일", "월", "화", "수", "목", "금", "토"];

    const yearElm = React.createElement("div", null, `${date.date.year}`);
    const monthElm = React.createElement("div", null, `${date.date.month + 1}`);
    const yearMonth = React.createElement(
      "div",
      { key: 1 },
      `${date.date.year}년 ${date.date.month + 1}월`
    );
    let todayElm, dateBox, dayElm;

    if (date.date.year === year && date.date.month + 1 === month) {
      todayElm = React.createElement("div", { key: 2 }, `${today}`);
      // dayElm = React.createElement("div",null,`${dayArr[day]}`)
      dateBox = React.createElement("div", null, [yearMonth, todayElm]);
      return dateBox;
    } else {
      todayElm = React.createElement("div", { key: 2 }, 1);
      // dayElm = React.createElement("div",null,`${dayArr[date.date.marker.getDay()]}`)
      dateBox = React.createElement("div", null, [yearMonth, todayElm]);
      return dateBox;
    }
  };
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

  @media all and (min-width: 1024px) {
    font-size: 11px;
  }
  @media all and (min-width: 2000px) {
    font-size: 15px;
  }

  .fc th {
    height: 2.5em;
    text-align: left;
    font-weight: 400;
    vertical-align: middle;
    background-color: ${defaultColor.lightGrey};
  }

  .fc .fc-daygrid-day-top {
    flex-direction: column;
    font-size: 0.9em;
  }

  .fc-day-sun {
    color: rgba(255, 119, 119);
  }

  .fc .fc-button:not(:disabled),
  .fc .fc-button-primary:disabled {
    padding: 0.3em 1em;
    font-size: 0.8em;
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
      border: 1px solid ${defaultColor.darkGrey};
      text-align: center;
      color: black;
      background-color: white;

      &:focus {
        background-color: white;
        color: black;
      }
    }

    .fc-myCustomButton-button {
      border-color: ${defaultColor.red};
      background-color: ${defaultColor.red};
      color: white;
      text-align: center;

      &:focus {
        background-color: ${defaultColor.red};
        color: white;
      }
    }
  }

  .fc-button-group {
    display: flex;
  }

  .fc-direction-ltr .fc-button-group > .fc-button:not(:first-child),
  .fc-direction-ltr .fc-button-group > .fc-button:not(:last-child) {
    height: 100%;
    border-radius: 50%;
    border: 1px solid white;
    background-color: white;
    color: black;
    padding: 0px;

    &:hover {
      background-color: ${defaultColor.lightGrey};
    }

    &:active {
      box-shadow: none;
    }

    &:focus {
      box-shadow: none;
    }
  }

  .fc .fc-button .fc-icon {
    padding: 0.8em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    font-weight: bold;
  }

  .fc .fc-toolbar-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 1.4em;
    line-height: 1.2em;
  }
`;
