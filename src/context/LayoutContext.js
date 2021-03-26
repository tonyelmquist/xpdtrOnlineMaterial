import React from "react";

var LayoutStateContext = React.createContext();
var LayoutDispatchContext = React.createContext();

function layoutReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpened: !state.isSidebarOpened };
    case "SET_BUILDING":
      return { ...state, currentBuilding: action.payload };
    case "CLEAR_BUILDING":
      return { ...state, currentBuilding: "" };
    case "SET_PROJECT":
      return { ...state, currentProject: action.payload };
    case "CLEAR_PROJECT":
      return { ...state, currentProject: "" };
    case "SET_CONTACT":
      return { ...state, currentContact: action.payload };
    case "CLEAR_CONTACT":
      return { ...state, currentContact: "" };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function LayoutProvider({ children }) {
  var [state, dispatch] = React.useReducer(layoutReducer, {
    isSidebarOpened: false,
  });
  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>
        {children}
      </LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
}

function useLayoutState() {
  var context = React.useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
}

function useLayoutDispatch() {
  var context = React.useContext(LayoutDispatchContext);
  if (context === undefined) {
    throw new Error("useLayoutDispatch must be used within a LayoutProvider");
  }
  return context;
}

export { LayoutProvider, useLayoutState, useLayoutDispatch, toggleSidebar, setBuilding, clearBuilding, setContact, clearContact, setProject, clearProject};

// ###########################################################
function toggleSidebar(dispatch) {
  dispatch({
    type: "TOGGLE_SIDEBAR",
  });
}

function setBuilding(dispatch, id) {
  dispatch({
    type: "SET_BUILDING",
    payload: id
  });
}

function clearBuilding(dispatch) {
  dispatch({
    type: "CLEAR_BUILDING",
  });
}

function setContact(dispatch, id) {
  dispatch({
    type: "SET_CONTACT",
    payload: id,
  });
}

function clearContact(dispatch) {
  dispatch({
    type: "CLEAR_CONTACT",
  });
}

function setProject(dispatch, id) {
  dispatch({
    type: "SET_PROJECT",
    payload: id,
  });
}

function clearProject(dispatch) {
  dispatch({
    type: "CLEAR_PROJECT",
  });
}
