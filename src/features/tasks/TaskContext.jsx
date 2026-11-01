/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import { useTasks } from './useTask';

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const taskState = useTasks();

  return (
    <TaskContext.Provider value={taskState}>{children}</TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error(
      'useTaskContext має використовуватися всередині TaskProvider'
    );
  }
  return context;
}
