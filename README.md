# Digital Attendance Dashboard v2

## Introduction

Digital Attendance is an open-source project supported by UNICEF Kenya through a collaboration with [Sisitech](https://sisitech.com). The platform allows tracking of individual student attendance in schools.

It is comprised of three components:
- **API**: Django Rest Framework
- **Dashboard**: Angular Web Application (this project)
- **Application**: Ionic Hybrid Application

## Digital Attendance Journey
- [Digital Attendance Journey Journey](https://drive.google.com/file/d/17T3VT-howD86XOSYrExLVMXWiXTiXimD/view)

## User Manual
- [Onekana User Manual](https://sisitech.github.io/OnekanaDocs/)

---

# Setup

## 1. Prerequisites

Before starting, ensure the following are installed:

- **Node.js** (v18.x or above) - [Download here](https://nodejs.org/en/download/)
- **Angular CLI** (v13.39) - [Installation guide](https://angular.io/cli)
- `.npmrc` configuration (required to install `@sisitech` npm libraries hosted on GitHub)

Additionally, ensure the backend API is already set up and accessible, e.g., `http://localhost:8000` or `https://api.domain.com/`.

---

### Updating `.npmrc`
#### Generating a GitHub Token

1. **Log in to GitHub**  
   Go to [GitHub](https://github.com) and log in to your account.

2. **Navigate to Personal Access Tokens:**
   - Click on your profile icon in the upper-right corner and select **Settings**.
   - In the left-hand sidebar, click **Developer settings**.
   - Under **Personal access tokens**, click on **Tokens (classic)**.
   - Click on **Generate new token**.

3. **Configure the Token:**
   - Add a descriptive note (e.g., “npm access token for SisiTech packages”).
   - Set the token expiration according to your security policy.
   - Under **Select scopes**, choose:
     - `repo` (for accessing private repositories)
     - `read:packages` (for reading package metadata)

4. **Generate and Copy the Token:**
   - After configuring the scopes, click **Generate token**.
   - Copy the generated token. **Make sure to store it securely**, as it won’t be displayed again.

#### Updating the `.npmrc` File

To authenticate npm using your GitHub token:

- **Create or Update the `.npmrc` File in Your Project:**

   Navigate to your home directory and either create or update the `.npmrc` file with the following configuration:
   ```sh
    nano ~/.npmrc
   ```

   Update it with the following content, replacing `YOUR_GITHUB_TOKEN` with the actual token:
   ```ini
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   @sisitech:registry=https://npm.pkg.github.com/
   ```

This setup tells npm to use the GitHub Packages registry for all `@sisitech` scoped packages and authenticate using your token.

- **Verify the Configuration:**
   After saving the `.npmrc` file, it should look like this:

   ```ini
   //npm.pkg.github.com/:_authToken=ghp_XXXXXXXXXXXXXXXXXXXX
   @sisitech:registry=https://npm.pkg.github.com/
   ```

   Make sure the token is correctly placed, and the scope `@sisitech` points to the GitHub Packages registry.

If the packages install without any errors, your configuration is successful. Otherwise, you will encounter a `401 Unauthorized` error for any `@sisitech` scoped packages.

---

## 2. Cloning the Project

Begin by cloning the project repository:

```bash
git clone git@github.com:unicefkenya/da-dashboard-v2.git
cd da-dashboard-v2
```

---

## 3. Installing Node Modules

Run the following command to install the required Node modules:

```bash
npm install --force
```

This command will install all the dependencies defined in the `package.json` file.

---

## 4. Configuring Environment Variables

The project’s environment configuration is stored in the `src/environments/environment.ts` file. Before running the application, make sure to update the environment variables. Here is an example configuration:

```typescript
export const environment = {
  production: true,
  APIEndpoint: 'https://api.domain.com/',
  APIEndpointNoSlash: 'https://api.domain.com',
  APIv1Endpoint: 'https://api.domain.com/api/v1/',
  APIClientID: 'CLIENT_ID_FROM_API'
};
```

---

## 5. Generating Client ID in Django Admin

To obtain the `APIClientID`, follow these steps:

1. Log in to your Django admin panel: [https://api.domain.com/admin](https://api.domain.com/admin).
2. Navigate to the **API Clients** section (assuming you have set this up).
3. Create a new client or view existing ones.
4. Copy the `Client ID` and paste it into the `APIClientID` field in the environment configuration.

For more details on setting up API clients in Django, refer to the [Django OAuth Toolkit documentation](https://django-oauth-toolkit.readthedocs.io/en/latest/).

---

## 6. Running the Application

After configuring the environment, you can start the Angular application using:

```bash
ng serve
```

The application will be accessible at `http://localhost:4200/`.

---

## 7. Learn More
- [Angular Documentation](https://angular.io/docs)


##  Want to Contribute or Have Any Questions?
We welcome contributions and feedback! If you want to contribute to this project or have any questions, reach out via email at hello@sisitech.com

