import React from 'react';
import { connect } from 'unistore/react';
import Card from '../Card';
import action from '../../../store/actions';
import database from '../../../dataBase/db';
import './index.scss';

const Cards = (props) => {
  database.getAll.then((res) => {
    res.onsuccess = (res) => {
      props.addTask(res.target.result);
    };
  });

  return props.tasks.map((task) => {
    return <Card key={task.id} id={task.id} name={task.name} text={task.text} status={task.status} />;
  });
};

export default connect(
  'tasks',
  action
)(Cards);