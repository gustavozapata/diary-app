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

//Key used by AsyncStorage
const STORAGE_KEY = "settings_storage";

//This initialises the Context API - we can then use it to create a Provider
const DiaryContext = React.createContext({});

//These are the reducers - they are the only ones that can modify the state of the application
//They define the business rules of our application
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
      //Once the edit (patch call) is done, it will reset title and description to empty
      //Also, it finds the entry by its id, and it then passes the new content (in the action.payload) to be replaced by the old content
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
      //This reducer receives the id of the entry to be deleted
      //it then iterate through all the entries and creates a new array with all the items except the one with the id equal to the id passed
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
      //This reducer add a comment to the 'comments' array.
      //It first finds the entry and then it pushes the new comment into the comments array
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
                //this is what's happening here: comments: [all the comments, new comment]
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
      //The language is loaded from the objects defined in the 'content' folder
      //export const EN_Content = {TAB_NAME: "Home"...}
      return {
        ...state,
        language: action.payload,
        content: action.payload === "English" ? EN_Content : ES_Content,
      };
    case LOAD_LANG:
      //Whenever the language is changed, it is stored in the persistent storage on the device
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
      //Switching theme is also similar to language
      //it loads the object specific to each theme
      return {
        ...state,
        isDark: action.payload,
        theme: action.payload ? DARK_Styles : LIGHT_Styles,
      };
    case LOAD_THEME:
      //The selected theme is then stored on the persistent storage of the device
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
      //This will sort the entries based on their titles alphabetically
      //sort() takes a function with two values - and compares them
      //["a", "g", "h"] sort will compare each one of this to see which goes first/last
      // a,g then a,h then g,h
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
      //Similar than SORT_TITLE by using dates
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

//This is the initial state of the application
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

//This Provider wraps the whole app and passes down all the state of the app and the 'actions'  or functions that call the reducers
export const DiaryProvider = ({ children }) => {
  //The Reducer is created and takes the reducers functions and the initial state
  const [state, dispatch] = useReducer(diaryReducer, initialDiaryState);

  //This hook is called every time the STORAGE_KEY is created/updated
  //Since STORAGE_KEY is initialised and not modified, useEffect will run only once
  useEffect(() => {
    //This line is used in development to delete the data in the storage (Async Storage)
    // AsyncStorage.clear();

    //async and await are used to allow the app to run asynchronous or non-blocking code
    //Since AsyncStorage performs actions that can delay the application, we tell the program to treat it asynchronously
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

  //The below are functions that dispatch actions with a type and some data (payload)

  // ENTRIES
  const getEntries = () => {
    //Axios calls (get, post, patch, etc.) the end-point and once a response is sent back, the dispatch will call the specific reducer
    //JS promise is used by axios here
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

  // PROPERTIES IN EACH ENTRY
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

  //SETTINGS
  //Both functions first update the state and then store the updated state onto the persistent storage on the device
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

  //The state and the actions are passed to the highest level component App.js
  return (
    <DiaryContext.Provider
      value={{
        state: state,
        save: saveDiaryEntry,
        edit: editDiaryEntry,
        //The ones below don't use the above syntax. ES6 allows us to pass just the key when the key/value have the same name
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
