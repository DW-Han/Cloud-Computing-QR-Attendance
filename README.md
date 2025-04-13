# Cloud Computing
Application is in qr-attendance-app folder. 
Read markdown to run.

# Service URL: 
https://qr-attendance-app-111147801991.us-central1.run.app

# To update after changes:
gcloud builds submit --region us-central1 \
  --tag us-central1-docker.pkg.dev/cs1660-spring2025-mdn29/cloudrun/qr-attendance-app:v1

 gcloud run deploy qr-attendance-app \      
  --allow-unauthenticated \                                                             
  --image us-central1-docker.pkg.dev/cs1660-spring2025-mdn29/cloudrun/qr-attendance-app:v1 \
  --service-account cloudrun@cs1660-spring2025-mdn29.iam.gserviceaccount.com \
  --region us-central1 \
  --port 3000
