//CONTEXT BY GORDON
import React, { useReducer, useEffect } from "react";
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
  SWITCH_LANG,
  SWITCH_THEME,
  SORT_TITLE,
  SORT_DATE,
  LOAD_LANG,
  LOAD_THEME,
} from "../helpers/types";
import axios from "axios";
import { host } from "../config/config";
import { EN_Content } from "../content/English";
import { ES_Content } from "../content/Spanish";
import { DARK_Styles } from "../styles/darkStyles";
import { LIGHT_Styles } from "../styles/lightStyles";
import AsyncStorage from "@react-native-community/async-storage";

const STORAGE_KEY = "settings_storage";

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
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id !== action.payload.id) {
            return entry;
          } else {
            return {
              ...entry,
              page: action.payload.page,
            };
          }
        }),
      };
    case SWITCH_LANG:
      return {
        ...state,
        language: action.payload,
        content: action.payload === "English" ? EN_Content : ES_Content,
      };
    case LOAD_LANG:
      try {
        AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ theme: state.isDark, language: action.payload })
        );
      } catch (err) {
        console.log(err);
      } finally {
        return state;
      }
    case SWITCH_THEME:
      return {
        ...state,
        isDark: action.payload,
        theme: action.payload ? DARK_Styles : LIGHT_Styles,
      };
    case LOAD_THEME:
      try {
        AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ language: state.language, theme: action.payload })
        );
      } catch (err) {
        console.log(err);
      } finally {
        return state;
      }
    case SORT_TITLE:
      return {
        ...state,
        entries: state.entries.slice().sort((a, b) => {
          var aTitle = a.title.toLowerCase(),
            bTitle = b.title.toLowerCase();
          if (aTitle < bTitle) return -1;
          if (aTitle > bTitle) return 1;
          return 0;
        }),
      };
    case SORT_DATE:
      return {
        ...state,
        entries: state.entries.slice().sort((a, b) => {
          if (a.date < b.date) return -1;
          if (a.date > b.date) return 1;
          return 0;
        }),
      };
    default:
      return state;
  }
};

const initialDiaryState = {
  language: "English",
  isDark: false,
  theme: LIGHT_Styles,
  bookTitle: "",
  bookDescription: "",
  bookDate: toDateString(),
  entries: [],
  comment: "",
  content: EN_Content,
};

export const DiaryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(diaryReducer, initialDiaryState);

  useEffect(() => {
    // AsyncStorage.clear();
    const loadSettings = async () => {
      const storage = await AsyncStorage.getItem(STORAGE_KEY);
      if (storage !== null) {
        let settings = JSON.parse(storage);
        dispatch({
          type: SWITCH_LANG,
          payload: settings.language,
        });
        dispatch({
          type: SWITCH_THEME,
          payload: settings.theme,
        });
      }
    };
    loadSettings();
  }, [STORAGE_KEY]);

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
      .patch(`${host}/api/entries/${id}`, { rating })
      .then(() => {
        dispatch({
          type: ADD_RATING,
          payload: { id, rating },
        });
      })
      .catch((err) => console.log(err));

    if (callback) callback();
  };

  const sortByTitle = () => {
    dispatch({
      type: SORT_TITLE,
    });
  };

  const sortByDate = () => {
    dispatch({
      type: SORT_DATE,
    });
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

  const updatePage = (id, page) => {
    axios
      .patch(`${host}/api/entries/${id}`, { page })
      .then(() => {
        dispatch({
          type: ADD_PAGE,
          payload: { id, page },
        });
      })
      .catch((err) => console.log(err));
  };

  const switchLanguage = (lang) => {
    dispatch({
      type: SWITCH_LANG,
      payload: lang,
    });
    dispatch({
      type: LOAD_LANG,
      payload: lang,
    });
  };

  const switchTheme = (theme) => {
    dispatch({
      type: SWITCH_THEME,
      payload: theme,
    });
    dispatch({
      type: LOAD_THEME,
      payload: theme,
    });
  };

  return (
    <DiaryContext.Provider
      value={{
        state: state,
        save: saveDiaryEntry,
        edit: editDiaryEntry,
        getEntries,
        deleteEntry,
        sortByTitle,
        sortByDate,
        loadEntry,
        updateText,
        updateComment,
        postComment,
        addRating,
        updatePage,
        switchLanguage,
        switchTheme,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

export default DiaryContext;
