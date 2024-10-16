 ### FaceSpace

Social Media where people meet in simplicity.

<u>Features</u>:

- initial access to the website/login will take a minute to activate the hosting site.

- user authorize system:
	- sign up, sign in, sign out.
- chatsystem:
	- none live; need to keep refreshing the page to check if message has arrived.
	- can message any other users
	- clicking on user name in the chatsystem wlil open up a chatbox
- People:
	- Friend Request
		- lists friend requests from others
	- Friends
		- lists your current friends
	- Users
		- lists all users
	- Friendsystem:
		- can add any user as friends by sending a friend request which then the other user can accept or decline the request.
	- clicking on usernames will enable a pop up menu to direct to the user's profile or open a chatbox with the user.
- community wall:
	- any signed in user can post something on the wall
- Profile wall:
	- any signed in user can post something on other user's or their own profile wall.

	
	
<u>General Coding Logs</u>

 - user create, login system for backend and front-end implemented
 - Front-end: Headers section implemented;
 - Landingpage implemented that includes: user posting, webpage global posts, list of incoming friend requests, friends, and other users section. 
 - Rough version of Profile page implemented
 - Offline chatSystem implemented
 - post details: add name, date etc
 - If already signed in and hasn't been expired and user tries to visit sign in page, it will redirect to the home page.
 - reintegrated posts and updated user's profileWall.
 - Profile Page
 - ChatSystem
 - Chatbox
 - People component

 <u>deploy mode vs dev mode </u>

- change path from main.jsx
- change path for useNavigates, links
- add/remove base from vite.config.js
- fetch urls (if you host is down and wanna use localhost)


<u>Detailed Logs </u>

....

- Task: Finish user Click menu
	- <font style="color:red">implement Chat button</font>
	- <font style="color:green">Give it a rough style as a pop up menu when click.</font>
