import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import Card from "./Card"
import NewToDo from "./NewToDo"

import firebase from "firebase";

import { useFirestore } from "react-redux-firebase";

import Board from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import "./board.css";

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
  

  const todos = useSelector(({ firestore: { ordered } }) => ordered.todos);

  const firestore = useFirestore();

  const handleDataChange = (newData) => {
    console.log("data changed");
    console.log(newData);
  };

  const board = {
    columns: [
      {
        id: 1,
        title: "Backlog",
        cards: [
          {
            id: 1,
            assignedTo: "Suzie",
            title: "Add card",
            description: "Add capability to add a card in a column",
            dueDate: "12-10-2021",
            project: "Project One",
          },
        ],
      },
      {
        id: 2,
        title: "Doing",
        cards: [
          {
            id: 2,
            assignedTo: "Fred",
            title: "Drag-n-drop support",
            description: "Move a card between the columns",
            dueDate: "12-10-2021",
            project: "Project Two",
          },
        ],
      },
    ],
  };

  return (<>
    <Board
      allowRemoveLane
      allowRenameColumn
      allowRemoveCard
      renderCard={({ title, description, dueDate, project, assignedTo }, { removeCard, dragging }) => (
        <Card dragging={dragging} title={title} description={description} dueDate={dueDate} project={project} assignedTo={assignedTo}>
        
          <button type="button" onClick={removeCard}>
            Remove Card
          </button>
        </Card>
      )}
      initialBoard={board}
    />
    <NewToDo contacts/>
    </>
  );
};

export default ToDo;
