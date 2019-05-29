/**
 * Author: Matthew Bouch
 * Tic-Tac-Toe
 * Play Tic-Tac-Toe a great way to lose friends or be bored!
 */
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import { Constants } from 'expo';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import AssetExample from './components/AssetExample';
import { Card } from 'react-native-paper';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    //gamestate and current player
    this.state = {
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
    };
  }
  componentDidMount() {
    this.initializeGame();
  }
  //the board that contains the array of X's and O's
  initializeGame = () => {
    this.setState({
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
    });
  };
  //returns who has won the game
  getWinner = () => {
    var sum;
    var arr = this.state.gameState;
    const NUM_TILES = 3;
    //Check Rows and returns 1 for player 1 -1 for player 2
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }
    //Checks Columns and returns 1 for player 1 -1 for player 2
    for (i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }
    //Checks Diagnols and returns 1 for player 1 -1 for player 2
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }
    //no winner
    return 0;
  };

  //what happens when you press a tile
  onTilePress = (row, col) => {
    var value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }

    var currentPlayer = this.state.currentPlayer;
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });
    //changes to correct player
    var nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });
    //check for winner
    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert('Player 1 has won the game');
      this.initializeGame();
    } else if (winner == -1) {
      Alert.alert('Player 2 has won the game');
      this.initializeGame();
    }
  };

  onNewGamePress = () => {
    this.initializeGame();
  };

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (
      value //this defines the different scenarios of what a box can and should contain
    ) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 0)}
            style={styles.tile}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 1)}
            style={styles.tile}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 2)}
            style={styles.tile}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 0)}
            style={styles.tile}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 1)}
            style={styles.tile}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 2)}
            style={styles.tile}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 0)}
            style={styles.tile}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 1)}
            style={styles.tile}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 2)}
            style={styles.tile}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 50 }} />
        <Button title="New Game" onPress={this.onNewGamePress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  tile: {
    borderWidth: 5,
    width: 100,
    height: 100,
  },
  tileX: {
    color: 'orange',
    fontSize: 60,
  },
  tileO: {
    color: 'blue',
    fontSize: 60,
  },
});
