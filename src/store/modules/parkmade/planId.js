import {createSlice} from '@reduxjs/toolkit';

const planId = createSlice({
    name: 'planId',
    initialState: null,
    reducers: {
        setPlanId: (state, action) => {
            state = action.payload;
        },
    }
});

export const { setPlanId } = planId.actions
export default planId;
