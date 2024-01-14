// StarRatingComponent.tsx

import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

interface StarRatingComponentProps {
  name: string;
  value?: number;
  editing?: boolean;
  starCount?: number;
  starColor?: string;
  emptyStarColor?: string;
  onStarClick?: (index: number, value: number, name: string) => void;
  onStarHover?: (index: number, value: number, name: string) => void;
  onStarHoverOut?: (index: number, value: number, name: string) => void;
  renderStarIcon?: (index: number, value: number, name: string) => React.ReactNode;
  renderStarIconHalf?: (index: number, value: number, name: string) => React.ReactNode;
}

const StarRatingComponent: React.FC<StarRatingComponentProps> = ({
  name,
  value = 0,
  editing = true,
  starCount = 5,
  starColor = '#ffb400',
  emptyStarColor = '#333',
  onStarClick,
  onStarHover,
  onStarHoverOut,
  renderStarIcon,
  renderStarIconHalf,
}) => {
  const [rating, setRating] = useState(value);

  const onChange = (inputValue: number) => {
    const isEditing = editing;
    if (!isEditing) {
      return;
    }

    setRating(inputValue);
  };

  const onStarPress = (index: number) => {
    const isEditing = editing;
    if (!isEditing) {
      return;
    }

    setRating(index);
    onStarClick && onStarClick(index, rating, name);
  };

  const onStarHoverHandler = (index: number) => {
    const isEditing = editing;
    if (!isEditing) {
      return;
    }

    onStarHover && onStarHover(index, rating, name);
  };

  const onStarHoverOutHandler = (index: number) => {
    const isEditing = editing;
    if (!isEditing) {
      return;
    }

    onStarHoverOut && onStarHoverOut(index, rating, name);
  };

  const renderStars = () => {
    const starStyles = (i: number) => ({
      cursor: editing ? 'pointer' : 'default',
      color: rating <= i ? starColor : emptyStarColor,
    
    });

    const starNodes = [];
    for (let i = starCount; i > 0; i--) {
      const starNode = (
        <TouchableWithoutFeedback
          key={i}
          onPress={() => onStarPress(i)}
          onPressIn={() => onStarHoverHandler(i)}
          onPressOut={() => onStarHoverOutHandler(i)}
        >
          <View
            style={{
              marginRight: 10, // Adjust the spacing between stars as needed
            }}
          >
            <Text style={starStyles(i)}>
              {renderIcon(i)}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );

      starNodes.push(starNode);
    }

    return starNodes;
  };

  const renderIcon = (index: number) => {
    if (typeof renderStarIconHalf === 'function' && Math.ceil(rating) === index && rating % 1 !== 0) {
      return renderStarIconHalf(index, rating, name);
    }

    if (typeof renderStarIcon === 'function') {
      return renderStarIcon(index, rating, name);
    }

    return '*'; // Replace with your desired star icon
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {renderStars()}
    </View>
  );
};

export default StarRatingComponent;
