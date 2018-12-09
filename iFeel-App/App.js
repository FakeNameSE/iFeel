// Import the screens
import Main from './screens/Main';
import Chat from './screens/Chat';
import CreateAccount from './screens/CreateAccount';
// Import React Navigation
import { createStackNavigator } from 'react-navigation'
// Create the navigator
const navigator = createStackNavigator({
  Main: { screen: Main },
  Chat: { screen: Chat },
  CreateAccount: { screen: CreateAccount},
});
// Export it as the root component
export default navigator
