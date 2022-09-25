import React, {useEffect} from 'react';
import ErrorBoundary from 'react-native-error-boundary'
import { setJSExceptionHandler, setNativeExceptionHandler } from "react-native-exception-handler";
import { StyleSheet, Text, View, Button } from 'react-native';


import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

/* ERROR HANDLING */


const errorHandler = (error: Error, stackTrace: string) => {
  /* Log the error to an error reporting service */
  console.log({error, stackTrace})
  crashlytics().recordError(error);
}


// setJSExceptionHandler((error, isFatal) => {
//   errorHandler(error)
// }, true);

// const exceptionhandler = (exceptionString) => {
//   errorHandler({error: exceptionString})
// };

// setNativeExceptionHandler(
//   exceptionhandler
// );

function ErrorFallback(props: { error: Error, resetError: Function }) {
  console.log({props})
  return (
    <View style={[styles.container]}>
      <View>
        <Text> Something went wrong: </Text>
         <Text>{props.error.toString()}</Text>
        <Button title="try Again" onPress={props.resetError} />
      </View>
    </View>
  );
}


// export const ErrorHandler = ({ children }: { children: React.ReactNode }) => {
//   useEffect(() => {
//     console.log('Crashalytics Enabled');
//     crashlytics().log('App mounted.');
//   }, []);

//   return (
//     <ErrorBoundary FallbackComponent={ErrorFallback}>
//       {children}
//     </ErrorBoundary>
//   )
// };


export const ErrorHandler = ({children}) => {

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    fontSize: 48
  },
  text: {
    marginVertical: 16
  }
});

export default ErrorHandler