- <font style="color:red">implement Chat button</font>
	- General summary: when chat is clicked from userClickMenu, chatbox pops up that links two users to message each other.
	- technical summary: when chat is clicked, it updates a useState in app.js that renders Chatbox into the current viewing component.
		- Chatbox takes in signedInUser, and clickedUser
	- process:
		- done:
			- [x] necessary useStates are initialized ✅ 2024-04-27
				- chatbox, chatboxUsers
			- [x] chatboxUsers are set when chatBtn is clicked; ✅ 2024-04-27
				- array of signedInUser, and clickedUser
			- [x] conditions are set to display Chatbox when chatbox state is set true ✅ 2024-04-27
				- chatbox state is set true when chat btn is clicked 
				- takes in chatboxUsers as props
		- done:
			- [x] redo chat system front-end and back-end ✅ 2024-07-31
				- non-live chat
					- chatbox is 'non-live' if the other user is offline.
					- works like email
					- notes:
						- fixed chatbox_add_message - backend
							- updated chatbox object didn't didn't inherit any properties from the existing one.
								- no users, no ids.
					- [x] Have GetChatbox working ✅ 2024-05-17
						- [x] when chatbox opens in frontend, it should get and display the corresponding chatbox messages. ✅ 2024-05-17
							- [x] problem: need to have chatbox component remounted or have fetch chatHistory useEffect run on certain state update. ✅ 2024-05-13
					- [x] add a notification system that works when initial login ✅ 2024-09-28
						- [x] implement 'read' properties to message model ✅ 2024-05-17
							- boolean
						- [x] new messages will be highlighted in chatbox display once opened. ✅ 2024-07-10
							- after chatbox msgs are received, checks if the sender of last msg is same as the signedInUser, If it is it doesn't highlight it. 
							- [x] when opening chatbox, it should setChatboxId only if new_message is not "" and sender!= signedInUser. ✅ 2024-07-10
						- [x] Problem: chatsystem/chatbox title uses the same username; should be showing the receiver's name ✅ 2024-07-10
							- chatbox.users were not in order; useGetChatUsers selected static position of users array as other user.
					
						- [x] new msgs count notification in chatbox display ✅ 2024-09-28
				- [x] implement new_messages field to chatbox model ✅ 2024-07-03
					- boolean value
					- chatbox with this field set to true will be highlighted
							
				- reverted the express app server to default - live chat
					- reconnect socket.io server to the main server for live chat system.
				- Post system:
			- [x] post details: ✅ 2024-07-31
				- username, date/ 
			- [x] Finish Profile Page details. ✅ 2024-09-30
				- [x] implement user add btn ✅ 2024-09-28
					- add the user of the current page as friend
						- [x] check if its signedInUser's profile ✅ 2024-09-28
						- [x] check if profile's user is already a friend ✅ 2024-09-28
						- [x] remove user's password in 'friends' field when returning a user. ✅ 2024-09-28
				- [x] implement user remove btn if friends ✅ 2024-09-30
				- [x] Integrate profile posts with existing Post in database. ✅ 2024-09-24
					- landingPage post wall will show all posts from all users' posts on both profile and landingpage wall sorted by date
						- Post.find()
					- [x] profileWall will have two tabs to filter: ✅ 2024-09-24
						1. posts on profileWall 
							- available for all signed In users
						2. all of profile user's posts
							- only available for signed in user's profile page
					- [x] make a new model "ProfileWall" ✅ 2024-08-19
						- each user gets assigned one. 
						- holds all posts in user's profile 
						- fields:
							- user
							- posts :[]
					- recode:
						- when a user is newly created, it should create a profileWall and set it as user's profileWall field.
							- [x] remove posts field in User ✅ 2024-08-03
							- [x] create profilewall in User ✅ 2024-08-03
							- [x] user is created in populatedb, . ✅ 2024-08-03
							- [x] user is created in  signUpPage. ✅ 2024-08-03
							- [x] unpopulate("posts") ✅ 2024-08-03
							- [x] populate("profileWall") ✅ 2024-08-03
							- [x] redo client and backend @ displaying posts ✅ 2024-09-26
								- [x] landingPage: just return Posts.find() ✅ 2024-08-05
								- [x] profileWall: return populated user's profilewall ✅ 2024-09-26
						- When a post is being posted it should also be stored in the user's profileWall model. \
							- [x] landingPage posts ✅ 2024-08-05
								- doesn't have to be divided
								- remove pushing into user.posts
							- [x] Profile page posts ✅ 2024-09-18
								- needs to be added to the user's profileWall
					- [x] profilePost ✅ 2024-09-12
						- anyone can post on anyone's profile wall
						- posts needs to be stored in the viewing profile user's profileWall.
						- fix error: deleting algorithm is wrong
					- [x] landingpage post implement delete function ✅ 2024-09-13
						- only deletes if author of post.
							- client side checks signedInuser.user_name vs author name and checks. If match, shows the del button
							- backend uses userId from req to query user and checks if match of post_user.posted_user ^8f6e32
				- [x] fix userClickMenu both landingpage and profile page ✅ 2024-09-25
					- profilePAge
						- somehow works?
						- chatbox doesnt work with it
					- landingPage
						- stopped working // works now
						- check for functions that work with specific classnames
				- [x] redo people component ✅ 2024-09-25
					- [x] change className into a mutable from props input. ✅ 2024-09-26 
				- [x] signedInuser's profile page shows full people component ✅ 2024-09-26
				    - [x] redesign people's component to have customised render controlled with props ✅ 2024-09-26
					    - [x] make classname customizable ✅ 2024-09-26
				- [x] add global classnames for each renderUSersUtilities components ✅ 2024-09-25
				- [x] landingPage posts does not update when deleting the last existing post ✅ 2024-09-26
					- Reason: *The API fetch call wasn't configured to handle when the server returns a response with a failed status (empty array of posts).* 
					- solution: *set posts state as the response message (string) when the response returns with failed status then have renderPosts handler to have a condition that checks if posts is an array (returned when succuess) and handle the corresponding outcomes.*
			- [x] style ! ✅ 2024-10-01
				- [x] match landingPage and profilePage layout ✅ 2024-09-30
				- [x] userclickmenu ✅ 2024-10-01
					- [x] userclickmenu renders in people not each render...s ✅ 2024-09-30
					- [x] pops up at the location of pointer when username is clicked ✅ 2024-10-01
						- [x] update handleUsernameClick && userMenu to take in coordinates of userclick and set it as left and top ✅ 2024-10-01
					- [x] make userclickmenu disappear when user clicks anything other than the userclickmenu while its active. ✅ 2024-10-01
			- [x] add svg for friends, waiting for response icons (check mark, triple dot). ✅ 2024-10-01
			- [x] Chatsystem: ✅ 2024-10-02
				- [x] beside username, "new msg" sign is displayed when there are new messages to read. ✅ 2024-10-02
				- [x] fix ResetChatSystem method ✅ 2024-10-02
			- [ ] style
				- [x] style mywall, posts(landingpage) ✅ 2024-10-02
					- [x] set dimensions ✅ 2024-10-02
					- [x] overflow ✅ 2024-10-0
				- [x] style posts ✅ 2024-10-03
					- [x] myWall ✅ 2024-10-03
					- [x] myPosts ✅ 2024-10-03
						- [x] overflow ✅ 2024-10-03
					- [x] landingPage ✅ 2024-10-03
						- [x] overflow ✅ 2024-10-03
						- [x] dimensions ✅ 2024-10-03	
			- [x] empty Mywall post gives error ✅ 2024-10-11	
			- [x] Prep for production ✅ 2024-10-14
				- [x] setup and upload backend to render ✅ 2024-10-11
					- [x] add environment variables ✅ 2024-10-11
				- [x] frontend ✅ 2024-10-14
					- [x] change api uris ✅ 2024-10-12
					- [x] useNavigates ✅ 2024-10-13
					- [x] links ✅ 2024-10-13
					- [x] router paths ✅ 2024-10-13
				- [x] backend ✅ 2024-10-14
					- [x] change cors settings ✅ 2024-10-14
						- [x] change allow access to specific domain ✅ 2024-10-14
			- [x] find a way to have two git versions rather than keep changing between dev and product mode or having two files. ✅ 2024-10-14

		- Current: 
			- [ ] 

		
		- Future:

			- [ ] fix error: exclamation for new chats
				- when there are more than one new chats, only the first one on the list is targeted to be removed after opening any of the chats.
			- [ ] refactor to follow SOLID- make a list and go down one by one
			- [ ] make it responsive
				- [ ] different sizes
			- [ ] friend system
				- [ ] cancel friend request
				- [ ] delete friends
					- in people  -> renders
					- in profile-user-info
			- refactor code
				- SOLID
				- RenderUsers.jsx -> renderUsers -> friendReq func: place it outside of renderUsers and apply S,
			- chat system:
				- live chat
					- reminder:
						- reconnect socket.io server to the main server for live chat system. 
					- chatbox becomes live when the other user is also online
					- implement coding that switches between live vs off chat
					- socket.io implementation
						- learn how to use socket.io in reactjs, expressjs - done
						- learn how to emit to specific client
							- possible solutions:
								- use socket.id?
								- create an api that creates a private socket channels for each chatbox?
							- use client.id as emit/listening code.
							- use 'wallPost' for post wall code.
							- 
					- [youtube tut](https://www.youtube.com/watch?v=SMubOngCCmw)
				- set positions for incoming and outgoing msgs

			- fix access-control-allow-origin to *
			- add RenderUserClickMenu to all username Links
			- add a notification system
				- new message
				- new friend request
				- liked posts/comments
				- post/comment replies

			- Post system:
				- [ ] live update
					- currently only updates when user posts
					- should auto update post wall when other users post.
				- [ ] when post del is spammed too fast too often it stops working.
				- [ ]  Add a 'location' field to Post that old value of where the post is made
					- ex. CommunityWall, daechi73's wall, newUser3's wall.
			- Notification System:
				- number of new messages
				- New comments on posts
				- New Posts on signedInUser's myWall
				- New likes
				- Friend Requests
			
				
		
##### Notes:

Below are my new learnings and problems that I faced during building this app.



bash scripts to open all necessary files and local hosts.
```
#!/bin/sh

##opens all necessary project for FaceSpace
cd work/coding/vscodeRepo/FaceSpace/FaceSpace
code .
gnome-terminal --tab -e "npm run dev" --tab
cd ../FaceSpace-Backend
code .
gnome-terminal --tab -e "npm run serverstart" --tab
cd ../../Jcodes 
code .
cd ../Jcodes-blog-authentication 
code .
cd ../express-localLibrary 
code .
cd ../ 
gnome-terminal --tab
```



- to have a model property to have multiple options of single reference:
	```js
	const documentSchema = Schema({
	    _id: Schema.Types.ObjectId,
	    title: String,
	    date: Date,
	    references: {
	        type: [Schema.Types.ObjectId],
	        refPath: 'model_type'
	    },
	    model_type: {
	        type: String,
	        enum: ['Student', 'Professor', 'Administrator'],
	        required: true
	    }
	});
	``` 
	^4a2f75

- To persist login, use localStorage to keep user Detail (_id/token)
	- make sure the localStorage is emptied in given time.
		- use timeStamp to check how long ago it was put in localStorage everytime app is used.
	- [login persist tut](https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/)
- to have deserializeUser active with browser: chceck FaceSpace-backend app.js & faceSpace signIn - ==NOT WORKING==
	- set client headers:
		```js
		mode: "cors",
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			"Access-Control-Allow-Origin": "http://localhost:3000/",
		},
		```
	- have server accept headers:
	```js
		res.setHeader(
			"Access-Control-Allow-Headers",
			"X-Requested-With,content-type,Access-Control-Allow-Origin"
		);
	```
	- set specific domain to be allowed
	```js
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
	```
- to populate nested model:
	```js
      .populate({
          path: "friend_requests",
          populate: [{
                  path: "outbound",
                  model: "User",
                  select: "-password",
              },
              {
                  path: "inbound",
                  model: "User",
                  select: "-password",
              },
          ],
      })
    ```
    - array for multiple, non-array for single

- To convert objectId to string, use id (without underscore).

- ### Socket.io 
	- [online basic tut for reactjs and expressjs](https://medium.com/@matheshyogeswaran/building-real-time-applications-with-socket-io-adc86da2f9f1)
	- [emit cheat sheet](https://socket.io/docs/v3/emit-cheatsheet/)
	- event driven library that enables real-time web applications.
		- live messaging system; bidirection between a client and a server.
	- ==socket.on() -> event listener==
	- ==socket.emit() -> fires event==
	- install and connect socket.io on both client and server.
	- <u>Setup</u>
		- client-react.js:
			- npm install socket.io-client
			```js
			import "./App.css";
			import {
			    useEffect
			} from "react";
			import io from "socket.io-client";
			const socket = io.connect("http://localhost:4000");
			
			function App() {
			    function sendMessage() {
			        console.log("Button clicked");
			        socket.emit("send_message", {
			            message: "Hello from client"
			        });
			    }
			    useEffect(() => {
			        socket.on("receive_message", (data) => {
			            alert(data.message);
			        });
			    }, [socket]);
			
			    return ( <
			        div className = "App" >
			        <
			        input placeholder = "Message" / >
			        <
			        button onClick = {
			            sendMessage
			        } > Send message < /button> <
			        /div>
			    );
			}
			
			export default App;
		```
			- on method's actionFunction takes in the data sent from the sender.
		- Server- nodejs/expressjs
			- npm install  socket.io
			- npm install  http
			```js
			//app.js	
			const http = require("http");
			const { Server } = require("socket.io");
	
			const server = http.createServer(app);
			const io = new Server(server, {
			    cors: {
			        origin: "http://localhost:5174",
			        methods: ["GET", "POST"]
			    },
			});
			
			io.on("connection", (socket) => {
			    console.log(`a user connected ${socket.id}`);
			
			    socket.on("send_message", (data) => {
			        socket.broadcast.emit("receive_message", data);
			    });
			});
			// set server and io to app
			app.set("customServer", server);
			app.set("socketio", io);
			```
			- create an http server and socket.io server and run the latter to former.
			- set two servers in app
				- app.set("saveName", object);
				- can access these server objects anywhere within the project scope.
		- call the http server object from app and replace existing server initiating code in /bin/www file
			```js
			//www
			//replace this
			var server = http.createServer(app);
			//with this
			const server = app.get("customServer")
			```
	- <u>Problem</u> occurred trying to connect socket.io from client to server. 
		- Problem: 
			- Client couldn't find socket.io from the server.
		- Cause:
			- Express project created and ran a separate http server within /bin/www file without socket.io attached to it.
				- the http server created within the app.js is different from /bin/www
		- Solution:
			- Found a way to save the servers created within app.js to the globally shared express object (app)
				- app.set("saveName", object);
			- Was able to call this within /bin/www file.
			- [Online Solution](https://stackoverflow.com/questions/70421655/get-socket-io-not-found-404)
			
- model.findByIdAndUpdate() returns original, unaltered document as default.
	- to return updated version
	```js
	const updatedChatbox = await ChatBox.findByIdAndUpdate(
			existingChatbox[0]._id,
			chatbox,
			{ new: true }
		)
	```
	- add 'new:true' in options.
- to populate a newly created and saved model, populate() it after updating it. (don't forget the await key).
- hook calls on every component render must be the same
	- ex: calling hooks under a condition will cause error since 1 more/less hook is called depending if the condition is met.

- Problem: chatsystem/chatbox title uses the same username; should be showing the receiver's name
	- chatbox.users were not in order; useGetChatUsers selected static position of users array as other user.

- HERE To have api module to return true when it successfully handles data
	```js
	//code FaceSpace/srs/global/Post/PostDelApi.js
	const PostDelAPI = async (e, signedInUser) => {
	    const options = {
	        mode: "cors",
	        method: "POST",
	        headers: {
	            "Content-Type": "application/json"
	        },
	        body: JSON.stringify({
	            signedInUserId: signedInUser.id
	        }),
	    };
	    const pass = await fetch(
	            `http://localhost:3000/posts/${e.target.id}/delete`,
	            options
	        )
	        .then((res) => res.json())
	        .then((res) => {
	            if (res.status === "Success") {
	                console.log(res);
	                return true;
	            } else {
	                console.log(res);
	                return false;
	            }
	        });
	    return pass;
	};
	
	export default PostDelAPI;
	```
	-  make the module an async function
	- initialise fetch to a variable with the await keyword that returns boolean to the corresponding conditions.
	- return the variable.
- to upload expressJs to render, make sure the build command is set to:
	- npm install
- deploy mode vs dev mode 
	- change path from main.jsx
	- change path for useNavigates, links
	- add/remove base from vite.config.js
		- base: "/YOUR_URI/"
	- fetch urls (if you host is down and wanna use localhost)
- specify vite's viewing port:
	- update package.json -> scripts -> "dev": "vite --port=10000",