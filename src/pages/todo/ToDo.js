import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import Task from "./Task";

import NewToDo from "./NewToDo";
import EditToDo from "./EditToDo";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import firebase from "firebase";

import { useFirestore } from "react-redux-firebase";
import Loading from "../../components/Loading";

import Board, { addCard, addColumn } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import "./board.css";

const ToDo = () => {
  // Attach contact listener
  const currentUser = firebase.auth().currentUser.uid;

  const [isUpdating, setUpdating] = useState(false);

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

  useEffect(() => {
    if (!isUpdating) {
    }
  });

  const [editOpen, setEditOpen] = useState({
    open: false,
    values: { title: "" },
  });

  const addNewCard = (newCard) => {
    setUpdating(true);
    var newBoard = JSON.stringify(todos[0].board);

    newBoard = JSON.parse(newBoard);

    let myuuid = uuidv4();

    newCard.id = myuuid;

    newBoard.columns[0].cards.push(newCard);

    firestore
      .collection("todos")
      .doc(todos[0].id)
      .update({ board: newBoard, userId: currentUser, id: todos[0].id })
      .then(() => {
        setUpdating(false);
      });
  };

  const handleDataChange = (newData) => {
    {
      firestore
        .collection("todos")
        .doc(todos[0].id)
        .update({ board: newData, userId: currentUser, id: todos[0].id });
    }
  };

  const openEdit = (values) => {
    setEditOpen({ open: true, values: values });
  };

  const closeEdit = () => {
    setEditOpen({ open: false, values: {} });
  };

  const handleEdit = (values) => {
    setUpdating(true);

    closeEdit();

    var newBoard = JSON.stringify(todos[0].board);

    newBoard = JSON.parse(newBoard);

    newBoard = {
      ...newBoard,
      columns: newBoard.columns.map((column) => {
        return {
          ...column,
          cards: column.cards.map((card) => {
            if (card.id !== values.id) {
     
              return card;
            }
            return values;
          }),
        };
      }),
    };

    console.log(newBoard)

    

    firestore
      .collection("todos")
      .doc(todos[0].id)
      .update({ board: newBoard, userId: currentUser, id: todos[0].id })
      .then(() => {
        setUpdating(false);
      });
  };

  const handleDelete = (id) => {
    setUpdating(true);
    var newBoard = JSON.stringify(todos[0].board);

    newBoard = JSON.parse(newBoard);

    newBoard = {
      ...newBoard,
      columns: newBoard.columns.map((column) => {
        return {
          ...column,
          cards: column.cards.filter((card) => card.id !== id),
        };
      }),
    };

    firestore
      .collection("todos")
      .doc(todos[0].id)
      .update({ board: newBoard, userId: currentUser, id: todos[0].id })
      .then(() => {
        setUpdating(false);
      });
  };

  if (!todos || isUpdating) return <Loading />;

  const defaultBoard = {
    columns: [
      {
        id: 1,
        title: "Backlog",
        cards: [
          {
            id: 1,
            title: "This is a sample task",
            description: "Click on the arrow to see details...",
            details:
              "You can edit the task by clicking the pencil, or delete it by clicking on the trash icon. When you have started a task, just drag it to the 'In Progress' column - and when it's ready for review, drag it to the 'For Review' column, etc. It's that easy!",
          },
        ],
      },
      {
        id: 2,
        title: "In Progress",
        cards: [],
      },
      {
        id: 3,
        title: "For Review",
        cards: [],
      },
      {
        id: 4,
        title: "Completed",
        cards: [],
      },
      {
        id: 5,
        title: "Archived",
        cards: [],
      },
    ],
  };

  var board = todos.length > 0 ? todos[0].board : defaultBoard;

  if (todos.length === 0) {
    firestore.collection("todos").add({ board: board, userId: currentUser });
  }

  return (
    <>
      <Board
        initialBoard={board}
        renderCard={(
          { title, description, due, details, assignedTo, id },
          { dragging },
        ) => (
          <Task
            dragging={dragging}
            title={title}
            description={description}
            due={due}
            assignedTo={assignedTo}
            details={details}
            id={id}
            openEdit={openEdit}
            handleDelete={handleDelete}
          />
        )}
        onCardDragEnd={handleDataChange}
        onColumnDragEnd={handleDataChange}
      />
      <NewToDo contacts={contacts} addNewCard={addNewCard} />
      <EditToDo
        contacts={contacts}
        open={editOpen.open}
        closeEdit={closeEdit}
        handleEdit={handleEdit}
        addNewCard={addNewCard}
        values={editOpen.values}
      />
    </>
  );
};

export default ToDo;
