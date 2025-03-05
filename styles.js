import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  themeToggle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
  board: {
    width: 320,
    height: 320,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 20,
  },
  cell: {
    width: "33.33%",
    height: "33.33%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  winningCell: {
    backgroundColor: "#d1f2eb",
  },
  cellText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "#1abc9c",
    borderRadius: 8,
  },
  resetButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  enhancedModalContent: {
    width: "80%",
    padding: 30,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    alignItems: "center",
  },
  enhancedWinnerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#34495e",
    textAlign: "center",
    marginBottom: 20,
  },
  enhancedCloseButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "#1abc9c",
    borderRadius: 15,
  },
  enhancedCloseButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  trophyIcon: {
    fontSize: 60,
    marginBottom: 10,
    color: "#f1c40f",
  },
  drawIcon: {
    fontSize: 60,
    marginBottom: 10,
    color: "#3498db",
  },
});

export default styles;
