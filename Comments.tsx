// CommentPage.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList} from 'react-native';
import StarRatingComponent from './Rating';
import {Picker} from '@react-native-picker/picker';

interface CommentPageProps {
  // Add any necessary props
}

interface CommentData {
  rating: string;
  comment: string;
  category: string;
}

const CommentPage: React.FC<CommentPageProps> = () => {
  const [rating, setRating] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [category, setCategory] = useState<string>('red');
  const [commentsList, setCommentsList] = useState<CommentData[]>([]);

  const handleratingChange = (text: string) => {
    setRating(text);
  };

  const handleCommentChange = (text: string) => {
    setComment(text);
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const handleSubmit = () => {
    
      setCommentsList((prevComments) => [
        ...prevComments,
        { rating, comment, category },
      ]);
      // Clear input fields after submitting
      setRating('');
      setComment('');
      setCategory(''); // Reset category to the default after submission
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Safe Rating:</Text>
      {/* <TextInput
        style={styles.input}
        value={rating}
        onChangeText={handleratingChange}
        placeholder="Enter your rating"
      /> */}
      
      <StarRatingComponent
        rating = "rating"
        value={0} // Set an initial value if needed
        starCount={5}
        starColor="#ffb400"
        emptyStarColor="#333"
        editing={true}
        onStarClick={(index, value, rating) => handleratingChange(index.toString())}
            // console.log(`Star clicked: ${index}`)}
      />

      <Text style={styles.comment_label}>Comment:</Text>
      <TextInput
        style={[styles.input, styles.commentInput]}
        value={comment}
        onChangeText={handleCommentChange}
        placeholder="Enter your comment"
        multiline
      />

    <Text style={styles.category_label}>Category:</Text>
      <Picker
        selectedValue={category}
        onValueChange={handleCategoryChange}
        style={styles.input}
      >
        <Picker.Item label="Select Category" value=" " />
        <Picker.Item label="Homelessness" value="Homelessness" />
        <Picker.Item label="Poor Lighting" value="Poor Lighting" />
        <Picker.Item label="Construction Sites" value="Construction Sites" />
        <Picker.Item label="Gang Presence" value="Gang Presence" />
        <Picker.Item label="Poor Pedestrian Safety" value="Poor Pedestrian Safety" />
        <Picker.Item label="Substance Abuse/Addiction" value="Substance Abuse/Addiction" />
        <Picker.Item label="Social Unrest/Riots" value="Social Unrest/Riots" />
        <Picker.Item label="Abandoned Spaces" value="Abandoned Spaces" />
      </Picker>

      <Button title="Submit" onPress={handleSubmit} />

      {/* <Text style={styles.commentsHeading}>List of Comments:</Text>
      <FlatList
        data={commentsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text>{item.rating}: {item.category}: {item.comment}</Text>
          </View>
        )}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 16,
  },
  comment_label: {
    fontSize: 16,
    marginTop:12,
    marginBottom: 16,
  },
  category_label: {
    fontSize: 16,
    marginBottom: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  commentInput: {
    height: 30,
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
