// Import the screens
import Main from './screens/Main';
import Chat from './screens/Chat';
import CreateAccount from './screens/CreateAccount';
import Groups from './screens/Groups';
import CreateChat from './screens/CreateChat';
// Import React Navigation
import { createStackNavigator } from 'react-navigation';

// Create the navigator
const navigator = createStackNavigator({
    Main: { screen: Main },
    Chat: { screen: Chat },
    CreateAccount: { screen: CreateAccount },
    Groups: { screen: Groups },
    CreateChat: { screen: CreateChat }
});
// Export it as the root component
export default navigator
