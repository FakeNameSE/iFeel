// Import the screens
import Main from './screens/Main';
import Chat from './screens/Chat';
// Import React Navigation
import { createStackNavigator } from 'react-navigation'
// Create the navigator
const navigator = createStackNavigator({
  Main: { screen: Main },
  Chat: { screen: Chat },
});
// Export it as the root component
export default navigator
