import FullCalendar from "@fullcalendar/react";
import styled from "styled-components";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React from "react";
import { defaultColor } from "./styles";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { toggleChoiceGroup } from "../../store/modules/parkmade/toggleModal";

const Calendar = ({schedulesData }) => {
  const dispatch = useDispatch();
  const onDateClick = (e) => {
    const date = e.dateStr;
  };
  const onEventClick = (e) => {};
  const onAddEvent = () => {
    dispatch(toggleChoiceGroup(true));
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
    const yearMonth = React.createElement("div",{key:1},`${date.date.year}년 ${date.date.month+1}월`)
    let todayElm, dateBox

    if(date.date.year === year && date.date.month +1 === month){
      todayElm = React.createElement("div",{key:2},`${today}`)
      dateBox = React.createElement("div",null,[yearMonth,todayElm])
      return dateBox
    } else {
      todayElm = React.createElement("div",{key:2},1)
      dateBox = React.createElement("div",null,[yearMonth,todayElm])
      return dateBox
    }
}
  return (
    <Wrap>
      <UpperDiv>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          buttonText={{ today: "오늘" }}
          headerToolbar={{
            left: "today myCustomButton",
            center: "title",
            right: "prev,next",
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
          events={
            schedulesData.map((prop) => {
              if (prop.startDate === prop.endDate) {
                return { "title": prop.title, "start": prop.startDate }
              }
              return { "title": prop.title, "start": prop.startDate, "end": dayjs(prop.endDate).add(1, "day").format("YYYY-MM-DD") }
            })
          }
          eventColor="rgba(1,140,255)"
          eventClick={onEventClick}
          dateClick={onDateClick}
        />
      </UpperDiv>
    </Wrap>
  );
};

export default React.memo(Calendar);

const Wrap = styled.div`
  height: 95%;
  width: 70%;
  margin-top: 2%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
const UpperDiv = styled.div`
  height: 90%;
  width: 100%;

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
    margin-left: 1em;
    margin-right: 1em;
    padding: 0.3em 1em;
    font-size: 1em;
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
    position: relative;

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
      width:180%;
      height:200%;
      border-color: ${defaultColor.red};
      border-radius: 20px;
      box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
      background-color: ${defaultColor.red};
      color: white;
      text-align: center;
      font-weight: 600;
      position: absolute;
      z-index: 2;
      top:60em;
      left:107em;
      transition: all 0.3s ease 0s;

      &:focus {
      background-color: ${defaultColor.red};
      color: white;
      }

      &:hover {
      background-color: ${defaultColor.red};
      box-shadow: 0px 15px 20px rgba(0,0,0,0.2);
      color: #fff;
      transform: translateY(-20%);
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
  .fc-next-button {
    border-radius: 50%;
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
