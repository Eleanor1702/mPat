# mPat

### What is mPat

The mPat system was build to give patients a better insight regarding their waiting time in emergency departments. Patients generally do not know how long they have to wait until being treated or even how many patients will be treated before them. The mPat platform consists of a REST API and a frontend (called Backoffice) which manages two types of patients with different priorities. Additionally, mPat offers a mobile application which the patients can use to connect to the Backoffice and receive information about their stay at the emergency department like their position in the waiting queue or the estimated remaining waiting time.

The following sections provide a basic overview of the mPat platform and how to develop and run the platform. For further details please refer to the bachelor's thesis of this project.

### ⭐️ Main features of mPat

- Authentication using credentials stored with organisations

- Structuring of organisations in departments

- Management of patients for each department

- Calculation of the next possible patient using a scheduling algorithm

- Selection of next patient manually or via the algorithm

- Connection of the mPat mobile application with a certain organisation

- Visualization of patient waiting time and queue position in mobile application when connected

### 🧰 Frameworks and technologies

- Database: MySQL version 8.0.19

- Backend: ASP.NET Core version 3.1 using C#

- Frontend: React version 16.13.1 using Node.js created with create-react-app

- Mobile Application: React Native version 0.62.2 and Expo 38.0.8 using Node.js

### 📐 Overview of the architecture

##### ⚙️ Backend


The backend of mPat is a REST API implemented in ASP.NET Core using C# and is connected to the MySQL database using a MySQL connector for C#. It provides its services via JSON responses and HTTP which the frontend and mobile application consumes.

The backend is divided in three layers:

- Controllers: The controllers are responsible for providing the HTTP endpoints for the mobile app and frontend to consume. The REST API currently offers controllers for authentication, departments, patients, and the mobile app.

- Services: The service layer consists of the business logic of the mPat backend as well as the access to the database.

- Models: In the REST API models are data containers for the results from the database as well as for the serialization and deserialization of data from and to JSON.

##### 🌐 Frontend

The frontend is a React single-page application. In single-page applications all static resources are initially loaded on the first request and the content of the page is replaced using JavaScript according to the interaction of the user. Therefore, the page itself does not have to be reloaded each time when interacting with it which increases the responsiveness of the application. To load data from the REST API, the frontend uses AJAX requests which is a technology to execute HTTP requests using JavaScript.

React applications are composed of several components. At the root of the mPat frontend application is the **App** component which stores all the necessary state of the frontend. According to its current state, the **App** component shows the respective **Screen** component to the user. **Screen** components consist of further components depending on their complexity and needs.

##### 📱 Mobile Application

The mobile application is based on React as well by using the React Native framework. It is therefore similarly structured to the frontend. The biggest difference is the navigation of screens which in the mobile application is not managed by the root component but by a library called **React Navigation**. The library employs native functionalities of the mobile operating system to switch between screens depending on the interaction of the user. An additional difference between the frontend and the mobile application is no global state in the root component. Each screen manages its own state and shares it through sending the necessary data to a different screen when switching to it.

Other than that, the mobile application consists of **Screen** components similar to the frontend with one root component that sets of the navigation through the previously mentioned library.

### 🛠 Development Instructions

#### 🗂️ MySQL Setup
---

##### Windows

>  During the setup, the windows firewall might be triggered several times. Please click on **allow** in every case.

