import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, SafeAreaView } from "react-native";

type Operator = "+" | "-" | "*" | "/" | "="

export default function App() {
  const [prev, setPrev] = useState(0);
  const [current, setCurrent] = useState('');
  const [temp, setTemp] = useState(0);
  const [operator, setOperator] = useState<Operator>('+');
  const handleNumpadClick = (n: string) => {
    setCurrent(prev => prev + n);
  }
  const handleOperatorClick = (o: Operator) => {
    const currNum = Number.parseInt(current);
    switch (o) {
      case '+':
      case '-':
        if (operator === '+') {
          setPrev(prev => prev + temp + currNum);
        } else if (operator === '-') {
          setPrev(prev => prev + temp - currNum);
        } else if (operator === '*') {
          setPrev(prev => prev + temp * currNum);
        } else {
          setPrev(prev => prev + temp / currNum);
        }
        setTemp(0);
        break;
      case '*':
      case '/':
        if (operator === '*'){
          setTemp(prev => prev * currNum);
        } else if (operator === '/') {
          setTemp(prev => prev / currNum);
        } else if (operator === '+') {
          setTemp(currNum);
        } else {
          setTemp(-currNum);
        }
      default:
        break;
    }
    setOperator(o);
    setCurrent('')
  }
  const handleOtherClick = (n: string) => {} 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.col}>
        <View style={[styles.row, {justifyContent: "flex-end"}]}>
          <Text style={{ color: "white", fontSize: 100 }}>{current || prev}</Text>
        </View>
        <View style={styles.row}>
          <CalcButton onClick={handleOtherClick} content="AC" color="other" />
          <CalcButton onClick={handleOtherClick} content="+/-" color="other" />
          <CalcButton onClick={() => handleOperatorClick('/')} content="%" color="other" />
          <CalcButton onClick={() => handleOperatorClick('/')} content="/" color="operator" />
        </View>
        <View style={styles.row}>
          <CalcButton onClick={handleNumpadClick} content="7" color="numpad" />
          <CalcButton onClick={handleNumpadClick} content="8" color="numpad" />
          <CalcButton onClick={handleNumpadClick} content="9" color="numpad" />
          <CalcButton onClick={() => handleOperatorClick('*')} content="*" color="operator" />
        </View>
        <View style={styles.row}>
          <CalcButton onClick={handleNumpadClick} content="4" color="numpad" />
          <CalcButton onClick={handleNumpadClick} content="5" color="numpad" />
          <CalcButton onClick={handleNumpadClick} content="6" color="numpad" />
          <CalcButton onClick={() => handleOperatorClick('-')} content="-" color="operator" />
        </View>
        <View style={styles.row}>
          <CalcButton onClick={handleNumpadClick} content="1" color="numpad" />
          <CalcButton onClick={handleNumpadClick} content="2" color="numpad" />
          <CalcButton onClick={handleNumpadClick} content="3" color="numpad" />
          <CalcButton onClick={() => handleOperatorClick('+')} content="+" color="operator" />
        </View>
        <View style={styles.row}>
          <CalcButton onClick={handleNumpadClick} content="0" color="numpad" />
          <CalcButton onClick={handleNumpadClick} content="." color="numpad" />
          <CalcButton onClick={() => handleOperatorClick('=')} content="=" color="operator" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const CALCULATOR_PROPS = {
  buttonSize: 80,
  fontSize: 36,
  operator: { bgColor: "hsl(34, 86.7%, 55.7%)", pressedBgColor: "hsl(34, 86.7%, 80%)", textColor: "white" },
  numpad: { bgColor: "hsl(0, 0.0%, 17.6%)", pressedBgColor: "hsl(0, 0%, 40%)", textColor: "white" },
  other: { bgColor: "hsl(0, 0.0%, 60.8%)", pressedBgColor: "hsl(0, 0%, 90%)", textColor: "black" },
};

function CalcButton({
  content,
  color,
  onClick,
}: {
  content: string;
  color: "operator" | "numpad" | "other";
  onClick: (s: string) => void;
}) {
  const size =
    content === "0"
      ? 2 * CALCULATOR_PROPS.buttonSize + 20
      : CALCULATOR_PROPS.buttonSize;
  const props = CALCULATOR_PROPS[color];
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed? props.pressedBgColor:props.bgColor,
          width: size,
          height: CALCULATOR_PROPS.buttonSize,
          borderRadius: CALCULATOR_PROPS.buttonSize / 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content === "0" && { alignItems: "flex-start" },
      ]}
      onPress={() => onClick(content)}
    >
      <Text
        style={[
          { color: props.textColor, fontSize: CALCULATOR_PROPS.fontSize },
          content === "0" && { left: 30 },
        ]}
      >
        {content}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "#000",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
  col: {
    flexDirection: "column",
    gap: 10,
  },
});
