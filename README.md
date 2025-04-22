# QR Attendance Application
## Problem
The teacher of a class manually taking attendance can take up a major portion of class time. They have to go down a list one by one and call and listen for a response, this is both tedious and time consuming. The problems becomes more apparent if there is subsitute teacher, here they may not know where to find the class list, they may mispronounce names, etc., taking up even more class time.

## Our Solution
We created a digital and easy way to take attendance. A QR code based attendance system where teachers can generate a daily QR code which students can scan to mark that they are present. Users have to authenticate with their emails to scan the QR code, making it more secure. This greatly speeds up the attendance process.

## LIVE Service URL: 
https://qr-attendance-app-111147801991.us-central1.run.app

## Demo Video:
https://drive.google.com/file/d/1vwc9r4UpO2XlU7VOFjYXPJ6e80flZfrb/view?usp=sharing

## Technical Details
This application was entiredly created with Next.js with TypeScript which is a holistic framework for handling client side rendering (CSR), server side rendering (SSR), middleware, API's etc. I personally am very fond of Next.js because of the previous reasons and it allows for the dynamic, interativity like realtime attendance lists that native React.js would provide but with server side capabilities too. 

There are three main routes/pages besides the home page. `/generate`,`/scan`, and `/attend`. In the home page you need to authenticate before procceding, after authentication you can either generate a QR code or scan a QR code.

### Generating QR Code
In the `/generate` page you can enter in a "class code" to generate a unique QR code for that specific "class code", scanning the code will bring you to that said code's sign in page. Any students that then "attend" will be shown in a dynamic attendance list in the `/generate` page.

### Scanning QR Code
In the `/scan` page you can access your devices camera to scan a QR code. Scanning one of this app's QR codes brings you to a macthing `/attend` page, and after clicking submit this stores the users email, name, the current date, and the class code to firestore.

### CICD and Deployment Diagram
![CICD Diagram](CICD-QR.png)

### Architecture Diagram
![Architecture Diagram](ArchDia.png)

## Running Locally
The application is in qr-attendance-app folder. Follow the following to run locally: 

Enter next.js app folder
```bash
cd qr-attendance-app
```
Download dependecies
```bash
npm install
```
Run development server 
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## GCP Services we used 
1. GCP API, GCP secret manager (for OAuth)
2. AIM, Workforce Identity Federation (for CI/CD)
3. Cloud Run (for deployment)
4. Firestore (for database)
5. Artifact Registry (for images)


  
## Notes
When pushing a new revision to cloud run within github workflows it would not move all the traffice to the most recent revision:
```bash
gcloud run services update-traffic testservice --platform="managed" --to-latest
```
The command above makes it so you dont have to manually change the traffic.

### To update after changes:
gcloud builds submit --region us-central1 \
  --tag us-central1-docker.pkg.dev/cs1660-spring2025-mdn29/cloudrun/qr-attendance-app:v1

 gcloud run deploy qr-attendance-app \      
  --allow-unauthenticated \                                                             
  --image us-central1-docker.pkg.dev/cs1660-spring2025-mdn29/cloudrun/qr-attendance-app:v1 \
  --service-account cloudrun@cs1660-spring2025-mdn29.iam.gserviceaccount.com \
  --region us-central1 \
  --port 3000
