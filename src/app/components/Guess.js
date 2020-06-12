import React, { useContext, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Modal,
  View,
} from "react-native";
import { AppContext, Alphabet } from "../AppContext";
import PropTypes from "prop-types";
import { accentColor } from "app/Style";

const Guess = (props) => {
  // use a contextual state with dispatch/reducer
  const context = useContext(AppContext);

  if (!context.state.available.includes(props.value)) {
    return <View style={styles.selectedItem} />;
  }

  return (
    <TouchableOpacity
      style={[styles.item, props.style]}
      onPress={props.onPress}
    >
      <Text style={styles.itemText}>{props.value}</Text>
    </TouchableOpacity>
  );
};

const GuessList = (props) => {
  // use a contextual state with dispatch/reducer
  const context = useContext(AppContext);

  // callback when guessing a letter
  const onSelect = (text) => {
    if (context.state.letters.includes(text)) {
      context.dispatch({ type: "guessed", payload: text });
    } else {
      context.dispatch({ type: "guess", payload: text });
    }

    props.onFinish();
  };

  return (
    <FlatList
      data={Alphabet}
      extraData={context.state.available}
      numColumns={4}
      keyExtractor={(item, index) => index.toString()}
      columnWrapperStyle={styles.row}
      renderItem={(row) => (
        <Guess
          key={row.index}
          value={row.item}
          onPress={() => onSelect(row.item)}
        />
      )}
    />
  );
};

const GuessWidget = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[props.style]}>
      <Button
        title="Guess a Letter"
        onPress={() => setVisible(true)}
        color={accentColor}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.container}>
          <GuessList onFinish={() => setVisible(false)} />
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.back}
          >
            <Text style={styles.backText}>×</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

Guess.propTypes = {
  onPress: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  style: PropTypes.object,
};

GuessList.propTypes = {
  onFinish: PropTypes.func,
};

GuessWidget.propTypes = {
  style: PropTypes.object,
};

const itemStyles = StyleSheet.create({
  item: {
    alignSelf: "center",
    height: 52,
    width: 52,
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    flex: 1,
  },
  item: {
    ...itemStyles.item,
    alignItems: "center",
    backgroundColor: accentColor,
    marginHorizontal: 26,
    borderRadius: 26,
  },
  selectedItem: {
    ...itemStyles.item,
    marginHorizontal: 26,
  },
  itemText: {
    fontSize: 32,
    marginTop: 3,
  },
  back: {
    ...itemStyles.item,
    alignItems: "center",
  },
  backText: {
    fontSize: 48,
    color: accentColor,
  },
  row: {
    marginVertical: 15,
    flex: 1,
    justifyContent: "space-around",
  },
});

export default GuessWidget;
