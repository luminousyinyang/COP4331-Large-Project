# COP4331-Large-Project
Large project for our POOSD class
https://gerbers-stash.xyz

# Our App Name

## Links

[TO DO Board](https://github.com/users/luminousyinyang/projects/5)
[Figma Link](https://www.figma.com/design/PTbKHAavEiURxx48asy7T5/POOSD-Large?node-id=0-1&p=f&t=AoLq4FDlW8xUBjVM-0)

## How to Run the App Locally

To run locally:

1. **Install dependencies for the entire project**:
   - Navigate to the root folder and run:
     ```bash
     npm install
     ```

2. **Install frontend dependencies**:
   - Navigate to the `frontend` folder and run:
     ```bash
     cd frontend
     npm install
     ```

3. **Install backend dependencies**:
   - Navigate to the `server` folder and run:
     ```bash
     cd ../server
     npm install
     ```

4. **Start both the frontend and backend servers**:
   - Go back to the root folder and run:
     ```bash
     cd ..
     npm run dev
     ```

This command will simultaneously start the backend server and react app.

## 5. Creating Your `.env` File

You need to create a `.env` file in the root directory of your project. Yall probably know how to but just in case

### Getting the Values
- Go to your MongoDB Atlas account:  
  **Database → Clusters → Connect → Drivers**.  
- Scroll down to find the connection URI. It contains most of these values (except your password).  
- If you’ve lost your password, you probably cooked.

### Expected `.env` Variables

### Notes
- **MONGO_USER**: Your Atlas username.
- **MONGO_PASS**: Your Atlas password (not included in the URI—set this manually).
- **MONGO_CLUSTER**: The cluster part of the URI (e.g., `cop4331.hznak2g.mongodb.net`). It comes after the password in the URI.
- **MONGO_DB**: The name of your database.(optional)
- **MONGO_APP_NAME**: name of the app, last param in the url

Replace the placeholder (`YourUsername`, `YourPassword`, `yourdbname`) with your actual credentials


### Access the App

Front end fill become available at:

[http://localhost:5173/](http://localhost:5173/)

### API Proxy Configuration

The Vite app is configured to use a proxy for API requests to our own server.  The proxy configuration in `vite.config.js` is as follows:

```javascript
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',  // Proxy API requests to your backend server
    }
  }
