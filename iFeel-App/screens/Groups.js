// Your run of the mill React-Native imports.
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as firebase from 'firebase';
// Our custom components.
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { NavBarAddButton } from '../components/NavBarButtons';

class Groups extends React.Component {
    //Header theming, title, and navbar button for creating new groups.
    // Need to give header access to functions in instance of screen
    // with this weird, ugly fat arrow params thing, hence why the
    // navigation prop is referred to as navigation and not
    // this.prop.navigation
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chats',
            headerRight: (
                <NavBarAddButton onPress={() => navigation.navigate('CreateChat')}></NavBarAddButton>
            ),
            headerStyle: {
                backgroundColor: '#13294B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        };
    }
    // Constructor to bind state and some functions to this.
    constructor (props) {
        super (props);
        state = {
            groupNames: [],
            downLoadedSnapshot: {},
        };
        this.reDownloadGroups = this.props.navigation.addListener('willFocus', () => {
            // Because getGroups is not called when navigating back from group creation page, need to put this here.
            this.getGroups();
        });
        //this.createGroup = this.createGroup.bind(this);
    }

    // Stores state, namely what groups the user belongs to.
    state = {
        groupNames: [],
        downLoadedSnapshot: {},
    };
    
    // Helper function to get user UID.
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
    // Method to download snapshot of all of the groups the user belongs to and put them in state.
    getGroups() {
        let newGroups = [];
        firebase.database()
          .ref('/users/' + this.uid + '/groups/')
          .once('value')
          .then((snapshot) => {
              //console.log(snapshot);
              snapshot.forEach( (child) => {
                  // Adds a dictionary with the value as an array with the name and id of the group to the intermediary array.
                  newGroups.push({key: [child.child('name').val(), child.ref.key]});
                  //console.log(child.child('name').val() + ': ' + child.ref.key);
              })
          })
          .then(() => {
              // Add all of the groups at once from the intermediary group so that state is not constantly changing (avoids async nightmare).
              this.setState({groupNames: newGroups});
          });
    }
    // Function to run when a group button is clicked, redirects to the chat page and passes id of group as param.
    onPressRedirect(groupClicked) {
        // Pass name along when switching to chat screen
        this.props.navigation.navigate('Chat', { name: this.props.navigation.state.params.name, groupName: groupClicked })
    }
    // When we open the screen, download current groups.
    componentDidMount() {
        this.getGroups();
    }
    // Force getGroups() to run when navigating back.
    componentWillUnmount() {
        this.reDownloadGroups;
    }
    // Helper method to render page.
    renderCurrentState() {
        // We use a FlatList and pass it a weird array.
        return (
            <FlatList
              data={this.state.groupNames}
              renderItem={({item}) =>
                  <Button onPress={() => this.onPressRedirect(item.key[1])}>{item.key[0]}</Button>}
            />
        )
    }
    // Actually render page.
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                {this.renderCurrentState()}
            </View>
        );
    }
}

// Stylesheet, who says this app can't be beautiful and smart?
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: '#E84A27',
    },
    form: {
      flex: 1
    }
  });
  
export default Groups; 
  
