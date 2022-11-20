import {createSlice} from '@reduxjs/toolkit';

const getIds = createSlice({
    name: 'getIds',
    initialState: { userId: 0, commentId:0 },
    reducers: {
        getUserId: (state, action) => {
            state.userId = action.payload;
        },
        getCommentId: (state, action) => {
            state.commentId = action.payload
        }
    }
});

export const { getUserId, getCommentId } = getIds.actions
export default getIds;
