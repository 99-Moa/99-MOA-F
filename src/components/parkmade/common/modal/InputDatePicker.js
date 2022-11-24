import { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';

const InputDatePicker = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <Wrap className="Wrap-DatePicker">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={new Date()}
        endDate={null}
        locale={ko}
        placeholderText="시작일"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={new Date()}
        endDate={null}
        minDate={startDate}
        locale={ko}
        placeholderText="종료일"
      />
    </Wrap>
  );
}

export default InputDatePicker;

const Wrap = styled.div`
  width: 40%;
  max-height: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap:5%;
  
  .react-datepicker-wrapper {
    width: 40%;
    height: 100%;
  };
  .react-datepicker-popper {
    position: absolute;
  }
  input {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  };
`;
