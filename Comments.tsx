// CommentPage.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList} from 'react-native';
import StarRatingComponent from './Rating';
import {Picker} from '@react-native-picker/picker';

//import { SafeAreaView, StyleSheet } from 'react-native';

interface CommentPageProps {
  // Add any necessary props
}

interface CommentData {
  name: string;
  comment: string;
  category: string;
}

const CommentPage: React.FC<CommentPageProps> = () => {
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [category, setCategory] = useState<string>('red');
  const [commentsList, setCommentsList] = useState<CommentData[]>([]);

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleCommentChange = (text: string) => {
    setComment(text);
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const handleSubmit = () => {
    if (name && comment && category) {
      setCommentsList((prevComments) => [
        ...prevComments,
        { name, comment, category },
      ]);
      // Clear input fields after submitting
      setName('');
      setComment('');
      setCategory('red'); // Reset category to the default after submission
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Safe Rating:</Text>
      {/* <TextInput
        style={styles.input}
        value={name}
        onChangeText={handleNameChange}
        placeholder="Enter your name"
      /> */}
      
      <StarRatingComponent
        name="rating"
        value={0} // Set an initial value if needed
        starCount={10}
        starColor="#ffb400"
        emptyStarColor="#333"
        editing={true}
        onStarClick={(index, value, name) => handleNameChange(index.toString())}
            // console.log(`Star clicked: ${index}`)}
      />

      <Text style={styles.label}>Comment:</Text>
      <TextInput
        style={[styles.input, styles.commentInput]}
        value={comment}
        onChangeText={handleCommentChange}
        placeholder="Enter your comment"
        multiline
      />

    <Text style={styles.label}>Category:</Text>
      <Picker
        selectedValue={category}
        onValueChange={handleCategoryChange}
        style={styles.input}
      >
        <Picker.Item label="Red" value="red" />
        <Picker.Item label="Yellow" value="yellow" />
        <Picker.Item label="Green" value="green" />
      </Picker>

      <Button title="Submit" onPress={handleSubmit} />

      <Text style={styles.commentsHeading}>List of Comments:</Text>
      <FlatList
        data={commentsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text>{item.name}: {item.comment}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  commentInput: {
    height: 100,
    textAlignVertical: 'top', // for multiline input
  },
  commentsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  commentItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    marginTop: 8,
  },
});

export default CommentPage;
