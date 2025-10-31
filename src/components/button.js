import { Button, StyleSheet, View } from 'react-native';

export function MyButton({title, onPress}) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Button title={title} color="black" onPress={onPress}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 10,
    overflow: 'hidden', // this is important for rounded corners to apply
    width:100
  },
});
