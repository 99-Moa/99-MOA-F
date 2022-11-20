import FullCalendar from "@fullcalendar/react";
import styled from "styled-components";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

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
      padding: 0px 15px;
      background-color: white;
      color: black;
      font-size: 15px;
      text-align: center;

      &:focus {
        background-color: white;
        color: black;
      }
    }

    .fc-myCustomButton-button {
      padding: 0px 15px;
      border-color: rgba(255, 69, 79);
      background-color: rgba(255, 69, 79);
      color: white;
      font-size: 15px;
      text-align: center;

      &:focus {
        background-color: rgba(255, 69, 79);
        color: white;
      }
    }
  }

  .fc-button-group {
    display: flex;
    gap: 5px;
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
    font-size: 25px;
  }
`;
