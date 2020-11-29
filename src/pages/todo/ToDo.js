import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

import firebase from "firebase";


import { useFirestore } from "react-redux-firebase";


import Board from "react-trello";
import "./board.css";
import { Card as myCard} from './Card';

import { AddCard } from './AddCard';

const ToDo = () => {
  // Attach contact listener
  const currentUser = firebase.auth().currentUser.uid;

  const todoQuery = {
    collection: "todos",
    limitTo: 10,
    where: ["userId", "==", currentUser],
  };

  const projectQuery = {
    collection: "projects",
    limitTo: 10,
    where: ["userId", "==", currentUser],
  };

  const contactQuery = {
    collection: "contacts",
    limitTo: 10,
    where: ["userId", "==", currentUser],
  };

  useFirestoreConnect(() => [projectQuery]);
  useFirestoreConnect(() => [contactQuery]);

  const contacts = useSelector(
    ({ firestore: { ordered } }) => ordered.contacts,
  );

  const buildings = useSelector(
    ({ firestore: { ordered } }) => ordered.buildings,
  );

  useFirestoreConnect(() => [todoQuery]);
  const data = {
    lanes: [
      {
        id: "lane1",
        title: "Planned Tasks",
        label: "2/2",
        cards: [
          {
            id: "Card1",
            title: "Write Blog",
            description: "Can AI make memes",
            label: "30 mins",
            draggable: false,
          },
          {
            id: "Card2",
            title: "Pay Rent",
            description: "Transfer via NEFT",
            label: "5 mins",
            metadata: { sha: "be312a1" },
          },
        ],
      },
      {
        id: "lane2",
        title: "Completed",
        label: "0/0",
        cards: [],
      },
    ],
  };

  const todos = useSelector(
    ({ firestore: { ordered } }) => ordered.todos,
  );

  const firestore = useFirestore();

  const deletecontacts = (data) => {
    console.log(data.data);
    data.data.forEach((element) => {
      //  firestore.collection("todos").doc(todos[element.index].id).delete();
    });
  };
  // Show a message while todos are loading
  /*  if (!isLoaded(contacts)) {
    return "Loading";
  } */

  const onColumnNew = (newColumn) => {
    const theColumn = {
      id: new Date().getTime(),
      ...newColumn,
    };
    console.log(theColumn);
    return theColumn;
  };

const components = { 
  Card: myCard,
  NewCardForm: AddCard,
};

const handleDataChange = (newData) => {
  console.log("data changed")
  console.log(newData)
}

  return (
    <Board
      style={{ backgroundColor: "transparent", margin: "0 20px 0 0", padding: "0" }} // Style of BoardWrapper
      data={data}
      editable
      canAddLanes
      onDataChange={handleDataChange}
      editLaneTitle
      onLaneUpdate={(laneId, data) =>
        console.log(`onLaneUpdate: ${laneId} -> ${data.title}`)
      }
      onLaneAdd={(t) => console.log("You added a line with title " + t.title)}
      components={components}
    />
  );
};

export default ToDo;
