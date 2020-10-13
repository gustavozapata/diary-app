//CONTEXT BY GORDON
import React, { useReducer } from "react";
import { toDateString } from "../utils/utils";
import {
  GET_BOOKS,
  ADD_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  ADD_COMMENT,
  UPDATE_TITLE,
  UPDATE_DESC,
  LOAD_ENTRY,
  UPDATE_COMMENT,
  ADD_RATING,
  ADD_PAGE,
} from "../helpers/types";
import axios from "axios";
import { host } from "../config/config";

const DiaryContext = React.createContext({});

const diaryReducer = (state, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        entries: action.payload,
      };
    case ADD_BOOK:
      return {
        ...state,
        bookTitle: "",
        bookDescription: "",
        entries: [...state.entries, action.payload],
      };
    case EDIT_BOOK:
      return {
        ...state,
        bookTitle: "",
        bookDescription: "",
        entries: state.entries.map((entry) => {
          if (entry._id !== action.payload._id) {
            return entry;
          }
          return {
            ...entry,
            ...action.payload,
          };
        }),
      };
    case DELETE_BOOK:
      return {
        ...state,
        entries: state.entries.filter((entry) => entry._id !== action.payload),
      };
    case LOAD_ENTRY:
      return {
        ...state,
        bookTitle: action.payload.title,
        bookDescription: action.payload.description,
        bookDate: action.payload.date,
      };
    case UPDATE_TITLE:
      return { ...state, bookTitle: action.payload };
    case UPDATE_DESC:
      return { ...state, bookDescription: action.payload };
    case ADD_COMMENT:
      return {
        ...state,
        comment: "",
        entries: state.entries.map((entry) => {
          if (entry._id !== action.payload.id) {
            return entry;
          } else {
            return {
              ...entry,
              comments: [
                ...entry.comments,
                { user: action.payload.user, comment: action.payload.comment },
              ],
            };
          }
        }),
      };
    case UPDATE_COMMENT:
      return { ...state, comment: action.payload };
    case ADD_RATING:
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id !== action.payload.id) {
            return entry;
          } else {
            return {
              ...entry,
              rating: action.payload.rating,
            };
          }
        }),
      };
    case ADD_PAGE:
      return {};
    default:
      return state;
  }
};

const initialDiaryState = {
  bookTitle: "",
  bookDescription: "",
  bookDate: toDateString(),
  entries: [],
  comment: "",
};

export const DiaryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(diaryReducer, initialDiaryState);

  // ENTRIES
  const getEntries = () => {
    axios.get(`${host}/api/entries`).then((res) => {
      dispatch({
        type: GET_BOOKS,
        payload: res.data.data,
      });
    });
  };

  const saveDiaryEntry = (callback) => {
    axios
      .post(`${host}/api/entries`, {
        title: state.bookTitle,
        description: state.bookDescription,
      })
      .then((res) => {
        dispatch({
          type: ADD_BOOK,
          payload: res.data.data,
        });
      });

    if (callback) callback();
  };

  const editDiaryEntry = (id, callback) => {
    axios
      .patch(`${host}/api/entries/${id}`, {
        title: state.bookTitle,
        description: state.bookDescription,
      })
      .then((res) => {
        dispatch({
          type: EDIT_BOOK,
          payload: res.data.data,
        });
      })
      .catch((err) => console.log(err));

    if (callback) callback();
  };

  const deleteEntry = (id) => {
    axios
      .delete(`${host}/api/entries/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_BOOK,
          payload: id,
        });
      })
      .catch((err) => console.log(err));
  };

  const addRating = (id, rating, callback) => {
    axios
      .patch(`${host}/api/entries/${id}`, rating)
      .then(() => {
        dispatch({
          type: ADD_RATING,
          payload: { id, rating },
        });
      })
      .catch((err) => console.log(err));

    if (callback) callback();
  };

  // COMMENTS
  const loadEntry = (value) => {
    dispatch({
      type: LOAD_ENTRY,
      payload: value,
    });
  };

  const updateText = (field, value) => {
    dispatch({
      type: field,
      payload: value,
    });
  };

  const updateComment = (value) => {
    dispatch({
      type: UPDATE_COMMENT,
      payload: value,
    });
  };

  const postComment = (id, comment) => {
    axios
      .patch(`${host}/api/entries/${id}/comment`, comment)
      .then(() => {
        dispatch({
          type: ADD_COMMENT,
          payload: { id, user: comment.user, comment: comment.comment },
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <DiaryContext.Provider
      value={{
        state: state,
        getEntries: getEntries,
        save: saveDiaryEntry,
        edit: editDiaryEntry,
        deleteEntry: deleteEntry,
        loadEntry: loadEntry,
        updateText: updateText,
        updateComment: updateComment,
        postComment: postComment,
        addRating: addRating,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

export default DiaryContext;
