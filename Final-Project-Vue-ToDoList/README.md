# Final-Project-Vue-ToDoList

The following app is called The "Day to Day Task App" created by the great fullstack developers of The Time Company Inc.

As stated in the landing page of our app, to-do list apps are the most popular. This is likely because they offer a good balance of simplicity and features. The best to-do list apps will allow you to track your tasks, set deadlines, and even share your to-do list with others.

The Time Company Inc has a lot of collaborators, whom are powering the deployment and use of this app through all mobile marketplaces and tech companies... We also promote activaly this app between our range of usefull tools through our social media profiles: Twitter, Instagram, Facebook, whatsapp and LinkedIn.

This app was developed using Vue 3 in Vite with the help of bootstrap: Powerful, extensible, and feature-packed frontend toolkit. Build and customize with Sass, utilize prebuilt grid system and components, and bring projects to life with powerful JavaScript plugins.

The backend of this app was achieved with the help of Supabase: an open source Firebase alternative providing all the backend features you need to build a product. You can use it completely, or just the features you need.

The following app is composed of the following structure:

1. A main component called App.vue which is divided in 3 parts:

   - 2: that are fixed which are the HeaderPage.vue and FooterPage.vue components: these 2 components have dynamic development showing links to different sites:
   - 1: A dynamic component using Routerview which renders depending if the user is logged in or not the To Do List App.

   Something to take into account is that the HeaderPage.vue component has the links to "SignUp", "SignIn" and "Logout", besides of corporate info of "aboutUs" and "collaborators" all these 4 components also .vue

2. Components using Router Link: as stated above our app has 4 lets say sub components which are routedlinked depending where the user wants to go:
   2.1) About.vue: this component shows information about the The Time Company Inc and the developers behind this amazing app.

   2.2) Collaborators.vue: this component shows logos of our main 3 company collaborators which are top of the line techcompanies in this market segment.

   2.3) SignUpPage.vue: this component shows the Sign Up process: which the following information is required to sign Up:

   - Name:
   - Email:
   - Password
   - Confirm Password
     After user signs up an email from our backend Supabase sends a confirmation email to the user´s email. Then is redirected to the sign In component to log In.

     2.4) SignInPage.vue: this component shows the sign in process: which email + Password are required to log in. Once user is logged is redirected to the To Do List page component

   The LogOut Link is a link embeded in the HeaderPage.vue component to only log out user once clicked.

3. Router view to dinamically show all components: in our development project, we have a router folder which has a index.js file which has all the router paths to go in order to properly use the routerview.

4. Stores: we have a store folder in order to use a local storage before connecting with Supabase. The main files are user.js and task.js
   user.js: in here we do the connection to supabase using pinia to our local store, we add the functions to do the processes of:

   - Fetch User and connect user to supabase
   - Sign In
   - Sign Up
   - Log Out

   task.js: after creating the table of data storage in Supabase we use this file to connect supabase to our local storage of our todolist, in here we set the functions and parameters to do the following processes:

   - Fetch user
   - Fetch task
   - Create a new task
   - Edit task or title
   - Set task as complete
   - Eliminate task or Remove task

5. Time usage: we use moment in order to import and show time in our to do list

6. The To Do List: after connection of user to supabase is passed and confirmed through our local storage using pinia we are able to go to the app most important page "the todolist component ToDoList.vue" this component has a friendly UX/UI where we have a dashboard set up of table structured based with:

   - Enter task slot: + Create Buttom: here we can add which ever task we need in our list.
   - A table with Task list by order of entry: we can check a list of task added starting from first task then to last added.
   - A completed? check point: this checkpoint tell us if we completed the task
   - Edit button: this edit button takes us to a next component where we can edit the current task selected and change to any other information.
   - Delete button: this button helps us delete which ever task we added erroneously.

7. At the end all components are connected using pinia, stores and supabase. All data from each user is stored in Supabase and saved eventhough is logged out.
   Having supabase as a backend gives us the ability for the user to re connect in the app and find the list of task used in the last session.

CONCLUSIONS:

As final words we encourage the public to use our Day to Day Task App in order to place and manage the daily tasks.

Thanks viewers we see you next time!!!!!

Cheers.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

Copyright 2022 The Time Company, Inc

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
