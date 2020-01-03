import React from 'react'
import pt from 'prop-types'

import { connect } from 'react-redux'
import { archiveTask, pinTask } from '../../lib/redux'

import Task from '../Task'

export const TaskList = ({
  loading,
  tasks,
  onPinTask,
  onArchiveTask
}) => {
  const events = {
    onPinTask,
    onArchiveTask
  }

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter(t => t.state === 'TASK_PINNED'),
    ...tasks.filter(t => t.state !== 'TASK_PINNED'),
  ]

  return (
    <div className="list-items">
      {
        tasksInOrder.map((task) => (
          <Task key={task.id} task={task} {...events} />
        ))
      }
    </div>
  )
}

TaskList.propTypes = {
  loading: pt.bool,
  tasks: pt.arrayOf(Task.propTypes.task).isRequired,
  onPinTask: pt.func.isRequired,
  onArchiveTask: pt.func.isRequired
}

TaskList.defaultProps = {
  loading: false
}

export default connect(
  ({ tasks }) => ({
    tasks: tasks.filter((task) => task.state === 'TASK_INBOX' || task.state === 'TASK_PINNED')
  }),
  (dispatch) => ({
    onArchiveTask: (id) => dispatch(archiveTask(id)),
    onPinTask: (id) => dispatch(pinTask(id))
  })
)(TaskList)
