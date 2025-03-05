import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Switch,
} from "react-native";
import Sound from "react-native-sound";
import styles from "./styles"; // Import styles from the styles.js file

const App = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [winnerMessage, setWinnerMessage] = useState<string>("");
  const [winnerCombo, setWinnerCombo] = useState<number[] | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [sounds, setSounds] = useState<{ click: Sound; win: Sound; draw: Sound } | null>(null);
  const [hasClicked, setHasClicked] = useState<boolean>(false); // New state

  // Preload sound files on mount
  useEffect(() => {
    const clickSound = new Sound(require("./asset/click.mp3"), Sound.MAIN_BUNDLE, (error) => {
      if (error) console.log("Failed to load click sound", error);
    });

    const winSound = new Sound(require("./asset/win.mp3"), Sound.MAIN_BUNDLE, (error) => {
      if (error) console.log("Failed to load win sound", error);
    });

    const drawSound = new Sound(require("./asset/draw.mp3"), Sound.MAIN_BUNDLE, (error) => {
      if (error) console.log("Failed to load draw sound", error);
    });

    setSounds({ click: clickSound, win: winSound, draw: drawSound });

    return () => {
      // Release resources
      clickSound.release();
      winSound.release();
      drawSound.release();
    };
  }, []);

  const playSound = (soundType: "click" | "win" | "draw") => {
    if (sounds && sounds[soundType]) {
      sounds[soundType].play((success) => {
        if (!success) console.log(`${soundType} sound playback failed.`);
      });
    }
  };

  const handlePress = (index: number) => {
    if (board[index]) return;

    setHasClicked(true); // Update hasClicked state

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    playSound("click");

    const winner = checkWinner(newBoard);
    if (winner) {
      setWinnerCombo(winner.combo);
      setWinnerMessage(`${winner.player} Wins!`);
      setModalVisible(true);
      playSound("win");
    } else if (newBoard.every((cell) => cell)) {
      setWinnerMessage("It's a Draw!");
      setModalVisible(true);
      playSound("draw");
    }
  };

  const checkWinner = (board: string[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { player: board[a], combo };
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXNext(true);
    setWinnerMessage("");
    setWinnerCombo(null);
    setModalVisible(false);
    setHasClicked(false); // Reset hasClicked state
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? "#1c1c1c" : "#f3f4f6" },
      ]}
    >
      <Text style={[styles.title, { color: isDarkTheme ? "#ffffff" : "#34495e" }]}>Tic Tac Toe</Text>

      {/* Theme Toggle */}
      <View style={styles.themeToggle}>
        <Text style={{ color: isDarkTheme ? "#ffffff" : "#34495e" }}>Dark Theme</Text>
        <Switch
          value={isDarkTheme}
          onValueChange={setIsDarkTheme}
          thumbColor={isDarkTheme ? "#1abc9c" : "#5493ff"}
        />
      </View>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.cell,
              winnerCombo?.includes(index) ? styles.winningCell : null,
              { backgroundColor: isDarkTheme ? "#333333" : "#ffffff" },
            ]}
            onPress={() => handlePress(index)}
          >
            <Text
              style={[
                styles.cellText,
                cell === "X"
                  ? { color: isDarkTheme ? "#e74c3c" : "#e74c3c" }
                  : cell === "O"
                  ? { color: isDarkTheme ? "#3498db" : "#3498db" }
                  : null,
              ]}
            >
              {cell}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Conditionally render the restart button */}
      {hasClicked && (
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>Restart Game</Text>
        </TouchableOpacity>
      )}

      {/* Winner/Draw Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={resetGame}
      >
        <View style={styles.modalContainer}>
          <View style={styles.enhancedModalContent}>
            {winnerMessage.includes("Wins") ? (
              <Text style={styles.trophyIcon}>🏆</Text>
            ) : (
              <Text style={styles.drawIcon}>🤝</Text>
            )}
            <Text style={styles.enhancedWinnerText}>{winnerMessage}</Text>
            <TouchableOpacity style={styles.enhancedCloseButton} onPress={resetGame}>
              <Text style={styles.enhancedCloseButtonText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default App;