- XAMPP:
    - Download [XAMPP](https://www.apachefriends.org/download.html) for an easy access to MySQL. During the install only select MySQL and Apache.

    - After the installation, start XAMPP and toggle the start button for Apache and MySQL.

- Setting up MySQL:
    - Open the start menu and search for `cmd`.

    - In the **cmd**, navigate to the following folder by inputing:
		```
        cd {pathToXAMPP}\mysql\bin
        ```

	- Now, use the following command to log in as **root** in MySQL:
		```
        mysql -uroot
        ```

	- You should be now inside the MySQL/MariaDB Command Line Interface. It could look somewhat like this:
	    ```
	    C:\xampp\mysql\bin>mysql -u root
        Welcome to the MariaDB monitor.  Commands end with ; or \g.
        Your MariaDB connection id is 8
        Server version: 10.4.14-MariaDB mariadb.org binary distribution

        Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

        Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

        MariaDB [(none)]>
	    ```

	- Now you can enter the following command to create a user called **developer** with the password **developer**:
		```sql
        CREATE USER 'developer'@'localhost' IDENTIFIED BY 'developer';
        ```

	- **[optional]** Check whether the user exists or not, enter the following command:
		```sql
        SELECT host, user, password FROM mysql.user;
        ```

	- Afterwards, the user **developer** needs to be granted all privileges. This can be done by entering the following command:
		```sql
        GRANT ALL PRIVILEGES ON *.* TO 'developer'@'localhost';
        ```

	- Then exit the MySQL/MariaDB Command Line Interface by inputing the command:
        ```sql
        exit
	    ```

	- In the same directory, execute the following command to set the Schema: **(Replace {pathToBackendProject} with the correct path)**
	    ```
		mysql -u developer -p < {pathToBackendProject}\DDL\Schema.ddl
        ```

	- You will be asked for the Password, which is `developer`.

	- If no errors occurred, then the database is set for development. This **cmd** window can be closed.


##### MacOS

- XAMPP:
    - Download [XAMPP](https://www.apachefriends.org/download.html) for an easy access to MySQL.

    - After the installation, open XAMPP and start the service.

    - Under the tab **Services**, start Apache and MySQL. ProFTPD is not required.

- Setting up MySQL:
    - Start the `Termial`.

    - In the **Terminal**, navigate to the following folder by inputing:
		```
        cd /Applications/XAMPP/xamppfiles/bin
        ```

	- Now, use the following command to log in as **root** in MySQL:
		```
        ./mysql -uroot
        ```

	- You should be now inside the MySQL/MariaDB Command Line Interface. It could look somewhat like this:
	    ```
	    $ ./mysql -uroot
        Welcome to the MariaDB monitor.  Commands end with ; or \g.
        Your MariaDB connection id is 10
        Server version: 10.4.14-MariaDB Source distribution

        Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

        Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

        MariaDB [(none)]>
	    ```

	- Now you can enter the following command to create a user called **developer** with the password **developer**:
		```sql
        CREATE USER 'developer'@'localhost' IDENTIFIED BY 'developer';
        ```

	- **[optional]** Check whether the user exists or not, enter the following command:
		```sql
        SELECT host, user, password FROM mysql.user;
        ```

	- Afterwards, the user **developer** needs to be granted all privileges. This can be done by entering the following command:
		```sql
        GRANT ALL PRIVILEGES ON *.* TO 'developer'@'localhost';
        ```

	- Then exit the MySQL/MariaDB Command Line Interface by inputing the command:
        ```sql
        exit
	    ```

	- In the same directory, execute the following command to set the Schema: **(Replace {pathToBackendProject} with the correct path)**
	    ```
		./mysql -u developer -p < {pathToBackendProject}/DDL/Schema.ddl
        ```

	- You will be asked for the Password, which is `developer`.

	- If no errors occurred, then the database is set for development. This **Terminal** window can be closed.

#### ⚙️ Backend Setup
---

##### Windows

> During the setup, the windows firewall might be triggered several times. Please click on **allow** in every case.

- .NET Core:
	- Download [.NET Core SDK (For building apps)](https://dotnet.microsoft.com/download) and install it.

	- Using a new and fresh **cmd** window, navigate to the Backend project folder by entering:
	    ```
		cd {pathToBackendProject}
	    ```
	- Now build and run the project by inputting:
	    ```
		dotnet run
        ```
	- If not errors occurred, the Backend is working.

> This **cmd** window **must** stay active, otherwise the Backend will not be running!

##### MacOS

- .NET Core:
	- Download [.NET Core SDK (For building apps)](https://dotnet.microsoft.com/download) and install it.

	- Using a new and fresh **Terminal** window, navigate to the Backend project folder by entering:
	    ```
		cd {pathToBackendProject}
	    ```
	- Now build and run the project by inputting:
	    ```
		dotnet run
        ```
	- If not errors occurred, the Backend is working.

> This **Terminal** window **must** stay active, otherwise the Backend will not be running!

#### 🌐 Frontend Setup
---

##### Windows

> During the setup, the windows firewall might be triggered several times. Please click on **allow** in every case.

- Node.js:
	- Download and install [Node.js](https://nodejs.org/en/download/).

	- Using a new and fresh **cmd** window, navigate to the frontend project folder, by typing:
    	```
    	cd {pathToFrontendProject}
        ```
	- Now install all node modules needed by the project by executing:
    	```
    	npm install
        ```
	- Afterwards, build and run the project:
	    ```
		npm start
        ```
	- A web browser should start and the mPat login page will be displayed.

> This **cmd** window **must** stay open, otherwise the frontend will not be accessible!

##### MacOS

- Node.js:
	- Download and install [Node.js](https://nodejs.org/en/download/).

	- Using a new and fresh **Terminal** window, navigate to the frontend project folder, by typing:
    	```
    	cd {pathToFrontendProject}
        ```
	- Now install all node modules needed by the project by executing:
    	```
    	npm install
        ```
	- Afterwards, build and run the project:
	    ```
		npm start
        ```
	- A web browser should start and the mPat login page will be displayed.

> This **Terminal** window **must** stay open, otherwise the frontend will not be accessible!

#### 🖥️ Initial Backoffice Setup
---

##### Windows

- Add a new organisation:
    - Using a new and fresh **cmd** window, navigate to the following folder:
	    ```
        cd {pathToXAMPP}\mysql\bin
        ```

    - A pre-built batch file is prepared for adding a new organisation. The following explains the parameters of the batch file:
        - The first **THREE** parameters are **fixed** parameter and **must not be changed**:

	        | Parameter | Value |
	        | --------- | ----- |
	        | MySQL user | developer |
	        | User password | developer |
	        | The Database | mPat |

        - The other three parameters can be set as desired: **(Please take into consideration, the type of each parameter)**

            | Parameter | Type |
            | --------- | ----- |
            | desired_RegistrationNumber | Numeric (Numbers) |
	        | desired_organisationName | Numeric and Characters |
	        | desired_organisationPassKey |Numeric and Characters |

    - The batch file can be executed (In the `xampp\mysql\bin` folder) by running: **(Replace {pathToBackendProject} with the correct path)** **(Replace {MySQL user}, {User password}, {The Database}, {desired_RegistrationNumber}, {desired_organisationName}, {desired_organisationPassKey} with the correct parameters)**
        ```
        {pathToBackendProject}\DDL\AddOrganisation.bat {MySQL user} {User password} {The Database} {desired_RegistrationNumber} {desired_organisationName} {desired_organisationPassKey}
        ```

- Alternatively (Add Organisation manually):
    - Using a new and fresh **cmd** window, navigate to the following folder:
      ```
      cd {pathToXAMPP}\mysql\bin
      ```
    - In the same folder connect to MySQL, by typing the following command:
        ```
        mysql -u developer -p
        ```
    - You will be asked for the Password, which is `developer`.

    - Switch to the `mPat`database, by entering:
        ```
        USE mPat;
        ```
    - Now type the following command to add a new organisation: **(Replace {desired_RegistrationNumber}, {desired_organisationName}, {desired_organisationPassKey} with the correct parameters)**
        ```
        INSERT INTO Organisation (
          RegistrationNr,
          Name,
          PassKey
        ) VALUES (
          "{desired_RegistrationNumber}",
          "{desired_organisationName}",
          SHA2("{desired_organisationPassKey}", 256)
        );
        ```
    - **[optional]** Check if the organisation exists, by typing:
        ```
        SELECT * FROM Organisation;
        ```
    - If the Organisation is present in the table, then you are done, otherwise repeat the steps again.

- Create a new department:
    - After the creation of an organisation and the successful setup of the frontend and the backend, a login in the Backoffice is permitted.

    - Open your favorite browser and navigate to `http://localhost:3000` to open the Backoffice.

    - Log in by using the credentials set during the creation of the organisation.

    - Hover over the profile and click on **Settings** and add a new department.

##### MacOS

- Add a new organisation:
    - Using a new and fresh **Terminal** window, navigate to the following folder:
	    ```
        cd /Applications/XAMPP/xamppfiles/bin
        ```

    - A pre-built bash file is prepared for adding a new organisation. The following explains the parameters of the bash file:
        - The first **THREE** parameters are **fixed** parameter and **must not be changed**:

	        | Parameter | Value |
	        | --------- | ----- |
	        | MySQL user | developer |
	        | User password | developer |
	        | The Database | mPat |

        - The other three parameters can be set as desired: **(Please take into consideration, the type of each parameter)**

            | Parameter | Type |
            | --------- | ----- |
            | desired_RegistrationNumber | Numeric (Numbers) |
	        | desired_organisationName | Numeric and Characters |
	        | desired_organisationPassKey |Numeric and Characters |

    - The bash file can be executed (In the `/Applications/XAMPP/xamppfiles/bin` folder) by running: **(Replace {pathToBackendProject} with the correct path)** **(Replace {MySQL user}, {User password}, {The Database}, {desired_RegistrationNumber}, {desired_organisationName}, {desired_organisationPassKey} with the correct parameters)**
        ```
	    {pathToBackendProject}/DDL/AddOrganisation.sh {MySQL user} {User password} {The Database} {desired_RegistrationNumber} {desired_organisationName} {desired_organisationPassKey}
	    ```

- Alternatively (Add Organisation manually):
    - Using a new and fresh **cmd** window, navigate to the following folder:
      ```
      cd /Applications/XAMPP/xamppfiles/bin
      ```
    - In the same folder connect to MySQL, by typing the following command:
        ```
        ./mysql -u developer -p
        ```
    - You will be asked for the Password, which is `developer`.

    - Switch to the `mPat`database, by entering:
        ```
        USE mPat;
        ```
    - Now type the following command to add a new organisation: **(Replace {desired_RegistrationNumber}, {desired_organisationName}, {desired_organisationPassKey} with the correct parameters)**
        ```
        INSERT INTO Organisation (
          RegistrationNr,
          Name,
          PassKey
        ) VALUES (
          "{desired_RegistrationNumber}",
          "{desired_organisationName}",
          SHA2("{desired_organisationPassKey}", 256)
        );
        ```
    - **[optional]** Check if the organisation exists, by typing:
        ```
        SELECT * FROM Organisation;
        ```
    - If the Organisation is present in the table, then you are done, otherwise repeat the steps again.

- Create a new department:
    - After the creation of an organisation and the successful setup of the frontend and the backend, a login in the Backoffice is permitted.

    - Open your favorite browser and navigate to `http://localhost:3000` to open the Backoffice.

    - Log in by using the credentials set during the creation of the organisation.

    - Hover over the profile and click on **Settings** and add a new department.

#### 📱 mPatApp Setup
---

##### Windows

> During the setup, the windows firewall might be triggered several times. Please click on **allow** in every case.

- Getting the ip address in the local network:
    - Open a **cmd** window and execute the following command:
        ```
	    ipconfig
	    ```

    - You can find the ip address similarly to the picture below. Normally the local ip address starts with `192.168...`. Please copy this address.

        ![ipconfig command](https://www.howtogeek.com/wp-content/uploads/2017/02/ppi_1.png)

- Adapt the app to the local network:
    - Open the following path in a file explorer: **(Replace {pathTomPatAppProject} with the correct path)**  `{pathTomPatAppProject}\src\Components\Screens`

    - Using the Notepad or any editor **(except Visual Studio)**, open the file `WaitingScreen.js` **(VS might produce chaos)**

    - Search for `192.168....` and replace it with your ip address. **(Do not change anything else like the port `:5000`)**

    - Repeat the same procedure for the file `PatInfoWaiting.js`.

    > Do not forget to save your changes.

- Start the Expo server:

    > In case you have not installed Node.js during the Setup of the frontend, please refer to the frontend section before proceeding.

	- Open a new **cmd** and navigate to the mPatApp project: **(Replace {pathTomPatAppProject} with the correct path)**
	    ```
	    cd {pathTomPatAppProject}
	    ```

    - Install all node modules by entering the following command:
        ```
	    npm install
	    ```

    - Next, install Expo CLI by writing the following command:
        ```
	    npm install expo-cli --global
	    ```

    > **Required**
    Start the database by launcing XAMPP and then starting Apache and MySQL. Please refer to the MySQL Setup section for further details.

    > **Required**
    In a fresh **cmd** window, navigate to the backend folder and build/run the backend project. Please refer to the Backend Setup section for further details.

    - Now, build and run the mPatApp project:
        ```
	    npm start
	    ```

    - **[optional]** If Expo CLI is not available and you are asked to install it globally, then please write: `Y`

    - A browser window should open as well as a QR code should be visible in the **cmd**.

- Open the app on your mobile device:

    - On your mobile device, install [Expo Developement Client](https://expo.io/tools):

        - [iOS](https://apps.apple.com/app/apple-store/id982107779)

        - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)

    > Make sure you are in the same network with your mobile device, as your computer running the Expo server.

    - 🍏 iOS:

        - Use any QR Code Scanner or your device camera (newer iOS versions) on the QR Code shown in the **cmd**, which runs Expo.

        - The device will suggest to open the app with expo, after recognizing the QR code.

        - Allow expo to redirect you to the app.

    - 🤖 Android:

        - Open the Expo app and scan the QR Code with the QR Scanner function provided by Expo and you will be redirected to the App.

##### MacOS

- Getting the ip address in the local network:
    - Open a **Terminal** window and execute the following command:
        ```
	    ipconfig getifaddr en0
	    ```

        or

        ```
        ipconfig getifaddr en1
        ```

- Adapt the app to the local network:
    - Open the following path in a file explorer: **(Replace {pathTomPatAppProject} with the correct path)**  `{pathTomPatAppProject}/src/Components/Screens`

    - Using any editor, open the file `WaitingScreen.js`

    - Search for `192.168....` and replace it with your ip address. **(Do not change anything else like the port `:5000`)**

    - Repeat the same procedure for the file `PatInfoWaiting.js`.

    > Do not forget to save your changes.

- Start the Expo server:

    > In case you have not installed Node.js during the Setup of the frontend, please refer to the frontend section before proceeding.

	- Open a new **Terminal** and navigate to the mPatApp project: **(Replace {pathTomPatAppProject} with the correct path)**
	    ```
	    cd {pathTomPatAppProject}
	    ```

    - Install all node modules by entering the following command:
        ```
	    npm install
	    ```

    - Next, install Expo CLI by writing the following command:
        ```
	    npm install expo-cli --global
	    ```

    > **Required**
    Start the database by launcing XAMPP and then starting Apache and MySQL. Please refer to the MySQL Setup section for further details.

    > **Required**
    In a fresh **Terminal** window, navigate to the backend folder and build/run the backend project. Please refer to the Backend Setup section for further details.

    - Now, build and run the mPatApp project:
        ```
	    npm start
	    ```

    - **[optional]** If Expo CLI is not available and you are asked to install it globally, then please write: `Y`

    - A browser window should open as well as a QR code should be visible in the **Terminal**.

- Open the app on your mobile device:
    - On your mobile device, install [Expo Developement Client](https://expo.io/tools):
        - [iOS](https://apps.apple.com/app/apple-store/id982107779)
        - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)

    > Make sure you are in the same network with your mobile device, as your computer running the Expo server.

    - 🍏 iOS:

        - Use any QR Code Scanner or your device camera (newer iOS versions) on the QR Code shown in the **Terminal**, which runs Expo.

        - The device will suggest to open the app with expo, after recognizing the QR code.

        - Allow expo to redirect you to the app.

    - 🤖 Android:

        - Open the Expo app and scan the QR Code with the QR Scanner function provided by Expo and you will be redirected to the App.

### 🔧 Important configuration

##### 🌐 Frontend port

The default port of the frontend is **3000** which can be modified through the setting of an environment variable before running the frontend:

- Windows:

	```
	SET PORT=8000
	```

- MacOS:

	```
	export PORT=8000
	```

##### ⚙️ Backend Port

The default port of the backend is **5000** which can be modified through the property file of the backend located at **{pathToBackendProject}\Properties\launchSettings.json**. It contains a setting called **applicationUrl** which specifies how the backend can be accessed. After changing the port of the backend, **all AJAX requests** being executed in the frontend as well as the mobile application **must** be modified as well.

##### 🗂 Database changes

The database schema is managed through a DDL file located at **{pathToBackendProject}\DDL\Schema.ddl**. Database changes should therefore be implemented in this schema file. Afterwards, the database has to be recreated by connecting to the MySQL/MariaDB Command Line Interface and executing:

```
DROP DATABASE mPat;
```

Then the schema can be imported again as outlined in the **MySQL Setup** section of this README.

### 🩺 Current state of the application

In its current form, mPat is fully working and has no known bugs. There are several places that could be extended however:

- Proper notification system: Through the usage of notifications, the user experience could be greatly improved for users. Notifications could be sent to the mobile device whenever the remaining waiting time reaches a certain threshold (e.g. only 3 minutes are remaining), or the position in the queue increases or decreases.

- Allowing patients to cancel their visit through the app: Currently patients can not cancel their visit at the emergency department on their own. The app could offer the possibility to cancel the visit if it is currently connected with an organisation.

- Storage of the current patient ID in the app: The mobile application currently does not store the patient ID in persistent storage but only in-memory. Consequently, if a user completely closes the application or restarts the mobile device, a new connection to the organisation has to be established when opening the mPat application again. React Native offers capabilities to store the ID in persistent storage which could be employed for this feature.

For further potential work please refer to the **Discussion** section of the bachelor's thesis.
‚‚
