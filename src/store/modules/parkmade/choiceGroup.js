import {createSlice} from '@reduxjs/toolkit';

const choiceGroup = createSlice({
    name: 'choiceGroup',
    initialState: false,
    reducers: {
          isChoiceGroup: (state, action) => {
            state = action.payload;
        },
    }
});

export const { isChoiceGroup } = choiceGroup.actions
export default choiceGroup;
