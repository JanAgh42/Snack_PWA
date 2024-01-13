## Snack - Progressive Web Application

<p align="center">
  <img src="pics/snack.png" alt="snack" width="300"/>
</p>
<br>

A social network PWA inspired by Slack, a cloud-based freemium cross-platform instant messaging service.

### Project overview:

#### The application is able to handle the following use cases:

- user registration, log in and log out
- user profile editing
- interact with the app either using the GUI or the CLI
- send group messages via the CLI
- manage groups
  - groups can be public or private
  - anybody can create their own group
  - anybody can join public groups
  - anybody cyn invite anyone to public groups
  - admins can invite users to private groups
  - anybody can leave a group at any time
  - the group gets deleted when the admin leaves
- users can set their connection status
  - online, offline or DND (do not disturb)
- users can see what other people are typing before their message gets sent
- users can see the entire conversation history (infinite scroll)
- users can see the list of members of any group they are a part of
  - the connection status of group members is also displayed

#### The built-in CLI is able to perform the following actions (besides messaging):

- `/` - indicates the beginning of an operation query inside the CLI.
  - Hint: a valid command's color will turn green.<br><br>
- `/join 'groupname'` - join an existing group. If a group does not exist, it will be created.
  - Hint: a user can only join a public group; in order to become a member of a private one, you have to be invited by its owner.<br><br>
- `/join 'groupname' [visibility]` - create a new group. Inside the square brackets replace 'visibility' with either 'public' to create a group open to all users, or 'private' to create a hidden group.
  - Hint: your group's name has to be unique.<br><br>
- `/invite 'username'` - add another user to the currently selected group.
  - Hint: you can add any user to a public group, but in a private group only the owner can add users.<br><br>
- `/revoke 'username'` - remove a user from the currently selected group. Available in private groups only.
  - Hint: only the owner can use this command.<br><br>
- `/quit` - delete the currently selected group. Available in both private and public groups.
  - Hint: only the owner can use this command.<br><br>
- `/cancel` - leave the currently selected group. Available in both private and public groups.
  - Hint: when the owner leaves his group, it is automatically deleted.<br><br>
- `/kick 'username'` - remove a user from the currently selected group. Available in public groups only.
  - Hint: a regular user cannot remove the owner.<br><br>
- `/list` - show the list of members of the currently active group together with their activity status in a separate modal.<br><br>
- `/list 'groupname'` - show the list of members of any selected group the user is a member of, together with their activity status in a separate modal.<br><br>
- `@username` - address your message to certain users. All group members will see the user's highlighted name in the message, but the mentioned user will aditionally have the background of the given message highlighted as well.
  - Hint: you can automatically insert @username by clicking on the user nickname in the group member's list.

### Frontend overview:

- Located inside the [readme of the frontend/ folder](frontend)

### Backend overview:

- Located inside the [readme of the backend/ folder](backend)

### Team members:

- Ján Ágh
- Irina Makarova

Copyright &copy; 2023. All rights reserved.