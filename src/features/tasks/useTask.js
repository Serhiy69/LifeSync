import { useState, useEffect, useCallback } from 'react';
import { taskService } from './taskService';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await taskService.fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    taskService
      .fetchTasks()
      .then((data) => {
        if (!ignore) {
          setTasks(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);


  const addTask = async (taskData) => {
    try {
      const created = await taskService.createTask(taskData);
      setTasks((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };


  const toggleTask = async (taskId, currentCompleted) => {
    try {
      const updated = await taskService.toggleTask(taskId, !currentCompleted);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };


  const deleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    tasks,
    isLoading,
    error,
    refreshTasks: loadTasks,
    addTask,
    toggleTask,
    deleteTask,
  };
}
