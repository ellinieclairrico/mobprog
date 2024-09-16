import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, Alert, StyleSheet } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTask, setCurrentTask] = useState(null);

  // Add a new task to the list
  const handleAddTask = () => {
    if (newTask.trim() === '') {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }

    const newTaskObject = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,  // Add completed status
    };

    setTasks([...tasks, newTaskObject]);
    setNewTask('');
  };

  // Mark task as completed
  const handleCompleteTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  // Remove a task from the list
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Update an existing task
  const handleUpdateTask = () => {
    setTasks(
      tasks.map(task =>
        task.id === currentTask.id ? { ...task, text: newTask } : task
      )
    );
    setIsModalVisible(false);
    setNewTask('');
    setCurrentTask(null);
  };

  // Open modal with the task to be edited
  const handleEditTask = (task) => {
    setCurrentTask(task);
    setNewTask(task.text);  // Set the current task text to be edited
    setIsModalVisible(true);
  };

  // Filter tasks based on search input
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render each task item
  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => handleCompleteTask(item.id)}>
        <Text style={styles.completeText}>{item.completed ? '✔️' : '✓'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleEditTask(item)}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.appContainer}>
      <Text style={styles.title}>To-Do List</Text>

      {/* Input for adding a new task */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputField}
          placeholder="Add new task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <TextInput
        style={styles.searchField}
        placeholder="Search tasks"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* List of tasks */}
      <FlatList
        data={filteredTasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
      />

      {/* Modal for editing a task */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={[styles.inputField, styles.modalInputField]}  // Added styles for better visibility
              value={newTask}  // Make sure the value of the TextInput is newTask
              onChangeText={setNewTask}
            />
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdateTask}>
              <Text style={styles.updateButtonText}>Update Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,  // Increased margin to lower the title
  },
  inputWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchField: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  taskText: {
    flex: 1,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',  // Line through completed task
    color: 'gray',
  },
  completeText: {
    color: '#28a745',
    marginRight: 10,
  },
  editText: {
    color: '#007BFF',
    marginRight: 10,
  },
  deleteText: {
    color: '#FF0000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 50,
  },
  modalInputField: {
    fontSize: 18,  // Increased font size for better visibility
    margin: 20,
    padding: 10,
    borderRadius: 20,
  },
  updateButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  updateButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
