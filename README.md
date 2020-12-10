# ohjelmistoprojekti2_front


# End points in Backend
Endpoint | Input | Output | Description
------------ | ------------- |  ------------- | -------------
message (post) | input| Output | User sends a message to another user or event
swipe (post) | input| Output | User swipes to another user or event, or event swipes to another user.
findSwipeables (post) | input| Output | Finds swipeables based on your filters and location.
register (post) | input| Output | Registers user for application
removeMatch (post) | input| Output | Removes target match from matches
resetData (post) | input| Output | resets database data and creates dummy data from existing users
profileUpdate (post) | input| Output | User can update own profile
filtersUpdate (post) | input| Output | User can update own filters
event (post) | input| Output | User create a new event
event (put) | input| Output | User updates a existing event
updateLocation (post) | input| Output | User updates users location.
opentest (post) | input| Output | Endpoint to manually get/update helsinki open api events


# Add_Event
Blaa blaa blaa, blaa blaa blaa.
Blaa :)
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

Props | Type | Optional | Description
------------ | ------------- |  ------------- | -------------

# AuthContext
AuthContext allows access to SignIn() and SignOut() functions from Navigation.js to other components.

# Carousel
Blaa blaa blaa, blaa blaa blaa.
Blaa :)
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# Chat
Blaa blaa blaa, blaa blaa blaa.
Blaa :)
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# EditProfile
Blaa blaa blaa, blaa blaa blaa.
Blaa :)
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# Globaalit
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# Login
Login page where you can login or go register as a new user.
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------
signIn() | email (String), password (String) | - | Check Navigation for more info

# Matches
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# MyProfile
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# Navigation
Handles authentication and different navigation views based on login status.
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------
signIn() | email (String), password (String) | - | Starts login() with given email and password. If login is successful, saves email and password to AsyncStorage and switches login page to apps content
signOut() | - | - | Signs user out, removes email and password from AsyncStorage and switches apps content to login page
loginOnStartup() | - | - | When the app open, starts signIn() if email and password is saved to AsyncStorage
login() | email (String), password (String) | String | Tries to login to firebase using given email and password. Returns error string if email or password were wrong or access to location was denied, otherwise returns success string
UpdateLocation() | - | String | Asks premission to users location and send location object to UpdateFirebase(). Returns confirmation or denial string depending if access was granted
UpdateFirebase() | loaction (object) | - | Send users location to firebase. Location object has latitude and longitude attributes

# Register
Registering page for new users.
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------
signIn() | email (String), password (String) | - | Check Navigation for more info
inputChanged() | inputName (String), inputValue (any) | - | Updates userdata states attributes with given intups. inputName is the name of the attribute you want to upadate and inputValue is the value
genderConvert() | value (int) | - | Converst ButtonGroups selected buttons index to corresponding gender value and updates userdata states gender value
changePasswordVisibility() | - | - | Shows or hides password fields input
registerUser() | - | - | Tries to register new user. If registration is successful, signs new user in
validation() | - | boolean | Validates if password, age and username is within given limits. Returns true if everyting is correct

# Settings
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# SortableList
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# SwipeCards
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------

# SwipingPage
Swiping page shows users and event you can match with by swiping left or right. You can filter if you want to be shown users, events or both and what types of events you want to see. Pressing the info button you will be redirected to the users or events profile.
Function | Input | Output | Description
------------ | ------------- |  ------------- | -------------
fetchSwipeablesFromBackend() | - | - | Fetches all swipeables users and events from firebase based on users settings (gender, tags)
updateIndex() | name (String), value (int) | - | Updates selected ButtonGroups indexes to state. name (main or sub) and value is the index
filterSwipes() | - | - | Filters users and events shown on SwipeCards based on selected ButtonGropu filters
