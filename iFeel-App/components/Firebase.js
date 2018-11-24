import firebase from 'firebase'; 

class Firebase {
    constructor() {
        var config = {
        apiKey: "",
        authDomain: "ifeel-d97fc.firebaseapp.com",
        databaseURL: "https://ifeel-d97fc.firebaseio.com",
        projectId: "ifeel-d97fc",
        storageBucket: "ifeel-d97fc.appspot.com",
        messagingSenderId: "639485736592"
        }

        firebase.initializeApp(config);
        // Get auth state at beginning.
        this.observeAuth();
    }
    // Method to get auth state
    observeAuth = () =>
      firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    // Set authStateChanged to user, give error if there is no user
    onAuthStateChanged = user => {
        if (!user) {
            alert(message);
        }
    };

    // Reference to where in Firebase DB messages will be stored.
    get ref() {
        return firebase.database().ref('messages');
    }
    // Get last 20 messages, any incoming messages, and send them to parse.
    on = callback =>
        this.ref
          .limitToLast(20)
          .on('child_added', snapshot => callback(this.parse(snapshot)));
    parse = snapshot => {
        // Return whatever is associates with snapshot.
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        // Convert timestamp to JS date object.
        const timestamp = new Date(numberStamp);
        // Create object for Gifted Chat. id is unique.
        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    };
    // To unsubscribe from database
    off() {
        this.ref.off();
    }

    // Helper function to get user UID.
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
    // Get timestamp for saving messages.
    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    // Helper function that takes array of messages and prepares all of
    // them to be sent.
    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            this.append(message);
        }
    };
// Save message objects. Actually sends them to server.
append = message => this.ref.push(message);
}

Firebase.shared = new Firebase();

export default Firebase; 
